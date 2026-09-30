// Additional original Section 4 questions. Source PDFs remain in the teacher archive.
// Crop geometry and original/image hashes make every displayed extract verifiable.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const digest = value => createHash('sha256').update(value).digest('hex');
export const section4ExtraPapers = [
  {
    "id": "E4D01",
    "year": 2025,
    "component": 12,
    "marks": 3,
    "title": "Follow immediate, indirect and indexed operands",
    "commandWord": "Write",
    "reading": [
      "Use the supplied memory and IX = 2. Identify the addressing mode before reading any memory value. Each instruction loads a new value into ACC."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Instruction",
          "How the operand is used",
          "ACC after"
        ],
        "rows": [
          [
            "LDM #98",
            "The operand is the immediate number 98. No data-memory read is needed.",
            98
          ],
          [
            "LDI 101",
            "Memory[101] contains 98. Follow that address to Memory[98], which contains 8.",
            8
          ],
          [
            "LDX 100",
            "Add IX to the operand address: 100 + 2 = 102. Memory[102] contains 32.",
            32
          ]
        ]
      }
    ],
    "marking": [
      "The official scheme awards one mark per correct ACC value, up to three. The explanations show the different routes to those values."
    ],
    "mistakes": [
      "For indirect addressing, do not stop at the pointer value 98. For indexed addressing, add IX to the address before reading memory; do not add IX to the stored value."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "series": "Oct/Nov",
    "parts": [
      {
        "part": "3(b)",
        "marks": 3
      }
    ],
    "objectiveIds": [
      "S4.13.A01",
      "S4.13.A05",
      "S4.14.A01",
      "S4.14.A02"
    ],
    "syllabusMapping": [
      "S4.13",
      "S4.14"
    ],
    "inserts": [],
    "sourceRef": "Cambridge 9618/12 · October/November 2025 · 3(b)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_w25_qp_12.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_12.pdf",
      "sha256": "ea65e75a4182f991cb2117827ee5c6734365b2c5e78686c6d6ef1e00d48fe65b",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s4-e4d01-qp-1.png",
          "page": 4,
          "bbox": [
            45,
            59,
            560.27559,
            638
          ],
          "width": 1030,
          "height": 1158,
          "sha256": "f3adc798aaa36bfaca080d53a917a25e8138b22edac9aee517656c9b32864057"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_12.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_12.pdf",
      "sha256": "4fd455f74ae4abf71a8796095c912a06c77239d6d5a6679ce05ceff1032e7dd8",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s4-e4d01-ms-1.png",
          "page": 5,
          "bbox": [
            45,
            450,
            560.2,
            587
          ],
          "width": 1030,
          "height": 274,
          "sha256": "97575a47abf77b05aed3f9248d563f0bda699433ae685c3f07a3b7494cd10de2"
        }
      ]
    },
    "cropSpec": {
      "ms": [
        [
          5,
          450,
          587
        ]
      ],
      "qp": [
        [
          4,
          59,
          638
        ]
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "182bf7f6d4b3f5e61f630257a18baf959b18a037f549b4efb49dacb9c5475989",
      "reviewer": "Codex",
      "method": "Checked selected original QP/MS pages, question identities, context and marks; rendered at 144 dpi with glyph-boundary checks; visually inspected all six final extracts and recorded source/crop/image hashes."
    }
  },
  {
    "id": "E4D02",
    "year": 2024,
    "component": 13,
    "marks": 2,
    "title": "Distinguish logical and arithmetic right shifts",
    "commandWord": "Describe",
    "reading": [
      "Compare what enters the leftmost bit positions. The question asks about right shifts; neither operation wraps the outgoing bits around."
    ],
    "solution": [
      "Both operations move bits to the right. A logical right shift fills the vacated leftmost positions with zeros. An arithmetic right shift copies the original sign bit into those positions.",
      {
        "type": "table",
        "headers": [
          "8-bit example",
          "Before",
          "After one right shift"
        ],
        "rows": [
          [
            "Logical",
            "10011111",
            "01001111"
          ],
          [
            "Arithmetic",
            "10011111",
            "11001111"
          ]
        ]
      }
    ],
    "marking": [
      "One mark is available for the logical-shift rule and one for the arithmetic-shift rule. The added example illustrates the rules; it is teacher-written and is not part of the original question."
    ],
    "mistakes": [
      "Saying only that an arithmetic shift preserves the sign does not explain how the new bits are filled. A cyclic shift brings outgoing bits back at the other end; that is a different operation."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "series": "Oct/Nov",
    "parts": [
      {
        "part": "8(c)",
        "marks": 2
      }
    ],
    "objectiveIds": [
      "S4.15.A01",
      "S4.15.A03",
      "S4.15.A04"
    ],
    "syllabusMapping": [
      "S4.15"
    ],
    "inserts": [],
    "sourceRef": "Cambridge 9618/13 · October/November 2024 · 8(c)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_w24_qp_13.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_qp_13.pdf",
      "sha256": "1633471ff692292618910635b391aef69624188ec30b72425738f8a46354cc04",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s4-e4d02-qp-1.png",
          "page": 15,
          "bbox": [
            45,
            394,
            560.2756,
            521
          ],
          "width": 1030,
          "height": 254,
          "sha256": "63cea41c8c6e9e9f2c58f62ee52c40aa40ae3c57af22d096877a8e45252a484c"
        }
      ]
    },
    "ms": {
      "filename": "9618_w24_ms_13.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_ms_13.pdf",
      "sha256": "d3ee5286285e4611838cb9922a4fd9706a1a4e733ece048f24f89ee5cb48ec37",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s4-e4d02-ms-1.png",
          "page": 8,
          "bbox": [
            45,
            279,
            560.32,
            375
          ],
          "width": 1030,
          "height": 192,
          "sha256": "a4d87f9e1997fa5c416f40b30ec5349bf743557e476437a71c765706c3ee1da8"
        }
      ]
    },
    "cropSpec": {
      "ms": [
        [
          8,
          279,
          375
        ]
      ],
      "qp": [
        [
          15,
          394,
          521
        ]
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "7a69862b5c28f4a717c7b3266be5555d5f473e615b1ef7f1055527d65a2d82ac",
      "reviewer": "Codex",
      "method": "Checked selected original QP/MS pages, question identities, context and marks; rendered at 144 dpi with glyph-boundary checks; visually inspected all six final extracts and recorded source/crop/image hashes."
    }
  },
  {
    "id": "E4D03",
    "year": 2025,
    "component": 11,
    "marks": 1,
    "title": "Choose the instruction for a two-place left shift",
    "commandWord": "Write",
    "reading": [
      "Follow the original bit positions. The target has two zero bits inserted on the right, so choose the logical left-shift instruction and its shift count."
    ],
    "solution": [
      {
        "type": "code",
        "text": "LSL #2"
      },
      "After one place, 00011110 becomes 00111100. After two places, it becomes 01111000. The operand #2 is the number of places, not the final value of ACC."
    ],
    "marking": [
      "The official scheme awards the single mark for LSL #2. The step-by-step explanation is teacher-written."
    ],
    "mistakes": [
      "Do not use LSR, which shifts in the opposite direction. Do not use #4 merely because the unsigned value has been multiplied by four; the operand counts bit positions."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "series": "Oct/Nov",
    "parts": [
      {
        "part": "4(a)",
        "marks": 1
      }
    ],
    "objectiveIds": [
      "S4.15.A01",
      "S4.15.A03",
      "S4.15.A04",
      "S4.15.A13"
    ],
    "syllabusMapping": [
      "S4.15"
    ],
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2025 · 4(a)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_w25_qp_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_11.pdf",
      "sha256": "2fe1691a0eff789ac686121aac0ae4e7cb3852f9bd321a6542dc6b82fbedf616",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s4-e4d03-qp-1.png",
          "page": 8,
          "bbox": [
            45,
            59,
            560.27559,
            661
          ],
          "width": 1030,
          "height": 1204,
          "sha256": "f3a82cc0c7dd5e3a94c91218eecbe9a898b89786ee7d7da4c0f715a49c5b5ffc"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_11.pdf",
      "sha256": "64b2928b1348598cd0be2cda8014405264f0a4303b73665633e4e297217056f4",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s4-e4d03-ms-1.png",
          "page": 7,
          "bbox": [
            45,
            373,
            560.2,
            412
          ],
          "width": 1030,
          "height": 78,
          "sha256": "4b319c2efcc90ce4d15738c6ac93430115f96ea646a28dd19d89c118cea2c3a9"
        }
      ]
    },
    "cropSpec": {
      "ms": [
        [
          7,
          373,
          412
        ]
      ],
      "qp": [
        [
          8,
          59,
          661
        ]
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "48f6e33dd0cf1c246b95106ae1a8d6162bb1c3dc768181dcefdb67bbd1df3e0a",
      "reviewer": "Codex",
      "method": "Checked selected original QP/MS pages, question identities, context and marks; rendered at 144 dpi with glyph-boundary checks; visually inspected all six final extracts and recorded source/crop/image hashes."
    }
  }
];
for (const question of section4ExtraPapers) {
  if (question.extractReview.status !== 'verified' || digest(JSON.stringify(question.cropSpec)) !== question.extractReview.cropSpecSha256) throw new Error(`Unreviewed Section 4 source: ${question.id}`);
  for (const kind of ['qp', 'ms']) {
    const extracts = question[kind].extracts;
    if (extracts.length !== question.cropSpec[kind].length) throw new Error(`Missing Section 4 extract: ${question.id} ${kind}`);
    extracts.forEach((extract, index) => {
      const [page, top, bottom] = question.cropSpec[kind][index];
      if (extract.page !== page || extract.bbox[1] !== top || extract.bbox[3] !== bottom) throw new Error(`Changed Section 4 crop: ${question.id} ${kind}`);
      if (digest(readFileSync(new URL('../web' + extract.asset, import.meta.url))) !== extract.sha256) throw new Error(`Changed Section 4 image: ${extract.asset}`);
    });
  }
}
