# MENA Evidence Lab — Proposed Evidence & QA Work Package

**Opportunity:** UNDP-R47-00326 — Provision of Data Visualization Services  
**Beneficiary:** Jordan / UNDP Regional Center in Amman  
**Use:** Teaming/subcontract note for a visualization or data-engineering prime

## What the Lab would own

MENA Evidence Lab can take a narrow evidence-engineering and analytical QA work package behind the GKI 2026 visualization layer.

### 1. Dataset intake and release control
- Validate the finalized GKI 2026 input package against the agreed schema.
- Create a frozen input manifest with filenames, versions, row counts and hashes.
- Record every transformation used between source data and visualization-ready outputs.
- Flag missing, duplicate, out-of-range or structurally inconsistent observations before UI integration.

### 2. Indicator and denominator QA
- Check indicator definitions, units, directions and denominators used in charts and comparative statements.
- Verify that country/year filters cannot silently combine incompatible series or coverage regimes.
- Produce a compact exceptions register for any indicator requiring special treatment.

### 3. Reproducible visualization data layer
- Generate deterministic chart-ready tables from the frozen source package.
- Keep display formatting separate from analytical transformations.
- Provide validation checks for ranking, percentile, aggregation and change calculations used in the interface/publication.

### 4. Claim-level validation
For headline insights or narrative callouts derived from GKI 2026:
- resolve each claim to the exact underlying observations;
- reproduce the calculation independently;
- log any caveat involving coverage, missingness, ties, revisions or denominator changes;
- provide a final validation status before publication.

### 5. Handover package
- source/input manifest;
- transformation log;
- QA test results;
- exceptions/limitations register;
- reproducible preparation scripts or notebooks where contractually appropriate;
- short technical handover note for the prime and UNDP team.

## Why this is useful to a prime contractor

The prime remains responsible for design, implementation, interactive visualization, portal integration, accessibility and delivery. The Lab's role is deliberately narrower: make sure the numbers and analytical transformations behind those products are inspectable and reproducible.

This reduces the risk of a visually correct product encoding a wrong ranking, denominator, transformation or stale version of the dataset.

## Delivery structure

Suggested engagement structure:

1. **Pre-build audit:** frozen dataset + QA findings.
2. **Build support:** chart-ready tables + validation functions.
3. **Pre-launch audit:** independent reproduction of material calculations and claims.
4. **Handover:** manifest, logs, exceptions and reproducibility package.

## Scope boundary

MENA Evidence Lab should not be presented as the prime visualization vendor unless it independently satisfies the solicitation's corporate experience and technical requirements. This note is designed for a subcontract/team role alongside a qualified visualization/data-engineering company.

## Public proof of method

- MENA Vintage Vault — preserves historical official-data releases and revisions.
- MENA Data Revision Atlas — observation-level release/revision provenance specification.
- Measurement Stability Framework — revision exposure, archive reconstructability and methodological-shock treatment.
- Commissioned Work Standard — scoped evidence work with QA, provenance and review boundaries.

**Site:** https://menaevidencelab.org/
