# Procurement Intelligence 1.0 Release Gate

## Current state

**Public preview. Not a 1.0 data release.**

The current browser artifact is a reproducible World Bank-only preview with a canonical award-corpus count, opportunity and plan snapshots, normalized explorer rows, declared limitations, and a machine-readable part manifest.

The preview validator is:

```bash
node scripts/validate-procurement-preview.mjs
```

The stricter 1.0 promotion check is:

```bash
node scripts/check-procurement-1.0-gate.mjs
```

A failing 1.0 gate is an accurate release-blocking state, not evidence that the public preview is invalid.

## Source perimeter

Current structured perimeter:

- World Bank current procurement opportunities
- World Bank procurement plans
- World Bank IPF contract awards since FY2020

The current release does **not** claim UNGM, European Union, GIZ, or universal multilateral procurement coverage.

## 1.0 gate

### Released research object

- [x] Source perimeter is explicitly named.
- [x] Snapshot has an acquisition timestamp.
- [x] Canonical award-corpus count is linked to the release registry.
- [ ] Every normalized award row counted in the headline corpus is shipped as a release row, not only an explorer slice.
- [ ] Release data are downloadable independently of the browser interface.

### Provenance and archive

- [x] Official source-family URLs are declared.
- [x] Source licenses/access notes are declared at source-family level.
- [ ] A machine-readable source manifest records acquisition URL, retrieval timestamp, source-family identifier, archive treatment and hash where an archived source object is permitted.
- [ ] Non-archived/live API sources have explicit deterministic acquisition notes.
- [ ] A checksum manifest covers released normalized data and QA artifacts.

### Normalization QA

- [x] Public preview parts are contiguous, byte-counted and JSON-parseable.
- [x] Public notice IDs are unique in the shipped snapshot.
- [x] Public plan IDs are unique in the shipped snapshot.
- [x] Contact-email fields are removed from the public artifact.
- [x] Award amounts in the shipped explorer rows are null or finite non-negative values.
- [ ] Full-corpus exact-duplicate test passes on the released normalized award rows.
- [ ] Full-corpus key-collision report is published, including legitimate multi-supplier/joint-venture cases.
- [ ] Missingness report covers core award, notice and plan fields.
- [ ] Country-normalization and source-perimeter checks are published as a QA report.

### Reproducibility

- [x] Acquisition and normalization code is public.
- [x] Browser-part generation code is public.
- [ ] One documented command regenerates the released normalized object and QA report from the stated source perimeter.
- [ ] Tables and charts used in the 1.0 report regenerate from the released object rather than a separate analyst file.
- [ ] A clean-environment run is recorded.

### Publication package

- [x] Methodology and limitation language exists in the product artifact.
- [x] Procurement quarterly publication specification exists.
- [ ] Data dictionary is frozen against the 1.0 object.
- [ ] Metric dictionary is frozen against the 1.0 object.
- [ ] Citation metadata identifies the exact release.
- [ ] Release notes/changelog identify the change from public preview to 1.0.
- [ ] Stable release commit is frozen.

## Current blocking issue

The current snapshot reports the full matching MENA award-corpus count while the browser object ships a capped `explorerRows` subset. That is legitimate for a preview, but it is insufficient for a 1.0 dataset release because the full counted research object cannot yet be independently duplicate-checked, missingness-audited, or downloaded from the repository.

The correct next data change is to publish the full normalized award release table, or to redesign the headline metric so it refers only to a fully released and auditable object. The 1.0 label stays blocked until one of those paths is completed and documented.

## Promotion rule

Do not change `procurement-intelligence` from `public-preview` to a 1.0/stable state merely because the dashboard works or because the headline count is correct. Promotion requires the released data object, QA evidence, provenance/archive record, citation package, and reproducible generation path to agree.
