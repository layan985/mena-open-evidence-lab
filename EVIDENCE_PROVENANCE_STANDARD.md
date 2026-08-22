# MENA Evidence Provenance Standard (MEPS) — v0.1

## Purpose

MEPS is a lightweight release standard for research objects published by the MENA Open Data & Evidence Lab. It is designed so that a reader can inspect where a result came from, which version of the underlying evidence was used, what transformations were applied, what the result can support, and how to reproduce or challenge it.

MEPS does not certify that a result is true. It makes the evidentiary chain inspectable.

## Minimum release record

Every material quantitative claim or dataset release should record, where applicable:

### Source identity
- `source_institution`
- `source_title`
- `source_url`
- `source_type`
- `publication_or_release_date`
- `retrieved_at`
- `archived_source_uri` where legally and technically possible
- `source_hash` where rights permit preservation

### Statistical identity
- `country_or_geography`
- `indicator_or_object`
- `reference_period`
- `population_or_universe`
- `unit`
- `concept_or_definition`
- `method_version`
- `classification_version`
- `price_or_base_reference` when relevant
- `seasonal_adjustment_status` when relevant
- `vintage_or_revision_status`

### Transformation record
- `input_fields`
- `transformations`
- `exclusions`
- `joins_or_linkage`
- `derived_variables`
- `code_location`
- `code_commit`
- `environment_or_package_versions` where material

### Interpretation record
- `claim_supported`
- `claim_boundary`
- `known_limitations`
- `comparability_status`
- `downstream_dependencies`

### Review and correction
- `review_status`
- `reviewer_role` without requiring public identity
- `review_date`
- `correction_route`
- `supersedes`
- `superseded_by`
- `change_log`

### Rights
- `license_or_reuse_status`
- `preservation_constraints`

## Release levels

### MEPS-L0 — exploratory
Source identified, but provenance or transformations remain incomplete. Not suitable for citation as a Lab finding.

### MEPS-L1 — traceable
Source, retrieval date, statistical object, transformations and claim boundary are documented.

### MEPS-L2 — reproducible
L1 plus runnable code or a deterministic reconstruction path, versioned inputs where legally possible, and environment information sufficient for independent reproduction.

### MEPS-L3 — independently checked
L2 plus independent reproduction, external method review, or a second-human verification of the material evidence chain.

Release level describes the documented process, not the importance or correctness of the finding.

## Claim-boundary rule

No Lab release should imply more than the recorded statistical object and method support. If a denominator, concept, method version or vintage mismatch materially changes interpretation, the limitation belongs in the release itself rather than in private working notes.

## Versioning rule

Corrections and revisions should be additive and inspectable. Published material should not be silently replaced where doing so would erase the historical evidence state. Superseded releases may be deprecated, but their existence and relationship to the current release should remain visible.

## Why this matters

Open access to a result is not the same as open evidence. A downloadable number without its version, source, transformation record and claim boundary may still be impossible to reproduce responsibly. MEPS is intended to make the chain of evidence a first-class research object.

## Status

Version 0.1 is a working public standard. It should be revised after external review and after application across multiple Lab releases.
