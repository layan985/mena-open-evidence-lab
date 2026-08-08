# Instructor Guide — 90 Minutes

## 0–10 min — Why reproducibility fails
Open with one rule: if a second researcher cannot recover your result from the repository, the research object is incomplete.

Show the distinction between:
- source data
- raw snapshot
- transformation code
- analysis dataset
- estimator
- output
- citation/version

## 10–25 min — Inspect before estimating
Participants open `data/panel.csv` and check:
- row count
- unique region-year keys
- treatment timing
- missingness
- variable meanings

Ask: what would make this dataset dangerous if it were real?

## 25–40 min — Reconstruct the estimand by hand
Have participants calculate the four group means and the simple DiD estimate before running a regression.

Expected simple DiD: **2.6679167 percentage points**.

Do not reveal the answer until groups have committed to a result.

## 40–55 min — Regression equivalence
Estimate `employment_rate ~ treated + post + treated:post` in the participant's preferred software.

Explain what the interaction coefficient represents and why a regression does not rescue a bad identification design.

## 55–68 min — What breaks in real DiD
Discuss:
- parallel trends / counterfactual trend logic
- treatment anticipation
- staggered treatment
- composition changes
- serial correlation
- few-cluster inference
- outcome redefinition
- sample restrictions

## 68–80 min — Blind reproduction handoff
Pair participants. Person A gives Person B only the repository URL / local workshop folder. No verbal instructions.

Person B must recover:
- 56 rows
- four means
- 2.6679167 DiD

Record every point of friction.

## 80–88 min — Documentation repair
Pairs fix one documentation or reproducibility problem they encountered.

## 88–90 min — Exit ticket
Each participant answers:
1. One thing that can invalidate a reproducible estimate.
2. One provenance field they will add to future work.
3. Whether they reproduced the expected result independently.

## Instructor evidence to archive
- date/time
- agenda
- registration URL
- attendee count
- materials commit SHA
- reproduction pass count
- participant feedback
- recording link only if consented

Workshop metrics must remain zero until the event actually occurs.
