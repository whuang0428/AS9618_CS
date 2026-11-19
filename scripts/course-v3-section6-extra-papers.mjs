// Verified original questions for the two Section 6 checkpoints.
// Paths under sourcePdf are relative to the read-only teacher paper archive.
// Original extracts stay unchanged; all reading/solution/marking/mistakes are teacher-written.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const digest = value => createHash('sha256').update(value).digest('hex');
export const section6ExtraPapers = [
  {
    "id": "E6S01",
    "year": 2023,
    "series": "Oct/Nov",
    "component": 13,
    "parts": [
      {
        "part": "8(b)",
        "marks": 2
      }
    ],
    "marks": 2,
    "title": "Compare phishing with pharming",
    "commandWord": "State",
    "objectiveIds": [
      "S6.04.A04",
      "S6.04.A05"
    ],
    "syllabusMapping": [
      "S6.04"
    ],
    "reading": [
      "Give one difference and one similarity. Each answer must compare the two named threats; two differences cannot earn the similarity mark."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Comparison",
          "Model answer"
        ],
        "rows": [
          [
            "Difference",
            "Phishing uses a deceptive message to prompt the user to act; pharming redirects the user to a fraudulent website automatically."
          ],
          [
            "Similarity",
            "Both can impersonate a trusted organisation to obtain personal or financial information."
          ]
        ]
      }
    ],
    "marking": [
      "One mark is available for a correct difference and one for a correct similarity. The scheme also accepts that both can use fake websites."
    ],
    "mistakes": [
      "Pharming does not require the victim to click the phishing email in this comparison. Do not define phishing and then omit pharming."
    ],
    "assessmentFocus": [
      "Compare the routes and purpose of phishing and pharming."
    ],
    "coverageNotes": [
      "This question does not ask for prevention methods."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/13 · October/November 2023 · 8(b)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          8,
          336,
          503
        ]
      ],
      "qp": [
        [
          12,
          212,
          354
        ]
      ]
    },
    "qp": {
      "filename": "9618_w23_qp_13.pdf",
      "sourcePdf": "2023-Oct-Nov/9618_w23_qp_13.pdf",
      "sha256": "90c2b773f5d16f13ca83a637ca047c2afa31a7a7dad0664fe8522616a9ab3a4e",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6s01-qp-1.png",
          "page": 12,
          "bbox": [
            45.0,
            212.0,
            560.2756,
            354.0
          ],
          "width": 1031,
          "height": 284,
          "sha256": "a3819837719684d5bed4e94c698046c531a26cf6d8fa277483345c9ca97d9e2e"
        }
      ]
    },
    "ms": {
      "filename": "9618_w23_ms_13.pdf",
      "sourcePdf": "2023-Oct-Nov/9618_w23_ms_13.pdf",
      "sha256": "c658537dc541755e6829581b37db83a5f9ae4958d765a885732383b5015d12f6",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6s01-ms-1.png",
          "page": 8,
          "bbox": [
            45.0,
            336.0,
            560.2756,
            503.0
          ],
          "width": 1031,
          "height": 334,
          "sha256": "75a834a6e6bd7f8b2cfdca1542fcb47a6b07af9ed20cd9d1e0d1bbef9c3e6b18"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "0d11466b257e39bcec4b3f316615d7f016ba53b15f697853aa3383ec21e1c82f",
      "method": "Read the original local QP/MS pages and verified paper identities, selected parts, marks and required shared context. Rendered unchanged original extracts at 144 dpi. Checked all crop boundaries against original glyph boxes and visually reviewed every final PNG. Recorded PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E6S02",
    "year": 2025,
    "series": "Oct/Nov",
    "component": 12,
    "parts": [
      {
        "part": "5(e)",
        "marks": 3
      }
    ],
    "marks": 3,
    "title": "Link one threat to its description and prevention",
    "commandWord": "Identify / Describe",
    "objectiveIds": [
      "S6.04.A02",
      "S6.05.A01"
    ],
    "syllabusMapping": [
      "S6.04",
      "S6.05"
    ],
    "reading": [
      "Choose one threat and complete all three columns for that same threat. The original LAN context is retained; the selected task concerns threats posed by networks and the internet."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Threat",
          "Description",
          "Prevention"
        ],
        "rows": [
          [
            "Spyware",
            "Malicious software secretly records actions such as keystrokes and sends the information to a third party.",
            "Use anti-spyware software."
          ]
        ]
      }
    ],
    "marking": [
      "The threat, corresponding description and suitable prevention each earn one mark. Spyware is the worked answer here. The unchanged official scheme also lists malware/virus, hacking, phishing and pharming as alternatives."
    ],
    "mistakes": [
      "A prevention must match the chosen threat. This is one three-mark response, not five separate questions. A measure reduces a particular risk; it does not guarantee that every attack route is blocked."
    ],
    "assessmentFocus": [
      "Identify one threat, explain its action and select a matching prevention."
    ],
    "coverageNotes": [
      "The direct objective mapping follows the spyware worked answer. The other four threats are accepted choices, not five simultaneously assessed answers."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/12 · October/November 2025 · 5(e)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          8,
          64,
          467
        ]
      ],
      "qp": [
        [
          8,
          60,
          80
        ],
        [
          9,
          292,
          579
        ]
      ]
    },
    "qp": {
      "filename": "9618_w25_qp_12.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_12.pdf",
      "sha256": "ea65e75a4182f991cb2117827ee5c6734365b2c5e78686c6d6ef1e00d48fe65b",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6s02-qp-1.png",
          "page": 8,
          "bbox": [
            45.0,
            60.0,
            560.2756,
            80.0
          ],
          "width": 1031,
          "height": 40,
          "sha256": "ecc81580676b796936c4c03d0bfafbad70d5d966ac5a5b47dc457182072edcc2"
        },
        {
          "asset": "/assets/past-paper-questions/s6-e6s02-qp-2.png",
          "page": 9,
          "bbox": [
            45.0,
            292.0,
            560.2756,
            579.0
          ],
          "width": 1031,
          "height": 574,
          "sha256": "00a4350c7b0054f291786e1ea83e35a0a2d032fa75836f3123225dda0527d5fd"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_12.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_12.pdf",
      "sha256": "4fd455f74ae4abf71a8796095c912a06c77239d6d5a6679ce05ceff1032e7dd8",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6s02-ms-1.png",
          "page": 8,
          "bbox": [
            45.0,
            64.0,
            560.2756,
            467.0
          ],
          "width": 1031,
          "height": 806,
          "sha256": "8d3721531c5c41093062f6cdbffde60b0bbf41a2a5258dcd5aceb1a1f611a33a"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "36edf96f583d4e2aa52cd6e78669a91cd3caa703cf4ce6e3ef7b56fefb744515",
      "method": "Read the original local QP/MS pages and verified paper identities, selected parts, marks and required shared context. Rendered unchanged original extracts at 144 dpi. Checked all crop boundaries against original glyph boxes and visually reviewed every final PNG. Recorded PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E6S03",
    "year": 2025,
    "series": "May/June",
    "component": 11,
    "parts": [
      {
        "part": "7(b)",
        "marks": 5
      }
    ],
    "marks": 5,
    "title": "Explain signature creation and the receiver check",
    "commandWord": "Explain",
    "objectiveIds": [
      "S6.03.A02"
    ],
    "syllabusMapping": [
      "S6.03"
    ],
    "reading": [
      "Explain the complete sender-to-receiver process. The question asks how the receiver checks that the transferred data has not changed."
    ],
    "solution": [
      "The sender hashes the document to produce a digest. In the simplified digest-encryption model used by this scheme, the sender encrypts the digest to create a digital signature and sends the document with that signature.",
      "The receiver decrypts the signature to recover the sender digest. The receiver also hashes the received document using the same hashing algorithm and compares the two digests. Matching digests support the conclusion that the signed document has not changed.",
      "In the classroom model, signing uses the sender private key and checking uses the trusted sender public key. These key roles explain the model; this particular mark scheme lists the digest and comparison stages without separately allocating a key-role mark."
    ],
    "marking": [
      "The official scheme awards one mark per listed point, up to five. Include the received-document hash and the comparison; the signature alone is not a complete verification process."
    ],
    "mistakes": [
      "Hashing and encryption are different operations. Do not say that the document itself must be encrypted by the signature process, or that the receiver needs the sender private key. A signature alone does not hide the accompanying document."
    ],
    "assessmentFocus": [
      "Describe digest generation, signing, sending, receiver hashing and comparison."
    ],
    "coverageNotes": [
      "The official scheme uses a simplified digest-encryption explanation; it is not a universal implementation description of every signature algorithm."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · May/June 2025 · 7(b)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          11,
          202,
          372
        ]
      ],
      "qp": [
        [
          12,
          60,
          80
        ],
        [
          12,
          318,
          653
        ]
      ]
    },
    "qp": {
      "filename": "9618_s25_qp_11.pdf",
      "sourcePdf": "2025-May-June/9618_s25_qp_11.pdf",
      "sha256": "bdf74d4f15c620bde7e6fe65f17828bc85c89490ebb9a1a337e2cd0596f4b39a",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6s03-qp-1.png",
          "page": 12,
          "bbox": [
            45.0,
            60.0,
            560.2756,
            80.0
          ],
          "width": 1031,
          "height": 40,
          "sha256": "b88fc062843b600afc7c69eb148f23903e86c21c70a9ed31f80a35a1cd2e3787"
        },
        {
          "asset": "/assets/past-paper-questions/s6-e6s03-qp-2.png",
          "page": 12,
          "bbox": [
            45.0,
            318.0,
            560.2756,
            653.0
          ],
          "width": 1031,
          "height": 670,
          "sha256": "0e120801c5c0b31c9e94ef0f63cc447ea462484029d8b2c1c60636f9c3b16665"
        }
      ]
    },
    "ms": {
      "filename": "9618_s25_ms_11.pdf",
      "sourcePdf": "2025-May-June/9618_s25_ms_11.pdf",
      "sha256": "8bf543ddd26e74224f40fd909152e300b9b711eb3644d7e8d07c1d5c3f07521b",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6s03-ms-1.png",
          "page": 11,
          "bbox": [
            45.0,
            202.0,
            560.2756,
            372.0
          ],
          "width": 1031,
          "height": 340,
          "sha256": "ec7edf0afbe62f44b0d45d529dc029db87aae8275be1bdf9372f10b34a69c486"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "09f3162aa5e455fe59860d754008ba689cdea4cba0e24e6c8b8ebffab5342c1b",
      "method": "Read the original local QP/MS pages and verified paper identities, selected parts, marks and required shared context. Rendered unchanged original extracts at 144 dpi. Checked all crop boundaries against original glyph boxes and visually reviewed every final PNG. Recorded PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E6S04",
    "year": 2025,
    "series": "May/June",
    "component": 13,
    "parts": [
      {
        "part": "3(b)",
        "marks": 4
      }
    ],
    "marks": 4,
    "title": "Protect program files in transit and on a computer",
    "commandWord": "Identify / State",
    "objectiveIds": [
      "S6.06.A01",
      "S6.03.A05",
      "S6.03.A08"
    ],
    "syllabusMapping": [
      "S6.06",
      "S6.03"
    ],
    "reading": [
      "The files already have password protection. Choose two different additional methods, one for transmission and one for the computer, and explain the protection in each row."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Location",
          "Method",
          "How it protects the data"
        ],
        "rows": [
          [
            "During transmission",
            "Encryption",
            "Transforms the data into ciphertext so an interceptor cannot understand it without the decryption key."
          ],
          [
            "On the computer",
            "Anti-malware software",
            "Finds malicious software and quarantines or removes it, reducing the risk of malware altering or deleting the files."
          ]
        ]
      }
    ],
    "marking": [
      "Each row earns one mark for a suitable method and one for the matching description. The two methods must differ. The scheme also accepts a firewall/proxy or a physical control for the computer row."
    ],
    "mistakes": [
      "Do not repeat passwords, which are already supplied. Encryption does not prevent interception itself. This task distinguishes protection locations; it does not directly ask why both data and the processing system need security."
    ],
    "assessmentFocus": [
      "Select different controls for stored and transmitted data and explain their mechanisms."
    ],
    "coverageNotes": [
      "This is supporting evidence for complementary protection, not direct assessment of the S6.02 data-versus-system requirement."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/13 · May/June 2025 · 3(b)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          6,
          317,
          653
        ]
      ],
      "qp": [
        [
          6,
          60,
          80
        ],
        [
          6,
          331,
          747
        ]
      ]
    },
    "qp": {
      "filename": "9618_s25_qp_13.pdf",
      "sourcePdf": "2025-May-June/9618_s25_qp_13.pdf",
      "sha256": "b341d6829ba4baf47dbd8d272cb7fd49b448d04a2a16a028e4fb3178c3c64554",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6s04-qp-1.png",
          "page": 6,
          "bbox": [
            45.0,
            60.0,
            560.2756,
            80.0
          ],
          "width": 1031,
          "height": 40,
          "sha256": "68f98120388034ec9a88a989977d7ccf67e0d71d515e2b655f69ad202e2b58fa"
        },
        {
          "asset": "/assets/past-paper-questions/s6-e6s04-qp-2.png",
          "page": 6,
          "bbox": [
            45.0,
            331.0,
            560.2756,
            747.0
          ],
          "width": 1031,
          "height": 832,
          "sha256": "2dfe6dc2a6fb74bbb9455dd383fa5d47994f2f521d6b31711f9ba163fc2a26a8"
        }
      ]
    },
    "ms": {
      "filename": "9618_s25_ms_13.pdf",
      "sourcePdf": "2025-May-June/9618_s25_ms_13.pdf",
      "sha256": "a334bec016c753451ae53c56fdfc0b0758b8f2b5a7a06a86307ac100bb7ebd8e",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6s04-ms-1.png",
          "page": 6,
          "bbox": [
            45.0,
            317.0,
            560.2756,
            653.0
          ],
          "width": 1031,
          "height": 672,
          "sha256": "c2f930f6c274958805da90b55d9227f62715bb818aceb2fec14a558631a19a29"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "fcc8eb2376fac0a447c28339935d609c9356d4cb6c0d9ccf8e330f6b70efd876",
      "method": "Read the original local QP/MS pages and verified paper identities, selected parts, marks and required shared context. Rendered unchanged original extracts at 144 dpi. Checked all crop boundaries against original glyph boxes and visually reviewed every final PNG. Recorded PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E6S05",
    "year": 2025,
    "series": "Oct/Nov",
    "component": 13,
    "parts": [
      {
        "part": "5(d)",
        "marks": 4
      }
    ],
    "marks": 4,
    "title": "Separate authentication from access rights",
    "commandWord": "Describe",
    "objectiveIds": [
      "S6.03.A01",
      "S6.06.A02"
    ],
    "syllabusMapping": [
      "S6.03",
      "S6.06"
    ],
    "reading": [
      "Describe two different DBMS security methods and explain how each protects customer data. The original company and database context is retained; no SQL is required for this selected part."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Method",
          "Protection"
        ],
        "rows": [
          [
            "Authentication using a password",
            "Checks the supplied credentials and prevents users without the correct authentication evidence from accessing the customer data."
          ],
          [
            "Access rights",
            "Assigns permissions so that only authorised users can read or edit the customer data; a read-only user cannot modify it."
          ]
        ]
      }
    ],
    "marking": [
      "Each suitable method and its corresponding description can earn two marks, up to four. The scheme also accepts backups, encryption and restricted database views."
    ],
    "mistakes": [
      "A successful login is not permission to perform every operation. Two authentication examples without a second distinct method do not provide the two different protection mechanisms in this model answer."
    ],
    "assessmentFocus": [
      "Explain authentication and authorised read/edit permissions in a customer-data scenario."
    ],
    "coverageNotes": [
      "The accepted biometric alternative does not test biometric enrolment or matching mechanics. Account creation is not asked."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/13 · October/November 2025 · 5(d)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          9,
          379,
          665
        ]
      ],
      "qp": [
        [
          6,
          60,
          106
        ],
        [
          8,
          60,
          341
        ]
      ]
    },
    "qp": {
      "filename": "9618_w25_qp_13.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_13.pdf",
      "sha256": "9b5d7e33de24afb406ddc00c253ebf37b4240e6b21f3c1a7f6f1eb82aba78cc6",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6s05-qp-1.png",
          "page": 6,
          "bbox": [
            45.0,
            60.0,
            560.2756,
            106.0
          ],
          "width": 1031,
          "height": 92,
          "sha256": "d2ee18a0ffef22c79cb6287bc8499cee1f8d72e4025ab4178369c4fc173dc966"
        },
        {
          "asset": "/assets/past-paper-questions/s6-e6s05-qp-2.png",
          "page": 8,
          "bbox": [
            45.0,
            60.0,
            560.2756,
            341.0
          ],
          "width": 1031,
          "height": 562,
          "sha256": "33345ff4de186e4912938c22f9b62c506fe21e60fe30e0b4f0189a7b9b1a3263"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_13.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_13.pdf",
      "sha256": "d4bf99da2ca289430a18709d483892df85646dc5a90d5fb6697eb6d13c10481b",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6s05-ms-1.png",
          "page": 9,
          "bbox": [
            45.0,
            379.0,
            560.2756,
            665.0
          ],
          "width": 1031,
          "height": 572,
          "sha256": "4e77148653e6377cf3c908ee78682bfaef91d459c93b8fb12709667226dbf0cc"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "ed97aad409fbffceb6e94a96388d6c530cff4757d12731c796025a91d08dee7a",
      "method": "Read the original local QP/MS pages and verified paper identities, selected parts, marks and required shared context. Rendered unchanged original extracts at 144 dpi. Checked all crop boundaries against original glyph boxes and visually reviewed every final PNG. Recorded PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E6I01",
    "year": 2023,
    "series": "May/June",
    "component": 13,
    "parts": [
      {
        "part": "4(d)(i)",
        "marks": 2
      },
      {
        "part": "4(d)(ii)",
        "marks": 2
      },
      {
        "part": "4(d)(iii)",
        "marks": 1
      }
    ],
    "marks": 5,
    "title": "Validate and verify a car registration number",
    "commandWord": "Describe / State",
    "objectiveIds": [
      "S6.07.A03",
      "S6.07.A04",
      "S6.07.A09",
      "S6.08.A01",
      "S6.08.A02",
      "S6.08.A05"
    ],
    "syllabusMapping": [
      "S6.07",
      "S6.08"
    ],
    "reading": [
      "Use the given registration pattern. Presence checking is already supplied, so name and describe two other validation methods. Then give two verification methods and explain the final limitation."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Part",
          "Model answer"
        ],
        "rows": [
          [
            "4(d)(i)",
            "Length check: exactly six characters. Format check: one letter, three digits, then two letters."
          ],
          [
            "4(d)(ii)",
            "Visual check: compare the entered registration with the original document. Double entry: enter the registration twice and let the computer compare the two entries."
          ],
          [
            "4(d)(iii)",
            "The source document can contain the wrong registration for the car even though it has the required format; copying that source correctly does not make it true."
          ]
        ]
      }
    ],
    "marking": [
      "Two validation descriptions earn up to two marks, the two verification descriptions earn two marks, and the source-data limitation earns one mark. The scheme also allows an alphanumeric type check for the validation part."
    ],
    "mistakes": [
      "Do not use presence as one of the two other checks. Verification compares against a source or a second entry; it does not apply the registration format. Passing both checks does not prove that the source identified the correct car."
    ],
    "assessmentFocus": [
      "Apply format and length checks, describe visual checking and double entry, and explain source-data limits."
    ],
    "coverageNotes": [
      "The question does not apply range, existence, limit or check-digit rules. Presence is supplied, not an additional answer."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/13 · May/June 2023 · 4(d)(i), 4(d)(ii), 4(d)(iii)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          7,
          64,
          307
        ]
      ],
      "qp": [
        [
          7,
          57,
          94
        ],
        [
          8,
          498,
          772
        ],
        [
          9,
          57,
          304
        ]
      ]
    },
    "qp": {
      "filename": "9618_s23_qp_13.pdf",
      "sourcePdf": "2023-May-June/9618_s23_qp_13.pdf",
      "sha256": "b53ac2c6e575164af41410a1f4620a102aa2de42ed51fd9bfb586e24221f0d90",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6i01-qp-1.png",
          "page": 7,
          "bbox": [
            45.0,
            57.0,
            560.2756,
            94.0
          ],
          "width": 1031,
          "height": 74,
          "sha256": "f6dc28704f416949319b947efdc670f9387b783af45434ba06d28094b180f6ef"
        },
        {
          "asset": "/assets/past-paper-questions/s6-e6i01-qp-2.png",
          "page": 8,
          "bbox": [
            45.0,
            498.0,
            560.2756,
            772.0
          ],
          "width": 1031,
          "height": 548,
          "sha256": "1b59d0b9c2d070783e6644f69074237f29341b3420723b01860427b93e762fbf"
        },
        {
          "asset": "/assets/past-paper-questions/s6-e6i01-qp-3.png",
          "page": 9,
          "bbox": [
            45.0,
            57.0,
            560.2756,
            304.0
          ],
          "width": 1031,
          "height": 494,
          "sha256": "4c2c479c277402aec342da316d589de54c3065427ddc2b2b0a8e19b57a91c506"
        }
      ]
    },
    "ms": {
      "filename": "9618_s23_ms_13.pdf",
      "sourcePdf": "2023-May-June/9618_s23_ms_13.pdf",
      "sha256": "e42d1cc9bdc1e41f9c08fa51f98bdc024d3a0b2984c98b50742f810a6c6762fd",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6i01-ms-1.png",
          "page": 7,
          "bbox": [
            45.0,
            64.0,
            560.2756,
            307.0
          ],
          "width": 1031,
          "height": 486,
          "sha256": "5cad9a717ce41a32f11b817cafcb5dcba15b9dc1dcd37d29116d4c8710b06bb0"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "bfa21ed1970e8538456f3a5a10bf85c6754edfa107fae424217420c744a4c586",
      "method": "Read the original local QP/MS pages and verified paper identities, selected parts, marks and required shared context. Rendered unchanged original extracts at 144 dpi. Checked all crop boundaries against original glyph boxes and visually reviewed every final PNG. Recorded PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E6I02",
    "year": 2024,
    "series": "May/June",
    "component": 11,
    "parts": [
      {
        "part": "5(b)",
        "marks": 5
      }
    ],
    "marks": 5,
    "title": "Complete the byte and block parity process",
    "commandWord": "Complete",
    "objectiveIds": [
      "S6.08.A03"
    ],
    "syllabusMapping": [
      "S6.08"
    ],
    "reading": [
      "Complete the five gaps in order. The paragraph describes both a parity bit for each seven-bit data group and a parity byte for a block."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Gap",
          "Answer"
        ],
        "rows": [
          [
            "1",
            "odd or even"
          ],
          [
            "2",
            "7-bits"
          ],
          [
            "3",
            "odd"
          ],
          [
            "4",
            "block"
          ],
          [
            "5",
            "byte"
          ]
        ]
      },
      "The sender and receiver agree on the parity convention. For the odd-parity case named in the third gap, an even count of data 1s needs a parity bit of 1. Block checking adds a parity bit for each column, forming the parity byte sent with the data."
    ],
    "marking": [
      "Each correctly completed term earns one mark, for five marks overall. Use the agreed parity and distinguish a bit from a byte."
    ],
    "mistakes": [
      "The third gap is odd, not even: adding 1 to an even count produces an odd count. Do not swap the final two terms."
    ],
    "assessmentFocus": [
      "Recall the sender construction of byte parity and block parity in a cloze description."
    ],
    "coverageNotes": [
      "This part does not ask the learner to calculate a particular parity bit or locate a damaged bit."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · May/June 2024 · 5(b)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          6,
          189,
          435
        ]
      ],
      "qp": [
        [
          11,
          57,
          94
        ],
        [
          11,
          368,
          681
        ]
      ]
    },
    "qp": {
      "filename": "9618_s24_qp_11.pdf",
      "sourcePdf": "2024-May-June/9618_s24_qp_11.pdf",
      "sha256": "2e39e6c2ee1e65d621df71b4b7fbe41a16f1e4ed8e252fb1612a6d14b13de063",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6i02-qp-1.png",
          "page": 11,
          "bbox": [
            45.0,
            57.0,
            560.2756,
            94.0
          ],
          "width": 1031,
          "height": 74,
          "sha256": "92a0dda5eb5f5514f6f0c8f64280450cf14115119bb7ebf2634065a742bbff32"
        },
        {
          "asset": "/assets/past-paper-questions/s6-e6i02-qp-2.png",
          "page": 11,
          "bbox": [
            45.0,
            368.0,
            560.2756,
            681.0
          ],
          "width": 1031,
          "height": 626,
          "sha256": "316c706e5f0342746b535960bd0d140462a2c6d6f0ea232ce30d4d89b60da71d"
        }
      ]
    },
    "ms": {
      "filename": "9618_s24_ms_11.pdf",
      "sourcePdf": "2024-May-June/9618_s24_ms_11.pdf",
      "sha256": "b53a8ca0d83d790364125ad0b74cef676204133d540c9c89f38404dd4d1fca69",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6i02-ms-1.png",
          "page": 6,
          "bbox": [
            45.0,
            189.0,
            560.2756,
            435.0
          ],
          "width": 1031,
          "height": 492,
          "sha256": "5d8545d8f2e6461a5c330b7d4f5430fe5f62f12c7c977eb533a3820222dd87a7"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "be69dfa811de1a6fe359c1794e25d670dad0f6f381959f4a37dc9a4d2e012d42",
      "method": "Read the original local QP/MS pages and verified paper identities, selected parts, marks and required shared context. Rendered unchanged original extracts at 144 dpi. Checked all crop boundaries against original glyph boxes and visually reviewed every final PNG. Recorded PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E6I03",
    "year": 2025,
    "series": "Oct/Nov",
    "component": 12,
    "parts": [
      {
        "part": "6(c)(i)",
        "marks": 1
      },
      {
        "part": "6(c)(ii)",
        "marks": 1
      }
    ],
    "marks": 2,
    "title": "Calculate a parity bit and locate one altered bit",
    "commandWord": "Complete / Circle",
    "objectiveIds": [
      "S6.08.A03"
    ],
    "syllabusMapping": [
      "S6.08"
    ],
    "reading": [
      "The supplied rule is even parity, with the rightmost bit reserved for parity. In the block question, the paper explicitly states that one data bit has changed."
    ],
    "solution": [
      "6(c)(i): The seven data bits 0101110 contain four 1s, so the missing parity bit is 0. The completed byte is 01011100.",
      "6(c)(ii): Row 2 has odd parity, and column 5 from the left has odd parity when the received parity byte is included. Circle the 0 at row 2, column 5. Under the stated single-bit-error condition, changing it to 1 restores even parity."
    ],
    "marking": [
      "One mark is awarded for the correct parity bit and one for circling the altered bit. The original marked matrix is preserved in the official scheme."
    ],
    "mistakes": [
      "Count the received parity byte in the column checks. Identify the bit in the data grid, not a new parity bit calculated from already corrupted data. Correction reasoning relies on the stated single-bit error."
    ],
    "assessmentFocus": [
      "Compute an even parity bit and locate one data error using row and column parity."
    ],
    "coverageNotes": [
      "Multi-bit detection limits are taught separately and are not awarded marks in these two parts."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/12 · October/November 2025 · 6(c)(i), 6(c)(ii)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          9,
          61,
          367
        ]
      ],
      "qp": [
        [
          11,
          60,
          465
        ]
      ]
    },
    "qp": {
      "filename": "9618_w25_qp_12.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_12.pdf",
      "sha256": "ea65e75a4182f991cb2117827ee5c6734365b2c5e78686c6d6ef1e00d48fe65b",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6i03-qp-1.png",
          "page": 11,
          "bbox": [
            45.0,
            60.0,
            560.2756,
            465.0
          ],
          "width": 1031,
          "height": 810,
          "sha256": "90f93c2226cc9898b493c524fcd44facd621ca66580db8d1947189d22abdf16b"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_12.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_12.pdf",
      "sha256": "4fd455f74ae4abf71a8796095c912a06c77239d6d5a6679ce05ceff1032e7dd8",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6i03-ms-1.png",
          "page": 9,
          "bbox": [
            45.0,
            61.0,
            560.2756,
            367.0
          ],
          "width": 1031,
          "height": 612,
          "sha256": "44c253ec42f039e412769bd3739f6bb4c56884c485ad98414c2c435fb6d4a5c1"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "6052b8efd515426ccf8a61f613fd3df7eb53ae750a59eae4a0b02a1a28bd607d",
      "method": "Read the original local QP/MS pages and verified paper identities, selected parts, marks and required shared context. Rendered unchanged original extracts at 144 dpi. Checked all crop boundaries against original glyph boxes and visually reviewed every final PNG. Recorded PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E6I04",
    "year": 2025,
    "series": "May/June",
    "component": 11,
    "parts": [
      {
        "part": "7(c)",
        "marks": 3
      }
    ],
    "marks": 3,
    "title": "Explain a sender-to-receiver checksum check",
    "commandWord": "Explain",
    "objectiveIds": [
      "S6.08.A04"
    ],
    "syllabusMapping": [
      "S6.08"
    ],
    "reading": [
      "Explain how the sender and receiver use the same checksum algorithm. No particular arithmetic algorithm or numerical data is supplied in this question."
    ],
    "solution": [
      "The sender applies an agreed algorithm to the data to produce a checksum and sends the checksum with the data.",
      "The receiver applies the same algorithm to the received data and compares its result with the checksum that was sent. A mismatch indicates a detected transmission error; a match passes this checksum check."
    ],
    "marking": [
      "The official scheme awards one mark per listed point, up to three, covering calculation, sending, recalculation and matching. The phrase verified refers to passing this check."
    ],
    "mistakes": [
      "The receiver must compare with the transmitted checksum, not replace it with a newly generated value. Matching checksums do not prove that all possible errors were absent. Do not invent a required modulo rule when none is supplied."
    ],
    "assessmentFocus": [
      "Describe checksum generation, transmission, recalculation and comparison."
    ],
    "coverageNotes": [
      "This is a process-description question; it does not assess numerical checksum calculation or collision analysis."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · May/June 2025 · 7(c)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          11,
          372,
          463
        ]
      ],
      "qp": [
        [
          12,
          60,
          106
        ],
        [
          13,
          60,
          264
        ]
      ]
    },
    "qp": {
      "filename": "9618_s25_qp_11.pdf",
      "sourcePdf": "2025-May-June/9618_s25_qp_11.pdf",
      "sha256": "bdf74d4f15c620bde7e6fe65f17828bc85c89490ebb9a1a337e2cd0596f4b39a",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6i04-qp-1.png",
          "page": 12,
          "bbox": [
            45.0,
            60.0,
            560.2756,
            106.0
          ],
          "width": 1031,
          "height": 92,
          "sha256": "5f8c56a2b88e0da8ccc844b8cc178d90d46c31e54793ee14f0cfeda0bb3694dc"
        },
        {
          "asset": "/assets/past-paper-questions/s6-e6i04-qp-2.png",
          "page": 13,
          "bbox": [
            45.0,
            60.0,
            560.2756,
            264.0
          ],
          "width": 1031,
          "height": 408,
          "sha256": "d681c54711544ced1de311fd4f7fde9a28696a1498c4dc8d8defec4b480d2d3a"
        }
      ]
    },
    "ms": {
      "filename": "9618_s25_ms_11.pdf",
      "sourcePdf": "2025-May-June/9618_s25_ms_11.pdf",
      "sha256": "8bf543ddd26e74224f40fd909152e300b9b711eb3644d7e8d07c1d5c3f07521b",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s6-e6i04-ms-1.png",
          "page": 11,
          "bbox": [
            45.0,
            372.0,
            560.2756,
            463.0
          ],
          "width": 1031,
          "height": 182,
          "sha256": "0c61ecec793202327ea89f39ef0dae0a40b8c477b3dae61e1c146a7325224d79"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "f5c49f22e3af8f15a83cdfcec6fa6962325091eb3c92bc13ff77bb3cff6d7707",
      "method": "Read the original local QP/MS pages and verified paper identities, selected parts, marks and required shared context. Rendered unchanged original extracts at 144 dpi. Checked all crop boundaries against original glyph boxes and visually reviewed every final PNG. Recorded PDF, crop-specification and PNG SHA-256 hashes."
    }
  }
];
for (const question of section6ExtraPapers) {
  if (question.extractReview.status !== 'verified' || digest(JSON.stringify(question.cropSpec)) !== question.extractReview.cropSpecSha256) throw new Error(`Unreviewed Section 6 source: ${question.id}`);
  if (question.parts.reduce((total, part) => total + part.marks, 0) !== question.marks) throw new Error(`Inconsistent Section 6 marks: ${question.id}`);
  for (const kind of ['qp', 'ms']) {
    const extracts = question[kind].extracts;
    if (extracts.length !== question.cropSpec[kind].length) throw new Error(`Missing Section 6 extract: ${question.id} ${kind}`);
    extracts.forEach((extract, index) => {
      const [page, top, bottom] = question.cropSpec[kind][index];
      if (extract.page !== page || extract.bbox[1] !== top || extract.bbox[3] !== bottom) throw new Error(`Changed Section 6 crop: ${question.id} ${kind}`);
      const bytes = readFileSync(new URL('../web' + extract.asset, import.meta.url));
      if (digest(bytes) !== extract.sha256) throw new Error(`Changed Section 6 image: ${extract.asset}`);
      if (bytes.readUInt32BE(16) !== extract.width || bytes.readUInt32BE(20) !== extract.height) throw new Error(`Changed Section 6 image dimensions: ${extract.asset}`);
    });
  }
}
