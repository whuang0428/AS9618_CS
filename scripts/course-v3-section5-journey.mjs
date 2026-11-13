import { osMaterials } from './course-v3-section5-os-materials.mjs';
import { translatorMaterials } from './course-v3-section5-translators.mjs';
import { comparisonMaterials, javaMaterials, ideMaterials } from './course-v3-section5-development.mjs';

const ids = (requirement, ...numbers) => numbers.map(number => `S5.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);

export const section5PaperObjectives = {
  E5C01: ids(2, 1, 2, 3, 4, 6),
  E039: ids(1, 2, 6),
  E040: ids(3, 1, 3),
  E041: ids(2, 1, 3, 4, 5),
  E042: ids(5, 1, 2),
  E043: ids(5, 1, 2),
  E044: ids(7, 1, 2, 5, 6),
  E5D01: ids(1, 4, 5),
  E5D02: [...ids(1, 3), ...ids(2, 6)],
  E5D03: ids(2, 1, 5),
  E5D04: ids(4, 2, 3),
  E5D05: ids(6, 1),
  E5D06: ids(7, 4),
};

export const section5PaperCoverageNotes = {
  E5C01: 'Matches five utilities to their purposes. File compression is a distractor.',
  E039: 'Tests memory and process management in multitasking. File, security and peripheral management need separate checks.',
  E040: 'Tests the definition of a program library and two explained developer benefits of a DLL.',
  E041: 'Requires one utility outside security and an explanation of its use. Formatting, defragmentation, disk repair and compression are possible choices; one response does not assess all four utilities.',
  E042: 'Tests why interpretation suits the stated development stage and compilation suits later distribution. It does not test assembly translation or the Java pipeline.',
  E043: 'Tests a translator choice justified from development requirements. The source scheme permits a suitably justified compiler or interpreter answer.',
  E044: 'Tests context-sensitive prompts, dynamic syntax checking, breakpoints and single stepping. Pretty-printing, folding, inspection and report windows require separate checks.',
  E5D01: 'Tests hardware and security management. The adjacent activities distinguish drivers, queues, buffers and permissions before this question.',
  E5D02: 'Combines file management with backup software. The file-management part revisits the preceding lesson; the backup part follows the recovery example.',
  E5D03: 'Tests compression and disk formatting. It does not assess every utility; the preceding examples distinguish formatting from repair and recovery.',
  E5D04: 'Tests the compiler and interpreter mechanisms in the question’s simplified model. Stopping and correction behaviour should be read in that stated model.',
  E5D05: 'Tests why a partial-compilation and interpretation route supports execution on different hardware platforms; the complete Java pipeline is taught before it.',
  E5D06: 'Excludes prettyprint as the chosen feature. The selected taught response assesses expanding and collapsing blocks. The scheme also permits an explained indentation or formatting feature, but this question is not counted as a direct assessment of the excluded pretty-printing objective.',
};

// Aliases point to individual visuals, including destinations from both previous editions.
function topic(number, title, items, mapping, papers = []) {
  if (items.length !== mapping.length) throw new Error(`Incomplete material mapping for ${number}`);
  const materials = items.map((item, index) => {
    const [unitKey, objectives, aliases = []] = mapping[index];
    return { ...item, unitKey, objectiveIds: objectives, aliases };
  });
  return {
    number, id: 's' + number.replaceAll('.', '-'), title, materials, papers,
    unitKeys: [...new Set(materials.map(m => m.unitKey))],
    objectiveIds: [...new Set(materials.flatMap(m => m.objectiveIds))],
  };
}

export const section5Journey = {
  28: {
    title: 'Operating systems', intro: 'Follow a print request, then examine five resources an operating system manages.',
    groups: [
      topic('5.1.1', 'Why a computer needs an operating system', osMaterials['5.1.1'], [
        ['S5.01-NEED', ids(1, 1), ['unit-1', 'os-common-services']],
      ]),
      topic('5.1.2', 'Operating system management', osMaterials['5.1.2'], [
        ['S5.01-MEMORY', ids(1, 2), ['unit-2', 'ram-allocation']],
        ['S5.01-FILES', ids(1, 3), ['unit-4', 'files-and-permissions']],
        ['S5.01-SECURITY', ids(1, 4)],
        ['S5.01-HARDWARE', ids(1, 5), ['unit-5', 'device-service']],
        ['S5.01-PROCESSES', ids(1, 6), ['unit-3', 'unit-6', 'process-turns']],
      ], ['E5D01']),
    ],
  },
  29: {
    title: 'Utilities and program libraries', intro: 'Choose a utility for a specific job, then follow a library call from the caller to the result.',
    groups: [
      topic('5.1.3', 'Utility software', osMaterials['5.1.3'], [
        ['S5.02-FORMAT', ids(2, 1), ['unit-1', 'prepare-and-check-storage']],
        ['S5.02-VIRUS', ids(2, 2), ['detect-and-recover']],
        ['S5.02-DEFRAG', ids(2, 3), ['hdd-placement']],
        ['S5.02-REPAIR', ids(2, 4), ['unit-4']],
        ['S5.02-COMPRESS', ids(2, 5), ['unit-5', 'compression-and-tool-choice']],
        ['S5.02-BACKUP', ids(2, 6), ['unit-6']],
      ], ['E5D02', 'E5D03', 'E041']),
      topic('5.1.4', 'Program libraries and DLL files', osMaterials['5.1.4'], [
        ['S5.03-REUSE', ids(3, 1, 2), ['unit-2', 'unit-7', 'library-routine']],
        ['S5.03-DLL', ids(3, 3), ['unit-3', 'unit-8', 'dll-sharing']],
        ['S5.03-REUSE', ids(3, 2, 3)],
      ]),
    ],
  },
  30: {
    title: 'Language translators', intro: 'Edit a small example and follow the instructions produced or executed by each translator.',
    groups: [topic('5.2.1', 'Assembler, compiler and interpreter', translatorMaterials, [
      ['S5.04-ASSEMBLER', ids(4, 1), ['unit-1', 'assembly-translation']],
      ['S5.04-COMPILER', ids(4, 2), ['unit-2', 'build-and-run']],
      ['S5.04-INTERPRETER', ids(4, 3), ['unit-3', 'interpreted-control-flow']],
    ], ['E5D04'])],
  },
  31: {
    title: 'Translation choices and Java', intro: 'Compare two translation routes and trace one Java class file to different processors.',
    groups: [
      topic('5.2.2', 'Compiler and interpreter compared', comparisonMaterials, [
        ['S5.05-CHOICE', ids(5, 1, 2), ['unit-1', 'translator-choice']],
      ], ['E042', 'E043']),
      topic('5.2.3', 'Partial compilation and interpretation', javaMaterials, [
        ['S5.06-JAVA', ids(6, 1), ['unit-2', 'java-two-stages']],
      ], ['E5D05']),
    ],
  },
  32: {
    title: 'Inside an IDE', intro: 'Use one price calculation to observe the editor, its diagnostics and the debugger.',
    groups: [topic('5.2.4', 'Integrated development environment features', ideMaterials, [
      ['S5.07-CODING', ids(7, 1), ['unit-1', 'editor-feedback']],
      ['S5.07-SYNTAX', ids(7, 2)],
      ['S5.07-PRESENTATION', ids(7, 3, 4), ['unit-3', 'format-and-fold']],
      ['S5.07-DEBUG', ids(7, 5, 6, 7, 8), ['unit-2', 'unit-4', 'debug-with-evidence']],
    ], ['E5D06', 'E044'])],
  },
};

export const section5Checkpoint = {
  id: 's5-1-checkpoint', title: '5.1 Past-paper checkpoint · 15 marks', papers: ['E5C01', 'E039', 'E040'],
};
export const section5Route = sequence => sequence === 29
  ? [...section5Journey[sequence].groups, section5Checkpoint] : section5Journey[sequence].groups;

// Old links may point to a question that is now in another lesson.
export const movedBookmarks = {
  28: { e039: '../lesson-029/#e039', 'process-turns--papers': '../lesson-029/#e039' },
  30: { e042: '../lesson-031/#e042' },
};
export const oldPaperStages = {
  'device-service--papers': 'e5d01', 'detect-and-recover--papers': 'e5d02',
  'compression-and-tool-choice--papers': 'e5d03', 'dll-sharing--papers': 'e040',
  'interpreted-control-flow--papers': 'e5d04', 'translator-choice--papers': 'e042',
  'java-two-stages--papers': 'e5d05', 'format-and-fold--papers': 'e5d06', 'debug-with-evidence--papers': 'e044',
};
