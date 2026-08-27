# AS9618 full scientific audit — baseline report

**Decision:** BLOCKED. This snapshot is not publishable. Open defects: P0 4, P1 19, P2 7, P3 0. Independent semantic review remains pending for most requirements, questions and visuals, so the acceptance rule forbids an Approved conclusion.

## Scope and method

The baseline was frozen before audit artifacts were written. No course, assessment, image, generator, commit, push or release file was changed by this audit. The official basis is the Cambridge 9618 2027-2029 Version 2 syllabus, the December 2025 update and the 2027-2029 pseudocode guide. Hashes and byte counts are recorded in `scientific-audit-baseline.json`.

Inventory: 121 requirements, 150 lessons, 153 pages / 306 rendered views, 963 questions, 51 assessment sets, 783 Stage 10 raster images and 969 visual objects. Current project verifiers were treated as leads, not proof of correctness.

## What passed

- Structural inventory matches the planned counts: 121 / 150 / 153 / 963 / 51 / 783 / 969.
- All 963 questions have a mark total equal to the number of stored mark points and all mark codes match B1/M1/A1 syntax.
- All 153 routes loaded with a non-empty title and H1 at 1440x900 and 390x844; no document-level horizontal overflow was found.
- Assessment Bank Section 4 filtering, mark-scheme disclosure, reset and forced empty state worked. L050 contents and answer disclosures worked.
- A stale cached L100 console error was disproved on a new port with a cache-busting URL; the current source loaded with zero warnings/errors.
- The corrected L050 shift graphic now displays eight bits in every inspected fixed-width row.
- Independent pixel OCR produced non-empty text for 783/783 images. It found no configured prohibited editorial wording; this is a locator result, not semantic approval.
- Pixel OCR found 12 binary tokens in L050 shifts and all 12 are eight bits; it also recognised ELSE and ENDIF in the L137 image.

- The temporary mutation harness itself behaved deterministically: it detected the protected S4.15 CORE-to-OPTIONAL mutation.

## Confirmed failures

### Coverage and gate integrity

The present 121/121 Complete result is not scientifically valid. The evaluator reads `requiredGroups` while the base contract stores `conceptGroups`; only ten overrides are checked semantically. In a temporary mirror, removing kibi/mebi/gibi/tebi and binary-prefix teaching from L001 still produced “121 unique requirements” passed, while converting L050 CORE to OPTIONAL correctly failed the S4.15 override. Assessment evidence is whole-file existence for most rows, official Notes are empty, and prerequisite/risk/visual evidence is absent. See SCI-COV-001 to SCI-COV-004 and SCI-SEQ-000.

### Compulsory content

Confirmed gaps are: bitmap/vector compression methods (S1.11), processor type as a performance factor (S4.05), register-transfer notation (S4.07), the full official instruction groups/set (S4.12-S4.13), Markdown/HTML parity for OS security management (S5.01), limit check teaching (S6.07), and the official abnormal/extreme-boundary test-data categories (S12.07). Sampling resolution is taught correctly in concept but uses the non-official primary label “sample resolution”.

### Sequence

Seven confirmed inversions remain: L001 file-header assessment; L080 database/join monthly task; Quiz 100 flowchart symbols; search/sort before formal arrays; Review 112 array declaration; Monthly 120 ADTs; Monthly 140 RAD. The draft prerequisite graph records the responsible dependency edges.

### Visuals and responsive behaviour

The current L050 eight-bit width is correct, but its logical-left overflow label is inconsistent. The L137 Java/pseudocode image is visually correct while its screen-reader transcript omits ELSE and ENDIF. The current Stage 10 register marks both assets Approved, demonstrating that hash equality and recorded two-pass status are not sufficient. At 390 px, the global 720 px image rule creates container-level horizontal overflow; L050's exception fits but is too small to read comfortably.

### Assessment quality

Structural mark totals pass. Twenty-two A-without-M cases and five B-only questions with FT guidance require code-semantics review. AO metadata is missing for all 750 lesson questions, so the requested AO matrix is explicitly NotDeclared rather than inferred.

## Not yet verified

- 113 of 121 requirements still require independent line-by-line semantic review against official Notes.
- 963 questions are inventoried and structurally checked, but independent correct/boundary/wrong-answer trials remain pending except for the confirmed defects and targeted high-risk checks.
- 969 visuals are inventoried, but the new independent audit has not completed 783 first passes plus blind reverse second passes. Existing Approved rows are retained only as historical evidence.
- Route load/identity is complete for 306 views; full per-component keyboard, focus, ARIA, print and interaction coverage remains pending except for the named tested flows.
- The new audit-artifact generator was run twice with identical hashes, and two targeted coverage mutations were run in a temporary mirror. Full course-generation idempotence, the complete mutation suite, `verify-all.mjs` and release parity were not run because the release builder can rewrite tracked release inventory; they belong after an authorised repair batch.

## Repair order

1. Repair the contract/evaluator and prerequisite graph first, so later fixes cannot be falsely approved.
2. Repair P0 content: S1.11, S4.07 and S4.12-S4.13; then the confirmed P1 content, terminology/parity and sequence defects.
3. Repair affected questions/MS and add question-level requirement/AO mappings.
4. Correct the L050 graphic source and L137 transcript, then rerun all visual assets through two independent passes and deterministic assertions.
5. Resolve responsive container overflow and toolbar overlap; complete component-type browser coverage.
6. Run mutation tests, two full generator passes, all specialist verifiers, git diff --check, verify-all and release parity. Only then re-evaluate P0/P1=0 and Unknown=0.

## Artifacts

- `scientific-defects.json`: authoritative open-defect register.
- `scientific-syllabus-matrix.csv`: 121 requirements, current gate result versus independent status.
- `scientific-lesson-review.csv`: 150 lesson identities, structural evidence and semantic disposition.
- `scientific-assessment-matrix.csv`: all 963 questions with command word, cognitive heuristic, AO, mark codes and flags.
- `scientific-visual-review.csv`: all 969 visual objects with independent-pass status.
- `scientific-stage10-ocr-summary.json`: actual-pixel OCR counts, raw-ledger hash and targeted L050/L137 evidence.
- `scientific-browser-qa.csv`: all 306 route/viewport rows.
- `scientific-prerequisite-graph.json`: 150 nodes and high-confidence semantic edges, including backward dependencies.
