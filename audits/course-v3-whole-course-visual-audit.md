# AS 9618 V3 whole-course visual audit

## Outcome

- Scope: 93/93 rendered pages, 121/121 official requirements and 589 atomic-objective instances.
- Visual evidence: 186/186 desktop/mobile page reviews recorded.
- Browser findings: 0 failing viewport reviews.
- Each knowledge unit presents exactly one lead visual before its core explanation; method and worked-example roles appear only when they add distinct work.
- All 329 practice questions and 279 original exam-style questions expose Cambridge command words and separate marking points.
- All 145 teaching units begin with an image-based knowledge diagram; 49 targeted ImageGen diagrams close the previous table/card/flow-only gaps.

## Evidence index

- [Visual evidence browser](course-v3-visual-evidence/index.html)
- [Atomic objective—material—practice—past-paper ledger](course-v3-objective-material-ledger.csv)
- [145-unit role and deduplication audit](course-v3-knowledge-unit-role-audit.csv)
- [Generated course map](../course-v3-map.md)
- [Browser QA data](course-v3-visual-evidence/browser-qa.json)
- [ImageGen prompt, source and SHA-256 manifest](../scripts/course-v3-section-anchor-assets.json)

## Section results

| Section | Pages | Requirements | Desktop | 390px | Contact sheets |
|---:|---:|---:|---:|---:|---|
| 1 | 6 | 11 | 6/6 | 6/6 | [desktop](course-v3-visual-evidence/contact-sheets/section-1-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-1-mobile-390.png) |
| 2 | 8 | 16 | 8/8 | 8/8 | [desktop](course-v3-visual-evidence/contact-sheets/section-2-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-2-mobile-390.png) |
| 3 | 6 | 10 | 6/6 | 6/6 | [desktop](course-v3-visual-evidence/contact-sheets/section-3-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-3-mobile-390.png) |
| 4 | 7 | 15 | 7/7 | 7/7 | [desktop](course-v3-visual-evidence/contact-sheets/section-4-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-4-mobile-390.png) |
| 5 | 5 | 7 | 5/5 | 5/5 | [desktop](course-v3-visual-evidence/contact-sheets/section-5-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-5-mobile-390.png) |
| 6 | 5 | 8 | 5/5 | 5/5 | [desktop](course-v3-visual-evidence/contact-sheets/section-6-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-6-mobile-390.png) |
| 7 | 4 | 6 | 4/4 | 4/4 | [desktop](course-v3-visual-evidence/contact-sheets/section-7-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-7-mobile-390.png) |
| 8 | 6 | 11 | 6/6 | 6/6 | [desktop](course-v3-visual-evidence/contact-sheets/section-8-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-8-mobile-390.png) |
| 9 | 9 | 9 | 9/9 | 9/9 | [desktop](course-v3-visual-evidence/contact-sheets/section-9-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-9-mobile-390.png) |
| 10 | 14 | 10 | 14/14 | 14/14 | [desktop](course-v3-visual-evidence/contact-sheets/section-10-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-10-mobile-390.png) |
| 11 | 12 | 9 | 12/12 | 12/12 | [desktop](course-v3-visual-evidence/contact-sheets/section-11-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-11-mobile-390.png) |
| 12 | 9 | 9 | 9/9 | 9/9 | [desktop](course-v3-visual-evidence/contact-sheets/section-12-desktop.png) · [390px](course-v3-visual-evidence/contact-sheets/section-12-mobile-390.png) |

## Regression closures

- S1.11: default-visible lossless/lossy distinction, complete RLE encoding and decoding, counterexample, and text/bitmap/vector/sound choices.
- S2.04: reviewed topology assets replace the incorrect generated star topology; path rules are explicit beside each asset.
- S3.03: all nine device mechanisms are visible and mapped to practice.
- S3.10: NOT, AND, OR, NAND, NOR and XOR/EOR plus problem/circuit/expression/truth-table conversions are taught and practised.
- S8.11: INSERT, UPDATE and DELETE all have mapped practice.
- S11.07: typed function, arguments, RETURN and returned-value use inside an expression are taught and practised.
- S12.04: syntax, logic and run-time errors plus boundary correction and regression retesting are complete.

## Capture method and limitation

The in-app Browser was used for visible DOM, interaction and responsive checks. Its compositor can duplicate tiles in very long full-page screenshots, so the permanent 93 × 2 full-page evidence set is captured with the same local Chromium engine through the DevTools protocol. This changes only the capture mechanism, not the inspected HTML or viewport.

## Review state

All recorded desktop and 390px page reviews passed.
