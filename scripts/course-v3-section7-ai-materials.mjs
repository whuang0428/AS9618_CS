// Section 7.1.5: teacher-authored explanations. Original paper cards are inserted by the renderer.
import { figure, panel, pair, flow, table, note, source, check, material, icon } from './course-v3-section7-materials.mjs';
import { labMarkup } from './course-v3-section7-labs.mjs';

const ids = (...numbers) => numbers.map(n => `S7.06.A${String(n).padStart(2, '0')}`);
const keys = (...names) => names.map(name => `S7-AI-${name}`);
const card = (id, title, html, names, objectives, aliases = []) => material(id, title, html, keys(...names), ids(...objectives), aliases);
const paper = (paperId, title, objectives) => ({ id: `attempt-${paperId.toLowerCase()}`, title, paperId, unitKeys: keys(objectives.includes(2) ? 'APPLICATIONS' : 'SOCIAL'), objectiveIds: ids(...objectives), aliases: [] });
const link = (url, title) => `<a href="${url}" target="_blank" rel="noopener">${title}</a>`;
const learningScope = () => '<p class="s7-ai-scope">Background beyond AS Section 7 · Machine learning, deep learning, reinforcement learning, supervised/unsupervised learning and artificial neural networks are named in A Level Section 18. AS Section 7 requires understanding AI, its applications and its social, economic and environmental impacts. The learning examples here support understanding; their terminology is not an additional AS requirement.</p>';
const optionalLab = (name, title) => `<details class="s7-choice s7-ai-extension"><summary>${title}</summary><p class="s7-ai-scope">Optional teacher-operated example · invented teaching data; no live AI service.</p>${labMarkup[name]}<noscript><p>The static explanation above remains available. Enable JavaScript to operate this example.</p></noscript></details>`;
const chain = (title, nodes) => `<section class="s7-ai-chain"><h4>${title}</h4>${flow(nodes)}</section>`;
const numeral = (digit, label) => `<div class="s7-ai-sample"><span class="s7-ai-handwriting" aria-label="Image of handwritten ${digit}">${digit}</span><span>Known label <strong>${label}</strong></span></div>`;

const relationships = `<div class="s7-ai-family"><strong>Artificial intelligence (AI)</strong><p>Systems performing tasks such as recognition, reasoning and prediction</p><div class="s7-ai-family-branches"><div class="s7-ai-rule-branch"><strong>Rule-based approaches</strong><p>Apply expert-written knowledge to supplied facts.</p></div><div class="s7-ai-family s7-ai-ml"><strong>Machine learning (ML)</strong><p>Learn a model from data or experience</p><div class="s7-ai-other-models">Other learned models, such as decision trees</div><div class="s7-ai-family s7-ai-nn"><strong>Artificial neural networks</strong><p>Connected layers of computational units</p><div class="s7-ai-family s7-ai-dl"><strong>Deep learning (DL)</strong><p>Uses neural networks with multiple hidden layers</p></div></div></div></div></div>`;

function networkFigure() {
  const layers = [[70, [98, 158, 218]], [230, [68, 128, 188, 248]], [390, [98, 158, 218]], [550, [128, 188]]];
  const lines = layers.slice(0, -1).flatMap(([x, nodes], index) => nodes.flatMap(y => layers[index + 1][1].map(nextY => `<line x1="${x + 15}" y1="${y}" x2="${layers[index + 1][0] - 15}" y2="${nextY}"/>`))).join('');
  return `<svg class="s7-ai-network" viewBox="0 0 620 310" role="img" aria-labelledby="s7-ai-network-title s7-ai-network-desc"><title id="s7-ai-network-title">An illustrative neural network with two hidden layers</title><desc id="s7-ai-network-desc">Three input units connect to four units in the first hidden layer, then three in the second hidden layer, then two output units. Lines represent weighted connections. No numerical calculation is required.</desc><g class="s7-ai-links">${lines}</g>${layers.map(([x, nodes], index) => `<g class="s7-ai-network-layer"><text x="${x}" y="27" text-anchor="middle">${['Input', 'Hidden 1', 'Hidden 2', 'Output'][index]}</text>${nodes.map(y => `<circle cx="${x}" cy="${y}" r="15"/>`).join('')}</g>`).join('')}<text x="310" y="295" text-anchor="middle">Information passes through learned weighted connections</text></svg>`;
}

const clusters = `<svg class="s7-ai-clusters" viewBox="0 0 650 345" role="img" aria-labelledby="s7-ai-clusters-title s7-ai-clusters-desc"><title id="s7-ai-clusters-title">One possible grouping of library borrowing records</title><desc id="s7-ai-clusters-desc">The horizontal axis is fiction books borrowed; the vertical axis is non-fiction books borrowed. Records A at eight and one and B at seven and two form one group; records C at one and eight and D at two and seven form another. No correct group labels were supplied.</desc><g class="s7-ai-axis"><path d="M110 40v240h420"/></g><g class="s7-ai-cluster-area"><ellipse cx="425" cy="244" rx="72" ry="33"/><ellipse cx="173" cy="100" rx="72" ry="33"/></g><g class="s7-ai-chart-label"><text x="325" y="328" text-anchor="middle">Fiction books borrowed →</text><text transform="translate(30 170) rotate(-90)" text-anchor="middle">Non-fiction books borrowed →</text><text x="110" y="304" text-anchor="middle">0</text><text x="530" y="304" text-anchor="middle">10</text><text x="90" y="46" text-anchor="end">10</text></g>${[[446,256,'A (8, 1)',1],[404,232,'B (7, 2)',1],[152,88,'C (1, 8)',2],[194,112,'D (2, 7)',2]].map(([x,y,label,group])=>`<circle cx="${x}" cy="${y}" r="8" class="s7-ai-point s7-ai-point-${group}"/><text class="s7-ai-point-label" x="${x + (group === 1 ? 18 : 90)}" y="${y + 6}">${label}</text>`).join('')}</svg>`;

export const section7AiMaterials = [
  card('s7-ai-meaning', 'What makes this an AI task?',
    figure(pair(
      panel('Already supplied as text', `${icon('file')}<p>A person types <strong>AB12</strong>.</p>${flow([['Store', 'Save the supplied characters.'], ['Retrieve', 'Return the same stored characters.']])}<p>Storage alone does not demonstrate an AI task.</p>`),
      panel('Interpreted from an image', `${icon('computer')}<p>A camera photographs a handwritten postcode.</p>${flow([['Recognise', 'Infer characters from pixel patterns.'], ['Use', 'Propose the postcode text for sorting.']])}<p>Character recognition is the intelligent task.</p>`, 's7-positive')
    ), 'Identify the interpretation, reasoning or prediction being performed, rather than judging by the device’s appearance.') +
    note('Artificial intelligence enables computer systems to perform tasks associated with human intelligence, including recognising patterns, interpreting language, reasoning and predicting outcomes. It may be entirely software: a physical robot is not required.', 'Artificial intelligence (AI)') +
    check('A machine adds two entered prices. Another recognises an item from its photograph. Which description demonstrates an AI task?', 'The second describes image recognition: the program infers the object from visual patterns. Adding already supplied numbers alone does not establish AI. Recognition can still be wrong.'),
    ['MEANING'], [1], ['ai-learning-and-inference']),

  card('s7-ai-building-routes', 'Where does the system’s knowledge come from?',
    figure(
      chain('Route A · expert-written rules', [['Expert knowledge', 'A specialist supplies facts and decision rules.'], ['Reasoning system', 'Apply the rules to the current facts.'], ['Conclusion', 'Suggest a fault or a next check.']]) +
      chain('Route B · learning from data', [['Examples', 'Collect relevant cases and suitable feedback.'], ['Training', 'Adjust a model to patterns in those cases.'], ['Evaluation', 'Check performance on separate cases.'], ['Use', 'Apply the model to new inputs.']]),
      'These are broad teaching routes. A real system can combine learned models and explicit rules.') +
    note('A rule-based diagnostic system might infer a likely fault from symptoms using expert-written rules. In machine learning, a training procedure instead adjusts a model from data or experience. Neither approach guarantees that its conclusion is correct.') +
    learningScope() +
    check('Must every AI system learn a new rule whenever it is used?', 'No. A system can apply a fixed set of expert rules or use a previously trained model without changing it during that use.'),
    ['MEANING'], [1]),

  card('s7-ai-training-and-use', 'Training, testing and using a trained model',
    figure(
      chain('Build and check a handwriting model', [['Training examples', 'Images paired with their known characters.'], ['Training', 'Adjust the model using its prediction errors.'], ['Separate test examples', 'Compare predictions with checked answers.']]) +
      chain('Use the model later', [['New image', 'The character has not been supplied to the model.'], ['Use the trained model', 'Predict a character from the new image.'], ['Output and check', 'Use or review the proposed result.']]),
      'The test examples are kept out of training. A successful training score alone does not show how the model handles new cases.') +
    learningScope() +
    check('The model recognises every training image correctly but often fails on new handwriting. What was missing from the claim that it “works perfectly”?', 'Performance on independent examples representative of the intended use. Memorising or fitting training cases does not establish reliable performance on new handwriting.'),
    ['MEANING'], [1]),

  card('s7-ai-core-terms', 'Name the data, the model and the two processes',
    table('Terms needed to follow the diagram', ['Term', 'Meaning in this example'], [
      ['Model', 'The learned structure and values that map an image to a proposed character.'],
      ['Training', 'The process that fits or adjusts the model using examples.'],
      ['Label', 'The target answer supplied with an example, such as the character 7.'],
      ['Using the trained model', 'Produce an output for a new input; this need not update the model. This is often called inference in machine-learning explanations.'],
    ]) +
    learningScope() +
    source(link('https://developers.google.com/machine-learning/intro-to-ml/supervised', 'Google: supervised learning and the train–evaluate–infer distinction')) +
    check('A model was trained yesterday. Today it recognises a new image without changing its fitted values. Is it being trained or used?', 'The existing model is being used to produce an output for a new input. Training was the earlier process that adjusted the model.'),
    ['MEANING'], [1]),

  card('s7-ai-family-relationships', 'How AI, machine learning and deep learning relate',
    figure(relationships, 'Read inward: deep learning is part of machine learning; machine learning is part of AI. Not all AI uses machine learning, and not all machine learning uses neural networks.') +
    note('The nested boxes describe methods and model families. Supervised, unsupervised and reinforcement learning describe how learning is organised. A deep neural network can be used within different learning approaches; deep learning is not a fourth step after reinforcement learning.', 'Two different classification questions') +
    learningScope() +
    source(link('https://developers.google.com/machine-learning/glossary#artificial_intelligence', 'Google ML glossary: AI, neural networks and deep models')),
    ['MEANING'], [1]),

  card('s7-ai-neural-networks', 'What is an artificial neural network?',
    figure(networkFigure(), 'An illustrative deep network: two hidden layers lie between input and output. Circles are computational units, not biological brain cells.') +
    note('An artificial neural network processes information through connected layers. Training changes numerical values, such as connection weights, so outputs better fit the learning objective. Deep learning uses networks with multiple hidden layers; it does not mean that the computer understands or thinks like a person.') +
    learningScope() +
    check('Does using a deep neural network make a prediction certain?', 'No. Model structure does not guarantee a correct output. The data, training, evaluation and new operating conditions still matter.'),
    ['MEANING'], [1]),

  card('s7-ai-supervised-learning', 'Supervised learning · examples include target answers',
    figure(`<div class="s7-ai-example-pairs">${numeral('7', '7')}${numeral('2', '2')}</div>` +
      flow([['Predict', 'The model proposes a character for a training image.'], ['Compare', 'Compare the prediction with its supplied label.'], ['Adjust', 'Update the model, then repeat with more examples.']]) +
      '<p class="s7-ai-conclusion">Later: a new handwriting image → the trained model → a predicted character.</p>',
      'The pictured digits are illustrative examples. A useful real recognition system needs suitable, varied training and independent test cases.') +
    note('Supervised learning uses examples with target answers to learn an input-to-output relationship. The target can be a category, such as a character, or a numerical value. “Supervised” does not require a person to watch every training calculation.') +
    learningScope() +
    check('A training record contains a pump’s vibration readings and whether it later failed. What is the label?', 'Whether the pump later failed is the known target answer. The vibration readings are input features used to predict that target.'),
    ['MEANING'], [1]),

  card('s7-ai-unsupervised-learning', 'Unsupervised learning · find structure without target labels',
    figure(clusters, 'Invented records: A and B borrow mainly fiction; C and D borrow mainly non-fiction. This is one possible grouping based on the two measured features.') +
    note('Unsupervised learning looks for structure in data without supplied target answers for the task. Clustering groups similar records. A person can interpret a group after it has been found; the group’s meaning was not supplied as a correct training label.') +
    learningScope() +
    check('If each record had already been labelled “fiction-focused” or “non-fiction-focused” and the model learned to predict that label, what would change?', 'That would be supervised learning. In this unsupervised example, the model receives the borrowing measurements without the target group names.'),
    ['MEANING'], [1]),

  card('s7-ai-reinforcement-learning', 'Reinforcement learning · actions lead to feedback',
    figure(`<div class="s7-ai-feedback-loop">${flow([['Observe', 'A simulated robot receives its location and nearby obstacles.'], ['Act', 'Its current strategy selects a move.'], ['Environment changes', 'The simulation returns the new situation.'], ['Reward signal', 'A number evaluates the consequence of the action.']])}<p class="s7-ai-return">↶ Repeat with the new observation; training improves the action-selection strategy.</p></div>` +
      '<div class="s7-ai-rewards"><span>Reach the target: <strong>+10</strong></span><span>Each move: <strong>−1</strong></span><span>Hit an obstacle: <strong>−5</strong></span></div>',
      'These reward values are invented for the diagram. The objective is to improve expected cumulative reward, not merely the next immediate score.') +
    note('Reinforcement learning develops a strategy through actions and feedback from an environment. A reward evaluates an outcome; it need not tell the learner the correct action to take. Rewards may arrive after a sequence of actions. This is still training.') +
    learningScope() +
    check('Is a reward of +10 the same as a label saying “move left”?', 'No. It evaluates what happened but does not directly supply the correct action for every situation. The learner must work out which action choices tend to achieve higher cumulative reward.'),
    ['MEANING'], [1]),

  card('s7-ai-learning-comparison', 'Compare the information used for learning',
    table('Three learning approaches', ['Approach', 'Information available', 'What the learner seeks', 'Illustrative task'], [
      ['Supervised', 'Inputs paired with target answers', 'A mapping that predicts the target for new inputs', 'Recognise characters from labelled images'],
      ['Unsupervised', 'Inputs without target labels for the task', 'Useful structure or groupings in the data', 'Group similar borrowing records'],
      ['Reinforcement', 'Observations, actions and reward feedback', 'An action strategy with higher expected cumulative reward', 'Learn a route in a simulator'],
    ]) +
    note('These are three useful approaches, not an exhaustive list of all modern learning techniques. Neural networks can provide models within different approaches. A system may combine methods.', 'Relate the terms without mixing the categories') +
    learningScope() +
    source(link('https://developers.google.com/machine-learning/intro-to-ml/what-is-ml', 'Google: introductory learning approaches')),
    ['MEANING'], [1]),

  card('s7-ai-social-impacts', 'Social impacts · explain who is affected and how',
    table('Teacher explanation of accepted social and ethical points', ['Situation', 'Potential benefit and its effect', 'Potential concern and its effect'], [
      ['AI classroom monitoring', 'Detect a pupil’s difficulty → the teacher can offer help earlier or adapt the lesson.', 'Continuous observation or shared records → pupils may lose privacy or feel anxious.'],
      ['AI homework help', 'Help outside lesson time → pupils can work at their own pace and gain confidence.', 'Answers replace independent reasoning → pupils practise fewer problem-solving skills.'],
      ['Access to AI homework tools', 'Additional explanations → some pupils gain support that was previously unavailable.', 'The digital divide: unequal access to devices or connectivity → existing differences in learning opportunity may widen.'],
      ['Reliance on AI responses', 'Useful explanations → pupils can revisit ideas when needed.', 'Incorrect information accepted as fact → pupils learn misconceptions.'],
    ]) +
    note('Develop a specific effect on people’s learning, participation, privacy or relationships. “It is faster” alone does not explain the social effect. Use the number and kind of impacts actually requested.', 'Turn a point into an explanation') +
    source('9618/13/O/N/25 · Q7(a), 2 marks · describe one ethical impact of classroom monitoring.', '9618/11/O/N/25 · Q8(c), 4 marks · social impacts of AI homework help. The scheme has no mandatory one-positive/one-negative rule.') +
    check('Develop the point “AI homework tools can increase inequality” using the situation.', 'Pupils without reliable devices or internet access may receive less of the extra help available to other pupils, widening differences in learning opportunity.'),
    ['SOCIAL'], [3]),

  paper('E7D02', 'Past paper · one ethical impact of classroom monitoring', [3]),
  paper('E7D03C', 'Past paper · social impacts of AI homework help', [3]),

  card('s7-ai-fairness', 'An overall success rate can hide unequal access',
    figure(pair(
      panel('Group A', '<p class="s7-ai-large-value">90 / 90</p><p>Correct captions: <strong>100%</strong></p>'),
      panel('Group B', '<p class="s7-ai-large-value">5 / 10</p><p>Correct captions: <strong>50%</strong></p>')
    ) + '<p class="s7-ai-conclusion">Together: (90 + 5) / (90 + 10) = 95% correct</p>', 'Invented captioning tests. These results describe system performance on the samples, not the ability of the people in the groups.') +
    note('The large group dominates the overall score. Users in group B still receive much less reliable captions in this test. The figures show a performance gap but do not prove its cause; investigate the examples and recording conditions, and provide a usable correction route.') +
    optionalLab('fairness', 'Explore an optional example · change the sample and compare group rates') +
    check('Would publishing only “95% correct” show that both groups have equally usable captions?', 'No. The overall rate conceals the 50% rate for group B. Report and investigate the group results as well as the overall figure.'),
    ['SOCIAL'], [3], ['social-access-and-fairness']),

  card('s7-ai-economic-impacts', 'Economic impacts · useful work, jobs and total cost',
    figure(pair(
      panel('Potential gains', `${icon('coin')}${flow([['Predict equipment faults', 'Plan maintenance before a breakdown.'], ['Avoid disruption', 'Reduce lost production and emergency repair costs.']])}`, 's7-positive'),
      panel('New costs and changes', `${icon('people')}${flow([['Introduce AI', 'Pay for development, data, integration and operation.'], ['Change the work', 'Fund oversight and retraining; some tasks or jobs may disappear while others are created.']])}`, 's7-negative')
    ), 'An economic effect concerns production, expenditure or employment. The direction and scale depend on the actual deployment.') +
    note('Processing routine work faster can increase output per staff hour. It does not automatically reduce payroll: staff may use the released time on other work. Compare the gains with purchase, maintenance, human review and correction costs over the same period.', 'Explain a net effect, not a slogan') +
    source('Syllabus-led explanation and teacher-written examples. No directly matching economic-impact MS was found in the reviewed 2023–2025 Paper 1 sample.') +
    optionalLab('costs', 'Explore an optional example · compare complete costs over time') +
    check('A business saves two hours of checking each day. Why is that not enough to prove that AI saves money?', 'The value of the saved work must be compared with the cost of the AI service, integration, maintenance, oversight and correcting errors. Whether staff expenditure falls also depends on how the saved time is used.'),
    ['ECONOMIC'], [4], ['economic-costs-and-work']),

  card('s7-ai-environmental-impacts', 'Environmental impacts · compare the footprint and the saving',
    figure(pair(
      panel('Resources used by AI', `${icon('computer')}<ul><li>Electricity for training and using AI models</li><li>Cooling: energy and, in some systems, water</li><li>Hardware manufacture, materials and eventual electronic waste</li></ul>`, 's7-negative'),
      panel('Resources an application may save', `${icon('globe')}<ul><li>Better delivery routes can reduce vehicle fuel use</li><li>Heating controls can reduce energy wasted in empty rooms</li><li>Fault prediction can support repair and longer equipment use</li></ul>`, 's7-positive')
    ), 'Compare with the previous method for the same task, workload and time period. Include the AI system itself in the boundary.') +
    note('Lower consumption in the controlled equipment is only one side of the comparison. The AI service and additional hardware also have impacts. Electricity use, emissions, water use and waste are different quantities: evidence about one does not settle all the others.', 'Define what is being compared') +
    source('Syllabus-led explanation and teacher-written examples. No directly matching environmental-impact MS was found in the reviewed 2023–2025 Paper 1 sample.') +
    optionalLab('environment', 'Explore an optional example · include computing and equipment manufacture') +
    check('An AI route planner reduces delivery fuel use. What else must be checked before claiming a net environmental benefit?', 'Compare the fuel saving with the planner’s operation and additional hardware over a comparable workload and period. Also identify which impacts are measured, such as emissions or energy, and what the comparison excludes.'),
    ['ENVIRONMENT'], [5], ['environmental-balance']),

  card('s7-ai-reading-pipeline', 'Application · turn a photographed label into translated speech',
    figure(`<div class="s7-ai-pipeline">${flow([
      ['Camera image', 'Pixels show the French word Sortie.'],
      ['OCR', 'Recognise character patterns → text: Sortie.'],
      ['Natural language processing', 'Combine characters into words and compare with stored words to identify Sortie.'],
      ['Translation', 'Find the matching word in the selected language: Exit.'],
      ['Text-to-speech', 'Generate an audio waveform for Exit.'],
      ['Speaker', 'Turn the output signal into audible speech.'],
    ])}</div>`, 'A conceptual sequence. A real product can combine stages internally; the representations and transformations still need explaining.') +
    note('Optical character recognition (OCR) locates characters in an image and converts their pixel patterns into individual characters. Natural language processing (NLP) combines the characters into words and compares them with a database to identify words in the source language. Words are then matched to the selected language for translation. Text-to-speech generates audio waveforms corresponding to the words. Speech-to-text takes audio as input and is a different direction.', 'Name what each stage changes') +
    source('9618/12/M/J/25 · Q3(a), 4 marks · recognised characters, language processing/translation and speech generation. The camera and speaker show the full flow; each displayed box is not automatically a separate mark.') +
    check('A clear voice speaks the wrong word after OCR misreads the label. Would increasing the volume fix the fault?', 'No. Clear audio can carry an earlier recognition error forward. Check the recognised text against the label or capture a clearer image before translating and speaking it.') +
    optionalLab('pipeline', 'Explore an optional example · trace an OCR error through the stages'),
    ['APPLICATIONS'], [2], ['page-to-speech']),

  card('s7-ai-reading-benefits', 'Connect the reading device to its social benefits',
    figure(flow([
      ['Barrier: printed text is hard to see', 'The device reads the information aloud → a visually impaired user can access it.'],
      ['Barrier: an unfamiliar language', 'The device translates and speaks in the selected language → the user can understand the label.'],
      ['Barrier: difficulty reading text', 'Spoken output can help a user with reading or learning difficulties obtain the information.'],
    ]), 'These are alternative social benefits. Answer with the number requested rather than repeating the same access benefit in different words.') +
    source('9618/12/M/J/25 · Q3(b), 2 marks · accepted social benefits of the device.') +
    check('Why is “the device produces sound” not yet a developed social benefit?', 'It describes the output. Explain who gains access and what barrier is reduced, such as a visually impaired shopper hearing information they cannot easily read.'),
    ['APPLICATIONS', 'SOCIAL'], [2, 3]),

  paper('E055', 'Past paper · explain the device and its social benefits', [2, 3]),

  card('s7-ai-application-transfer', 'Explain other applications: input → AI task → output → use',
    table('Teacher-written application examples', ['Application', 'Input', 'AI task', 'Output and use'], [
      ['Medical image review', 'A scan', 'Recognise suspicious image patterns', 'Flag an area for a clinician to inspect'],
      ['Fraud detection', 'A new payment and transaction patterns', 'Detect unusual activity', 'Risk flag for investigation; not proof of fraud'],
      ['Speech recognition', 'Recorded or live speech', 'Infer spoken words from audio', 'Text used for captions or voice input'],
      ['Predictive maintenance', 'Vibration and temperature measurements', 'Predict an increased risk of failure', 'Alert used to schedule an inspection'],
      ['Recommendations', 'Preferences and item information', 'Rank likely interests', 'Suggested items displayed to a user'],
      ['Autonomous driving', 'Camera and other sensor readings', 'Interpret obstacles and the road situation', 'Information used to select vehicle-control actions'],
    ]) +
    note('“AI is used in medicine” names a field. A complete application explanation identifies the data, what is inferred, and what happens with the result. A prediction and the action taken after it are separate.', 'Describe the mechanism and the use') +
    check('A maintenance model raises a fault alert. Does that prove that the machine is broken?', 'No. It indicates a predicted risk or detected pattern. An inspection can check the warning; false alerts and missed faults have different consequences.'),
    ['APPLICATIONS'], [2], ['ai-applications-and-use']),

  card('s7-ai-evaluate-use', 'Bring the evidence together before recommending a use',
    table('Teacher-written case: AI prioritises medical scans for review', ['Consideration', 'Developed reasoning'], [
      ['Application', 'Image analysis flags scans likely to need urgent attention; clinicians still interpret the scans.'],
      ['Social', 'Earlier review may help urgent patients, but missed cases or unequal performance across groups can delay care.'],
      ['Economic', 'Prioritisation may make better use of specialists’ time; purchase, integration, review and correction add costs.'],
      ['Environmental', 'Operation and extra hardware use resources. Any avoided repeat work needs evidence before claiming a saving.'],
      ['Response', 'Check performance on relevant cases, provide review of unflagged scans and allow clinicians to override priorities. Compare the pilot with the existing queue.'],
    ]) +
    note('Support a conditional judgement with the scenario’s evidence. For example: extend the pilot only if it improves waiting times without unacceptable missed cases and the review process is workable. “A human checks it” needs competent people, time and a clear review route.', 'A judgement follows from the evidence') +
    source('Teacher-written transfer task. The selected original questions assess particular applications or impacts; they do not directly assess this complete deployment evaluation.') +
    check('What is missing from “Use the system if it is safe”?', 'The response must state how safety will be checked, which harms and affected groups matter, what safeguards are feasible, and how the recommendation follows from the evidence.'),
    ['EVALUATION'], [6], ['evaluate-the-school-pilot']),
];
