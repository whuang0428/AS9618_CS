# AS9618 scientific audit repair batches

**Boundary:** This is a repair plan only. No course, assessment, image, generator, commit, push or publication change is authorised by the first-round audit.

## Batch 0 — make the gates trustworthy

Issues: SCI-COV-001 to SCI-COV-004 and SCI-SEQ-000. Unify conceptGroups/requiredGroups, add official Notes, stable question/visual IDs, prerequisites, risk and forbidden semantics, and validate requirement-specific CORE/worked/practice/assessment evidence. Replace the six-case sequence verifier with the prerequisite graph and first-use scan. Acceptance: MUT-COV-001 and CORE-to-OPTIONAL mutations both fail for every requirement class; no row can pass on whole-file existence.

## Batch 1 — repair compulsory P0/P1 teaching

Issues: SCI-CONT-001 to SCI-CONT-006, SCI-CROSS-001, SCI-TERM-001 and SCI-META-001. Repair generator/maintenance sources first, then Markdown and HTML. Add bitmap/vector/text/sound compression mechanisms; processor type; register-transfer notation; all official instruction groups and opcodes; OS security-management parity; limit check; official test-data categories; official sound terminology; and correct L137's Section 12.3 identity. Acceptance: each requirement has visible CORE teaching, a worked example, practice/MS and direct assessment; generators rerun without restoring old content.

## Batch 2 — repair curriculum and assessment order

Issues: SCI-SEQ-001 to SCI-SEQ-007. Decide the smallest schedule-preserving remedy for each inversion: revise/move the assessment item or teach the prerequisite earlier without changing the 150 lesson IDs. Acceptance: every question's mapped teachingLessons are <= its issue lesson; no review introduces new CORE syntax; spacing analysis shows later retrieval remains.

## Batch 3 — repair assessment semantics and metadata

Issues: SCI-ASSESS-001 to SCI-ASSESS-003 plus questions affected by Batches 1-2. Add question-level requirement and AO mappings. Review all 22 A-without-M and five FT-with-B-only flags rather than mechanically recoding them. For every changed question, run correct/common-error/boundary answer trials. Acceptance: prompt, marks, independent points, code dependency, acceptable answers, Do not accept and displayed Assessment Bank MS agree.

## Batch 4 — reopen and repair visuals

Issues: SCI-VIS-001 to SCI-VIS-004. Correct the source used to render L050 shifts and regenerate the pixels; fix the L137 transcript from the verified semantic source. Add deterministic assertions for fixed-width bit count, shift result and overflow interpretation. Then review all 783 Stage 10 images in course order and blind reverse order, recording disagreements before arbitration. Acceptance: 783/783 have two new independent dispositions, 969/969 assets/display checks pass, and no existing Approved flag is imported as a conclusion.

## Batch 5 — responsive and interaction closure

Issues: SCI-VIS-003 and SCI-WEB-001. Replace the global 720 px mobile rule with readable responsive treatments and remove toolbar/content overlap. Exercise every interaction component type, keyboard path, focus return, ARIA state, print, reduced motion and screen-reader transcript. Acceptance: 306/306 views have no page/container overflow, clipping, broken assets or console warnings/errors, with interaction evidence tied to component IDs.

## Batch 6 — independent re-audit and release gate

Resolve SCI-TEACH-001 by human disposition of similarity clusters. Complete the remaining 113 requirement reviews, 963 question trials and 969 visual reviews. Run the full generator chain twice and require zero second-run diff; run specialist verifiers, git diff --check, verify-all, release parity and temp-copy mutations. Acceptance: P0=0, P1=0, Unknown/Pending=0. Commit, push and publication still require separate approval.
