import { coreParagraph as p, coreList as list, coreSteps as steps, coreTable as table } from './course-v3-core-blocks.mjs';
import { mechanismVisual } from './course-v3-mechanism-diagrams.mjs';
import { s5Code, section5Java, s5LoopTrace } from './course-v3-section5-programs.mjs';
import { section5Visuals } from './course-v3-section5-diagrams.mjs';

const entry = (essentials, blocks, materials, extra = {}) => ({ essentials, blocks, materials, ...extra });
const comparison = (title, headers, rows) => ({ type:'table', title, headers, rows, preserveText:true });
const worked = (title, steps) => ({ type:'worked-example', title, steps });
const example = (key, title, conditions, result) => worked(title, [
  ['Conditions',conditions], ['Cambridge pseudocode',s5Code(key)], ['Trace and result',result],
]);
const extension = (title, explanation) => ({ title:`Optional extension · ${title}`, explanation, materials:[] });

const teaching = {
  'S5.01-NEED': entry([
    'The OS provides common services and user interfaces, and coordinates access to shared resources.',
    'Applications supply task-specific behaviour while using OS services.',
  ], [
    p('An operating system is system software that manages computer resources and supplies services to applications. An editor decides how to change a document; it asks the OS to save a named file. The OS coordinates access to storage. A graphical or command-line interface also lets the user request operations such as starting programs and managing files.', 'Separate the task from the shared service'),
    p('Several applications can need the same RAM, processor or printer. Without coordination, requests can conflict: one process could overwrite another’s working data or two print jobs could interfere. The OS allocates resources, controls permitted access and organises waiting work. Applications use common service interfaces instead of each implementing every device’s control protocol.', 'Why central coordination is useful'),
    p('A request has an outcome. An authorised write can complete and return success; an unauthorised write returns an error before protected data is changed. The application must respond appropriately, for example by keeping an unsaved document open. A visible Save button is application behaviour; carrying out a permitted file write involves OS services.', 'Follow the response as well as the request'),
  ], [section5Visuals.request, worked('Start a shared timetable task',[
    ['Initial conditions','Teacher account T may read and modify Classes/Friday.txt. Student account S may read it but cannot modify it. Its stored content is Room 4. An editor and a music player run on one CPU core; printer job A is already active.'],
    ['Teacher request','T changes the editor’s working text to Room 7 and selects Save. The OS checks the write right, coordinates the file operation and reports completion. The stored file now contains Room 7.'],
    ['Student request','S opens the saved file and reads Room 7, edits a working copy to Room 9 and requests a write. Access is denied: the stored file stays Room 7. The application still has an unsaved working edit.'],
    ['Continue the case','The following units separate the working memory, stored file, access decision, printing and CPU scheduling involved in this task.'],
  ])]),
  'S5.01-MEMORY': entry([
    'Record free and allocated RAM; allocate, protect and release process memory.',
    'RAM allocation is distinct from saving files and scheduling CPU time.',
  ], [
    p('A running program needs memory for its instructions and working data. Memory management records what is available and assigns suitable space when a process starts or requests more. The diagram uses an editor and browser; the same separation lets the timetable editor’s text and the player’s audio data coexist in the case below.', 'Allocate working space'),
    p('Protection restricts access to another process’s allocation. The OS establishes protection that the system enforces; a process is not simply trusted to avoid every other address. When the editor exits, its allocation becomes available again. This does not save the document: persistent file writing is a separate operation.', 'Protect and release'),
    table('Track a simplified 12-block RAM allocation',['Event','Editor','Player','Free blocks'],[
      ['Initially; OS uses 2 blocks','0','0','10'],['Editor starts','4','0','6'],['Player starts','4','3','3'],['Editor exits','0','3','7'],['New process needs 5 blocks','0','3','2 after allocating 5 to the new process'],
    ]),
    p('Blocks are equal-sized units in this simplified example; the OS’s 2 blocks stay allocated. Allocation changes do not imply that memory is physically erased or that a process is executing at that moment. A request exceeding the available space needs further handling; paging algorithms are outside this AS lesson.', 'Interpret the model correctly'),
  ], [mechanismVisual('memory')]),
  'S5.01-FILES': entry([
    'File management organises files and directories, maintains metadata and supports file operations.',
    'A path identifies a stored file logically; reads and writes transfer its contents.',
  ], [
    p('File management maintains names, directory relationships and metadata such as size, ownership and the information used to locate stored contents. Create, open, read, write, close, rename and delete are distinct operations. A filename is not the data itself or a physical RAM address.', 'Organise and locate persistent data'),
    p('The application supplies a path and requested operation. File services locate the file and coordinate access with security and device services. Opening establishes access to the file; reading supplies data to working memory; closing releases the associated open-file resources. For this teaching case, a successful completed save includes the required storage write.', 'Follow a complete operation'),
    table('Create, save, close and read back a new file',['Stage','File / directory state','Application state'],[
      ['Before creation','Notes exists; Revision.txt does not','Working text is Binary revision'],
      ['Create and open for writing','Notes/Revision.txt is recorded as a new file','Open-file reference available'],
      ['Write and complete the save','Contents become Binary revision; size metadata is updated','Write completes successfully'],
      ['Close','File remains stored','Open-file resources released'],
      ['Reopen for reading','Same path resolves to the stored file','New open-file reference'],
      ['Read and then close','Stored contents unchanged','Read buffer contains Binary revision; reference released'],
    ]),
    p('If a path cannot be found, no successful read of that file has occurred. If write access is denied, opening for a permitted read does not make a write legal. Renaming changes the logical name; deletion removes the file from ordinary file-system access and makes its storage available for reuse. These are conceptual OS operations, not a file-handling program; Lesson 065 teaches the programming syntax.', 'Change the conditions'),
  ], [comparison('Distinguish the items in a file request',['Item','Meaning'],[['Notes/Revision.txt','Directory path and filename'],['Binary revision','Stored text content'],['Size and ownership','Metadata managed with the file'],['Read buffer','Temporary working copy in RAM']])]),
  'S5.01-SECURITY': entry([
    'Authentication establishes identity; permissions determine allowed operations.',
    'An authenticated user can still be denied access to a resource.',
  ], [
    p('Security management authenticates a claimed identity and enforces that identity’s access rights. Checking login credentials and checking permission to overwrite a particular file answer different questions. Logging activity can support investigation of who requested an operation.', 'Identify, then authorise'),
    steps('Apply the timetable permissions',[
      ['Establish identity','A successful login identifies the requester as student S. It does not turn S into teacher T.'],
      ['Check the requested operation','A read of Classes/Friday.txt is allowed. A request to replace its contents is a different operation and is denied.'],
      ['Return the outcome','The denied write leaves the saved Room 7 text unchanged. The editor must report that its Room 9 working copy was not saved.'],
    ]),
    p('A working printer and a successful antivirus scan cannot grant a missing file permission. Security, file and hardware services cooperate; their responsibilities are not interchangeable. Lessons 034–036 develop authentication techniques, threats and data access controls further.', 'Keep the service boundaries clear'),
  ], [comparison('One file, two identities',['Account','Read','Modify'],[['Student S','Allowed','Denied'],['Teacher T','Allowed','Allowed']])]),
  'S5.01-HARDWARE': entry([
    'Drivers provide device-specific communication; queues organise waiting jobs; buffers temporarily hold transfer data.',
    'Device notifications allow the OS to coordinate further work.',
  ], [
    p('Hardware management coordinates input, output and peripheral requests. A driver converts general requests into commands and data suitable for a particular device. The driver is software; the printer performs the physical printing. A missing or incompatible driver can prevent correct communication even when the printer is powered on.', 'Connect common services to particular devices'),
    p('A job queue keeps waiting work in order. A transfer buffer holds data temporarily while components work at different rates. The queue describes jobs awaiting service; the buffer contains data for a transfer. Neither makes a printer’s long-term physical printing rate unlimited. Revisit the finite-buffer example in Lesson 017 when needed.', 'Distinguish jobs from transfer data'),
    p('A device interrupt can signal completion or a need for attention. The OS responds and arranges the next transfer or job. This reuses the interrupt mechanism from Lesson 024; it does not mean that the device executes the handler or that the application must repeatedly check its status.', 'Respond to device events'),
  ], [mechanismVisual('printer-services'), worked('Finish the timetable print request',[
    ['Initial state','T has saved Room 7. Job A is printing; T submits timetable job B. File access is permitted and a compatible printer driver is installed.'],
    ['Queue and transfer','B waits while A uses the printer. Once A completes, the OS starts servicing B. The driver supplies printer-specific commands; a buffer holds B’s outgoing data during transfer.'],
    ['Completion','The printer consumes the data and reports completion. B leaves the pending work; both A and B are now finished. The saved file still contains Room 7.'],
    ['Denied variant','If S requests an unauthorised file operation, the OS refuses that operation before releasing the protected data. Installing a better printer does not change that access decision.'],
  ])]),
  'S5.01-PROCESSES': entry([
    'A process is a program in execution; process management schedules ready work and retains execution state.',
    'I/O completion can make a waiting process ready; the scheduler still chooses when it runs.',
  ], [
    p('A program is stored instructions; a process is an execution of a program with its own current state. Process management records that state and allocates processor time. Several processes may be active, but the simplified single-core model executes one process’s instruction at a time. Switching gives the appearance of simultaneous progress.', 'Separate stored code from active execution'),
    table('Continue the editor and player case',['Event','Editor state','CPU use'],[
      ['Editor lays out the timetable','Running','Editor'],['Editor requests a file read and must wait','Waiting for I/O','OS saves context and selects ready player'],['Read completes while player runs','Ready','Player until scheduler selects editor'],['Editor selected again','Running from retained state','Editor'],
    ]),
    p('A waiting process cannot continue an operation that depends on unfinished input/output. Giving that interval to ready work avoids leaving the CPU idle for the entire I/O wait. The OS must retain enough context, such as the continuation address and required register values, so the process can resume its calculation rather than restart. A timer can also provide an opportunity to reschedule.', 'Explain the benefit and the necessary state'),
    p('Ready means able to run when selected, not already running. The state labels support this explanation; comparing scheduling algorithms and calculating their timings are outside this lesson. Memory management answers where the player’s data is held; process management answers when the player executes.', 'Use the right management responsibility'),
  ], [mechanismVisual('processes')]),
  'S5.02-FORMAT': entry(['A formatter prepares file-system structures for organising files; formatting is not a recovery operation.'],[
    p('Utility software performs particular maintenance, protection or management tasks. An OS may include utilities, and other utilities can be installed separately. Choose the utility by the problem it solves, not merely by whether it is labelled a system tool. Utilities can themselves request OS services.', 'What a utility adds'),
    p('A disk formatter prepares a storage volume with structures needed to organise and locate files. A new empty volume can have storage capacity without a usable file-system organisation. Formatting provides that organisation; it does not populate the volume with the user’s documents or install applications.', 'Prepare a volume for files'),
    p('Reformatting a volume containing important files can make those files inaccessible. Therefore distinguish preparing known-empty storage from recovering data after a failure. A missing file is not evidence that formatting is the correct operation.', 'Select from the initial condition'),
  ], [comparison('Same utility, different starting conditions',['Starting state','Decision and outcome'],[['New empty volume; no file system','Format it with a suitable file system; it can then organise newly created files.'],['Used volume contains needed documents','Preserve the data and investigate the problem; formatting is not a recovery step.']])]),
  'S5.02-VIRUS': entry(['A virus checker detects suspicious content or activity and may quarantine, remove or repair it.','Update detection information; detection and removal do not guarantee full recovery.'],[
    p('A virus checker scans files, memory or activity for evidence of malware. Known signatures match identified threats; behavioural checks look for suspicious actions. Updated detection information can recognise threats absent from an older set. The checker’s job differs from the OS deciding whether an account may access a file.', 'Detect and handle a threat'),
    p('Quarantine isolates a suspect item so it cannot be used normally while it is investigated. Removal deletes detected malicious content; repair is possible only for supported damage. These actions do not necessarily recreate documents already damaged by malware. A clean scan means the scan found no threat, not proof that every possible threat is absent.', 'Distinguish detection, treatment and recovery'),
  ], [comparison('Illustrative scan record — no real malware',['Step','Observation / result'],[['Update','Detection information is refreshed before scanning.'],['Scan','The checker flags the fictional file SampleTool as suspicious.'],['Quarantine','SampleTool is isolated from normal execution; the user reviews the report.'],['Recover affected work','A damaged timetable still needs a usable earlier copy; quarantine alone does not restore it.']])]),
  'S5.02-DEFRAG': entry(['Defragmentation rearranges HDD file blocks to reduce mechanical seeking; file contents are unchanged.'],[
    p('Saving and deleting files creates free spaces of different sizes. A new file may be stored in several available gaps rather than in one consecutive group. Its logical parts remain in order when read, but the physical locations can be separated. Fragmentation is a placement issue, not a change to the file’s intended contents.', 'How fragmentation arises'),
    p('A defragmenter relocates blocks into fewer, more contiguous groups and may consolidate free space. On an HDD this can reduce movement of the read/write head between parts of a file. The diagram preserves A1, A2, A3, B1, B2 and two free blocks; it does not reduce the amount of file data.', 'Explain the performance change'),
    p('Compare compression, which changes data representation to reduce size, with defragmentation, which changes placement. An SSD has no moving read head, so this HDD seek-time explanation does not apply to it. Do not infer that rearranging blocks repairs missing contents or guarantees faster performance for every workload.', 'Keep the conditions and limits'),
  ], [mechanismVisual('defrag')]),
  'S5.02-REPAIR': entry(['Contents analysis reports storage use; checking and repair investigate file-system problems and attempt supported corrections.','Neither analysing space nor attempting repair guarantees recovery from physical damage.'],[
    p('Disk contents analysis answers where storage capacity is being used: for example, which files or folders occupy most space. A nearly full volume may be internally consistent. Discovering one large video folder does not by itself reveal a damaged disk.', 'Analysis can explain space use'),
    p('Disk checking examines file-system consistency and may report allocation errors or unreadable areas. Repair tools attempt supported corrections and may mark unsuitable areas to avoid. A report must be interpreted: correcting a file-system record is different from physically repairing a damaged surface or recreating data that can no longer be read.', 'Repair addresses a different problem'),
  ], [comparison('Read the report before choosing an action',['Report','Suitable response','What it does not establish'],[['Videos 70 GB; other files 25 GB; free 5 GB on a 100 GB volume','Use contents analysis to identify the large files and review what to retain or move.','The stated space use does not prove corruption.'],['File allocation records are inconsistent','Preserve recoverable data; use disk checking/repair to investigate and attempt a supported correction.','Defragmentation is not a substitute for fixing inconsistent records.'],['Data cannot be read from a damaged area','A repair tool may avoid that area; restore needed data from an available backup.','Software cannot guarantee recovery of unreadable physical data.']])],{check:['A volume is full because of a known large video folder, but its file system is consistent. Is repair the next operation?','No. Contents analysis identifies the space usage; review the files and storage needs. The report gives no file-system fault for repair to correct.']}),
  'S5.02-COMPRESS': entry(['Lossless compression can reduce storage or transfer size while allowing exact decompression.','Compression is not automatically encryption or a separate recovery copy.'],[
    p('File-compression utilities encode files in a representation that can need fewer bits. On a connection with a given data rate, fewer transferred bits can reduce transfer time. General-purpose archives use lossless compression so programs and documents can be recovered exactly; a changed source-code character could change a program.', 'Reduce representation size, then reverse it'),
    p('The reduction depends on the contents and archive overhead. Already compressed media may shrink very little, and some archives can be larger than their input. Choose based on the actual result, not a promise that every file becomes smaller. The compression algorithms themselves are taught in Lesson 006.', 'Use a suitable file type and check the result'),
  ], [comparison('A lossless archive round trip',['Stage','Files and contents'],[['Original folder','A.txt contains ABCABC; B.txt contains 001100. Both are ASCII text with no line ending.'],['Compress','Create a lossless archive containing both files. Its total size is measured, not inferred from this tiny example.'],['Extract to a separate empty folder','A.txt again contains ABCABC and B.txt contains 001100, with the same filenames and exact contents.'],['Compare','Check both file contents. An archive on the only working disk is still lost if that disk fails.']])],{check:['A tiny two-file archive is larger than its inputs, but extracts identical files. Did lossless compression fail?','No. Exact recovery is the lossless property; headers and poorly compressible input can make the archive larger.']}),
  'S5.02-BACKUP': entry(['Backup software creates recoverable copies, schedules jobs and may retain versions.','Recovery is limited to the chosen successful backup and requires an available, usable destination.'],[
    p('A backup is a recoverable copy of files or system data. Backup software can select what to copy, schedule jobs, identify changed files and retain versions. A restore operation takes a saved version back into usable working storage. The original and the recovery copy must not both be lost in the failure being planned for.', 'Plan for restoration'),
    p('A completed copy report does not alone establish that restoration works. Check that the saved data can be read and restored, and inspect the restored contents. More recent successful backups can reduce the interval of lost work; they cannot recover a change that was never captured.', 'Verify the recovery procedure'),
  ], [mechanismVisual('backup-restore'),worked('Recover the timetable after a disk failure',[
    ['09:00 — completed backup','Classes/Friday.txt contains Room 4 (V1). Backup software successfully copies V1 to a separate device that remains available after the working disk fails.'],
    ['09:30 — later edit','The working file is saved as Room 7 (V2). No second backup has completed.'],
    ['09:40 — failure and restoration','The working disk fails. On replacement storage, restore the 09:00 copy to Classes/Friday.txt. Open it and confirm that the recovered text is Room 4.'],
    ['Recovery limit','The Room 7 change was not in the backup. If a 09:35 backup of V2 had completed on the surviving device, selecting that backup would instead restore Room 7.'],
  ])]),
  'S5.03-REUSE': entry(['A program library provides existing routines for reuse through documented interfaces.','Check arguments, results and preconditions; test how the calling program uses the routine.'],[
    p('A program library is a collection of reusable routines or modules. A developer can call a supplied operation instead of designing its algorithm from the beginning. Suitable documented, tested routines can save development and testing effort, improve reliability and provide specialist operations. A library is code for reuse, not a folder of user documents.', 'Reuse an implementation'),
    p('An interface tells the caller the routine’s name, required arguments, their meanings and types, its result and any conditions. In Result <- SQRT(Value), Value supplies the argument, SQRT calculates a returned value, and the assignment stores it in Result. Returning a value does not itself display it. This small reading guide is enough here; Lessons 080–081 develop parameters and functions.', 'Read a call before using it'),
    p('For the supplied library, SQRT accepts a non-negative real number and returns its non-negative square root. The program below assumes numeric input. DECLARE introduces a typed variable; INPUT obtains its value; IF chooses one branch; OUTPUT displays a value; ENDIF closes the decision. The guard prevents an unsupported negative call. This demonstrates a complete caller, not an implementation of square root or a whole distance calculator.', 'State the interface and the program boundary'),
  ], [mechanismVisual('library-call'),example('library','Use a supplied routine safely','The SQRT routine described above is already available; input is one numeric value.','Input 81 gives 9; input 0 gives 0; input -4 gives Unsupported input without calling SQRT. Check the caller’s condition and use of the return value as well as the routine.')]),
  'S5.03-DLL': entry(['Dynamic linking keeps library routines in a separate compatible file used at load time or during execution.','Sharing can reduce duplication and allow compatible library corrections without rebuilding each caller.'],[
    p('A linker connects references in program modules to the code they require. With static linking, required library code is incorporated into the built executable. With dynamic linking, a separate library remains an execution dependency: routines are linked when the application loads or when needed during execution. A DLL is a Dynamic Link Library; the static contrast explains where the code is held.', 'Locate the reused code'),
    p('Two applications can use one compatible DLL instead of each containing a copy of its routines. The calling executables can be smaller; sharing can reduce duplication on disk and may allow sharing loaded code in memory. A benefit needs its cause: the separate library is still required, so a smaller application file does not mean the library code has vanished.', 'Explain a benefit through the arrangement'),
    p('A compatible correction can be installed in the library without recompiling every caller. Compatibility includes expected routine names, parameter meanings and types, and behaviour. Already-running applications may need to reload the library or restart. A matching filename alone does not establish compatibility; a missing routine can prevent a call or application from working.', 'Check an update before relying on it'),
  ], [mechanismVisual('dll'),worked('Update a shared label routine',[
    ['Before','An invoice tool and a stock tool use Label.dll. Its MakeLabel routine accepts an item name and returns label text. Both applications have been tested with that interface.'],
    ['Compatible correction','A corrected DLL fixes text spacing while retaining the same input and intended returned text. Install it and restart both tools so they load the corrected version.'],
    ['Check both callers','Supply the same item names as before; verify correct labels in both applications. The executables did not need recompilation for this compatible correction.'],
    ['Incompatible variant','A replacement removes MakeLabel or requires different arguments. Keeping the name Label.dll does not repair the callers; the dependency and interface must be made compatible.'],
  ])]),
  'S5.04-ASSEMBLER': entry(['An assembler translates processor-specific assembly mnemonics and operands into target machine or object code.'],[
    p('A processor executes instruction encodings, not the letters in a mnemonic such as ADD. An assembler recognises a particular assembly language and produces the corresponding target instructions. It does not accept arbitrary high-level source. Lesson 025 explains the two-pass process and resolution of labels; here the focus is the translator’s input and output.', 'Connect readable source to target instructions'),
    p('An object module can still need linking to other modules before it becomes a complete executable. Linking resolves references to required routines; loading makes the completed program available for execution. These stages explain why translating one source file need not create a complete runnable application. Do not confuse translation with executing the arithmetic that the program describes.', 'Translation, linking and execution have different jobs'),
  ], [section5Visuals.translators,worked('Translate instructions; then execute their meaning',[
    ['Cambridge assembly source','LDM #6\nADD #4\nSTO 200\nEND'],
    ['Initial conditions','The program and result address 200 do not overlap. ACC initially contains 0; Memory[200] contains 0. The target supports the supplied instructions.'],
    ['Assembler output','The assembler produces the target encodings. No particular binary opcode table is specified here, so the mnemonic text is not presented as machine code.'],
    ['Execution and final state','LDM loads 6; ADD produces 10; STO writes 10 to Memory[200]; END returns control to the OS. Final ACC=10 and Memory[200]=10.'],
  ])]),
  'S5.04-COMPILER': entry(['A compiler translates high-level source before the resulting code executes; linking may be required.','Source changes affect the running build only after successful rebuilding and selection of that build.'],[
    p('In the native compilation model, a compiler translates a whole source program or compilation unit into target code before that code runs. Object modules may be linked with required routines into an executable. A native executable targets a compatible processor and system; it is not simply a copy of the source text. Java’s bytecode target is examined separately in Lesson 031.', 'Keep source, target and execution separate'),
    p('The following Cambridge pseudocode specifies a small calculation used for both compilation and interpretation. It is a model of program behaviour, not source accepted by an unspecified real compiler. DECLARE introduces variables, <- assigns a value, WHILE tests before each repetition, and OUTPUT displays a result. Initialisation occurs once; each repetition changes Count so the loop can finish.', 'Read the shared calculation'),
    table('Build and run two versions of the same calculation',['Action','Saved source','Built executable','Observed output'],[
      ['Build A successfully, then run','A adds 2 on each of 3 repetitions','A','6'],
      ['Edit the source but run the old executable','B adds 4 instead of 2','Still A','6'],
      ['Rebuild B successfully and run the new executable','B','B','12'],
      ['Attempt an invalid source edit; build fails; deliberately run retained B','Invalid new source','Last successful B remains in this scenario','12 from B, not from the invalid edit'],
    ]),
    p('Translation diagnostics report problems detected in the source, but successful compilation cannot prove that the intended calculation is correct. A valid subtraction can implement the wrong rule, and invalid run-time data can cause a failure later. Always identify which version was built and which executable was actually launched.', 'Use build evidence without overclaiming'),
  ], [comparison('Artifacts in the native build model',['Artifact / action','Role'],[['High-level source','Developer-readable instructions'],['Compiler output','Target code, possibly an object module'],['Link if required','Resolve references and combine required modules'],['Executable run','Perform the built instructions on a compatible system']]),example('repeatedA','A complete shared calculation','No input. Start a fresh execution of the displayed program; Count and Total are initialised to 0.','After the three bodies, (Count, Total) is (1,2), (2,4), then (3,6). The next test is false and OUTPUT displays 6. Version B changes only Total <- Total + 2 to Total <- Total + 4 and must output 12.')]),
  'S5.04-INTERPRETER': entry(['In the taught interpretation model, statements are translated and carried out as execution follows control flow.','A saved permanent native executable of the whole source is not required by this model.'],[
    p('An interpreter is software that carries out the program as execution progresses. In the high-level interpretation model, it translates and executes statements along the selected control path instead of first saving a permanent native executable for the whole source. It can supply prompt feedback during development when the environment supports executing the supplied section.', 'Explain the execution model'),
    p('The same source position can execute several times, or not at all. In the shared calculation, the WHILE condition is checked four times and its body runs three times. A source line’s position on the page does not determine how often it executes. With the limit changed from 3 to 0, the first test is false and Total remains 0.', 'Follow control flow'),
    table('State trace for the shared calculation',['Point','Count','Total','Output'],s5LoopTrace),
    p('A later run-time failure can occur after earlier output. The next example assumes numeric input and an environment that reports division by zero. Input 0 reaches OUTPUT "Starting", then fails at the division before the final OUTPUT. This is a run-time example, not a claim about when every interpreter detects syntax errors; real implementations may parse source before executing it.', 'State the failure conditions'),
  ], [comparison('The same program, two taught execution models',['Question','Native compiled build','High-level interpretation'],[['What happens before the calculation?','Build target code; link if required.','Provide executable source to a suitable interpreter.'],['What follows the loop?','The built instructions follow its tests and branches.','The interpreter follows its tests and branches.'],['What makes an edit take effect?','Successful rebuild and execution of the new build.','Execute the corrected source in this interpretation model.']]),example('repeatedA','Trace the interpreted calculation','Use the same complete calculation as the preceding unit; no input is needed.','The condition sees Count 0,1,2,3. The body runs only for 0,1,2; the final result is 6. Changing the increment to 4 gives 12 when the changed source is executed.'),example('runtimeFault','Observe partial output before a run-time failure','Input is one INTEGER. Division by zero causes a reported run-time error in this teaching environment.','Input 3 produces Starting then 4. Input 0 produces Starting, then an error at the division. No average is output in that failed run.')]),
  'S5.05-CHOICE': entry(['Compare the same factors and justify the choice from the stated workflow.','Native builds support repeated execution and source-free delivery; interpretation can support prompt development feedback but needs its execution environment.'],[
    p('A choice is justified by connecting a requirement to a mechanism and its consequence. During frequent edits to an executable section, an interpreting environment can let the programmer try the changed statements promptly. For a completed native program run repeatedly, a built executable avoids translating the original source for every run.', 'Use a requirement, not a preference'),
    table('Compare matching factors',['Factor','Native compilation','High-level interpretation'],[
      ['Before execution','A successful build is required.','A suitable interpreter and valid program input are required.'],
      ['After a source correction','Rebuild and run the corrected executable.','Try the corrected source in the interpreting environment.'],
      ['Repeated use','Reuse the existing suitable build.','Interpretation-related work may recur.'],
      ['Delivery','Source need not accompany the native executable.','The user needs the interpreter and a form of the program it can execute.'],
      ['Platform','The build must match the target environment.','The interpreter must support the host and program.'],
    ]),
    p('These are model-based comparisons, not universal performance measurements. A compiler can also support debugging, and an interpreter cannot execute any arbitrary unfinished or syntactically invalid text. Choose a usable section and an environment that supports it. Hiding source by distributing an executable does not establish that its behaviour or algorithms cannot be investigated.', 'Qualify the advantage'),
  ], [comparison('Two requirements, two possible choices',['Requirement','Choice and technical reason'],[['Frequent edits to a supported executable section','Interpretation can provide feedback as that section executes, supporting correction and retesting.'],['Finished native report runs hourly on identical computers; source is retained internally','Compile for that platform; reuse and distribute the resulting executable without supplying source.']]),worked('Reconsider when the requirement changes',[
    ['First phase','A learner repeatedly changes a calculation and inspects its values. A suitable interpreter supports a short edit-and-try cycle.'],
    ['Delivery phase','The completed native program must run repeatedly on known identical systems. Compilation supplies a reusable build, but correcting the source requires rebuilding and deploying it.'],
    ['Changed environment','Users now have different platforms. One native build may not suit all of them: provide suitable builds or use a supported portable execution approach. A deadline alone does not decide the translator.'],
  ])]),
  'S5.06-JAVA': entry(['javac compiles .java source to .class bytecode for the JVM.','A compatible host JVM executes the bytecode; editing source does not update an existing class file.'],[
    p('Java illustrates partial compilation and partial interpretation. The Java compiler javac reads .java source and produces .class files containing bytecode. Bytecode is defined for the Java Virtual Machine, not as a universal physical processor’s instruction set. A compatible JVM provides execution on its host.', 'Distinguish the two stages'),
    p('To perform the example, use a Java development environment with javac and java available, such as a JDK. Save the exact source as Hello.java and run the commands from that directory. The destination machine needs a compatible Java runtime to execute Hello.class; it does not need javac merely to run this existing class file. Java syntax is supporting material, not Cambridge pseudocode.', 'Make the environment explicit'),
    table('Track source, bytecode and output',['Action','Hello.java','Hello.class','Console result'],[
      ['Compile with javac Hello.java, then java Hello','Prints Hello, World!','Built from that source','Hello, World!'],
      ['Edit only the string to Hello, Class!; run java Hello','Edited source','Old bytecode remains','Hello, World!'],
      ['Run javac Hello.java again successfully; then java Hello','Edited source','Updated bytecode','Hello, Class!'],
      ['Copy only the new Hello.class to a compatible runtime and use java Hello','Source not needed for this run','Updated bytecode copied','Hello, Class!'],
    ]),
    p('If javac is unavailable, investigate the development tools; if a class cannot be run, investigate the compatible runtime, class location and launch command. Compiling another class file cannot by itself install a missing runtime. For this public class the filename is Hello.java, and the launch command names Hello without the .class extension.', 'Diagnose the stage that failed'),
  ], [section5Visuals.java,worked('Build, run, edit and rebuild Hello',[
    ['Initial source — save as Hello.java',section5Java.hello],
    ['Compile and launch','javac Hello.java\njava Hello'],
    ['First observation','The compiler creates Hello.class; running it displays Hello, World!'],
    ['Edited source — replace Hello.java',section5Java.helloEdited],
    ['Compare the two runs','Before recompiling, java Hello still displays Hello, World! After a successful javac Hello.java, java Hello displays Hello, Class!'],
  ])],{extensions:[extension('JIT and portability limits','A JVM may interpret bytecode and compile frequently executed code just in time for its host. JVM version requirements and native libraries can limit portability. This explains real implementations; compiler optimisation and virtual-machine internals are not required for this AS example.')]}),
  'S5.07-CODING': entry(['An IDE combines programming tools; context-sensitive prompts suggest options appropriate to the current editing position.','The programmer remains responsible for choosing the intended operation and arguments.'],[
    p('An Integrated Development Environment brings an editor and development tools into one working environment. It may call a separate compiler or interpreter, display diagnostics and provide a debugger. The IDE is not itself a new translation model; the selected tools determine how its program is built and executed.', 'Place the IDE around the workflow'),
    p('Context-sensitive prompts use the language and current position to suggest keywords, identifiers, members or routine parameters. At a library call they can help recall its name and argument types. The illustration is a language-neutral teaching interface using Cambridge-style notation; it does not claim that every IDE accepts that pseudocode.', 'Use the editing context'),
    p('A calculation needs Quantity * UnitPrice. An editor can legitimately suggest both UnitPrice and Delivery if both names are available. Selecting Delivery gives legal syntax but the wrong meaning. Prompts reduce typing and recall work; they cannot establish the complete intended algorithm.', 'A valid suggestion can still be the wrong choice'),
  ], [section5Visuals.editor]),
  'S5.07-SYNTAX': entry(['Dynamic syntax checking flags language-rule violations as source is entered.','Diagnostics guide investigation; syntax acceptance does not prove the algorithm correct.'],[
    p('Dynamic syntax checking examines source while it is entered and reports rule violations before a full program run. For example, Total <- Total + is missing a right operand. Supplying Increment completes the expression. A diagnostic or report window can show a description and source location, while an inline marker highlights the relevant area.', 'Read the diagnostic and repair the cause'),
    p('The reported position can be where the parser discovers a problem rather than where it began. A missing closing bracket may become apparent at the next token. Read the surrounding source, correct the intended construct, then check again. Fixing a reported error can remove later messages caused by that same mistake.', 'Use location as evidence'),
    p('Total <- Total - Increment is grammatically valid. If the requirement is addition, syntax checking may accept it while the result is wrong. A run-time error, such as the stated division-by-zero example in Lesson 030, occurs during execution. These distinctions help select evidence; systematic error classification and testing methods are developed in Lessons 087–090.', 'Choose the right kind of check'),
  ], [comparison('Similar source, different evidence',['Source / symptom','What to investigate'],[['Total <- Total +','Missing operand: use syntax feedback, then complete the intended expression.'],['Total <- Total - Increment; requirement is addition','Valid grammar but wrong operation: compare executed values with expected values.'],['A program reports an error during division by zero','Inspect the divisor and the path producing it during execution.']])]),
  'S5.07-PRESENTATION': entry(['Pretty-printing exposes source structure through consistent formatting; folding hides or reveals blocks.','Formatting and folding do not choose branches or disable statements.'],[
    p('Pretty-printing applies readable presentation such as consistent indentation; syntax colouring can distinguish language elements. Indenting the statements inside each IF branch makes their ownership easier to see. This helps reading but does not prove the decision is correct.', 'Expose the source structure'),
    p('Expanding a block reveals its body; collapsing it hides that source text while retaining it in the program. Hidden code still executes when control flow selects it. Folding is different from deleting statements or commenting them out. The folded display below is an editor view, not replacement source code.', 'Separate the editor view from execution'),
  ], [comparison('Three views of the same decision',['View','Display and meaning'],[['Unformatted','Branch outputs align with IF and ELSE; the language constructs still determine their branches.'],['Pretty-printed','Branch outputs are indented beneath their controlling lines; keywords can be coloured.'],['Collapsed','The editor shows IF Mark >= 50 THEN … ENDIF and hides the body; both branch outputs still exist.']]),worked('Format and fold without changing the result',[
    ['Complete Cambridge pseudocode',s5Code('presentation')],
    ['Read the condition','INPUT supplies one integer. IF chooses Pass for Mark >= 50 and Retry otherwise. ELSE separates the alternatives; ENDIF closes the decision.'],
    ['Unformatted source — same statements',s5Code('presentation').split('\n').map(line=>line.trimStart()).join('\n')],
    ['Compare the indentation','For this explicit-ENDIF pseudocode, IF, ELSE and ENDIF still define the branches. Pretty-printing restores the indentation shown in the first listing; it does not choose a different branch.'],
    ['Collapsed editor view — not replacement source','DECLARE Mark : INTEGER\nINPUT Mark\nIF Mark >= 50 THEN … ENDIF'],
    ['Fold and expand','The collapsed view hides the two branch bodies and ELSE inside the folded region. Expand it to reveal the complete first listing again. No source statements have been removed.'],
    ['Verify both branches','Input 60 gives Pass; input 49 gives Retry; input 50 gives Pass. The results are the same while the block is collapsed.'],
  ])]),
  'S5.07-DEBUG': entry(['Use a breakpoint to pause before a chosen statement, then single-step and inspect its effect.','Distinguish variable values, expression results and output; correct the cause and rerun from the initial state.'],[
    p('Debugging connects an unexpected result to the operation that caused it. First predict the required result independently. A breakpoint selects a place to pause, normally before that statement executes. Single stepping performs one statement and pauses again. State which convention and line are being used rather than assuming the selected line has already run.', 'Predict, pause and advance'),
    table('Observe different kinds of evidence',['Facility','What it shows / does'],[
      ['Variable inspection','Current stored values while paused.'],['Expression watch','The result of an expression such as Total + Increment using the current values. This pure arithmetic expression does not assign a value or execute OUTPUT.'],['Program output window','Only output statements already executed.'],['Diagnostics / report window','Messages such as syntax or run-time errors; an IDE may show diagnostics and program output in separate panels.'],
    ]),
    p('The required calculation below adds 4 to 12, so the intended output is 16. The displayed subtraction is the fault. At the pause before line 5, Total is still 12. After one step Total is 8, while line 6 has not executed. The watch Total + Increment then evaluates to 12 using the new stored Total; it does not repair that variable.', 'Explain each observation'),
    p('After correcting the operator, restart from the initial state and check the final output. Continuing from the faulty Total=8 would test a different starting condition. Use a different example in Practice to decide where to pause yourself. This is a complete small debugging task; Lessons 087–090 extend the approach to systematic testing.', 'Retest the corrected calculation'),
  ], [mechanismVisual('debugger'),worked('Locate the wrong operator and finish the run',[
    ['Faulty Cambridge pseudocode; line numbers locate the pause',s5Code('debugFault',true)],
    ['Pause before line 5','Total=12, Increment=4, watch Total + Increment=16, and no output has occurred.'],
    ['Step line 5','Total=8, Increment=4, watch Total + Increment=12. OUTPUT is still the next statement.'],
    ['Step line 6 and finish','The output window now contains 8. Reaching the end successfully does not make the calculation correct.'],
    ['Corrected complete program',s5Code('debugFixed')],
    ['Restart and check','From Total=12 and Increment=4, the corrected assignment produces Total=16; executing OUTPUT displays 16.'],
  ]),worked('Supporting Java: the same debugging task',[
    ['Conditions','Use a Java-capable IDE and a JDK. Save the following as DebugDemo.java. Its line 5 corresponds to the faulty assignment; the pseudocode and Java line numbers are separate.'],
    ['Complete Java source',section5Java.debug],
    ['Observe','Pause before total = total - increment; inspect total and increment, step once, then step the print statement. Stored values change 12 to 8 and the console displays 8.'],
    ['Correct and rerun','Change subtraction to addition, rebuild successfully and restart. The console displays 16. Java uses = for assignment and semicolons; those are not Cambridge pseudocode rules.'],
  ])]),
};

export function enhanceSection5Teaching(lesson) {
  const sourceUnits = lesson.originalLesson === 26
    ? ['NEED','MEMORY','PROCESSES','FILES','SECURITY','HARDWARE'].map(key=>lesson.units.find(u=>u.unitKey===`S5.01-${key}`))
    : lesson.units;
  const units = sourceUnits.map(unit => {
    const spec = teaching[unit.unitKey];
    if (!spec) throw new Error(`Missing S5 detailed teaching: ${unit.unitKey}`);
    const firstExample = spec.materials.find(m=>m.type==='worked-example');
    return {...unit, teachingBlocks:spec.blocks, explanation:spec.essentials,
      preserveSelectedVisual:true, preserveTeachingSteps:true, useAuthoredVisual:true,
      materials:spec.materials.map(m=>({...m,objectiveIds:unit.objectiveIds,preserve:m!==firstExample&&m.type!=='flow'})),
      ...(spec.extensions?{extensions:spec.extensions}:{}),
      ...(spec.check?{checkpoint:{prompt:spec.check[0],answer:spec.check[1]}}:{}),
    };
  });
  const routes = {
    26:['Study memory and process management together: working storage and processor time solve different needs.','Then follow the timetable through file, security and hardware services; use the earlier concepts to explain the combined task.'],
    27:['First choose maintenance and recovery utilities from their purposes and limits.','Then distinguish reusable program code from maintenance tools, and follow a library call and a compatible DLL update.'],
    28:['Review assembly translation using Lesson 025, then compare high-level build and execution models.','Use the supplied code-reading guide and complete listings before tracing the normal and failed runs.'],
    29:['Justify a translator from the stated requirements; revisit the decision when those requirements change.','Follow Java source, bytecode and runtime separately through the edit–build–run example.'],
    30:['Read editing and presentation facilities before using the debugger.','Predict values, follow the complete pause–step–inspect–output sequence, then solve the independent wrong-variable task.'],
  };
  return {...lesson,units,teachingCheckpoints:routes[lesson.originalLesson]};
}
