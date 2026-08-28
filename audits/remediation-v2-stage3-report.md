# AS9618 remediation v2 — Stage 3 official teaching sequence report

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 4.

## Change summary

- Preserved all 150 lesson numbers, URLs and question IDs while relocating generated CORE blocks into official first-use order.
- All 121 requirements retain Complete teaching, worked-example, practice and direct-assessment evidence; Optional legacy lesson bodies do not establish first use.
- Section 2 now orders network models/topology/cloud/media/hardware/Ethernet/streaming/internet/IP-URL; Sections 4 and 9-12 follow the required prerequisite sequence.
- Seven stable lesson questions were rewritten at their existing IDs and marks to provide dependency-safe direct assessment after the relocated teaching.

## Issue closure table

| Issue | Stage 3 disposition | Evidence / next stage |
|---|---|---|
| RV2-GATE-001 | Resolved | scripts/generate-cie-wording-register.mjs rejects every command-line approval option; scripts/remediation-v2-review-gate.mjs requires independent status, evidence location, current hash, reviewer, round and page-specific official basis |
| RV2-GATE-002 | Resolved | audits/remediation-v2-current-decision.json is the sole current release-decision artifact; scripts/verify-scientific-audit.mjs classifies both earlier scientific reports as historical evidence |
| RV2-COV-001 | Resolved | scripts/syllabus-official-as-mapping.mjs maps all 121 logical requirements to verbatim candidate statements and adjacent Notes on pages 14-31; scripts/verify-syllabus-coverage.mjs validates each mapping, review round and content hash; S1.08/S1.10/S1.11 no longer contain unrelated Notes |
| RV2-COV-002 | Resolved | L005 CORE teaching now includes a worked 8-bit one's-complement conversion and direct targeted practice; L005-Q1 is a stable four-mark direct one's-complement conversion and S1.03 maps it explicitly |
| RV2-SCOPE-001 | Resolved | S1.10 removes compulsory sound-file-size calculation; S12.03 removes construction; S12.06 removes production; L011, L144 construction practice and L145 production practice are retained only as labelled Optional enrichment |
| RV2-SCOPE-002 | Resolved | scripts/remediation-v2-optional-enrichment.mjs records 13 lesson dispositions with formal AS prerequisites and exclusion policy; Markdown and HTML show visible Optional enrichment notices; listed HTML sections are OPTIONAL/EXTEND and excluded by the coverage evaluator |
| RV2-SEQ-001 | Resolved | 121/121 official requirements now have reviewed Stage 3 first-use evidence; 109 official adjacent-order edges and 81 prerequisite edges pass; 963-question sequence register records 520 formal and 443 Optional enrichment questions with zero before-CORE violations |
| RV2-ID-001 | Resolved | All 150 stable lesson IDs and URLs are preserved; Markdown titles, HTML h1, course catalogue, paper and section ranges reconcile; L137 no longer claims Section 12 ownership inside the Section 11 lesson range; L137/L138 legacy bodies are Optional enrichment |
| RV2-WORD-001 | Open | Stage 4 |
| RV2-MS-001 | Open | Stage 4 |
| RV2-CONT-001 | Open | Stage 5 |
| RV2-PSEUDO-001 | Open | Stage 5 |
| RV2-PSEUDO-002 | Open | Stage 5 |

## Passed evidence

- Stage 3 repository gate: Passed.
- Coverage: 121 Complete, 0 Partial; official order: 109/109 adjacent edges passed; prerequisite graph: 81 edges, 0 blockers.
- Lesson identity: 150 stable IDs/URLs and 150 catalogue entries reconcile with HTML, Markdown, paper and section ranges.
- Question dependency register: 963 total; 520 formal; 443 Optional enrichment; 0 before-CORE violations.
- Current defect register: Resolved=8; Open=5; open P0=3; open P1=2.

## Active failed samples

- Mutation tests deliberately invert an official first-use edge, invert rows inside one CORE lesson, move a formal assessment before teaching and corrupt a first-use evidence hash; every mutation must be rejected.
- Full semantic gate remains Blocked with 24 later-stage technical/image findings and 0 sequence findings.
- Remaining critical IDs: CRIT-L049-PERFORMANCE-FACTORS, CRIT-L107-CHAR-FUNCTION-TYPE, CRIT-L121-PROVIDED-FUNCTIONS, CRIT-L133-CHAR-FUNCTION-TYPE, CRIT-L133-PROVIDED-FUNCTION.

## Command evidence

- node scripts/verify-curriculum-sequence.mjs — exit 0; 121 nodes, 109 official-order edges, 81 prerequisite edges and direct assessment checks passed.
- node scripts/verify-remediation-v2-stage3.mjs — exit 0; Stage 3 repository acceptance passed.
- node scripts/test-remediation-v2-stage3-mutations.mjs — exit 0; four active mutations rejected.
- node scripts/verify-stage9-classroom.mjs — exit 0; 150 catalogued lessons and delivery roles passed.
- node scripts/verify-syllabus-coverage.mjs — expected exit 1; only 24 Stage 5 critical semantic/image findings remain.

## Failed / open

- Remaining defect register: 5 Open; P0=3; P1=2.
- Stage 4 CIE wording and student mark-scheme presentation remain open.
- Stage 5 L049 processor factors and L107/L121/L133 pseudocode/function defects remain open.

## Unverified

- No Stage 4 wording approval, Stage 5 technical/image repair, Stage 6 browser/image census or Stage 7 independent final review is claimed.
- Full verify-all and browser QA remain deferred while the sole release decision is BLOCKED.

## Remaining risks

- 443 legacy lesson questions are explicitly Optional enrichment after CORE relocation; Stage 4 still must review all 963 prompts and mark schemes against official wording and answer boundaries.
- Commit, push and publication remain unauthorised.

## Stop condition

Do not start Stage 4 until the user approves Stage 3. Stage approval authorises progression only; it is not a release decision.
