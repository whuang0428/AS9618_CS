# Section 2 visual teaching sample checkpoint

This is the review index for the three representative samples required before any Section 2 or whole-course rollout. The samples are not connected to the existing 90-lesson course.

## Visual evidence

- `desktop-1440.png`: one continuous rendered page at a 1440px desktop viewport.
- `mobile-390.png`: the same page using the 390px responsive layout. Wide technical materials remain legible through intentional horizontal scrolling and a visible swipe cue.
- `material-contact-sheet.png`: side-by-side rendered evidence for S2.02, S2.04-S2.05 and S2.12.
- `topology-imagegen-contact-sheet.png`: the four accepted generated physical models with the checked connection invariants stated outside the generated images.

## Reviewed teaching materials

| Sample | Syllabus objectives | Representation | Rendered finding |
| --- | --- | --- | --- |
| Client-server vs peer-to-peer | S2.02 | Native role-flow SVG plus comparison table | Roles and request/response directions are visible; availability statements are scoped instead of absolute; the mobile table is intentionally scrollable. |
| Bus, star, mesh and hybrid topology | S2.04-S2.05 | Text-free ImageGen physical models plus native ordered steps and a failure table | The old vector diagrams and their path/failure overlays have been removed. Each accepted model was checked against its device/link invariant; exact packet paths and failure consequences are kept outside the raster image. |
| Bit streaming and buffering | S2.12 | Text-free ImageGen reservoir plus deterministic SVG labels, exact rate cases and a comparison table | The illustration contains one inlet, one reservoir and one outlet; technical labels are code-native; the analogy boundary states what the reservoir does not model. |

## Correctness evidence

- Syllabus authority: Cambridge 9618 2027-2029, pages 16-17, SHA-256 `c8a4c6d033c07c6d8025689abed5ef481d581c28bae640986d275303ed6c08bc`.
- Local reference books were read only. Their hashes and page references are recorded in `scripts/course-v3-section2-sample-contract.json`.
- Past-paper analysis uses the publicly verifiable source `9618/11/M/J/24 Q2(e)(i)-(ii)`, with the official Cambridge question-paper and mark-scheme links stored in the contract. The page contains an original equivalent task, not copied Cambridge wording.
- The four generated topology models contain no text, arrows or failure marks. Their accepted asset hashes, final prompts and two rejected Star candidates are recorded in `scripts/course-v3-section2-topology-imagegen-prompts.json` and `scripts/course-v3-section2-sample-contract.json`.
- The streaming ImageGen raster contains no technical text. Its three technical labels, arrows and rate relationships are deterministic HTML/SVG.

## Full-page review result

- Required order: Guiding question -> Knowledge explanation -> Practice -> Past-paper analysis -> Summary: pass.
- Desktop and 390px body overflow: pass (zero unintended page overflow).
- Intended mobile overflow: comparison tables and the reservoir diagram only, each with a visible swipe instruction.
- Topology rendering: four generated PNGs loaded at 1448x1086; topology SVG count and legacy path/failure control count are both zero.
- Structured explanation: every topology has three ordered packet-path steps; the failure table has one reviewed row per topology.
- Interaction: teacher hints and answer guidance remain collapsed by default and the tested topology teacher hint opens and closes correctly.
- Resources: all four topology images and the reservoir image loaded at their expected natural dimensions.
- Browser console warnings/errors from the page: zero.
- Audit-tool fallback: the in-app browser's desktop long-page screenshot stitcher duplicated compositor tiles. DOM counts, viewport screenshots and interactions were checked there first; only the clean full-page evidence capture was repeated with local headless Chrome from the same URL.

## Checkpoint boundary

No existing lesson, generator, navigation or course numbering has been changed by this checkpoint. Bulk Section 2 reconstruction and the AS Sections 1-12 audit remain paused pending human review of these samples.
