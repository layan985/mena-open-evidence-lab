const CONTACT_URL = "https://www.layanaloreidi.online/#contact";
const AWARD_PAGE_SIZE = 18;

const COUNTRY_LABELS = {
  AE: "United Arab Emirates", BH: "Bahrain", DJ: "Djibouti", DZ: "Algeria",
  EG: "Egypt", IQ: "Iraq", IR: "Iran", JO: "Jordan", KW: "Kuwait",
  LB: "Lebanon", LY: "Libya", MA: "Morocco", OM: "Oman", PS: "Palestine",
  QA: "Qatar", SA: "Saudi Arabia", SY: "Syria", TN: "Tunisia", YE: "Yemen"
};

const state = {
  data: null,
  opportunityStage: "Open",
  opportunityLimit: 9,
  awardPage: 1,
  planLimit: 12
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
})[character]);

function countryLabel(value) {
  return COUNTRY_LABELS[value] || value || "Not stated";
}

function compactMoney(value) {
  if (!Number(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", notation: "compact",
    maximumFractionDigits: Number(value) >= 1_000_000 ? 1 : 0
  }).format(Number(value));
}

function exactMoney(value) {
  if (!Number(value)) return "Not disclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0
  }).format(Number(value));
}

function formatDate(value) {
  if (!value) return "Not stated";
  const parsed = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(parsed.valueOf())) return value;
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(parsed);
}

function daysUntil(value) {
  if (!value) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(`${value}T00:00:00`);
  if (Number.isNaN(deadline.valueOf())) return null;
  return Math.ceil((deadline.valueOf() - today.valueOf()) / 86_400_000);
}

function opportunitySignal(row) {
  const text = `${row.title || ""} ${row.projectName || ""}`.toLowerCase();
  const keywords = ["consult", "data", "digital", "research", "evaluation", "survey", "monitor", "training", "policy", "capacity", "analytics", "study", "strategy", "communication", "social", "institutional", "assessment"];
  const matches = keywords.filter((keyword) => text.includes(keyword));
  const categoryPoints = /consultant/i.test(row.category || "") ? 36 : /non-consult/i.test(row.category || "") ? 18 : 0;
  const score = Math.min(94, 24 + categoryPoints + Math.min(matches.length * 9, 48) + (row.stage === "Open" ? 8 : 0));
  return { score, matches, label: score >= 72 ? "High evidence fit" : score >= 54 ? "Strong signal" : "Market watch" };
}

function opportunityUrgency(row) {
  if (row.stage === "Pipeline") return { label: "Pre-tender signal", tone: "pipeline" };
  const days = daysUntil(row.deadlineDate);
  if (days === null) return { label: "Verify deadline", tone: "muted" };
  if (days < 0) return { label: "Deadline passed", tone: "muted" };
  if (days <= 7) return { label: `${days}d left`, tone: "critical" };
  if (days <= 21) return { label: `${days}d left`, tone: "warm" };
  return { label: `${days}d left`, tone: "calm" };
}

function fillSelect(select, values, firstLabel) {
  select.innerHTML = `<option>${escapeHtml(firstLabel)}</option>` + values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(countryLabel(value))}</option>`).join("");
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function renderHeadline() {
  const { meta, opportunities, awards, plans } = state.data;
  const pipelineCount = opportunities.rows.filter((row) => row.stage === "Pipeline").length;
  const fetched = new Date(meta.fetchedAt);
  setText("#snapshot-date", `Official-source snapshot · ${new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(fetched)}`);
  setText("#hero-open", opportunities.totalOpen.toLocaleString());
  setText("#hero-pipeline", pipelineCount.toLocaleString());
  setText("#hero-plans", plans.rows.length.toLocaleString());
  setText("#hero-awards", awards.matchingAwards.toLocaleString());
  setText("#hero-value", compactMoney(awards.stats.disclosedValueUsd));
  setText("#proof-scanned", awards.sourceTotal.toLocaleString());
  setText("#proof-normalized", awards.matchingAwards.toLocaleString());
  setText("#proof-consulting", awards.stats.consultantAwards.toLocaleString());
  setText("#proof-cells", awards.benchmarks.length.toLocaleString());
  setText("#metric-corpus", awards.matchingAwards.toLocaleString());
  setText("#metric-value", compactMoney(awards.stats.disclosedValueUsd));
  setText("#metric-median", compactMoney(awards.stats.medianAwardUsd));
  setText("#metric-consulting", compactMoney(awards.stats.consultantMedianUsd));
  setText("#metric-consulting-range", `P25 ${compactMoney(awards.stats.consultantP25Usd)} · P75 ${compactMoney(awards.stats.consultantP75Usd)}`);
}

function opportunityFilters() {
  const rows = state.data.opportunities.rows;
  fillSelect($("#opportunity-country"), [...new Set(rows.map((row) => row.country))].filter(Boolean).sort(), "All countries");
  const categories = [...new Set(rows.map((row) => row.category))].filter(Boolean).sort();
  $("#opportunity-category").innerHTML = `<option>All categories</option>${categories.map((value) => `<option>${escapeHtml(value)}</option>`).join("")}`;
}

function filteredOpportunities() {
  const country = $("#opportunity-country").value;
  const category = $("#opportunity-category").value;
  const query = $("#opportunity-search").value.trim().toLowerCase();
  return state.data.opportunities.rows.filter((row) => {
    const stageMatch = state.opportunityStage === "All stages" || row.stage === state.opportunityStage;
    const countryMatch = country === "All countries" || row.country === country;
    const categoryMatch = category === "All categories" || row.category === category;
    const queryMatch = !query || [row.title, row.projectName, row.buyer, row.reference].join(" ").toLowerCase().includes(query);
    return stageMatch && countryMatch && categoryMatch && queryMatch;
  }).sort((a, b) => {
    if (a.stage !== b.stage) return a.stage === "Open" ? -1 : 1;
    if (a.deadlineDate && b.deadlineDate) return a.deadlineDate.localeCompare(b.deadlineDate);
    return opportunitySignal(b).score - opportunitySignal(a).score;
  });
}

function opportunityCard(row) {
  const signal = opportunitySignal(row);
  const urgency = opportunityUrgency(row);
  const reference = row.reference || row.id;
  const projectLink = row.projectUrl ? `<a href="${escapeHtml(row.projectUrl)}" target="_blank" rel="noreferrer">Project context ↗</a>` : "";
  return `<article class="opportunity-card">
    <div class="opportunity-topline"><span class="stage-pill ${escapeHtml((row.stage || "").toLowerCase())}">${escapeHtml(row.stage)}</span><span class="urgency ${urgency.tone}">${urgency.label}</span><span class="country-tag">${escapeHtml(countryLabel(row.country))}</span></div>
    <div class="opportunity-body"><div><p class="eyebrow">${escapeHtml(row.category || row.noticeType)}</p><h3>${escapeHtml(row.title)}</h3><p class="project-name">${escapeHtml(row.projectName)}</p></div><div class="signal-donut" style="--score:${signal.score * 3.6}deg"><span>${signal.score}</span></div></div>
    <div class="signal-explainer"><strong>${signal.label}</strong><span>${escapeHtml(signal.matches.length ? signal.matches.slice(0, 4).join(" · ") : "No evidence-service keywords")}</span></div>
    <dl class="opportunity-meta"><div><dt>Deadline</dt><dd>${formatDate(row.deadlineDate)}</dd></div><div><dt>Buyer</dt><dd>${escapeHtml(row.buyer || "See official notice")}</dd></div><div><dt>Method</dt><dd>${escapeHtml(row.method || row.noticeType)}</dd></div><div><dt>Reference</dt><dd>${escapeHtml(reference)}</dd></div></dl>
    <div class="card-actions"><a href="${escapeHtml(row.sourceUrl)}" target="_blank" rel="noreferrer">Official notice ↗</a>${projectLink}<a href="${CONTACT_URL}" target="_blank" rel="noreferrer">Commission dossier →</a></div>
  </article>`;
}

function renderOpportunities() {
  const rows = filteredOpportunities();
  setText("#opportunity-count", rows.length.toLocaleString());
  $("#opportunity-grid").innerHTML = rows.length ? rows.slice(0, state.opportunityLimit).map(opportunityCard).join("") : `<div class="data-state">No matching opportunity signals.</div>`;
  $("#opportunity-more").hidden = state.opportunityLimit >= rows.length;
}

function awardFilters() {
  const rows = state.data.awards.explorerRows;
  fillSelect($("#award-country"), [...new Set(rows.map((row) => row.country))].filter(Boolean).sort(), "All countries");
  const categories = [...new Set(rows.map((row) => row.category))].filter(Boolean).sort();
  $("#award-category").innerHTML = `<option>All categories</option>${categories.map((value) => `<option>${escapeHtml(value)}</option>`).join("")}`;
}

function filteredAwards() {
  const country = $("#award-country").value;
  const category = $("#award-category").value;
  const query = $("#award-search").value.trim().toLowerCase();
  return state.data.awards.explorerRows.filter((row) => {
    const countryMatch = country === "All countries" || row.country === country;
    const categoryMatch = category === "All categories" || row.category === category;
    const queryMatch = !query || [row.title, row.supplier, row.projectName, row.projectId, row.borrowerReference].join(" ").toLowerCase().includes(query);
    return countryMatch && categoryMatch && queryMatch;
  });
}

function renderAwards() {
  const rows = filteredAwards();
  const pages = Math.max(1, Math.ceil(rows.length / AWARD_PAGE_SIZE));
  state.awardPage = Math.min(state.awardPage, pages);
  const start = (state.awardPage - 1) * AWARD_PAGE_SIZE;
  const visible = rows.slice(start, start + AWARD_PAGE_SIZE);
  const disclosedValue = rows.reduce((sum, row) => sum + (Number(row.amountUsd) || 0), 0);
  setText("#award-count", rows.length.toLocaleString());
  setText("#award-value", compactMoney(disclosedValue));
  setText("#award-page", `${state.awardPage} / ${pages}`);
  setText("#award-note", `The explorer contains the latest ${state.data.awards.explorerRows.length.toLocaleString()} MENA awards. Full-corpus figures use all ${state.data.awards.matchingAwards.toLocaleString()} matched awards.`);
  setText("#award-range", rows.length ? `Rows ${start + 1}–${Math.min(start + AWARD_PAGE_SIZE, rows.length)} of ${rows.length}` : "No matching rows");
  $("#award-prev").disabled = state.awardPage === 1;
  $("#award-next").disabled = state.awardPage === pages;
  $("#award-rows").innerHTML = visible.length ? visible.map((row) => {
    const source = row.projectUrl || row.sourceUrl;
    return `<tr><td>${formatDate(row.signedDate)}</td><td><strong>${escapeHtml(countryLabel(row.country))}</strong><small>${escapeHtml(row.category || "Not stated")}</small></td><td><strong>${escapeHtml(row.title || row.projectName)}</strong><small>${escapeHtml(row.projectId)} · ${escapeHtml(row.borrowerReference || row.contractNumber)}</small></td><td><strong>${escapeHtml(row.supplier || "Not stated")}</strong><small>${escapeHtml(row.supplierCountry || "Registration not stated")}</small></td><td class="numeric">${exactMoney(row.amountUsd)}</td><td>${escapeHtml(row.method || "Not stated")}</td><td><a href="${escapeHtml(source)}" target="_blank" rel="noreferrer">${row.projectUrl ? "Project" : "Dataset"} ↗</a></td></tr>`;
  }).join("") : `<tr><td colspan="7">No matching award records.</td></tr>`;
}

function renderBenchmarks() {
  const select = $("#benchmark-country");
  if (!select.options.length) {
    const countries = [...new Set(state.data.awards.benchmarks.map((row) => row.country))].filter(Boolean).sort();
    select.innerHTML = countries.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(countryLabel(value))}</option>`).join("");
    if (countries.includes("JO")) select.value = "JO";
    else select.value = countries[0] || "";
  }
  const country = select.value;
  const rows = state.data.awards.benchmarks.filter((row) => row.country === country);
  const max = Math.max(...rows.map((row) => Number(row.p75Usd) || 0), 1);
  setText("#benchmark-title", countryLabel(country));
  $("#benchmark-grid").innerHTML = rows.length ? rows.map((row) => `<article class="benchmark-row"><div class="benchmark-label"><strong>${escapeHtml(row.category)}</strong><span>${Number(row.awards).toLocaleString()} disclosed awards</span></div><div class="range-visual"><div class="range-track"><span class="range-fill" style="width:${Math.max(5, ((Number(row.p75Usd) || 0) / max) * 100)}%"></span><i style="left:${Math.min(98, ((Number(row.medianUsd) || 0) / max) * 100)}%"></i></div><div class="range-values"><span>P25 <strong>${compactMoney(row.p25Usd)}</strong></span><span>Median <strong>${compactMoney(row.medianUsd)}</strong></span><span>P75 <strong>${compactMoney(row.p75Usd)}</strong></span></div></div></article>`).join("") : `<div class="data-state">No disclosed benchmark cells for this market.</div>`;
}

function renderSuppliers() {
  const rows = state.data.awards.supplierLeaders.slice(0, 12);
  const max = Math.max(...rows.map((row) => Number(row.disclosedValueUsd) || 0), 1);
  $("#supplier-radar").innerHTML = rows.map((row, index) => `<div class="supplier-row"><span class="rank">${String(index + 1).padStart(2, "0")}</span><div class="supplier-name"><strong>${escapeHtml(row.label)}</strong><span>${Number(row.awards).toLocaleString()} award entries</span></div><div class="supplier-bar"><i style="width:${Math.max(2, (Number(row.disclosedValueUsd) / max) * 100)}%"></i></div><strong class="supplier-value">${compactMoney(row.disclosedValueUsd)}</strong></div>`).join("");
}

function filteredPlans() {
  const query = $("#plan-search").value.trim().toLowerCase();
  return state.data.plans.rows.filter((row) => !query || [row.title, row.projectName, row.projectId, row.sector].join(" ").toLowerCase().includes(query));
}

function renderPlans() {
  const rows = filteredPlans();
  setText("#plan-count", `${rows.length.toLocaleString()} recent disclosed plans`);
  $("#plan-grid").innerHTML = rows.length ? rows.slice(0, state.planLimit).map((row) => `<article class="plan-card"><div><span>${formatDate(row.disclosedDate)}</span><b>${escapeHtml(row.projectId)}</b></div><h3>${escapeHtml(row.title)}</h3><p>${escapeHtml(row.sector || row.projectName)}</p><div><a href="${escapeHtml(row.pdfUrl)}" target="_blank" rel="noreferrer">Open plan PDF ↗</a>${row.projectUrl ? `<a href="${escapeHtml(row.projectUrl)}" target="_blank" rel="noreferrer">Project ↗</a>` : ""}</div></article>`).join("") : `<div class="data-state">No matching procurement plans.</div>`;
  $("#plan-more").hidden = state.planLimit >= rows.length;
}

function renderMethod() {
  const { meta, awards } = state.data;
  setText("#method-scanned", `${awards.sourceTotal.toLocaleString()} scanned`);
  setText("#method-matched", `${awards.matchingAwards.toLocaleString()} rows matched the declared MENA country set. The explorer retains the latest ${awards.explorerRows.length.toLocaleString()}.`);
  $("#source-register").innerHTML = `<div><span>Source</span><span>Status</span><span>License / access</span><span>Official record</span></div>${meta.sourceCoverage.map((source) => `<div><strong>${escapeHtml(source.name)}</strong><span>${escapeHtml(source.status)}</span><span>${escapeHtml(source.license)}</span><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">Open source ↗</a></div>`).join("")}`;
  $("#limitations").innerHTML = meta.limitations.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function toCsv(rows, columns) {
  const quote = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  return [columns.map(([label]) => quote(label)).join(","), ...rows.map((row) => columns.map(([, key]) => quote(row[key])).join(","))].join("\n");
}

function downloadCsv(filename, contents) {
  const blob = new Blob([contents], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function wireEvents() {
  $$("[data-stage]").forEach((button) => button.addEventListener("click", () => {
    state.opportunityStage = button.dataset.stage;
    state.opportunityLimit = 9;
    $$("[data-stage]").forEach((item) => item.classList.toggle("active", item === button));
    renderOpportunities();
  }));
  ["#opportunity-country", "#opportunity-category", "#opportunity-search"].forEach((selector) => $(selector).addEventListener(selector.includes("search") ? "input" : "change", () => { state.opportunityLimit = 9; renderOpportunities(); }));
  $("#opportunity-more").addEventListener("click", () => { state.opportunityLimit += 9; renderOpportunities(); });
  ["#award-country", "#award-category", "#award-search"].forEach((selector) => $(selector).addEventListener(selector.includes("search") ? "input" : "change", () => { state.awardPage = 1; renderAwards(); }));
  $("#award-prev").addEventListener("click", () => { state.awardPage = Math.max(1, state.awardPage - 1); renderAwards(); });
  $("#award-next").addEventListener("click", () => { state.awardPage += 1; renderAwards(); });
  $("#benchmark-country").addEventListener("change", renderBenchmarks);
  $("#plan-search").addEventListener("input", () => { state.planLimit = 12; renderPlans(); });
  $("#plan-more").addEventListener("click", () => { state.planLimit += 12; renderPlans(); });
  $("#opportunity-export").addEventListener("click", () => downloadCsv("mena-procurement-opportunities.csv", toCsv(filteredOpportunities(), [["Stage", "stage"], ["Country", "country"], ["Category", "category"], ["Title", "title"], ["Project", "projectName"], ["Buyer", "buyer"], ["Deadline", "deadlineDate"], ["Reference", "reference"], ["Official URL", "sourceUrl"]])));
  $("#award-export").addEventListener("click", () => downloadCsv("mena-contract-awards.csv", toCsv(filteredAwards(), [["Signed date", "signedDate"], ["Country", "country"], ["Category", "category"], ["Contract", "title"], ["Supplier", "supplier"], ["Supplier country", "supplierCountry"], ["Amount USD", "amountUsd"], ["Method", "method"], ["Project ID", "projectId"], ["Reference", "borrowerReference"], ["Source URL", "sourceUrl"]])));
}

async function init() {
  try {
    const manifestResponse = await fetch("/data/manifest.json", { cache: "no-store" });
    if (!manifestResponse.ok) throw new Error(`Data manifest request failed (${manifestResponse.status})`);
    const manifest = await manifestResponse.json();
    const partResponses = await Promise.all(manifest.parts.map((part) => fetch(`/data/${part}`, { cache: "no-store" })));
    const failedPart = partResponses.find((response) => !response.ok);
    if (failedPart) throw new Error(`Data part request failed (${failedPart.status})`);
    const parts = await Promise.all(partResponses.map((response) => response.text()));
    state.data = JSON.parse(parts.join(""));
    renderHeadline();
    opportunityFilters();
    awardFilters();
    renderOpportunities();
    renderAwards();
    renderBenchmarks();
    renderSuppliers();
    renderPlans();
    renderMethod();
    wireEvents();
  } catch (error) {
    console.error(error);
    ["#opportunity-grid", "#benchmark-grid", "#supplier-radar", "#plan-grid"].forEach((selector) => {
      const element = $(selector);
      if (element) element.innerHTML = `<div class="data-state error">The data snapshot could not be loaded. Please reload or inspect the downloadable source package.</div>`;
    });
    $("#award-rows").innerHTML = `<tr><td colspan="7">The award snapshot could not be loaded.</td></tr>`;
    setText("#snapshot-date", "Official-source snapshot unavailable");
  }
}

init();
