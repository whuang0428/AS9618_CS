# AS9618 remediation v2 — Stage 0 baseline and reopened defects

**Current decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 1.

## Official baseline

| Source | Version / publication | Pages | SHA-256 |
|---|---|---:|---|
| Cambridge International AS & A Level Computer Science 9618 syllabus for 2027, 2028 and 2029 | Version 2; December 2025 | 49 | `c8a4c6d033c07c6d8025689abed5ef481d581c28bae640986d275303ed6c08bc` |
| Cambridge 9618 2027-2029 syllabus update | Version 2 update; December 2025 | 1 | `7a6d305a3370f8aa006eac43bc21be298e1d77bcabfcc57aa677016cb33b869e` |
| Cambridge 9618 Pseudocode Guide for Teachers for 2027, 2028 and 2029 | Version 1; 2024 | 31 | `04f42cc247cc49e069543aef242dbc6d1d89d4f3539c23148683386cebb2c4b7` |

## Frozen inventory

| Item | Count |
|---|---:|
| lessons | 150 |
| pages | 153 |
| pageViewsPlanned | 306 |
| questions | 963 |
| assessmentSets | 51 |
| stage10Images | 783 |
| visualObjects | 969 |
| syllabusRequirements | 121 |
| generators | 25 |
| manifestEntries | 2125 |

The item-level manifest is `audits/remediation-v2-stage0-manifest.csv` with SHA-256 `3691a8e141c8974bb6a793c3eddf9b9b18db177e65d4e9e68ef992290d70677c`.

## Passed

- A new remediation-v2 baseline is separated from every legacy Approved/BLOCKED report.
- The baseline freezes current lesson, page, question, assessment-set, Stage 10 image and generator identities by SHA-256.
- Pre-existing untracked paths are excluded and protected: `handover.md`, `scripts/__pycache__/`, `参考书籍/`.
- The current decision source is `audits/remediation-v2-defects.json`; its decision is BLOCKED.
- Stage 0 verification includes a negative control: an in-memory mutation to APPROVED and a legacy-current-source substitution must both be rejected.

## Failed / open

- Reopened issues: 13; P0=6, P1=7.
- Gate trust, official coverage, sequence, wording, mark-scheme presentation and named content/visual defects remain open by design.

## Unverified

- No legacy semantic Approved flag has been revalidated.
- No course, assessment, image, generator, browser or release repair from Stages 1-7 has been accepted.
- Full publication readiness is not evaluated in Stage 0.

## Stop condition

Do not start Stage 1 until the user approves this baseline and reopened-defect scope. Commit, push and publication remain separately unauthorised.
