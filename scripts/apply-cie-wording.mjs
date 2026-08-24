import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const replacements = [
  ["CIE-style", "Cambridge-style"],
  ["Exam trap", "Common error"],
  ["exam trap", "common error"],
  ["Common trap", "Common error"],
  ["common trap", "common error"],
  ["Raw bits are tiny. Exams make them measurable.", "Bit patterns acquire meaning from their representation."],
  ["without losing marks to lonely units", "with the correct units shown at each stage"],
  ["Is `00000111` a number, a colour, or just eight dramatic digits?", "What does the bit pattern `00000111` represent?"],
  ["Pick an answer. The bits are waiting politely.", "Select the answer that accounts for the representation context."],
  ["MiB is not just a fancy spelling of MB.", "MiB and MB use different magnitude prefixes."],
  ["Not every network is “the internet”, and not every cloud is weather.", "Distinguish networks by access, ownership and purpose."],
  ["The spelling difference is small; the exam difference is not.", "Distinguish these terms by access scope and purpose."],
  ["Compare by access, not by buzzword", "Compare networks by access and control"],
  ["The network path is not magic. It is a physical route with trade-offs.", "A network path uses physical transmission media with different characteristics."],
  ["as a fancy synonym for every network device", "as a general term for every network device"],
  ["A computer system is not one magic box. It is a team with very specific jobs.", "A computer system contains components with distinct functions."],
  ["The exam wants the mechanism, not a dramatic biography of the fan.", "Identify the input, processing decision and resulting output action."],
  ["Choose using criteria, not vibes", "Choose hardware using stated criteria"],
  ["Hardware does not fail because it is dramatic. It fails because dust, heat and power cuts are patient.", "Environmental conditions and power faults can reduce hardware reliability."],
  ["The CPU is not one magic chip doing everything by vibes.", "CPU components perform distinct and coordinated functions."],
  ["The CPU cannot run your vibes. It runs instructions it understands.", "A processor executes instructions defined by its instruction set."],
  ["Faster hardware is not a magic speed potion.", "Processor performance depends on several interacting factors."],
  ["not magically instant", "not completed instantaneously"],
  ["Pipelining improves throughput, not by magic", "Pipelining can improve instruction throughput"],
  ["Before answering, choose the right mental toolbox.", "Identify the relevant processor concept before answering."],
  ["The Section 4 mental toolbox", "Section 4 concept map"],
  ["The first mark often comes from opening the right mental toolbox before writing.", "Identify the relevant syllabus concept before constructing the answer."],
  ["Three mixed questions are on the board. Which mental toolbox opens first?", "Which syllabus concept is required for each mixed question?"],
  ["The OS is not the app. The translator is not the source code. The utility is not magic cleaning spray.", "Distinguish the operating system, application software, translators and utility software by function."],
  ["A utility is not a magic \"make computer better\" button. Name the job.", "Name the specific task performed by the utility software."],
  ["The mark scheme is not allergic to you. It just wants the exact mechanism.", "A complete answer states the relevant mechanism precisely."],
  ["Processors are fast, but they are not bilingual by vibes.", "Processors require instructions to be translated into an executable form."],
  ["not because it is magic", "because the mapping is systematic"],
  ["it does not make the data magical", "it does not remove the need for addressing and routing"],
  ["The payload is the gift. The header is the address label. Do not post a parcel with only vibes.", "The payload contains the transmitted data; the header contains information needed to deliver and reassemble it."],
  ["The PC is not dramatic; it simply points to the next instruction like a very serious bookmark.", "The PC stores the address of the next instruction to be fetched."],
  ["A database is not a magic spreadsheet. It is organised data with rules, tools and a bouncer at the door.", "A database is an organised collection of related data managed through defined structures and controls."],
  ["useful but not magic", "useful for reducing redundancy and update anomalies"],
  ["not magically base-2", "unrelated to binary representation"],
  ["Passwords are normally stored as hashes, not encrypted plaintext waiting politely to be stolen.", "Passwords are normally stored as salted hashes rather than as plaintext or reversibly encrypted values."],
  ["Choose by job, not by favourite buzzword", "Select the method that provides the required security property"],
  ["without claiming any control is magic", "while recognising the limitations of each control"],
  ["A fingerprint is convenient but not magic.", "A fingerprint can provide convenient biometric authentication, but it has limitations."],
  ["A fingerprint can provide convenient biometric authentication, but it has limitations. If copied", "A copied fingerprint"],
  ["The exam is not asking for vibes. It wants units.", "Show each stage of the calculation and include the required units."],
  ["Trace values, not vibes", "Trace values in execution order"],
  ["not vibes", "using evidence"],
  ["not by favourite buzzword", "using the project requirements"],
  ["The lifecycle is not a poster. It is how a project avoids becoming an expensive shrug.", "Lifecycle models organise the activities used to develop and maintain software."],
  ["The key idea is not memorising stage names like a spell; it is explaining", "The key requirement is to explain"],
  ["Choose a model based on the project, not a favourite buzzword", "Choose a lifecycle model using the project requirements"],
  ["The keyboard is ready. The requirements are not. Choose the sensible first move.", "Choose the activity that turns the initial request into measurable requirements."],
  ["Mixed questions are not random. They are organised chaos with mark schemes.", "Mixed questions require careful identification of topic, command word and response form."],
  ["prevents using the wrong mental toolbox", "prevents selection of an unrelated syllabus concept"],
  ["Open the correct mental toolbox", "Identify the relevant syllabus concept"],
  ["Which mental toolbox should open first?", "Which syllabus concept is required first?"],
  ["Which mental toolbox opens first?", "Which syllabus concept is required first?"],
  ["Review is not rereading. It is choosing the right mental toolbox under exam pressure.", "Effective review combines retrieval, selection of the relevant concept and timed application."],
  ["Review is not rereading. Review is making your brain retrieve receipts.", "Effective review requires active retrieval and correction."],
  ["Sorting is not magic; it is disciplined comparison with receipts.", "Sorting algorithms apply a defined sequence of comparisons and movements."],
  ["A debugger is not magic. It is a very patient witness.", "A debugger provides evidence about program state and execution flow."],
  ["one quiet off-by-one error wearing a very ordinary hat", "an off-by-one error in the loop bounds"],
  ["a very dramatic way to make life worse", "insufficient for useful processor operations"],
  ["dramatic countdown order", "numerical countdown order"],
  ["despite the dramatic branding", "because no fractional arithmetic is required"],
  ["dramatic cybersecurity vocabulary", "unsupported security terminology"],
  ["dramatic opinions", "unsupported opinions"],
  ["dramatic keyboard pointing", "unsupported assumptions"],
  ["less dramatic, but more strict", "interpreted using binary place values"],
  ["a dramatic chance of wrongness", "a high risk of an incorrect result"],
  ["Dramatic, not useful.", "The join path must follow the defined relationships."],
  ["If your database identifies people by vibes, the mark scheme will quietly leave.", "Identifiers must be based on suitable keys rather than informal characteristics."],
  ["Emoji are not magic stickers. They are characters with assigned Unicode code points, then rendered by software and fonts.", "Emoji are characters assigned Unicode code points and rendered by software using available fonts or graphics."],
  ["Higher colour depth allows more possible colours, but it does not magically improve a low-quality original image.", "Higher colour depth allows more possible colours, but it cannot add detail that is absent from the original image."],
  ["CASE is not a magic replacement for every IF.", "CASE is suitable only when one expression is compared with discrete values."],
  ["A fingerprint is convenient but not magic. If copied or falsely accepted, it cannot be changed like a password.", "A biometric characteristic cannot be changed as easily as a password if its stored representation is compromised."],
  ["Clear tasks, not vague revision fog", "Homework tasks"],
  ["Clear tasks, not vague revision", "Homework tasks"],
  ["What must survive until the exam?", "Summary of required knowledge"],
  ["Pick the purpose first. The printer is not being dramatic; it is simply a shared resource.", "Select the network purpose that applies to the shared printer."],
  ["is not to feel bad about a number; it is to make the next number less dramatic", "is to use the result as evidence for a specific improvement"],
  ["Whether the sky looks dramatic in the photo", "Whether the photograph shows relevant input data"],
  ["not dramatic; it is an off-by-one error in the loop bounds", "caused by an off-by-one error in the loop bounds"],
  ["A copied fingerprint or falsely accepted, it cannot be changed like a password.", "A biometric characteristic cannot be changed as easily as a password if its stored representation is compromised."],
  ["why an error belongs to a category using evidence, using evidence", "why an error belongs to a category using evidence"],
  ["A washing machine is not having a personality. It is following rules with sensors, outputs and a lot of confidence.", "A washing machine control system uses sensor inputs and programmed rules to determine its outputs."],
  ["This is Paper 1 database thinking, not the program fragment toolbox.", "This applies database concepts from Paper 1 rather than program-fragment analysis."],
  ["Click the best answer. The debugger is not a personality trait; it is a workflow.", "Select the most appropriate answer. Debugging follows a systematic process."],
  ["Semicolons are not a personality trait.", "Do not make Java punctuation the focus of a pseudocode response."],
  ["Find the trap, fix the answer", "Identify and correct the error"],
  ["whether it is decomposition, abstraction or a trap", "whether it demonstrates decomposition, abstraction or an error"],
  ["Trap. Importance is not a reason for WHILE.", "Common error: importance is not a reason for using WHILE."],
  ["<strong>Trap:</strong>", "<strong>Common error:</strong>"],
  ["<strong>Trap</strong>", "<strong>Common error</strong>"],
  ["Trap Optimisation does not mean", "Common error Optimisation does not mean"],
  ["4. Trap DoS", "4. Common error DoS"],
  ["4. Trap Do not", "4. Common error Do not"],
  [">Trap<", ">Common error<"],
  ["one example, one trap", "one example and one common error"],
  ["the wording trap", "the common wording error"],
  ["the likely trap", "the likely error"],
  ["the classic trap", "a common error"],
  ["common algorithm trap", "common algorithm error"],
  ["The exam enjoys that trap.", "This is a common source of error."],
  ["Task 3: Explain the trap", "Task 3: Explain the common error"],
  ["Same name trap", "Same-name variable error"],
  ["Typical mark trap", "Typical marking error"],
  ["Phone number trap", "Phone-number data type error"],
  ["Trap A translator may not detect it because the instructions are legal.", "Common error A translator may not detect it because the instructions are legal."],
  ["The name is the same; the storage location is not. Same label, different locker.", "The identifier is the same, but the local and global variables occupy different storage locations."],
  ["Trap Paying is not a reliable recovery strategy in an exam answer.", "Common error Paying is not a reliable recovery strategy in an examination answer."],
  ["Trap A Trojan does not need to self-replicate to be harmful.", "Common error A Trojan does not need to self-replicate to be harmful."],
  ["Trap Do not say every self-spreading threat is a virus.", "Common error Do not say every self-spreading threat is a virus."],
  ["Trap DoS does not primarily mean data is stolen; the main issue is service availability.", "Common error DoS does not primarily mean data is stolen; the main issue is service availability."],
  ["Trap Do not use \"hacking\" as a label for every cyber attack. It specifically involves unauthorised access.", "Common error Do not use \"hacking\" as a label for every cyber attack. It specifically involves unauthorised access."],
  ["Trap Do not define pharming as just \"sending a fake email\"; that is phishing.", "Common error Do not define pharming as just \"sending a fake email\"; that is phishing."],
  [String.raw`Trap Do not use \"hacking\" as a label for every cyber attack. It specifically involves unauthorised access.`, String.raw`Common error Do not use \"hacking\" as a label for every cyber attack. It specifically involves unauthorised access.`],
  [String.raw`Trap Do not define pharming as just \"sending a fake email\"; that is phishing.`, String.raw`Common error Do not define pharming as just \"sending a fake email\"; that is phishing.`],
];

function filesBelow(relativeDirectory, extensions) {
  const directory = path.join(root, relativeDirectory);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && extensions.has(path.extname(entry.name)))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

const files = [
  ...filesBelow("web", new Set([".html", ".js"])),
  ...filesBelow("lessons", new Set([".md"])),
  ...filesBelow("assessments", new Set([".md"])),
  ...filesBelow("resources", new Set([".md"])),
  ...[
    "scripts/stage2-repairs-data.mjs",
    "scripts/stage3-assessments-data.mjs",
    "scripts/stage4-quizzes-data.mjs",
    "scripts/stage10-explanations-data.mjs",
    "scripts/stage10-rollout-jobs.json",
  ].map((file) => path.join(root, file)),
];

let changed = 0;
let substitutions = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const original = fs.readFileSync(file, "utf8");
  let source = original;
  for (const [before, after] of replacements) {
    const count = source.split(before).length - 1;
    if (!count) continue;
    source = source.replaceAll(before, after);
    substitutions += count;
  }
  if (source !== original) {
    fs.writeFileSync(file, source);
    changed += 1;
  }
}

console.log(`Applied CIE wording calibration: ${substitutions} substitutions in ${changed} files.`);
