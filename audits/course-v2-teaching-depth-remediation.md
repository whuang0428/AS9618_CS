# Course V2 teaching-depth remediation

Remediation date: 1 September 2026

Scope: all 90 active lessons, 142 teaching knowledge-point instances and Lessons 045/090 as integrated reviews

Status: implemented and verified; release status is recorded by Git history and the Pages deployment workflow

## Outcome

The course now renders an independently visible teaching loop for every teaching knowledge-point instance:

1. atomic learning targets;
2. core explanation;
3. mechanism or method;
4. one or more structured worked examples;
5. misconception correction; and
6. a mastery check mapped to every atomic target.

The two integrated-review lessons now use explicit retrieve, correct and transfer prompts. Visuals and compact recap cards are supplementary and follow the core teaching instead of acting as its only evidence.

The original severity ledger remains unchanged as a pre-remediation baseline. Current acceptance is established by the teaching-depth course gate rather than by rewriting historical severities.

## Structural repairs

- `scripts/apply-course-v2-materials.mjs` now builds explicit `atomicObjectives`, `explanations`, `mechanismSteps`, `workedExamples`, `misconceptions`, `masteryCheck` and exact `questionIds` for all 142 instances.
- Explanatory evidence is selected from substantive lesson facts by objective match and teaching-detail score. Exact syllabus restatements are rejected by the verifier.
- The visible method no longer inherits legacy `Meaning / Mechanism / Application`, `Input / Mechanism / Result` or `Plan / Execute / Test` triples. Structured examples use ordered step arrays.
- `scripts/render-course-v2.mjs` no longer splits or truncates an authored worked-example string. Multiline pseudocode is preserved in code blocks.
- The old generated concept cards are no longer the source of visible recap facts. Recap cards are rendered from atomic objectives, structured explanations, mechanisms and misconceptions.
- Question ownership is explicit in `question-bank-contract.json` and in rendered `data-syllabus-ids` attributes. A lesson question is no longer automatically credited to every requirement on the page.
- `scripts/verify-all.mjs` runs the teaching-depth course gate as part of the repository-wide check.

## Confirmed P0 closure

| Lesson / requirement | Implemented repair | Current evidence |
|---|---|---|
| 006 / S1.11 | Full RLE encode/decode route, overhead counterexample, text/bitmap/vector/sound choices and quality boundary | Default-visible explanations and two worked examples; RLE remains supplementary diagram 4/4 |
| 011 / S2.14 | Modem, PSTN, dedicated line and cellular access paths plus scenario comparison | Dedicated visible unit and exact S2.14 question |
| 012 / S2.15, S2.16 | Separate IP and URL/DNS units; removed URL/PSTN contamination from IP | Independent explanations, mechanisms, worked routes and mapped questions |
| 014 / S3.03 | Nine device mechanisms expressed as input, conversion/storage action and output | Nine default-visible explanations and three questions covering all devices |
| 018 / S3.10 | Six gate functions and statement/expression/circuit/truth-table conversion | Four-representation worked example and three mapped questions |
| 024 / S4.13 | All 19 specified instructions, including `IN`, with operand effects and trace | Complete reference teaching, branch trace and a 19-mark mapped question |
| 044 / S8.11 | INSERT, UPDATE and DELETE construction and safety reasoning | Worked SQL route plus two mapped DML questions |
| 060, 061 / S10.06 | Complete bounded linear-search and bubble-sort algorithms on both syllabus-instance pages | Two intact pseudocode blocks and found/absent plus pass-by-pass traces |
| 080 / S11.07 | Function definition, typed return, call and returned value inside an expression | Intact function code block and mapped function question |

## Acceptance gates

The teaching-depth verifier rejects these regressions:

- definition-only RLE or RLE hidden only inside a collapsed block;
- incomplete text/bitmap/vector/sound compression choices or a truncated core example;
- URL/PSTN contamination inside S2.15;
- missing INSERT/DELETE/UPDATE practice;
- missing function/return/expression practice;
- absent atomic-objective evidence, exact syllabus restatement, hidden core explanation, unmapped mastery check or visible example ellipsis.

## Verification results

- `node scripts/verify-all.mjs`: PASS. 90 lessons, 121 requirements, 272 lesson questions, 14 assessment sets, 142 teaching instances, 2 review lessons, 125 active visuals and 0 unresolved evidence.
- Release build verification: PASS. The local archive contains 270 files, 90 active lessons, 61 legacy redirects and 90 Markdown lessons.
- Desktop browser scan: 90/90 pages loaded; 142/142 teaching units and 12/12 review lanes rendered; no loaded broken images, document overflow or console warnings/errors.
- Mobile browser scan at 390 × 844: 90/90 pages loaded with no document-level horizontal overflow or loaded broken images.
- Targeted rendered checks: Lessons 006, 011, 012, 014, 018, 024, 044, 060, 061 and 080 all expose their repaired content; Lesson 006 mastery disclosure and diagram carousel were exercised; complete search, sort and function code blocks were read from the rendered DOM.

## Boundary

No commit, push or publication was performed. The user-owned untracked `参考书籍/` directory was not modified.
