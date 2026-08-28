# AS9618 remediation v2 — Stage 1 gate repair report

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 2.

## Change summary

- Bulk semantic approval is disabled; the wording generator creates Pending records only.
- Approved review rows now require independent-review status, evidence location, current content hash, reviewer ID, review round and page-specific official basis.
- Coverage evaluation now checks requirement-specific CORE sections, worked examples, practice/MS, direct questions and declared visual evidence.
- The sequence model evaluates 109 consecutive official-order edges, all declared prerequisites and all direct-assessment first uses.
- One canonical current release-decision artifact replaces conflicting legacy conclusions.

## Issue closure table

| Issue | Stage 1 disposition | Evidence / next stage |
|---|---|---|
| RV2-GATE-001 | Resolved | scripts/generate-cie-wording-register.mjs rejects every command-line approval option; scripts/remediation-v2-review-gate.mjs requires independent status, evidence location, current hash, reviewer, round and page-specific official basis |
| RV2-GATE-002 | Resolved | audits/remediation-v2-current-decision.json is the sole current release-decision artifact; scripts/verify-scientific-audit.mjs classifies both earlier scientific reports as historical evidence |
| RV2-COV-001 | Open | Stage 2 |
| RV2-COV-002 | Open | Stage 2 |
| RV2-SCOPE-001 | Open | Stage 2 |
| RV2-SCOPE-002 | Open | Stage 2 |
| RV2-SEQ-001 | Open | Stage 3 |
| RV2-ID-001 | Open | Stage 3 |
| RV2-WORD-001 | Open | Stage 4 |
| RV2-MS-001 | Open | Stage 4 |
| RV2-CONT-001 | Open | Stage 5 |
| RV2-PSEUDO-001 | Open | Stage 5 |
| RV2-PSEUDO-002 | Open | Stage 5 |

## Passed evidence

- Review register: 2046 records; Approved=0, Pending=2046, Rejected=0. No old Approved value was inherited.
- Decision gate: Valid; one current conclusion, BLOCKED.
- Stage 1 mutation suite rejects missing approval metadata, one's-complement conversion, processor type, bus width, supplied-function signatures, CHAR/STRING misuse and official first-use inversions.

## Active failed samples

- The current semantic gate is intentionally Blocked with 135 findings; a Ready result at this stage would be a false positive.
- Current critical blockers detected: CRIT-L049-PERFORMANCE-FACTORS, CRIT-L107-CHAR-FUNCTION-TYPE, CRIT-L121-PROVIDED-FUNCTIONS, CRIT-L133-CHAR-FUNCTION-TYPE, CRIT-L133-PROVIDED-FUNCTION, CRIT-S1.03-ONES-COMPLEMENT.
- Current order model detects 25 first-use/prerequisite/assessment problems.
- Passing the --approve option to the wording-register generator exits non-zero before writing.

## Command evidence

- node scripts/verify-remediation-v2-stage0.mjs — exit 0; historical baseline and legacy-source rejection verified.
- node scripts/verify-remediation-v2-current-decision.mjs — exit 0; sole current decision BLOCKED.
- node scripts/test-remediation-v2-stage1-mutations.mjs — exit 0; all required mutations rejected.
- node scripts/verify-remediation-v2-stage1.mjs — exit 0; Stage 1 implementation accepted by its verifier.
- node scripts/verify-scientific-audit.mjs — exit 0; legacy APPROVED explicitly classified as historical, then current BLOCKED reported.
- node scripts/verify-cie-wording.mjs — expected exit 1; 0/2046 independently Approved.
- node scripts/verify-syllabus-coverage.mjs --schema-only — expected exit 1; 121/121 exact first-use anchors pending Stage 2.
- node scripts/verify-curriculum-sequence.mjs — expected exit 1; 25 current ordering blockers detected.

## Failed / open

- Remaining defect register: 11 Open; P0=4; P1=7.
- Course content, syllabus contract, lesson order, CIE wording, mark-scheme presentation and technical visuals are not repaired in Stage 1.

## Unverified

- No Pending wording row has received independent semantic approval.
- No Stage 2-7 acceptance condition is claimed.
- Full verify-all and browser QA are deferred because the sole current decision remains BLOCKED.

## Remaining risks

- The stricter gate depends on Stage 2 adding exact firstTeachingEvidence anchors to all 121 requirements.
- Current content must continue to fail until its owning repair stage closes each named defect.
- Commit, push and publication remain unauthorised.

## Stop condition

Do not start Stage 2 until the user approves Stage 1. Stage approval authorises progression only; it is not a release decision.
