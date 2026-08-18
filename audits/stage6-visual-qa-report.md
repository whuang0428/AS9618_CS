# Stage 6 Full-Page Visual QA Report

Original audit date: 21 July 2026

Academic-theme re-review: 18 August 2026

## Scope

Stage 6 reviews the rendered web course after the syllabus, assessment and mark-scheme stages. The inventory contains 153 pages:

- 150 lesson pages;
- the course index;
- the assessment bank;
- the resource centre.

Every page was rendered after JavaScript execution at both 1440 x 900 desktop and 390 x 844 mobile viewports. The audit checked the complete document rather than only the first visible screen.

## Acceptance Matrix

| Requirement | Evidence | Status |
|---|---|---|
| Complete page inventory | 150 numbered lessons and three hub pages | Pass |
| Desktop rendering | 153 pages at 1440 x 900 | Pass |
| Mobile rendering | 153 pages at 390 x 844 | Pass |
| Horizontal containment | Document width does not exceed viewport width at either reviewed size | Pass |
| Page structure | One title, one `h1`, one `main`, language and viewport metadata on every page | Pass |
| Internal navigation | All same-page fragment targets and local page/assets references resolve | Pass |
| Runtime health | No page-level console errors or broken images during the 306 render checks | Pass |
| JavaScript syntax | Course index, assessment bank and all 150 lesson scripts parse successfully | Pass |
| Interaction samples | Course search/clear, assessment filtering/MS disclosure, resource disclosure, lesson hook and converter | Pass |
| Review integrity | Per-page SHA-256 hashes in `stage6-page-review-register.csv` | Pass |

## Defects Found and Fixed

The first render pass found 61 viewport-specific failures across 55 unique lesson pages:

- six desktop overflows in Lessons 131-136;
- 55 mobile overflows, concentrated in long pseudocode, multi-column teaching cards and Paper 2 lessons;
- repeated grid min-content expansion that allowed nested cards or code to widen the whole document.

The shared `web/stage6-qa.css` repair keeps nested grid items shrinkable, contains long pseudocode inside local horizontal scrollers and standardises narrow-screen grids. It is linked after each lesson's own stylesheet so existing lesson-specific visual design remains authoritative except where containment is required. The final desktop and mobile passes reported zero horizontal-overflow failures.

## Interaction and Visual Sampling

The browser review included direct interaction with each shared delivery surface:

- course index title hydration, search and clear returned 6 and 150 matching lessons respectively;
- the monthly assessment filter displayed 7 cards and hid the other 44; an MS disclosure opened successfully;
- the second resource disclosure opened while the glossary remained available;
- Lesson 001 selected the correct context-dependent warm-up response and converted 8192 bits to 1 KiB;
- representative screenshots were reviewed for hub, early-course and Paper 2 layouts at desktop and mobile widths, including a formerly overflowing page.

## Academic Editorial Theme Re-review

The shared `web/academic-theme.css` layer was reviewed after it was linked last on all 153 pages. A fresh application-browser pass rendered every page at both 1440 x 900 and 390 x 844. All 306 page/viewport combinations had a non-empty document title, `h1` and main body; exactly one academic-theme link; no broken image; no page-level horizontal overflow; and no console warning or error.

The first mobile re-review isolated two residual document overflows in Lessons 019 and 057. Their 720 px Stage 10 infographics remain horizontally scrollable inside their own figure containers, while the shared theme now clips only document-level overflow. The repeated 153-page mobile pass then reported zero failures. Lesson 001's heading and page controls do not intersect at 390 px; the controls form two columns and the contents toggle spans the full row.

Interaction regression covered course search/clear and the course-map dialog; Lesson 001 contents, warm-up, converter and forward/back navigation; the seven-item monthly assessment filter and mark-scheme disclosure; and resource disclosure plus mobile table scrolling. All passed. The converter check used 8192 bytes to 8 KiB and exposed its calculation method.

### Fidelity ledger

| Accepted concept property | Implemented evidence | Result |
|---|---|---|
| Editorial typography | Georgia/Times headings; system sans-serif body and controls; SFMono/Menlo code | Match |
| White paper and restrained palette | True-white canvas, navy headings/links, charcoal text, cool-grey rules, green/amber semantics | Match |
| Course-index publication grid | Open hero, ruled controls/catalogue, four equal line icons and the unchanged 150/12/2/45 facts | Match |
| Lesson academic hierarchy | Institutional masthead, ruled objective columns, flat panels and preserved lesson-specific visuals | Match |
| Assessment paper layout | Library-style filters, ruled questions and unchanged numeric minimum/maximum mark inputs | Match |
| Resource reference layout | Bibliographic disclosure rows and locally scrollable bilingual tables | Match |
| Mobile composition | Separated title/actions, two-column actions, full-width contents toggle and contained wide media | Match |
| Copy and course data | Above-fold repository copy, lesson titles, ordering, routes and assessment data unchanged | Match |

Intentional deviations are limited to using the repository's real copy and data where concept artwork was illustrative, and using offline system font stacks and inline line icons rather than new image or network-font assets.

## Reverification

Run from the repository root:

```bash
node scripts/verify-stage2.mjs
node scripts/verify-assessments.mjs
node scripts/verify-lesson-mark-schemes.mjs
node scripts/verify-stage5-mark-schemes.mjs
node scripts/verify-stage6-qa.mjs
```

The Stage 6 verifier rejects missing pages or assets, unresolved local links/fragments, missing responsive QA links, JavaScript syntax errors, incomplete approval rows and any change to reviewed page content or its CSS/JavaScript assets.
