# Workshop 001 — Post-Event Evidence Closeout

Status: **not started; event not yet delivered**

Use this protocol only after the scheduled session has actually occurred, been postponed, or been cancelled.

## 1. Resolve event state

Set exactly one factual state in `DELIVERY_RECORD.md`:

- `delivered`
- `postponed`
- `cancelled`

Do not use `delivered` unless retained evidence supports an actual live session.

## 2. Freeze the live-materials commit

Record the exact commit used for the live session. Compare it with `PRE_DELIVERY_FREEZE.md` and `PRE_DELIVERY_CHANGES.csv`.

If the live object differed materially from the pre-delivery object, state the difference. Do not silently back-edit the freeze record.

## 3. Attendance evidence

From private registration/attendance records, enter only aggregate public counts unless participant-level publication permission exists.

Required public fields:

- registration count
- attendance count
- counting rule
- duplicate/no-show treatment

Do not publish email addresses or raw attendance exports.

## 4. Participant reproduction evidence

For every attempt, append a row to `reproduction_log.csv`.

A pass requires the participant, without facilitator-only files, to recover:

- 56 rows
- all four expected group means
- DiD result `2.6679167`

Record failed and partial attempts as well as passes. A participant fixing an error after facilitator intervention is not an unaided pass unless the log says so explicitly.

## 5. Discrepancy closure

Every material discrepancy encountered live must be preserved with:

- discrepancy ID
- what the participant observed
- expected behavior
- affected file/version
- severity
- resolution
- repair commit, if any
- whether the repair changes the research object or only documentation

Do not delete a discrepancy after repair.

## 6. Recording and consent

Record one of:

- public recording released with consent basis
- private recording retained under the applicable consent/retention rule
- no recording created
- recording created but not publishable

Do not leave a public record that implies publication permission merely because a recording exists.

## 7. Feedback

If feedback is collected, publish only an anonymized aggregate summary unless explicit attribution permission exists. Preserve negative feedback and methodological criticism; the summary is an evidence record, not a testimonial page.

## 8. Registry updates

Only after the factual delivery record is complete:

- update `data/releases.json`
- update `data/publications.json`
- update `data/validation.json` if and only if the evidence supports a changed validation state
- update external-use/reproduction records only for qualifying attributable evidence

A workshop being delivered does not automatically imply independent reproduction. A participant pass may support a bounded reproduction record only if the participant is non-author, the attempt is inspectable, and the exact materials version is recorded.

## 9. Archive

Freeze the closeout commit and, if the workshop package is being treated as a citable release, add the release/archive identifier and citation metadata. The archive must point to the delivered materials object rather than moving `main`.

## Final integrity check

Before closing the workshop record, answer:

> Could an outside reader distinguish what was prepared before the event, what actually happened live, what participants independently achieved, what failed, and what changed afterward?

If not, the closeout is incomplete.
