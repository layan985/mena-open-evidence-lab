const catalog = [
  {
    aliases:["jordan unemployment","unemployment jordan","jordan labor"],
    title:"Jordan unemployment",
    kind:"Statistical series",
    geography:"Jordan",
    status:"not yet validated",
    currentValue:"—",
    observations:"Pending ingestion",
    sourceInstitution:"Pending source review",
    sourceDocument:"Not yet attached",
    sourceUrl:"Not yet attached",
    retrievalDate:"—",
    revisionHistory:"Not yet audited",
    methodology:"Catalog slot reserved. No value is shown until source, definition and revisions are verified.",
    transformedVariables:"None published",
    license:"Pending review",
    citation:"Pending validated release",
    downloads:"CSV / Parquet unavailable until validation",
    api:"/api/v1/series/jordan-unemployment (planned)",
    commit:"No release commit yet"
  },
  {
    aliases:["egypt ai adoption","ai adoption egypt","egypt firms ai"],
    title:"Egypt AI adoption",
    kind:"Research indicator / dataset",
    geography:"Egypt",
    status:"not yet validated",
    currentValue:"—",
    observations:"Pending source design",
    sourceInstitution:"Multiple-source integration planned",
    sourceDocument:"Not yet attached",
    sourceUrl:"Not yet attached",
    retrievalDate:"—",
    revisionHistory:"Not applicable yet",
    methodology:"Requires an explicit operational definition of AI adoption before any statistic can be published.",
    transformedVariables:"None published",
    license:"Pending source-by-source review",
    citation:"Pending validated release",
    downloads:"CSV / Parquet unavailable until validation",
    api:"/api/v1/datasets/egypt-ai-adoption (planned)",
    commit:"No release commit yet"
  },
  {
    aliases:["palestine trade","trade palestine","palestinian trade"],
    title:"Palestine trade",
    kind:"Trade series / document graph",
    geography:"Palestine",
    status:"not yet validated",
    currentValue:"—",
    observations:"Pending ingestion",
    sourceInstitution:"Pending source review",
    sourceDocument:"Not yet attached",
    sourceUrl:"Not yet attached",
    retrievalDate:"—",
    revisionHistory:"Not yet audited",
    methodology:"Planned record will preserve source definitions, partner/product dimensions and revision history.",
    transformedVariables:"None published",
    license:"Pending review",
    citation:"Pending validated release",
    downloads:"CSV / Parquet unavailable until validation",
    api:"/api/v1/series/palestine-trade (planned)",
    commit:"No release commit yet"
  },
  {
    aliases:["jordan corporate lineage","j-clima","company name","company jordan","corporate jordan"],
    title:"J-CLIMA / Jordan Corporate Lineage",
    kind:"Anchor research object",
    geography:"Jordan",
    status:"planned anchor release",
    currentValue:"N/A — entity graph",
    observations:"Target determined after source inventory",
    sourceInstitution:"Corporate registries + issuer documents + market records (source inventory pending)",
    sourceDocument:"Provenance retained per entity edge",
    sourceUrl:"Attached per source in future release",
    retrievalDate:"Recorded per source in future release",
    revisionHistory:"Versioned entity-resolution decisions planned",
    methodology:"Resolve changing company names, identifiers, listings, mergers and successor relationships into auditable longitudinal identities.",
    transformedVariables:"Canonical entity ID; predecessor/successor links; confidence fields; source-edge metadata",
    license:"Source-by-source licensing matrix required",
    citation:"DOI and CITATION.cff planned after validation",
    downloads:"CSV / Parquet / graph export planned",
    api:"/api/v1/entities/{entity_id} (planned)",
    commit:"Release commit will be displayed here"
  }
];

const scoreboard = [
  ["External contributors","0","merged contribution required"],
  ["Universities represented","0","qualifying contributor required"],
  ["Validated releases","0","must pass release standard"],
  ["Independent reproductions","0","public audit evidence required"],
  ["API users","0","outside use only"],
  ["Institutional partners","0","concrete deliverable required"],
  ["Policy uses","0","documented substantive use"],
  ["Citations","0","verifiable scholarly citation"],
  ["Workshop graduates","0","completion standard required"]
];

const result = document.querySelector('#terminal-result');
const input = document.querySelector('#evidence-search');
const searchButton = document.querySelector('#search-button');

function esc(value){return String(value).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#039;",'"':"&quot;"}[c]));}

function renderRecord(record){
  const metadata = [
    ["Current value",record.currentValue],
    ["Historical observations",record.observations],
    ["Source institution",record.sourceInstitution],
    ["Original document",record.sourceDocument],
    ["Source URL",record.sourceUrl],
    ["Retrieval date",record.retrievalDate],
    ["Revision history",record.revisionHistory],
    ["Methodological notes",record.methodology],
    ["Transformed variables",record.transformedVariables],
    ["Licensing status",record.license],
    ["Citation",record.citation],
    ["Downloads / API / commit",`${record.downloads} · ${record.api} · ${record.commit}`]
  ];
  result.innerHTML = `
    <div class="result-top">
      <div><span class="mono">${esc(record.kind).toUpperCase()} / ${esc(record.geography).toUpperCase()}</span><h3>${esc(record.title)}</h3><p>Proof-first catalog record. Missing fields remain visibly missing.</p></div>
      <span class="validation">${esc(record.status).toUpperCase()}</span>
    </div>
    <div class="metadata-grid">${metadata.map(([k,v])=>`<div class="meta-cell"><label>${esc(k)}</label><span>${esc(v)}</span></div>`).join('')}</div>`;
}

function search(){
  const q=input.value.trim().toLowerCase();
  if(!q){return;}
  const record=catalog.find(item=>item.aliases.some(alias=>alias.includes(q)||q.includes(alias))) || catalog.find(item=>item.title.toLowerCase().includes(q));
  if(record){renderRecord(record);return;}
  result.innerHTML=`<div class="empty-state"><span class="mono">NO VALIDATED MATCH</span><h3>${esc(input.value)}</h3><p>No catalog record exists yet. The Terminal does not invent a statistic to satisfy a query. This query can become a source-ingestion task for MODERN.</p></div>`;
}

searchButton.addEventListener('click',search);
input.addEventListener('keydown',e=>{if(e.key==='Enter')search();});
document.querySelectorAll('[data-query]').forEach(btn=>btn.addEventListener('click',()=>{input.value=btn.dataset.query;search();}));

document.querySelectorAll('.workflow').forEach(btn=>btn.addEventListener('click',()=>{
  const labels={dataset:'Dataset builder',event:'Event-study runner',audit:'Provenance auditor'};
  result.innerHTML=`<div class="empty-state"><span class="mono">WORKFLOW SPEC / ${labels[btn.dataset.action].toUpperCase()}</span><h3>${labels[btn.dataset.action]}</h3><p>This action is deliberately exposed before implementation so the product contract is public. It will only run on validated catalog objects with machine-readable provenance; no analysis will silently substitute undocumented data.</p></div>`;
  result.scrollIntoView({behavior:'smooth',block:'center'});
}));

document.querySelector('#scoreboard-grid').innerHTML=scoreboard.map(([name,value,rule])=>`<article class="score"><strong>${value}</strong><h3>${name}</h3><p>${rule}</p></article>`).join('');
