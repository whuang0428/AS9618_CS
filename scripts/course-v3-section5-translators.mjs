import models from './course-v3-section5-translator-models.js';
import ui from './course-v3-section5-translators.js';

const examples = [
  {
    id: 'assembler',
    title: 'Assembler · from assembly language to machine code',
    introduction: 'LDD FIRST names an operation and a labelled memory location. Assemble the listing in two passes, then move the program to start address 10. Which byte of the first instruction changes?',
    reading: 'At start address 0, pass 1 assigns FIRST to address 4. In pass 2 the teaching CPU’s LDD opcode is 00000001 and address 4 is 00000100. The assembler translates LDD FIRST into the machine-code instruction 00000001 00000100. At start address 10, FIRST moves to 14, so the second byte becomes 00001110. The binary encodings belong to this model CPU. The assembler produces machine-code instructions and stores the declared data values; the processor executes the instructions later.',
  },
  {
    id: 'compiler',
    title: 'Compiler · translate the whole program, then run its executable',
    introduction: 'Compile the whole high-level program for the teaching CPU, then run its executable file. The steps show how this example is translated; the program runs only after compilation finishes. After the first run, change the amount to 4 and run the old build. Predict what will change when you compile again.',
    reading: 'The compiler produces a test instruction that branches out of the loop, the body instructions and a jump back to the test. It records the exit address when it reaches ENDWHILE and finishes the executable with OUT and HALT. Running the executable adds 2 three times and outputs 6. Editing the source to add 4 still leaves the old executable available. A successful rebuild makes the next run output 12. A missing operand prevents the new build from completing.',
  },
  {
    id: 'interpreter',
    title: 'Interpreter · follow one source statement at a time',
    introduction: 'Use the same loop as the compiler. Follow each statement and watch the values before moving on. Try a loop limit of 0, then select Divide by zero and compare limits 0 and 3.',
    reading: 'With a limit of 3, the path starts at lines 1, 2, 3, 4, 5, 6 and returns to line 3. Count takes the values 0, 1, 2 and 3 at the four tests. The body executes three times and OUTPUT displays 6. A limit of 0 takes the path 1, 2, 3, 7 and outputs 0. A division by zero on line 4 stops execution only when control reaches that line. This interpreter translates and executes one statement at a time and does not produce a separate executable file.',
  },
];

export const translatorMaterials = examples.map(({ id, title, introduction, reading }) => {
  const initial = models.create(id);
  const html = `<section class="s5-translator" data-s5-translator="${id}" aria-label="${ui.escape(title)}">
    <p class="s5t-intro">${ui.escape(introduction)}</p>
    ${ui.controls(id)}
    <p class="s5t-notice" data-s5t-notice role="status" aria-live="polite">${ui.escape(ui.notice(initial))}</p>
    <div data-s5t-panels>${ui.panels(initial)}</div>
    <noscript><p class="s5t-fallback">${ui.escape(reading)}</p></noscript>
  </section>`;
  return { id, title, html };
});
