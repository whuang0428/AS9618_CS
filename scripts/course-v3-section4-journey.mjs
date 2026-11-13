import { architectureLessons } from './course-v3-section4-architecture-lessons.mjs';
import { instructionLessons } from './course-v3-section4-instruction-lessons.mjs';
import { section4Checkpoints, section4NewPaperObjectives, section4NewPaperNotes } from './course-v3-section4-checkpoints.mjs';

const ids = (requirement, ...numbers) => numbers.map(number =>
  `S4.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);

// These mappings describe the selected question parts, not every objective in
// their broad syllabus requirement. Preserve the original QP/MS source metadata.
export const section4PaperObjectives = {
  ...section4NewPaperObjectives,
  E029: ids(2, 2, 3, 4, 6),
  E030: ids(6, 1, 3, 4),
  E031: ids(5, 4, 5),
  E032: ids(7, 2),
  E033: [...ids(2, 3, 4), ...ids(7, 1, 2)],
  E034: ids(8, 4, 5, 6),
  E035: ids(10, 1),
  E036: [...ids(11, 1), ...ids(13, 1, 2, 3, 4, 5, 6), ...ids(14, 1, 2)],
  E037: ids(15, 5, 7, 10, 11),
  E038: ids(15, 5, 6, 7),
  E4D01: [...ids(13, 1, 5), ...ids(14, 1, 2)],
  E4D02: ids(15, 1, 3, 4),
  E4D03: ids(15, 1, 3, 4, 13),
};

export const section4PaperCoverageNotes = {
  ...section4NewPaperNotes,
  E029: 'Tests PC, MAR, MDR and IX; the register table and data-flow model cover the remaining roles.',
  E030: 'Compares HDMI and VGA for the stated display and audio requirements; does not assess USB.',
  E031: 'Tests clock frequency and cache; processor type, cores and bus width need separate checks.',
  E032: 'Tests two specific register transfers, not a complete fetch-execute description.',
  E033: 'Tests MAR and MDR roles during instruction fetch; execution details are supporting explanation.',
  E034: 'Tests interrupt detection and handling, including priority, saved state, ISR and restoration; does not assess every possible cause.',
  E035: 'Tests actions associated with each assembler pass; applying both passes to a complete source program is checked separately.',
  E036: 'Combined trace using immediate, direct and indexed operands, movement, arithmetic, comparison, branches and character I/O. It samples the instruction objectives; it does not test every mnemonic, indirect addressing or relative addressing.',
  E037: 'Tests immediate AND, direct XOR and immediate OR; the other operand forms are checked in the teaching and original tasks.',
  E038: 'Tests a least-significant-bit mask for oddness; it does not assess the full conditional device-control program.',
  E4D01: 'Tests immediate, indirect and indexed loads with the supplied IX; it does not assess all data-movement instructions or relative addressing.',
  E4D02: 'Tests logical versus arithmetic right-shift filling; cyclic and left-shift cases need separate checks.',
  E4D03: 'Tests an eight-bit logical left shift by two places; it does not assess all binary-shift rules.',
};

// Old concept and unit names are public bookmarks. Keep these with their new topic.
const topics = {
  '4.1.1': [ids(1, 1), ['memory-addresses', 'unit-1']],
  '4.1.2': [ids(1, 1), ['stored-instructions']],
  '4.1.3': [ids(2, 1), ['unit-3']],
  '4.1.4': [ids(2, 2, 3, 4, 5, 6, 7, 8), ['register-jobs']],
  '4.1.5': [[...ids(3, 1), ...ids(4, 1)], ['cpu-team', 'unit-2']],
  '4.1.6': [ids(5, 1, 2), ['performance-conditions', 'unit-4']],
  '4.1.7': [[...ids(4, 1), ...ids(5, 3)], ['bus-capacity', 'unit-2']],
  '4.1.8': [ids(5, 4), []],
  '4.1.9': [ids(5, 5), ['cache-reuse', 'unit-3']],
  '4.1.10': [ids(6, 1, 2), ['unit-5']],
  '4.1.11': [ids(6, 1, 3), []],
  '4.1.12': [ids(6, 1, 4), []],
  '4.1.13': [ids(6, 1, 2, 3, 4), ['peripheral-ports']],
  '4.1.14': [ids(7, 1, 2), ['fetch-an-instruction', 'execute-the-calculation', 'unit-1', 'unit-2']],
  '4.1.15': [ids(8, 1, 2), ['interrupt-events', 'unit-1']],
  '4.1.16': [ids(8, 3), []],
  '4.1.17': [ids(8, 4, 5, 6), ['save-service-return', 'unit-2']],
  '4.2.1': [[...ids(9, 1), ...ids(15, 15, 16)], ['readable-instructions', 'label-addresses', 'unit-1', 'unit-2']],
  '4.2.2': [[...ids(10, 1, 2), ...ids(15, 15, 16)], ['two-assembler-passes', 'unit-3']],
  '4.2.3': [[...ids(12, 1, 2, 3, 4, 5), ...ids(13, 1, 2, 3, 4)], ['instruction-families', 'arithmetic-characters', 'compare-and-branch', 'unit-2', 'unit-3', 'unit-4', 'unit-7']],
  '4.2.4': [[...ids(11, 1), ...ids(13, 1, 3, 5, 6), ...ids(14, 1, 2)], ['immediate-direct', 'indirect-indexed', 'relative-and-movement', 'complete-loop-trace', 'unit-1', 'unit-5', 'unit-6']],
  '4.3.1': [ids(15, 1, 3, 4, 13, 14), ['logical-shifts', 'unit-1']],
  '4.3.2': [ids(15, 1, 3, 4), ['signed-cyclic-shifts']],
  '4.3.3': [ids(15, 5, 6, 7, 8, 9, 10, 11, 12), ['bitwise-operands', 'unit-2']],
  '4.3.4': [ids(15, 2, 5, 6, 15, 16), ['test-and-control', 'unit-3']],
};
const pageTitles = {
  21: 'CPU architecture and the stored program',
  22: 'Processor performance and peripheral ports',
  23: 'The fetch–decode–execute cycle',
  24: 'Interrupts and service routines',
  25: 'Machine code and the assembler',
  26: 'Instructions and addressing modes',
  27: 'Bit manipulation and device control',
};
const checkpointAfter = {
  '4.1.5': 'architecture', '4.1.9': 'performance', '4.1.13': 'ports',
  '4.1.17': 'interrupts', '4.2.4': 'assembly', '4.3.4': 'bits',
};

export const section4Journey = Object.fromEntries(
  Object.entries({ ...architectureLessons, ...instructionLessons }).map(([page, sections]) => {
    const groups = sections.map(section => {
      const [objectiveIds, aliases] = topics[section.number];
      return { ...section, id: section.number, objectiveIds, aliases, checkpoint: checkpointAfter[section.number] };
    });
    return [page, { title: pageTitles[page], groups }];
  })
);

// Prior paper links on these pages continue to work even when a checkpoint moved.
export const section4MovedBookmarks = {
  22: { 'bus-transactions': '../lesson-021/#4.1.5', 'unit-1': '../lesson-021/#4.1.5' },
  25: {
    e035: '../lesson-026/#e035', 'two-assembler-passes--papers': '../lesson-026/#e035',
    'past-paper-questions': '../lesson-026/#checkpoint-assembly', 'original-exam-style-question': '../lesson-026/#checkpoint-assembly',
  },
};
export const section4LegacyPaperGroups = {
  E029: 'register-jobs', E030: 'peripheral-ports', E031: 'performance-conditions',
  E032: 'execute-the-calculation', E034: 'save-service-return', E4D01: 'indirect-indexed',
  E036: 'complete-loop-trace', E4D02: 'signed-cyclic-shifts', E037: 'bitwise-operands', E038: 'test-and-control',
};
export function section4Route(sequence) {
  const items = [];
  for (const group of section4Journey[sequence].groups) {
    items.push(group);
    if (group.checkpoint) {
      const checkpoint = section4Checkpoints[group.checkpoint];
      items.push({ id: `checkpoint-${group.checkpoint}`, title: checkpoint.title, kind: 'checkpoint', papers: checkpoint.papers });
    }
    if (group.number === '4.1.14') items.push({ id: 'fde-review', title: 'FDE cycle review', kind: 'review', papers: ['E032', 'E033'] });
  }
  return items;
}
