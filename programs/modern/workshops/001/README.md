# MODERN Workshop 001 — Reproduce an Economics Result from Raw Data

**Status:** Scheduled — not yet delivered
**Date:** Sunday, 23 August 2026  
**Time:** 18:00–19:30 Asia/Amman (UTC+3)  
**Format:** Online  
**Registration:** see [`REGISTER.md`](REGISTER.md)

**Level:** undergraduate / early graduate / research assistant  
**Prerequisites:** basic Python or willingness to follow a script  
**Output:** every participant produces a clean table, regression result, figure, and reproducibility check from the same raw file.

## Research question
Did the introduction of a hypothetical employment-support policy increase employment in treated regions relative to untreated regions?

The exercise uses a **synthetic teaching dataset** created for MODERN. It contains no real individuals and makes no empirical claim about an actual policy.

## Files
- `data/panel.csv` — raw synthetic region-year panel
- `analysis.py` — reference analysis
- `workshop_001.ipynb` — participant notebook with the same validation and estimand
- `Workshop_001_Slides.pptx` — participant-facing slide deck with speaker notes
- `exercise.md` — participant tasks
- `answer_key.md` — expected reasoning and checks
- `instructor_guide.md` — 90-minute facilitation plan
- `REGISTER.md` — public RSVP route
- `outputs/` — machine-generated reference table, result file, and figure
- `DELIVERY_RECORD.md` — truthful post-event evidence record; blank until delivery
- `reproduction_log.csv` — discrepancy log for the blind handoff

## Run the reference package

From this folder:

```bash
python analysis.py
```

The command validates the 56-row data contract, calculates the four means, solves the saturated 2×2 regression, verifies the **2.6679167** percentage-point interaction, and rewrites the three files in `outputs/`.

## Learning objectives
Participants should leave able to:
1. distinguish raw from processed data
2. inspect treatment timing and panel structure
3. document exclusions and transformations
4. estimate a simple difference-in-differences specification
5. understand why clustering and pre-trend diagnostics matter
6. reproduce another person's output from a clean environment
7. record provenance and limitations rather than hiding them

## Registration and meeting link
RSVPs are collected by email through `REGISTER.md`. The meeting link is sent only to confirmed participants and is not published in the repository.

## Completion evidence
Workshop 001 counts toward MODERN impact metrics only after:
- registration route is public
- materials are public
- the live workshop is actually delivered
- attendance is archived
- at least one participant other than the instructor completes the reproduction check

Until those conditions are documented in `DELIVERY_RECORD.md`, the Lab describes Workshop 001 only as **scheduled**, never as delivered.

## Integrity boundary
The dataset is synthetic and the workshop is pedagogical. No result from this exercise should be presented as evidence about a real MENA policy or labor market.
