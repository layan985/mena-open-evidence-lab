import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const AWARDS_API =
  "https://datacatalogapi.worldbank.org/dexapps/fone/api/apiservice?datasetId=DS00005&resourceId=RS00005&type=json";
const NOTICES_API = "https://search.worldbank.org/api/v2/procnotices";
const PLANS_API = "https://search.worldbank.org/api/v3/wds";
const AWARDS_SOURCE =
  "https://financesone.worldbank.org/contract-awards-in-investment-project-financing-since-fy-2020/DS00005";
const NOTICES_SOURCE =
  "https://projects.worldbank.org/en/projects-operations/opportunities?srce=both";
const PLANS_SOURCE =
  "https://projects.worldbank.org/en/projects-operations/potentialopportunities";

const MENA_COUNTRIES = new Set([
  "Algeria",
  "Bahrain",
  "Djibouti",
  "Egypt, Arab Republic of",
  "Iran, Islamic Republic of",
  "Iraq",
  "Israel",
  "Jordan",
  "Kuwait",
  "Lebanon",
  "Libya",
  "Morocco",
  "Oman",
  "Qatar",
  "Saudi Arabia",
  "Syrian Arab Republic",
  "Tunisia",
  "Turkey",
  "Turkiye",
  "Türkiye",
  "United Arab Emirates",
  "West Bank and Gaza",
  "Yemen, Republic of",
]);

const NOTICE_COUNTRIES = [...MENA_COUNTRIES].join("^");
const EXPLORER_LIMIT = 1800;
const AWARDS_PAGE_SIZE = 1000;
const CONCURRENCY = 18;

function cleanText(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
}

function percentile(values, p) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (sorted.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

function rounded(value) {
  return value === null ? null : Math.round(value * 100) / 100;
}

async function fetchJson(url, attempts = 4) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "MENA Open Data & Evidence Lab research preview" },
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolveWait) => setTimeout(resolveWait, 500 * attempt));
    }
  }
  throw lastError;
}

async function mapConcurrent(items, concurrency, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

function noticeParams(extra = {}) {
  const params = new URLSearchParams({
    format: "json",
    fl: [
      "id",
      "submission_deadline_date",
      "bid_description",
      "project_ctry_name",
      "project_name",
      "project_id",
      "notice_type",
      "notice_status",
      "notice_lang_name",
      "submission_date",
      "noticedate",
      "procurement_group_desc",
      "procurement_method_name",
      "contact_organization",
      "contact_email",
      "bid_reference_no",
      "market_approach_name",
      "market_approach_region_name",
      "procurement_major_sector_name",
    ].join(","),
    fct: "project_ctry_name_exact,notice_type_exact,procurement_group_desc_exact",
    srt: "noticedate",
    order: "desc",
    apilang: "en",
    rows: "1000",
    os: "0",
    project_ctry_name_exact: NOTICE_COUNTRIES,
    ...extra,
  });
  return `${NOTICES_API}?${params.toString()}`;
}

function normalizeNotice(row, stage) {
  const deadline = parseDate(row.submission_deadline_date);
  const published = parseDate(row.noticedate ?? row.submission_date);
  return {
    id: row.id,
    stage,
    title: cleanText(row.bid_description) || cleanText(row.project_name) || "Untitled notice",
    country: cleanText(row.project_ctry_name),
    projectName: cleanText(row.project_name),
    projectId: cleanText(row.project_id),
    reference: cleanText(row.bid_reference_no),
    noticeType: cleanText(row.notice_type),
    category: cleanText(row.procurement_group_desc) || cleanText(row.procurement_major_sector_name),
    method: cleanText(row.procurement_method_name),
    language: cleanText(row.notice_lang_name),
    status: cleanText(row.notice_status),
    publishedDate: published?.toISOString().slice(0, 10) ?? null,
    deadlineDate: deadline?.toISOString().slice(0, 10) ?? null,
    buyer: cleanText(row.contact_organization),
    sourceUrl: `https://projects.worldbank.org/en/projects-operations/procurement-detail/${row.id}`,
    projectUrl: row.project_id
      ? `https://projects.worldbank.org/en/projects-operations/project-detail/${row.project_id}`
      : null,
  };
}

async function fetchNotices() {
  const today = new Date().toISOString().slice(0, 10);
  const [current, general] = await Promise.all([
    fetchJson(noticeParams({ srce: "both", deadline_strdate: today })),
    fetchJson(noticeParams({ notice_type_exact: "General Procurement Notice" })),
  ]);
  const currentRows = (current.procnotices ?? []).map((row) => normalizeNotice(row, "Open"));
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - 3);
  const pipelineRows = (general.procnotices ?? [])
    .filter((row) => {
      const date = parseDate(row.noticedate ?? row.submission_date);
      return date && date >= cutoff;
    })
    .map((row) => normalizeNotice(row, "Pipeline"));
  return {
    totalOpen: Number(current.total ?? currentRows.length),
    totalGeneralNotices: Number(general.total ?? pipelineRows.length),
    rows: [...currentRows, ...pipelineRows],
  };
}

async function fetchPlans() {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 12);
  const params = new URLSearchParams({
    format: "json",
    fl: "*",
    docty: "Procurement Plan",
    os: "0",
    order: "desc",
    fct: "count_exact,admreg_exact,sectr_exact",
    rows: "250",
    project_status_exact: "Active",
    admreg_exact: "Middle East, North Africa, Afghanistan, and Pakistan",
    strdate: cutoff.toISOString().slice(0, 10),
  });
  const payload = await fetchJson(`${PLANS_API}?${params.toString()}`);
  const entries = Object.entries(payload.documents ?? {})
    .filter(([key]) => key !== "facets")
    .map(([, row]) => row)
    .filter((row) => !/afghanistan|pakistan/i.test(`${row.display_title ?? ""} ${row.projn ?? ""}`))
    .map((row) => ({
      id: String(row.id ?? row.guid),
      title: cleanText(row.display_title ?? row.docna?.[0]?.docna),
      projectName: cleanText(row.projn),
      projectId: cleanText(row.projectid),
      disclosedDate: parseDate(row.disclosure_date ?? row.docdt)?.toISOString().slice(0, 10) ?? null,
      sector: cleanText(
        Object.values(row.sectr ?? {})
          .map((item) => item.sector)
          .join(" · "),
      ),
      pdfUrl: row.pdfurl ?? row.wrdurl ?? row.url,
      projectUrl: row.projectid
        ? `https://projects.worldbank.org/en/projects-operations/project-detail/${row.projectid}`
        : null,
    }));
  return { totalRegionalPlans: Number(payload.total ?? entries.length), rows: entries };
}

async function fetchAwards() {
  const first = await fetchJson(`${AWARDS_API}&top=${AWARDS_PAGE_SIZE}&skip=0`);
  const sourceTotal = Number(first.count ?? 0);
  const offsets = [];
  for (let skip = AWARDS_PAGE_SIZE; skip < sourceTotal; skip += AWARDS_PAGE_SIZE) offsets.push(skip);
  const pages = await mapConcurrent(offsets, CONCURRENCY, async (skip, index) => {
    if ((index + 1) % 25 === 0) process.stdout.write(`Fetched ${index + 1}/${offsets.length} award pages\n`);
    return fetchJson(`${AWARDS_API}&top=${AWARDS_PAGE_SIZE}&skip=${skip}`);
  });
  const rows = [first, ...pages].flatMap((page) => page.data ?? []);
  const mena = rows.filter((row) => MENA_COUNTRIES.has(cleanText(row.borrower_country)));
  const normalized = mena
    .map((row) => ({
      contractNumber: cleanText(row.wb_contract_number),
      borrowerReference: cleanText(row.borrower_contract_reference_number),
      title: cleanText(row.contract_description),
      country: cleanText(row.borrower_country),
      signedDate: parseDate(row.contract_signing_date)?.toISOString().slice(0, 10) ?? null,
      fiscalYear: Number(row.fiscal_year) || null,
      category: cleanText(row.procurement_category),
      method: cleanText(row.procurement_method),
      sector: cleanText(row.project_global_practice),
      projectId: cleanText(row.project_id),
      projectName: cleanText(row.project_name),
      reviewType: cleanText(row.review_type),
      supplier: cleanText(row.supplier),
      supplierCountry: cleanText(row.supplier_country),
      amountUsd: Number(row.supplier_contract_amount_usd) || null,
      projectUrl: row.project_id
        ? `https://projects.worldbank.org/en/projects-operations/project-detail/${row.project_id}`
        : null,
      sourceUrl: AWARDS_SOURCE,
    }))
    .filter((row) => row.contractNumber || row.title)
    .sort((a, b) => String(b.signedDate ?? "").localeCompare(String(a.signedDate ?? "")));

  const amounts = normalized.map((row) => row.amountUsd).filter((value) => value > 0);
  const consultantAmounts = normalized
    .filter((row) => /consultant/i.test(row.category))
    .map((row) => row.amountUsd)
    .filter((value) => value > 0);

  function aggregateBy(key, limit = 50) {
    const map = new Map();
    for (const row of normalized) {
      const label = row[key] || "Not stated";
      const current = map.get(label) ?? { label, awards: 0, disclosedValueUsd: 0 };
      current.awards += 1;
      current.disclosedValueUsd += row.amountUsd ?? 0;
      map.set(label, current);
    }
    return [...map.values()]
      .sort((a, b) => b.disclosedValueUsd - a.disclosedValueUsd || b.awards - a.awards)
      .slice(0, limit)
      .map((item) => ({ ...item, disclosedValueUsd: rounded(item.disclosedValueUsd) }));
  }

  const benchmarkGroups = new Map();
  for (const row of normalized) {
    if (!row.amountUsd || row.amountUsd <= 0) continue;
    const key = `${row.country}|||${row.category || "Not stated"}`;
    const current = benchmarkGroups.get(key) ?? {
      country: row.country,
      category: row.category || "Not stated",
      values: [],
    };
    current.values.push(row.amountUsd);
    benchmarkGroups.set(key, current);
  }
  const benchmarks = [...benchmarkGroups.values()]
    .filter((group) => group.values.length >= 5)
    .map((group) => ({
      country: group.country,
      category: group.category,
      awards: group.values.length,
      p25Usd: rounded(percentile(group.values, 0.25)),
      medianUsd: rounded(percentile(group.values, 0.5)),
      p75Usd: rounded(percentile(group.values, 0.75)),
    }))
    .sort((a, b) => b.awards - a.awards);

  return {
    sourceTotal,
    matchingAwards: normalized.length,
    explorerRows: normalized.slice(0, EXPLORER_LIMIT),
    stats: {
      disclosedValueUsd: rounded(amounts.reduce((sum, value) => sum + value, 0)),
      earliestSignedDate: normalized.at(-1)?.signedDate ?? null,
      latestSignedDate: normalized[0]?.signedDate ?? null,
      medianAwardUsd: rounded(percentile(amounts, 0.5)),
      consultantAwards: consultantAmounts.length,
      consultantMedianUsd: rounded(percentile(consultantAmounts, 0.5)),
      consultantP25Usd: rounded(percentile(consultantAmounts, 0.25)),
      consultantP75Usd: rounded(percentile(consultantAmounts, 0.75)),
    },
    countryStats: aggregateBy("country", 30),
    categoryStats: aggregateBy("category", 20),
    supplierLeaders: aggregateBy("supplier", 60),
    supplierCountryStats: aggregateBy("supplierCountry", 40),
    sectorStats: aggregateBy("sector", 30),
    methodStats: aggregateBy("method", 20),
    benchmarks,
  };
}

const [notices, plans, awards] = await Promise.all([fetchNotices(), fetchPlans(), fetchAwards()]);
const output = {
  meta: {
    product: "MENA Funding & Procurement Intelligence",
    edition: "Founding research preview",
    fetchedAt: new Date().toISOString(),
    methodology: "Official World Bank public data normalized without inferred award values.",
    sourceCoverage: [
      {
        name: "World Bank current opportunities",
        status: "Live snapshot",
        url: NOTICES_SOURCE,
        license: "Public source",
      },
      {
        name: "World Bank procurement plans",
        status: "Latest disclosed plans",
        url: PLANS_SOURCE,
        license: "Public source",
      },
      {
        name: "World Bank IPF contract awards since FY2020",
        status: "Full official corpus scanned",
        url: AWARDS_SOURCE,
        license: "CC BY 4.0",
      },
    ],
    limitations: [
      "Open opportunities are a point-in-time snapshot; verify the official notice before acting.",
      "Award amounts are committed, not disbursed, and reflect World Bank exchange rates at no-objection.",
      "Supplier country is place of registration and may not equal origin or delivery location.",
      "Awards exclude subcontractors and cofinancing; joint-venture values may be split across members.",
      "This preview normalizes World Bank sources only; UNGM, EU and GIZ are not yet represented as structured records.",
    ],
  },
  opportunities: notices,
  plans,
  awards,
};

const destination = resolve("data/procurement.json");
await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, `${JSON.stringify(output)}\n`);
process.stdout.write(
  `Wrote ${destination}: ${notices.rows.length} notices, ${plans.rows.length} plans, ${awards.matchingAwards} MENA awards (${awards.explorerRows.length} explorer rows).\n`,
);
process.stdout.write("Run `node scripts/prepare-procurement-parts.mjs` to publish browser-ready data parts.\n");
