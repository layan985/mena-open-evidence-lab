# Participant Exercise

You are given `data/panel.csv`, a synthetic region-year panel for eight regions from 2018–2024. Regions R1–R4 receive a hypothetical employment-support policy beginning in 2022; R5–R8 do not.

## Task 1 — inspect the raw data
1. Confirm the panel has 56 rows.
2. Check that every region appears once per year.
3. Check that `treated` is constant within region.
4. Check that `post` switches from 0 to 1 in 2022 for all regions.
5. Identify any missing values.

## Task 2 — create the treatment interaction
Create:

`did = treated * post`

Document the transformation rather than editing the CSV manually.

## Task 3 — calculate the four group means
Calculate mean employment for:
- treated / pre-2022
- treated / post-2022
- untreated / pre-2022
- untreated / post-2022

Then calculate the simple difference-in-differences estimate:

`(treated_post - treated_pre) - (control_post - control_pre)`

## Task 4 — estimate a regression
Estimate a basic specification equivalent to:

`employment_rate ~ treated + post + treated:post`

The coefficient on the interaction is the simple DiD estimate.

If your software supports it, next estimate a model with region and year fixed effects and cluster standard errors at region level. Do not treat the tiny teaching panel as adequate for real inference.

## Task 5 — diagnostic thinking
Answer briefly:
1. What identifying assumption would a causal interpretation require?
2. Why would examining pre-policy trends matter?
3. Why can eight clusters be problematic for conventional clustered inference?
4. What information is missing before this could represent real policy research?

## Task 6 — reproduction handoff
Give your script/notebook to another participant without explaining your steps verbally. They should be able to reproduce the four means and DiD estimate from the repository alone.

Record any failure in the instructions. A failed reproduction is a documentation bug, not an embarrassment to hide.
