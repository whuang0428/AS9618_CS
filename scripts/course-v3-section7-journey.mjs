import { section7CoreMaterials } from './course-v3-section7-materials.mjs';
import { section7AiMaterials } from './course-v3-section7-ai-materials.mjs';

const ids = (r, ...ns) => ns.map(n => `S7.${String(r).padStart(2, '0')}.A${String(n).padStart(2, '0')}`);
const unique = values => [...new Set(values)];

export const section7PaperObjectives = {
  E051: ids(2, 2),
  E052: [...ids(1, 2), ...ids(2, 2)],
  E053: [...ids(1, 2), ...ids(3, 1, 2)],
  E7D03B: ids(3, 1),
  E054B: ids(4, 1),
  E054A: ids(5, 1, 2, 4, 5),
  E7D01: ids(5, 3, 4),
  E7D02: ids(6, 3),
  E7D03C: ids(6, 3),
  E055: ids(6, 2, 3),
};

export const section7PaperCoverageNotes = {
  E051: 'Tests benefits of membership. The two body diagrams explain BCS and IEEE separately; naming the bodies alone does not answer this question.',
  E052: 'Tests the purpose of a professional code, including expectations and consequences. It does not ask students to reproduce every rule of an organisation.',
  E053: 'Tests responsibilities to colleagues and the public, with at most two marks for each group. Ethical/unethical comparisons and justified decisions receive separate teacher-written checks.',
  E7D03B: 'Tests three other ethical considerations on a school network. The required shared context already gives spreading malware; this must not be repeated as an answer.',
  E054B: 'Tests why the programmer should copyright the software. The lesson distinguishes copyright ownership from licence permission and does not imply universal registration requirements.',
  E054A: 'Tests licensing for source modification and paid maintenance. The official scheme uses FSF and OSI as category shorthand; these are organisations, not two named licence texts.',
  E7D01: 'Tests benefits of shareware and commercial distribution, with at most two marks for each. Usually available support or testing is not a guarantee about every commercial offer.',
  E7D02: 'Tests one developed ethical impact of classroom AI monitoring. A developed benefit or concern may be creditworthy; one positive and one negative are not required.',
  E7D03C: 'Tests social impacts of AI homework help. The scheme has a four-mark total, not a fixed two-mark limit for each impact or a required positive/negative balance.',
  E055: 'Tests an AI image-to-translated-speech process and social benefits. It does not directly test learning methods, economic or environmental impacts; those are explicitly labelled teaching explanations and transfer checks.',
};

function topic(number, title, materials) {
  if (!Array.isArray(materials) || !materials.length) throw new Error(`Missing materials for ${number}`);
  return {
    number, id: `s${number.replaceAll('.', '-')}`, title, materials,
    unitKeys: unique(materials.flatMap(m => m.unitKeys ?? [])),
    objectiveIds: unique(materials.flatMap(m => m.objectiveIds ?? [])),
    papers: materials.map(m => m.paperId).filter(Boolean),
  };
}

export const section7Journey = {
  38: {
    title: 'Professional ethical bodies',
    intro: 'Meet BCS and IEEE, then use original marking points to explain professional responsibility and the value of membership.',
    groups: [topic('7.1.1', 'Professional ethical bodies', section7CoreMaterials['7.1.1'])],
  },
  39: {
    title: 'Ethical and unethical actions',
    intro: 'Use the people, actions and consequences in an examination situation to explain a professional responsibility.',
    groups: [topic('7.1.2', 'Ethical and unethical actions', section7CoreMaterials['7.1.2'])],
  },
  40: {
    title: 'Copyright and software licensing',
    intro: 'Explain why ownership needs legal protection, then compare the permissions and business models of four software categories.',
    groups: [
      topic('7.1.3', 'Copyright legislation', section7CoreMaterials['7.1.3']),
      topic('7.1.4', 'Software licensing', section7CoreMaterials['7.1.4']),
    ],
  },
  41: {
    title: 'Artificial intelligence',
    intro: 'Understand AI, explain its applications and discuss social, economic and environmental impacts. The learning-method explanations are background beyond AS Section 7.',
    groups: [topic('7.1.5', 'Artificial intelligence', section7AiMaterials)],
  },
};

// Teaching sections are not promises of a fixed lesson duration.
export const section7Sessions = Object.values(section7Journey).flatMap(journey => journey.groups.map(group => ({
  title: `${group.number} · ${group.title}`, groups: [group.id],
  focus: journey.intro, pacing: 'Use as many teaching sessions as the explanations, discussion and questions require.',
})));

// Old concept links resolve to the first relevant new material unless a material
// supplies a more precise alias. The controller also resolves old --stage links.
export const section7LegacyGroups = {
  38: { 'reading-assistant-responsibility': 'S7-PURPOSE', 'duties-in-action': 'S7-DUTIES', 'professional-bodies-and-codes': 'S7-BODIES' },
  39: { 'identify-stakeholders': 'S7-STAKEHOLDERS', 'compare-consequences': 'S7-CONSEQUENCES', 'justify-a-response': 'S7-JUDGEMENT' },
  40: { 'copyright-and-permission': 'S7-COPYRIGHT', 'free-software-freedoms': 'S7-FSF', 'open-source-permissions': 'S7-OSI', 'trial-price-and-business': 'S7-SHAREWARE', 'choose-a-licence': 'S7-LICENCE-CHOICE' },
  41: { 'ai-learning-and-inference': 'S7-AI-MEANING', 'page-to-speech': 'S7-AI-APPLICATIONS', 'ai-applications-and-use': 'S7-AI-APPLICATIONS', 'social-access-and-fairness': 'S7-AI-SOCIAL', 'economic-costs-and-work': 'S7-AI-ECONOMIC', 'environmental-balance': 'S7-AI-ENVIRONMENT', 'evaluate-the-school-pilot': 'S7-AI-EVALUATION' },
};
