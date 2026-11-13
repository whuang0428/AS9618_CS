// Each IDE picture uses the same order: three items at 4 each, plus a delivery fee of 2.
const figure = (label, body, caption) => `<figure class="s5-visual s5-dev-figure" aria-label="${label}">${body}<figcaption>${caption}</figcaption></figure>`;
const code = text => `<pre tabindex="0"><code>${text}</code></pre>`;
const choice = (prompt, answer) => `<details class="s5-choice s5-dev-choice"><summary>${prompt}</summary><p>${answer}</p></details>`;
const comparison = [
  ['Translation', 'Build the source into native target code before execution.', 'Translate and execute statements as control reaches them. A loop can revisit a statement.'],
  ['Error feedback', 'A build can report several source errors together. Fix them to obtain a new executable.', 'Stops at the first error reached in this model. Earlier statements may already have produced output.'],
  ['After an edit', 'Rebuild to include the change. An old executable still runs the old version.', 'Run the edited source immediately to try a correction.'],
  ['Execution speed', 'Repeated runs use the existing native code, avoiding repeated translation.', 'Translation during execution adds overhead. Actual speed depends on the implementation and the program.'],
  ['Distribution', 'Supply a build for the target platform and its required libraries. The user needs neither source nor compiler.', 'Supply the source and a compatible interpreter. The same source can run on several supported platforms.'],
  ['Typical use', 'Release a finished application for repeated use on a known platform.', 'Try small changes, debug a calculation or run a short script.'],
];
const compareTable = `<div class="s5-comparison s5-table-scroll" role="region" aria-label="Compiler and interpreter comparison" tabindex="0"><table role="table"><caption>Native compilation and source interpretation</caption>
  <thead><tr><th scope="col">Consider</th><th scope="col">Compiler</th><th scope="col">Interpreter</th></tr></thead>
  <tbody>${comparison.map(([factor, compiled, interpreted]) => `<tr><th scope="row">${factor}</th><td><span aria-hidden="true">Compiler</span>${compiled}</td><td><span aria-hidden="true">Interpreter</span>${interpreted}</td></tr>`).join('')}</tbody></table></div>`;
export const comparisonMaterials = [{
  id: 'translator-comparison', title: 'Choosing a translation route',
  html: compareTable
    + choice('A developer edits a calculation after each trial. Which route fits?', 'An interpreter lets the developer run each revision immediately and inspect the first error reached.')
    + choice('A school distributes a finished application to 200 identical PCs. Which route fits?', 'Build once for those PCs and distribute the executable with its dependencies. Each machine can run it repeatedly.'),
}];

const javaHost = (name, cpu) => `<section class="s5-java-host"><h4>${name}</h4><p>JVM for ${cpu} interprets the bytecode</p>
  <div class="s5-java-console"><code>java Hello</code><samp>Hello!</samp></div></section>`;
export const javaMaterials = [{
  id: 'java-portability', title: 'Compile once, run the bytecode on two hosts',
  html: figure('Java console program from source to two host runtimes',
    `<div class="s5-java-flow">
    <section class="s5-java-source"><h4>Hello.java</h4>${code('class Hello {\n  public static void main(\n      String[] args) {\n    System.out.println("Hello!");\n  }\n}')}
    <div class="s5-java-compile"><strong>Compile</strong><code>javac Hello.java</code></div></section>
    <section class="s5-java-class"><h4>Hello.class</h4><p>Bytecode for a Java Virtual Machine</p><p>Copy this same file to both hosts.</p></section>
    <div class="s5-java-hosts">${javaHost('Windows PC', 'x86-64')}${javaHost('Linux computer', 'Arm64')}</div></div>`,
    'Compiling to a shared intermediate format makes the class file portable. Each host needs a compatible JVM to execute the bytecode on its processor.')
    + choice('How does just-in-time compilation fit?', 'A JVM can compile frequently executed bytecode to native instructions for its own processor, speeding up subsequent executions.'),
}];

const editor = (label, body) => `<section class="s5-editor"><h4 class="s5-editor-tab">${label}</h4>${body}</section>`;
const grid = (...panels) => `<div class="s5-dev-grid">${panels.join('')}</div>`;
const inputs = 'Quantity ← 3\nUnitPrice ← 4\nDelivery ← 2';
const cost = 'Cost ← Quantity * UnitPrice';
const watchRows = [
  ['Quantity', '3', '3'], ['UnitPrice', '4', '4'], ['Delivery', '2', '2'], ['Cost', 'Unset', '<strong>6</strong>'],
  ['Quantity * UnitPrice', '12', '12'],
];
export const ideMaterials = [
  {id: 'coding-prompts', title: 'Coding · context-sensitive prompts', html: figure('Completing an expression in the price program',
    `<div class="s5-code-completion">${editor('Price calculation', code(inputs + '\nCost ← Quantity * <span class="s5-caret" aria-label="cursor"></span>'))}
    <section class="s5-suggestions"><h4>Identifiers in scope</h4><ul><li><strong>UnitPrice</strong><span>INTEGER · 4</span></li><li>Delivery<span>INTEGER · 2</span></li></ul>
    <p>Accept UnitPrice → <code>3 * 4 = 12</code></p></section></div>`,
    'The cursor follows the multiplication sign, so the IDE suggests identifiers valid in that position. Both names fit the syntax. The developer chooses the one that represents the item price.')},
  {id: 'dynamic-syntax', title: 'Initial error detection · dynamic syntax checks', html: figure('Live syntax feedback before and after completing line four',
    grid(editor('While typing', code('Cost ← Quantity <mark class="s5-error-token">*</mark>') + '<p class="s5-diagnostic"><strong>Line 4</strong>Expected an operand after *</p>'),
      editor('After correction', code(cost) + '<p class="s5-success"><strong>Line 4</strong>Syntax check passed.</p>')),
    'The diagnostic appears while the programmer types. Adding UnitPrice completes the expression. Using Delivery would also pass this syntax check, even though it gives the wrong price.')},
  {id: 'prettyprint-and-fold', title: 'Presentation · prettyprint, collapse and expand', html: figure('Three editor views of the same conditional block',
    grid(editor('Before prettyprint', code('IF Quantity > 0 THEN\nCost←Quantity*UnitPrice\nELSE\nCost←0\nENDIF\nOUTPUT Cost')),
      editor('Prettyprinted and expanded', code('▾ IF Quantity > 0 THEN\n    Cost ← Quantity * UnitPrice\n  ELSE\n    Cost ← 0\n  ENDIF\n  OUTPUT Cost')),
      editor('Collapsed', code('▸ IF Quantity > 0 THEN …\n  OUTPUT Cost') + '<p class="s5-fold-note">Expand ▸ to see the block again.</p>')),
    'Prettyprint makes the two branches easier to read. Folding changes the editor view only. With Quantity = 3 and UnitPrice = 4, all three views execute the same code and output 12.')},
  {id: 'debugging-price', title: 'Debugging · pause, inspect and single-step', html: figure('A debugger paused at a faulty multiplication, with variables, an expression watch and a report window',
    `<div class="s5-debug-workbench">
      ${editor('Source · paused before line 4', code('1  Quantity ← 3\n2  UnitPrice ← 4\n3  Delivery ← 2\n<span class="s5-break-line"><span aria-hidden="true">●</span>4  Cost ← Quantity * Delivery</span>\n5  OUTPUT Cost'))}
      <section class="s5-debug-watch"><h4>Variables and expression watch</h4><table><thead><tr><th scope="col">Inspect</th><th scope="col">At break</th><th scope="col">After step</th></tr></thead>
      <tbody>${watchRows.map(([item, before, after]) => `<tr><th scope="row">${item === 'Quantity * UnitPrice' ? '<small>Watched expression</small>' : ''}<code>${item}</code></th><td>${before}</td><td>${after}</td></tr>`).join('')}</tbody></table></section>
      <section class="s5-debug-report"><h4>Report window</h4><ol><li>Breakpoint hit. Paused before line 4.</li><li>Single step executed line 4. Paused before line 5.</li></ol></section>
      <section class="s5-debug-output"><h4>Program output</h4><p><span>Step over line 5</span><samp>6</samp></p><p><span>Replace Delivery with UnitPrice, then rerun</span><samp>12</samp></p></section></div>`,
    'The breakpoint pauses before the assignment. One step sets Cost to 6. The watched expression still reads 12 and reveals the wrong operand. The report window records execution events while the output pane shows what the program prints.')},
];
