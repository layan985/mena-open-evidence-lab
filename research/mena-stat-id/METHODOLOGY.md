# MENA-STAT-ID methodology

## Research question

Can a retrieval or language system return an official MENA statistic while preserving the fields that make the observation interpretable and historically valid?

## Contribution boundary

Statistical metadata standards already treat dimensions and attributes as necessary for identifying and interpreting observations. MENA-STAT-ID does not claim to invent statistical metadata. It turns identity loss into an explicit evaluation error and applies that test to bilingual, revision-sensitive official evidence from MENA.

The novelty claim remains provisional until the literature review and external methods review are complete.

## Alpha composition

The deterministic builder produces 42 cases and 84 Arabic/English prompt variants:

| Family | Cases | Main failure mode |
| --- | ---: | --- |
| Statistical identity | 4 | correct number, wrong population |
| Comparison validity | 3 | false comparability |
| Vintage retrieval | 2 | later value substituted for named vintage |
| Decision-time retrieval | 1 | future information leaked backward |
| Revision interpretation | 1 | qualitative sign change omitted |
| Revision pair | 10 | first/later vintage collapsed |
| Bilingual archive | 6 | archive timestamps mistaken for dissemination |
| Method regime | 15 | method version or bridge class discarded |

These cases are purposive. The counts describe the alpha only.

## Gold construction

The alpha consumes existing machine-readable Lab records. It does not perform fresh extraction from websites during the build.

1. Load the five canonical input files.
2. Convert each record into a task-specific prompt and structured gold answer.
3. Attach source URLs and the originating Lab object.
4. Declare fields used for automated scoring.
5. Preserve interpretive fields requiring human review separately.
6. Run structural and perfect-score tests.

Arabic prompts are controlled translations generated with fixed templates. Native-speaker review is still required before a stable release.

## Primary metric

**Statistical Identity Exact Match**

For prompt i, let R_i be the declared required fields. Exact match equals one only when every field in R_i matches the gold record after minimal whitespace and case normalisation. Numeric values use absolute tolerance 0.000001.

The benchmark score is the mean exact match across all prompt variants. Missing predictions score zero in the full-benchmark metric.

## Secondary metrics

- **Required Field Accuracy:** correct required fields divided by all scored required fields.
- **Coverage:** submitted prompt variants divided by expected variants.
- **Confidently Wrong Rate:** incorrect exact-match answers among submissions with self-reported confidence of at least 0.80.
- **Language split:** exact match reported separately for Arabic and English.
- **Task-family split:** exact match reported separately by failure mode.

Self-reported confidence is diagnostic and is not treated as calibrated probability.

## What would falsify or weaken the project

- Existing benchmarks are shown to evaluate the same official-statistics identity fields, language pairing and vintage conditions.
- Independent coders cannot reproduce the gold fields from the cited sources.
- Arabic and English prompts are not semantically equivalent.
- Exact string scoring proves unstable under substantively equivalent controlled answers.
- The seed cases are too templated to distinguish identity preservation from memorisation.
- Public exposure contaminates the cases before a blind test set is created.

Any of these findings requires a versioned correction, redesign or withdrawal of the affected claim.

## Release gates

The alpha may move to a stable pilot only after:

1. independent audit of at least 20 cases;
2. native-speaker review of all Arabic prompt templates;
3. documented adjudication of every material disagreement;
4. a frozen hidden test partition or rotating evaluation design;
5. a literature review sufficient to bound the novelty claim;
6. a complete changelog and citable archive.

