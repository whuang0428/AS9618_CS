# Section 7 source verification

Reviewed on 2026-09-29. This record supports the beginner course rebuild and is not student-facing teaching content.

## Official syllabus

The [Cambridge 9618 qualification page](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/) links the [2027-2029 syllabus](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf) and its [update notice](https://www.cambridgeinternational.org/Images/747147-2027-2029-syllabus-update.pdf). The live syllabus identifies **Version 2, published December 2025**. Its update concerns assessment clarification, with no significant teaching changes.

Section 7.1 is on printed/PDF page 25. Its scope is:

- Professional ethics: purpose, responsibilities and membership of BCS or IEEE.
- Ethical and unethical conduct, including its effects in a given situation.
- The need for copyright legislation.
- Software licensing and justified selection, including FSF, OSI, shareware and commercial software.
- AI, its applications, and social, economic and environmental impacts.

The existing S7.01-S7.06 mapping covers this scope. These six requirement IDs and their atomic objectives are local course identifiers, not numbering printed in the Cambridge syllabus.

The local Version 2 PDF was extracted and its complete page 25 visually inspected:

- Path: `/Users/kw/Documents/Teaching/AS CS 9618/syllabus/9618-2027-2029-syllabus-v2.pdf`
- SHA-256: `c8a4c6d033c07c6d8025689abed5ef481d581c28bae640986d275303ed6c08bc`

The official website and PDF were read through the web tool. A separate command-line download returned HTTP 403, so local rendering used the existing Version 2 copy. Its version and relevant text agree with the live source; this review does not claim a byte-for-byte comparison with a newly downloaded official PDF.

## Existing selections

All five groups were rechecked against the local original question papers and mark schemes in `/Users/kw/Documents/Teaching/AS CS 9618/past-papers`. Every original QP/MS hash matched `scripts/past-paper-source-manifest.json`. All 11 existing PNG hashes and dimensions matched; readable text did not cross the recorded crop boundaries. The eight distinct relevant full QP/MS pages were visually inspected. No existing original, extract or global source manifest was changed.

| ID | Original source | QP / MS pages | Marks | Assessed focus |
| --- | --- | --- | ---: | --- |
| E051 | 9618/13 Oct/Nov 2024, Q5(b) | 9 / 6 | 3 | Benefits of professional membership |
| E052 | 9618/12 Oct/Nov 2025, Q2(b) | 3 / 5 | 2 | Purpose of a code of conduct |
| E053 | 9618/12 Oct/Nov 2024, Q5(a) | 7 / 6 | 4 | Responsibilities towards colleagues and the public |
| E054 | 9618/12 Oct/Nov 2024, Q5(b)(i-ii) | 7 / 6 | 5 | Source modification, paid maintenance and copyright |
| E055 | 9618/12 May/June 2025, Q3(a-b) | 5 / 6 | 6 | AI reading/translation/speech and social benefits |

E053 allows at most two marks for colleagues and two for the public. E054 allocates one licence-identification mark and two explanation marks in part (i), with a separate two-mark copyright part. E055 allows four marks for the process and two for social benefits. Its later licensing part is outside E055; the selected task is complete without it.

## Supplementary selections

Three groups add five selected parts and 13 marks. Together with the existing questions, Section 7 has eight source groups, twelve selected parts and 33 marks of original questions. These are teaching opportunities to distribute across the course, not a prescribed single examination.

| ID | Original source | QP / MS pages | Marks | Direct objective mapping | Reason for inclusion |
| --- | --- | --- | ---: | --- | --- |
| E7D01 | 9618/11 Oct/Nov 2024, Q7(a-b) | 13 / 9 | 4 | S7.05.A03, S7.05.A04 | Adds benefits of shareware and commercial distribution beyond E054's source-modification decision |
| E7D02 | 9618/13 Oct/Nov 2025, Q7(a) | 12 / 11 | 2 | S7.06.A03 | A short, concrete classroom AI impact task before the longer social-impact application |
| E7D03 | 9618/11 Oct/Nov 2025, Q8(b-c) | 14 / 13 | 7 | S7.03.A01; S7.06.A03 | Applies ethical responsibilities to a familiar school network, then explores AI homework impacts |

E7D03's Q8 opening sentence is retained in a separate context extract: spreading malware is already supplied, and part (b) asks for three *other* considerations. Part (a), which asks for malware definitions, is excluded. Q8(b) supports applying responsibilities in a given situation; it does not assess every stakeholder-analysis subskill within A01. E7D02 does not directly assess a comparison between ethical and unethical actions or a complete justified deployment decision.

The new `scripts/course-v3-section7-extra-papers.mjs` follows the Section 5 extra-paper interface. It records each relative source-PDF path, original SHA-256, selected page and bounding box, crop-specification hash, PNG hash and dimensions. Import-time checks validate image identity, dimensions, crop metadata and mark totals. The local archive is not needed to build the site.

Seven new extracts were rendered at 144 dpi, checked for readable glyphs intersecting crop edges, and visually inspected. The six corresponding full QP/MS pages were also inspected. Question wording, required context, selected parts and official marks are preserved. Teacher reading guidance, model responses and explanations are authored teaching support; the QP and MS extracts remain the original source material.

## Terminology and marking boundaries

- E054's official answer uses FSF and OSI names for the intended licensing categories. Teach the organisations and the permissions they promote clearly; these names are not individual licence texts. The [Open Source Definition](https://opensource.org/osd) requires permissions such as redistribution and modification as well as source access.
- Some papers use commercial software in a conventional proprietary-distribution sense. Keep the paper's wording in its original extract while explaining the particular permissions and service terms. Commercial activity and proprietary permissions are different properties, as explained in [GNU's software categories](https://www.gnu.org/philosophy/categories.en.html).
- E7D01's MS describes support and testing as usual benefits of commercial distribution. These are not guarantees of every product. Its model answer uses earning a fee and usually available support; actual support terms still need checking.
- E054's phrase about copyrighting a program should not become a lesson that registration is universally required. [WIPO's copyright FAQ](https://www.wipo.int/en/web/copyright/faq-copyright) distinguishes protected expression from ideas and explains that protection is generally automatic without registration.
- E7D02 asks for one ethical impact. Either a developed benefit or a developed concern can be creditworthy. It does not require one of each.
- E7D03's MS awards one mark per accepted bullet, with a three-mark cap for (b) and a four-mark cap for (c). Do not invent a fixed positive/negative quota or claim a separate official two-mark cap for each described impact.

## Search scope and remaining assessment limits

The local archive contains 18 Paper 1 question papers: all three variants from the May/June and Oct/Nov series in 2023, 2024 and 2025. All 18 were searched for the Section 7 terms and the relevant passages were inspected. Selected candidates were checked against their original mark schemes. This is a bounded selection review, not an audit of every Cambridge paper ever published.

No direct question on AI's economic or environmental impacts was found in that local set. The course must still teach and check both syllabus areas. Clearly identified teacher-written examples and transfer tasks should cover them; these must not be labelled past-paper questions or official marking guidance. The selected real questions also do not separately prove coverage of every FSF freedom, each professional body's name, or a complete ethical decision framework.

The extra papers were selected for useful additional teaching practice. Repeated original questions about recognising faces, spoken commands or characters were not added merely to increase the question count. Source coverage does not determine syllabus importance or justify removing untested material.

## Verification completed

- Recomputed the existing selections' original-PDF and 11 extract-image SHA-256 hashes: passed.
- Checked existing extract dimensions and readable glyph boundaries: passed.
- Read original QP/MS text, inspected eight existing and six new full source pages, and inspected all seven final new extracts: passed.
- Ran `node --check scripts/course-v3-section7-extra-papers.mjs`: passed.
- Imported the new module: three groups, five parts and 13 marks; hashes, crop metadata, dimensions and mark totals passed.

Full-site generation, objective-placement integration and rendered classroom acceptance belong to the main implementation and are not claimed by this source review. No source archive files, global manifests, deployment settings or remote repository state were modified.
