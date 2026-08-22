# MENA Firm AI Adoption Ladder — Specification v0.1

Released: 22 August 2026

## Purpose

Extend the Lab's existing firm AI and labour panel by separating rhetorical technology disclosure from evidence of operational adoption.

## Ordered evidence states

0. **No public evidence identified** — no qualifying AI disclosure inside the documented source perimeter.
1. **Generic disclosure** — AI is mentioned without a named workflow, product, function or deployment.
2. **Specific use case** — a concrete workflow, business function, product or internal task is named.
3. **Operational deployment** — evidence indicates the use case is deployed in operations rather than merely planned or piloted.
4. **Organizational adjustment** — deployment is linked to a documented change in workflow, role design, hiring, training, staffing or organizational structure.
5. **Measured outcome** — the firm reports a measurable operational, financial or workforce outcome tied to the deployment, with a source that permits the claim boundary to be inspected.

## Coding rule

The highest state requires evidence for every lower evidentiary condition needed to support it. Marketing language is not upgraded to deployment without operational evidence. A workforce change is not attributed causally to AI unless the source or research design supports that attribution.

## Core fields

firm · country · sector · disclosure_date · source_type · source_url · adoption_state · named_workflow · deployment_evidence · workforce_evidence · measured_outcome · causal_claim_allowed · coder · second_coder · disagreement · source_hash

## Research questions

- How large is the gap between AI disclosure and operational deployment across MENA firms?
- Which sectors move from generic language to specific operational use fastest?
- Does operational adoption precede observable changes in hiring mix, training, occupational composition or workforce size?
- How sensitive are apparent adoption rates to source type and disclosure incentives?

## Claim boundary

The ladder measures public evidence of adoption, not true unobserved adoption. Firms can use AI without disclosing it, and public disclosure can overstate operational depth. The panel must therefore be described as source-bounded rather than representative of all firm activity.
