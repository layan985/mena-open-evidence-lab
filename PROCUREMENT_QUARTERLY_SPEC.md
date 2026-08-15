# MENA Procurement Intelligence Quarterly — Publication Specification

_Last updated: 16 August 2026_

## Identifier

`MEL-PQ-YYYY-QN`

## Core sections

1. Executive summary
2. New opportunities
3. Pipeline shifts
4. Award activity
5. Supplier concentration
6. Sector movements
7. Country movements
8. Unusual tenders
9. Methodology
10. Coverage changes
11. Data caveats
12. Source appendix

## Data model

The underlying procurement system normalizes five objects: opportunity, pipeline notice, award, organization and funding source. Each record also carries sector, geography, procurement method where disclosed, source URL, retrieval timestamp and provenance/hash information where available.

## Publication rules

- Every figure and table is generated from code.
- Coverage changes must be disclosed quarter over quarter.
- Headline counts must state the source perimeter.
- Missing award values are not imputed into market-size totals unless a separate, labelled estimation method is published.
- Supplier concentration results require identity-normalization rules and an unresolved-entity report.
- Opportunity relevance is a matching output, not a claim of procurement eligibility or award probability.

## Commercial boundary

The public Quarterly describes the observed market. Client-specific opportunity matching, account targeting and bid-intelligence work remain commissioned outputs and are not silently folded into public research.
