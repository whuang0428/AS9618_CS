// Original Section 5 questions selected for the beginner teaching sequence.
// Source PDFs stay in /Users/kw/Documents/Teaching/AS CS 9618/past-papers.
// sourcePdf is relative to that read-only archive; only reviewed extracts are published.
// E5D02 deliberately reviews file management before applying back-up software.
// Placement and any cumulative objective mapping are owned by the Section 5 journey.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const digest = value => createHash('sha256').update(value).digest('hex');
export const section5ExtraPapers = [
  {
    "id": "E5D01",
    "year": 2025,
    "series": "Oct/Nov",
    "component": 11,
    "parts": [
      {
        "part": "5(a)(i)",
        "marks": 2
      },
      {
        "part": "5(a)(ii)",
        "marks": 2
      }
    ],
    "marks": 4,
    "title": "Separate hardware management from security management",
    "commandWord": "State",
    "objectiveIds": [
      "S5.01.A04",
      "S5.01.A05"
    ],
    "syllabusMapping": [
      "S5.01"
    ],
    "reading": [
      "Give two different tasks for each management area. Hardware management concerns communication with devices. Security management concerns who can use resources and what they may do."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Part",
          "Two suitable tasks"
        ],
        "rows": [
          [
            "5(a)(i): hardware management",
            "Installs driver software for connected peripheral devices; manages communication between devices."
          ],
          [
            "5(a)(ii): security management",
            "Authenticates users to prevent unauthorised access; implements access rights and permissions."
          ]
        ]
      }
    ],
    "marking": [
      "The official scheme awards one mark per correct task, up to two for hardware management and two for security management. The model provides two distinct tasks in each category. Other listed answers, such as hardware interrupt management or security auditing, are also creditworthy."
    ],
    "mistakes": [
      "A device driver enables communication with a device; it does not decide a user’s file permissions. Giving four hardware tasks cannot earn the two marks allocated to security management."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2025 · 5(a)(i), 5(a)(ii)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          8,
          65,
          284
        ]
      ],
      "qp": [
        [
          10,
          59,
          378
        ]
      ]
    },
    "qp": {
      "filename": "9618_w25_qp_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_11.pdf",
      "sha256": "2fe1691a0eff789ac686121aac0ae4e7cb3852f9bd321a6542dc6b82fbedf616",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d01-qp-1.png",
          "page": 10,
          "bbox": [
            45,
            59,
            560.27559,
            378
          ],
          "width": 1030,
          "height": 638,
          "sha256": "3f3d1cd84f6bd8b0f27144d67056f049b0a1417534679f0827182d05156f9d89"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_11.pdf",
      "sha256": "64b2928b1348598cd0be2cda8014405264f0a4303b73665633e4e297217056f4",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d01-ms-1.png",
          "page": 8,
          "bbox": [
            45,
            65,
            560.2,
            284
          ],
          "width": 1030,
          "height": 438,
          "sha256": "740b8eeb1988ec23b9e91634f68a18b989b591ef85fb4f25a324c04b6bad93f7"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "1cea82e6bc39dc5db71af742a1dc2975b15e9dc4d025badc73273e29a2ef76d3",
      "reviewer": "Codex",
      "method": "Read the local original QP/MS text and checked identities, context, selected parts and marks. Rendered at 144 dpi, checked readable glyph boundaries and visually inspected every final crop. Recorded original PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E5D02",
    "year": 2024,
    "series": "Oct/Nov",
    "component": 11,
    "parts": [
      {
        "part": "4(a)(i)",
        "marks": 2
      },
      {
        "part": "4(a)(ii)",
        "marks": 2
      }
    ],
    "marks": 4,
    "title": "Manage a saved file and protect a recoverable copy",
    "commandWord": "Describe / Explain",
    "objectiveIds": [
      "S5.01.A03",
      "S5.02.A06"
    ],
    "syllabusMapping": [
      "S5.01",
      "S5.02"
    ],
    "reading": [
      "First describe what the OS does to organise files. Then explain why back-up software is needed. Recall file management from the previous lesson before answering the back-up part."
    ],
    "solution": [
      "4(a)(i): The OS maintains a directory structure so files can be organised and located. It allocates secondary-storage space to individual files.",
      "4(a)(ii): Back-up software automatically makes regular duplicate copies of data. A saved copy can be restored if the working data is lost."
    ],
    "marking": [
      "The two parts each have a two-mark maximum. File management earns credit for distinct tasks. The back-up explanation links making a copy to restoring lost data; automatic or regular copying is also accepted by the scheme."
    ],
    "mistakes": [
      "Saving the current file is different from keeping an additional recoverable copy. A second copy on a failed physical device may be lost with the original; the original answer should still explain copying and restoration."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2024 · 4(a)(i), 4(a)(ii)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          7,
          65,
          374
        ]
      ],
      "qp": [
        [
          9,
          59,
          365
        ]
      ]
    },
    "qp": {
      "filename": "9618_w24_qp_11.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_qp_11.pdf",
      "sha256": "94d1aed5bc14f0a3fd60da0e932cf5b8b40bd8342550ff0254c19afe89001ef7",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d02-qp-1.png",
          "page": 9,
          "bbox": [
            45,
            59,
            560.2756,
            365
          ],
          "width": 1030,
          "height": 612,
          "sha256": "63028d26ff29c3cd3fe661cc228207e0fd40cc325ab21177d9b1bd9ab88933b7"
        }
      ]
    },
    "ms": {
      "filename": "9618_w24_ms_11.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_ms_11.pdf",
      "sha256": "e9674e802b5b850509834b1ab1b84008740729d668ae844e9b0142607dbdf1a2",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d02-ms-1.png",
          "page": 7,
          "bbox": [
            45,
            65,
            560.32,
            374
          ],
          "width": 1030,
          "height": 618,
          "sha256": "2e74f9fe320b11d7f81387f0a75f0995036174521432e551201316b71f22c941"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "d2ebe020ea0dcf1d1f15c5b0e6485d9f62c2b963862bbfb57ade2f07005a303a",
      "reviewer": "Codex",
      "method": "Read the local original QP/MS text and checked identities, context, selected parts and marks. Rendered at 144 dpi, checked readable glyph boundaries and visually inspected every final crop. Recorded original PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E5D03",
    "year": 2023,
    "series": "Oct/Nov",
    "component": 13,
    "parts": [
      {
        "part": "5(b)(i)",
        "marks": 2
      },
      {
        "part": "5(b)(ii)",
        "marks": 3
      }
    ],
    "marks": 5,
    "title": "Prepare program files for download and a disk for storage",
    "commandWord": "Explain / Describe",
    "objectiveIds": [
      "S5.02.A01",
      "S5.02.A05"
    ],
    "syllabusMapping": [
      "S5.02"
    ],
    "reading": [
      "Both source-code files and library files are being downloaded. Treat them as files whose contents must be preserved. Explain why compression helps the transfer, then explain how formatting prepares a new disk for use. No knowledge of the omitted IDE question is needed."
    ],
    "solution": [
      "5(b)(i): Compressing the files reduces the amount of data transferred, so the download takes less time on the same connection. The compressed files also use less storage space on the server or the user’s device.",
      "5(b)(ii): A formatter prepares the disk for initial use by creating a file system and setting up its allocation records, such as a file allocation table. A full format can also check the disk for errors."
    ],
    "marking": [
      "Compression has a two-mark maximum: reduced transfer time and reduced storage space are the two listed reasons. Formatting has a three-mark maximum; the scheme accepts preparation for initial use, checking for errors, creating the file system and setting up the file allocation table. The model includes these alternatives; it cannot earn more than three marks.",
      "A file allocation table is one example of allocation records. Different file systems use different structures, and a quick format may omit a full surface check."
    ],
    "mistakes": [
      "Defragmentation rearranges an existing file’s blocks; formatting creates the structures needed to use a disk. For program files, use lossless compression so the original code can be restored exactly."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/13 · October/November 2023 · 5(b)(i), 5(b)(ii)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          6,
          218,
          398
        ]
      ],
      "qp": [
        [
          8,
          60,
          95
        ],
        [
          8,
          371,
          747
        ]
      ]
    },
    "qp": {
      "filename": "9618_w23_qp_13.pdf",
      "sourcePdf": "2023-Oct-Nov/9618_w23_qp_13.pdf",
      "sha256": "90c2b773f5d16f13ca83a637ca047c2afa31a7a7dad0664fe8522616a9ab3a4e",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d03-qp-1.png",
          "page": 8,
          "bbox": [
            45,
            60,
            560.276,
            95
          ],
          "width": 1030,
          "height": 70,
          "sha256": "af80002d90775194f5e77a1fcd867afebbc0b35484d8a49c15009b5d4104ef57"
        },
        {
          "asset": "/assets/past-paper-questions/s5-e5d03-qp-2.png",
          "page": 8,
          "bbox": [
            45,
            371,
            560.276,
            747
          ],
          "width": 1030,
          "height": 752,
          "sha256": "8083db4b8a881f8df023f93929ff6d90928aad88ed56ecb01d5b086a7fa83600"
        }
      ]
    },
    "ms": {
      "filename": "9618_w23_ms_13.pdf",
      "sourcePdf": "2023-Oct-Nov/9618_w23_ms_13.pdf",
      "sha256": "c658537dc541755e6829581b37db83a5f9ae4958d765a885732383b5015d12f6",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d03-ms-1.png",
          "page": 6,
          "bbox": [
            45,
            218,
            560.32,
            398
          ],
          "width": 1030,
          "height": 360,
          "sha256": "a0d82f19e2b1f12896e702c12714a39ae7d15ec96a4e9cdd93d7d249b2dd7b32"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "db774b8a5f7e2120b5966a4abf3e6fc69485825130e32fbb95f3f16461a88a04",
      "reviewer": "Codex",
      "method": "Read the local original QP/MS text and checked identities, context, selected parts and marks. Rendered at 144 dpi, checked readable glyph boundaries and visually inspected every final crop. Recorded original PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E5D04",
    "year": 2025,
    "series": "May/June",
    "component": 13,
    "parts": [
      {
        "part": "3(a)",
        "marks": 4
      }
    ],
    "marks": 4,
    "title": "Distinguish the output and execution of two translators",
    "commandWord": "Complete",
    "objectiveIds": [
      "S5.04.A02",
      "S5.04.A03"
    ],
    "syllabusMapping": [
      "S5.04"
    ],
    "reading": [
      "Follow the description supplied in the question. The first two gaps ask what compilation produces and what the resulting file can run without. The last two gaps concern the interpreter’s response to a detected error."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Gap, in order",
          "Accepted completion",
          "Meaning"
        ],
        "rows": [
          [
            "1",
            "an executable file / .exe",
            "The native compiled output can be run as a separate file."
          ],
          [
            "2",
            "source code / program code",
            "The executable contains the translated instructions, so this source file is not required for each run."
          ],
          [
            "3",
            "stops",
            "Execution stops at the detected error in the model described."
          ],
          [
            "4",
            "immediately / in real time",
            "The developer can correct the error promptly in the interactive model described."
          ]
        ]
      }
    ],
    "marking": [
      "One mark is awarded for each correctly completed term, up to four. Use words that fit both the supplied sentence and the translator’s role.",
      "The question uses a simplified compiler/interpreter model. Resuming at the same point after editing depends on the actual interpreter and environment. Successful compilation does not establish that a program is free of logical or run-time errors."
    ],
    "mistakes": [
      "An assembler translates assembly-language source, so it does not fill the gap asking for a compiler’s output. Do not infer that all compiled programs use the .exe filename extension or that every interpreter can resume after any edit."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/13 · May/June 2025 · 3(a)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          6,
          65,
          318
        ]
      ],
      "qp": [
        [
          6,
          59,
          327
        ]
      ]
    },
    "qp": {
      "filename": "9618_s25_qp_13.pdf",
      "sourcePdf": "2025-May-June/9618_s25_qp_13.pdf",
      "sha256": "b341d6829ba4baf47dbd8d272cb7fd49b448d04a2a16a028e4fb3178c3c64554",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d04-qp-1.png",
          "page": 6,
          "bbox": [
            45,
            59,
            560.27559,
            327
          ],
          "width": 1030,
          "height": 536,
          "sha256": "e8fe38615d558b36a03ab4747328fbc70be3843b7926a73ec1bb3c8b9faeff5f"
        }
      ]
    },
    "ms": {
      "filename": "9618_s25_ms_13.pdf",
      "sourcePdf": "2025-May-June/9618_s25_ms_13.pdf",
      "sha256": "a334bec016c753451ae53c56fdfc0b0758b8f2b5a7a06a86307ac100bb7ebd8e",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d04-ms-1.png",
          "page": 6,
          "bbox": [
            45,
            65,
            560.32,
            318
          ],
          "width": 1030,
          "height": 506,
          "sha256": "43c86ddf344e9616d0db2a3fdb42999402f76d8e3e70101a3dc983b8e4b3acf7"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "963e20dc627954763e3f2cfb267c4eb1c941fadf6ce56a86ccf78f0398ee7fa4",
      "reviewer": "Codex",
      "method": "Read the local original QP/MS text and checked identities, context, selected parts and marks. Rendered at 144 dpi, checked readable glyph boundaries and visually inspected every final crop. Recorded original PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E5D05",
    "year": 2023,
    "series": "Oct/Nov",
    "component": 11,
    "parts": [
      {
        "part": "6(b)",
        "marks": 1
      }
    ],
    "marks": 1,
    "title": "Explain why a language can combine compilation and interpretation",
    "commandWord": "State",
    "objectiveIds": [
      "S5.06.A01"
    ],
    "syllabusMapping": [
      "S5.06"
    ],
    "reading": [
      "Give one reason for combining the two stages. Use the Java source-to-bytecode-to-JVM example to explain portability."
    ],
    "solution": [
      "The partially compiled program can run on different platforms because each platform’s compatible runtime interprets the intermediate code.",
      "For Java, the same bytecode can be executed by compatible JVM implementations on different platforms. Each host needs a suitable JVM; the bytecode is not the native machine code of every processor."
    ],
    "marking": [
      "This part has a one-mark maximum. Portability through interpretation on the target platform is one accepted reason. The additional Java explanation makes the mechanism clear; it does not earn an extra mark."
    ],
    "mistakes": [
      "“It runs on any computer” leaves out the required compatible runtime. Changing the source also requires rebuilding the bytecode before the new version can run."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2023 · 6(b)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          8,
          494,
          584
        ]
      ],
      "qp": [
        [
          11,
          60,
          96
        ],
        [
          11,
          371,
          448
        ]
      ]
    },
    "qp": {
      "filename": "9618_w23_qp_11.pdf",
      "sourcePdf": "2023-Oct-Nov/9618_w23_qp_11.pdf",
      "sha256": "0aca70a2e79414c1683c81120a9cd3144c4a5b9ad7f411cd95fcd7089d702e69",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d05-qp-1.png",
          "page": 11,
          "bbox": [
            45,
            60,
            560.276,
            96
          ],
          "width": 1030,
          "height": 72,
          "sha256": "6386c38b920ecc35201c467ca7358d85b1464ebd888d57f8ea0b679e0d8ca48c"
        },
        {
          "asset": "/assets/past-paper-questions/s5-e5d05-qp-2.png",
          "page": 11,
          "bbox": [
            45,
            371,
            560.276,
            448
          ],
          "width": 1030,
          "height": 154,
          "sha256": "36d937e228abef969237b390e1b135d2c772e69d93c143a46136ebb386f69563"
        }
      ]
    },
    "ms": {
      "filename": "9618_w23_ms_11.pdf",
      "sourcePdf": "2023-Oct-Nov/9618_w23_ms_11.pdf",
      "sha256": "7d42b9e1b7ad513fa40cc2b5ba566b8f3dd4cdded6c0cd661e13f5388aa21348",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d05-ms-1.png",
          "page": 8,
          "bbox": [
            45,
            494,
            560.32,
            584
          ],
          "width": 1030,
          "height": 180,
          "sha256": "8e1a68c880f57ff4e54328c5c75ab2994bede0d5229920987662f25a706762d2"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "65d2d73388c00d0222b2a6dc3aad81da74a02349b8a45e5ca637a30abcb0d715",
      "reviewer": "Codex",
      "method": "Read the local original QP/MS text and checked identities, context, selected parts and marks. Rendered at 144 dpi, checked readable glyph boundaries and visually inspected every final crop. Recorded original PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E5D06",
    "year": 2024,
    "series": "Oct/Nov",
    "component": 11,
    "parts": [
      {
        "part": "4(d)(i)",
        "marks": 2
      }
    ],
    "marks": 2,
    "title": "Describe a presentation feature other than prettyprint",
    "commandWord": "Identify / Describe",
    "objectiveIds": [
      "S5.07.A04"
    ],
    "syllabusMapping": [
      "S5.07"
    ],
    "reading": [
      "Prettyprint is already supplied and is excluded as your chosen answer. Name a different presentation feature and describe what the programmer sees."
    ],
    "solution": [
      "Feature: expand/collapse code blocks.",
      "Description: a programmer can collapse the statements within a block to see the overall program structure, then expand that block to see its contents again."
    ],
    "marking": [
      "One mark is for the feature name and one for the matching description. The scheme also accepts auto-indentation or auto-formatting with a description of how it makes the structure clear."
    ],
    "mistakes": [
      "Collapsing a block changes what the editor displays. It does not delete the statements, skip them during execution or correct an error in them."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2024 · 4(d)(i)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "cropSpec": {
      "ms": [
        [
          8,
          65,
          217
        ]
      ],
      "qp": [
        [
          9,
          59,
          79
        ],
        [
          10,
          263,
          457
        ]
      ]
    },
    "qp": {
      "filename": "9618_w24_qp_11.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_qp_11.pdf",
      "sha256": "94d1aed5bc14f0a3fd60da0e932cf5b8b40bd8342550ff0254c19afe89001ef7",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d06-qp-1.png",
          "page": 9,
          "bbox": [
            45,
            59,
            560.2756,
            79
          ],
          "width": 1030,
          "height": 40,
          "sha256": "59197e3bc620d676ec29bc1facdb428bd9e632e3ec304fb267b8a8fca861cf0e"
        },
        {
          "asset": "/assets/past-paper-questions/s5-e5d06-qp-2.png",
          "page": 10,
          "bbox": [
            45,
            263,
            560.2756,
            457
          ],
          "width": 1030,
          "height": 388,
          "sha256": "1e7d360f6989c941fecd80cb24182e273749c3c3eb3483f59733b58f1766154c"
        }
      ]
    },
    "ms": {
      "filename": "9618_w24_ms_11.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_ms_11.pdf",
      "sha256": "e9674e802b5b850509834b1ab1b84008740729d668ae844e9b0142607dbdf1a2",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s5-e5d06-ms-1.png",
          "page": 8,
          "bbox": [
            45,
            65,
            560.32,
            217
          ],
          "width": 1030,
          "height": 304,
          "sha256": "5d3074e21c2865f6dcdb5efa76dd3c4e21a101748a341963257cb5f5265f4767"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "cf43c41b26e9738d93a0fdaca36756210c30d820be791497e131bc329b9465cb",
      "reviewer": "Codex",
      "method": "Read the local original QP/MS text and checked identities, context, selected parts and marks. Rendered at 144 dpi, checked readable glyph boundaries and visually inspected every final crop. Recorded original PDF, crop-specification and PNG SHA-256 hashes."
    }
  }
];
for (const question of section5ExtraPapers) {
  if (question.extractReview.status !== 'verified' || digest(JSON.stringify(question.cropSpec)) !== question.extractReview.cropSpecSha256) throw new Error(`Unreviewed Section 5 source: ${question.id}`);
  if (question.parts.reduce((total, part) => total + part.marks, 0) !== question.marks) throw new Error(`Inconsistent Section 5 marks: ${question.id}`);
  for (const kind of ['qp', 'ms']) {
    const extracts = question[kind].extracts;
    if (extracts.length !== question.cropSpec[kind].length) throw new Error(`Missing Section 5 extract: ${question.id} ${kind}`);
    extracts.forEach((extract, index) => {
      const [page, top, bottom] = question.cropSpec[kind][index];
      if (extract.page !== page || extract.bbox[1] !== top || extract.bbox[3] !== bottom) throw new Error(`Changed Section 5 crop: ${question.id} ${kind}`);
      const bytes = readFileSync(new URL('../web' + extract.asset, import.meta.url));
      if (digest(bytes) !== extract.sha256) throw new Error(`Changed Section 5 image: ${extract.asset}`);
      if (bytes.readUInt32BE(16) !== extract.width || bytes.readUInt32BE(20) !== extract.height) throw new Error(`Changed Section 5 image dimensions: ${extract.asset}`);
    });
  }
}
