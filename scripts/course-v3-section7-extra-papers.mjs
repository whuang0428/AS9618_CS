// Original Section 7 questions selected for the beginner teaching sequence.
// Original PDFs remain in the teacher's read-only local archive.
// sourcePdf is relative to /Users/kw/Documents/Teaching/AS CS 9618/past-papers.
// Only reviewed extracts are published; source files are not needed to build the site.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const digest = value => createHash('sha256').update(value).digest('hex');
export const section7ExtraPapers = [
  {
    "id": "E7D01",
    "year": 2024,
    "series": "Oct/Nov",
    "component": 11,
    "parts": [
      {
        "part": "7(a)",
        "marks": 2
      },
      {
        "part": "7(b)",
        "marks": 2
      }
    ],
    "marks": 4,
    "title": "Explain the benefits of trial and commercial distribution",
    "commandWord": "Give",
    "objectiveIds": [
      "S7.05.A03",
      "S7.05.A04"
    ],
    "syllabusMapping": [
      "S7.05"
    ],
    "reading": [
      "Treat the two parts separately. For each licence model, give two different benefits and identify who benefits: the user, the developer, or both. A shareware trial can help someone decide whether the program suits their needs."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Part",
          "Two suitable benefits"
        ],
        "rows": [
          [
            "7(a): shareware",
            "Users can try the program before purchase to check whether it meets their needs. The developer can use trial feedback to improve the program."
          ],
          [
            "7(b): commercial",
            "The developer can earn a fee from distributing the software. Support is usually available to help users resolve problems."
          ]
        ]
      }
    ],
    "marking": [
      "The official scheme awards one mark per accepted point, up to two for each part. For shareware it also accepts no initial cost or users promoting the software to others. For commercial distribution it also accepts software usually being well tested.",
      "The scheme describes typical benefits; it does not establish that every commercial product is well tested or that every licence includes support. Commercial activity can also use an open-source licence. Check the actual offer when making a real choice."
    ],
    "mistakes": [
      "Repeating that a trial lets the user test the program and decide whether it suits them gives one benefit, not two. Do not claim that all trials are unlimited, that payment transfers copyright, or that commercial distribution always removes source-code rights."
    ],
    "cropSpec": {
      "ms": [
        [
          9,
          237,
          471
        ]
      ],
      "qp": [
        [
          13,
          355,
          665
        ]
      ]
    },
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2024 · 7(a), 7(b)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_w24_qp_11.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_qp_11.pdf",
      "sha256": "94d1aed5bc14f0a3fd60da0e932cf5b8b40bd8342550ff0254c19afe89001ef7",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e7d01-qp-1.png",
          "page": 13,
          "bbox": [
            45,
            355,
            560.2756,
            665
          ],
          "width": 1030,
          "height": 620,
          "sha256": "1efdff36f71a38aae07e19274692c4ff28b7ae8ba8e10bbcc66cf4102cb6de9e"
        }
      ]
    },
    "ms": {
      "filename": "9618_w24_ms_11.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_ms_11.pdf",
      "sha256": "e9674e802b5b850509834b1ab1b84008740729d668ae844e9b0142607dbdf1a2",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e7d01-ms-1.png",
          "page": 9,
          "bbox": [
            45,
            237,
            560.32,
            471
          ],
          "width": 1030,
          "height": 468,
          "sha256": "cfcf7defa9d2ff81f5eeac5631e1268b013627c6c73d5260aaa05d556608e69b"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "1bf2fac72fab283b5e431b98fde9c9a5b6c87ae9c3b70ef3201e08b32857ec8e",
      "reviewer": "Codex",
      "method": "Read the local original QP/MS text and full relevant pages, checked identities, parent context, selected parts and marks. Rendered at 144 dpi and checked readable glyph boundaries; final crops were visually inspected. Recorded original PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E7D02",
    "year": 2025,
    "series": "Oct/Nov",
    "component": 13,
    "parts": [
      {
        "part": "7(a)",
        "marks": 2
      }
    ],
    "marks": 2,
    "title": "Connect classroom AI monitoring to an ethical impact",
    "commandWord": "Describe",
    "objectiveIds": [
      "S7.06.A03"
    ],
    "syllabusMapping": [
      "S7.06"
    ],
    "reading": [
      "Describe one impact of the stated classroom monitoring. Name the affected people and explain how recording or analysing their behaviour could affect them. One developed impact is sufficient; the question does not require both a benefit and a drawback."
    ],
    "solution": [
      "Continuous classroom monitoring can raise privacy concerns: students or teachers may feel uncomfortable because their actions are constantly observed and may be passed to third parties."
    ],
    "marking": [
      "The official scheme awards one mark per accepted point, up to two. Privacy concerns linked to constant surveillance or sharing data are accepted. It also accepts improved learning through identifying students who need support, or pressure from monitoring leading to stress or anxiety. A suitable positive impact can therefore earn credit.",
      "This task assesses a specific social or ethical impact of AI. It does not require a technical explanation of image recognition, a calculation, or a complete comparison of two possible deployment decisions."
    ],
    "mistakes": [
      "Writing only that AI is unethical does not describe its impact. Explain what happens to students or teachers; the next part of the original paper concerns video file size and is outside this selection."
    ],
    "cropSpec": {
      "ms": [
        [
          11,
          65,
          364
        ]
      ],
      "qp": [
        [
          12,
          59,
          261
        ]
      ]
    },
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/13 · October/November 2025 · 7(a)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_w25_qp_13.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_13.pdf",
      "sha256": "9b5d7e33de24afb406ddc00c253ebf37b4240e6b21f3c1a7f6f1eb82aba78cc6",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e7d02-qp-1.png",
          "page": 12,
          "bbox": [
            45,
            59,
            560.27559,
            261
          ],
          "width": 1030,
          "height": 404,
          "sha256": "6aaf39857d934aa4d4a5c9cdcd82728688218ad23211471fceaf9d93fe448fa3"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_13.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_13.pdf",
      "sha256": "d4bf99da2ca289430a18709d483892df85646dc5a90d5fb6697eb6d13c10481b",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e7d02-ms-1.png",
          "page": 11,
          "bbox": [
            45,
            65,
            560.2,
            364
          ],
          "width": 1030,
          "height": 598,
          "sha256": "922405cd050a0c16e1afa2618d6a41e1c395dcdf5d8ce2d2cc18efc231ce8ff8"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "31389d73fa05b8b586d88bc25b6156eed415b1c9f4af3a24fd1340f49e04204e",
      "reviewer": "Codex",
      "method": "Read the local original QP/MS text and full relevant pages, checked identities, parent context, selected parts and marks. Rendered at 144 dpi and checked readable glyph boundaries; final crops were visually inspected. Recorded original PDF, crop-specification and PNG SHA-256 hashes."
    }
  },
  {
    "id": "E7D03",
    "year": 2025,
    "series": "Oct/Nov",
    "component": 11,
    "parts": [
      {
        "part": "8(b)",
        "marks": 3
      },
      {
        "part": "8(c)",
        "marks": 4
      }
    ],
    "marks": 7,
    "title": "Apply ethical responsibilities and assess AI homework impacts",
    "commandWord": "Give / Describe",
    "objectiveIds": [
      "S7.03.A01",
      "S7.06.A03"
    ],
    "syllabusMapping": [
      "S7.03",
      "S7.06"
    ],
    "reading": [
      "Read the opening sentence before answering 8(b): spreading malware is already supplied, so give three other considerations. In 8(c), describe two social impacts on students and develop each with consequences in this homework context."
    ],
    "solution": [
      {
        "type": "table",
        "headers": [
          "Part",
          "Model response"
        ],
        "rows": [
          [
            "8(b): three other considerations",
            "Respect other people’s privacy; do not use the network for cyberbullying; do not copy and present work that is not your own."
          ],
          [
            "8(c): learning support",
            "Additional AI support may help students do better. Students who struggle in traditional lessons may also gain confidence by learning at their own pace."
          ],
          [
            "8(c): communication and wellbeing",
            "Heavy reliance on AI may reduce collaboration and face-to-face communication. Increased screen time and isolation can also contribute to anxiety or loneliness."
          ]
        ]
      }
    ],
    "marking": [
      "Part 8(b) awards one mark per accepted point, up to three. The scheme also accepts following school network rules, using the network for legitimate purposes and not hacking other computers. Repeating the supplied malware risk does not answer the request for other considerations.",
      "Part 8(c) awards one mark per accepted bullet point, up to four. The model develops learning support with confidence and social participation with wellbeing, using points accepted in the scheme. Other accepted effects include reduced reasoning practice, unequal access to the technology, incorrect AI answers and changes to school assessment. The question does not demand one positive and one negative impact."
    ],
    "mistakes": [
      "A list of four undeveloped labels does not meet the request to describe two impacts. Keep the response about students and learning; a claim that all AI answers are wrong or that every student becomes isolated is unsupported."
    ],
    "cropSpec": {
      "ms": [
        [
          13,
          214,
          705
        ]
      ],
      "qp": [
        [
          14,
          59,
          90
        ],
        [
          14,
          316,
          782
        ]
      ]
    },
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2025 · 8(b), 8(c)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_w25_qp_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_11.pdf",
      "sha256": "2fe1691a0eff789ac686121aac0ae4e7cb3852f9bd321a6542dc6b82fbedf616",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e7d03-qp-1.png",
          "page": 14,
          "bbox": [
            45,
            59,
            560.27559,
            90
          ],
          "width": 1030,
          "height": 62,
          "sha256": "075193c2d711f78828cb03dc14d274700193e860a6c9814a2afbf8e617d52b04"
        },
        {
          "asset": "/assets/past-paper-questions/s7-e7d03-qp-2.png",
          "page": 14,
          "bbox": [
            45,
            316,
            560.27559,
            782
          ],
          "width": 1030,
          "height": 932,
          "sha256": "8882121d3760dd77e89deb401439c23d3f992c666413df2283248c6714eb3c1f"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_11.pdf",
      "sha256": "64b2928b1348598cd0be2cda8014405264f0a4303b73665633e4e297217056f4",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e7d03-ms-1.png",
          "page": 13,
          "bbox": [
            45,
            214,
            560.2,
            705
          ],
          "width": 1030,
          "height": 982,
          "sha256": "a3097ffc894500725313247ee6de63692b4d8bb913a9ed5478521422445bb002"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-29",
      "cropSpecSha256": "e70e43ddceddb032993611f0f47ec84d00c9d78b1ff187e84d1711e2cadeb96a",
      "reviewer": "Codex",
      "method": "Read the local original QP/MS text and full relevant pages, checked identities, parent context, selected parts and marks. Rendered at 144 dpi and checked readable glyph boundaries; final crops were visually inspected. Recorded original PDF, crop-specification and PNG SHA-256 hashes."
    }
  }
];
for (const question of section7ExtraPapers) {
  if (question.extractReview.status !== 'verified' || digest(JSON.stringify(question.cropSpec)) !== question.extractReview.cropSpecSha256) throw new Error(`Unreviewed Section 7 source: ${question.id}`);
  if (question.parts.reduce((total, part) => total + part.marks, 0) !== question.marks) throw new Error(`Inconsistent Section 7 marks: ${question.id}`);
  for (const kind of ['qp', 'ms']) {
    const extracts = question[kind].extracts;
    if (extracts.length !== question.cropSpec[kind].length) throw new Error(`Missing Section 7 extract: ${question.id} ${kind}`);
    extracts.forEach((extract, index) => {
      const [page, top, bottom] = question.cropSpec[kind][index];
      if (extract.page !== page || extract.bbox[1] !== top || extract.bbox[3] !== bottom) throw new Error(`Changed Section 7 crop: ${question.id} ${kind}`);
      const bytes = readFileSync(new URL('../web' + extract.asset, import.meta.url));
      if (digest(bytes) !== extract.sha256) throw new Error(`Changed Section 7 image: ${extract.asset}`);
      if (bytes.readUInt32BE(16) !== extract.width || bytes.readUInt32BE(20) !== extract.height) throw new Error(`Changed Section 7 image dimensions: ${extract.asset}`);
    });
  }
}
