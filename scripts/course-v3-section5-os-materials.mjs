// The diagrams are text and HTML so they also work offline, without JavaScript.
const figure = (body, caption) => `<figure class="s5-visual s5-os-figure">${body}<figcaption>${caption}</figcaption></figure>`;
const panel = (heading, body, tone = '') => `<div class="os-panel ${tone}"><h4>${heading}</h4>${body}</div>`;
const pair = (left, right) => `<div class="os-pair">${left}${right}</div>`;
const flow = nodes => `<ol class="os-flow">${nodes.map(([name, detail]) => `<li><strong>${name}</strong><span>${detail}</span></li>`).join('')}</ol>`;
const blocks = (cells, start = 0) => `<div class="os-blocks" style="--os-count:${cells.length}">${cells.map(([owner, label], i) =>
  `<div class="os-block os-${owner}"><small>${start + i}</small><b>${label}</b></div>`).join('')}</div>`;

// QP and MS are printed page numbers in the Cambridge originals.
const citation = (paper, part, command, qp, ms) =>
  `<span>9618/${paper} · ${part} · ${command} <span class="os-pages">(QP p${qp}, MS p${ms})</span></span>`;
const sources = (...references) => `<aside class="os-sources" aria-label="Sources"><strong>Sources</strong>${references.join('')}</aside>`;
const management = citation('13/M/J/22', 'Q4(a)', 'Describe', 9, 6);
const toolChoice = citation('12/O/N/23', 'Q8(b)', 'Identify and explain', 13, 9);
const libraries = citation('12/M/J/23', 'Q7(a)(i–ii)', 'Define and explain', 13, 9);

const operatingSystem = {
  id: 'os-print-comparison', title: 'Why does a computer need an operating system?',
  html: figure(
    '<p class="os-question">Two applications send a page to the same printer. Who decides which page prints first?</p>' +
    pair(panel('With an operating system', `<div class="os-apps"><b>Editor · page A</b><b>Browser · page B</b></div>
      <div class="os-connector">↓ Common print requests</div>
      <div class="os-service"><strong>Operating system</strong><span>Queues the jobs and uses the printer driver.</span></div>
      <div class="os-connector">↓ One job at a time</div>
      <div class="os-result"><strong>Printer</strong> Page A, then page B</div>`, 'os-positive'),
      panel('Without an operating system', `<div class="os-apps"><b>Editor · page A</b><b>Browser · page B</b></div>
      <div class="os-connector">↓ No common print service</div>
      <div class="os-service"><strong>Which program controls the printer?</strong><span>Each would need its own device code and a way to coordinate access.</span></div>
      <div class="os-connector">↓ If neither supplies it</div>
      <div class="os-result"><strong>Printer</strong> The ordinary applications cannot print.</div>`, 'os-caution')),
    'An OS supplies a user interface and a common platform for applications. It manages devices, files, RAM and processor time. A purpose-built program can run directly on hardware if it supplies the control it needs.') +
    sources(citation('11/M/J/25', 'Q6(b)', 'Describe', 11, 10), citation('12/O/N/23', 'Q8(a)', 'State', 13, 9)),
};

const memory = {
  id: 'os-memory-protection', title: 'Memory management',
  html: figure(
    '<p class="os-label">RAM map · two running tasks and their private data</p>' +
    blocks([['a','Task A'], ['a','Task A'], ['b','Task B'], ['b','Task B'], ['free','Free'], ['free','Free']], 100) +
    pair(panel('A stores 7 at address 101', '<p><b class="os-allow">Allowed.</b> The OS has allocated 101 to A.</p><div class="os-allocation"><b>A[101]</b><span>7</span></div>', 'os-positive'),
      panel('B tries to store 99 at the same address', '<p><b class="os-deny">Blocked.</b> B has no write access to A’s private location.</p><div class="os-allocation"><b>A[101]</b><span>Still 7</span></div>', 'os-caution')) +
    '<div class="os-footnote">When B exits, the OS releases 102–103 and can allocate them to another task.</div>',
    'The OS tracks free and occupied memory, allocates space and protects each task’s private allocation. This lets several programs keep their instructions and data in RAM at the same time.') +
    sources(citation('12/M/J/24', 'Q6', 'Explain', 13, 9), citation('12/M/J/26', 'Q7(a)(ii)', 'Identify', 12, 15), management),
};

const files = {
  id: 'os-file-directory', title: 'File management',
  html: figure(pair(
    panel('Create report.txt', '<div class="os-tree"><strong>School/</strong><div><strong>Science/</strong><div><code>report.txt</code></div></div></div><div class="os-map-line"><code>report.txt</code><span aria-hidden="true">→</span><b>blocks 3 and 8</b></div>'),
    panel('Rename it to results.txt', '<div class="os-tree"><strong>School/</strong><div><strong>Science/</strong><div><code>results.txt</code></div></div></div><div class="os-map-line"><code>results.txt</code><span aria-hidden="true">→</span><b>blocks 3 and 8</b></div>')) +
    flow([['Create or save','Allocate blocks 3 and 8 and record the file in the directory.'],['Rename and reopen','Open School/Science/results.txt. The updated entry leads back to the same blocks.'],['Delete','Remove the entry and release blocks 3 and 8 for reuse.']]),
    'A file name is useful because the OS maintains the directory and the allocation records behind it. It also supports operations such as searching, opening, copying and closing files.') +
    sources(citation('11/O/N/24', 'Q4(a)(i)', 'Describe', 9, 7), management),
};

const security = {
  id: 'os-authentication-permissions', title: 'Security management',
  html: figure(
    flow([['Sign in','Check the credentials of each account.'],['Request the same file','Both accounts attempt to update marks.csv.'],['Check rights','The OS checks the permissions assigned to each account.']]) +
    pair(panel('Teacher · read and write', '<p><b class="os-allow">Write permitted.</b> Save the teacher’s updated mark.</p>', 'os-positive'),
      panel('Student · read only', '<p><b class="os-deny">Write denied.</b> The student can view the new mark but cannot change it.</p>', 'os-caution')) +
    '<p class="os-footnote"><b>Audit log</b> · Student account · requested write to marks.csv · denied</p>',
    'Authentication establishes who is making a request. Access rights then control which operations that user or process may perform. The OS can record attempts in an audit log.') +
    sources(management, citation('11/O/N/25', 'Q5(a)(ii)', 'State', 10, 8)),
};

const hardware = {
  id: 'os-printer-transfer', title: 'Hardware management',
  html: figure(
    '<p class="os-label">A document editor sends job A to print while a browser submits job B.</p>' +
    flow([['Job queue','The OS starts the editor’s job A. The browser’s job B waits.'],
      ['Device driver','The OS uses the installed driver to send instructions the printer understands.'],
      ['Buffer','Bytes for job A wait temporarily while the slower printer takes them.'],
      ['Printer','Prints the page. Its driver receives the device’s completion signal.']]) +
    '<div class="os-return">↳ <strong>Completion back to the application</strong> · The OS handles the hardware interrupt, marks A complete, reports completion to the editor and services B.</div>',
    'A driver enables communication with a particular device. Buffers let a producer and a peripheral transfer data at different speeds. The OS also receives input from peripherals such as keyboards.') +
    sources(citation('11/M/J/23', 'Q3(a)', 'Describe', 8, 5), management),
};

const processes = {
  id: 'os-processor-timeline', title: 'Process management',
  html: figure(
    '<p class="os-label">One CPU core · time moves from left to right</p>' +
    '<div class="os-timeline"><div class="os-a"><small>1 · running</small><b>Editor A</b><span>Requests a disk read.</span></div>' +
    '<div class="os-b"><small>2 · running</small><b>Player B</b><span>A waits for the disk.</span></div>' +
    '<div class="os-b"><small>3 · running</small><b>Player B</b><span>The disk finishes. A is ready.</span></div>' +
    '<div class="os-a"><small>4 · running</small><b>Editor A</b><span>Resumes with its saved state.</span></div></div>' +
    '<div class="os-return">↳ <strong>Scheduler</strong> · At each switch, the OS preserves the paused process’s state and chooses a ready process to run.</div>',
    'A process is a program in execution. Sharing processor time lets other work progress while a process waits. Priorities and the ready queue help the OS decide what runs next.') +
    sources(citation('12/M/J/23', 'Q5(d)(i)', 'Describe', 11, 8), citation('12/M/J/24', 'Q6', 'Explain', 13, 9), management),
};

const formatter = {
  id: 'utility-disk-formatter', title: 'Disk formatter',
  html: figure(
    '<p class="os-label">Preparing a new, empty volume for its first files</p>' +
    pair(panel('Before formatting', '<div class="os-volume">Empty volume</div><p>No file system yet. There is no directory or allocation record for the OS to consult.</p>'),
      panel('After formatting', '<div class="os-tree"><strong>Root directory /</strong></div><div class="os-allocation"><b>Allocation record</b><span>0 free · 1 free · 2 free</span></div><p>The OS can create a named file and record which blocks it uses.</p>', 'os-positive')),
    'The formatter creates the file system and its allocation structures. FAT is one example of an allocation table. A full format may also check for errors. Formatting a volume that already holds files can make them inaccessible.') +
    sources(citation('13/O/N/23', 'Q5(b)(ii)', 'Describe', 8, 6)),
};

const virus = {
  id: 'utility-virus-background', title: 'Virus checker',
  html: figure(
    '<div class="os-lanes"><div><h4>Foreground · document editor</h4><div class="os-document"><strong>lab-report.txt</strong><span>Results from experiment two…</span><span class="os-cursor">The student continues typing.</span></div></div>' +
    '<div><h4>Background · real-time protection</h4>' +
    flow([['Monitor','A downloaded file arrives while the editor remains open.'],['Scan','Check the file against current virus definitions. Refresh the definitions regularly.'],['Quarantine','A signature matches. Isolate the file to prevent it running, or remove it.']]) + '</div></div>',
    'A virus checker can monitor files in the background as they arrive or open. Regular scans and updated definitions help it recognise known malware. The foreground and background lanes show work during the same interval.') +
    sources(citation('13/M/J/23', 'Q6(b)', 'Identify and describe', 11, 9), citation('13/O/N/23', 'Q8(c)', 'Explain', 12, 9),
      '<span>Background operation · Hodder AS &amp; A Level Computer Science, “Virus checker”, PDF pp227–228.</span>'),
};

const defrag = {
  id: 'utility-defrag-blocks', title: 'Defragmentation software',
  html: figure(
    '<p class="os-label">Magnetic hard disk · read file A in the order A1, A2, A3</p><h4>Before · separated parts</h4>' +
    blocks([['a','A1'],['b','B1'],['free','Free'],['a','A2'],['b','B2'],['a','A3']]) +
    '<p class="os-trace">Read positions <b>0 → 3 → 5</b></p><h4>After · contiguous parts</h4>' +
    blocks([['a','A1'],['a','A2'],['a','A3'],['b','B1'],['b','B2'],['free','Free']]) +
    '<p class="os-trace">Read positions <b>0 → 1 → 2</b></p>',
    'The utility moves file parts together on the HDD. Reading the contiguous file can require less mechanical head movement, reducing access time. A has the same three parts before and after.') +
    sources(citation('11/M/J/23', 'Q3(c)', 'Explain', 8, 6)),
};

const repair = {
  id: 'utility-disk-analysis-repair', title: 'Disk contents analysis and disk repair',
  html: figure(pair(panel('Analyse storage use', `<p>How is a 10 GB volume being used?</p>
      <div class="os-capacity" aria-hidden="true"><i></i><i></i><i></i></div>
      <ul class="os-key"><li><b>6 GB</b> video</li><li><b>3 GB</b> documents</li><li><b>1 GB</b> free</li></ul>
      <p>The report shows which files take up space.</p>`),
    panel('Check and repair', `<p>Is any occupied block incorrectly listed as free?</p>
      <div class="os-allocation"><b>Block 17</b><span class="os-deny">The file uses it, but the allocation record marks it free.</span></div>
      <div class="os-connector">↓ Cross-check directory and allocation records</div>
      <div class="os-result">Mark block 17 in use, so a second file cannot overwrite its data.</div>`, 'os-caution')),
    'A contents analysis can identify large files. A repair utility checks for inconsistent file records and corrects recoverable errors. It may also identify bad sectors, mark them unusable and attempt to recover readable data.') +
    sources(toolChoice, '<span>The mark scheme covers fault detection and recovery. Storage use · Hodder AS &amp; A Level Computer Science, “Disk contents analysis/repair software”, PDF p230.</span>'),
};

const compression = {
  id: 'utility-file-compression', title: 'File compression',
  html: figure(
    '<p class="os-label">Lossless run-length example · the file contains only A and B</p>' +
    pair(panel('Original · 12 bytes', '<div class="os-byte-stream"><code>AAAAAAAA</code><code>BBBB</code></div><p>Each character occupies one byte.</p>'),
      panel('Encoded · 4 bytes', '<div class="os-byte-stream"><code>8A</code><code>4B</code></div><p>Each pair stores a one-byte count and a one-byte character. Header size is omitted.</p>', 'os-positive')) +
    '<div class="os-return"><strong>Transfer at 4 bytes per second</strong> · Original 12 ÷ 4 = 3 seconds. Encoded 4 ÷ 4 = 1 second, ignoring transfer overhead.<br><strong>Decompress</strong> · Eight As followed by four Bs reproduces all 12 original bytes.</div>',
    'For this repeated data, compression means fewer bytes to store or transmit. At the same transfer rate the download takes less time. Other inputs may compress by a different amount.') +
    sources(citation('13/O/N/23', 'Q5(b)(i)', 'Explain', 8, 6), citation('11/O/N/24', 'Q4(b)(ii)', 'Describe', 9, 7)),
};

const backup = {
  id: 'utility-backup-restore', title: 'Back-up software',
  html: figure(
    flow([['09:00 · scheduled copy','The utility copies report v1 from the working drive to a separate backup device.'],
      ['10:00 · edit','The working drive now holds v2. The latest completed backup still holds v1.'],
      ['11:00 · drive failure','The working drive fails. The backup device still contains v1.']]) +
    '<div class="os-restore"><b>Backup device · v1</b><span>→ restore →</span><b>Replacement drive · v1</b></div>',
    'Back-up software automatically makes regular copies so data can be restored after loss or corruption. Changes made after the last completed backup are absent from this restored version.') +
    sources(citation('11/O/N/24', 'Q4(a)(ii)', 'Explain', 9, 7)),
};

const libraryCall = {
  id: 'library-import-call', title: 'What is a program library?',
  html: '<p>A program library is a collection of pre-written routines that other programs can call. Examples include maths routines for square roots, image routines for resizing pictures and compression routines for producing smaller files.</p>' +
    figure(flow([['Import','<code>import math</code><br>Make the Python maths module available to this program.'],
      ['Call','<code>side = math.sqrt(81)</code><br>Pass 81 to the square-root routine.'],
      ['Use the result','<code>side</code> holds <code>9.0</code>.<br>The caller can now use it as a side length.']]),
    'The caller supplies the arguments the routine expects and uses the documented result.') + sources(libraries),
};

const dll = {
  id: 'library-dll-loading', title: 'What is a Dynamic Link Library (DLL)?',
  html: '<p>A Windows DLL is a separate file containing compiled code that applications can link to when they load or while they run.</p>' +
    figure('<div class="os-apps"><b>Results.exe</b><b>GraphEditor.exe</b></div><div class="os-connector">Both applications call DrawPlot ↓</div>' +
      '<div class="os-service os-dll"><strong>Plots.dll</strong><span>One installed library supplies the drawing routine. Compatible programs can share its read-only code in memory.</span></div>' +
      '<div class="os-return">↳ <strong>Compatible update</strong> · Replace the library with a corrected version. The applications can use it on their next run without rebuilding their executables.</div>',
      'These example executables do not contain their own copy of DrawPlot. Each must be able to load a compatible DLL that provides the expected routine.') + sources(libraries),
};

const benefits = {
  id: 'library-developer-benefits', title: 'How library files help a developer',
  html: figure(`<dl class="os-benefits">
    <div><dt>Reuse existing code</dt><dd>Calling a documented routine saves time writing the algorithm. It also makes complex operations available to a developer who could not implement them unaided.</dd></div>
    <div><dt>Reuse tested routines</dt><dd>Prior testing reduces the testing needed for the routine itself. Test the arguments, result and integration in the new application.</dd></div>
    <div><dt>Share separately compiled code</dt><dd>A DLL can serve several applications. Each executable can be smaller, and a compatible library fix can be distributed once.</dd></div>
    </dl>`, 'A benefit is easier to explain when you connect what the developer reuses to the work or storage it saves.') +
    sources(citation('11/O/N/24', 'Q4(c)', 'Explain', 10, 7), citation('11/O/N/25', 'Q5(b)(i)', 'Describe', 10, 8), libraries),
};

export const osMaterials = {
  '5.1.1': [operatingSystem],
  '5.1.2': [memory, files, security, hardware, processes],
  '5.1.3': [formatter, virus, defrag, repair, compression, backup],
  '5.1.4': [libraryCall, dll, benefits],
};
