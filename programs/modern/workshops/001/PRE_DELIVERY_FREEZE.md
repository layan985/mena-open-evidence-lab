# Workshop 001 — Pre-Delivery Freeze

Status: **scheduled; not delivered**

Scheduled session: **23 August 2026, 18:00–19:30 Asia/Amman (UTC+3)**

This record defines the research/teaching object intended for live use. It does not prove attendance, delivery, participant reproduction, or external validation.

## Frozen teaching object

The session teaches one bounded reproducibility exercise: reconstruct the supplied panel, recover the four group means, and reproduce the documented difference-in-differences result from the public workshop folder.

Pass criterion for the participant reproduction check remains the one stated in `DELIVERY_RECORD.md`: a participant other than the facilitator recovers **56 rows, all four means, and the 2.6679167 DiD result using only the public folder**.

## Materials inventory

The following existing repository objects form the pre-delivery package. Git blob identifiers are included so a later closeout can establish whether the live materials differed from the pre-event object.

| File | Pre-delivery Git blob |
|---|---|
| `README.md` | `fbd7f7b5ae1123b40c43f17b6df24e8fc8715f39` |
| `REGISTER.md` | `066ab866c7c897093a9e282fadd673ebf208bc03` |
| `Workshop_001_Slides.pptx` | `99d077df4c3d4e422eaad5aa3814c3877e1875a9` |
| `analysis.py` | `8d879101d818e3847cf648805e91adbc123a1e1a` |
| `answer_key.md` | `077524f63624aadfd474acd60cefe734b0fd61f6` |
| `exercise.md` | `bdd0ea4221f5287e8395a82948ab0b616bcdd848` |
| `instructor_guide.md` | `a40aa89fb75b7b1bd8d1452a3f3df035fe8878be` |
| `reproduction_log.csv` | `3f034da1f8cbd8d2b4ca24ad04852560fb08c133` |
| `workshop_001.ipynb` | `cb085ec183fd63d73659f918e3c9f675dff1f38d` |
| `data/panel.csv` | `7da9a27f3281023b68379db492f2f11df0f235d1` |
| `outputs/group_means.csv` | `350e4d511dd8927c6894eb34f66f6c45bd80d6ab` |
| `outputs/mean_employment_by_group.svg` | `ca9a2a377c2008de93af2aacb964b5a6d1eef75e` |
| `outputs/result.json` | `899eb6c94512be8a1bc5ec512011ab2bfd22077d` |

`DELIVERY_RECORD.md` is deliberately not treated as a frozen evidence result because it must change after the event to record what actually happened.

## Allowed public claims before delivery

Permitted:

- Workshop 001 is scheduled for 23 August 2026.
- Public materials are prepared.
- The exercise has a stated reproduction criterion.
- Internal/founder preparation has occurred if separately evidenced.

Not permitted before delivery evidence exists:

- workshop delivered
- participants attended
- participants completed the exercise
- independently reproduced
- external validation completed
- recording available
- workshop graduate count greater than zero

## Change control before the event

A material change is any change to:

- source data
- expected numeric results
- analysis logic
- exercise instructions
- answer key
- notebook execution path
- slide claims about the research object

If a material change is made after this freeze, record it in `PRE_DELIVERY_CHANGES.csv` before delivery and identify the final live-materials commit in `DELIVERY_RECORD.md` after the event.

Typos and accessibility-only changes may be made without altering the research object, but should still be included in the final live commit.

## Attendance and privacy boundary

The public repository must not contain participant email addresses, private registration details, consent forms, IP addresses, or other unnecessary personal data.

Public closeout may report aggregate registration/attendance counts only when backed by retained private records. Named participant credit requires explicit permission. Public reproduction records should use a participant-approved name or an anonymized identifier.

## Recording boundary

No recording/transcript claim is made before the session. Recording may occur only under the event's consent procedure. If consent does not permit public publication, the public record should say that no public recording is released rather than imply a missing artifact.

## Event-day evidence to capture

Retain enough evidence to support, after the event:

- actual start and end time
- final materials commit used live
- aggregate registrations and attendance
- whether slides were delivered
- whether notebook/code was used
- each participant reproduction attempt and result
- discrepancies encountered
- documentation/code repairs arising from discrepancies
- recording/transcript consent outcome
- anonymized feedback summary, if collected

## Closeout rule

The workshop remains `scheduled` until `DELIVERY_RECORD.md` is updated from real event evidence. If it does not occur on the scheduled date, use `postponed` or `cancelled`; never infer delivery from prepared materials or elapsed calendar time.
