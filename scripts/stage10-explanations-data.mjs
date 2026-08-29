import fs from "node:fs";
import path from "node:path";
import { sourceFactOverrides } from "./stage10-semantic-source-overrides.mjs";
import { stage3OptionalBaseLessons } from "./remediation-v2-stage3-sequence-plan.mjs";
import { coreVisualTargetKeys, visualDeliveryLesson, visualDeliveryTarget } from "./remediation-v2-core-visuals.mjs";
import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { optionalEnrichment } from "./remediation-v2-optional-enrichment.mjs";

const visualTitleOverrides = Object.freeze({
  "098/concept": "An algorithm is a solution expressed as defined steps",
  "008/pixels": "Bitmap file header and pixel data",
  "010/resolution": "Sampling resolution: bits per sample",
  "034/sensors": "Required sensor types and applications",
  "043/main-registers": "The seven named register roles",
  "049/concept": "The official processor performance factors",
  "107/pseudocode": "Count vowels with a closed selection",
  "121/parse": "Use question-supplied CSV functions exactly",
  "121/pseudocode": "Question-supplied functions versus Java methods",
  "121/types": "Convert CSV text before numeric comparison",
  "046/structure": "Instruction labels and symbolic data addresses",
  "046/assembler": "Instruction groups: data movement, I/O, arithmetic, control and compare",
  "050/shifts": "Binary shifts: logical, arithmetic, cyclic",
  "047/effective": "Official LDR, CMI, JPE and JPN semantics",
  "047/modes": "Five addressing modes",
  "055/compare": "Choose the required utility by its operation",
  "086/join": "Two-table INNER JOIN with ON",
  "099/pattern": "Produce an abstract model",
  "111/analyser": "Stepwise refinement turns a high-level algorithm into implementable modules",
  "113/pseudocode": "The eight Cambridge pseudocode type names",
  "118/declare": "Define a record, then save and read named fields",
  "122/concept": "An ADT is data together with permitted operations",
  "122/implementation": "Implement stack, queue and linked list using arrays",
  "130/parameters": "A subprogram interface connects caller and header",
  "133/case": "LCASE and UCASE convert one CHAR",
  "133/concat": "Concatenation joins STRING values",
  "133/java": "MID and Java substring use different positions",
  "133/substring": "Use the string-function definition supplied in the question",
  "140/standard": "Translate a flowchart or structured English into pseudocode",
  "138/bug": "Analyse and amend an existing program",
  "144/algorithms": "Structure charts, derived pseudocode and state transitions",
  "145/changeover": "Test strategy and test plan are different documents",
  "074/ip": "What intellectual property can protect",
  "123/pseudocode": "Justify the data structure in Cambridge answers",
  "130/procedure": "A procedure performs actions and returns no value",
  "137/boundary": "Extreme or boundary data uses valid values at accepted limits",
  "137/erroneous": "Abnormal data is invalid data that should be rejected",
  "137/validation": "Testing checks validation against expected results",
  "145/evaluation": "Evaluation uses requirements and measurable success criteria",
});

const deliveryOverrides = Object.freeze({
  "050/compare": Object.freeze({ role: "OPTIONAL", activity: "EXTEND" }),
  "050/concept": Object.freeze({ role: "OPTIONAL", activity: "EXTEND" }),
  "050/hazards": Object.freeze({ role: "OPTIONAL", activity: "EXTEND" }),
  "050/stalls": Object.freeze({ role: "OPTIONAL", activity: "EXTEND" }),
  "050/timing": Object.freeze({ role: "OPTIONAL", activity: "EXTEND" }),
  "142/agile": Object.freeze({ role: "OPTIONAL", activity: "EXTEND" }),
});

const stage3OptionalLessonIds = new Set(stage3OptionalBaseLessons.map((lesson) => String(lesson).padStart(3, "0")));
const formalCoreLessonIds = new Set(coverageContract.requirements.flatMap(({ teachingLessons }) => teachingLessons).map((lesson) => String(lesson).padStart(3, "0")));
const reviewedOptionalExplanationKeys = new Set(optionalEnrichment.flatMap(({ lesson, optionalSectionIds }) => optionalSectionIds
  .filter((sectionId) => sectionId.startsWith("explanation-"))
  .map((sectionId) => `${String(lesson).padStart(3, "0")}/${sectionId.replace(/^explanation-/, "")}`)));
const additionalOptionalExplanationLessons = new Set(["011", "021", "057"]);
const deliveryFor = (key, lesson) => {
  const lessonId = String(lesson).padStart(3, "0");
  if (coreVisualTargetKeys.has(key)) return { role: "CORE", activity: "TEACH", group: key.split("/")[1] };
  if (stage3OptionalLessonIds.has(lessonId)) return { role: "OPTIONAL", activity: "EXTEND", group: `remediation-v2-stage3-optional-${lessonId}` };
  if (reviewedOptionalExplanationKeys.has(key) || additionalOptionalExplanationLessons.has(lessonId)) return { role: "OPTIONAL", activity: "EXTEND", group: `remediation-v2-optional-${lessonId}` };
  if (!formalCoreLessonIds.has(lessonId)) return { role: "OPTIONAL", activity: "EXTEND", group: key.split("/")[1] };
  return { ...(deliveryOverrides[key] ?? { role: "CORE", activity: "TEACH" }), group: key.split("/")[1] };
};

function explanation(lesson, targetId, kind, title, steps, analogy, boundary) {
  const sourceLesson = lesson;
  const sourceTargetId = targetId;
  const sourceKey = `${sourceLesson}/${sourceTargetId}`;
  lesson = visualDeliveryLesson(sourceLesson, sourceTargetId);
  targetId = visualDeliveryTarget(sourceLesson, sourceTargetId);
  const key = `${lesson}/${targetId}`;
  const delivery = deliveryFor(key, lesson);
  const maintainedTitle = visualTitleOverrides[sourceKey] ?? title;
  const maintainedSteps = sourceFactOverrides[sourceKey] ?? steps;
  const visual = Object.freeze({
    src: `../assets/diagrams/stage10-infographics/stage10-lesson-${sourceLesson}-${sourceTargetId}.jpg`,
    width: 1536,
    height: 1024,
    alt: `Academic knowledge-point infographic explaining ${maintainedTitle} through a cause-and-effect diagram.`,
    caption: `${maintainedTitle}: mechanism, reason, result, analogy and boundary condition.`,
  });
  return Object.freeze({
    lesson,
    sourceLesson,
    sourceTargetId,
    targetId,
    kind,
    title: maintainedTitle,
    steps: Object.freeze(maintainedSteps.slice(0, 3)),
    analogy,
    boundary,
    transcript: Object.freeze(maintainedSteps),
    deliveryRole: delivery.role,
    classroomActivity: delivery.activity,
    deliveryGroup: delivery.group,
    visual,
  });
}

export const pilotExplanations = Object.freeze([
  explanation("050", "masks", "mechanism", "Bit masks target selected positions", ["AND with a 1 preserves or tests a bit, while AND with a 0 clears it.", "OR with a 1 sets a bit without clearing unrelated positions.", "XOR with a 1 toggles a bit while XOR with a 0 preserves it."], "A stencil exposes only the positions that one operation may affect.", "Apply the operation independently to corresponding bit positions."),
  explanation("050", "shifts", "comparison", "Logical, arithmetic and cyclic shifts", ["A logical shift inserts 0 into each empty position.", "An arithmetic right shift repeats the sign bit; a left shift can overflow the fixed signed range.", "A cyclic shift rotates the discarded bit into the opposite end."], "Three conveyor rules move the same row but handle the end position differently.", "State the fixed width, direction and shift type before calculating."),
  explanation("050", "device-bits", "process", "Monitor and control a device register", ["AND a status byte with a one-bit mask to test a named device flag.", "OR a control byte with a one-bit mask to set the selected output flag.", "AND with an inverted mask clears a flag; XOR with a one-bit mask toggles it."], "A control panel changes one labelled switch without disturbing the others.", "The processor applies the rule; a sensor supplies input and an actuator performs output."),
  explanation("016", "purpose", "mechanism", "How a shared resource becomes useful", ["A device packages a request and names the destination.", "The network carries that request to the shared resource.", "One managed resource can then serve many authorised devices."], "A library serves many readers because requests reach one organised collection.", "If the path or shared service fails, many users lose access together."),
  explanation("016", "lanwan", "comparison", "Why LAN and WAN management differs", ["A LAN usually stays within one organisation's controlled site.", "A WAN crosses distance and often uses provider-owned infrastructure.", "More owners and routes add latency, cost and fault-finding complexity."], "Managing one campus is different from coordinating transport across several cities.", "Wi-Fi does not make a network a WAN; scale and control do."),
  explanation("016", "topologies", "tradeoff", "Why connection patterns change risk", ["The layout determines which physical paths data can follow.", "Shared paths reduce cabling but concentrate traffic and failures.", "Alternative paths improve resilience but require more links and ports."], "Road layouts trade construction cost against alternative routes after a closure.", "No topology is universally best; cost, scale and failure tolerance decide."),

  explanation("030", "primary", "mechanism", "Why active data stays close to the CPU", ["The CPU repeatedly requests current instructions and data.", "Nearby electronic storage answers with less delay than secondary storage.", "Faster access prevents the processor waiting as often."], "Keep today's papers on the desk, not in a distant archive.", "Closer and faster storage is smaller and more expensive per byte."),
  explanation("030", "ram-rom", "comparison", "Why RAM changes while ROM remains stable", ["RAM holds the changing state of running programs.", "Most RAM needs continuous power to preserve that state.", "ROM retains fixed startup instructions when power is removed."], "A working notepad changes constantly; a printed reference card should not.", "ROM can sometimes be updated, but not as ordinary working memory."),
  explanation("030", "cache-vm", "comparison", "Why cache helps and virtual memory slows", ["Cache keeps likely next data close to the CPU.", "A cache hit avoids a slower trip to main memory.", "Virtual memory moves pages to storage when RAM is insufficient."], "A desk tray saves a walk; using the archive as desk space creates walks.", "Virtual memory increases capacity, not physical RAM speed."),

  explanation("041", "architecture", "mechanism", "Why a CPU divides specialised work", ["The control unit interprets the current instruction.", "The ALU performs the required arithmetic or logical operation.", "Registers and buses hold and move the immediate values."], "A laboratory separates coordination, processing, temporary trays and transport lanes.", "The components form one system; none executes a program alone."),
  explanation("041", "alu-cu", "comparison", "Why control and calculation are separate", ["The control unit decodes what the instruction demands.", "It sends signals that select data movement and an ALU operation.", "The ALU returns a result and status information."], "A coordinator chooses the operation; a specialist instrument performs it.", "The control unit coordinates calculation but does not replace the ALU."),
  explanation("041", "registers", "mechanism", "How registers, buses and clock stay aligned", ["Registers expose small values needed immediately.", "Buses carry values, addresses and control signals on distinct paths.", "Clock events determine when components may capture a new state."], "Timed transfer gates stop items arriving halfway through an operation.", "A faster clock helps only when the rest of the architecture can keep up."),

  explanation("053", "concept", "mechanism", "Why applications need an operating system", ["Applications request services instead of controlling hardware directly.", "The operating system checks and schedules those requests.", "Drivers translate approved requests for particular devices."], "A control centre coordinates many users of limited shared infrastructure.", "The OS manages access; it cannot make finite hardware unlimited."),
  explanation("053", "process", "process", "How time-slicing creates apparent simultaneity", ["A running process receives a short interval of CPU time.", "Its state is saved before another ready process runs.", "Rapid switching keeps several programs responsive."], "One service desk handles many queues by switching between short tasks.", "Switching has overhead; too much switching reduces useful work."),
  explanation("053", "memory", "mechanism", "Why memory needs allocation and protection", ["Each process receives addresses for its code and data.", "Protection blocks one process from overwriting another's region.", "Released memory can be reassigned safely to later work."], "Separate laboratory benches prevent experiments contaminating each other.", "Isolation must still allow controlled sharing through OS services."),
  explanation("053", "file", "mechanism", "Why files need metadata and access rules", ["A name and path let software locate stored content.", "Metadata records size, timestamps, type and storage information.", "Permissions determine which users may read or change it."], "A catalogue locates an archive item while rules control who may handle it.", "A filename alone neither protects data nor proves its contents."),
  explanation("053", "device", "process", "Why drivers, buffers and queues work together", ["A driver converts a general request into device-specific commands.", "A buffer absorbs the speed difference between producer and device.", "A queue preserves an orderly sequence of pending requests."], "A loading bay stages deliveries before a slower vehicle can collect them.", "Buffering smooths bursts but cannot remove a permanently overloaded device."),
  explanation("053", "services", "synthesis", "How OS services form one control layer", ["Process, memory, file and device managers track different resources.", "Common permissions and scheduling rules coordinate their decisions.", "Applications receive a stable service interface above changing hardware."], "Departments share one operating policy instead of issuing conflicting instructions.", "Weak coordination between services can still create deadlock or starvation."),

  explanation("067", "core", "comparison", "Why security methods cannot substitute", ["Encryption hides readable content from unauthorised viewers.", "Hashing creates a comparison value for integrity checks.", "Certificates bind an identity to a public key through trust."], "A sealed case, an evidence imprint and verified identity solve different problems.", "Using one mechanism does not automatically provide the other properties."),
  explanation("067", "encryption", "mechanism", "How encryption protects confidentiality", ["An algorithm combines plaintext with a key.", "The output is ciphertext that lacks readable meaning without the key.", "An authorised key reverses the transformation for the recipient."], "A locked document case hides the contents while it travels.", "Encryption alone does not prove who sent the message or that it is unchanged."),
  explanation("067", "keys", "mechanism", "Why key ownership changes capability", ["A symmetric key can both encrypt and decrypt shared data.", "An asymmetric key pair separates public and private operations.", "Protecting the private or shared secret preserves the security boundary."], "A public deposit slot can be open while only the owner opens the safe.", "If a secret key is copied, the algorithm cannot detect the impostor."),
  explanation("067", "hashing", "mechanism", "Why a hash supports comparison", ["A hash function maps input data to a fixed-length digest.", "A small input change should produce a substantially different digest.", "Matching digests provide evidence that the checked data is unchanged."], "Compare a tamper-evident imprint instead of storing the original object.", "Hashing is one-way comparison, not encryption and later decryption."),
  explanation("067", "certificates", "mechanism", "How a certificate supports trust", ["A certificate contains an identity and its public key.", "A trusted authority digitally signs that binding.", "Software verifies the signature before trusting the presented key."], "An independent registrar verifies which key belongs to which identity.", "A valid certificate does not guarantee that the website itself is honest."),
  explanation("067", "https", "process", "How HTTPS combines trust and privacy", ["The server presents its certificate and public-key information.", "The browser verifies the trust chain and agreed connection details.", "Both sides establish session keys for efficient encrypted transport."], "Check the recipient's identity before sending a locked stream of parcels.", "HTTPS protects the connection, not unsafe content downloaded through it."),
  explanation("067", "compare", "tradeoff", "How the required property chooses the method", ["First identify confidentiality, integrity, authentication or several needs.", "Choose the mechanism whose operation creates that property.", "Combine methods when the communication needs multiple properties."], "Choose a lock, evidence seal or identity check according to the threat.", "More mechanisms add management cost and do not repair poor key handling."),

  explanation("083", "purpose", "mechanism", "Why normalisation protects consistency", ["Each fact is stored in a relation where its determinant is clear.", "Other tables reference that fact instead of copying it repeatedly.", "One update then changes the authoritative value once."], "Keep one catalogue record and let many loans point to it.", "Normalisation improves consistency but joins may make some queries more complex."),
  explanation("083", "redundancy", "mechanism", "How repeated facts become risky", ["The same real-world fact appears in several rows.", "A later update may change only some copies.", "Queries then return conflicting versions of one fact."], "Several photocopies agree only until someone edits one copy.", "Repeated transactional events are valid; repeated descriptive facts cause the risk."),
  explanation("083", "anomalies", "tradeoff", "Why one structure causes three anomalies", ["Insertion may require an unrelated fact that is not yet known.", "Updating requires finding every repeated copy.", "Deleting one event may accidentally remove the only descriptive fact."], "A form that mixes customers, products and orders ties unrelated lifetimes together.", "The anomaly comes from dependency structure, not simply from a large table."),
  explanation("083", "normal-forms", "process", "How normal forms remove dependency problems", ["First Normal Form (1NF) requires atomic values and no repeating groups.", "Second Normal Form (2NF) is in 1NF and removes partial dependency: each non-key attribute depends on the whole primary key.", "Third Normal Form (3NF) is in 2NF and removes transitive dependency: a non-key attribute must not depend on another non-key attribute."], "Each dependency belongs in the relation whose key determines it.", "Check the forms in order; satisfying a later normal form assumes the earlier requirements are already met."),

  explanation("091", "logic", "synthesis", "How hardware facts become mechanisms", ["Name the component or representation involved.", "Explain the operation performed on data or signals.", "Link that operation to the observable result or limitation."], "A useful technical answer connects parts like a working machine, not a parts list.", "An isolated definition rarely explains why the stated outcome occurs."),

  explanation("105", "bubble", "process", "Why bubble sort repeats adjacent comparisons", ["Compare neighbouring values and swap an inverted pair.", "A pass moves one extreme value toward its final end position.", "Repeat until a pass makes no swaps or the unsorted region ends."], "Repeatedly exchange adjacent books until the largest reaches the shelf end.", "One pass does not generally sort the entire list."),
  explanation("105", "insertion", "process", "How insertion sort grows a sorted region", ["Treat the first item as an already sorted region.", "Remove the next key and shift larger sorted items right.", "Insert the key into the gap, expanding the sorted region."], "Insert each new card into the correct place in an ordered hand.", "The left region is sorted, but the unprocessed right region is not."),
  explanation("105", "compare", "comparison", "Why the sorts move data differently", ["Bubble sort repairs local inversions through repeated neighbouring swaps.", "Insertion sort moves one key through an existing sorted region.", "Their movement patterns produce different trace states and operation counts."], "One method swaps neighbours; the other opens a gap for one selected card.", "Both remain quadratic in the typical worst-case school-level analysis."),
  explanation("105", "pseudocode", "comparison", "Why a trace follows state", ["Record the variables and list at the agreed trace point.", "Apply exactly one comparison, swap, shift or insertion step.", "Write the new state before advancing the loop."], "A laboratory log records each changed state, not the punctuation of instructions.", "A trace must use the algorithm's actual update order."),

  explanation("122", "concept", "mechanism", "Why an ADT is defined by behaviour", ["The ADT specifies permitted operations and their observable effects.", "Client code uses those operations without accessing internal storage directly.", "The implementation can change while the behaviour contract remains stable."], "A service counter defines allowed requests without exposing the storeroom layout.", "Using an array does not automatically make a structure a stack or queue."),
  explanation("122", "stack", "process", "Why one open end creates LIFO", ["Push adds the new item at the top position.", "Only the current top item is available to pop.", "The most recently pushed item therefore leaves first."], "Only the top plate of a pile can be removed safely.", "Accessing an older item requires removing items above it first."),
  explanation("122", "queue", "process", "Why two ends create FIFO", ["Enqueue adds a new item at the rear.", "Dequeue removes the waiting item at the front.", "Earlier arrivals remain ahead of later arrivals."], "A single orderly waiting line serves the earliest arrival first.", "A priority queue follows a different removal rule and is not ordinary FIFO."),
  explanation("122", "operations", "comparison", "Why operation names preserve meaning", ["Push and pop describe changes at a stack's top.", "Enqueue and dequeue describe changes at opposite queue ends.", "Using the correct operation prevents accidental access-rule changes."], "Door names matter when one room has one entrance and another has two.", "Generic array insertion is not equivalent unless it preserves the ADT rule."),
  explanation("122", "errors", "tradeoff", "Why boundary checks come first", ["Underflow occurs when removal is requested from an empty structure.", "Overflow occurs when fixed storage has no free position.", "Checking first prevents invalid reads, writes and pointer changes."], "Check whether a shelf is empty or full before moving an item.", "Dynamic storage changes the capacity strategy but can still exhaust memory."),
  explanation("122", "implementation", "mechanism", "How pointers enforce ADT behaviour", ["A stack pointer identifies the current top or next free slot.", "Queue front and rear pointers identify removal and insertion positions.", "Each valid operation updates data and pointers in a fixed order."], "Markers turn a row of storage boxes into a controlled service structure.", "Incorrect wrap-around or update order can overwrite live queue data."),
  explanation("122", "pseudocode", "comparison", "Why pseudocode must expose state change", ["Test the empty or full condition before accessing storage.", "Read or write the element at the correct pointer.", "Update the pointer so the invariant remains true."], "A clear procedure shows the safety check, action and new boundary marker.", "Hiding pointer updates makes correctness impossible to verify."),

  explanation("142", "purpose", "mechanism", "Why a lifecycle reduces uncertainty", ["Each stage asks a different question about need, design or evidence.", "Its output makes assumptions visible for review.", "Later work proceeds with clearer constraints and acceptance criteria."], "Architectural plans turn assumptions into inspectable decisions before construction.", "Documents help only when they stay accurate and influence decisions."),
  explanation("142", "rad", "process", "Rapid application development (RAD)", ["RAD builds rapid prototypes inside short time boxes.", "Users review prototypes frequently and their feedback changes the next version.", "RAD can respond quickly, but may not suit work requiring exhaustive assurance and stable architecture."], "A working model is reviewed and revised before the whole product is fixed.", "RAD is a named syllabus model; Agile is related extension context, not a substitute."),
  explanation("142", "stages", "process", "How one stage supplies the next", ["Analysis defines the problem and required outcomes.", "Design translates requirements into components, data and interfaces.", "Implementation and testing create and check the resulting system."], "A specification becomes a plan, then a build, then evidence of fitness.", "Feedback may return to an earlier stage when evidence exposes a bad assumption."),
  explanation("142", "waterfall", "tradeoff", "Why sequence helps and resists change", ["A stage is reviewed before the next major stage begins.", "Early agreement supports budgets, contracts and traceable approvals.", "Late change crosses completed boundaries and causes expensive rework."], "Changing foundations after upper floors exist is harder than changing a drawing.", "Waterfall suits stable requirements; sequence alone does not guarantee quality."),
  explanation("142", "iterative", "process", "Why repeated cycles expose mistakes", ["Build a limited version around a defined goal.", "Review evidence from users, tests or prototypes.", "Feed the findings into the next improved cycle."], "A model is built, inspected and revised before the full structure is fixed.", "Repeated work without a review goal is rework, not controlled iteration."),
  explanation("142", "agile", "tradeoff", "Why short feedback cycles support change", ["A small increment makes assumptions visible quickly.", "Frequent stakeholder feedback reprioritises the next increment.", "Less unreviewed work depends on a mistaken requirement."], "Regular design reviews correct direction while only a small section is built.", "Agile still requires architecture, testing and available informed stakeholders."),
  explanation("142", "compare", "comparison", "How project conditions choose a model", ["Stable regulated work values traceability and formal approval.", "Uncertain user-facing work values short feedback distance.", "Dependencies, risk and stakeholder availability constrain the viable choice."], "Choose a planning rhythm that matches how often reliable evidence arrives.", "No lifecycle model is inherently fastest or best for every project."),
  explanation("142", "artefacts", "mechanism", "Why artefacts make decisions traceable", ["Requirements define what successful behaviour means.", "Designs and tests link implementation choices to those requirements.", "Traceability exposes every item affected by a later change."], "A linked evidence trail shows which plans and checks depend on one decision.", "An outdated artefact can mislead more than an absent one."),
]);

const root = path.resolve(import.meta.dirname, "..");
const rolloutJobsPath = path.join(import.meta.dirname, "stage10-rollout-jobs.json");
const rolloutJobs = fs.existsSync(rolloutJobsPath) ? JSON.parse(fs.readFileSync(rolloutJobsPath, "utf8")) : [];
const pilotKeys = new Set(pilotExplanations.map((item) => `${item.sourceLesson ?? item.lesson}/${item.sourceTargetId ?? item.targetId}`));
const rolloutExplanations = rolloutJobs
  .filter((job) => !pilotKeys.has(`${job.lesson}/${job.targetId}`))
  .filter((job) => fs.existsSync(path.join(root, "web", "assets", "diagrams", "stage10-infographics", job.filename)))
  .map((job) => {
    const sourceKey = `${job.lesson}/${job.targetId}`;
    const lesson = visualDeliveryLesson(job.lesson, job.targetId);
    const targetId = visualDeliveryTarget(job.lesson, job.targetId);
    const key = `${lesson}/${targetId}`;
    const delivery = deliveryFor(key, lesson);
    const sourceFacts = sourceFactOverrides[sourceKey] ?? job.sourceFacts;
    const title = visualTitleOverrides[sourceKey] ?? job.title;
    return Object.freeze({
    lesson,
    sourceLesson: job.lesson,
    sourceTargetId: job.targetId,
    targetId,
    kind: job.kind,
    title,
    steps: Object.freeze(sourceFacts.slice(0, 3)),
    analogy: "",
    boundary: "",
    transcript: Object.freeze(sourceFacts),
    sourceGrounded: true,
    deliveryRole: delivery.role,
    classroomActivity: delivery.activity,
    deliveryGroup: delivery.group,
    visual: Object.freeze({
      src: `../assets/diagrams/stage10-infographics/${job.filename}`,
      width: 1536,
      height: 1024,
      alt: `Academic knowledge-point infographic explaining ${title} with a structured visual model.`,
      caption: `${title}: source-grounded visual explanation.`,
    }),
    });
  });

export const explanations = Object.freeze([...pilotExplanations, ...rolloutExplanations]
  .sort((left, right) => left.lesson.localeCompare(right.lesson) || left.targetId.localeCompare(right.targetId)));

export const explanationByKey = Object.freeze(Object.fromEntries(explanations.map((item) => [`${item.lesson}/${item.targetId}`, item])));
