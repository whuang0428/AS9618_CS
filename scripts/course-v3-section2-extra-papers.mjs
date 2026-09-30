// Verified Section 2 additions; original PDFs stay in the read-only teacher archive.
// These independently reviewed selections do not alter the existing selection registry.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const digest = value => createHash('sha256').update(value).digest('hex');
export const section2ExtraPapers = [
  {
    "id": "E2D01",
    "year": 2025,
    "series": "May/June",
    "component": 12,
    "parts": [
      {
        "part": "6(a)",
        "marks": 2
      }
    ],
    "marks": 2,
    "title": "Compare the scope and ownership of a LAN and WAN",
    "commandWord": "State",
    "objectiveIds": [
      "S2.01.A02",
      "S2.01.A03"
    ],
    "syllabusMapping": [
      "S2.01"
    ],
    "cropSpec": {
      "ms": [
        [
          10,
          65,
          203
        ]
      ],
      "qp": [
        [
          11,
          60,
          248
        ]
      ]
    },
    "reading": [
      "Give two paired differences. For each, say what is typical of the WAN and what is typical of the LAN. The company scenario has sites in different cities."
    ],
    "solution": [
      "The WAN links sites across a larger geographical area, while a LAN covers a smaller local area such as one site.",
      "The WAN can use external provider transmission media between sites; the organisation normally controls the transmission media within its LAN."
    ],
    "marking": [
      "The scheme awards one mark for each accepted difference, up to two. The comparison concerns scope and infrastructure; neither Wi-Fi nor a guaranteed data rate defines a LAN."
    ],
    "mistakes": [
      "Do not claim that every WAN is slower than every LAN, that a LAN must use cables, or that WAN access must be public."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/12 · May/June 2025 · 6(a)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_s25_qp_12.pdf",
      "sourcePdf": "2025-May-June/9618_s25_qp_12.pdf",
      "sha256": "607722293452744ee7107b7365cac73664d51e0eb0f7487587d038e22467826e",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s2-e2d01-qp-1.png",
          "page": 11,
          "bbox": [
            45,
            60,
            560.27559,
            248
          ],
          "width": 1030,
          "height": 376,
          "sha256": "e07e01b27a4f9f879ae3e27f97d1d31c6e1e7c7cde5bd2658b4268cd1b6e7c3f"
        }
      ]
    },
    "ms": {
      "filename": "9618_s25_ms_12.pdf",
      "sourcePdf": "2025-May-June/9618_s25_ms_12.pdf",
      "sha256": "0b0c41c4a7930853aaaaa00729d4ffd3a3e971948800220344c6ae6a31ec957a",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s2-e2d01-ms-1.png",
          "page": 10,
          "bbox": [
            45,
            65,
            560.32,
            203
          ],
          "width": 1030,
          "height": 276,
          "sha256": "7628d00920864c7692932047b354696e06de70ccaddbf93c64faffe1fc33579f"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-30",
      "cropSpecSha256": "b6c8f96e1324dc761f2f4b1e6420be156c4c074b5b873116efbfdd43ecb06629",
      "reviewer": "Codex",
      "method": "Read original local QP/MS text and complete selected pages. Rendered unaltered PDF regions at 144 dpi, checked glyph boundaries, then visually inspected every final crop for complete parent context, task, answer and marks. Source PDF, crop specification and PNG SHA-256 identities recorded."
    }
  },
  {
    "id": "E2D02",
    "year": 2023,
    "series": "May/June",
    "component": 13,
    "parts": [
      {
        "part": "2(b)(i)",
        "marks": 2
      },
      {
        "part": "2(b)(ii)",
        "marks": 2
      }
    ],
    "marks": 4,
    "title": "Explain a mesh and compare it with a shared bus",
    "commandWord": "Describe / Give",
    "objectiveIds": [
      "S2.04.A03",
      "S2.05.A02"
    ],
    "syllabusMapping": [
      "S2.04",
      "S2.05"
    ],
    "cropSpec": {
      "ms": [
        [
          3,
          582,
          673
        ],
        [
          4,
          65,
          205
        ]
      ],
      "qp": [
        [
          3,
          60,
          95
        ],
        [
          3,
          240,
          552
        ]
      ]
    },
    "reading": [
      "First describe mesh connections and paths. Then give two distinct advantages over a shared bus. Keep the network in the university stem as the context."
    ],
    "solution": [
      "In a mesh, devices have interconnections that provide multiple possible routes between devices. An intermediate device can relay a packet towards its destination. A full mesh connects every pair directly; a partial mesh need not.",
      "A mesh with an alternative working path can continue communicating after one link fails. Dedicated point-to-point full-duplex links also avoid the shared-medium collisions of a traditional bus."
    ],
    "marking": [
      "2(b)(i) awards up to two marks for the stated mesh features. 2(b)(ii) awards up to two for accepted advantages, including an alternative route after a link fails and fewer collisions.",
      "The official scheme also lists security-related alternatives. Separate physical paths are not encryption or a complete security policy; teach the mechanism and its conditions rather than promising security from a topology alone."
    ],
    "mistakes": [
      "A mesh is not a single cable connecting all devices in a line. Redundancy helps only when a usable alternate path remains; do not promise that every failure leaves every mesh connected."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/13 · May/June 2023 · 2(b)(i), 2(b)(ii)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_s23_qp_13.pdf",
      "sourcePdf": "2023-May-June/9618_s23_qp_13.pdf",
      "sha256": "b53ac2c6e575164af41410a1f4620a102aa2de42ed51fd9bfb586e24221f0d90",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s2-e2d02-qp-1.png",
          "page": 3,
          "bbox": [
            45,
            60,
            560.276,
            95
          ],
          "width": 1030,
          "height": 70,
          "sha256": "e200e9aaf0495ce6da7a2ec7c049cab3c7b2b386ccc61a766b42f86269bdc5c3"
        },
        {
          "asset": "/assets/past-paper-questions/s2-e2d02-qp-2.png",
          "page": 3,
          "bbox": [
            45,
            240,
            560.276,
            552
          ],
          "width": 1030,
          "height": 624,
          "sha256": "d07aed6327193ad769ac8e32cd489cbc1edbf148a63ca91aa4d650acb52bce7e"
        }
      ]
    },
    "ms": {
      "filename": "9618_s23_ms_13.pdf",
      "sourcePdf": "2023-May-June/9618_s23_ms_13.pdf",
      "sha256": "e42d1cc9bdc1e41f9c08fa51f98bdc024d3a0b2984c98b50742f810a6c6762fd",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s2-e2d02-ms-1.png",
          "page": 3,
          "bbox": [
            45,
            582,
            560.22,
            673
          ],
          "width": 1030,
          "height": 182,
          "sha256": "74558d1cda7a4d1f300d64023601ff72024d88e7bf744778ae1606f274c451c6"
        },
        {
          "asset": "/assets/past-paper-questions/s2-e2d02-ms-2.png",
          "page": 4,
          "bbox": [
            45,
            65,
            560.22,
            205
          ],
          "width": 1030,
          "height": 280,
          "sha256": "b725e3d44513f48983c1e57742d7e008241e96743302f88815aaac186bf26e95"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-30",
      "cropSpecSha256": "6c397b6474413d8a697ee99e20c9eeba00f2c46e58ab852923b5df884654c239",
      "reviewer": "Codex",
      "method": "Read original local QP/MS text and complete selected pages. Rendered unaltered PDF regions at 144 dpi, checked glyph boundaries, then visually inspected every final crop for complete parent context, task, answer and marks. Source PDF, crop specification and PNG SHA-256 identities recorded."
    }
  },
  {
    "id": "E2D03",
    "year": 2023,
    "series": "Oct/Nov",
    "component": 11,
    "parts": [
      {
        "part": "2(a)",
        "marks": 3
      },
      {
        "part": "2(b)",
        "marks": 3
      }
    ],
    "marks": 6,
    "title": "Distinguish a router from local-network devices",
    "commandWord": "Describe / Complete",
    "objectiveIds": [
      "S2.10.A01",
      "S2.09.A01",
      "S2.09.A03",
      "S2.09.A04"
    ],
    "syllabusMapping": [
      "S2.09",
      "S2.10"
    ],
    "cropSpec": {
      "ms": [
        [
          4,
          65,
          530
        ]
      ],
      "qp": [
        [
          4,
          60,
          680
        ]
      ]
    },
    "reading": [
      "In 2(a), describe the router receiving, inspecting and forwarding a packet. In 2(b), give the function of each named device; the three devices need different descriptions."
    ],
    "solution": [
      "The router receives a packet, examines its destination IP address and consults its routing information to forward it towards the destination on an appropriate network.",
      {
        "type": "table",
        "headers": [
          "Device",
          "Purpose"
        ],
        "rows": [
          [
            "Switch",
            "Connects devices within a LAN and forwards received frames towards the destination device."
          ],
          [
            "Wireless Access Point (WAP)",
            "Connects wireless devices to the wired LAN using radio signals."
          ],
          [
            "Bridge",
            "Connects LAN segments using the same link-layer protocol and forwards traffic between them when needed."
          ]
        ]
      }
    ],
    "marking": [
      "2(a) awards up to three accepted router-function points. Receiving packets, inspecting destination IP addresses and forwarding using routing information provide a complete route to the marks.",
      "2(b) awards one mark for each correct device purpose. Only the switch, WAP and bridge are requested: the server, NIC, WNIC, cables and repeater need their own checks.",
      "The router scheme includes functions often bundled into a combined internet gateway. Those optional functions are not required properties of every router, and the three-point routing explanation does not depend on using them."
    ],
    "mistakes": [
      "Do not give a switch the role of finding a route between remote IP networks, or describe a repeater when the question asks for a bridge."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2023 · 2(a), 2(b)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_w23_qp_11.pdf",
      "sourcePdf": "2023-Oct-Nov/9618_w23_qp_11.pdf",
      "sha256": "0aca70a2e79414c1683c81120a9cd3144c4a5b9ad7f411cd95fcd7089d702e69",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s2-e2d03-qp-1.png",
          "page": 4,
          "bbox": [
            45,
            60,
            560.276,
            680
          ],
          "width": 1030,
          "height": 1240,
          "sha256": "b718ef5e3c78da2c082a569c69080c519c39195581956bf2ed255192230489d1"
        }
      ]
    },
    "ms": {
      "filename": "9618_w23_ms_11.pdf",
      "sourcePdf": "2023-Oct-Nov/9618_w23_ms_11.pdf",
      "sha256": "7d42b9e1b7ad513fa40cc2b5ba566b8f3dd4cdded6c0cd661e13f5388aa21348",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s2-e2d03-ms-1.png",
          "page": 4,
          "bbox": [
            45,
            65,
            560.32,
            530
          ],
          "width": 1030,
          "height": 930,
          "sha256": "160512f0159be749409fe14441684cc1b6e3ec84c422398c0dd746d38e7117bd"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-30",
      "cropSpecSha256": "74699316c976478c0a88a7bc9246a9cfec41b5fb8414612be880b0a6d57b23b4",
      "reviewer": "Codex",
      "method": "Read original local QP/MS text and complete selected pages. Rendered unaltered PDF regions at 144 dpi, checked glyph boundaries, then visually inspected every final crop for complete parent context, task, answer and marks. Source PDF, crop specification and PNG SHA-256 identities recorded."
    }
  },
  {
    "id": "E2D04",
    "year": 2025,
    "series": "May/June",
    "component": 12,
    "parts": [
      {
        "part": "6(b)",
        "marks": 4
      }
    ],
    "marks": 4,
    "title": "Trace the phone-to-base-station access link",
    "commandWord": "Explain",
    "objectiveIds": [
      "S2.14.A04"
    ],
    "syllabusMapping": [
      "S2.14"
    ],
    "cropSpec": {
      "ms": [
        [
          10,
          204,
          320
        ]
      ],
      "qp": [
        [
          11,
          60,
          104
        ],
        [
          11,
          249,
          508
        ]
      ]
    },
    "reading": [
      "The driver is using the cellular network. Explain the local radio link and how the area is organised; simply saying that the phone uses the internet does not describe the access method."
    ],
    "solution": [
      "The coverage area is organised into cells. A base station with an antenna serves a cell and transmits and receives data. The smartphone exchanges data with a serving base station using low-power radio signals. Multiple phones can communicate with that base station using allocated radio resources."
    ],
    "marking": [
      "The scheme awards up to four marks from its stated cell, tower, radio-link and multiple-device points. It refers to cells designed for line of sight; actual coverage depends on terrain, buildings, frequency and antenna design, so an ideal cell diagram is not a map of exact coverage boundaries."
    ],
    "mistakes": [
      "A cellular access link is not a direct radio transmission from the phone to the distant company server. The operator network carries data onward after the base station."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/12 · May/June 2025 · 6(b)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_s25_qp_12.pdf",
      "sourcePdf": "2025-May-June/9618_s25_qp_12.pdf",
      "sha256": "607722293452744ee7107b7365cac73664d51e0eb0f7487587d038e22467826e",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s2-e2d04-qp-1.png",
          "page": 11,
          "bbox": [
            45,
            60,
            560.27559,
            104
          ],
          "width": 1030,
          "height": 88,
          "sha256": "af3f5a3d160fbfb5a707d242e2a0641b7b14e727f931c8949b628c060fc83df9"
        },
        {
          "asset": "/assets/past-paper-questions/s2-e2d04-qp-2.png",
          "page": 11,
          "bbox": [
            45,
            249,
            560.27559,
            508
          ],
          "width": 1030,
          "height": 518,
          "sha256": "7a83c3ce8a2296654176027cdb109e9f0d9825f463650a0796f0c1949ca89893"
        }
      ]
    },
    "ms": {
      "filename": "9618_s25_ms_12.pdf",
      "sourcePdf": "2025-May-June/9618_s25_ms_12.pdf",
      "sha256": "0b0c41c4a7930853aaaaa00729d4ffd3a3e971948800220344c6ae6a31ec957a",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s2-e2d04-ms-1.png",
          "page": 10,
          "bbox": [
            45,
            204,
            560.32,
            320
          ],
          "width": 1030,
          "height": 232,
          "sha256": "3700e61ae40b10d37b478823fe0ee4c2315d17aab5f974f78628423ab4685d23"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-30",
      "cropSpecSha256": "c1411e010ed2c65cc2cefc9730127a244042d66589e05b5a3c15f2f2a45b7305",
      "reviewer": "Codex",
      "method": "Read original local QP/MS text and complete selected pages. Rendered unaltered PDF regions at 144 dpi, checked glyph boundaries, then visually inspected every final crop for complete parent context, task, answer and marks. Source PDF, crop specification and PNG SHA-256 identities recorded."
    }
  },
  {
    "id": "E2D05",
    "year": 2025,
    "series": "Oct/Nov",
    "component": 11,
    "parts": [
      {
        "part": "7(c)",
        "marks": 4
      }
    ],
    "marks": 4,
    "title": "Follow a URL from name lookup to the returned web page",
    "commandWord": "Explain",
    "objectiveIds": [
      "S2.16.A01",
      "S2.16.A02",
      "S2.16.A03"
    ],
    "syllabusMapping": [
      "S2.16"
    ],
    "cropSpec": {
      "ms": [
        [
          11,
          390,
          560
        ]
      ],
      "qp": [
        [
          12,
          60,
          78
        ],
        [
          12,
          527,
          791
        ]
      ]
    },
    "reading": [
      "Explain the steps after the browser receives a URL. Distinguish locating a server from asking that server for a particular resource. State when a cached result can avoid a new lookup."
    ],
    "solution": [
      "The browser separates the URL into its components, including the domain name and resource path. If no suitable cached name-to-address result is available, DNS is queried for the domain and returns a matching IP address. The browser establishes a connection to the web service at that address and requests the resource named by the path. The server returns the resource and the browser renders the page. A suitable lookup result may be cached for reuse."
    ],
    "marking": [
      "The scheme awards up to four accepted points from URL processing, cache use, DNS lookup and reply, connection, resource request and display. Four marks do not require every stage, but a full explanation helps distinguish their roles.",
      "The URL may select an encrypted HTTPS connection; details of encryption are not asked here. A usable cache entry can avoid a repeated DNS request, but DNS itself never returns the page content."
    ],
    "mistakes": [
      "Do not send the entire URL path to DNS as if it were a domain name. Do not describe DNS as hosting the page or assume that a DNS query must occur every time."
    ],
    "sourceType": "past-paper",
    "syllabusCode": "9618",
    "inserts": [],
    "sourceRef": "Cambridge 9618/11 · October/November 2025 · 7(c)",
    "accessUrl": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/",
    "qp": {
      "filename": "9618_w25_qp_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_qp_11.pdf",
      "sha256": "2fe1691a0eff789ac686121aac0ae4e7cb3852f9bd321a6542dc6b82fbedf616",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s2-e2d05-qp-1.png",
          "page": 12,
          "bbox": [
            45,
            60,
            560.27559,
            78
          ],
          "width": 1030,
          "height": 36,
          "sha256": "d82c5059fae5fc871989f28ca077fc3a9f6cc3f47591886ef6392b6f7ae7c2d1"
        },
        {
          "asset": "/assets/past-paper-questions/s2-e2d05-qp-2.png",
          "page": 12,
          "bbox": [
            45,
            527,
            560.27559,
            791
          ],
          "width": 1030,
          "height": 528,
          "sha256": "6cec68ead3a9c367b6a493c31376108492fae77890cf6123f6c0e218f5c65790"
        }
      ]
    },
    "ms": {
      "filename": "9618_w25_ms_11.pdf",
      "sourcePdf": "2025-Oct-Nov/9618_w25_ms_11.pdf",
      "sha256": "64b2928b1348598cd0be2cda8014405264f0a4303b73665633e4e297217056f4",
      "extracts": [
        {
          "asset": "/assets/past-paper-questions/s2-e2d05-ms-1.png",
          "page": 11,
          "bbox": [
            45,
            390,
            560.2,
            560
          ],
          "width": 1030,
          "height": 340,
          "sha256": "b4fd13c60a1f38385e52cfab0dc23bbd84f57bed500ba2de75a022f323eb2d25"
        }
      ]
    },
    "extractReview": {
      "status": "verified",
      "date": "2026-09-30",
      "cropSpecSha256": "ec288cae14c80b90ce07777ab2f3e056cb4fa23ee0e33debd4524f44ea959acd",
      "reviewer": "Codex",
      "method": "Read original local QP/MS text and complete selected pages. Rendered unaltered PDF regions at 144 dpi, checked glyph boundaries, then visually inspected every final crop for complete parent context, task, answer and marks. Source PDF, crop specification and PNG SHA-256 identities recorded."
    }
  }
];
for (const question of section2ExtraPapers) {
  if (question.extractReview.status !== 'verified' || digest(JSON.stringify(question.cropSpec)) !== question.extractReview.cropSpecSha256) throw new Error(`Unreviewed Section 2 source: ${question.id}`);
  if (question.parts.reduce((total, part) => total + part.marks, 0) !== question.marks) throw new Error(`Inconsistent Section 2 marks: ${question.id}`);
  for (const kind of ['qp', 'ms']) {
    const extracts = question[kind].extracts;
    if (extracts.length !== question.cropSpec[kind].length) throw new Error(`Missing Section 2 extract: ${question.id} ${kind}`);
    extracts.forEach((extract, index) => {
      const [page, top, bottom] = question.cropSpec[kind][index];
      if (extract.page !== page || extract.bbox[1] !== top || extract.bbox[3] !== bottom) throw new Error(`Changed Section 2 crop: ${question.id} ${kind}`);
      const bytes = readFileSync(new URL('../web' + extract.asset, import.meta.url));
      if (digest(bytes) !== extract.sha256) throw new Error(`Changed Section 2 image: ${extract.asset}`);
      if (bytes.readUInt32BE(16) !== extract.width || bytes.readUInt32BE(20) !== extract.height) throw new Error(`Changed Section 2 image dimensions: ${extract.asset}`);
    });
  }
}
