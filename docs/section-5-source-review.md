# Section 5 source and classroom verification

Reviewed on 2026-09-29 against the teacher's local Cambridge archive. This is an implementation record; it is not student-facing course content.

## Syllabus and depth

Source: `/Users/kw/Documents/Teaching/AS CS 9618/syllabus/9618-2027-2029-syllabus-v2.pdf`, printed/PDF page 23. SHA-256: `c8a4c6d033c07c6d8025689abed5ef481d581c28bae640986d275303ed6c08bc`.

The source was extracted and visually inspected. Section 5 requires:

- Why an OS is needed, and memory, file, security, hardware and process management.
- The need for disk formatting, virus checking, defragmentation, disk contents analysis/repair, compression and back-up software.
- Program libraries, reuse and developer benefits, including DLL files.
- The need for assemblers, compilers and interpreters; compiler/interpreter benefits, drawbacks and justified choices.
- Awareness of combined partial compilation and interpretation, with Java console mode as the example.
- IDE coding prompts, dynamic syntax checks, prettyprint, expanding/collapsing code, single stepping, breakpoints, variables, expressions and a report window.

Page 35 was also extracted and visually inspected. Named scheduling algorithms, formal process states, virtual memory/paging/segmentation, compiler stages, BNF and RPN are A Level Section 16 material. An AS explanation may use a simple resource-sharing example without making that advanced detail an assessed prerequisite.

## Existing selections rechecked

The original QP/MS files were read from `/Users/kw/Documents/Teaching/AS CS 9618/past-papers`. All source hashes match the existing manifest. All 15 existing extract image hashes and dimensions match the manifest; all 15 displayed extracts were visually inspected and readable-text crop edges checked. No original source or existing extract was changed.

| ID | Original source | QP / MS pages | Required teaching before assignment |
| --- | --- | --- | --- |
| E039 | 9618/12 May/June 2024, Q6, 4 marks | 13 / 9 | Memory **and** process management |
| E040 | 9618/12 May/June 2023, Q7(a)(i–ii), 6 marks | 13 / 9 | Library definition and DLL benefits |
| E041 | 9618/12 Oct/Nov 2023, Q8(b), 3 marks | 13 / 9 | Non-security maintenance utilities; alternatives in the MS include formatting, repair, compression and defragmentation |
| E042 | 9618/12 Oct/Nov 2025, Q10(a), 4 marks | 15 / 11 | Interpreter/compiler benefits at different development stages |
| E043 | 9618/12 May/June 2023, Q7(b), 3 marks | 13 / 9 | Justifying a translator choice during development |
| E044 | 9618/12 May/June 2023, Q7(c), 4 marks | 13–14 / 10 | Coding prompts, syntax checks, breakpoints and single stepping |

E042 needs the comparison lesson, rather than being assigned immediately after identifying the three translator types. E043 gives no mark for the name alone and accepts a justified compiler choice as well as an interpreter choice. E039 caps either management task at three of the available four marks. These limits remain reflected in the teacher explanations.

## Added selections

Six coherent source groups add nine selected parts and 20 marks. Combined with the six existing groups, the sequence has 12 groups, 16 selected parts and 44 marks. These are interleaved teaching opportunities, not a single timed examination.

| ID | Original source | QP / MS pages | Objective mapping | Placement |
| --- | --- | --- | --- | --- |
| E5D01 | 9618/11 Oct/Nov 2025, Q5(a)(i–ii), 4 marks | 10 / 8 | S5.01.A04, A05 | After security and device management |
| E5D02 | 9618/11 Oct/Nov 2024, Q4(a)(i–ii), 4 marks | 9 / 7 | S5.01.A03; S5.02.A06 | After back-up; recalls previously taught file management |
| E5D03 | 9618/13 Oct/Nov 2023, Q5(b)(i–ii), 5 marks | 8 / 6 | S5.02.A01, A05 | After compression and formatting |
| E5D04 | 9618/13 May/June 2025, Q3(a), 4 marks | 6 / 6 | S5.04.A02, A03 | After compiler and interpreter mechanisms |
| E5D05 | 9618/11 Oct/Nov 2023, Q6(b), 1 mark | 11 / 8 | S5.06.A01 | After Java compilation, bytecode and JVM execution |
| E5D06 | 9618/11 Oct/Nov 2024, Q4(d)(i), 2 marks | 9–10 / 8 | S5.07.A04 | After prettyprint and expanding/collapsing code |

The new module records each local relative PDF path, original SHA-256, selected page and bounding box, crop-specification SHA-256, image SHA-256 and image dimensions. Its import validates the extract hashes, geometry, dimensions and mark totals. It does not require the private archive to build the site.

All 15 new extracts were rendered at 144 dpi and visually inspected alongside their corresponding QP/MS extract. The six relevant full QP pages were also inspected. Context, question numbers, marks and necessary parent text are retained. Crop-edge checks found no clipped readable glyphs. Scanner barcode glyphs are not teaching text and are excluded from this check. Source QP/MS text was compared to the teacher solutions and marking explanations. No download, PDF alteration or replacement of existing assets was needed.

## Wording and remaining limits

- E5D03 accepts a file allocation table as an allocation-record example. It should not imply that every file system uses FAT. Error checking applies to a full format; a quick format may omit a surface check.
- E5D04 uses the paper's simplified interpreter model, which permits immediate correction and continuation. The explanation makes clear that the ability to resume depends on the interpreter/environment. Successful compilation does not prove logical correctness; `.exe` is an accepted example, not a universal extension.
- E5D05 provides a genuine question about why partial compilation and interpretation are combined. It does not specifically ask the student to trace Java filenames or individual JVM stages; those remain teaching examples and clearly identified teacher checks.
- E5D06 excludes prettyprint. The selected model answer directly assesses expanding/collapsing code, so its mapping is A04 only. Although the MS also accepts auto-indentation or auto-formatting, this question is not recorded as directly assessing the excluded prettyprint objective A03.
- The additions target missing concepts rather than giving every small teaching step a separate original question. There is no newly selected direct question on the need for an assembler or virus checker. The local assembler questions found concern two-pass translation rather than this introduction. Use identified teacher checks for those concepts and retain honest syllabus coverage independently of past-paper frequency.
- E041 permits disk analysis/repair, but students can instead choose another utility. E044 allows variable inspection within its breakpoint/stepping explanations, but does not separately assess every report-window or expression-watch detail. These are still required teaching and checking points.

## Checks run

- Imported `scripts/course-v3-section5-extra-papers.mjs`: six questions, nine parts, 20 marks; crop, PNG hash, dimension and total-mark checks passed.
- Compared the existing selections' local original-PDF hashes and all 15 PNG hashes/dimensions with `scripts/past-paper-source-manifest.json`: passed.
- Extracted original PDF text, checked crop boundaries and visually reviewed all 30 existing/new QP/MS extracts: passed.
- Full-site generation and browser checks are handled by the main Section 5 implementation; they are not claimed by this source review.


## Current classroom implementation

The active source is `scripts/course-v3-section5-journey.mjs`. The five existing page routes remain, with 19 concept groups, 29 explicitly owned objectives and all 23 original teaching-unit identities retained. Eleven suggested teaching segments provide flexible stopping points, without a fixed total-time limit. Previous interactive bookmarks for processes, libraries, DLLs and debugging are preserved.

| Route | Concept groups | Teaching route |
| --- | ---: | --- |
| lesson-028 | 5 | Common OS services; working memory; files and permissions; devices; process progress |
| lesson-029 | 6 | Formatting/checking; HDD placement; malware and recovery; compression/tool choice; library calls; DLLs |
| lesson-030 | 3 | Assembly translation; building and running; interpreted control flow |
| lesson-031 | 2 | Justified translator choices; Java source, bytecode and runtime |
| lesson-032 | 3 | Editor feedback; presentation; evidence from debugging |

Every group contains three or more explanatory steps, a concrete situation, a short teacher-written understanding check, a takeaway and a connection to the next concept. Preceding knowledge is recalled where needed. Existing authored practice remains available in the optional consolidation area. The same DOM/content serves Classroom and Full reading, so experiments retain state during view changes; “Teach from this point” returns from the reading position. Answers are closed when changing teaching steps. “Hide answers” retains the question itself. Arrow-key navigation does not intercept input controls or scrollable code/table/paper regions.

Thirteen distinct deterministic lab types are used in fifteen concept placements: utilities appear separately for HDD, backup and combined tool selection; the editor demonstration covers feedback and presentation. Resets restore each concept's intended initial scenario. Compiler/Java examples distinguish source, built code and last output; the debugger displays code alongside variable and output evidence on laptop layouts.

### Illustrations

Built-in ImageGen created and visually reviewed:

- `web/assets/course-v3/section-5/classroom-workstation.png`: distinguish application, computer and printer in a familiar task.
- `web/assets/course-v3/section-5/backup-devices.png`: distinguish the working device from a separate recovery copy.

Exact prompts, purpose, review notes and SHA-256 hashes are saved in `scripts/course-v3-section5-classroom-images.json`. No CLI image-generation fallback was used. An additional reproducible `hdd-fragmentation.svg` explains moving-head access and block placement; it explicitly labels its block map as simplified. Illustrations support click-to-enlarge.

### Local acceptance

- `node scripts/render-course-v3.mjs`: passed; rebuilt the 93-page course and source contract. A before/after file-hash inventory confirmed that existing page-content changes were limited to Section 5; shared changes remove the obsolete Section 5 script/style payload in favour of section-specific assets.
- Section 3/4/5 model and classroom/source tests: passed. Section 5 checks include objective coverage, prerequisite order, original-PDF and image integrity, arithmetic consistency, hidden answers and bookmark continuity.
- Chrome traversed all 190 teaching positions at 1440×900, 1920×1080, 1366×768 and 390×844. Page horizontal overflow was zero in all four sizes, and Full reading exposed every group.
- Browser operations passed: illustration zoom/Escape; keyboard advancement; printer and RAM actions; HDD reordering/reset; restoring a surviving backup; library input validation; old versus rebuilt executable; interpreted zero-iteration and skipped-branch paths; Java runtime absence; code folding; debugger breakpoint/step/continue/correction; group reset; answer hiding; deep links; returning from Full reading; JavaScript-disabled reading fallback.
- Touch navigation passed in a touch-enabled Chrome context. Shared-page smoke checks passed for Sections 1, 3, 4, 6 and 12. No browser script errors or missing page images were observed.
- Screenshots of initial teaching pages, explanation stages, HDD diagrams, Java, debugging and official-paper presentation were inspected. The debugger was adjusted so source and changing evidence remain alongside each other at laptop widths.
- JavaScript syntax checks and `git diff --check`: passed.

Actual classroom HDMI projection and the standalone smart-screen browser were not available for testing. No remote publication or Git push was performed. Offline ZIP packaging was outside this local webpage acceptance.
