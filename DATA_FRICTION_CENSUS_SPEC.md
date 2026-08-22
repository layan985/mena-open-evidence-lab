# MENA Data Friction Census — Specification v0.1

Released: 22 August 2026

## Research question

How much friction does a researcher face when attempting to find, retrieve, interpret, version and reproduce official economic statistics across MENA?

## What this is not

The Census is **not** a league table of national statistical office quality, independence, competence or credibility. It measures the public reproducibility surface visible to an external user.

A low score on one dimension can reflect platform design, publication practice, rights constraints or archival policy. It is not evidence that the underlying statistic is inaccurate.

## Unit of audit

Primary unit: institution × statistical product family × audit date.

Where infrastructure differs materially across product families, they are scored separately rather than collapsed into one institutional value.

## Nine dimensions

Each dimension is coded 0, 1 or 2 with an evidence URL and retrieval date.

1. **Machine-readable access**
   - 0: publication only / manual transcription required
   - 1: machine-readable files exist inconsistently
   - 2: stable machine-readable download for the audited product

2. **Stable addressing**
   - 0: links are transient, session-bound or routinely overwritten
   - 1: some stable release URLs
   - 2: release-specific stable URLs or identifiers

3. **Definition metadata**
   - 0: material definitions unavailable near the release
   - 1: partial definitions or separate generic documentation
   - 2: product-specific concepts, populations and units documented

4. **Methodology history**
   - 0: historical method changes not recoverable
   - 1: current methodology plus limited change notes
   - 2: dated methodology versions / break documentation

5. **Historical archive**
   - 0: earlier releases are routinely overwritten or unavailable
   - 1: partial archive
   - 2: systematic historical release archive

6. **Rights / license clarity**
   - 0: reuse status unclear
   - 1: general terms exist but dataset-level status is ambiguous
   - 2: explicit reuse/license terms for audited material

7. **Release calendar**
   - 0: no forward calendar found
   - 1: partial or approximate schedule
   - 2: public dated release calendar

8. **Revision transparency**
   - 0: revised values can replace earlier values without a recoverable notice
   - 1: revision policy or occasional notes exist
   - 2: release-level revision status and/or vintage history is recoverable

9. **Programmatic interface**
   - 0: no documented programmatic route found
   - 1: limited/partial API or bulk interface
   - 2: documented API or reproducible bulk query interface for audited product

## Reporting

The public release must show dimension-level evidence before any aggregate score. If a total is reported, it is the transparent sum of the nine 0–2 dimensions (maximum 18), not a hidden weighting system.

Missing evidence is coded `NA` when the audit cannot establish a state; `NA` is not silently converted to zero.

## Reliability

Before region-wide publication:

- two independent coders audit a common calibration sample;
- disagreements are logged dimension by dimension;
- inter-rater agreement is reported;
- institutions may submit corrections with primary-source evidence;
- snapshots/hashes are stored where rights permit;
- an audit date is mandatory because web infrastructure changes.

## Pilot state

Version 0.1 releases the rubric and empty machine-readable audit schema only. Country/institution scores will not be published until the calibration and evidence-retention gates are met.
