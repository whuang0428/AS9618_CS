// Additional original Section 4 questions. Source PDFs remain in the teacher archive.
// Crop geometry and original/image hashes make every displayed extract verifiable.
import { section4NewPaperObjectives } from './course-v3-section4-checkpoints.mjs';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const digest = value => createHash('sha256').update(value).digest('hex');
// Page numbers are one-based. Crop boxes are unscaled PDF points.
const checkpointSources = {
  E4C01: {
    season: 's25', component: 12, part: '1(a)', marks: 3,
    cropSpecSha256: 'b6ebcf45f24dd038e9f580450f5b3bfd051e34e120ee62ac00526bbd28935f13',
    qp: {
      sha256: '607722293452744ee7107b7365cac73664d51e0eb0f7487587d038e22467826e',
      extracts: [
        { page: 2, bbox: [45, 60, 557, 693], width: 1024, height: 1266,
          sha256: '01e0a6c8f61add856404144f4bb18825234caf18e899031939c9745d4bae39cb' },
      ],
    },
    ms: {
      sha256: '0b0c41c4a7930853aaaaa00729d4ffd3a3e971948800220344c6ae6a31ec957a',
      extracts: [
        { page: 4, bbox: [45, 85, 557, 313], width: 1024, height: 456,
          sha256: 'cf367da5189fdbc61527fb223fa06d7fe281bf367e42d8fbb14524a097944d53' },
      ],
    },
  },
  E4C02: {
    season: 'w23', component: 13, part: '9(a)(ii)', marks: 2,
    cropSpecSha256: '6f194a600c3f8a1eada4043a1f3518374540b1ff268e7552a27879503ca34a6f',
    qp: {
      sha256: '90c2b773f5d16f13ca83a637ca047c2afa31a7a7dad0664fe8522616a9ab3a4e',
      extracts: [
        { page: 13, bbox: [45, 55, 557, 107], width: 1024, height: 104,
          sha256: 'fd1b1590837deda110c1b12f0162a36fcd28e6e1a90267ac505406341ebccafc' },
        { page: 13, bbox: [45, 250, 557, 410], width: 1024, height: 320,
          sha256: '435e06af507ff1f00e1c6a4ef32dcfeb0c4fc57b773d17a266590f2a6b04a9e0' },
      ],
    },
    ms: {
      sha256: 'c658537dc541755e6829581b37db83a5f9ae4958d765a885732383b5015d12f6',
      extracts: [
        { page: 9, bbox: [45, 518, 557, 637], width: 1024, height: 238,
          sha256: '5687179b76adf4e34967f2b606f87a32aa4ed09e39537f76ceb89531cd7fe214' },
      ],
    },
  },
  E4C03: {
    season: 'w23', component: 11, part: '5(c)(ii)', marks: 5,
    cropSpecSha256: '0064db13ffb3de62e322b33986beb6aa440bf70ec36ae42cb13dfc247f677caa',
    qp: {
      sha256: '0aca70a2e79414c1683c81120a9cd3144c4a5b9ad7f411cd95fcd7089d702e69',
      extracts: [
        { page: 10, bbox: [45, 55, 557, 81], width: 1024, height: 52,
          sha256: 'da8e5d192c42d33c4a8374d28367ff2ab1a50d2e897980918ea14bbffb3d34f7' },
        { page: 10, bbox: [45, 198, 557, 527], width: 1024, height: 658,
          sha256: '0de7bd41da5d611632cf63ba4b7ecf69a4f79e74932861b5cef2de6297e3b4bb' },
      ],
    },
    ms: {
      sha256: '7d42b9e1b7ad513fa40cc2b5ba566b8f3dd4cdded6c0cd661e13f5388aa21348',
      extracts: [
        { page: 8, bbox: [45, 85, 557, 261], width: 1024, height: 352,
          sha256: '1c3b5497a59d912ff3578657271713a657dc3be9b8ec3b14fa6c704daa7041a3' },
      ],
    },
  },
  E4C04: {
    season: 's25', component: 11, part: '6(a)(iii)', marks: 2,
    cropSpecSha256: '76b2fd6ddb8a1723f9be55fd67c947e652717a2e0c6de8c715c0f28618caf212',
    qp: {
      sha256: 'bdf74d4f15c620bde7e6fe65f17828bc85c89490ebb9a1a337e2cd0596f4b39a',
      extracts: [
        { page: 10, bbox: [45, 60, 557, 242], width: 1024, height: 364,
          sha256: 'b08b1ff1f0f31cfe562afba2cc910fb793b282983f565413a48305585e324759' },
        { page: 11, bbox: [45, 60, 557, 212], width: 1024, height: 304,
          sha256: 'ad80d94553ea12df66cfa793aa4c72d456b5e55ea057f1c1412dc0f7361f08d1' },
      ],
    },
    ms: {
      sha256: '8bf543ddd26e74224f40fd909152e300b9b711eb3644d7e8d07c1d5c3f07521b',
      extracts: [
        { page: 10, bbox: [45, 381, 557, 514], width: 1024, height: 266,
          sha256: '8cd3f94adff2c07885db0f5fec7c451a69c107039e7c768b1300eb4c39ee5c61' },
      ],
    },
  },
  E4C05: {
    season: 'w24', component: 11, part: '3(b)(ii)', marks: 3,
    cropSpecSha256: 'd24b1f92a139f5810d86aba75adf2bccd078a234ec71d2a7a93c3376c8dac19c',
    qp: {
      sha256: '94d1aed5bc14f0a3fd60da0e932cf5b8b40bd8342550ff0254c19afe89001ef7',
      extracts: [
        { page: 7, bbox: [45, 408, 557, 653], width: 1024, height: 490,
          sha256: 'c716bd5b42f73b876897bb2efc114b6d643ef4001cdd57b47c161350a9a4cc4d' },
      ],
    },
    ms: {
      sha256: 'e9674e802b5b850509834b1ab1b84008740729d668ae844e9b0142607dbdf1a2',
      extracts: [
        { page: 6, bbox: [45, 85, 557, 231], width: 1024, height: 292,
          sha256: '695457589b5fb774b34db2f7b589ada426c8ac9bcbf2a8dbed3e10544fc4cfc4' },
      ],
    },
  },
  E4C06: {
    season: 's25', component: 13, part: '2(c)', marks: 2,
    cropSpecSha256: 'd4647ddc5f01a640ade2d2b040d20f33afbd47a1cb31fb6689c4abd32f79faed',
    qp: {
      sha256: 'b341d6829ba4baf47dbd8d272cb7fd49b448d04a2a16a028e4fb3178c3c64554',
      extracts: [
        { page: 4, bbox: [45, 603, 557, 770], width: 1024, height: 334,
          sha256: '2434036c3ea91e792beb6c4a6073463a1d4628db44d58147cf024b6a6e12593f' },
      ],
    },
    ms: {
      sha256: 'a334bec016c753451ae53c56fdfc0b0758b8f2b5a7a06a86307ac100bb7ebd8e',
      extracts: [
        { page: 5, bbox: [45, 437, 557, 571], width: 1024, height: 268,
          sha256: '231d5268761b8549c26c4fd4907caeb81e22fce55f75987d782f1098e4473f24' },
      ],
    },
  },
  E4C07: {
    season: 'w23', component: 13, part: '9(c)', marks: 1,
    cropSpecSha256: '83c4a2109af1a5c283117242ba677b2fa635322eca73d57ebac921a5c1cdf511',
    qp: {
      sha256: '90c2b773f5d16f13ca83a637ca047c2afa31a7a7dad0664fe8522616a9ab3a4e',
      extracts: [
        { page: 14, bbox: [45, 499, 557, 605], width: 1024, height: 212,
          sha256: '7ac284378eb5299d66f479e84e08c6f7e8596116275ce07e7300eb8596f621e3' },
      ],
    },
    ms: {
      sha256: 'c658537dc541755e6829581b37db83a5f9ae4958d765a885732383b5015d12f6',
      extracts: [
        { page: 10, bbox: [45, 308, 557, 428], width: 1024, height: 240,
          sha256: 'd913f825ce84541e043f52467144e9f1a0c87e60a94e0993892664c13c439b29' },
      ],
    },
  },
  E4C08: {
    season: 'w23', component: 13, part: '9(d)', marks: 3,
    cropSpecSha256: '218206c0a08ae8923fc6679af1ab87bd8eeede93afb8d0bfa79106fdef4710e4',
    qp: {
      sha256: '90c2b773f5d16f13ca83a637ca047c2afa31a7a7dad0664fe8522616a9ab3a4e',
      extracts: [
        { page: 15, bbox: [45, 55, 557, 597], width: 1024, height: 1084,
          sha256: '6bd46c0640a7db63ce9ca7593c9d338d5e88be6c2296fc5b56d4955ee5d31cfc' },
      ],
    },
    ms: {
      sha256: 'c658537dc541755e6829581b37db83a5f9ae4958d765a885732383b5015d12f6',
      extracts: [
        { page: 10, bbox: [45, 425, 557, 504], width: 1024, height: 158,
          sha256: '2c7d349da03d1d3ae8c02b25e9b3698f06c839af4d7ab7537fdea7bf6b3e7958' },
      ],
    },
  },
};

const checkpointGuidance = {
  E4C01: {
    title: 'Correct the statements about the processor',
    commandWord: 'Complete',
    reading: 'For each statement, decide what the component holds or which bus it uses. Then pair an incorrect statement number with a correction.',
    solution: { type: 'table', headers: ['Statement', 'Correction'], rows: [
      ['1', 'PC holds the memory address from which the CPU will fetch the next instruction.'],
      ['3', 'The CU sends control signals to components over the control bus.'],
      ['4', 'MDR temporarily holds the value being read or written at the address selected by MAR.'],
    ] },
    marking: 'Each row earns one mark when both its statement number and its correction are accurate.',
    mistakes: 'Copying an instruction into PC would leave the CPU without the address for its next fetch. Reading the addressed memory location supplies MDR with its contents.',
  },
  E4C02: {
    title: 'Compare general-purpose and special-purpose registers',
    commandWord: 'Identify',
    reading: 'Give two paired differences. Compare the registers’ jobs in one sentence and how instructions use them in another.',
    solution: 'A program can reuse a general-purpose register for different temporary values. Each special-purpose register has a designated job, such as holding the next instruction address. Many instructions can use a general-purpose register as an operand. Access to a special-purpose register is tied to particular instructions or processor operations.',
    marking: 'One comparison concerns the assigned role and a second concerns which instructions can use the register. Each distinct comparison is worth one mark.',
    mistakes: 'Giving PC and MAR as two examples illustrates two special roles. To earn both marks, compare the two register classes in two different ways.',
  },
  E4C03: {
    title: 'Explain the speed of two cores on the same workload',
    commandWord: 'Explain',
    reading: 'The clock frequency per core is held at 2.1 GHz. Consider how much work the program can divide, what information each core needs and how quickly memory can supply it.',
    solution: 'If the next calculation depends on the result of the previous one, one core can be idle during that part. Even where both cores have work, they may spend time passing results between them and waiting for shared data. Both may also wait when the memory system cannot supply their requests quickly enough. Adding a core therefore need not halve the running time.',
    marking: 'Link each cause to its effect. Limited parallel work can leave one core idle. Communication consumes time, and slow memory can delay both cores. The scheme allows up to five marks.',
    mistakes: 'Each core still uses a 2.1 GHz clock. Adding the frequencies does not give the speed of a serial instruction sequence.',
  },
  E4C04: {
    title: 'Explain how bus width affects a computer',
    commandWord: 'Explain',
    reading: 'The specifications belong to two complete computers. Focus on the two meanings of width: bits moved by a data transfer and bits available to select an address.',
    solution: 'With equal transfer timing, a wider data bus moves more bits at once. A fixed block that previously needed multiple transfers can then arrive in fewer transfers, reducing time spent waiting for data. A wider address bus can encode more distinct addresses and therefore select more memory locations directly.',
    marking: 'The scheme awards up to two points. For the data bus, connect the larger amount per transfer to its effect on waiting. For the address bus, connect additional address bits to the number of directly selectable locations.',
    mistakes: 'A wider address bus increases the range of addresses. The data-bus width determines how many bits of the stored value travel together.',
  },
  E4C05: {
    title: 'Identify the port and explain automatic device recognition',
    commandWord: 'Explain',
    reading: 'The key event is plugging a flash drive into a running computer. Follow the connection from detection to the driver that lets the OS use the device.',
    solution: 'Use a USB port. The host detects an electrical change as the drive is attached. During enumeration it obtains identifying information from the device. The OS uses that information to select and load an appropriate driver.',
    marking: 'Naming USB earns one mark. Two further marks are available for stages in detection and recognition, such as sensing the voltage change and receiving the device identification.',
    mistakes: 'Describing a plug as reversible or naming its shape does not explain how the computer recognises a drive.',
  },
  E4C06: {
    title: 'Explain how HDMI connects a display',
    commandWord: 'Explain',
    reading: 'Consider the kind of signal reaching the monitor and the content one cable can carry.',
    solution: 'The computer transmits a stream of digital video to the monitor. Audio for its speakers can travel in the same cable. HDMI provides the bandwidth needed to carry these streams.',
    marking: 'Two distinct supported details earn the two marks, such as carrying video and audio together and transmitting them digitally as a stream.',
    mistakes: 'A plug shape says how the cable fits. The question asks how the interface transfers information to the peripheral.',
  },
  E4C07: {
    title: 'Give a software cause of an interrupt',
    commandWord: 'State',
    reading: 'Choose an event caused by the instructions the program is executing.',
    solution: 'A program attempts an integer division with a zero divisor. This arithmetic error can trigger an exception that transfers control to a handler.',
    marking: 'One appropriate software-generated event earns the single mark. Division by zero is an example accepted in this question.',
    mistakes: 'A key press originates from a hardware device and would answer a different question.',
  },
  E4C08: {
    title: 'Complete the interrupt-handling sequence',
    commandWord: 'Write',
    reading: 'Read the fixed stages first. Identify the decision before context is saved, the action that starts the handler, and the action after registers have been restored.',
    solution: { type: 'table', headers: ['Gap', 'Letter', 'Why it fits here'], rows: [
      ['2', 'D', 'Identify the source and check its priority before deciding whether to service it.'],
      ['4', 'A', 'Load the ISR start address into PC so that the next fetch enters the handler.'],
      ['6', 'B', 'With the interrupted state restored, enable lower-priority requests again.'],
    ] },
    marking: 'The official scheme awards one mark per letter in its correct position. The order is D, A, B.',
    mistakes: 'An ISR is a routine in memory. Loading its start address into PC initiates the transfer of control.',
  },
};

function checkpointQuestion([id, source]) {
  const { season, component, part, marks } = source;
  const year = 2000 + Number(season.slice(1));
  const summer = season[0] === 's';
  const objectiveIds = section4NewPaperObjectives[id];
  const detail = checkpointGuidance[id];

  function document(kind) {
    const filename = `9618_${season}_${kind}_${component}.pdf`;
    return {
      filename,
      sourcePdf: `${year}-${summer ? 'May-June' : 'Oct-Nov'}/${filename}`,
      sha256: source[kind].sha256,
      extracts: source[kind].extracts.map((extract, index) => ({
        ...extract, asset: `/assets/past-paper-questions/s4-${id.toLowerCase()}-${kind}-${index + 1}.png`,
      })),
    };
  }

  const cropSpec = {};
  for (const kind of ['ms', 'qp']) {
    cropSpec[kind] = source[kind].extracts.map(({ page, bbox }) => [page, bbox[1], bbox[3]]);
  }
  return {
    id, year, component, marks, title: detail.title, commandWord: detail.commandWord,
    reading: [detail.reading], solution: [detail.solution], marking: [detail.marking], mistakes: [detail.mistakes],
    sourceType: 'past-paper', syllabusCode: '9618', series: summer ? 'May/June' : 'Oct/Nov',
    parts: [{ part, marks }], objectiveIds,
    syllabusMapping: [...new Set(objectiveIds.map(objective => objective.split('.').slice(0, 2).join('.')))],
    inserts: [], sourceRef: `Cambridge 9618/${component} · ${summer ? 'May/June' : 'October/November'} ${year} · ${part}`,
    accessUrl: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/',
    qp: document('qp'), ms: document('ms'), cropSpec,
    extractReview: {
      status: 'verified', date: '2026-11-11', cropSpecSha256: source.cropSpecSha256, reviewer: 'Codex',
      method: 'Matched original QP and MS parts and marks. Rendered the registered regions at 144 dpi, checked their boundaries against PDF glyphs and visually reviewed all 19 extracts including shared stems and specifications.',
    },
  };
}

export const section4ExtraPapers = [
  ...Object.entries(checkpointSources).map(checkpointQuestion),
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
