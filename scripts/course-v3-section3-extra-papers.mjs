// Additional original questions for the Section 3 beginner teaching sequence.
// qp.sourcePdf and ms.sourcePdf are relative to the teacher-owned source root:
// /Users/kw/Documents/Teaching/AS CS 9618/past-papers
// Source PDFs are read-only and are not copied into the public repository.
// E3D01 selects 10(a) only: both crops exclude the unassigned buffer question 10(b).
// E3D03 must follow teaching of BOTH optical storage and buffers.
// E3D02 retains the supplied computer-specification context but assigns 6(a)(i) only.
// cropSpecSha256 uses JSON.stringify({ms:[[page,top,bottom]],qp:[[page,top,bottom]]}).
// Exact QP/MS source hashes and final PNG hashes are recorded below.
// No lesson number is assigned here; placement is owned by the Section 3 sequence.

export const section3ExtraPapers = [
  {
    "id": "E3D01",
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "year": 2025,
    "series": "Oct/Nov",
    "component": 11,
    "parts": [
      {
        "part": "10(a)",
        "marks": 3
      }
    ],
    "syllabusMapping": [
      "S3.03"
    ],
    "objectiveIds": [
      "S3.03.A02"
    ],
    "title": "Build a physical model from a digital design",
    "commandWord": "Explain",
    "reading": [
      "The architect needs a physical model. Follow the process from the digital design to the finished object. This question asks about 3D printing."
    ],
    "solution": [
      "The printer uses a digital 3D model created with modelling or Computer Aided Design (CAD) software. It builds the physical model by adding material one layer at a time. It repeats the process for successive layers until the model is complete.",
      "For example, in fused deposition modelling, heated material passes through a nozzle. The deposited material forms each new layer and joins the layers below."
    ],
    "marking": [
      "The question has a maximum of three marks. The official scheme accepts distinct generic points, such as the digital model and building successive layers. Process-specific points have a separate maximum of one mark; several details about one printing method do not bypass that limit."
    ],
    "mistakes": [
      "A 3D printer produces a physical object, not a picture of the object on paper. Explain how successive layers form its height. Do not claim that a single layer completes the building model."
    ],
    "marks": 3,
    "originalReview": "2026-09-29; Section 3 beginner-course source review",
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "reviewer": "Codex",
      "cropSpecSha256": "99fc1a96f4de90664d21755900d96395533fac53b7606846c091e986e7b595e7",
      "method": "Read the selected QP and MS parts from the original PDFs; checked the source identity and marks; checked visible PDF glyph boundaries; rendered each crop at 2x, inspected every final PNG and recorded SHA-256 hashes. Required context is retained and unassigned following questions are excluded."
    },
    "qp": {
      "filename": "9618_w25_qp_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_11.pdf",
      "sha256": "2fe1691a0eff789ac686121aac0ae4e7cb3852f9bd321a6542dc6b82fbedf616",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s3-e3d01-qp-1.png",
          "page": 15,
          "bbox": [
            45,
            250,
            560.27559,
            452
          ],
          "width": 1030,
          "height": 404,
          "sha256": "adc020608c57356faeac00be25ffee4d60af39b3b60abc545c41223a34e0b332"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_11.pdf",
      "sha256": "64b2928b1348598cd0be2cda8014405264f0a4303b73665633e4e297217056f4",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s3-e3d01-ms-1.png",
          "page": 15,
          "bbox": [
            45,
            65,
            560.2,
            424
          ],
          "width": 1030,
          "height": 718,
          "sha256": "84dfa4d29feed79178728ff3f89793303502e03a44c63b7921fa7d62feda5e5b"
        }
      ]
    },
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2025 · 10(a)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/"
  },
  {
    "id": "E3D02",
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "year": 2025,
    "series": "May/June",
    "component": 11,
    "parts": [
      {
        "part": "6(a)(i)",
        "marks": 4
      }
    ],
    "syllabusMapping": [
      "S3.03"
    ],
    "objectiveIds": [
      "S3.03.A05"
    ],
    "title": "Identify the parts that store and read a magnetic pattern",
    "commandWord": "Complete",
    "reading": [
      "Read the whole sentence around each blank. Distinguish the recording surface, the part that rotates it, the reading device and the physical quantity detected. The computer specifications provide context; only part 6(a)(i) is assigned."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Blank, in order",
          "Answer",
          "Role"
        ],
        "rows": [
          [
            "1",
            "platters",
            "Provide surfaces on which magnetic patterns are stored."
          ],
          [
            "2",
            "spindle",
            "Rotates the platters."
          ],
          [
            "3",
            "read/write head",
            "Moves across the surface on an arm to access the stored data."
          ],
          [
            "4",
            "magnetic field",
            "Changes in the recorded magnetic pattern produce a changing electrical response when read."
          ]
        ]
      },
      "The arm positions the head over the required track. Rotation then brings the relevant sector beneath the head. The recorded pattern can be sensed without scraping the platter."
    ],
    "marking": [
      "Each correctly completed blank earns one mark. The four expected terms are platters, spindle, read/write head and magnetic field. Track and sector describe locations; neither replaces a component requested in these blanks."
    ],
    "mistakes": [
      "Do not interchange the spindle and the arm. The spindle rotates the platters; the arm positions the head. Do not describe the head as physically touching or scratching the data surface."
    ],
    "marks": 4,
    "originalReview": "2026-09-29; Section 3 beginner-course source review",
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "reviewer": "Codex",
      "cropSpecSha256": "7468e84f6e0e957fceaa5f5c49cda56554f60e6027591e26c458c6682b87c3ba",
      "method": "Read the selected QP and MS parts from the original PDFs; checked the source identity and marks; checked visible PDF glyph boundaries; rendered each crop at 2x, inspected every final PNG and recorded SHA-256 hashes. Required context is retained and unassigned following questions are excluded."
    },
    "qp": {
      "filename": "9618_s25_qp_11.pdf",
      "sourcePdf": "2025-May-June/9618_s25_qp_11.pdf",
      "sha256": "bdf74d4f15c620bde7e6fe65f17828bc85c89490ebb9a1a337e2cd0596f4b39a",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s3-e3d02-qp-1.png",
          "page": 10,
          "bbox": [
            45,
            60,
            560.27559,
            485
          ],
          "width": 1030,
          "height": 850,
          "sha256": "02fa236a1fae0d4dc255cfc1af408bebef5a05dd9c4b9003d295c911750255c7"
        }
      ]
    },
    "ms": {
      "filename": "9618_s25_ms_11.pdf",
      "sourcePdf": "2025-May-June/9618_s25_ms_11.pdf",
      "sha256": "8bf543ddd26e74224f40fd909152e300b9b711eb3644d7e8d07c1d5c3f07521b",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s3-e3d02-ms-1.png",
          "page": 10,
          "bbox": [
            45,
            65,
            560.32,
            270
          ],
          "width": 1030,
          "height": 410,
          "sha256": "53ff372d6f03a65f841e0d56af31fe60f533093d72f9207a3a397dcdc2dde3b0"
        }
      ]
    },
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · May/June 2025 · 6(a)(i)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/"
  },
  {
    "id": "E3D03",
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "year": 2024,
    "series": "Oct/Nov",
    "component": 11,
    "parts": [
      {
        "part": "3(d)(i)",
        "marks": 4
      },
      {
        "part": "3(d)(ii)",
        "marks": 3
      }
    ],
    "syllabusMapping": [
      "S3.03",
      "S3.04"
    ],
    "objectiveIds": [
      "S3.03.A07",
      "S3.04.A01"
    ],
    "title": "Read optical data and explain the transfer buffer",
    "commandWord": "Describe / Explain",
    "reading": [
      "Part (i) concerns the optical device. Part (ii) concerns data waiting in memory during transfer. Keep the reading and writing process separate from the reason for the buffer."
    ],
    "solution": [
      "3(d)(i): The disc rotates. An optical head positions a laser over its spiral track. During reading, a detector measures variations in the reflected light. The circuitry interprets the resulting signal to recover binary data. During recording, the write laser changes selected parts of the recording layer so that they can be distinguished when read later.",
      "3(d)(ii): The computer and the optical drive transfer data at different rates. The buffer temporarily holds data from the computer. The drive removes the waiting data at the slower rate that it can accept. This reduces the time the computer spends waiting for the drive, so it can perform other work.",
      "On a pressed disc, pits and lands form the reading pattern. A recordable disc instead uses laser-induced changes in its recording layer. Both provide optical differences for later reading."
    ],
    "marking": [
      "Part (i) awards up to four marks for distinct points about rotation, laser positioning, the spiral track and the optical reading or writing process. The official scheme uses the simplified phrase \"burns pits\" for recording. Distinguish the physical recording medium when explaining that phrase.",
      "Part (ii) awards up to three marks. Link the different transfer rates to temporary storage and to the computer or drive being able to work at its own rate. A finite buffer can eventually fill; it does not increase the drive's sustained write speed."
    ],
    "mistakes": [
      "A buffer is temporary memory; it is not an extra track on the optical disc. Do not claim that every pit is one bit or that the buffer makes the physical recording mechanism faster."
    ],
    "marks": 7,
    "originalReview": "2026-09-29; Section 3 beginner-course source review",
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "reviewer": "Codex",
      "cropSpecSha256": "2ef52e1a63c6975fdfdf7c52e84859815dfb01d13bf9d913de9b75a6421b0452",
      "method": "Read the selected QP and MS parts from the original PDFs; checked the source identity and marks; checked visible PDF glyph boundaries; rendered each crop at 2x, inspected every final PNG and recorded SHA-256 hashes. Required context is retained and unassigned following questions are excluded."
    },
    "qp": {
      "filename": "9618_w24_qp_11.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_qp_11.pdf",
      "sha256": "94d1aed5bc14f0a3fd60da0e932cf5b8b40bd8342550ff0254c19afe89001ef7",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s3-e3d03-qp-1.png",
          "page": 8,
          "bbox": [
            45,
            212,
            560.2756,
            690
          ],
          "width": 1030,
          "height": 956,
          "sha256": "277b18b716e7890dd5f2fc0b23199a9d082ef83ce78525e09235e15190b58fa7"
        }
      ]
    },
    "ms": {
      "filename": "9618_w24_ms_11.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_ms_11.pdf",
      "sha256": "e9674e802b5b850509834b1ab1b84008740729d668ae844e9b0142607dbdf1a2",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s3-e3d03-ms-1.png",
          "page": 6,
          "bbox": [
            45,
            307,
            560.32,
            606
          ],
          "width": 1030,
          "height": 598,
          "sha256": "d0ef8e7f5bb07a5dfe6e70e8b466356bafa4a03e3a05c85a2234418d2d26e25c"
        }
      ]
    },
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2024 · 3(d)(i), 3(d)(ii)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/"
  },
  {
    "id": "E3D04",
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "year": 2025,
    "series": "Oct/Nov",
    "component": 13,
    "parts": [
      {
        "part": "4(c)",
        "marks": 3
      }
    ],
    "syllabusMapping": [
      "S3.07"
    ],
    "objectiveIds": [
      "S3.07.A01",
      "S3.07.A02",
      "S3.07.A03"
    ],
    "title": "Choose ROM technology from its erase method",
    "commandWord": "Complete",
    "reading": [
      "Match each row to how its contents can be changed. All three technologies retain stored data without power, so retention alone does not distinguish them."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Row",
          "Answer",
          "Deciding feature"
        ],
        "rows": [
          [
            "1",
            "EEPROM",
            "Electrical erasure and rewriting while the device remains installed."
          ],
          [
            "2",
            "EPROM",
            "Ultraviolet erasure before reprogramming; the question specifies removal."
          ],
          [
            "3",
            "PROM",
            "Can be programmed once after manufacture."
          ]
        ]
      },
      "The names describe different programming and erasure methods. PROM is programmed once. EPROM can be erased with ultraviolet light and programmed again. EEPROM permits electrical erasure and rewriting."
    ],
    "marking": [
      "The scheme awards one mark for each correct row: EEPROM, EPROM and PROM, in that order. Each answer must match the erasure or programming condition in its own row."
    ],
    "mistakes": [
      "Do not put ROM in every row. The question asks for the specific memory technology. EEPROM uses electrical erasure; EPROM uses ultraviolet light."
    ],
    "marks": 3,
    "originalReview": "2026-09-29; Section 3 beginner-course source review",
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "reviewer": "Codex",
      "cropSpecSha256": "15aa88ca8a26634a0e3d1b06acdaa162160f4ab8fbf8926c0921f6cf7f88f66d",
      "method": "Read the selected QP and MS parts from the original PDFs; checked the source identity and marks; checked visible PDF glyph boundaries; rendered each crop at 2x, inspected every final PNG and recorded SHA-256 hashes. Required context is retained and unassigned following questions are excluded."
    },
    "qp": {
      "filename": "9618_w25_qp_13.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_13.pdf",
      "sha256": "9b5d7e33de24afb406ddc00c253ebf37b4240e6b21f3c1a7f6f1eb82aba78cc6",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s3-e3d04-qp-1.png",
          "page": 5,
          "bbox": [
            45,
            368,
            560.27559,
            616
          ],
          "width": 1030,
          "height": 496,
          "sha256": "605568ca17f3b959d79e4d7577720eda0d525593427a10d2afebd90be2e86588"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_13.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_13.pdf",
      "sha256": "d4bf99da2ca289430a18709d483892df85646dc5a90d5fb6697eb6d13c10481b",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s3-e3d04-ms-1.png",
          "page": 7,
          "bbox": [
            45,
            180,
            560.2,
            424
          ],
          "width": 1030,
          "height": 488,
          "sha256": "97128a3ee8178f63a086101772425d33b89a3869d24dcc5893a0acfecb29ebd8"
        }
      ]
    },
    "inserts": [],
    "sourceRef": "Cambridge 9618/13 · October/November 2025 · 4(c)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/"
  }
];
