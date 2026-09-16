import { coreParagraph as p, coreTable as table } from './course-v3-core-blocks.mjs';
import { section7ExactVisuals } from './course-v3-section7-diagrams.mjs';
import { enhanceSection7Questions, section7ReviewQuestions } from './course-v3-section7-questions.mjs';

const entry = (essentials, blocks, extra = {}) => ({essentials, blocks, ...extra});
const worked = (title, steps) => ({type:'worked-example',title,steps});
const comparison = (title, headers, rows) => ({type:'table',title,headers,rows,preserveText:true});
const extension = (title, explanation) => ({title:'Optional extension · '+title,explanation,materials:[]});

const teaching = {
  'S7-PURPOSE': entry([
    'Specialist knowledge and control create responsibilities towards people affected by computing decisions.',
    'Ethics guides responsible conduct, protects the public interest and supports justified trust and accountability.',
  ],[
    p('Ethics concerns principles used to judge right and wrong conduct. Computing professionals can access private records, decide what a system does and explain whether its output can be trusted. These decisions affect people who may never meet the developer and may be unable to inspect the system themselves. A person affected by a decision is a stakeholder.','Connect professional power to dependence'),
    p('If a developer alone knows that a warning sometimes fails, a customer cannot make an informed release decision unless that limitation is explained. The information imbalance is why the professional has a responsibility to give competent, honest advice. The duty does not disappear when a fault is difficult for others to discover.','Explain why ethics is needed'),
    p('Ethical principles help professionals decide what to do when an instruction, deadline or personal interest conflicts with effects on others. Protecting people and their information is one purpose; making professionals answerable for their decisions is another. Trust should follow responsible conduct and evidence, rather than concealment that merely preserves a good appearance.','Distinguish a purpose from a reputation claim'),
    p('Lesson 033 distinguished security, privacy and integrity. A valid account may technically permit access to a record, while using that access for an unrelated personal purpose remains inappropriate. Technical permission answers whether the system allows an operation; ethics asks whether the professional should perform it in the circumstances.','Connect to data protection'),
  ]),
  'S7-DUTIES': entry([
    'Work competently, report evidence honestly, protect confidentiality and disclose conflicts of interest.',
    'An employer instruction or absence of an explicit prohibition does not settle an ethical decision.',
  ],[
    p('Competence means having the knowledge and skills needed for the work, recognising limitations and obtaining qualified help when needed. Honesty includes stating uncertainty and known faults instead of overstating performance. Confidentiality restricts inappropriate disclosure. Integrity includes disclosing a personal interest that could distort professional advice. Each duty protects someone who depends on that work.','Turn duties into actions'),
    p('Law imposes enforceable requirements; an employer sets work requirements; a professional code sets expected conduct. These can support the same action, but complying with one instruction does not answer every question. For example, a permitted data export may still be inappropriate for the proposed audience or purpose. Do not infer that an action is illegal solely because it is unethical.','Separate the kinds of rule'),
    p('When duties seem to conflict, establish the evidence, identify who needs it and seek an appropriate authorised review. A safety concern needs action, but publishing confidential customer records is not automatically the right way to report it. Record the facts and limitations, raise the issue through a suitable responsible person and propose a measure that addresses the specific risk.','Respond without creating an unrelated harm'),
  ],{
    examples:[worked('A failed warning test and an uncertain diagnosis',[
      ['Known conditions','A new fire-warning interface failed to display a warning in one recorded test. A manager asks the developer to sign a report saying that all tests passed. The cause has not yet been confirmed.'],
      ['Duty and audience','Occupants rely on warnings and the safety lead relies on the test report. The developer must report the failed result accurately and disclose the uncertainty about its cause.'],
      ['Immediate response','Record the test conditions and actual result; notify the safety lead and recommend that the interface is not relied upon until the failure is investigated and corrected.'],
      ['Follow through','After correction, rerun the relevant tests and record the outcomes. Passing those tests supports the specified test claims, not a promise that every possible failure has been ruled out.'],
      ['Change the evidence','If there were only an unconfirmed report of a failure, describe it as a concern requiring investigation. Do not invent a passed test, claim a confirmed cause, or accuse a colleague without evidence.'],
    ])],
    check:['A paid adviser recommends a supplier without revealing a personal commission. Must the recommended software be technically defective for an ethical concern to exist?','No. The undisclosed financial interest can compromise the independence of the advice even if the software works. Disclose the interest and arrange an impartial comparison against the client’s requirements.'],
  }),
  'S7-BODIES': entry([
    'BCS and IEEE are professional bodies. Their codes state expected professional conduct and support accountability.',
    'Membership can provide guidance, continuing development and peer support; it does not certify every member or product as ethical or safe.',
  ],[
    p('BCS means British Computer Society; IEEE means Institute of Electrical and Electronics Engineers. They are professional organisations, not software suppliers or a programmer’s employer. They publish standards of professional conduct that members can use when explaining why a requested action is inappropriate.','Identify the organisations and the code'),
    p('A code of conduct sets out expected behaviour and professional standards. It helps practitioners and the public understand what responsible work should look like and provides a basis for considering complaints or breaches. Associated conduct procedures provide accountability and possible consequences; the existence of a code alone does not prevent misconduct.','Explain the purpose of a code'),
    p('Joining a body connects a practitioner with continuing professional development, technical information and experienced peers. Learning helps maintain competence; advice can help a new engineer recognise a risk or frame a concern. The ethical benefit comes from using that support in practice, rather than displaying the membership name.','Explain why membership can help'),
    table('Different questions about professional practice',['Question','Appropriate explanation'],[
      ['What is the code for?','It states expected conduct and provides standards against which behaviour can be judged.'],
      ['Why join the body?','Use its learning, guidance and professional community to improve and support practice.'],
      ['Who decides and remains responsible?','The practitioner applies judgement; membership does not transfer responsibility to the body.'],
      ['Is this product safe?','Inspect design, testing and operating evidence; membership is not product certification.'],
    ]),
    p('A programmer pressured to conceal a fault can explain the relevant honesty or public-interest duty using the code, then seek competent advice about reporting the risk. The body’s support and the employer’s release process play different roles. Do not promise that membership automatically supplies a particular service, removes liability or guarantees the outcome of a dispute.','Apply the benefit to a difficulty'),
  ],{
    check:['Match these to their purpose: a conduct standard, a training event, and a completed product test. Does any one of them guarantee ethical behaviour?','The standard states expected behaviour; training supports competence; the test supplies evidence about the product under tested conditions. None guarantees every future action will be ethical or every product will be safe.'],
  }),
  'S7-STAKEHOLDERS': entry([
    'Identify the decision, the affected people and a specific responsibility towards each.',
    'Duties to colleagues include fairness, constructive criticism, recognising contributions and helping them develop.',
  ],[
    p('Start with the proposed action: what will someone collect, publish, change, certify or conceal? Then identify people connected to its consequences. Users and customers may be directly affected; colleagues, family members and the wider public can also be affected even if they never operate the system. Name the connection instead of writing only “society”.','Identify the decision before listing people'),
    p('Towards colleagues, fair treatment avoids excluding people for irrelevant personal characteristics. Acknowledging contributions gives proper credit and supports trust within the team. Offering and accepting specific, constructive criticism allows technical work to improve; helping a colleague develop skills reduces dependence on unsupported guesses. These are professional responsibilities as well as interpersonal behaviour.','Include the team doing the work'),
    p('Towards the public, safeguard health and wellbeing, protect personal information and make realistic claims about software. Towards a client or employer, give competent advice, disclose relevant limitations and handle confidential information appropriately. A duty to meet a deadline does not justify misleading the client or harming the public.','Relate different duties to their recipients'),
    p('Suppose a colleague finds an accessibility defect. Thank and credit the person who found it, review the evidence fairly and give specific feedback on the repair. Users need a truthful description of the route; the operator needs a realistic release recommendation. Each group is connected to the same incident by a different responsibility.','Build a reason, not a label'),
  ],{
    support:[comparison('Explain an action and its effect',['Recipient','Responsible action','Why it matters'],[
      ['Colleague','Offer specific criticism of the code, not a personal attack','The colleague can improve the technical work.'],
      ['Colleague','Credit the contribution that identified the fault','The contributor is recognised and the team can trust how work is attributed.'],
      ['Public','State the route’s known accessibility limitation','Users can avoid relying on a misleading accessibility claim.'],
      ['Client / employer','Report the evidence and correction options','The release decision can account for the actual risk and cost.'],
    ])],
    check:['A colleague’s test reveals a fault in your code. Give one action towards the colleague and one towards the public, explaining each.','Acknowledge the colleague’s contribution and discuss the evidence constructively so the work can improve. Correct or withdraw the misleading public claim so users do not rely on a known unsafe or unsuitable result.'],
  }),
  'S7-CONSEQUENCES': entry([
    'Trace each proposed action to a consequence for a named stakeholder.',
    'An ethical response can have immediate costs; compare supported consequences without treating every possible outcome as certain.',
  ],[
    p('A consequence needs a causal link. Reporting a faulty route enables correction or a warning, which helps a traveller avoid an inaccessible journey. “Good reputation” skips the action and mechanism; explain that honest reporting gives people a better basis for trusting future information. A possible benefit on one branch is not the cause of a possible harm on the other.','Follow the effect of each action'),
    p('Keep the starting conditions fixed when comparing choices. If a route is already known to contain steps, compare reporting that fact with hiding that same fact. Do not silently assume that the fault vanishes in one branch or that every affected person necessarily suffers the worst possible outcome. Use “may” where the outcome is uncertain.','Make a fair comparison'),
    table('One fault, two actions and two stakeholder groups',['Action','Wheelchair users','Travel operator'],[
      ['Report and correct / withdraw the label','Can avoid relying on an unsuitable route','Must investigate and may delay launch; accurate information can support trust.'],
      ['Conceal and publish the label','May reach steps and need assistance','May meet the launch date, but face complaints and loss of confidence if the known fault is discovered.'],
    ]),
    p('Immediate expenditure is compatible with an ethical decision: testing and correction take time. Conversely, an apparent short-term saving from concealment can move costs and risks onto users. A good comparison recognises the practical cost of the responsible action while explaining why that cost does not justify hiding the defect.','Separate short-term cost from justification'),
  ]),
  'S7-JUDGEMENT': entry([
    'Justify an action from the purpose, evidence, stakeholder effects and realistic alternatives.',
    'Match each safeguard to a risk; change the recommendation when relevant conditions change.',
  ],[
    p('An evaluation is more than listing benefits and harms. State the legitimate purpose and ask whether the proposed action is needed to achieve it. A less intrusive or less harmful alternative is useful only if it actually meets that purpose. Proportionality means matching the action to the need rather than gathering as much information as technically possible.','Compare a workable alternative'),
    p('Safeguards need mechanisms. Restricting access reduces the number of people able to view a record; a retention limit reduces how much old information remains available for misuse; an error-correction route helps people challenge an inaccurate record. None guarantees that all misuse or error will disappear.','Explain how the safeguard helps'),
    p('Separate a fact from an assumption. If the scenario does not tell you whether a safer alternative works, state the evidence needed or make the recommendation conditional. A conclusion should identify who will do what, why it is justified and what remaining limitation needs attention.','Finish with a supported action'),
  ],{
    examples:[worked('Location collection: change the purpose, reconsider the decision',[
      ['Ordinary attendance','A college proposes tracking students’ phones all day and night solely to record arrival at classes. A classroom check-in can meet that stated purpose.'],
      ['Choice and controls','Use classroom check-in; restrict access to attendance staff and keep records only for a justified attendance period. Provide a correction route for failed check-ins.'],
      ['Reason and remaining limit','Continuous off-site location history is unnecessary for confirming classroom arrival. Check-in errors remain possible, so a failed scan is not final proof of absence.'],
      ['Changed conditions','During an organised outdoor trip, a student becomes separated from the group. The immediate purpose is locating that student safely; a classroom check-in cannot meet it.'],
      ['Reconsidered action','Use a suitable available location service within the trip’s authorised safety arrangements, limiting access to the search team and collection to the emergency need. Verify the location because it may be stale or unavailable.'],
      ['After the event','End emergency tracking and retain or remove records according to the justified follow-up need. The emergency does not establish a reason for permanent monitoring of everyone.'],
    ])],
    check:['Does rejecting continuous tracking for attendance prove that location data must never be used?','No. Reassess a different purpose such as locating a missing person, considering necessity, alternatives, accuracy, authorised access and duration. A justified emergency use does not justify unrestricted ongoing tracking.'],
  }),
  'S7-COPYRIGHT': entry([
    'Copyright protects software expression and supports control of restricted copying and distribution.',
    'A licence grants specified permissions; purchasing a copy or publishing source does not itself transfer copyright.',
  ],[
    p('Creating software can take substantial skill, time and investment, while reproducing the finished work is inexpensive. Without enforceable rights, others could distribute the work without respecting the creator’s terms. Copyright provides a basis for challenging unauthorised copying and for granting permissions that can support continued development.','Explain the need for protection'),
    p('The protected subject includes original program expression and documentation. Copyright does not give ownership of every underlying idea, procedure or mathematical method. Writing an independent implementation of a general idea and copying protected source code are different acts; the exact legal position also depends on applicable law and exceptions.','Identify what is protected'),
    p('A licence is permission to perform particular acts under stated conditions. Buying a copy normally obtains the permitted use, not ownership of the copyright. The rights holder can authorise redistribution while retaining copyright and requiring notices to remain. An open licence therefore uses copyright permissions rather than cancelling ownership.','Separate ownership from use'),
    p('Copyright generally arises automatically for qualifying software; a notice or record of authorship can help identify the rights holder. Do not teach that paying a fee, adding a symbol or registering every program is universally required before any protection exists. The practical task here is to identify the rights and the permissions needed, rather than memorise a country’s legal procedures.','Avoid a registration misconception'),
  ],{
    check:['A developer publishes source with permission to redistribute it if notices remain. Does a recipient own the developer’s copyright, and may the notices be removed?','Publication and redistribution permission do not transfer ownership. Under the stated terms the recipient must retain the notices; permission to share is compatible with continuing copyright.'],
  }),
  'S7-FSF': entry([
    'Free software concerns freedoms to run, study/change, redistribute copies and distribute modified versions.',
    'Source access supports study and modification. A price does not by itself remove these freedoms.',
  ],[
    p('The Free Software Foundation promotes users’ control over software. “Free” refers to freedom, not necessarily the price of a copy. Running for any purpose lets a user choose how to use the program; studying and changing it lets the user understand and adapt its behaviour. Redistribution lets others receive copies, while distributing modified versions lets others benefit from changes.','Explain what each freedom enables'),
    p('Source code is the human-readable form used to understand and change the program. Supplying only an executable does not automatically provide a practical way to study and modify its source. The recipient needs access to source and the relevant permissions, not merely the technical ability to copy files. Lesson 030 explains source and translated forms.','Connect rights to the source'),
    p('A business may charge for distributing free software or for maintenance and support. Receiving a paid copy is compatible with the freedoms if the licence preserves them. Equally, a no-charge download with no modification rights is not free software in this sense. Inspect permissions separately from cost.','Apply the definition to both prices'),
    p('Exercise the freedoms under the licence’s conditions, such as preserving notices. Not every free-software licence imposes identical conditions on a distributed modification. The freedoms establish what users may do; the particular licence tells them how to comply when doing it.','Keep freedoms and obligations together'),
  ],{
    extensions:[extension('Copyleft and more permissive conditions','This comparison explains continuing responsibilities, not a requirement to memorise licence texts. A copyleft licence can require distributed derivatives to preserve specified freedoms and provide corresponding source under its terms. A more permissive licence may allow different terms for derivatives while still requiring notices. Private modification and distribution are different acts; read the actual licence before inferring obligations.')],
  }),
  'S7-OSI': entry([
    'The OSI maintains the Open Source Definition and approves licences that meet it.',
    'Open source requires relevant use, modification and redistribution rights as well as source access; FSF and OSI are organisations, not individual licences.',
  ],[
    p('The Open Source Initiative evaluates licences against its Open Source Definition. Access to source is necessary, but the distribution terms must also allow the required activities, including modification and redistribution. A vendor cannot establish open-source status merely by showing readable source while forbidding those activities.','Check permission as well as visibility'),
    p('For example, a licence that permits reading source for inspection but forbids every change can help a user understand the code without granting the freedom to adapt it. A licence that forbids business use also conflicts with open-source criteria. These restrictions are different from an obligation to retain a copyright notice.','Use counterexamples to locate the restriction'),
    p('Many licences satisfy both free-software and open-source definitions. FSF emphasises software freedom; OSI maintains open-source criteria and a licence approval process. Neither name identifies a single licence with one universal set of terms. When choosing software, state the permission required and check the offered licence rather than treating two organisation names as mutually exclusive products.','Explain the relationship between the approaches'),
  ],{
    extensions:[extension('Source-available and freeware are not permission guarantees','Source-available describes the ability to inspect source without establishing all open-source rights. Freeware usually describes no-charge distribution, with permissions still determined by its licence. These labels help diagnose a claim; the course does not require an exhaustive catalogue of software marketing categories.')],
  }),
  'S7-SHAREWARE': entry([
    'Shareware offers evaluation before payment for continued or complete use under the stated terms.',
    'Check trial duration, available features, copying rights and what happens after the trial; trial access does not grant source-modification rights.',
  ],[
    p('A trial helps a user test suitability before committing to a purchase. The offer may limit time, features or permitted use. It is useful only if the trial exposes the feature the user needs to evaluate: an editor trial without scanner support cannot establish compatibility with the shop’s scanner.','Connect evaluation to a real requirement'),
    p('Read the offered terms, not a universal “30 days” rule. In the illustrated example, evaluation is allowed through day 30; after that period continued use requires the specified permission. A different offer might restrict saving or export until purchase. Check how to retain or export work before the trial ends.','Complete the trial-to-deployment decision'),
    p('A successful trial establishes evidence of suitability under tested conditions, not permission for indefinite use. If the required licence cannot be obtained, stop the use that the terms no longer allow and choose a permitted alternative. Do not assume trial distribution includes source, modification rights or unlimited copying.','Separate suitability from permission'),
  ]),
  'S7-COMMERCIAL': entry([
    'Commercial describes business activity; proprietary describes restrictions on users’ freedoms. They are not synonyms.',
    'Check users/devices, duration, permitted acts and contracted support. Price alone establishes none of these.',
  ],[
    p('A commercial supplier develops or distributes software as a business activity. Income may come from copies, subscriptions, maintenance or support. That business can use an open-source licence; a no-charge product can also be part of a commercial service. Commercial status and the price of a particular copy therefore answer different questions.','Keep business model, price and permissions separate'),
    p('A proprietary licence commonly permits specified use while restricting modification or redistribution. Read which acts are allowed, how many people or devices are covered and how long permission lasts. Source may be unavailable or available under restrictive terms; source visibility alone does not settle whether the software is free or open source.','Read the actual restrictions'),
    p('Paid support is valuable only when the offer provides the needed service. Office-hours help is not a two-hour response at any time of day; a response commitment is not necessarily a promise to fix every fault within that time. Open-source software can also have a paid support agreement. Do not assume one licensing category always has better maintenance.','Distinguish a licence from a service commitment'),
    p('A suitable comparison includes total practical cost: purchase or subscription, configuration, staff expertise, maintenance and migration. Zero licence fees can coexist with substantial staff cost, while a paid product can still fail a required permission. Decide from the stated constraints rather than a preference for a label.','Connect the terms to the organisation'),
  ]),
  'S7-LICENCE-CHOICE': entry([
    'Translate the scenario into required acts, then match each to an explicit licence or support term.',
    'Justify the choice, reject unsuitable alternatives and state continuing obligations and practical limits.',
  ],[
    p('Begin by listing what the organisation must do: run the program, adapt its source, distribute copies, authorise users or obtain a particular level of help. Distinguish a mandatory requirement from a preference. An option failing one mandatory requirement is not rescued by being cheapest.','Turn needs into checkable requirements'),
    p('Compare evidence in the actual offers. If source modification is required, both suitable source access and permission to modify are needed. If a translated version will be sent to partners, check redistribution as a separate act. If no offer covers the required deployment, seek additional terms or another product instead of pretending that a category name grants missing rights.','Check all required acts'),
    p('After choosing, state what must continue: retain specified notices, keep enough authorised seats, renew time-limited rights or fund maintenance. A licence choice is complete when it covers the intended activity and its obligations, not when a familiar name has been selected.','Follow the decision into use'),
  ],{
    examples:[worked('Compare three offers for ten community centres',[
      ['Requirements','A charity has programmers. It must translate a tool’s interface, distribute the changed version to ten centres and pay no licence fees. Staff maintenance time is available.'],
      ['Offer A','No-charge open-source software supplies source and permits use, modification and redistribution if notices are retained. No contracted support response is included.'],
      ['Offers B and C','B is a no-charge 14-day trial with no source or modification rights. C is a paid one-centre proprietary licence forbidding redistribution.'],
      ['Decision','Choose A: source access and modification rights cover translation; redistribution covers all ten centres; zero licence fees meet the budget.'],
      ['Why not B or C?','B cannot authorise the translation and continued deployment. C fails both the budget and redistribution requirements; one-centre permission is insufficient.'],
      ['Complete deployment','Retain A’s required notices in the distributed versions and allocate staff time to maintain the adaptation. The absence of a licence charge does not remove this work.'],
    ]),worked('Change the requirement: a repair service needs dependable support',[
      ['Requirements','A repair service needs four unmodified installations for two years and a support response within four hours during every operating day. It can afford either offer.'],
      ['Offers','A supplies source and unrestricted installations with community help but no response commitment. B permits four installations for the full two years and includes the required contracted response; it forbids modification and redistribution.'],
      ['Decision','Choose B under these conditions because its specified installation term and support commitment meet the requirements. Source modification is not needed. A’s permissions do not supply its missing service commitment.'],
      ['Trade-off and check','The service accepts B’s payment and restrictions. Confirm which faults and operating hours the support contract covers; a response is not necessarily a completed repair.'],
      ['Change one condition','If the service now must adapt source and share its version with partners, B’s present terms fail. Seek a different agreement or compare A with a suitable paid support contract. Do not reuse the previous conclusion unchanged.'],
    ])],
    support:[comparison('Audit the charity’s required permissions',['Requirement','Offer A','Offer B','Offer C'],[
      ['Translate / modify source','Source and permission supplied','No source or modification right','Does not meet the stated adaptation/distribution plan'],
      ['Distribute to ten centres','Permitted with notices','Trial is insufficient for planned continuing use','One centre; redistribution forbidden'],
      ['No licence fee','Meets budget','No charge during trial only','Paid offer fails budget'],
      ['Continuing responsibility','Retain notices; maintain the adaptation','Obtain suitable rights or stop restricted use','Obtain different terms or another product'],
    ])],
  }),
  'S7-AI-MEANING': entry([
    'AI performs tasks associated with intelligence, such as interpreting language, recognising patterns, reasoning and prediction.',
    'Identify the inference task. AI need not be a robot or learn from data, and its output need not be correct.',
  ],[
    p('Artificial intelligence enables computers to perform tasks associated with human intelligence. Examples include interpreting speech, recognising objects, applying expert knowledge and predicting likely events. Simply storing a typed address or adding fixed prices does not by itself establish an AI task. Explain what the system infers or interprets rather than calling every automated action intelligent.','Identify the task, not the appearance'),
    p('A rule-based AI system can apply expert-written knowledge to supplied facts to infer a conclusion. A data-driven model instead learns patterns from examples. A simple fixed comparison is not by itself evidence of an expert system; likewise not every AI application learns continuously or changes its model during use. These are conceptual distinctions, not requirements to implement either approach here.','Distinguish two ways knowledge can be used'),
    p('For the pump example, a learning procedure can use past vibration and temperature readings with known fault outcomes to adjust a model. Predictions are checked on separate known-outcome cases that were not used to fit it. Later, inference applies the resulting model to a new reading whose future fault outcome is not yet known. Knowing the answer for past examples does not supply the answer for every new case.','Separate learning, checking and inference'),
    p('A model may miss patterns absent from its examples or behave poorly when operating conditions differ. Test it in the intended setting and monitor its results; successful past tests are evidence, not a guarantee. AI does not require consciousness, human-like appearance or a physical robot, and useful predictions still need appropriate interpretation.','Explain why inference is fallible'),
  ],{
    visual:section7ExactVisuals.learning,
    support:[comparison('Recognise what the system is doing',['Action','What it establishes'],[
      ['Save an address typed by a person','Storage alone, not a demonstrated inference task.'],
      ['Infer characters from a photographed address','Pattern recognition used to produce text.'],
      ['Fit a model using past labelled examples','Learning stage in this data-driven approach.'],
      ['Apply that model to a new photograph','Inference; the output may still be wrong.'],
    ])],
    check:['A model was fitted last month. Today it predicts a fault from new sensor readings without changing its parameters. Is this learning, inference, or proof of a fault?','It is inference using the existing model. It need not be learning during this use, and the prediction is not proof that a fault is present. Inspection and evidence are still needed.'],
  }),
  'S7-AI-APPLICATIONS': entry([
    'Describe input → recognition/inference → output → use, distinguishing the model’s output from an action based on it.',
    'In a reading/translation device, trace image recognition, language processing, translation and text-to-speech; errors can propagate between stages.',
  ],[
    p('An application description should follow information through the system. A camera supplies pixels, not automatically recognised words; a microphone supplies audio, not automatically a text transcript. Identify the transformation the AI performs, the output produced and how a person or controller uses it. “Used in healthcare” identifies a sector but leaves that process unexplained.','Name the input representation and the task'),
    p('In optical character recognition (OCR), the system locates characters in an image and interprets their visual patterns as text. Language processing can use word and context information to interpret the recognised sequence or resolve ambiguity. Translation then produces text in the chosen language. These are distinct conceptual tasks even when a product combines them internally.','From pixels to interpreted and translated text'),
    p('Text-to-speech generates audio waveforms representing the words, and a speaker produces sound. Speech-to-text runs in the other direction: it recognises words in audio and produces text. Translating a written label does not require treating the camera as a microphone. Lessons 004–006 distinguish character data, pixel images and sampled sound.','Finish at the actual output'),
    p('A wrong intermediate result can travel through the rest of the chain. A blurred character may become a wrong word; a fluent translation and clear spoken output can faithfully reproduce that mistake. Retaking the image or checking the recognised text addresses the recognition error; merely increasing speaker volume does not.','Locate the error before choosing a remedy'),
    p('Other AI applications follow the same discipline: describe the particular recognition or prediction before its use. The retained pump example predicts risk to guide inspection; a fraud flag guides investigation and is not proof of fraud. The required checking depends on the consequences of acting on a wrong result.','Transfer the method'),
  ],{
    keepTables:true,
    visual:section7ExactVisuals.reading,
    keepOriginalVisuals:true,
    prependExamples:[worked('Read a French exit label aloud in English',[
      ['Initial conditions','The camera sees a clear label reading Sortie. The user has selected English output; this illustrative system recognises the source as French.'],
      ['Recognise','OCR locates the letters and converts the image pattern into the text Sortie. The image and recognised text are different representations.'],
      ['Interpret and translate','Language processing identifies the word in its sign context; translation produces the English text Exit.'],
      ['Generate and output speech','Text-to-speech produces a waveform representing Exit. The speaker turns it into sound, and the user hears the English word.'],
      ['Check the result','Compare the recognised and translated text with a checked reference: Sortie → Exit. Correct output helps a person who cannot read the sign’s language or see the printed text.'],
      ['Blurred-input variant','If OCR produces an incorrect word, stop relying on the uncertain result; retake the image or obtain a checked reading. Later translation and speech cannot be assumed to repair the recognition error.'],
    ])],
    check:['A photographed label is translated correctly as text, but no sound is heard. Which later stages need checking, and why is OCR not the first demonstrated failure?','Check text-to-speech generation and audio output, including the speaker path. The supplied correct translated text shows that recognition and translation have already produced the intended text in this case.'],
  }),
  'S7-AI-SOCIAL': entry([
    'Explain access, privacy and fairness effects for named people in the actual application.',
    'An overall success rate can hide unequal errors. Test relevant groups and provide workable correction or appeal routes.',
  ],[
    p('Social effects concern people’s access, participation and treatment. Captions can let people who cannot hear a recording use its contents; translation can let readers access another language. Explain the barrier removed, not just that the software is “fast”. Benefits depend on how well it works for the people relying on it.','Link an application to participation'),
    p('Training examples, measurement quality or deployment conditions can contribute to unequal errors. A high overall success rate may conceal poor performance for a smaller group. The discrepancy identifies a problem to investigate; it does not by itself prove which training choice caused it or that the group is inherently harder to understand.','Interpret group evidence carefully'),
    table('Illustrative caption test: a whole caption counts as correct only if it matches its checked reference',['Test group','Captions tested','Correct captions','Correct proportion'],[
      ['Accent A','90','90','90 / 90 = 100%'],
      ['Accent B','10','5','5 / 10 = 50%'],
      ['Overall','100','95','95 / 100 = 95%'],
    ]),
    p('These are invented teaching data, not results from a real service. The overall result is dominated by A because A supplies most test cases. B receives a correct caption in only half of its examples, so “95% overall” does not justify claiming equal access. Further representative testing and a checked transcript or correction route are needed; the small test alone does not establish future performance.','Explain what the average leaves out'),
    p('Human review works only if reviewers can inspect relevant evidence, recognise errors, correct the output and have time to do so. An appeal must be accessible to the affected person. For privacy, limit unnecessary recording and retention, restrict access and explain the purpose. These controls address different risks; adding a reviewer does not automatically eliminate excessive collection.','Match each safeguard to its mechanism'),
  ],{
    check:['A service reports 95 correct captions out of 100. What further evidence is needed before claiming it serves both accents equally well?','Inspect each accent’s tested count and correct count, the test conditions and whether the samples represent intended users. The overall count alone can conceal a much poorer result for one group; it does not identify the cause of that difference.'],
  }),
  'S7-AI-ECONOMIC': entry([
    'Compare productivity and avoided losses with purchase, integration, operation, oversight, retraining and error costs.',
    'Automation changes tasks and may displace or create work; a productivity gain need not benefit every worker equally.',
  ],[
    p('AI can increase output per staff hour or reduce avoidable losses. A maintenance prediction may allow a repair during a quiet period instead of an unplanned shutdown. The economic benefit comes from the changed activity and avoided disruption, not from the label AI. A false alarm can instead add unnecessary inspection and stoppage.','Trace how a saving occurs'),
    p('Introducing the system also has costs: purchase or development, suitable data, integration with existing processes, hardware and continued operation. People need training and time to review outputs. Mistakes can cause rework, refunds or lost production. Compare these with the previous method over the same period and activity level.','Use a complete comparison'),
    p('Suppose an illustrative monthly budget saves 1200 currency units of routine work but adds 500 for the service, 400 for review and 200 for expected rework. The recurring saving is 1200 − 500 − 400 − 200 = 100. An additional initial integration cost of 600 means this first month costs 500 more overall. These assumed values demonstrate why recurring savings and initial costs must be separated, not a guaranteed return for a real product.','Work through a bounded cost example'),
    p('Some routine tasks may shrink while oversight, maintenance and specialist support grow. Workers may need retraining, and new roles may require different skills or arise elsewhere. It is therefore possible for an organisation to gain productivity while some employees lose work. Explain the particular task and people instead of predicting that AI removes every job.','Distinguish aggregate gains from individual effects'),
  ],{
    check:['A proposal saves 400 staff-hours each month. Does this alone prove a financial saving or the loss of 400 hours of paid employment?','No. Compare the value and actual use of the released time with system, oversight, training and error costs. Staff may be redeployed; fewer hours on one task do not alone establish reduced employment or lower total expenditure.'],
  }),
  'S7-AI-ENVIRONMENT': entry([
    'Compare application resource savings with the AI system’s operation and hardware lifecycle using a stated baseline.',
    'A reduction in one measured resource is not proof of improvement in every environmental dimension.',
  ],[
    p('Training and operating a model uses computing equipment and electricity. Cooling can add energy and water demand; manufacturing, replacing and disposing of hardware uses materials and creates impacts. The amounts depend on the model, deployment, energy supply and lifetime. Do not assume every application needs the same equipment or has the same footprint.','Identify the system’s own resource use'),
    p('An application may also save resources: irrigation can avoid unnecessary pumping and water extraction; route planning can reduce vehicle travel; maintenance predictions can extend equipment life. Compare the new total with a realistic previous or simpler method serving the same need. Attribute only the savings supported by evidence under comparable conditions.','Define the baseline and the boundary'),
    table('Illustrative monthly irrigation electricity: equal watering need and comparable conditions',['Case','Pump electricity','Additional AI and cooling electricity','Total','Change from baseline'],[
      ['Previous method','1000 kWh','0 kWh additional','1000 kWh','Baseline'],
      ['AI case A','850 kWh','80 kWh','930 kWh','70 kWh less'],
      ['AI case B','850 kWh','180 kWh','1030 kWh','30 kWh more'],
    ]),
    p('Case A saves 1000 − (850 + 80) = 70 kWh of operating electricity. In case B the same pump saving is outweighed by the added 180 kWh, so total use rises by 30 kWh. The totals already include the stated additional cooling electricity; do not add it again. Other unchanged operating loads are excluded equally from all cases. These are invented teaching conditions, not measured product results.','Calculate before judging'),
    p('This comparison supports a claim about the stated operating electricity only. It does not quantify embodied impacts of new sensors, water used for cooling, disposal, or emissions per kWh. To claim a broader lifetime improvement, establish those effects and an appropriate comparison period as well. Water saved and electricity used have different units and cannot simply be subtracted.','Limit the conclusion to the evidence'),
  ],{
    check:['In case A, can the 70 kWh saving prove that the equipment has no environmental cost? What changes in case B?','No. It shows lower electricity use within the supplied operating boundary, not zero manufacturing, water or disposal impacts. In case B total operating electricity is 1030 kWh, 30 kWh above the baseline despite reduced pump consumption.'],
  }),
  'S7-AI-EVALUATION': entry([
    'Identify the AI task, develop relevant impacts from evidence, match safeguards to risks and reach a justified decision.',
    'State the conditions, alternative and remaining uncertainty; neither a high average nor nominal human oversight guarantees suitability.',
  ],[
    p('Begin by stating the decision affected. A model may flag scans for attention while clinicians still interpret them; changing queue priority is different from issuing an autonomous diagnosis. Identify the benefits and harms of that actual use, and compare it with the existing process. Apply social, economic and environmental dimensions where relevant rather than inserting unrelated stock points.','Evaluate the proposed use precisely'),
    p('Use supplied facts to decide whether controls are workable. A reviewer must have the skill, evidence, time and authority to correct the relevant error. A process that checks only flagged cases cannot discover every missed unflagged case. Monitoring must examine the outcomes that matter, including affected groups and cases the model does not flag.','Test the proposed safeguard'),
    p('A supported recommendation states an action and its conditions. If evidence is incomplete, a bounded pilot or further investigation may be justified; in other cases the evidence may support rejection or controlled deployment. “Use it if safe” is incomplete until safety checks, acceptable criteria and responsibility are specified for the setting.','Make the conclusion reviewable'),
  ],{
    appendExamples:[worked('Use evidence to decide whether a caption pilot should expand',[
      ['Proposal and evidence','A college wants to replace checked lesson transcripts with automatic captions. In the illustrative test, accent A has 90/90 correct captions and accent B 5/10. Current checked transcripts remain available. Its proposed reviewer understands accent A but cannot reliably understand the recorded speech from group B.'],
      ['Benefit and risk','Automatic captions can appear quickly, but the observed errors would give B users less reliable access. The overall 95% result conceals that problem. Removing checked transcripts would remove a working alternative.'],
      ['Assess the offered control','A reviewer who cannot reliably understand group B’s speech cannot check its captions against the recording. Relevant listening competence, time and a way to correct the text are required, not just the presence of a human.'],
      ['Recommendation','Keep checked transcripts and use a limited assisted pilot while testing representative groups and arranging competent correction. Do not replace the checked material solely on the current average.'],
      ['Evidence for reconsideration','Before expanding, compare group-level results and correction turnaround against agreed access requirements; confirm review capacity, costs and resource use. Evidence that errors are reliably corrected can support a revised decision; worsening access requires changes or stopping the pilot.'],
    ])],
    extensions:[extension('Apply the same checks to generated text','A system that generates an explanation produces an output to be checked, not an automatically verified source. Compare important claims with reliable evidence, consider what input information is disclosed and keep a correction route. This applies the section’s existing evaluation method; model architecture and prompting techniques are outside this lesson.')],
  }),
};

const stages = {
  1:['Connect specialist knowledge to responsibility, then distinguish duties, professional codes and membership support.','Use the test-report case to separate confirmed evidence from uncertainty; attempt the understanding checks before revealing answers.'],
  2:['Identify responsibility towards colleagues as well as users and the public; compare each action’s consequences.','Revisit the location case when its purpose changes, then justify a proportionate response with workable safeguards.'],
  3:['Stage 1 · Rights and categories: distinguish copyright, permissions, source access, price and trial conditions.','Stage 2 · Selection: audit all required acts against the offered terms; revisit the choice when modification or support requirements change.'],
  4:['Stage 1 · Tasks and information: distinguish learning from inference; trace prediction, OCR, translation and speech through to their use.','Stage 2 · Evaluation: interpret group evidence, compare costs and resource use, then justify a recommendation and its limits.'],
};

export function enhanceSection7Teaching(lesson, number) {
  const units = lesson.units.map(unit => {
    const spec = teaching[unit.unitKey];
    if (!spec) throw new Error('Missing S7 detailed teaching: '+unit.unitKey);
    const original = unit.materials ?? [];
    const visuals = spec.visual ? [spec.visual,...(spec.keepOriginalVisuals ? original.filter(m=>m.type!=='worked-example') : [])] : original.filter(m=>m.type!=='worked-example');
    const examples = [...(spec.prependExamples??[]),...(spec.examples ?? original.filter(m=>m.type==='worked-example')),...(spec.appendExamples??[])];
    // Tables without a lead bitmap remain the visual entry; redundant companion tables are absorbed into the detailed teaching.
    const images = visuals.filter(m=>m.type==='reviewed-visual');
    const retained = images.length ? [...images,...visuals.filter(m=>m.type==='flow'||(spec.keepTables&&m.type==='table'))] : visuals;
    const firstExample = examples[0];
    const materials = [...retained,...examples,...(spec.support??[])];
    return {...unit,explanation:spec.essentials,coreBlocks:undefined,teachingBlocks:spec.blocks,
      useAuthoredVisual:true,preserveSelectedVisual:true,preserveTeachingSteps:true,
      materials:materials.map(m=>({...m,objectiveIds:unit.objectiveIds,preserve:m!==firstExample&&m.type!=='flow'})),
      ...(spec.check?{checkpoint:{prompt:spec.check[0],answer:spec.check[1]}}:{}),
      extensions:spec.extensions??[],
    };
  });
  return enhanceSection7Questions({...lesson,units,teachingCheckpoints:stages[number]},number);
}

export function enhanceSection7Review(lesson) {
  const units = lesson.units.map(unit => {
    if (unit.unitKey!=='S7-REVIEW') return unit;
    return {...unit,preserveTeachingSteps:true,preserveSelectedVisual:true,
      explanation:['Connect duties and rights to the actual people and acts; a category name is not a justification.','Trace an AI application, interpret its evidence and give a conditional decision with a workable safeguard.'],
      teachingBlocks:[
        p('Separate the professional duty, the code that supports it and the actual response. Include colleagues as well as the public. Compare the consequences of each proposed action for named people; alter the judgement when the legitimate purpose or evidence changes.','Reconstruct the responsibility argument'),
        p('For software, distinguish ownership from permissions, then check source access, modification, redistribution, deployment terms and support against the scenario. A no-charge or commercial label cannot replace that comparison. State continuing obligations and explain why an alternative fails a requirement.','Read the terms'),
        p('For AI, follow input through recognition or inference to the output and its use. OCR, translation and text-to-speech do different jobs. Examine relevant group results, complete operating costs and a consistent resource baseline; a useful aggregate number may conceal a limitation. Match the safeguard to the error and state evidence that would change the recommendation.','Use mechanisms and evidence in an evaluation'),
      ],
    };
  });
  return {...lesson,units,practice:[...lesson.practice,...section7ReviewQuestions]};
}
