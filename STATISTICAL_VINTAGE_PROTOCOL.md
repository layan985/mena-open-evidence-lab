# MENA Statistical Vintage Protocol v0.1

_Last updated: 20 August 2026_

## Purpose

The MENA Statistical Vintage Register (MSVR) records what an official statistic said at a specific point in time. It is designed for real-time-data research: later values are appended as new vintages rather than used to overwrite the information set that was available earlier.

The governing question is simple:

> What could a careful analyst have known from the official public record at this date?

## Unit of observation

A register observation should record, where applicable:

- record ID;
- jurisdiction;
- statistical authority;
- indicator and reference period;
- release stage (flash, preliminary, full, revised, benchmark/rebased);
- official release date;
- Lab freeze/retrieval date;
- value, unit and transformation;
- population or economic scope;
- seasonal-adjustment status;
- price/volume basis and reference year;
- methodology or classification version when known;
- official release URL;
- source-file name(s);
- source-file SHA-256 when binary bytes were actually retrieved;
- predecessor/successor vintage IDs;
- revision magnitude when a comparable later vintage exists;
- comparability state;
- validation state;
- limitations and retrieval notes.

A field is left null or explicitly marked unverified when the public source does not support it. Missing metadata are not inferred.

## Record states

**LIVE** — a vintage is frozen before a later comparable official vintage has been recorded by the Lab.

**REVISION** — a later comparable official vintage has been observed and the numerical change can be computed without crossing a documented methodology break.

**BREAK** — a rebasing, scope change, classification change, reconstruction or other methodological discontinuity means that the difference should not be treated as an ordinary revision without additional work.

## Freeze rule

A LIVE record is immutable with respect to the value and metadata observed at freeze time. If the publisher later changes the estimate, the new value becomes a new record linked to the earlier one. The earlier row is not edited to match the later publication.

Corrections to Lab transcription errors are permitted but must be logged as corrections; they are not statistical revisions.

## Revision rule

For two directly comparable vintages of a rate expressed in percent:

`revision_pp = later_value - earlier_value`

Direction is reported algebraically. A change from 2.7% to 3.4% is +0.7 percentage points. Relative percentage change is not substituted for the percentage-point revision unless explicitly required by the research question.

Where levels are compared, the unit of the level is preserved and the revision formula is stated with the observation.

## Comparability rule

A numerical difference is not automatically a revision. Before computing a revision statistic, the Lab checks whether the two observations refer to the same statistical object: indicator, reference period, scope, price/volume concept, seasonal-adjustment treatment and material methodology.

If comparability is uncertain, the record remains open or is marked BREAK rather than forcing a revision number.

## Source rule

Primary official sources take precedence. The register records the official release object and source-file identity where available. A source hash is published only when the underlying binary bytes were actually retrieved and hashed. A portal URL, HTML wrapper, filename or search result is not represented as a file hash.

## Claim boundary

A LIVE record is not a forecast that the statistic will be revised. The later official value may move up, move down or remain unchanged. All three outcomes are informative.

The register therefore separates:

`observed at time t` → `later official vintage` → `measured revision, if comparable`

from any prediction about what the later vintage will be.

## Relationship to the MENA Data Revision Atlas

MSVR is the time-of-knowledge layer of the MENA Data Revision Atlas. The Atlas can study historical first-release/revision chains reconstructed from archives; MSVR additionally creates prospective, timestamped records before the later vintage is known. Prospective records reduce hindsight risk and make the comparison rule auditable in advance.

## Validation

A source-linked Lab freeze may be published with internal QA while independent reproduction remains pending. Validation labels describe work actually completed; they are not reputational badges.
