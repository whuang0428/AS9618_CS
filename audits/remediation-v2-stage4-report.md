# AS9618 remediation v2 — Stage 4 CIE wording and mark-scheme report

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 5.

## Change summary

- Replaced the permissive custom verb regex with the 27 command words on official syllabus pages 41-42.
- Retained non-table operations only when a question record cites an official subject-content requirement that uses that operation.
- Reworded unsupported primary prompts, including Distinguish to Compare and Recommend/Choose to Suggest; stable question IDs and marks are unchanged.
- Replaced student-visible B1/M1/A1 with Answer, Guidance and Marks on lesson pages, Markdown assessments and the Assessment Bank; internal codes remain hidden metadata.

## Issue closure table

| Issue | Stage 4 disposition | Evidence / next stage |
|---|---|---|
| RV2-GATE-001 | Resolved | scripts/generate-cie-wording-register.mjs rejects every command-line approval option; scripts/remediation-v2-review-gate.mjs requires independent status, evidence location, current hash, reviewer, round and page-specific official basis |
| RV2-GATE-002 | Resolved | audits/remediation-v2-current-decision.json is the sole current release-decision artifact; scripts/verify-scientific-audit.mjs classifies both earlier scientific reports as historical evidence |
| RV2-COV-001 | Resolved | scripts/syllabus-official-as-mapping.mjs maps all 121 logical requirements to verbatim candidate statements and adjacent Notes on pages 14-31; scripts/verify-syllabus-coverage.mjs validates each mapping, review round and content hash; S1.08/S1.10/S1.11 no longer contain unrelated Notes |
| RV2-COV-002 | Resolved | L005 CORE teaching now includes a worked 8-bit one's-complement conversion and direct targeted practice; L005-Q1 is a stable four-mark direct one's-complement conversion and S1.03 maps it explicitly |
| RV2-SCOPE-001 | Resolved | S1.10 removes compulsory sound-file-size calculation; S12.03 removes construction; S12.06 removes production; L011, L144 construction practice and L145 production practice are retained only as labelled Optional enrichment |
| RV2-SCOPE-002 | Resolved | scripts/remediation-v2-optional-enrichment.mjs records 13 lesson dispositions with formal AS prerequisites and exclusion policy; Markdown and HTML show visible Optional enrichment notices; listed HTML sections are OPTIONAL/EXTEND and excluded by the coverage evaluator |
| RV2-SEQ-001 | Resolved | 121/121 official requirements now have reviewed Stage 3 first-use evidence; 109 official adjacent-order edges and 81 prerequisite edges pass; 963-question sequence register records 520 formal and 443 Optional enrichment questions with zero before-CORE violations |
| RV2-ID-001 | Resolved | All 150 stable lesson IDs and URLs are preserved; Markdown titles, HTML h1, course catalogue, paper and section ranges reconcile; L137 no longer claims Section 12 ownership inside the Section 11 lesson range; L137/L138 legacy bodies are Optional enrichment |
| RV2-WORD-001 | Resolved | scripts/cie-command-words.mjs fixes the main table to the 27 entries on syllabus pages 41-42 and fail-closes subject-operation exceptions by requirement ID; 963/963 current-hash question records include primary requirement, AO, marks, answer boundary and four passed trial cases |
| RV2-MS-001 | Resolved | All lesson renderers and the Assessment Bank now present Answer, Guidance and Marks with one mark per independent point; B1/M1/A1 remain only as non-rendered internal data; student Markdown and generated assessment HTML contain no exposed codes |
| RV2-CONT-001 | Resolved | L049 topic heading, teaching, assessment, maintained transcript and deterministic concept image use processor type and number of cores, bus width, clock speed and cache memory; The word-length discussion remains visibly labelled Optional enrichment and is excluded from the official performance-factor list |
| RV2-PSEUDO-001 | Resolved | L107/L133 keep MID results as STRING and reserve LCASE/UCASE for declared CHAR values with single-quoted literals; LEFT is identified as guide-external and is not called without a complete question-supplied signature |
| RV2-PSEUDO-002 | Resolved | L121 defines SPLIT, STRING_TO_INTEGER, IS_NUMERIC and FIELD_COUNT with complete typed signatures before use; The supplied SPLIT array starts at index 1; parameter order and return types are explicit in teaching, questions, transcript and pixels |
| RV2-AUDIT-001 | Resolved | 360 locked official source atoms reconcile bidirectionally with zero unmapped, phantom, partial-claim or page-locator failures; P22 bitwise/label rows and P24 validation/verification integrity wording now have explicit contract ownership |
| RV2-AUDIT-002 | Resolved | 83/83 CORE teaching pages place substantive CORE before Optional content; all 70 unique first-use pages are owned by declared requirements; All declared first-teaching concept groups pass, including vector, representations, devices, security, licensing, algorithms and ADT scope |
| RV2-AUDIT-003 | Resolved | Required visual evidence now checks the contract mapping, target register and actual DOM section role/activity together; Optional evidence cannot satisfy CORE coverage; 74 unique required visual panels are anchored after reviewed CORE teaching, with 28 source panels relocated so none precedes first use or depends on an Optional-only page |

## Passed evidence

- Official command-word table: 27/27 exact entries; no Distinguish or Recommend remains in the 963 reviewed prompts.
- Question review: 963/963 Reviewed; each records primary requirement, AO, marks, allowed-answer boundary and four passed marking trials.
- Wording register: 2046/2046 Approved with current hash, evidence locator, reviewer, round and page-specific official basis.
- Student display: 750 lesson questions plus 213 Assessment Bank questions use Answer / Guidance / Marks; visible B1/M1/A1 count is zero.

## Active failed samples

- Mutation tests insert unsupported Distinguish, bind Trace to a non-assembly requirement, remove a boundary trial and re-expose B1; each must be rejected.
- Full semantic gate remains blocked by the three Stage 5 P0 content/function/image defects.

## Command evidence

- node scripts/verify-cie-wording.mjs — must pass 27 official words, 963 item reviews, 2046 current-hash wording records and student display checks.
- node scripts/verify-remediation-v2-stage4.mjs — must pass Stage 4 artifacts, defect closure and sole current decision checks.
- node scripts/test-remediation-v2-stage4-mutations.mjs — must reject all four active mutations.
- node scripts/verify-assessments.mjs — must pass 213 Assessment Bank questions and generated Answer/Guidance/Marks output.
- node scripts/verify-all.mjs — Stage 4 and historical Batch 1-18 checks pass first; the command then exits 1 at verify-syllabus-coverage.mjs with exactly 24 retained Stage 5 findings (L049: 19, L107: 1, L121: 2, L133: 2).
- node scripts/generate-remediation-v2-stage4.mjs — two consecutive runs preserve an identical complete binary diff hash.

## Failed / open

- Remaining defects: .
- Stage 5 must repair L049 processor factors and L107/L121/L133 pseudocode/function semantics across text, generators and images.

## Unverified

- Stage 5 technical/image repair, Stage 6 full browser/image census and Stage 7 independent final review are not claimed.
- No commit, push or publication was performed.

## Stop condition

Do not start Stage 5 until the user approves Stage 4. Stage approval authorises progression only; it is not a release decision.
