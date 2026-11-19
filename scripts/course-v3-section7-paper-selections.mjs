// Exact selected subquestions for the five-subsection Section 7 route.
// Original combined extracts remain in the repository for existing references.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { section7ExtraPapers } from './course-v3-section7-extra-papers.mjs';
const digest = value => createHash('sha256').update(value).digest('hex');

export const section7SplitPapers = [
  {
    "id": "E054A",
    "parentId": "E054",
    "parts": [
      {
        "part": "5(b)(i)",
        "marks": 3
      }
    ],
    "marks": 3,
    "cropSpec": {
      "qp": [
        [
          7,
          341,
          577
        ]
      ],
      "ms": [
        [
          6,
          385,
          540
        ]
      ]
    },
    "qp": {
      "filename": "9618_w24_qp_12.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_qp_12.pdf",
      "sha256": "3d754f83188ee139c7ffd082496a3d0591e73714ec8787dc2b961f5aa2c744c6",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e054a-qp-1.png",
          "page": 7,
          "bbox": [
            45.0,
            341.0,
            560.0,
            577.0
          ],
          "width": 1030,
          "height": 472,
          "sha256": "76deee7384c84f21b40da00216b30b254cb63715a3b6b37bf1d7cc2eab3852a3"
        }
      ]
    },
    "ms": {
      "filename": "9618_w24_ms_12.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_ms_12.pdf",
      "sha256": "42b8ef4e24bdd263e1a81b9ae34d332e77e34f7c7853ab411977410f1b43192e",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e054a-ms-1.png",
          "page": 6,
          "bbox": [
            45.0,
            385.0,
            560.0,
            540.0
          ],
          "width": 1030,
          "height": 310,
          "sha256": "1e6dedfcac0d384a8d1101203d3c19198754f899bd860f7af73a6f3d7b1deda0"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "5141e91e21fd34135a618479ba378b162afde5ef62a4e3bbb2f4c6c5cc40ce46",
      "method": "Checked original PDF hashes and complete source pages; split at selected subquestions, retained required parent context, checked all visible glyphs against crop edges, and visually reviewed the final unchanged 144 dpi extracts."
    },
    "title": "Choose a licence for source changes and paid updates",
    "commandWord": "Identify / Describe",
    "objectiveIds": [
      "S7.05.A01",
      "S7.05.A02",
      "S7.05.A04",
      "S7.05.A05"
    ],
    "reading": [
      "Answer part 5(b)(i). Identify a suitable licensing category, then use the two requirements: the business can modify source code and the programmer can charge for maintenance and updates."
    ],
    "solution": [
      "A free-software/open-source licence permits the business to examine and modify the source to meet its needs. The programmer can still receive payment for software, maintenance and security updates."
    ],
    "marking": [
      "One mark is available for the category and up to two for accepted reasons. The official scheme names Open Source Initiative or Free Software Foundation. These are organisations associated with the intended categories, not the names of individual licences."
    ],
    "mistakes": [
      "Do not equate free software with a ban on charging. Payment alone does not determine source-code permissions."
    ]
  },
  {
    "id": "E054B",
    "parentId": "E054",
    "parts": [
      {
        "part": "5(b)(ii)",
        "marks": 2
      }
    ],
    "marks": 2,
    "cropSpec": {
      "qp": [
        [
          7,
          341,
          394
        ],
        [
          7,
          577,
          705
        ]
      ],
      "ms": [
        [
          6,
          539,
          631
        ]
      ]
    },
    "qp": {
      "filename": "9618_w24_qp_12.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_qp_12.pdf",
      "sha256": "3d754f83188ee139c7ffd082496a3d0591e73714ec8787dc2b961f5aa2c744c6",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e054b-qp-1.png",
          "page": 7,
          "bbox": [
            45.0,
            341.0,
            560.0,
            394.0
          ],
          "width": 1030,
          "height": 106,
          "sha256": "de8f3d14b7ab514d01b2444a12fc666bad7bb27588ef4e1939179199471c157a"
        },
        {
          "asset": "/assets/past-paper-questions/s7-e054b-qp-2.png",
          "page": 7,
          "bbox": [
            45.0,
            577.0,
            560.0,
            705.0
          ],
          "width": 1030,
          "height": 256,
          "sha256": "93115e8a9d61b0108387b767d56db16170a6257ed9aa7a60e38b4f19f046543c"
        }
      ]
    },
    "ms": {
      "filename": "9618_w24_ms_12.pdf",
      "sourcePdf": "2024-Oct-Nov/9618_w24_ms_12.pdf",
      "sha256": "42b8ef4e24bdd263e1a81b9ae34d332e77e34f7c7853ab411977410f1b43192e",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e054b-ms-1.png",
          "page": 6,
          "bbox": [
            45.0,
            539.0,
            560.0,
            631.0
          ],
          "width": 1030,
          "height": 184,
          "sha256": "53f003d78310d510afa81e4041048c19bdd951c4a1e182887242dde2138bca75"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "b67bd95e68360797cf16678a0e9cffd79fcd9b2d8bf0201df2d3d8086402dd08",
      "method": "Checked original PDF hashes and complete source pages; split at selected subquestions, retained required parent context, checked all visible glyphs against crop edges, and visually reviewed the final unchanged 144 dpi extracts."
    },
    "title": "Explain why copyright protection is needed",
    "commandWord": "Explain",
    "objectiveIds": [
      "S7.04.A01"
    ],
    "reading": [
      "Answer part 5(b)(ii). Explain why the programmer needs copyright protection. The shared business context is retained; the licensing part is taught separately in 7.1.4."
    ],
    "solution": [
      "Copyright recognises the programmer as the author or owner of the protected work. It provides a legal basis for challenging copying that infringes the rights or permitted terms."
    ],
    "marking": [
      "The official scheme accepts ownership or authorship recognition and legal consequences for copying, with one mark per accepted point and a maximum of two. It also lists restricting competition. This does not mean that copyright monopolises every idea or prevents independently written competing programs."
    ],
    "mistakes": [
      "The question wording does not establish that registration is universally required. Permission to run or modify a program does not by itself transfer copyright."
    ]
  },
  {
    "id": "E7D03B",
    "parentId": "E7D03",
    "parts": [
      {
        "part": "8(b)",
        "marks": 3
      }
    ],
    "marks": 3,
    "cropSpec": {
      "qp": [
        [
          14,
          60,
          90
        ],
        [
          14,
          316,
          524
        ]
      ],
      "ms": [
        [
          13,
          213,
          369
        ]
      ]
    },
    "qp": {
      "filename": "9618_w25_qp_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_11.pdf",
      "sha256": "2fe1691a0eff789ac686121aac0ae4e7cb3852f9bd321a6542dc6b82fbedf616",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e7d03b-qp-1.png",
          "page": 14,
          "bbox": [
            45.0,
            60.0,
            560.0,
            90.0
          ],
          "width": 1030,
          "height": 60,
          "sha256": "5b36066903ff8fe39fc697e6ad42e8546fa0cc26cf256222f2a8762e13d5e2d4"
        },
        {
          "asset": "/assets/past-paper-questions/s7-e7d03b-qp-2.png",
          "page": 14,
          "bbox": [
            45.0,
            316.0,
            560.0,
            524.0
          ],
          "width": 1030,
          "height": 416,
          "sha256": "6b014ee2ad8ac02568e5bd75c54321aa1a56a6383fdaa8703ded49c78c0a47d1"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_11.pdf",
      "sha256": "64b2928b1348598cd0be2cda8014405264f0a4303b73665633e4e297217056f4",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e7d03b-ms-1.png",
          "page": 13,
          "bbox": [
            45.0,
            213.0,
            560.0,
            369.0
          ],
          "width": 1030,
          "height": 312,
          "sha256": "4869c794e9b41033eedd02faf79995268724679da68901b2203d5fa7657d4391"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "9a561fbc984fe30f436ff651f548f6e7d90218024e7248da06e576221c134103",
      "method": "Checked original PDF hashes and complete source pages; split at selected subquestions, retained required parent context, checked all visible glyphs against crop edges, and visually reviewed the final unchanged 144 dpi extracts."
    },
    "title": "Give three other school-network ethical considerations",
    "commandWord": "Give",
    "objectiveIds": [
      "S7.03.A01"
    ],
    "reading": [
      "Read the retained opening sentence: spreading malware is already supplied. Give three other ethical considerations for a student connecting a personal computer to the school network."
    ],
    "solution": [
      "Respect other people’s privacy; do not engage in cyberbullying; do not copy and present work that is not your own."
    ],
    "marking": [
      "One mark per accepted point, up to three. The scheme also accepts following school rules, using the network for legitimate purposes and not hacking other computers."
    ],
    "mistakes": [
      "Repeating the supplied malware risk does not answer the request for other considerations. Three paraphrases of the same privacy point do not provide three different considerations."
    ]
  },
  {
    "id": "E7D03C",
    "parentId": "E7D03",
    "parts": [
      {
        "part": "8(c)",
        "marks": 4
      }
    ],
    "marks": 4,
    "cropSpec": {
      "qp": [
        [
          14,
          524,
          782
        ]
      ],
      "ms": [
        [
          13,
          369,
          705
        ]
      ]
    },
    "qp": {
      "filename": "9618_w25_qp_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_11.pdf",
      "sha256": "2fe1691a0eff789ac686121aac0ae4e7cb3852f9bd321a6542dc6b82fbedf616",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e7d03c-qp-1.png",
          "page": 14,
          "bbox": [
            45.0,
            524.0,
            560.0,
            782.0
          ],
          "width": 1030,
          "height": 516,
          "sha256": "9ef4a319cf1263db69464f369a709faef0a46f579017d7a45f27693a6b9da213"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_11.pdf",
      "sha256": "64b2928b1348598cd0be2cda8014405264f0a4303b73665633e4e297217056f4",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s7-e7d03c-ms-1.png",
          "page": 13,
          "bbox": [
            45.0,
            369.0,
            560.0,
            705.0
          ],
          "width": 1030,
          "height": 672,
          "sha256": "3429e6d87c36550702c4f054cba5c6c02e730384414d5e6bf4e4d4dafa5d41a2"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-11-16",
      "reviewer": "Codex",
      "cropSpecSha256": "60308c157b753b66d886028b2767d007fac590d812b801c98aefca438cb840bc",
      "method": "Checked original PDF hashes and complete source pages; split at selected subquestions, retained required parent context, checked all visible glyphs against crop edges, and visually reviewed the final unchanged 144 dpi extracts."
    },
    "title": "Describe two social impacts of AI homework help",
    "commandWord": "Describe",
    "objectiveIds": [
      "S7.06.A03"
    ],
    "reading": [
      "Answer part 8(c). Describe two social impacts on students and develop each in the homework context. The network-ethics part is taught separately in 7.1.2."
    ],
    "solution": [
      "Learning support: additional AI help may improve achievement; students who struggle in traditional lessons may also gain confidence from learning at their own pace.",
      "Social participation: heavy reliance on AI may reduce collaboration and face-to-face communication; increased screen time and isolation can contribute to anxiety or loneliness."
    ],
    "marking": [
      "The scheme awards one mark per accepted bullet point, up to four overall. There is no stated two-mark cap per impact and no requirement to give one benefit and one drawback. Other accepted points include reduced reasoning practice, unequal access, incorrect answers, intellectual-property concerns and changes to school assessment."
    ],
    "mistakes": [
      "Describe two developed impacts, not a disconnected list of labels. Do not claim that all AI answers are wrong or that all students become isolated."
    ]
  }
];

for (const paper of section7SplitPapers) {
  if (paper.parts.reduce((sum, part) => sum + part.marks, 0) !== paper.marks) throw new Error(`Invalid S7 marks: ${paper.id}`);
  if (digest(JSON.stringify(paper.cropSpec)) !== paper.extractReview.cropSpecSha256) throw new Error(`Unreviewed S7 crop: ${paper.id}`);
  for (const kind of ['qp', 'ms']) for (const extract of paper[kind].extracts) {
    const bytes = readFileSync(new URL(`../web${extract.asset}`, import.meta.url));
    if (digest(bytes) !== extract.sha256 || bytes.readUInt32BE(16) !== extract.width || bytes.readUInt32BE(20) !== extract.height) throw new Error(`Changed S7 extract: ${extract.asset}`);
  }
}

export function section7PaperPool(basePool) {
  const originals = [...new Map([...basePool, ...section7ExtraPapers].map(paper => [paper.id, paper])).values()];
  const parents = new Set(section7SplitPapers.map(paper => paper.parentId));
  const selected = section7SplitPapers.flatMap(split => {
    const parent = originals.find(paper => paper.id === split.parentId);
    if (!parent) return [];
    return [{
      ...parent, ...split,
      // A source question may move between lessons; ownership is assigned by the journey.
      lesson: split.id === 'E7D03B' ? 39 : parent.lesson,
      syllabusMapping: [...new Set(split.objectiveIds.map(id => id.replace(/\.A\d+$/, '')))],
      sourceRef: `${parent.sourceRef.split(' · ').slice(0, 2).join(' · ')} · ${split.parts.map(part => part.part).join(', ')}`,
    }];
  });
  return [...originals.filter(paper => !parents.has(paper.id)), ...selected];
}
