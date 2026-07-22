# Stage 7 Accessibility and Keyboard Delivery Report

Audit date: 21 July 2026

## Scope

Stage 7 reviews the 153-page web course for keyboard and assistive-technology delivery after the Stage 6 visual review. The inventory contains the course, assessment and resource hubs plus all 150 lesson pages.

The acceptance criteria cover bypass navigation, focus visibility, semantic names and landmarks, disclosure and tab state, dynamic-result announcements, language changes, target size, reduced motion and text contrast.

## Baseline

The first runtime scan found accessibility gaps on all 153 pages:

- no page had a skip link or focusable main-content target;
- 130 generated practice inputs in Lessons 099-111 had no accessible name;
- 2,825 apparent disclosure controls lacked exposed state;
- 539 tab buttons lacked the tab/selection model;
- 196 detected dynamic-result regions lacked live-region metadata.

The disclosure total included three Lesson 121 sample-choice buttons. They are choices rather than disclosure controls and now expose `aria-pressed`; the final disclosure inventory is 2,822.

## Repairs

The shared Stage 7 CSS and JavaScript layer:

- adds a first-focusable skip link and explicit main-content focus target to every page;
- supplies high-visibility `:focus-visible` treatment, forced-colour support and reduced-motion behaviour;
- derives accessible names for generated practice inputs from their question prompts;
- exposes `aria-expanded`, `aria-controls`, labelled regions and hidden state for answer/MS controls;
- supplies roving tab selection, arrow/Home/End key handling and tab-panel relationships;
- keeps assessment filters and sample choices synchronised with `aria-pressed`;
- marks dynamic feedback as polite, atomic live regions;
- marks each continuous Chinese text run as `lang="zh-CN"` while retaining English document language;
- corrects the confirmed solid and gradient text-contrast failures without redesigning lesson layouts.

## Final Evidence

| Requirement | Evidence | Status |
|---|---|---|
| Complete inventory | 150 lessons and three hubs | Pass |
| Bypass and landmarks | One skip link and one focusable `main` target on all 153 pages | Pass |
| Focus order and visibility | Skip link is the first focusable DOM item; shared visible focus and forced-colour rules | Pass |
| Form names | 0 unnamed controls after runtime enhancement | Pass |
| Disclosure state | 2,822 controls with valid expanded, controls, region and hidden-state relationships | Pass |
| Tabs | 150 tab widgets with one selected tab, roving `tabindex`, panel relationships and direction/Home/End handling | Pass |
| Dynamic status | 1,935 detected feedback/result regions expose polite atomic announcements | Pass |
| Language changes | 709 Chinese runs marked `zh-CN`; 0 unmarked Han-text runs | Pass |
| Text contrast | 41,559 solid-background and 911 composited gradient-background runs checked; 0 final failures | Pass |
| Target size | 9,798 interactive targets reviewed; nine small native checkboxes have associated 44-84 px-high clickable labels | Pass |
| Media alternatives | No image elements are present; future images are rejected by the verifier when `alt` is missing | Pass |
| Review integrity | Per-page SHA-256 hashes in `stage7-accessibility-register.csv` | Pass |

The browser host did not expose direct key-injection actions during this audit. Keyboard conformance is therefore evidenced by DOM focus order, native control use, runtime ARIA relationships and the reviewed arrow/Home/End event implementation rather than a synthetic keypress recording.

## Reverification

Run from the repository root:

```bash
node scripts/verify-stage2.mjs
node scripts/verify-assessments.mjs
node scripts/verify-lesson-mark-schemes.mjs
node scripts/verify-stage5-mark-schemes.mjs
node scripts/verify-stage6-qa.mjs
node scripts/verify-stage7-accessibility.mjs
```

Regenerate the Stage 6 and Stage 7 registers only after repeating their respective browser reviews; both registers intentionally reject changes to approved page HTML, CSS or JavaScript assets.
