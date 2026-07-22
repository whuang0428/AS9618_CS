# Stage 6 Full-Page Visual QA Report

Audit date: 21 July 2026

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

