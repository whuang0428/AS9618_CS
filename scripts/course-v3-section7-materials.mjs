// Teacher-authored explanations and editable figures; official QP/MS are rendered separately.
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const figure = (body, caption = '') => `<figure class="s7-visual" data-s7-figure>${body}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
export const panel = (title, body, tone = '') => `<div class="s7-panel ${tone}"><h4>${title}</h4>${body}</div>`;
export const pair = (...items) => `<div class="s7-pair">${items.join('')}</div>`;
export const flow = nodes => `<ol class="s7-flow">${nodes.map(([title, body]) => `<li><strong>${title}</strong><span>${body}</span></li>`).join('')}</ol>`;
export const table = (title, headers, rows) => `<div class="s7-table-scroll" tabindex="0" role="region" aria-label="${esc(title)}"><table><caption>${title}</caption><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, i) => i ? `<td>${cell}</td>` : `<th scope="row">${cell}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const note = (text, title = 'Keep the distinction') => `<aside class="s7-note"><h4>${title}</h4><p>${text}</p></aside>`;
export const source = (...items) => `<aside class="s7-source-note" aria-label="Sources"><strong>Sources and scope</strong>${items.map(item => `<span>${item}</span>`).join('')}</aside>`;
export const check = (prompt, answer) => `<div class="s7-check"><p class="s7-kicker">Teacher-written check</p><p>${prompt}</p><details class="s7-choice"><summary>Check your reasoning</summary><p>${answer}</p></details></div>`;
export const material = (id, title, html, unitKeys, objectiveIds, aliases = []) => ({ id, title, html, unitKeys, objectiveIds, aliases });
const icons = {
  person: '<circle cx="32" cy="18" r="10"/><path d="M12 56v-8a20 20 0 0 1 40 0v8H12z"/>',
  people: '<circle cx="25" cy="19" r="8"/><circle cx="46" cy="23" r="6"/><path d="M7 54v-9a18 18 0 0 1 36 0v9H7zM45 35a13 13 0 0 1 13 13v6H47"/>',
  code: '<rect x="5" y="10" width="54" height="44" rx="4"/><path d="m23 24-8 8 8 8m18-16 8 8-8 8m-6-20-6 24"/>',
  book: '<path d="M32 16C22 10 13 10 6 14v37c8-4 17-4 26 2 9-6 18-6 26-2V14c-7-4-16-4-26 2v37"/>',
  shield: '<path d="M32 5 55 15v18c0 13-13 23-23 27C22 56 9 46 9 33V15zM21 31l8 8 15-17"/>',
  share: '<circle cx="13" cy="32" r="7"/><circle cx="49" cy="13" r="7"/><circle cx="49" cy="51" r="7"/><path d="m19 28 24-12M19 36l24 12"/>',
  clock: '<circle cx="32" cy="32" r="25"/><path d="M32 15v18l12 7"/>',
  coin: '<circle cx="32" cy="32" r="24"/><path d="M40 20H29a7 7 0 0 0 0 14h6a7 7 0 0 1 0 14H23M32 13v41"/>',
  globe: '<circle cx="32" cy="32" r="25"/><ellipse cx="32" cy="32" rx="11" ry="25"/><path d="M7 32h50M12 18h40M12 46h40"/>',
  computer: '<rect x="6" y="9" width="52" height="36" rx="4"/><path d="M23 56h18M32 45v11M16 20h32M16 29h20"/>',
  lock: '<rect x="13" y="28" width="38" height="29" rx="4"/><path d="M22 28V17a10 10 0 0 1 20 0v11M32 39v9"/>',
  file: '<path d="M16 6h22l12 12v40H16zM38 6v15h12M24 32h18M24 41h18M24 50h12"/>',
};
export const icon = name => `<svg class="s7-icon" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${icons[name] ?? icons.file}</svg>`;

const ids = (r, ...ns) => ns.map(n => `S7.${String(r).padStart(2, '0')}.A${String(n).padStart(2, '0')}`);
const keys = (...names) => names.map(name => `S7-${name}`);
const paper = (paperId, title, unitKeys, objectiveIds) => ({ id: `attempt-${paperId.toLowerCase()}`, title, paperId, unitKeys, objectiveIds, aliases: [] });
const link = (url, title) => `<a href="${url}" target="_blank" rel="noopener">${title}</a>`;

const professional = [
  material('s7-bcs', 'BCS · a professional body for computing',
    figure(`<div class="s7-body-diagram"><div class="s7-body-hub">${icon('people')}<strong>BCS</strong><span>British Computer Society</span><small>The Chartered Institute for IT</small></div><div class="s7-body-arms">${panel('Who belongs?', '<p>Computing and IT practitioners, including programmers and systems professionals.</p>')}${panel('A shared code', '<p>Members commit to standards of professional behaviour and responsibility.</p>')}${panel('A professional community', '<p>Learning and professional contacts support continuing development.</p>')}</div></div>`,
      'Think of BCS as a professional community with conduct standards, rather than a software company or the programmer’s employer.') +
    '<p>A <strong>professional body</strong> is an organisation supporting people in a profession and its standards. BCS brings computing practitioners together around competent, responsible work.</p>' +
    note('The BCS code covers the public interest, competence and integrity, duties to the relevant authority, and duties to the profession. A member still has to apply these principles to the particular situation.', 'What its code means in practice') +
    source(link('https://www.bcs.org/membership-and-registrations/become-a-member/bcs-code-of-conduct/', 'BCS Code of Conduct') + ' · organisation explanation; not an additional Cambridge marking rule.'),
    keys('BODIES'), ids(2, 1), ['professional-bodies-and-codes']),
  material('s7-ieee', 'IEEE · a professional body for engineering and technology',
    figure(`<div class="s7-body-diagram"><div class="s7-body-hub">${icon('globe')}<strong>IEEE</strong><span>Institute of Electrical and Electronics Engineers</span><small>Engineering and technology community</small></div><div class="s7-body-arms">${panel('Who belongs?', '<p>Engineers and technology professionals, including people working in computing.</p>')}${panel('Code of Ethics', '<p>Members commit to integrity, competent work, fair treatment and public welfare.</p>')}${panel('A practical responsibility', '<p>Disclose a known safety risk; make claims supported by evidence; recognise others’ contributions.</p>')}</div></div>`,
      'IEEE’s scope includes computing as well as other engineering and technology fields. Both IEEE and BCS are professional bodies relevant to computing work.') +
    '<p>The code gives members a shared reference for decisions that affect colleagues, clients and the public. For example, an engineer should report the limitations of a system instead of claiming that it is reliable without evidence.</p>' +
    check('Does IEEE membership prove that a programmer’s software is safe?', 'No. Membership establishes professional expectations. The software still needs appropriate design, testing and review, and the programmer remains responsible for their decisions.') +
    source(link('https://ieee-cas.org/about/ieee-code-ethics', 'IEEE Code of Ethics · IEEE Circuits and Systems Society')),
    keys('BODIES'), ids(2, 1)),
  material('s7-professional-purpose', 'Why a computing professional needs ethics',
    figure(flow([
      ['Specialist knowledge', 'A developer discovers that a warning can disappear.'],
      ['Others depend on it', 'Users may trust the warning without seeing the program or test results.'],
      ['Professional duty', 'Report the defect accurately and recommend a safe response.'],
      ['Purpose', 'Protect people, support informed decisions and make the professional accountable.'],
    ]), 'Teacher-written example: a functioning program can still put users at risk.') +
    '<p><strong>Ethics</strong> concerns principles of right and wrong conduct. Computing professionals control systems and information that other people depend on. Ethical duties guide how they use that power, including when a deadline or an employer’s instruction conflicts with the public interest.</p>',
    keys('PURPOSE'), ids(1, 1), ['reading-assistant-responsibility']),
  material('s7-professional-duties', 'Turn professional duties into actions',
    table('Turn a duty into an action', ['Duty', 'Action in professional work'], [
      ['Competence', 'Disclose limits in your expertise and obtain qualified help.'],
      ['Honesty and integrity', 'Report actual results and disclose interests that could influence advice.'],
      ['Confidentiality', 'Share sensitive information only with appropriate people for the agreed purpose.'],
      ['Accountability', 'Be able to explain and justify your decisions and their foreseeable effects.'],
    ]) +
    note('Law creates enforceable requirements. Ethical judgement also considers responsibilities and consequences. An instruction from a manager, or the absence of an explicit prohibition, does not make every action ethical.', 'Ethics, law and instructions'),
    keys('DUTIES'), ids(1, 2), ['duties-in-action']),
  material('s7-membership-ms', 'Why join? · turn membership benefits into reasons',
    table('MS points explained · professional membership', ['Accepted idea', 'Why it matters to the programmer'], [
      ['Ethical guidelines and standards', 'Provide a reference for deciding what is expected; clients and colleagues know the standards that should apply.'],
      ['Professional recognition and reputation', 'Membership requirements and recognition can support confidence in the programmer’s professional standing.'],
      ['Professional help or advice', 'Provide support when the programmer encounters a difficult professional problem.'],
      ['Training and updating skills', 'Help the programmer keep knowledge and competence current as technology changes.'],
    ]) +
    note('Example: “The body provides training, helping the programmer keep their skills up to date.” State a distinct benefit and connect it to professional work. Merely naming BCS and IEEE does not explain why membership matters.', 'Build an explanation') +
    source('9618/13/O/N/24 · Q5(b) · 3 marks. Teacher paraphrase of accepted MS ideas; one mark per accepted point, maximum three. The MS also accepts legal advice. Check the particular body’s services before making a real membership decision.'),
    keys('BODIES'), ids(2, 2)),
  paper('E051', 'Past paper · explain professional membership', keys('BODIES'), ids(2, 2)),
  material('s7-code-purpose-ms', 'What is the purpose of a code of conduct?',
    figure(flow([
      ['Set expectations', 'Describe the professional behaviour required of members.'],
      ['Guide practice', 'Give a recognised basis for responsible decisions in work situations.'],
      ['Support accountability', 'Set a basis for judging breaches and their consequences.'],
      ['Sustain trust', 'Support safe, professional work and public confidence.'],
    ]), 'A code of conduct concerns people’s behaviour. Program source code contains instructions for a computer.') +
    '<p>The code makes professional standards explicit. It helps a programmer explain why concealing a known fault is unacceptable, even when a manager wants an immediate release. Training develops the programmer’s skills; the code establishes expectations for how those skills are used.</p>' +
    source('9618/12/O/N/25 · Q2(b) · 2 marks. The MS accepts distinct purposes such as expected behaviour, consequences, good practice, safe professional work and public trust. Two accepted points are enough for this question.') +
    check('Give one purpose of a code and one benefit of membership. Why are these not the same answer?', 'A code establishes the behaviour expected of members. Membership can provide training to update technical skills. The first explains a professional standard; the second explains support available to the member.'),
    keys('DUTIES', 'BODIES'), [...ids(1, 2), ...ids(2, 2)]),
  paper('E052', 'Past paper · purpose of a code of conduct', keys('DUTIES', 'BODIES'), [...ids(1, 2), ...ids(2, 2)]),
];

const ethics = [
  material('s7-ethics-ms', 'Responsibilities towards colleagues and the public',
    '<p>Start with the people specified by the question. A <strong>stakeholder</strong> is someone affected by a decision or with an interest in it. An ethical answer identifies an action and explains its effect on that person or group.</p>' +
    table('MS points explained · action and consequence', ['People affected', 'Responsible action', 'Reason or effect'], [
      ['Colleagues', 'Offer and accept constructive criticism.', 'Help colleagues improve the quality of their work.'],
      ['Colleagues', 'Treat people fairly and acknowledge their contributions.', 'Avoid discrimination and show that their work is valued.'],
      ['Colleagues', 'Help with training and professional development.', 'Support the competence of the team.'],
      ['Public', 'Protect health, safety and personal information.', 'Reduce foreseeable harm and inappropriate disclosure.'],
      ['Public', 'Describe software capabilities honestly and realistically.', 'Allow people to make informed decisions and maintain justified trust.'],
    ]) +
    note('“Give constructive feedback so a colleague can improve the program” develops one responsibility. “Be ethical” does not identify an action or explain its effect.', 'Write an explained responsibility') +
    source('9618/12/O/N/24 · Q5(a) · 4 marks. The official limit is two marks for colleagues and two for the public; extra detail about only one group cannot earn all four.'),
    keys('STAKEHOLDERS', 'CONSEQUENCES'), ids(3, 1, 2), ['identify-stakeholders']),
  paper('E053', 'Past paper · responsibilities towards two groups', keys('STAKEHOLDERS', 'CONSEQUENCES'), ids(3, 1, 2)),
  material('s7-ethical-consequences', 'Compare ethical and unethical choices in the same situation',
    '<p><strong>Teacher-written situation:</strong> a programmer finds that a hospital appointment system sometimes shows the wrong patient’s record. A manager asks them to hide the failed test so the software can be delivered on time.</p>' +
    figure(pair(
      panel('Ethical action', '<p>Record the failed test, inform authorised project leads and recommend correction before using the affected function.</p><div class="s7-result">Accurate evidence → an informed release decision → less risk to patients</div>', 's7-positive'),
      panel('Unethical action', '<p>Remove the failed result and tell the client that all tests passed.</p><div class="s7-result">Hidden evidence → false confidence → patients’ records may be exposed or used incorrectly</div>', 's7-negative')
    ), 'The same technical defect can lead to different consequences because the professional chooses what to disclose and do.') +
    '<p>Acting ethically can cause an immediate delay or extra testing cost. Those costs do not erase the duty to protect patients and report accurately. Acting unethically may meet a short-term deadline while damaging privacy, trust and professional reputation.</p>' +
    check('Why is “the programmer might get in trouble” an incomplete explanation of this situation?', 'It ignores the patients and the concealed evidence. Explain how hiding the failed test can cause the client to rely on the faulty system, risking inappropriate disclosure or use of patient records.'),
    keys('CONSEQUENCES'), ids(3, 2), ['compare-consequences']),
  material('s7-network-ethics-ms', 'Ethical use of a school network',
    table('MS points explained · school-network responsibilities', ['Accepted consideration', 'What it means in this setting'], [
      ['Respect privacy', 'Do not browse or disclose another pupil’s private information without authority.'],
      ['Avoid cyberbullying', 'Do not use network messages to intimidate or harass others.'],
      ['Avoid plagiarism', 'Do not present another person’s work as your own.'],
      ['Follow school rules and use the network lawfully', 'Use accounts and network services for the permitted purposes.'],
      ['Do not hack other computers', 'Do not access another computer or account without permission.'],
    ]) +
    source('9618/11/O/N/25 · Q8(b) · 3 marks. The opening context already supplies spreading malware. Give three other considerations; repeating malware does not meet “other”. The explanations here are teacher-written applications of the MS points.'),
    keys('STAKEHOLDERS'), ids(3, 1)),
  paper('E7D03B', 'Past paper · three other ethical considerations', keys('STAKEHOLDERS'), ids(3, 1)),
  material('s7-ethical-judgement', 'Justify a response using the actual consequences',
    figure(flow([
      ['Identify', 'What is being done, and who is affected?'],
      ['Compare', 'What happens if the professional acts ethically or unethically?'],
      ['Respond', 'Choose an action addressing the problem and a realistic safeguard.'],
      ['Justify', 'Explain how it protects the affected people, including remaining limits.'],
    ]), 'Teacher-written reasoning framework. Use the parts needed by the question; this is not a fixed official marking formula.') +
    '<p>For the patient-record fault, pause the affected function, report the evidence through an authorised route and correct and retest it. Do not publish confidential records to prove that a fault exists. If work must continue, establish a checked alternative before claiming that patients can safely use it.</p>' +
    check('The same program is used only with invented records in a closed demonstration. Should the response be identical?', 'The immediate privacy risk is reduced because no real patient data is involved. Report the limitation honestly and label the demonstration appropriately. The changed setting can justify a different use, but it does not justify claiming that the fault has been fixed.'),
    keys('JUDGEMENT'), ids(3, 1, 2, 3), ['justify-a-response']),
];

const copyright = [
  material('s7-copyright-need', 'Why does software need copyright legislation?',
    figure(flow([
      ['Create', 'A programmer spends time developing an original program.'],
      ['Copy', 'Someone can reproduce and distribute its code at very low cost.'],
      ['Protect rights', 'Copyright gives the rights holder a legal basis for controlling copying and distribution.'],
      ['Enforce', 'Unauthorised copying can lead to legal action under the applicable law.'],
    ]), 'Copying a digital work cheaply does not remove the rights in that work.') +
    '<p><strong>Copyright</strong> protects original expression, including program code. It helps establish rights in the work and provides a legal basis for challenging copying or distribution that infringes those rights. It does not give the programmer ownership of every idea or method used in the program.</p>' +
    source('9618/12/O/N/24 · Q5(b)(ii) · 2 marks. The selected MS accepts identifying the author or ownership and legal consequences of unauthorised copying. These are the two ideas developed here.', link('https://www.wipo.int/en/web/copyright/faq-copyright', 'WIPO copyright FAQ') + ' · expression versus ideas and general protection principles.'),
    keys('COPYRIGHT'), ids(4, 1), ['copyright-and-permission']),
  material('s7-copyright-permission', 'Copyright ownership and permission are different',
    table('Three different questions', ['Concept', 'Question', 'Example'], [
      ['Copyright', 'Who holds the rights in the work?', 'The rights holder can decide how copies are licensed.'],
      ['A licence', 'What acts does the rights holder permit?', 'A licence may permit use, modification or redistribution under stated conditions.'],
      ['A copy', 'What has this user obtained?', 'Buying or downloading a copy does not automatically transfer copyright.'],
    ]) +
    note('Publishing source code or granting a free/open-source licence does not remove copyright. The licence grants permissions while copyright continues to apply. Protection generally arises automatically; do not assume that every author must register a work first.', 'Avoid two common mistakes') +
    check('A company buys one copy of a program and gives copies to every customer. Why is payment alone insufficient?', 'Payment for a copy does not establish permission to distribute customer copies. The company must check the licence and obtain the necessary rights; otherwise its distribution may infringe copyright.') +
    source('The check is teacher-written. Its reasoning applies the distinction between ownership and permission; it is not an additional official mark scheme.'),
    keys('COPYRIGHT'), ids(4, 1)),
  paper('E054B', 'Past paper · why copyright the program?', keys('COPYRIGHT'), ids(4, 1)),
];

const licensing = [
  material('s7-free-software', 'Free software · four freedoms for the user',
    figure(`<div class="s7-freedom-hub">${icon('person')}<strong>The user has freedoms</strong><span>“Free” describes permission, not a price tag.</span></div><div class="s7-four">${panel('0 · Run', `${icon('computer')}<p>Run the program for any purpose.</p>`)}${panel('1 · Study and change', `${icon('code')}<p>Read the source, understand it and change how it works.</p>`)}${panel('2 · Share originals', `${icon('share')}<p>Redistribute copies of the original program.</p>`)}${panel('3 · Share changes', `${icon('code')}<p>Distribute copies of your modified version.</p>`)}</div>`,
      'Source access is needed to study and modify the program. The licence can still impose obligations, such as retaining notices.') +
    '<p>The <strong>Free Software Foundation (FSF)</strong> promotes these user freedoms. Free software can be sold, and a developer can charge for maintenance. A no-charge download that withholds these freedoms is not free software in this sense.</p>' +
    source(link('https://static.fsf.org/nosvn/posters/handout-four-freedoms.pdf', 'FSF · the four freedoms') + ' · concept definition. The FSF is an organisation, not the name of one individual licence.'),
    keys('FSF'), ids(5, 1), ['free-software-freedoms']),
  material('s7-open-source', 'Open source software · source plus permissions',
    figure(`<div class="s7-source-package">${icon('code')}<div><strong>Source code + an open-source licence</strong><p>Human-readable code comes with permission to use, modify and redistribute.</p></div></div>${flow([
      ['Read the code', 'Inspect how the program works.'],
      ['Adapt it', 'Change the source to meet a new requirement.'],
      ['Redistribute', 'Share the original or adapted program under the applicable terms.'],
    ])}`, 'Being allowed to look at source is not enough if the licence withholds the required modification or redistribution rights.') +
    '<p>The <strong>Open Source Initiative (OSI)</strong> maintains the Open Source Definition and approves licences meeting its criteria. Many licences meet both free-software and open-source definitions. The emphasis differs, but the categories overlap.</p>' +
    note('A licence may require copyright notices to remain in copies or impose conditions on distributing modifications. “Open source” does not mean that the software has no owner or no conditions.') +
    source(link('https://opensource.org/osd', 'OSI · Open Source Definition')),
    keys('OSI'), ids(5, 2), ['open-source-permissions']),
  material('s7-shareware', 'Shareware · try first, then decide',
    figure(flow([
      ['Obtain a trial', 'Start evaluation without paying the full purchase cost.'],
      ['Try the software', 'Check whether the available features meet your needs.'],
      ['Reach the limit', 'A time limit or feature restriction may apply.'],
      ['Choose', 'Pay for continued/full use under the terms, or stop using it.'],
    ]) + `<div class="s7-trial-strip"><span>${icon('clock')}<strong>Example trial</strong></span><b>Days 1–30: evaluate</b><span aria-hidden="true">→</span><b>Day 31: purchase or stop</b></div>`,
      'The 30-day period is an invented example. Actual trial terms can limit time, features or both.') +
    '<p><strong>Shareware</strong> is distributed for evaluation before paying for continued or full use. It helps users judge suitability before purchase. Trial access does not automatically grant source code, modification rights or indefinite free use.</p>' +
    source('9618/11/O/N/24 · Q7(a) · 2 marks. The MS accepts trying before buying, no initial cost, promotion by users, and feedback for improvements. Two distinct accepted benefits are needed.'),
    keys('SHAREWARE'), ids(5, 3), ['trial-price-and-business']),
  material('s7-commercial', 'Commercial software · licence features and benefits',
    figure(`<div class="s7-commercial-exchange">${panel('Developer or supplier', `${icon('code')}<p>Creates, supplies or maintains software as a business activity.</p>`)}<div class="s7-exchange-arrows"><span>Software / services →</span><span>← Licence / service fees</span></div>${panel('Customer', `${icon('person')}<p>Receives the use rights and services specified in the agreement.</p>`)}</div>${pair(
      panel('Features', '<p>The program is usually sold for a fee. Users typically have no access to source code or permission to alter or share it. The licence limits use, such as the number of installations.</p>'),
      panel('Benefits', '<p>The developer can earn a fee. Support and maintenance are usually provided, and the software is usually well tested.</p>')
    )}`, 'A commercial licence typically restricts how the software may be used, copied and modified. Check the permissions and support included.') +
    '<p>Use the licence features relevant to the question: payment, source-code access, permission to alter or share the program, installation limits and support. The licence protects the developer’s intellectual property rights. Support and testing are typical benefits, not guarantees.</p>' +
    note('Commercial describes business activity and proprietary describes restricted permissions. An open-source supplier can charge for software or support. Read the licence to establish the actual rights and restrictions.', 'Price and permissions') +
    source('9618/11/O/N/24 · Q7(b) · 2 marks. The MS accepts fees for the developer, usually available support and usually well-tested software. Do not change “usually” into “always”.'),
    keys('COMMERCIAL'), ids(5, 4)),
  material('s7-software-comparison', 'Compare the four descriptions using the same questions',
    table('Software licensing compared', ['Question', 'Free software (FSF)', 'Open source (OSI)', 'Shareware', 'Commercial'], [
      ['Main meaning', 'User freedoms', 'Source access and open-source permissions', 'Evaluation before continued/full use', 'Software supplied under a paid licence with restrictions on use'],
      ['Price', 'May be no-charge or sold', 'May be no-charge or sold', 'Initial trial, then payment under its terms', 'Usually sold for a fee'],
      ['Source code', 'Available for study and changes', 'Available in the form used for modification', 'Not implied by trial access', 'Typically not supplied to users'],
      ['Modify', 'Permitted', 'Permitted', 'Only if separately permitted', 'Typically not permitted'],
      ['Copy and redistribute', 'Permitted under licence conditions', 'Permitted under licence conditions', 'Trial sharing depends on its terms', 'Typically restricted; installation limits may apply'],
      ['Time or feature limit', 'Freedoms are not merely a short trial', 'Open-source rights are not merely a short trial', 'Time and/or feature limits may apply', 'A subscription term may apply'],
      ['Support', 'Community or paid support may be offered', 'Community or paid support may be offered', 'Depends on the trial and purchase terms', 'Often offered; check the agreement'],
      ['Useful when…', 'Users need control and sharing freedoms', 'Users need to inspect, adapt or redistribute', 'Users need to evaluate suitability first', 'The business offer fits the required use and service'],
    ]) +
    note('Commercial licences commonly restrict source access, modification and redistribution. An open-source program can also be free software and commercially supplied, so charging a fee alone does not establish the permissions. Check the actual licence terms.', 'Check the permissions') +
    check('A company charges for open-source software and offers optional paid support. Is this a contradiction?', 'No. Open source describes the permissions granted by the licence; commercial describes the business activity. Charging does not remove the source, modification or redistribution rights granted by that licence.'),
    keys('FSF', 'OSI', 'SHAREWARE', 'COMMERCIAL'), ids(5, 1, 2, 3, 4)),
  material('s7-licence-choice', 'Choose from the requirements, then justify the choice',
    '<p>The business in the past paper wants to change the source to meet its needs and pay for maintenance. A payment requirement does not force the choice to be proprietary software.</p>' +
    table('Connect a requirement to a licence feature', ['Requirement', 'Suitable feature', 'Explanation'], [
      ['Adapt the program', 'Source access and permission to modify', 'The business can make the required changes.'],
      ['Obtain maintained software', 'The developer may charge for updates or maintenance', 'Paid maintenance can coexist with free/open-source permissions.'],
      ['Meet continuing obligations', 'Read the chosen licence and service agreement', 'Retain required notices and confirm support coverage.'],
    ]) +
    note('The official MS names “Open Source Initiative // Free Software Foundation”. These are organisations used as category shorthand in that answer. In the explanation, state the free/open-source permissions that fit the task; do not describe OSI and FSF as two individual licence documents.', 'Read the paper’s terminology accurately') +
    source('9618/12/O/N/24 · Q5(b)(i) · 3 marks: one for the licence category and up to two for the explanation. Source access/modification and the ability to earn income are accepted ideas.') +
    check('A charity must modify a tool and distribute it to ten centres. Offer A permits both with notices retained. Offer B allows one unmodified installation. Which fits?', 'Offer A: it permits the required changes and distribution to the centres. Retain the required notices. Check maintenance and staff costs separately; permission to modify does not supply the skills to do it.'),
    keys('LICENCE-CHOICE'), ids(5, 1, 2, 4, 5), ['choose-a-licence']),
  paper('E054A', 'Past paper · choose a licence for source changes and maintenance', keys('FSF', 'OSI', 'COMMERCIAL', 'LICENCE-CHOICE'), ids(5, 1, 2, 4, 5)),
  material('s7-trial-commercial-ms', 'Explain benefits to users and developers',
    table('MS ideas · avoid repeating the same benefit', ['Model', 'User benefit', 'Developer benefit'], [
      ['Shareware', 'Try the program before purchase to check whether it is suitable.', 'Feedback can identify improvements; users may promote the software to other customers.'],
      ['Commercial', 'Support is usually available; the software is usually well tested.', 'Fees provide income for the software or associated services.'],
    ]) +
    note('“Try before buying” and “see if it suits the user before purchase” describe the same benefit. Select distinct points for the available marks.', 'Avoid duplication') +
    source('9618/11/O/N/24 · Q7(a–b) · 4 marks: up to two for shareware and two for commercial. The question does not require a fixed one-user/one-developer split; this table helps you understand who benefits.'),
    keys('SHAREWARE', 'COMMERCIAL'), ids(5, 3, 4)),
  paper('E7D01', 'Past paper · benefits of shareware and commercial software', keys('SHAREWARE', 'COMMERCIAL'), ids(5, 3, 4)),
];

export const section7CoreMaterials = {
  '7.1.1': professional,
  '7.1.2': ethics,
  '7.1.3': copyright,
  '7.1.4': licensing,
};
