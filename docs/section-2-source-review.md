# Section 2 source and assessment review

Reviewed on 2026-09-30. This is a teacher-facing audit, not student lesson copy.

## Official baseline

The [Cambridge 9618 subject page](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/) currently links the [2027–2029 syllabus, Version 2](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf). The cover and introduction identify Version 2, published December 2025. Communication is Section 2.1 on printed pages 16–17. The [December 2025 update](https://www.cambridgeinternational.org/Images/747147-2027-2029-syllabus-update.pdf) concerns assessment routes and calculator wording on page 11; it does not change Section 2 teaching content. The live PDF, rather than an older search-result description saying Version 1, was checked.

The repository's `S2.01`–`S2.16` and `Axx` identifiers are course subdivisions, not Cambridge's official numbering. The 59 course objectives divide the syllabus into teachable and checkable actions. They cover network purpose/scope; service and client models; topologies and paths; cloud; media; local hardware; routing; Ethernet; streaming; internet services/infrastructure; addressing; and resource retrieval. Examples such as `/26` calculations, deterministic buffer traces and gateway/NAT assumptions make these ideas concrete. They are teaching choices, not an assertion that the syllabus specifies these exact examples or algorithms.

## Source method and identities

The original papers remain in the read-only archive `/Users/kw/Documents/Teaching/AS CS 9618/past-papers`. The original ten groups E011–E020 retain the approved identities in `docs/practice-past-paper-review-20260915/selection-registry.json` and crop records in `scripts/past-paper-source-manifest.json`. Their 32 published QP/MS crops were visually inspected and their 14 unique original PDFs were rehashed against the recorded SHA-256 values.

Five added groups E2D01–E2D05 fill important gaps using the same local archive. Their complete provenance, source-relative paths, original-PDF SHA-256 values, crop bounds, image hashes, marks and separate teacher explanations are in `scripts/course-v3-section2-extra-papers.mjs`. The existing selection registry is unchanged. Each added source page was read; all 14 new 144 dpi crops passed a character-boundary check and were visually inspected. Shared stems are kept where needed, while unrelated preceding/following questions are excluded. The excerpts reproduce unaltered regions; teacher explanations are separate text.

The section therefore contains **15 original question groups, 20 selected parts, 60 marks, 46 QP/MS crops and 22 unique original PDF files**. These are selection totals, not a claim that every objective is directly assessed by a past paper.

## Exact selected assessment scope

`section2PaperObjectives` is deliberately narrower than legacy whole-requirement mappings. A referenced objective may still be only partly sampled or offered as an alternative: the notes are part of the mapping. `section2PaperPrerequisites` records knowledge needed for the selected task and teacher explanation, not every incidental word in its shared stem.

| ID | Source and selected parts | Marks | Direct assessment and limits |
| --- | --- | ---: | --- |
| E011 | 9618/11 May/June 2024, 5(a); QP p11, MS p6 | 4 | S2.02.A01: identify bank server and phone client, explain their roles. No peer-to-peer comparison or model choice. |
| E012 | 9618/12 May/June 2024, 3(b); QP pp5–6, MS p6 | 4 | S2.03.A01: two thin-client characteristics applied to marking. No thick-client assessment or choosing a client type. The p5 stem is preserved. |
| E013 | 9618/13 May/June 2024, 5(b); QP p10, MS p6 | 2 | S2.04.A02, S2.05.A01: the stated star's sender–centre–receiver path. No other topology, failure trace or selection. |
| E014 | 9618/12 October/November 2025, 8(a)(i–ii); QP p13, MS p10 | 4 | S2.06.A03: two benefits and two drawbacks of cloud use. No public/private comparison or deployment choice. |
| E015 | 9618/13 October/November 2024, 9(b); QP p16, MS p8 | 4 | S2.08.A02–A04, limited to carrier descriptions. Two non-copper media are requested; radio/microwave are alternatives. Does not separately assess all three labels, Wi-Fi, line-of-sight, satellites or media selection. |
| E016 | 9618/12 May/June 2023, 1(d); QP pp2–3, MS p3 | 3 | S2.11.A01: Ethernet description. The scheme offers CSMA/CD among alternatives, so this task follows collision teaching. No complete collision trace is demanded. |
| E017 | 9618/12 October/November 2023, 7(c); QP pp10–11, MS p8 | 3 | S2.11.A02: any three accepted collision-handling tasks. Does not require the whole sequence or a causal explanation of random backoff. The router in the shared stem is background, not an IP prerequisite. |
| E018 | 9618/13 October/November 2024, 9(c); QP pp16–17, MS p8 | 4 | S2.12.A01/A04: real-time stream and buffer mechanism. No on-demand comparison, numerical buffer trace or sustained-deficit adaptation. Compression receives an in-place reminder. |
| E019 | 9618/12 May/June 2024, 3(c)(ii); QP pp5–6, MS p6 | 2 | S2.14.A02: PSTN role. Modem conversion supports explanation; the preceding router question is excluded. No dedicated-line or cellular assessment. |
| E020 | 9618/12 October/November 2023, 7(a), 7(b)(iii), 7(d); QP pp10–12, MS pp7–9 | 10 | S2.15.A01/A02/A05/A06, with limits: version distinction and address-type entries. Subnet purposes additionally assess S2.15 at syllabus level; they do not directly assess A04's local/routed decision or CIDR calculation. Public/private security consequences, interface association and DNS are not asked. |
| E2D01 | 9618/12 May/June 2025, 6(a); QP p11, MS p10 | 2 | S2.01.A02/A03: paired LAN/WAN differences. No general networking-benefit or cellular-process assessment. |
| E2D02 | 9618/13 May/June 2023, 2(b)(i–ii); QP p3, MS pp3–4 | 4 | S2.04.A03, S2.05.A02: mesh features and two advantages over bus. No hybrid recognition or complete scenario-based design choice. |
| E2D03 | 9618/11 October/November 2023, 2(a–b); QP p4, MS p4 | 6 | S2.10.A01 plus parts of S2.09.A01/A03/A04: routing, switch, WAP and bridge. Bundled labels do not mean server, cables or repeater are assessed. |
| E2D04 | 9618/12 May/June 2025, 6(b); QP p11, MS p10 | 4 | S2.14.A04: cells, base station, phone radio link and multiple users. No required handover trace or infrastructure comparison. |
| E2D05 | 9618/11 October/November 2025, 7(c); QP p12, MS p11 | 4 | S2.16.A01–A03: URL processing, cache, DNS, connection and resource request/display. Four marks sample that chain; no hierarchy, subnet computation or cryptography is required. |

## Remaining assessment gaps

The mapping touches **29 of the 59 objective labels**. This is not a 29/59 mastery or complete-coverage score: some of those 29 are bundled, partial or alternatives. The other 30 labels have no selected question directly mapped to them. They retain authored checks and worked practice. The following gaps must not disappear merely because a broad requirement has a nearby paper:

- Network benefits; peer-to-peer comparisons/model selection; thick clients/client selection.
- Independent bus and hybrid recognition; a full topology choice from constraints.
- Cloud definition, public/private distinction and deployment selection.
- Wired/wireless comparison; copper details, satellite characteristics and medium selection. E015 does not cover all radio/microwave characteristics.
- NIC/WNIC; server, cable and repeater functions within the partly sampled hardware labels; a direct router-versus-switch comparison.
- Complete collision tracing and the causal reason for random backoff.
- Real-time versus on-demand comparison, bit-rate definitions/calculations, numerical buffer change and prolonged deficit/adaptation.
- Internet-versus-WWW distinctions and classifying non-WWW services.
- Modem mechanism, dedicated lines and selecting access infrastructure.
- Address-to-interface association, subnet-mask/local-delivery calculations, security consequences of address scope, and a full IPv6 notation exercise.

No new teacher-authored question is labelled as a Cambridge past paper. The independent concept checks remain distinct from the original excerpts, hints, authored reasoning and official mark schemes.

## Technical interpretation safeguards

Several official schemes use broad wording. The original images are retained faithfully, while the separate teacher explanation narrows the technical interpretation:

- E016: Ethernet frames use link-layer addresses. IP and MAC must not be taught as interchangeable. CSMA/CD applies to shared half-duplex Ethernet, not ordinary full-duplex switched links.
- E019: not every PSTN segment is analogue. Signal conversion depends on the specific access link.
- E020: a subnet mask alone is not an access-control rule. Security advantages require suitable segmentation and policy configuration. Dynamic does not mean an address necessarily changes on every reconnection.
- E2D02: an alternate path must actually remain available after a failure; mesh wiring does not guarantee encryption or complete security.
- E2D03: NAT, address allocation and firewall features can be combined in a gateway but are not mandatory properties of every router. The core routing answer supplies a valid three-mark response.
- E2D04: cellular coverage is not an exact regular geometric boundary, and a teaching diagram must state that simplification.
- E2D05: DNS supplies name-to-address information, not page content. A usable cached result can remove the need for a new lookup.

## Reproducible verification

Run `node --test scripts/course-v3-section2-classroom.test.mjs` after the journey, labs and renderer are available. It checks the fixed 59-objective/31-unit inventory, global prerequisite order, 45-minute sessions, exact paper placement, scoped mappings, teacher/original answer separation, old anchors, figures/experiments, all 46 crop hashes and dimensions, ImageGen provenance and the 22 original-PDF identities. Set `AS9618_PAST_PAPER_ROOT` to another local archive if needed. Missing originals are reported as skipped; passing crop checks does not verify a missing original PDF.

Source reads, original-PDF rehashing, new crop boundary checks and visual review of all 46 crops are complete. On 2026-09-30, `node --test scripts/course-v3-section2-classroom.test.mjs` passed all 32 tests (10 main tests and 22 original-PDF subtests), with no failures or skips. The integrated teaching source has 35 concepts and 29 suggested 45-minute sessions. These tests render the classroom HTML and check its contract; actual browser acceptance is reported separately. This source review alone does not establish projector readability, touchscreen behaviour or teaching effectiveness on a real class.
