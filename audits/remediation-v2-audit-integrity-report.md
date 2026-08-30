# AS9618 remediation v2 — Audit-integrity repair before Stage 5

**Current release decision:** BLOCKED
**Phase status:** Audit-integrity implementation complete; the project has progressed beyond this historical repair phase.

## Change summary

- Corrected the generator defect that placed formal CORE teaching near the end of the page; all 84 generated CORE teaching pages now place CORE before Optional content.
- Reconciled the 360-atom independent official inventory with the 121-row contract in both directions, including the formerly unowned p22 bitwise/label rows and p24 integrity statement.
- Filled every declared first-teaching concept gap and added a direct five-mark assessment of how validation and verification help protect data integrity while preserving L070-Q1 and its total marks.
- Invalidated, then independently revalidated, all 121 requirement conclusions in review epoch remediation-v2-audit-integrity-r2.

## Issue closure table

| Issue | Disposition | Evidence |
|---|---|---|
| RV2-AUDIT-001 | Resolved P0 | 0 official-source problems; 360/360 atoms reconciled; 121/121 current review records |
| RV2-AUDIT-002 | Resolved P0 | 0 first-teaching problems; 84 CORE pages and 70 unique first-use pages checked |
| Stage 5 technical/image defects | Open P0 | RV2-CONT-001, RV2-PSEUDO-001 and RV2-PSEUDO-002 remain untouched |

## Passed evidence

- Official-source gate: Ready; unmapped=0, phantom=0, partial claim=0, page mismatch=0.
- Pedagogical gate: Ready; CORE-not-first=0, Optional-before-CORE=0, CORE-after-Optional=0, buried-CORE=0, missing concept=0.
- Coverage evaluation: 121 Complete, 0 Partial after current-hash review; prior approvals were not inherited.
- L009 browser evidence: the bitmap file-size and metadata CORE section is the first substantive teaching block on 1440x900 and 390x844; CORE begins at 2.4% and 3.3% of the document; no overflow or console warning/error; contents navigation reaches #stage2-completion.
- L070-Q1 keeps its stable ID and five marks and passes correct, common-error, boundary and out-of-scope trial cases.

## Active failed samples

- Removing the official vector atom or its S1.09 owner fails.
- Removing p22 bitwise instruction ownership from S4.15 or p24 integrity ownership from S6.07 fails.
- Inventing contract wording or adding an unowned official statement fails.
- Moving Optional content before CORE, burying CORE or removing a first-teaching concept fails.

## Command evidence

- node scripts/repair-remediation-v2-audit-integrity.mjs — reconciles explicit source ownership and exact pages.
- node scripts/apply-stage2-repairs.mjs — regenerated 84 CORE teaching pages from the corrected CORE-first insertion rule.
- node scripts/test-remediation-v2-audit-integrity-mutations.mjs — all active negative controls rejected.
- node scripts/verify-syllabus-coverage.mjs — reaches only the deliberately deferred Stage 5 L050/L108/L122/L134 blockers.
- node scripts/verify-remediation-v2-audit-integrity.mjs — verifies this phase and current browser evidence.

## Failed / open

- Release remains BLOCKED because three Stage 5 P0 issues remain open.
- The full syllabus verifier currently reports the known L050 performance-factor, L108/L134 CHAR-function and L122 supplied-function failures; this phase did not modify them.

## Unverified

- Stage 5 technical content and critical images.
- Stage 6 full 784-image two-pass review, 971 visual-object census and 308 browser records.
- Stage 7 independent final review and reproducible double-generation gate.

## Remaining risks

- Static and representative-browser evidence closes the known buried-CORE failure class, but it does not replace the planned Stage 6 all-page browser matrix.
- The current decision is not a release approval and does not authorise commit, push or publication.

## Stop condition

Do not start Stage 5 until the user approves progression from this audit-integrity repair phase.
