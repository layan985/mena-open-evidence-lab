# Answer Key

## Data integrity
- Expected rows: **56** (8 regions × 7 years).
- Expected region-year duplicates: **0**.
- `treated` should be constant within each region.
- `post=1` beginning in 2022 for every region.
- The supplied teaching dataset has no missing values.

## Group means
Using the bundled synthetic panel:

- Treated, pre-2022 mean employment: **59.690625**
- Treated, post-2022 mean employment: **64.261667**
- Control, pre-2022 mean employment: **62.561875**
- Control, post-2022 mean employment: **64.465000**

Simple difference-in-differences estimate:

**2.6679167 percentage points**

Small differences in the last decimal from display/rounding are acceptable.

## Interpretation
In this synthetic exercise, the treated regions' employment rate rises by about 2.67 percentage points more than the control regions after 2022, relative to their respective pre-period means.

That sentence is a description of the synthetic design. It is not evidence about any real policy.

## Causal reasoning
A causal interpretation of DiD generally requires a credible counterfactual trend assumption: absent treatment, treated and control outcomes would have evolved comparably. Pre-period trends are useful diagnostics but cannot prove the assumption.

Eight clusters are far too few to treat conventional cluster-robust asymptotics casually. A real application should consider design-specific inference, small-cluster corrections or wild-cluster bootstrap where appropriate, and substantive sensitivity analysis.

A real policy study would also require, among other things, documented policy assignment, credible comparison units, treatment timing, measurement validity, confounder assessment, sampling/data-generation knowledge, attrition/missingness rules, and a pre-specified or well-justified analysis plan.

## Reproduction criterion
A participant passes the handoff if a second participant can reproduce:
1. the 56-row contract;
2. all four group means; and
3. the 2.6679167 DiD result
using only the public workshop repository and instructions.
