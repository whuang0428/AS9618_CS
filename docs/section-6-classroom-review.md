# Section 6 implementation and acceptance

Reviewed 2026-11-16. Implements the approved [redesign plan](section-6-beginner-redesign-plan.md). Original question selection, source pages, assessment limits and crop provenance are documented in the [source review](section-6-source-review.md).

## Delivered teaching sequence

| Stable lesson | Numbered content | Classroom materials / questions |
|---|---|---:|
| 033 | 6.1.1 definitions and comparison; 6.1.2 data and system protection | 6 |
| 034 | 6.1.3 accounts, passwords, authentication and security measures | 10 |
| 035 | 6.1.4 five threats; 6.1.5 prevention, detection, removal and recovery | 6 |
| 036 | 6.1.6 encryption and access rights; Security checkpoint | 11 |
| 037 | 6.2.1 validation/verification; 6.2.2 seven checks; 6.2.3 entry/transfer verification; Integrity checkpoint | 20 |

There are 40 teaching materials, two independent checkpoint title pages and 11 original question groups. The checkpoints total **20 marks** and **17 marks**. Full reading exposes the same content as Classroom; it does not create duplicate interactive instances. Seven validation panels form one continuous strip in Full reading and appear separately in Classroom.

Seven experiment types are implemented: signature, firewall, anti-virus, anti-spyware, encryption, parity and checksum. Encryption has two independent instances sharing one model. One parity component provides Byte and Block tabs. Controls include previous step, next step and reset; changed inputs clear obsolete results. Figures, tables, experiments and original paper extracts can be enlarged. Enlarging moves the original DOM node, preserving experiment state and event handlers.

The 32 objective IDs, 26 original unit entries, five lesson URLs and existing practice/question bookmarks remain reachable. The old Lesson 033 E045 bookmark redirects to its new Security checkpoint position in Lesson 036. Additional original questions and teacher-written practice remain separate from the checkpoints. Original QP, hint, teacher explanation and official MS are disclosed separately; answers start closed and close when leaving a classroom card.

## Evidence and model boundaries

- Nine additional question groups have original QP/MS paths, PDF page numbers, crop geometry, marks and SHA-256 hashes; 26 crops preserve the necessary question context. Existing E045–E050 remain available, with narrower objective mappings where needed.
- User-account mechanisms and the data-versus-system counterexamples are labelled teaching explanations where no directly matching question was verified. The biometric source is an AI question; its training requirements are not imported into this section.
- The NIST fingerprint illustration has a local asset, source/credit and hash manifest. Matching is taught with a process diagram, rather than inferred from the illustration.
- Signature and XOR encryption are explicitly conceptual demonstrations, not production cryptography. The signature keeps the original signature when the transmitted message changes. Encryption does not prevent interception or deletion.
- Anti-virus updates improve recognition without promising detection of unknown samples. Removing spyware does not recall information already disclosed.
- Byte parity cannot locate an error and can miss an even number of bit flips. Block correction is explicitly conditional on a single-bit error; multi-bit counterexamples are included. Sender checking bits are retained independently of received data.
- Checksum uses the labelled example algorithm sum modulo 256; independent receiver recomputation can miss cancelling changes. Passing any check means only that the check found no error.

## Rebuild and automated checks

```sh
node scripts/render-course-v3.mjs --section6
node --test scripts/course-v3-section6-*.test.*
```

The scoped build updates the six S6 pages, S6 browser resources and the necessary contract entries. It does not regenerate other sections or the resource hub. Source files are the `course-v3-section6-{journey,materials,classroom,labs,models,extra-papers}` modules and styles under `scripts/`; generated browser files are under `web/course-v3/`.

The S6 suite passed **25 tests, 0 failures, 0 skips**. It checks sequence, coverage, mark totals, retained links, duplicate IDs, closed answers, local assets, original PDF/crop hashes, independent model instances, invalid-input handling and the specified error/correction scenarios. A separate read-only comparison confirmed all **1,197 unrelated tracked web files** and all **88 non-S6 lesson contract entries** unchanged.

The existing S5 regression suite (`node --test scripts/course-v3-section5-*.test.*`) passed 38 tests with no failures and one existing skip: the optional public-original PDF directory `AS9618_PAST_PAPER_PUBLIC_ROOT` was not configured. `git diff --check` passed.

## Browser acceptance

Local HTTP preview was inspected at 1366 × 768, 1920 × 1080 and 390 px width. All five lessons were checked in narrow Full reading: no document-level horizontal overflow or broken images. Tables and original extracts retain local scrolling/enlargement where required. No runtime errors were observed in the inspected pages.

Verified interactions:

- Classroom navigation, Full reading, the nine-topic overview and both checkpoint links; return to the current material after a mode round trip.
- Legacy E045 navigation, default-closed official answers and closing answers on the next question.
- Enlarged live signature with tampered/unchanged messages; state survives enlargement and return.
- Firewall default blocking and a permitted existing connection; updated/old anti-virus definitions; spyware removal with a retained remote copy.
- Encryption with an incorrect key and reset to the original inputs.
- Byte detection and inability to locate the bit; Block keyboard-tab switching, single-bit correction and the four-corner undetected case.
- Checksum cancelling changes and out-of-range input clearing the old result.
- Seven separately enlargable validation panels; responsive controls and keyboard parity tabs.

The final review corrected low-contrast table headings, narrow flow arrows, header overlap and classroom selection of a preceding card's visible tail. S6 disables the shared smooth scrolling so rapid mode/navigation changes use a settled reading position.

Print lifecycle logic was checked using the actual beforeprint/afterprint handlers for questions, answers and the current native-print state, including restoration of details and enlarged material. **Native print completion/cancellation was not verified**: the in-app browser's print preview blocked further automation; the temporary preview tab was closed. No physical printing was performed. Actual touchscreen hardware was not available; narrow layouts, 44 px controls, clicks and keyboard behavior were checked, but physical touch gestures remain unverified.

This change is local only. No commit, push or deployment was performed; the existing untracked `参考书籍/` directory was not modified.
