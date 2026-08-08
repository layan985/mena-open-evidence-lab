# MODERN Release QA Checklist

A release reviewer should complete this checklist before approval.

## Source and legality
- [ ] Primary or authoritative source identified
- [ ] Retrieval date recorded
- [ ] Source URL or archive reference recorded
- [ ] Redistribution/license status documented
- [ ] Restricted data are not redistributed unlawfully

## Data integrity
- [ ] Raw inputs preserved unchanged
- [ ] Cleaning/transformation code is version-controlled
- [ ] Variable names, units, geography, and time coverage documented
- [ ] Duplicate checks completed
- [ ] Missingness summarized
- [ ] Identifier uniqueness/key assumptions tested
- [ ] Row counts reconciled between major pipeline stages

## Reproducibility
- [ ] Environment/dependencies documented
- [ ] One-command or clearly ordered reproduction instructions exist
- [ ] Random processes use fixed/documented seeds where relevant
- [ ] Processed output recreated by reviewer or hashes verified
- [ ] Critical outputs are covered by tests or explicit validation checks

## Research usability
- [ ] Data dictionary present
- [ ] Methodology/limitations present
- [ ] Known breaks/revisions documented
- [ ] Citation instructions present
- [ ] Machine-readable output provided when lawful

## Release metadata
- [ ] Version number assigned
- [ ] Changelog updated
- [ ] Contributor roles credited
- [ ] License stated
- [ ] DOI/archive added when applicable
- [ ] Evidence URL entered in `tracking/releases.csv`

## Reviewer decision
- [ ] APPROVE
- [ ] REQUEST CHANGES
- [ ] BLOCK — licensing/provenance/methodological issue

Reviewer:
Date:
Evidence/PR:
