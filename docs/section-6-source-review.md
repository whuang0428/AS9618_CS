# Section 6 source review

Reviewed 2026-11-16. The original 9618 question papers and mark schemes were read from the teacher-owned archive at `/Users/kw/Documents/Teaching/AS CS 9618/past-papers`. The search covered all 18 Paper 1 variants from May/June and October/November 2023–2025. This is a source and assessment review, not evidence that every taught detail has appeared in an examination.

## Checkpoint selections

The security checkpoint uses six groups for **20 marks**; the integrity checkpoint uses five groups for **17 marks**. The existing verified E045 and E049 extracts remain unchanged. Nine new groups and 26 original-page extracts are recorded in `scripts/course-v3-section6-extra-papers.mjs`.

| ID | Original paper and selected parts | Marks | QP / MS PDF pages | Assessed capability |
|---|---|---:|---|---|
| E045, retained | 9618/12 O/N 2023, 5(a), 5(b) | 2 | 8 / 5–6 | Define privacy and integrity. |
| E6S01 | 9618/13 O/N 2023, 8(b) | 2 | 12 / 8 | State one difference and one similarity between phishing and pharming. |
| E6S02 | 9618/12 O/N 2025, 5(e) | 3 | 8 context, 9 task / 8 | Identify one threat, describe it and name matching prevention. |
| E6S03 | 9618/11 M/J 2025, 7(b) | 5 | 12 / 11 | Explain signature creation and received-data digest comparison. |
| E6S04 | 9618/13 M/J 2025, 3(b) | 4 | 6 / 6 | Select different additional controls for transmitted and stored files. |
| E6S05 | 9618/13 O/N 2025, 5(d) | 4 | 6 context, 8 task / 9 | Explain two methods protecting customer data in a DBMS. |
| E6I01 | 9618/13 M/J 2023, 4(d)(i–iii) | 5 | 7 context, 8–9 tasks / 7 | Apply format/length rules; describe visual/double-entry checking; explain source-data limitations. |
| E049, retained | 9618/12 O/N 2025, 1 | 2 | 2 / 4 | Connect four verification methods to data-entry or transfer contexts. |
| E6I02 | 9618/11 M/J 2024, 5(b) | 5 | 11 / 6 | Complete a byte/block parity process description. |
| E6I03 | 9618/12 O/N 2025, 6(c)(i–ii) | 2 | 11 / 9 | Calculate an even-parity bit; locate a single altered bit in a parity block. |
| E6I04 | 9618/11 M/J 2025, 7(c) | 3 | 12 context, 13 task / 11 | Explain checksum generation, sending, recalculation and comparison. |

Only the named parts are assigned. Separate crops retain required shared scenarios without including unrelated answer tasks. E6I04 retains the original transfer-context sentence from 7(a); this is context, not an assigned additional question. E049 remains the whole four-connection task: two or three correct connections earn one mark, and all four earn two.

The module records explicit objective IDs, assessment focus and coverage limits. E6S02 maps directly to the spyware worked answer and threat prevention: the other four threats in its official scheme are alternative choices, not five simultaneously tested answers. E6S04 does not map to the data-versus-system requirement. E6I02 describes parity but does not assess calculation; E6I03 supplies that calculation and location evidence. E6I04 does not assess a numerical checksum calculation. E6I01 does not assess every validation rule.

## Evidence used to design teaching materials

| Teaching material | Verified source | What the source supports |
|---|---|---|
| Protect data and the computer system | 9618/13 O/N 2023, 3(a)(iii), 3 marks, QP/MS p4; 9618/13 M/J 2023, 6(b), 2 marks, QP p11/MS p9 | The first explicitly asks how firewall, encryption and passwords protect computer systems. The second asks for installed software protecting a computer from network threats. These support a paired data/system scene. E6S04 adds storage/transmission context but does not directly test why data and systems both need security. |
| Accounts and passwords | 9618/13 O/N 2023, 3(a)(iii); E6S05 | A correct password permits access and authentication prevents unauthorised access. No direct user-account mechanism question was found in this search window; account identity and credential-matching diagrams are teacher explanation. |
| Biometrics | 9618/11 M/J 2024, 5(c)(ii), 4 marks, QP p12/MS p6; E6S05 | Bank facial recognition: image capture, feature analysis and probability of a match. The first is an AI question with cross-section training points; it does not establish that the whole enrolment/template process was directly tested. |
| Firewall | 9618/11 M/J 2024, 5(c)(i), 3 marks, QP p12/MS p6; retained E046 | Compare incoming/outgoing traffic against rules and block disallowed transmissions. E046 expressly excludes authentication and must not be used as signature, password or biometric assessment. |
| Anti-virus and anti-spyware | 9618/13 M/J 2023, 6(b), 2 marks, QP p11/MS p9 | Scan and compare with a definitions database; update definitions; quarantine/delete or prevent downloads. The entire two-software task is two marks. |
| Virus and pharming | 9618/11 O/N 2025, 8(a), 2 marks, QP p14/MS p13 | Virus replication and damage; malicious redirection to a false site to obtain personal information. |
| Spyware and phishing | Retained E047, 9618/12 O/N 2023, 5(c), 4 marks, QP p8/MS p6 | Secret activity/keystroke collection and third-party disclosure; impersonation and induced disclosure through email. Each threat has a two-mark maximum. |
| Five threats and controls | E6S02; 9618/13 O/N 2023, 8(c), 3 marks, QP p12/MS p9 | The five-row MS supplies accepted alternatives; the latter supports reputable sources, backups, scanning/removal/updates, restricted privileges and removable-media precautions. |
| Encryption | Retained E048; 9618/11 M/J 2025, 7(a), 3 marks, QP p12/MS p11 | Encode with a key; intercepted ciphertext is unintelligible without decryption. Encryption does not prevent interception itself. |
| Access rights | E6S05; 9618/12 O/N 2023, 2(b), 4 marks, QP/MS p4 | Different users/tables have read-only, read/write or full permissions. Authentication and permission decisions are separate. |

The digital-signature scheme uses a simplified digest-encryption model. Teacher explanations label this model, show the receiver's independent hash and use a trusted sender public key for checking. The signature does not itself provide document confidentiality.

The anti-spyware row in the 2023/13 6(b) MS says “database of viruses” in its first option and “known spyware” in its second. Original source wording is retained; teacher explanations use spyware definitions. The pharming prevention alternatives in E6S02 are not a claim that any VPN or avoiding email links prevents every form of pharming. Teaching explanations tie controls to the route they can affect.

The seven validation checks and detailed checksum arithmetic remain teaching content even where these selected questions do not directly assess each rule or computation. A source gap means no matching question was verified in this search window, not that Cambridge has never examined it.

## Verification

- Rechecked original QP/MS identities, selected parts, marks and necessary shared context.
- Extracted unchanged original regions at 144 dpi; checked every crop boundary against visible glyph boxes.
- Visually reviewed all 26 final PNGs, including complete question tables, the parity grid and the circled official error location. The single erroneous bit is row 2, column 5; the standalone parity bit is 0.
- Recorded original PDF SHA-256, exact crop specifications and their hash, PNG SHA-256, dimensions and page numbers. The module validates crop metadata, PNG hashes, dimensions and mark totals on import.
- Rendered all nine records through the existing `renderPastPaperQuestion` interface. Separate teacher guidance and official schemes remain collapsed initially.
- This source work does not claim browser or full-site acceptance; the chapter integration checks report those separately.


## 2026-11-19 terminology review

Reviewed the active Lessons 033–037: all nine journey subsections, their teaching materials and tables, seven interactive models (including dynamic labels), base and enhanced explanations, Practice answers, and teacher guidance for the selected papers. The syllabus terminology was checked against printed/PDF page 24 of the locally available 2027–2029 Version 2 syllabus. This pass does not claim a fresh verification of the current online PDF version.

| Wording corrected | Preferred classroom wording | Direct Cambridge evidence |
|---|---|---|
| `stored password verifier` | Check whether the supplied password is correct for the user account. | 9618/13 O/N 2023, Q3(a)(iii), MS p4: correct password permits access and prevents unauthorised access. Password-storage implementation is not required for this description. |
| Abstract `sign`, `check` and `digest evidence` in the signature procedure and answers | Hash the message to produce a digest; **encrypt the digest** to create the signature; **decrypt the signature** at the receiver; hash the received message with the same algorithm; compare the two digests. | 9618/11 M/J 2025, Q7(b), MS p11. The simplified model remains explicitly identified; modern algorithm details do not replace the expected process description. |
| `Receiver’s public key` control label | `Public key used by the receiver`, with `Sender public key A` as the matching choice. | Preserves the sender/receiver key roles already taught; the cited 2025 scheme assesses the digest process without allocating a separate key-role mark. |
| `payload`, `credentials`, `traffic-policy decision`, `malware verdict`, `hash token` in the active explanation | Virus actions, passwords, firewall rules and digest values, respectively. | 9618/12 O/N 2023 Q5(c), MS p6; 9618/13 M/J 2023 Q6(b), MS p9; 9618/12 O/N 2025 Q5(e), MS p8; 9618/11 M/J 2025 Q7(b), MS p11. These are clarity changes, not a claim that Cambridge has never used the replaced words. |
| `checking digit`, `column-parity row`, diagram label `Column parity` | `check digit`; `parity byte` for the transmitted row containing column parity bits. | Syllabus p24 lists `check digit`; 9618/11 M/J 2024 Q5(b), MS p6 calls the transmitted checking byte a `parity byte`. |

Original QP/MS wording, extract images, source identities and hashes were not edited. Limits of the simplified models and error-detection methods remain stated. The existing parity-label assertion was updated to the corrected terminology; numerical model behaviour was unchanged.

Combined verification completed on 2026-11-19: scoped pages regenerated and all 25 Section 6 tests passed. Browser spot-check of lesson-034 confirmed the revised public-key label and all six signature steps; changing the message produces different digests and a failed comparison.
