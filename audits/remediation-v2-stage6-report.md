# AS9618 remediation v2 — Stage 6 full image and browser acceptance

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 7.

## Change summary

- Replaced the inherited Stage 6 page approval path with evidence derived from 308 current in-app browser records and current page hashes.
- Frozen the 784 current-pixel decisions as a separately recorded review input: the generator now rejects stale hashes or missing review rounds and cannot bulk-create semantic approvals.
- Reviewed 784/784 current Stage 10 JPEGs in maintained source order and exact reverse order using current pixel SHA-256, a fresh 784-image Apple Vision OCR run, maintained transcript/alt reconciliation and deterministic subject assertions; no old Approved value was imported.
- Re-censused 971/971 visual objects from the current lesson DOM/CSS and current raster bytes, including 787 raster files and all 784 Stage 10 images.
- Fixed two defects found by the browser run: real Cambridge mark-scheme tables now remain within 390px, and long literal URLs wrap in the mobile accessible transcript.
- Repaired eight deterministic images after the fresh OCR gate exposed requirement-specific pixel wording gaps: negative binary, file header, sensor applications, all seven validation checks, defined steps, program modules, IF condition and nested loops.

## Passed evidence

- Current-pixel images: 784/784 forward pass; 784/784 reverse pass; pending=0; disagreements=0; fresh OCR Clear=784/784.
- Visual objects: 971/971 passed current-source checks; raster=787; Stage 10 raster=784; pending=0.
- Browser: 154 desktop pages + 154 mobile pages = 308/308 passed; zero document overflow, clipping, offscreen controls, loaded broken images, visible empty alt text, framework overlays or console warning/error.
- Interactions: course search/reset, course map open/close and focus return, lesson contents/jumps/focus status, lesson and Assessment Bank answer expansion, type/paper/AO filters and reset, ARIA pressed/expanded state, and print entry.
- Extra raster inspection: peer-to-peer devices, storage media and greenhouse control pixels agree with their current alt text.

## Active failed samples

- Removing one image or visual-object row fails the gate.
- Changing reverse-pass order, importing an inherited approval, reapproving changed pixels without a matching visual review, creating a pass disagreement, removing current-pixel OCR/alt evidence or failing a high-risk assertion fails the gate.
- Changing a page hash, injecting document/table overflow, a broken image, missing visible alt text or a console error fails the gate.

## Command evidence

- /tmp/as9618-stage6-ocr (784-image Apple Vision run)
- node scripts/generate-remediation-v2-stage6.mjs --desktop /tmp/as9618-stage6-browser-desktop-final.json --mobile /tmp/as9618-stage6-browser-mobile-final.json --interactions /tmp/as9618-stage6-interactions.json
- node scripts/test-remediation-v2-stage6-mutations.mjs
- node scripts/verify-remediation-v2-stage6.mjs
- node scripts/verify-all.mjs --through-current-stage

## Failed / open

- Registered P0/P1 defects: 0 open.
- Current release decision remains BLOCKED because Stage 7 has not been performed or accepted.

## Optional enrichment

- Optional enrichment remains excluded from CORE coverage, first-use and formal assessment statistics; Stage 6 checks only its rendering/accessibility integrity where it appears.

## Unverified

- Stage 7 independent re-review of high-risk items.
- Two consecutive complete generation chains with a zero-diff second run.
- Release inventory and the unique release-candidate decision.

## Remaining risks

- The in-app Browser's synthetic Enter/Space dispatch did not toggle native controls in this environment. Controls are native BUTTON/SUMMARY/SELECT elements, click behavior, focus return and ARIA state were verified; independent keyboard re-test remains a Stage 7 item.
- No commit, push or publication has been performed or authorised.

## Stop condition

Do not start Stage 7 until the user approves progression from Stage 6.
