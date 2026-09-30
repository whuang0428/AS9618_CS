import { s5Code } from './course-v3-section5-programs.mjs';
const ids = (r,...ns) => ns.map(n=>`S5.${String(r).padStart(2,'0')}.A${String(n).padStart(2,'0')}`);
const q = (lesson,n,prompt,objectiveIds,answerPoints,commonError,extra={}) => ({
  id:`S5-L0${lesson}-Q${n}`,prompt,objectiveIds,answerPoints,commonError,marks:answerPoints.length,type:'Application',authored:true,...extra,
});
const supplied = (key,caption) => ({code:s5Code(key,true),codeLabel:'Supplied Cambridge pseudocode',codeCaption:caption});
const revisions = [
  q(1,3,'An authorised application creates Notes/Revision.txt, writes Binary revision, closes it, reopens it for reading, reads and closes it. Describe what file management records and does, then state the saved contents and read-buffer contents. Explain what changes if it instead requests a read of missing Notes/Absent.txt.',ids(1,3),[
    'Creation records the filename in the directory and the information used to locate its contents.',
    'File services coordinate opening, writing and reading, and release open-file resources on close.',
    'The saved file and the read buffer both contain Binary revision after the successful sequence.',
    'The missing path produces a failure to locate/open that file, not a successful read of Revision.txt or invented file contents.',
  ],'An open-file reference and a read buffer are not the persistent file itself.'),
  q(1,7,'An editor and an audio player share one CPU core. A signed-in reader tries to overwrite a read-only report, while the editor waits for a permitted disk read and a printer is busy with another job. Explain the value of common OS services and identify the different decisions for the denied write, CPU allocation and pending print job.',[...ids(1,1,4,5,6)],[
    'Applications can request common services without each implementing every device protocol, while the OS coordinates access.',
    'Security management rejects the overwrite because authentication does not grant write permission.',
    'Process management can select the ready audio player while the editor waits for its required input.',
    'Hardware/peripheral management keeps the print job queued until the device is available, with an appropriate driver providing its commands.',
  ],'Having an account, waiting for CPU time and waiting for a printer are different conditions.'),
  q(2,4,'Report A says that a consistent 100 GB volume contains 70 GB of videos, 25 GB of other files and 5 GB free. Report B says its file-allocation records are inconsistent. Explain which utility function addresses each report and give one limit of repair when data is physically unreadable.',ids(2,4),[
    'Contents analysis identifies the large video files or folders responsible for the space use in A.',
    'A gives no file-system corruption to repair; the user must review storage needs and which files to retain or move.',
    'Disk checking/repair investigates the inconsistent allocation in B and attempts supported corrections.',
    'Repair cannot guarantee recovery of physically unreadable or missing data; an available backup may be needed.',
  ],'Nearly full storage is not by itself evidence of corruption.'),
  q(2,6,'A separate recovery device holds a successful 10:00 backup containing Draft A. The working file is saved as Draft B at 10:20 and the working disk fails at 10:25, before another backup. State the restored contents, explain why, and describe a useful restore check.',ids(2,6),[
    'Restoring the available 10:00 backup recovers Draft A.',
    'Draft B was not captured; the separate device protects the saved version against the working-disk failure, not every subsequent edit.',
    'Restore to usable storage, open the recovered file and compare its contents with the selected saved version.',
  ],'A successful older backup cannot reconstruct an unbacked-up edit.'),
  q(2,9,'Identify suitable utilities for three needs: prepare a known-empty volume with no file system; isolate a program flagged as suspicious; send source-code files using fewer bits when possible. Explain the relevant action for each, then state why a clean scan cannot prove every threat absent and why a tiny archive might be larger than its source files.',ids(2,1,2,5),[
    'A formatter creates the file-system organisation on the known-empty volume.',
    'A virus checker can quarantine the suspect program to prevent normal execution while it is handled.',
    'A lossless compression utility can create an archive whose extraction restores every original source character.',
    'The scan may fail to recognise a threat; no detection is not proof that all possible threats are absent.',
    'Archive overhead or poorly compressible data can outweigh the size reduction, especially for tiny inputs.',
  ],'Do not propose formatting for recovery, or call a compressed working copy an independent backup.'),
  q(3,2,'Source A outputs 6 and its native executable has been built successfully. The developer saves source B, which should output 12, but has not rebuilt. State what happens when the old executable runs, describe how to obtain the new result, and explain why a successful build can still produce an unintended result.',ids(4,2),[
    'The old executable still outputs 6 because it contains the translated version A.',
    'Compile B and link required modules successfully to produce an updated native executable.',
    'Run that updated executable on a compatible system to obtain 12 for the stated correct source B.',
    'A build can accept valid language constructs that implement the wrong algorithm; test results against the requirement.',
  ],'Saving source, completing a build and launching a particular build are separate actions.'),
  q(3,3,'Complete a trace of the supplied calculation in the taught high-level interpretation model. Give the number of condition checks, the number of loop-body executions and the output. Then change only the condition limit from 3 to 0 and state the output. Explain whether this model must first save a permanent native executable of the complete source.',ids(4,3),[
    'The condition is checked four times, with Count equal to 0, 1, 2 and 3.',
    'The body executes three times, producing Total values 2, 4 and 6; OUTPUT displays 6.',
    'With Count < 0, the first check is false and the output is 0 from the initial Total.',
    'This model follows the source control flow through an interpreter without requiring a saved permanent native executable of the whole source.',
  ],'Count only executed statements; a source position can be revisited or skipped.',supplied('repeatedA','No input is required; initialise both variables as shown. The code specifies the teaching model rather than input to an unspecified real interpreter.')),
  q(4,3,'Describe what javac produces from Hello.java and how a compatible destination executes it. A second computer can run an existing Hello.class but cannot find javac. Explain why these observations are consistent, and why bytecode is not a universal physical-processor instruction set.',ids(6,1),[
    'javac produces Hello.class containing bytecode for the JVM.',
    'A compatible Java runtime on the destination executes that bytecode through its JVM.',
    'Running an existing class does not require the source compiler; the second computer may have suitable runtime support without javac available.',
    'Bytecode targets a virtual machine, and its implementation must suit the host; the physical CPU does not directly recognise universal JVM instructions.',
  ],'A missing compiler and a missing execution environment are different problems.'),
  q(4,4,'Hello.class currently prints Hello, World! The saved Hello.java has been edited to print Hello, Class! Predict the result of java Hello before recompilation. Give the two commands needed to obtain the edited output, and explain why an unsuccessful rebuild would not establish that the class has been updated.',ids(6,1),[
    'java Hello runs the old class and prints Hello, World! before a successful rebuild.',
    'Run javac Hello.java successfully, then java Hello; the updated output is Hello, Class!',
    'A failed build does not supply evidence of a valid updated class; identify and run the successfully built version.',
  ],'The run command names the class Hello, not Hello.class.'),
  q(5,5,'The required cost is Quantity multiplied by UnitPrice; Delivery must not be included. Describe how to choose a breakpoint and inspect the operands in the supplied syntactically valid program. State Cost after stepping the faulty assignment, evaluate Quantity * UnitPrice without changing Cost, observe the actual output, then give the correction and expected result after restarting.',ids(7,2,5,6,7,8),[
    'Pause before line 8: Quantity=3, UnitPrice=4 and Delivery=2. Syntax checking may accept the wrong variable because its use is grammatically valid.',
    'Single stepping line 8 makes Cost=6 because the actual operands are Quantity and Delivery.',
    'Watching Quantity * UnitPrice evaluates to 12 while Cost remains 6.',
    'Step line 9 to produce 6 in the program-output window; merely inspecting the expression does not output it.',
    'Replace line 8 with Cost <- Quantity * UnitPrice.',
    'Restart from the given initialisations and run the corrected program; it outputs 12.',
  ],'Choose the intended variable, not a different operator; 12 in a watch window does not mean Cost has become 12.',supplied('wrongVariable','The program has no external input. Line numbers identify debugger locations; a breakpoint pauses before its selected statement.')),
];

export function enhanceSection5Questions(lesson) {
  const number = lesson.originalLesson - 25;
  const selected = revisions.filter(q=>q.id.startsWith(`S5-L0${number}-`));
  const replacements = new Map(selected.map(q=>[q.id,q]));
  const existing = new Set(lesson.practice.map(q=>q.id));
  return {...lesson,practice:[...lesson.practice.map(q=>replacements.get(q.id)??q),...selected.filter(q=>!existing.has(q.id))]};
}
