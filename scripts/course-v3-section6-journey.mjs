import { section6Materials } from './course-v3-section6-materials.mjs';

const ids = (requirement, ...numbers) => numbers.map(number => `S6.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);

function topic(number, title, mapping) {
  const items = section6Materials[number];
  if (items.length !== mapping.length) throw new Error(`Incomplete Section 6 material mapping for ${number}`);
  const materials = items.map((item, index) => {
    const [unitKey, objectiveIds, aliases = []] = mapping[index];
    return { ...item, unitKey: `S6-${unitKey}`, objectiveIds, aliases };
  });
  return {
    number, id: `s${number.replaceAll('.', '-')}`, title, materials, papers: [],
    unitKeys: [...new Set(materials.map(item => item.unitKey))],
    objectiveIds: [...new Set(materials.flatMap(item => item.objectiveIds))],
  };
}

export const section6Journey = {
  33: {
    title: 'Security, privacy and integrity',
    intro: 'Start with three changes to a school record, then distinguish the two targets that need protection.',
    groups: [
      topic('6.1.1', 'Security, privacy and integrity of data', [
        ['CONCEPTS', ids(1, 1), ['unit-1']],
        ['CONCEPTS', ids(1, 1)],
        ['CONCEPTS', ids(1, 1)],
        ['CONCEPTS', ids(1, 1)],
      ]),
      topic('6.1.2', 'Why protect both data and computer systems?', [
        ['SYSTEM', ids(2, 1), ['unit-2']],
        ['SYSTEM', ids(2, 1)],
      ]),
    ],
  },
  34: {
    title: 'Security measures and authentication',
    intro: 'Follow the mechanism of each measure and identify the specific risk it addresses.',
    groups: [topic('6.1.3', 'Security measures and authentication techniques', [
      ['ACCOUNTS', ids(3, 1), ['unit-1']],
      ['ACCOUNTS', ids(3, 1)],
      ['SIGNATURE', ids(3, 2), ['unit-2']],
      ['SIGNATURE', ids(3, 2)],
      ['BIOMETRIC', ids(3, 3), ['unit-3']],
      ['FIREWALL', ids(3, 4), ['unit-4']],
      ['ANTIVIRUS', ids(3, 5), ['unit-5']],
      ['ANTISPYWARE', ids(3, 6), ['unit-6']],
      ['LAYERS', ids(3, 7), ['unit-7']],
      ['LAYERS', ids(3, 7, 8)],
    ])],
  },
  35: {
    title: 'Threats and suitable precautions',
    intro: 'Trace how each threat reaches its target, then explain where a precaution interrupts it.',
    groups: [
      topic('6.1.4', 'Threats to computer and data security', [
        ['VIRUS', ids(4, 1), ['unit-1']],
        ['SPYWARE', ids(4, 2), ['unit-2']],
        ['HACKING', ids(4, 3), ['unit-3']],
        ['PHISHING', ids(4, 4), ['unit-4']],
        ['PHARMING', ids(4, 5), ['unit-5']],
      ]),
      topic('6.1.5', 'Reduce the risks posed by threats', [
        ['RISK', ids(5, 1), ['unit-6']],
      ]),
    ],
  },
  36: {
    title: 'Protect the data · encryption and access rights',
    intro: 'Protect a copied message and control permitted operations, then complete the Data Security checkpoint.',
    groups: [topic('6.1.6', 'Encryption and access rights', [
      ['ENCRYPTION', ids(6, 1), ['unit-1']],
      ['ENCRYPTION', ids(6, 1)],
      ['RIGHTS', ids(6, 2), ['unit-2']],
      ['RIGHTS', ids(6, 2)],
    ])],
  },
  37: {
    title: 'Data integrity · validation and verification',
    intro: 'Separate acceptable input from accurate copying, then follow checking information from sender to receiver.',
    groups: [
      topic('6.2.1', 'Validation and verification', [
        ['VALIDATION', ids(7, 1, 9), ['unit-1']],
        ['VALIDATION', ids(7, 1, 9)],
        ['VALIDATION', ids(7, 1, 9)],
      ]),
      topic('6.2.2', 'Seven methods of data validation', [
        ['BOUNDS', ids(7, 2), ['unit-2']],
        ['PATTERNS', ids(7, 3), ['unit-3']],
        ['PATTERNS', ids(7, 4)],
        ['PRESENCE', ids(7, 5), ['unit-4']],
        ['PRESENCE', ids(7, 6)],
        ['BOUNDS', ids(7, 7)],
        ['CHECK-DIGIT', ids(7, 8, 9), ['unit-5']],
      ]),
      topic('6.2.3', 'Verify data entry and data transfer', [
        ['ENTRY', ids(8, 1, 2, 5), ['unit-6']],
        ['BYTE-PARITY', ids(8, 3, 5), ['unit-7']],
        ['BLOCK-PARITY', ids(8, 3, 5), ['unit-8']],
        ['CHECKSUM', ids(8, 4, 5), ['unit-9']],
      ]),
    ],
  },
};

export const section6SecurityCheckpoint = {
  id: 's6-security-checkpoint', title: 'Data Security checkpoint · 20 marks',
  papers: ['E045', 'E6S01', 'E6S02', 'E6S03', 'E6S04', 'E6S05'], checkpoint: true,
};
export const section6IntegrityCheckpoint = {
  id: 's6-integrity-checkpoint', title: 'Data Integrity checkpoint · 17 marks',
  papers: ['E6I01', 'E049', 'E6I02', 'E6I03', 'E6I04'], checkpoint: true,
};

export const section6Route = page => [
  ...section6Journey[page].groups,
  ...(page === 36 ? [section6SecurityCheckpoint] : page === 37 ? [section6IntegrityCheckpoint] : []),
];

// Exact diagrams remain editable HTML/SVG; this credited image supplies a concrete reference.
export const section6TeachingAssets = ['/assets/course-v3/section-6/nist-biometric-fingerprints.jpg'];
