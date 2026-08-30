# AS9618 remediation v2 — Stage 2 syllabus contract, coverage and scope report

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 3.

## Change summary

- All 121 logical AS requirements across 12 sections now carry page locators, verbatim candidate statements, adjacent Notes/guidance, the locked Version 2 SHA-256, a Stage 2 review round and a content hash.
- S1.03 now has direct CORE teaching, a worked conversion, targeted practice and stable assessment L005-Q1 for one's complement.
- Sound-file-size calculation, state-transition-diagram construction and production of test strategies/plans are no longer compulsory contract wording.
- 13 affected lessons have an explicit Optional enrichment disposition, formal AS prerequisite, visible student notice and coverage exclusion.

## Issue closure table

| Issue | Stage 2 disposition | Evidence / next stage |
|---|---|---|
| RV2-GATE-001 | Resolved | scripts/generate-cie-wording-register.mjs rejects every command-line approval option; scripts/remediation-v2-review-gate.mjs requires independent status, evidence location, current hash, reviewer, round and page-specific official basis |
| RV2-GATE-002 | Resolved | audits/remediation-v2-current-decision.json is the sole current release-decision artifact; scripts/verify-scientific-audit.mjs classifies both earlier scientific reports as historical evidence |
| RV2-COV-001 | Resolved | scripts/syllabus-official-as-mapping.mjs maps all 121 logical requirements to verbatim candidate statements and adjacent Notes on pages 14-31; scripts/verify-syllabus-coverage.mjs validates each mapping, review round and content hash; S1.08/S1.10/S1.11 no longer contain unrelated Notes |
| RV2-COV-002 | Resolved | L005 CORE teaching now includes a worked 8-bit one's-complement conversion and direct targeted practice; L005-Q1 is a stable four-mark direct one's-complement conversion and S1.03 maps it explicitly |
| RV2-SCOPE-001 | Resolved | S1.10 removes compulsory sound-file-size calculation; S12.03 removes construction; S12.06 removes production; L012, L145 construction practice and L146 production practice are retained only as labelled Optional enrichment |
| RV2-SCOPE-002 | Resolved | scripts/remediation-v2-optional-enrichment.mjs records 13 lesson dispositions with formal AS prerequisites and exclusion policy; Markdown and HTML show visible Optional enrichment notices; listed HTML sections are OPTIONAL/EXTEND and excluded by the coverage evaluator |
| RV2-SEQ-001 | Open | Stage 3 |
| RV2-ID-001 | Open | Stage 3 |
| RV2-WORD-001 | Open | Stage 4 |
| RV2-MS-001 | Open | Stage 4 |
| RV2-CONT-001 | Open | Stage 5 |
| RV2-PSEUDO-001 | Open | Stage 5 |
| RV2-PSEUDO-002 | Open | Stage 5 |

## Passed evidence

- Stage 2 repository gate: Passed; 121 mappings, 12 sections, one's-complement surfaces and 13 Optional dispositions checked.
- Contract schema gate: 121 unique requirements, evidence interfaces and acyclic declared prerequisite graph passed.
- Mutation suite rejects all seven required negative controls; a passing result cannot be produced by removing a required surface or reintroducing an official-scope overclaim.
- Current defect register: Resolved=6; Open=7; open P0=3; open P1=4.

## Active failed samples

- Full semantic gate remains Blocked with 39 findings: 0 requirement-evidence messages, 25 sequence problems and 14 later-stage critical controls.
- Generated coverage audit: 121 Complete and 0 Partial. Requirement teaching, worked example, practice, assessment and required visual evidence are now traceable; later sequence and technical controls remain separate blockers.
- Current critical IDs remaining for Stage 5: CRIT-L050-PERFORMANCE-FACTORS, CRIT-L108-CHAR-FUNCTION-TYPE, CRIT-L122-PROVIDED-FUNCTIONS, CRIT-L134-CHAR-FUNCTION-TYPE, CRIT-L134-PROVIDED-FUNCTION.

## Command evidence

- node scripts/verify-syllabus-coverage.mjs --schema-only — exit 0; 121-row schema and exact official mappings passed.
- node scripts/verify-remediation-v2-stage2.mjs — exit 0; Stage 2 repository acceptance passed.
- node scripts/test-remediation-v2-stage2-mutations.mjs — exit 0; seven active mutations rejected.
- node scripts/generate-syllabus-audit.mjs — exit 0; generated 121 Complete and 0 Partial rows.
- node scripts/generate-curriculum-sequence-audit.mjs — exit 0; generated 25 active sequence blockers.
- node scripts/verify-syllabus-coverage.mjs — expected exit 1; the full gate reports 39 current findings assigned to later repair stages.

## Failed / open

- Remaining defect register: 7 Open; P0=3; P1=4.
- Stage 3 must repair official first-use order and lesson identity; the 25 detected inversions remain explicit blockers even though the Stage 2 evidence rows are Complete.
- Stage 4 wording/mark-scheme and Stage 5 technical/image defects remain open.

## Unverified

- No Stage 3 ordering change, Stage 4 wording approval, Stage 5 image repair, Stage 6 browser/image census or Stage 7 independent final review is claimed.
- Full verify-all and browser QA are deferred while the sole release decision remains BLOCKED.

## Remaining risks

- The exact-source mapping and Complete coverage rows do not prove official teaching order or the Stage 5 high-risk technical/image controls; those gates remain independently BLOCKED.
- L060 official error content is still too early; only its non-contract base sections are Optional in Stage 2. Stage 3 must restore the official CORE first-use order.
- Commit, push and publication remain unauthorised.

## Stop condition

Do not start Stage 3 until the user approves Stage 2. Stage approval authorises progression only; it is not a release decision.
