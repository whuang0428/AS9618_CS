// Teacher-authored application tasks; the selected Cambridge questions and mark schemes are unchanged.
const ids = (r,...ns) => ns.map(n=>`S7.${String(r).padStart(2,'0')}.A${String(n).padStart(2,'0')}`);
const q = (lesson,n,prompt,objectiveIds,answerPoints,commonError) => ({
  id:`S7-L0${lesson}-Q${n}`,prompt,objectiveIds,answerPoints,commonError,
  marks:answerPoints.length,type:'Application',authored:true,
});
const revisions = [
  q(2,6,'A programmer’s colleague finds an error in the programmer’s code for a public timetable. The programmer plans to dismiss the criticism and claim sole credit for the repair. Explain two responsible actions towards the colleague and one towards the public, giving a reason for each.',ids(3,1,2),[
    'Discuss and accept evidence-based criticism constructively so that the error and the technical work can be improved.',
    'Acknowledge the colleague’s contribution to finding or repairing the error so that credit is fair and the colleague’s work is recognised.',
    'Correct the timetable or disclose its known limitation so members of the public do not unknowingly rely on incorrect journey information.',
  ],'Address both recipients. Praise without a relevant action does not repair the professional problem.'),
  q(2,7,'A library wants to publish borrowers’ names and loan histories to recover overdue books. Private reminders reach those borrowers. Later, a named borrower privately authorises a librarian to share the title of one lost book with a replacement supplier. Justify a response to each proposal and state one safeguard and one remaining risk for the supplier disclosure.',ids(3,1,3),[
    'Use private reminders for overdue loans: they meet the stated purpose without exposing every borrower’s reading history.',
    'The later limited disclosure has a different stated purpose and the borrower’s authorisation; share only what the supplier needs for that replacement rather than treating it as permission to publish all loans.',
    'Verify the intended supplier/recipient and limit the information to the required book details, excluding unrelated borrowing history.',
    'A recipient could still retain or misuse the details; communicate the limited purpose and review what information genuinely needs to be sent. The control reduces rather than eliminates risk.',
  ],'Neither “never share anything” nor “consent allows every future use” evaluates both sets of conditions.'),
  q(3,9,'An archive needs software for twelve staff for three years. It must not modify source, but requires a support response within one working day. Offer A permits all installations at no charge with community help and no response commitment. Offer B covers twelve staff for three years and contracts the required response; its cost fits the budget and it forbids redistribution. Justify a choice and one trade-off. Later the archive must distribute an adapted version to partner archives: explain how that change affects the choice and one next step.',ids(5,4,5),[
    'Choose B initially: its named-user term and contracted response meet the supplied requirements, whereas A does not promise the required response.',
    'The archive accepts B’s affordable cost and redistribution restriction in exchange for the required service; redistribution and source modification are not initially needed.',
    'The later adaptation/distribution requirement is not covered by B’s current permissions, so the original recommendation cannot simply be retained.',
    'Seek suitable changed permissions or compare another product, such as software with explicit modification/redistribution rights and a separate support agreement meeting the response requirement.',
  ],'Do not infer modification rights from permission to install, or that community help guarantees a response time.'),
  q(4,8,'A delivery company compares two routing systems over the same month, with the same deliveries. The previous routes use 6000 kWh-equivalent of fuel energy. New routes use 5700, while the AI service adds 200 kWh of operating electricity, including cooling. Calculate the change in the stated operating-energy total. Then calculate it if the service instead adds 400 kWh, and explain why neither calculation alone proves an overall environmental improvement.',ids(6,5,6),[
    'With 200 kWh additional operation, the new total is 5700 + 200 = 5900 kWh-equivalent, 100 less than the supplied 6000 baseline.',
    'With 400 kWh additional operation, the new total is 6100 kWh-equivalent, 100 more than the baseline despite shorter-route fuel savings.',
    'This is the supplied final-energy accounting comparison only. Fuel and electricity can have different emissions per unit; hardware manufacture, lifetime and disposal and other resource impacts are also uncounted, so a broader environmental claim needs further evidence.',
  ],'Do not count cooling twice or treat equal energy quantities from different sources as necessarily equal emissions.'),
  q(4,9,'A museum device photographs a printed Italian description, translates it into English and reads it aloud. Describe the role and intermediate output of OCR, language processing, translation and text-to-speech. A blurred image causes a wrong recognised word that is then spoken clearly: explain one suitable correction and why clear speech does not establish a correct reading.',ids(6,2),[
    'OCR locates character patterns in the camera image and converts them to text; pixels are not already a recognised character sequence.',
    'Language processing uses the recognised words and language/context to interpret the description; it may help resolve ambiguity but cannot guarantee repair of every wrong recognition.',
    'Translation produces English text from the interpreted source-language text.',
    'Text-to-speech generates the corresponding audio waveform for playback through the speaker.',
    'Retake the blurred image or verify and correct the recognised text before relying on the translation. Clear speech can reproduce an incorrect intermediate word, so it does not prove correct recognition.',
  ],'The camera supplies images; speech-to-text is not the conversion from translated text to audio.'),
  q(4,10,'In an invented caption test, group A has 160 correct captions out of 200 and group B has 20 correct captions out of 50. Each caption is checked against a reference and counted as a whole correct or incorrect item. Calculate the overall correct percentage and each group’s percentage, then explain one limitation of using the overall figure to approve deployment.',ids(6,3,6),[
    'The overall rate is (160 + 20) / (200 + 50) × 100 = 72%.',
    'Group A has 160 / 200 × 100 = 80% correct.',
    'Group B has 20 / 50 × 100 = 40% correct.',
    'The overall rate weights the larger group more heavily and hides B’s much poorer access. Check representative group performance and workable correction before deployment; the discrepancy alone does not prove its cause.',
  ],'Do not average 80% and 40% without weighting by the different numbers of tested captions.'),
];

export function enhanceSection7Questions(lesson, number) {
  const selected = revisions.filter(q=>q.id.startsWith(`S7-L0${number}-`));
  const replacements = new Map(selected.map(q=>[q.id,q]));
  const existing = new Set(lesson.practice.map(q=>q.id));
  return {...lesson,practice:[...lesson.practice.map(q=>replacements.get(q.id)??q),...selected.filter(q=>!existing.has(q.id))]};
}

const review = (n,prompt,requirements,answerPoints,commonError) => ({
  id:`REV-P1-S7-Q${n}`,prompt,objectiveIds:requirements.map(r=>`S7.${String(r).padStart(2,'0')}.R`),
  answerPoints,commonError,marks:answerPoints.length,type:'Application',authored:true,
});
export const section7ReviewQuestions = [
  review(5,'A colleague discovers that a museum’s AI translation device misreads blurred labels. A supervisor wants to hide the problem and remove the colleague’s contribution from the report. Explain one responsibility to the colleague and one to visitors. Describe where an incorrect word can enter the image-to-audio chain and explain a suitable correction before visitors rely on the output.',[1,3,6],[
    'Credit the colleague’s contribution and consider the criticism fairly so that the technical work can improve rather than suppressing relevant evidence.',
    'Disclose and address the known limitation so visitors do not unknowingly rely on incorrect descriptions.',
    'OCR may turn a blurred character pattern into the wrong text; translation can then transform that wrong text and text-to-speech can voice it clearly.',
    'Retake or verify the image/recognised text and check the resulting translation before use. Clear audio does not establish an accurate source reading.',
  ],'Link the professional response to the known mechanism instead of repeating only that the system is unethical.'),
  review(6,'An AI lighting controller is claimed to be environmentally better because lighting falls from 1200 to 1000 kWh per month under comparable conditions. Its added computation and cooling use 150 kWh per month. Calculate the stated operating saving, explain what happens if the added use rises to 250 kWh, and state one further kind of evidence needed for a lifetime environmental judgement.',[6],[
    'The first total is 1000 + 150 = 1150 kWh, saving 50 kWh against 1200.',
    'At 250 kWh added use, the total becomes 1250 kWh, 50 more than the baseline.',
    'Assess additional lifecycle effects such as sensor/server manufacture, replacement/disposal or water use over a stated lifetime; an operating-electricity total alone does not settle the broader judgement.',
  ],'Keep the activity and time period comparable and do not subtract quantities with different units.'),
];
