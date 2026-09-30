# Section 1 beginner classroom review

## Scope and teaching decisions

Section 1 serves learners with no previous computer science. Student-facing explanations are in English, using Cambridge terminology while providing complete reasoning before concise exam language. The six existing lesson routes remain topic containers; the teaching route is organised by prerequisites, with flexible 45-minute sessions rather than a fixed six-lesson limit.

Every concept begins with concrete material, then explanation steps, a complete worked example, an experiment where it helps, a teacher-written understanding check and a suitable original paper task after its prerequisites. The route connects two-state patterns, number interpretation, character codes, image and sound representation, storage cost and compression. It does not force arithmetic into a single media story.

Classroom and Full reading use the same generated DOM and authored content. Classroom begins with one concept and stage. A reading-position control resumes teaching at the visible material. Original unit and paper bookmarks remain supported. The browser requires no new account, backend or runtime AI service. Experiments use local deterministic models; the teacher controls all reveals and progression.

## Official scope and original questions

The implementation was checked against [Cambridge 9618 2027–2029 syllabus, Version 2](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf) and its [official update](https://www.cambridgeinternational.org/Images/747147-2027-2029-syllabus-update.pdf). The update clarifies papers and calculator information; it does not change Section 1 content.

The ten retained question groups E001–E010 contain 14 selected parts, worth 31 marks. Fourteen distinct original QP/MS PDFs and all 25 published extracts were checked against the existing source manifest. Original crops remain unchanged. Question context and official schemes were visually reviewed. Teacher reasoning is kept separate from official MS. E004 is placed after the signed-arithmetic teaching because its teacher solution uses two’s-complement negation, although the original question assesses unsigned subtraction.

`section1PaperObjectives` maps only what the selected parts directly assess. `section1PaperCoverageNotes` records narrower coverage within an objective. In particular:

- E002 assesses a pattern count, a one’s-complement conversion and a hexadecimal-to-denary conversion; it does not assess every number representation.
- E007 assesses bitmap size calculation, not all bitmap properties.
- E008 assesses bitmap colour-code order and a vector drawing list; the header, scaling and representation choice need separate checks.
- E009 assesses amplitude accuracy from sampling resolution, not sampling rate or all file-size consequences.
- E010 assesses the RLE mechanism; decoding, field overhead, expansion cases and other compression choices need separate checks.

Teacher-written checks cover BCD application, extended ASCII compatibility, signed overflow, screen versus image resolution, bitmap/vector choice, sampling-rate and storage relationships, and non-RLE compression decisions. These checks are not presented as official past-paper evidence.

## Materials and model boundaries

The opening scene was generated using Codex built-in ImageGen and visually checked: a letter card, a leaf photograph, and a microphone with a tuning fork introduce text, image and sound. Its exact prompt and PNG checksum are stored in `scripts/course-v3-section1-classroom-images.json`. It is a source-material scene, not a diagram of binary storage. All numerical labels, codes, grids, state changes and calculations use editable text or deterministic graphics.

- Bit width, unsigned range and signed interpretation remain distinct. Arithmetic compares the exact answer with the chosen range rather than equating carry-out with signed overflow.
- Character activities identify standard ASCII and state the limits of extended encodings and Unicode examples.
- Bitmap payload calculations state whether headers, palettes, row padding and compression are excluded.
- Sampling uses a small, normalised model signal and explicitly separates measurement times from quantisation levels. The graph is a teaching model, not an audio codec.
- RLE counts both the count and symbol fields and demonstrates inputs that expand.
- The information-loss activity demonstrates quantisation and reconstruction; it is not described as an implementation of JPEG, MP3 or another production format.

## Concept coverage checklist

This checklist follows the 33 concepts in `section1Journey`. Objective IDs describe teaching coverage, not a claim that an attached paper directly assesses every objective in that row. The narrower paper mappings and limitations above still apply. Every concept has a teacher-written check; ten also place an original paper task after the needed teaching. Links open the generated concept’s first stage.

| Concept | Concrete material | Interaction or presentation | Teaching objectives | Assessment |
| --- | --- | --- | --- | --- |
| 01 · [How can two states carry a message?](../web/course-v3/lesson-001/index.html#two-states--observe) | ImageGen scene: letter card, leaf photograph and microphone/tuning fork; two-lamp code table. | Bit toggles; two bits starting at 00; reveal pattern count. | `S1.01.A01` | Teacher-written check |
| 02 · [Count possibilities before assigning values](../web/course-v3/lesson-001/index.html#count-patterns--observe) | Complete one-, two- and three-bit pattern lists; six team-colour labels. | Bit-width experiment; four bits initially; compare four and five bits. | `S1.01.A01` | Teacher-written check |
| 03 · [Compare quantities using the same unit](../web/course-v3/lesson-001/index.html#prefixes-and-capacity--observe) | 1 MiB versus 1 MB; prefix table; complete 600-byte files in 2 KiB. | Step reveal and worked calculation; no separate lab. | `S1.01.A01`, `S1.01.A02` | Check + E001 |
| 04 · [Build binary from familiar place values](../web/course-v3/lesson-002/index.html#place-value--observe) | Denary position cards and binary weight table; decode 00101101. | Eight-bit toggles starting at unsigned 45; reveal weighted sum. | `S1.02.A01`, `S1.02.A02`, `S1.03.A01` | Teacher-written check |
| 05 · [Choose binary weights for a denary value](../web/course-v3/lesson-002/index.html#binary-conversion--observe) | Weight cards for 45; repeated-division table for 13. | Division and remainder trace: denary 45 to binary; both directions available. | `S1.03.A01` | Teacher-written check |
| 06 · [Read four binary bits as one hexadecimal digit](../web/course-v3/lesson-002/index.html#hexadecimal--observe) | 1010 1111 ↔ AF; A–F lookup; worked 2D3 ↔ 723. | Base conversion trace starting at hexadecimal 5C to binary. | `S1.02.A03`, `S1.03.A02`, `S1.03.A03`, `S1.06.A02` | Teacher-written check |
| 07 · [Keep decimal digits separate with BCD](../web/course-v3/lesson-002/index.html#bcd-digits--observe) | Compare ordinary binary 59 with BCD 0101 1001; worked reading 308. | Digit-by-digit BCD encoding/decoding; starts at 59; invalid groups rejected. | `S1.02.A04`, `S1.03.A04`, `S1.06.A01` | Teacher-written check |
| 08 · [Represent negatives with one’s complement](../web/course-v3/lesson-002/index.html#ones-complement--observe) | Eight-bit +5/−5 patterns; inversion; two zeros; worked −37. | One’s-complement encoding trace, eight-bit −5; no add-one step. | `S1.02.A05`, `S1.03.A05` | Check + E002 |
| 09 · [Give the leftmost bit a negative weight](../web/course-v3/lesson-002/index.html#twos-complement--observe) | Unsigned versus negative leading weight; range endpoints; worked −37. | Two’s-complement encoding trace, eight-bit −5; weighted check. | `S1.02.A06`, `S1.03.A06` | Check + E003 |
| 10 · [Ask what the pattern is meant to represent](../web/course-v3/lesson-002/index.html#choose-representation--observe) | Unchanged 10010101 interpreted as unsigned, BCD, one’s and two’s complement. | Stepwise comparison and value-preserving conversion check; no separate lab. | `S1.03.A01`, `S1.03.A02`, `S1.03.A03`, `S1.03.A04`, `S1.03.A05`, `S1.03.A06` | Teacher-written check |
| 11 · [Carry when a binary column reaches two](../web/course-v3/lesson-003/index.html#binary-addition--observe) | Single-column carry table; complete eight-bit 13 + 7 trace. | Unsigned addition by column, eight bits, initial operands 13 and 7. | `S1.04.A01` | Teacher-written check |
| 12 · [Borrow across binary places](../web/course-v3/lesson-003/index.html#binary-subtraction--observe) | Eight-bit 10 − 3 with a borrow passing through the empty 4s column. | Unsigned subtraction by column, initial operands 10 and 3. | `S1.04.A01` | Teacher-written check |
| 13 · [Add positive and negative fixed-width integers](../web/course-v3/lesson-003/index.html#signed-arithmetic--observe) | Temperature change +12 + (−5); worked 7 − 12. | Eight-bit signed addition/subtraction; starts at +12 + (−5). | `S1.04.A02` | Check + E004 |
| 14 · [Decide whether the answer fits its representation](../web/course-v3/lesson-003/index.html#overflow--observe) | Unsigned 250 + 10 and signed 100 + 40; carry-out counterexamples. | Range comparison, eight-bit 126 + 2; switch signed/unsigned interpretation. | `S1.05.A01`, `S1.04.A01`, `S1.04.A02` | Check + E005 |
| 15 · [Store the characters, then recover the message](../web/course-v3/lesson-004/index.html#character-mapping--observe) | Teacher-written three-bit character set including space; encode “A B!”. | Table lookup, reconstruction and hidden check answer; no separate lab. | `S1.07.A01` | Teacher-written check |
| 16 · [Use seven-bit ASCII codes](../web/course-v3/lesson-004/index.html#standard-ascii--observe) | Verified ASCII subset; seven-bit codes versus byte containers; “A0a”. | ASCII encode/decode table, initially A0a in eight-bit containers. | `S1.07.A02` | Teacher-written check |
| 17 · [Add an eighth bit, but keep the table agreed](../web/course-v3/lesson-004/index.html#extended-ascii--observe) | Illustrative extension tables disagree on the meaning of an added code. | Reasoned sender/receiver comparison; no lab attached to this concept. | `S1.07.A03` | Teacher-written check |
| 18 · [Represent text across writing systems](../web/course-v3/lesson-004/index.html#unicode--observe) | Multilingual text requirement; worked Aé UTF-8 byte count. | Reveal exact A/€ code points, UTF-8 bytes and UTF-16 code units; fixed comparison. | `S1.07.A04` | Check + E006 |
| 19 · [Reconstruct a bitmap from its stored codes](../web/course-v3/lesson-005/index.html#bitmap-structure--observe) | 3 × 2 one-bit file, ordered pixels and header dimensions. | Editable 8 × 8 one-bit pixel grid and colour codes; separate from the tiny worked file. | `S1.08.A01` | Teacher-written check |
| 20 · [Give each pixel more colour choices](../web/course-v3/lesson-005/index.html#colour-depth--observe) | Exact SVG compares equal 8 × 8 grids at 1, 2 and 4 bits per pixel. | Depth control at fixed 8 × 8 dimensions; initially two bits per pixel. | `S1.08.A03`, `S1.08.A06` | Teacher-written check |
| 21 · [Distinguish the stored grid from the display grid](../web/course-v3/lesson-005/index.html#image-screen-resolution--observe) | 800 × 600 image on 1280 × 720 and 1920 × 1080 screens. | Square-grid size control at fixed two-bit depth; changes both image dimensions. | `S1.08.A02`, `S1.08.A05` | Teacher-written check |
| 22 · [Build the bitmap-size calculation from units](../web/course-v3/lesson-005/index.html#bitmap-size--observe) | 120 × 80 at four bits per pixel; worked bytes and KiB, excluding overhead. | Independent square-grid and depth controls; starts at 8 × 8, four bits per pixel. | `S1.08.A04` | Check + E007 |
| 23 · [Draw an image from objects and properties](../web/course-v3/lesson-005/index.html#vector-list--observe) | Rectangle-and-line list with top-left coordinates and drawing order. | Reveal a second, explicitly separate rectangle-and-circle drawing list. | `S1.09.A01` | Check + E008 |
| 24 · [Choose a representation for the task](../web/course-v3/lesson-005/index.html#bitmap-vector-scaling--observe) | Logo versus photograph; worked rectangle-and-line scale factor two. | Scale the rectangle-and-circle model by 1, 2 or 4; redraw geometry. | `S1.09.A02`, `S1.09.A03` | Teacher-written check |
| 25 · [Turn a continuous signal into stored sample codes](../web/course-v3/lesson-006/index.html#sample-quantise-encode--observe) | Four measured amplitudes; nearest levels −4 to +3; explicit offset code table. | Normalised 0–1 model, 8 Hz and three bits; waveform plus sample/code table. | `S1.10.A01`, `S1.10.A02` | Teacher-written check |
| 26 · [Change how often the signal is measured](../web/course-v3/lesson-006/index.html#sampling-rate--observe) | Four versus eight measurement times; 4000/8000 Hz size comparison. | Rate control with three-bit depth fixed; initial 4 Hz deliberately misses a 2 Hz wave’s peaks. | `S1.10.A03` | Teacher-written check |
| 27 · [Change the amplitude choices for each sample](../web/course-v3/lesson-006/index.html#sampling-resolution--observe) | Amplitude 0.46 rounded using four versus eight normalised levels. | Depth control with rate fixed at 16 Hz; starts at two bits per sample. | `S1.10.A04` | Check + E009 |
| 28 · [Count samples, bits and channels](../web/course-v3/lesson-006/index.html#sound-size--observe) | Worked mono 6000 Hz × 3 s × 8 bits; stereo comparison. | Separate toy recording: 8 Hz × 2 s × 3 bits × one channel; vary factors independently. | `S1.10.A03`, `S1.10.A04` | Teacher-written check |
| 29 · [Reduce the data needed to store or transfer a file](../web/course-v3/lesson-006/index.html#why-compress--observe) | 8 MB versus 5 MB files in 20 MB; fixed-rate transfer calculation. | Step reveal and storage/transfer comparison; no separate lab. | `S1.11.A01` | Teacher-written check |
| 30 · [Use reconstruction to distinguish the methods](../web/course-v3/lesson-006/index.html#lossless-or-lossy--observe) | Compare exact reconstruction with four copies of representative value 102. | Decode-and-compare reasoning; no separate lab. | `S1.11.A02`, `S1.11.A08` | Teacher-written check |
| 31 · [Encode repeated neighbouring values as runs](../web/course-v3/lesson-006/index.html#run-length-encoding--observe) | AAAABBCCCCCCCCDD; eight-bit count plus eight-bit symbol; expansion counterexamples. | Encode runs, decode and count fields; starts with the same 128 → 64 bit example. | `S1.11.A03` | Check + E010 |
| 32 · [Preserve text, pixels, objects and sample values exactly](../web/course-v3/lesson-006/index.html#lossless-media--observe) | Repeated text, pixels, vector properties and digital samples; dictionary extension. | Stepwise sample-run reconstruction and exact-recovery checks; no separate lab. | `S1.11.A02`, `S1.11.A04`, `S1.11.A05`, `S1.11.A06`, `S1.11.A07` | Teacher-written check |
| 33 · [Choose what a delivery copy may sacrifice](../web/course-v3/lesson-006/index.html#lossy-media-choice--observe) | Photo/audio delivery decisions; original/master distinction; 100,101,102,103. | Reduced-precision greyscale codes, initially four bits; compare decoded and original values. | `S1.11.A02`, `S1.11.A05`, `S1.11.A07`, `S1.11.A08` | Teacher-written check |

The worked examples and experiment defaults are distinguished deliberately where they use different models. In particular, the vector worked example uses a rectangle and line, while its experiment uses a rectangle and circle. The first sound explanation uses an offset level table from −4 to +3; the experiment uses a separate normalised 0–1 scale. The lossy four-value worked example uses a representative/count format, while the experiment reduces per-value precision. None of these examples is presented as a complete production file format.

## Suggested 45-minute teaching sessions

All 26 sessions are suggestions of 45 minutes each, with retrieval, explanation and practice included. Concept numbers refer to the checklist above. The six lesson routes are topic containers rather than six required lesson periods. Extend or repeat a session when its checks show that students need another example; there is no fixed total-time cap.

| Session | Focus | Concepts | Teaching and practice |
| --- | --- | --- | --- |
| 01 | Two states and enough patterns | 01, 02 | Use lamp choices, build powers of two and distinguish a count from the largest unsigned value. |
| 02 | Units, capacity and a first paper question | 03 | Compare byte quantities, keep prefix scales separate, count complete files and attempt E001. |
| 03 | Binary place value and conversion | 04, 05 | Move from denary weights to binary, convert both ways and verify every result. |
| 04 | Hexadecimal and four-bit groups | 06 | Convert binary, denary and hexadecimal with complete working; explain a practical use. |
| 05 | Decimal digit codes | 07 | Encode and decode BCD, explain a digit-display application and contrast BCD with ordinary binary. |
| 06 | One’s complement and a mixed paper task | 08 | Introduce signed widths, inversion and two zeros, then attempt E002 after recalling hexadecimal. |
| 07 | Two’s complement | 09 | Use negative place value, encode and decode both signs, check the range and attempt E003. |
| 08 | Choose a representation independently | 10 | Interpret unchanged bits under several rules, convert without changing a value and explain invalid codes. |
| 09 | Binary addition and visible carries | 11 | Trace each carry, practise unfamiliar operands and check sums by decoding. |
| 10 | Binary subtraction and borrowing | 12 | Trace a borrow through zero columns and verify differences by adding the subtracted value back. |
| 11 | Signed arithmetic and a subtraction paper task | 13 | Add and subtract both signs using two’s complement, then attempt E004 with its full teacher explanation. |
| 12 | Overflow depends on the representation | 14 | Compare signed and unsigned ranges, test carry counterexamples and attempt E005. |
| 13 | Character codes and standard ASCII | 15, 16 | Encode and decode a small table, then distinguish ASCII code width from a byte container. |
| 14 | Character-set limits and Unicode | 17, 18 | Explain extension-table mismatches and the wider Unicode repertoire, then attempt E006. |
| 15 | Reconstruct a bitmap | 19 | Decode ordered pixel codes, explain header information and draw small images from supplied data. |
| 16 | Colour choices and spatial detail | 20, 21 | Change one parameter at a time and distinguish colour precision, stored dimensions and screen resolution. |
| 17 | Calculate bitmap data size | 22 | Derive the formula from pixel counts and units, include only stated overhead and attempt E007. |
| 18 | Draw from a vector list | 23 | Read coordinates and properties, reconstruct the list and attempt both representation parts of E008. |
| 19 | Scale and choose image representations | 24 | Calculate scaled geometry, compare enlargement and justify choices for unfamiliar image tasks. |
| 20 | Sample, quantise and encode sound | 25 | Keep timing, level rounding and encoding separate; decode a supplied sample sequence. |
| 21 | Two independent sound-quality controls | 26, 27 | Vary rate and depth independently, explain each mechanism and attempt E009. |
| 22 | Sound size and mixed-media calculations | 28 | Count samples and channels, convert units and contrast the sound formula with bitmap size. |
| 23 | Why compress, and what must survive? | 29, 30 | Calculate a practical storage or transfer benefit, then judge exact versus approximate reconstruction. |
| 24 | Run-length encoding round trips | 31 | Encode and decode ordered runs, count field overhead, test an ineffective case and attempt E010. |
| 25 | Lossless compression across media | 32 | Explain exactly what text, bitmap, vector and sound decoders must reconstruct, with a dictionary extension if ready. |
| 26 | Lossy delivery copies and justified choices | 33 | Compare original and reconstructed values, explain information loss and justify compression for a new set of tasks. |

## Rebuilding and reviewing

```bash
node scripts/render-course-v3.mjs --section1
node --test scripts/course-v3-section1-classroom.test.mjs scripts/course-v3-section1-models.test.cjs
python3 -m http.server 8776 --bind 127.0.0.1 --directory web
```

Open `/course-v3/section-1/`. The scoped renderer writes only the six Section 1 lesson pages, its overview, Section 1 browser and image assets, and the corresponding course-contract entries. It does not regenerate other sections or the resource hub. PDF checks use `AS9618_PAST_PAPER_ROOT` when supplied, otherwise the documented local archive; unavailable originals produce explicit skips.

## Acceptance record

Completed locally on 30 September 2026. No commit, push or publication was performed.

- Scoped generation completed for Lessons 001–006, the Section 1 overview and its browser assets.
- The two targeted test files passed **39 tests, 0 failures, 0 skips**. All 14 source PDFs were available and checked.
- A generated-page scan checked all seven pages for duplicate IDs, local file references and fragment targets: **0 errors**.
- Real-browser checks loaded all 33 concepts in Full reading and verified that each concept's Classroom explanation shows exactly one concept, phase and explanation step.
- All 26 experiment instances, covering 11 model types, were operated to their final results. Additional checks covered BCD rejection/recovery, dirty-input answer hiding, pixel painting, reset/reveal, and returning from a reading position to teaching.
- Forward/backward navigation across lesson boundaries, original paper visibility, separate official-MS reveal/hide, image enlargement and original-extract enlargement were verified.
- Layouts were inspected at 1366 × 768, 1920 × 1080 and 390 × 844. All six reading pages and the overview fit the narrow viewport; wide teaching tables scroll inside their own regions. Browser review identified and corrected inherited low-contrast table headings, undersized table text and initial bookmark positioning beneath the sticky toolbar.
- No warning or error console entries were captured during the browser acceptance run.
- Scope comparison preserved all 1439 baseline files, with no out-of-scope changes or new deletions. The 87 non-Section-1 lesson entries in the course contract remained identical; existing resource records were retained.

The physical HDMI-connected classroom display and its viewing distance were not available for testing. The browser checks establish rendering and interaction behaviour, not visibility from the back of the actual classroom. Full-site regeneration and release packaging were not run because this delivery is scoped to Section 1 and the checkout contains substantial pre-existing work.
