import { renderSection6Lab } from './course-v3-section6-labs.mjs';
import { checkDigitExample, checkDigitWeights, parityExample, blockCounts } from './course-v3-section6-examples.mjs';

// Editable teaching figures. Official extracts remain separate from these explanations.
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const figure = (body, caption = '') => `<figure class="s6-visual" data-s6-figure>${body}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
const panel = (title, body, tone = '') => `<div class="s6-panel ${tone}"><h4>${title}</h4>${body}</div>`;
const pair = (...items) => `<div class="s6-pair">${items.join('')}</div>`;
const flow = nodes => `<ol class="s6-flow">${nodes.map(([title, body]) => `<li><strong>${title}</strong><span>${body}</span></li>`).join('')}</ol>`;
const facts = items => `<ul class="s6-facts">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
const exam = (text, title = 'Exam description') => `<aside class="s6-exam-description"><h4>${title}</h4><p>${text}</p></aside>`;
const source = (...items) => `<aside class="s6-source-note" aria-label="Exam evidence"><strong>Exam evidence</strong>${items.map(item => `<span>${item}</span>`).join('')}</aside>`;
const table = (title, headers, rows) => `<div class="s6-table-scroll" tabindex="0" role="region" aria-label="${esc(title)}"><table><caption>${title}</caption><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, i) => i ? `<td>${cell}</td>` : `<th scope="row">${cell}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const badge = (text, good = true) => `<strong class="s6-result ${good ? 's6-pass' : 's6-fail'}">${text}</strong>`;
const record = (title, value, detail = '') => `<div class="s6-record"><span>${title}</span><strong>${value}</strong>${detail ? `<small>${detail}</small>` : ''}</div>`;
const arrow = label => `<div class="s6-arrow"><span aria-hidden="true">→</span><small>${label}</small></div>`;
const strip = (...items) => `<div class="s6-diagram-strip">${items.join('')}</div>`;
const material = (id, title, html) => ({ id, title, html });

const icons = {
  file: '<path d="M20 7h22l12 12v38H20zM42 7v14h12M28 32h18M28 41h18M28 50h11"/>',
  person: '<circle cx="32" cy="19" r="10"/><path d="M12 57v-8a20 20 0 0 1 40 0v8M12 57h40"/>',
  lock: '<rect x="14" y="27" width="36" height="30" rx="5"/><path d="M22 27V17a10 10 0 0 1 20 0v10M32 39v8"/>',
  computer: '<rect x="7" y="9" width="50" height="35" rx="4"/><path d="M23 56h18M32 44v12M15 19h34M15 27h20"/>',
  eye: '<path d="M5 32s10-17 27-17 27 17 27 17-10 17-27 17S5 32 5 32z"/><circle cx="32" cy="32" r="8"/>',
  globe: '<circle cx="32" cy="32" r="25"/><ellipse cx="32" cy="32" rx="11" ry="25"/><path d="M7 32h50M12 18h40M12 46h40"/>',
  fingerprint: '<path d="M10 35c0-16 9-26 22-26s22 10 22 26M17 42V30c0-10 6-15 15-15s15 7 15 17v12M24 51V31c0-6 3-9 8-9s8 4 8 9v17M32 31v25M11 43l-1 9M46 53l2-4"/>',
};
const icon = name => `<svg class="s6-icon" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${icons[name] ?? icons.file}</svg>`;
const parityGrid = (id, rows, received = false) => {
  const counts = blockCounts(rows), x = 86, y = 52, size = 32;
  return `<svg class="s6-parity-figure" viewBox="0 0 430 238" role="img" aria-labelledby="${id}-title ${id}-description"><title id="${id}-title">${received ? 'Received block: row 2 and column 5 fail even parity' : 'Sender: three complete data rows and a column-parity byte'}</title><desc id="${id}-description">Rows: ${rows.join(', ')}. ${received ? 'The changed bit is row 2, column 5. It is 1 instead of the transmitted 0.' : 'The last bit of each data row is its parity bit. The last row supplies column parity.'}</desc>
    <text x="198" y="16" text-anchor="middle" class="s6-grid-label">Seven data bits</text><text x="326" y="16" text-anchor="middle" class="s6-grid-label">Parity</text><text x="385" y="16" text-anchor="middle" class="s6-grid-label">1s</text>
    ${Array.from({length: 8}, (_, c) => `<text x="${x + c * size + size / 2}" y="39" text-anchor="middle" class="s6-grid-label">${c + 1}</text>`).join('')}
    ${rows.map((row, r) => `<text x="78" y="${y + r * size + 21}" text-anchor="end" class="s6-grid-label">${r === rows.length - 1 ? 'Parity byte' : `Row ${r + 1}`}</text>${[...row].map((bit, c) => {
      const changed = received && r === parityExample.error.row && c === parityExample.error.column;
      const failed = received && (r === parityExample.error.row || c === parityExample.error.column);
      return `<rect x="${x + c * size}" y="${y + r * size}" width="${size}" height="${size}" class="${changed ? 's6-grid-error' : failed ? 's6-grid-failed-line' : r === rows.length - 1 || c === 7 ? 's6-grid-checking' : 's6-grid-cell'}"/><text x="${x + c * size + size / 2}" y="${y + r * size + 23}" text-anchor="middle" class="s6-grid-bit">${bit}</text>`;
    }).join('')}<text x="385" y="${y + r * size + 22}" text-anchor="middle" class="${counts.rows[r] % 2 ? 's6-grid-count-fail' : 's6-grid-count'}">${counts.rows[r]}</text>`).join('')}
    <text x="78" y="205" text-anchor="end" class="s6-grid-label">Column 1s</text>${counts.columns.map((count, c) => `<text x="${x + c * size + size / 2}" y="205" text-anchor="middle" class="${count % 2 ? 's6-grid-count-fail' : 's6-grid-count'}">${count}</text>`).join('')}
    <text x="215" y="230" text-anchor="middle" class="s6-grid-label">${received ? 'Only row 2 and column 5 have odd counts.' : 'All row and column counts are even.'}</text></svg>`;
};

const concepts = [
  material('s6-security-example', 'Data security · stop unauthorised access, loss and damage',
    figure(strip(record('Before', 'Marks.csv', 'The school has one complete copy.'), arrow('Unauthorised deletion'), record('After', 'File missing', 'An intruder deletes the records.')) +
      pair(panel('What went wrong?', `${icon('file')}<p>An unauthorised action destroyed required data. Staff cannot retrieve the marks.</p>`, 's6-negative'),
        panel('What protects it?', `${icon('lock')}<p>Access controls restrict deletion. A separate, recoverable backup helps restore lost records.</p>`, 's6-positive')),
      'Data security protects data against unauthorised access, disclosure, alteration, loss and damage. A control reduces a particular risk; it does not guarantee every property of the data.') +
    exam('Data security is the protection of data against unauthorised access, loss or damage. State the action being prevented when explaining a security measure.')),
  material('s6-privacy-example', 'Data privacy · who may receive personal information?',
    figure(strip(record('School medical file', 'Student A: allergy', 'Accurate personal information'), arrow('Copied without permission'), record('Advertising company', 'Same allergy record', 'An unauthorised recipient')) +
      '<div class="s6-callout"><strong>The text has not changed.</strong> The disclosure still violates privacy.</div>',
      'Privacy concerns who may access personal information and how it is collected, used or disclosed. Information can remain accurate while being revealed to the wrong person.') +
    exam('Data privacy means personal data is accessed by or disclosed to authorised people only. In a situation, identify the person or purpose that is not authorised.') +
    source('9618/12/O/N/23 · Q5(a), 1 mark · privacy definition (QP p8; MS p5).')),
  material('s6-integrity-example', 'Data integrity · is the record accurate and complete?',
    figure(strip(record('Original mark', '46 / 75', 'Written on the source paper'), arrow('Authorised teacher types'), record('Stored mark', '64 / 75', 'The value no longer matches')) +
      '<div class="s6-callout"><strong>The teacher was allowed to edit.</strong> The recorded value is still wrong.</div>',
      'Data integrity concerns accuracy, completeness and consistency during storage, processing and transfer. A missing required record or inconsistent copies can also break integrity.') +
    exam('Data integrity means that data remains accurate, complete and consistent. A successful login does not establish that the values entered are correct.') +
    source('9618/12/O/N/23 · Q5(b), 1 mark · integrity definition (QP p8; MS p6).')),
  material('s6-properties-table', 'Security, privacy and integrity compared',
    table('Three questions about the same data', ['Property', 'Question to ask', 'Example failure', 'Why the distinction matters'], [
      ['Security', 'Is data protected against unauthorised access, loss or damage?', 'An intruder deletes a file.', 'A backup supports recovery; access controls restrict the action.'],
      ['Privacy', 'Are personal details used and disclosed only as authorised?', 'Accurate medical records reach an advertiser.', 'Unchanged information can still be disclosed improperly.'],
      ['Integrity', 'Is the information accurate, complete and consistent?', 'An authorised user enters 64 instead of 46.', 'Restricting access does not correct a mistaken value.'],
    ]) + '<p class="s6-callout">These are not mutually exclusive labels. Unauthorised disclosure can affect both security and privacy; unauthorised editing can affect both security and integrity. Explain the consequence stated in the question.</p>'),
];

const system = [
  material('s6-two-protection-targets', 'Protect the computer system and the data it handles',
    figure(pair(panel('Computer system', `${icon('computer')}<p>The operating system, applications, hardware and network must remain usable by authorised people.</p><div class="s6-example-tag">Example: stop an intruder controlling the assessment server.</div>`),
      panel('Data', `${icon('file')}<p>Records need protection when stored, processed and copied across a network.</p><div class="s6-example-tag">Example: keep an intercepted assessment file unreadable.</div>`)) +
      flow([['Access the service', 'Authentication and traffic rules help restrict access to the running system.'], ['Use the record', 'Access rights restrict which operations an account may perform.'], ['Transfer a copy', 'Encryption protects the readable content of a copy outside the original computer.']]),
      'A protected file needs a working, trustworthy system to use it. A protected system also needs controls for data that leaves it.') +
    source('9618/13/O/N/23 · Q3(a)(iii), 3 marks · measures protecting the computer system (QP p4; MS p4).',
      '9618/12/M/J/24 · Q3(a)(i–ii), 3 + 3 marks · protection of the server and transferred data (QP p5; MS p5).')),
  material('s6-two-failures', 'Why one kind of protection is insufficient',
    figure(pair(panel('Case A · encrypted file, failed computer', `${icon('computer')}<p>Malware prevents the assessment application from starting. The encrypted files remain intact.</p>${badge('Service unavailable', false)}<p>Recover a trusted working system as well as the required data.</p>`, 's6-negative'),
      panel('Case B · working computer, exposed copy', `${icon('file')}<p>The server is secure, but someone loses a readable export on a removable drive.</p>${badge('Copy exposed', false)}<p>Protect the exported copy, for example by encrypting it.</p>`, 's6-negative')),
      'These two teacher-written cases separate the protection targets found in the exam situations. They are illustrations, not additional official questions.') +
    exam('Both need protection: a compromised system may stop authorised work or expose data during processing; a readable data copy may be disclosed even when its original computer remains secure. Match a measure to each stated risk.')),
];

const measures = [
  material('s6-user-accounts', 'User accounts · a distinct identity for each user',
    figure(strip(record('Teacher', 'teacher.lee', 'Own account'), record('Reviewer', 'reviewer.khan', 'Own account'), record('Visitor', 'guest', 'Limited account')) +
      flow([['Identify', 'The account name states which identity is requesting access.'], ['Authenticate', 'Check the evidence supplied for that account.'], ['Apply the account settings', 'Load the permissions and record activity against that account.']]) +
      table('One record, different accounts', ['Account', 'Read marks', 'Modify marks', 'Delete marks'], [['Teacher', 'Allow', 'Allow', 'Deny'], ['Reviewer', 'Allow', 'Deny', 'Deny'], ['Visitor', 'Deny', 'Deny', 'Deny']]),
      'An account name is an identity claim, not a secret. Separate accounts let the system assign different rights and associate activity with individual accounts.') +
    exam('A user account identifies a particular user and associates that user with access rights. Authentication checks the claimed identity before access is granted.') +
    '<p class="s6-source-note"><strong>Teaching note</strong>Account identity is required syllabus content. The selected security questions assess authentication or access rights; they are not presented as direct tests of every account-management detail.</p>'),
  material('s6-passwords', 'Passwords · check secret evidence for the account',
    figure('<div class="s6-login-card"><div class="s6-login-field"><span>Account</span><code>teacher.lee</code></div><div class="s6-login-field"><span>Password</span><code aria-label="Hidden example password">••••••••••••</code></div><div class="s6-login-check">Check whether the supplied password is correct for this user account.</div></div>' +
      pair(panel('Incorrect password', `${badge('Authentication fails', false)}<p>Reject the login. Do not open the protected record.</p>`), panel('Correct password', `${badge('Account authenticated')}<p>Continue to an access-rights check. Reading may be allowed while deletion is denied.</p>`)),
      'Use a long, hard-to-guess password, keep it secret and limit repeated failed attempts. A stolen correct password can be used by an impostor; passing the check does not prove that the real owner typed it.') +
    exam('The user enters a username and password. The system checks that the password is correct for that account before allowing access; a difficult-to-guess password helps prevent unauthorised access.') +
    source('9618/13/O/N/23 · Q3(a)(iii) · passwords as a system protection measure (QP p4; MS p4).', '9618/13/O/N/25 · Q5(d), 4 marks · authentication and permissions protect database data (QP p8; MS p9).')),
  material('s6-signature-prerequisites', 'Before signing · message, digest and keys',
    figure(flow([['Message', 'The actual document, such as “Student AB012: 46”.'], ['Digest', 'A hashing algorithm produces a fixed-length value from the message.'], ['Digital signature', 'The sender encrypts the digest using the sender’s private key. The receiver decrypts the signature using the corresponding sender public key.']]) +
      pair(panel('Private key', `${icon('lock')}<p>Kept secret by the sender. Used to create the signature.</p>`), panel('Trusted public key', `${icon('person')}<p>Available to the receiver and reliably associated with the sender. Used to check the signature.</p>`)),
      'This simplified model encrypts the digest to create the signature and decrypts the signature to recover the digest. The hash itself is not reversed.') +
    source('9618/11/M/J/25 · Q7(b), 5 marks · hash, digest, signature and receiver comparison (QP p12; MS p11).')),
  material('s6-signature-process', 'Digital signatures · create, send and verify', renderSection6Lab('signature', { id: 's6-signature-lab' }) +
    exam('The sender hashes the message to produce a digest, encrypts the digest to create the digital signature, and sends the message and signature. The receiver decrypts the signature to reproduce the digest, hashes the received message using the same hashing algorithm and compares the two digests. If they match, the document has not changed in this example. The sender’s private key creates the signature; the corresponding sender public key is used to check it. The signature does not hide the message.') +
    source('9618/11/M/J/25 · Q7(b), 5 marks · creating and checking a digital signature (QP p12; MS p11).')),
  material('s6-biometrics', 'Biometrics · enrol first, then compare a new capture',
    figure('<div class="s6-biometric-lanes"><div><h4>Enrolment · first registration</h4>' + flow([['Capture', 'A sensor captures the legitimate user’s fingerprint or face.'], ['Extract features', 'Record distinguishing features as a reference template.'], ['Associate', 'Store the protected template with the correct account.']]) + '</div><div><h4>Authentication · later attempt</h4>' +
      strip(`<div class="s6-biometric-print">${icon('fingerprint')}<strong>New capture</strong></div>`, arrow('Compare features'), `<div class="s6-biometric-print">${icon('fingerprint')}<strong>Stored template</strong></div>`) +
      '<div class="s6-match-gate">Sufficient match? <span>Yes → accept the identity claim</span><span>No → reject or try again</span></div></div></div>' +
      table('A match is a decision, not certainty', ['Actual person', 'System decision', 'Meaning'], [['Registered user', 'Rejected', 'False rejection, for example after a poor capture.'], ['Impostor', 'Accepted', 'False acceptance: an incorrect match.']]),
      'Biometric authentication uses a physical or behavioural characteristic. A match is followed by a separate access-rights decision. The face-recognition exam example also includes AI training; that is not a required step to describe every biometric device.') +
    exam('Capture the user’s biometric features and compare them with the stored reference for that user. A sufficient match permits authentication. Examples include fingerprints, facial features and iris patterns.') +
    source('9618/11/M/J/24 · Q5(c)(ii), 4 marks · capture a face, analyse features and determine a likely match (QP p12; MS p6).') +
    '<figure class="s6-visual s6-fingerprint-reference" data-s6-figure><img src="../../assets/course-v3/section-6/nist-biometric-fingerprints.jpg" width="1800" height="1200" loading="lazy" decoding="async" alt="NIST illustration containing six coloured fingerprint images with visible ridge patterns."><figcaption><strong>Fingerprint features in context.</strong> Notice the ridge patterns. The colours illustrate the fingerprints; they are not authentication scores. This image supplements the capture-and-compare process above. Credit: <a href="https://www.nist.gov/image/biometric-fingerprints-colored">N. Hanacek/NIST</a>.</figcaption></figure>'),
  material('s6-firewall-process', 'Firewall · inspect traffic against rules', renderSection6Lab('firewall', { id: 's6-firewall-lab' }) +
    exam('A firewall checks incoming and outgoing traffic against configured rules, such as permitted addresses or ports. It allows matching traffic and blocks traffic that fails the rules. A host firewall protects one computer; a network firewall filters traffic that crosses the network boundary.') +
    source('9618/11/M/J/24 · Q5(c)(i), 3 marks · incoming/outgoing traffic, rules and blocking (QP p12; MS p6).', '9618/12/M/J/24 · Q3(a)(i), 3 marks · this question excludes authentication (QP p5; MS p5).')),
  material('s6-antivirus-process', 'Anti-virus software · recognise and isolate infection', renderSection6Lab('antivirus', { id: 's6-antivirus-lab' }) +
    exam('Anti-virus software scans files or memory for known virus signatures and may monitor suspicious behaviour. When it detects a virus, it blocks execution, quarantines the infected file or removes the infection. Update its definitions so that it can recognise newly identified viruses.') +
    source('9618/13/M/J/23 · Q6(b), 2 marks · scanning, known definitions, isolation or removal (QP p11; MS p9).', '9618/13/O/N/23 · Q8(c), 3 marks · reducing malware risks (QP p12; MS p9).')),
  material('s6-antispyware-process', 'Anti-spyware · detect collection and stop further disclosure', renderSection6Lab('antispyware', { id: 's6-antispyware-lab' }) +
    exam('Anti-spyware scans for recognised spyware or suspicious monitoring activity and removes, disables or quarantines it. Keep its definitions updated. Removing spyware stops further local collection, but does not retrieve information already sent to another person.') +
    source('9618/13/M/J/23 · Q6(b), 2 marks · anti-spyware is an accepted protection tool (QP p11; MS p9).')),
  material('s6-encryption-overview', 'Encryption · protect readable content', renderSection6Lab('encryption', { id: 's6-encryption-overview-lab', variant: 'overview' }) +
    exam('Encryption uses an algorithm and a key to transform readable plaintext into ciphertext. Someone intercepting it cannot understand the content without the appropriate decryption key. Section 6.1.6 follows the complete process.') +
    source('9618/11/M/J/25 · Q7(a), 3 marks · key, ciphertext and unreadability if intercepted (QP p12; MS p11).')),
  material('s6-complementary-controls', 'Use complementary controls',
    table('Different controls answer different questions', ['Control', 'Question it answers', 'What still needs another control'], [
      ['Account + authentication', 'Does this evidence match the claimed identity?', 'Which files may this account read or change?'],
      ['Access rights', 'May this account perform this operation?', 'Is the supplied value accurate?'],
      ['Firewall', 'May this traffic pass the configured rules?', 'Does permitted traffic contain malicious software?'],
      ['Anti-virus / anti-spyware', 'Can this software recognise and stop the detected malware?', 'What about a new, unrecognised threat or information already disclosed?'],
      ['Encryption', 'Can someone without the key read this copy?', 'Can the service run, and has a signed message changed?'],
      ['Digital signature', 'Does the signed content verify against the sender’s trusted public key?', 'Can another person read an unencrypted message?'],
    ]) + '<p class="s6-callout">Choose the measure for the stated risk, then explain its mechanism. Naming several products is not a substitute for describing how one protects the system or data.</p>'),
];

const threats = [
  material('s6-virus-route', 'Virus · a host runs, and the code replicates',
    figure('<div class="s6-host-file">' + icon('file') + '<strong>Infected program</strong><span>Useful host instructions + attached virus code</span></div>' +
      flow([['Arrive', 'An infected file or program reaches the computer, for example in a download.'], ['Execute', 'The user or system runs the infected host, activating the virus.'], ['Replicate', 'The virus copies itself into other suitable files or programs.'], ['Damage or disrupt', 'The virus may change or delete files or interfere with normal operation.']]),
      'A virus is malicious code that attaches to a host and replicates when the infected host runs. Replication and damage are separate features: the way it spreads is not the same as its harmful effect.') +
    facts(['A virus is a type of malware.', 'An unopened infected file can be present without its code having run.', 'Copying a file is not itself proof that a virus infected it.']) +
    source('9618/11/O/N/25 · Q8(a), 2 marks across two threats · self-replication and file modification/deletion identify the virus description (QP p14; MS p13).')),
  material('s6-spyware-route', 'Spyware · secretly collect and send information',
    figure(strip(`<div class="s6-object">${icon('computer')}<strong>User activity</strong><span>Typing a login or browsing</span></div>`, arrow('Secret capture'), record('Spyware log', 'Keys / sites / details', 'Collected without informed permission'), arrow('Transmit'), `<div class="s6-object">${icon('person')}<strong>Third party</strong><span>Receives the captured information</span></div>`) +
      '<div class="s6-callout"><strong>The original document can stay unchanged.</strong> The problem is the secret collection and disclosure.</div>',
      'Spyware is malware that monitors activity or collects information without the user’s knowledge. A keylogger is one example. The information may be stored and sent to a third party.') +
    facts(['It does not need to replicate like a virus.', 'The target can be passwords, browsing activity or other private information.', 'Deleting local spyware does not erase copies already sent away.']) +
    source('9618/12/O/N/23 · Q5(c), 4 marks across phishing and spyware · monitoring, keystrokes and disclosure (QP p8; MS p6).')),
  material('s6-hacker-route', 'Hackers · gaining access without authorisation',
    figure(strip(`<div class="s6-object">${icon('person')}<strong>Unauthorised person</strong><span>Attempts to enter the system</span></div>`, arrow('Stolen password or software weakness'), `<div class="s6-object">${icon('computer')}<strong>Protected system</strong><span>Access is not legitimately permitted</span></div>`) +
      table('Possible consequences after unauthorised access', ['Read', 'Modify', 'Delete / disrupt'], [['Copy confidential records.', 'Change records or settings.', 'Remove files or prevent authorised use.']]),
      'In this security topic, hacking means unauthorised access to a computer system or its data. The person may use guessed or stolen passwords or exploit a software weakness.') +
    facts(['A person is the actor; a virus or spyware is software.', 'A stolen correct password may pass the login check without making the access authorised.', 'Do not assume every successful intrusion deletes data; identify the stated consequence.']) +
    source('9618/12/O/N/25 · Q5(e), 3 marks · unauthorised access and suitable precautions (QP p9; MS p8).')),
  material('s6-phishing-route', 'Phishing · a deceptive message prompts the victim to act',
    figure('<div class="s6-message"><div class="s6-message-head"><strong>Simulated email · no working links</strong><span>Claims to be: School account support</span></div><h4>“Your account closes today”</h4><p>“Follow this link and enter your password to keep your account.”</p><div class="s6-fake-link">school-account-help.example · imitation sign-in page</div></div>' +
      flow([['Impersonate', 'The message claims to come from a trusted organisation.'], ['Persuade', 'An urgent request encourages a click, reply or disclosure.'], ['Collect', 'The victim supplies passwords or personal details to the attacker.']]),
      'Phishing is a social-engineering attack. The deception works through the victim’s response; malware does not have to be installed for the attacker to obtain the information.') +
    source('9618/12/O/N/23 · Q5(c) · phishing email description (QP p8; MS p6).', '9618/13/O/N/23 · Q8(b), 2 marks · compare phishing with pharming (QP p12; MS p8).')),
  material('s6-pharming-route', 'Pharming · the destination changes despite the intended address',
    figure(pair(panel('Normal route', strip(record('Typed domain', 'school.example'), arrow('Correct lookup'), record('Expected server', 'School sign-in'))),
      panel('Changed route', strip(record('Same typed domain', 'school.example'), arrow('Altered address lookup'), record('Attacker’s server', 'Imitation sign-in')), 's6-negative')) +
      '<div class="s6-callout">The user may type the genuine domain. Malicious changes to name resolution or local configuration redirect the request to another destination.</div>',
      'Pharming redirects a user to a fake website, where private information may be collected. Unlike the phishing email route, it need not depend on persuading the victim to click the supplied link.') +
    facts(['Both phishing and pharming can imitate a trusted organisation and seek personal information.', 'Phishing centres on a deceptive message and user response.', 'Pharming centres on a changed route to a website.']) +
    source('9618/13/O/N/23 · Q8(b), 2 marks · one difference and one similarity (QP p12; MS p8).', '9618/11/O/N/25 · Q8(a) · identifying pharming from redirection (QP p14; MS p13).')),
];

const precautions = [
  material('s6-threat-controls-table', 'Match each threat to a precaution and a recovery action',
    table('Threat → intervention → remaining risk', ['Threat', 'Prevention / risk reduction', 'What the measure does', 'If the incident has occurred'], [
      ['Virus', 'Use updated anti-virus; restrict untrusted downloads and execution.', 'Recognises known infection and blocks or isolates the infected file before it can run or spread.', 'Quarantine/remove the infection. Recover damaged data from a trusted backup; a backup does not remove active malware.'],
      ['Spyware', 'Use updated anti-spyware; install software only from trusted sources.', 'Detects and disables software that secretly monitors or sends information.', 'Remove it, then change exposed passwords through a trusted system. Information already disclosed may remain with the recipient.'],
      ['Hackers', 'Use strong authentication, appropriate access rights, patches and firewall rules.', 'Makes unauthorised entry harder, closes known weaknesses and limits permitted actions or connections.', 'Disable compromised access, repair the exploited weakness and restore trusted operation. Investigate which data was accessed or changed.'],
      ['Phishing', 'Filter suspicious messages; check requests through a known independent contact; avoid unknown links or attachments.', 'Reduces deceptive messages and prevents the requested disclosure to an impostor.', 'If passwords were supplied, change them using the genuine service and report the attempt.'],
      ['Pharming', 'Use updated anti-malware and protect local/router/DNS settings; heed certificate warnings and independently verify suspicious destinations.', 'Reduces malicious redirection and gives the user a reason to stop before entering private information.', 'Remove the cause of redirection and restore trusted settings; change details disclosed at the fake site.'],
    ]) +
    exam('Identify a suitable measure and explain the link: what it checks or changes, which stage of the threat it interrupts, and how this reduces the stated risk. A firewall is not a general cure for every malicious file, and encryption does not stop deletion.') +
    source('9618/12/O/N/25 · Q5(e), 3 marks · matching threats, descriptions and precautions (QP p9; MS p8).', '9618/13/O/N/23 · Q8(c), 3 marks · explaining malware risk reduction (QP p12; MS p9).') +
    '<p class="s6-source-note"><strong>How to use the schemes</strong>The table develops the mechanisms behind the selected answers. A listed precaution must be justified for its situation; for example, a VPN is not a universal guarantee against pharming.</p>'),
];

const dataProtection = [
  material('s6-encryption-full', 'Encryption · follow plaintext, ciphertext and the key', renderSection6Lab('encryption', { id: 's6-encryption-full-lab', variant: 'full' })),
  material('s6-encryption-description', 'Describe the complete encryption process',
    figure(flow([['Plaintext', 'Start with readable data such as “Student AB012: 46”.'], ['Encrypt', 'Apply an encryption algorithm with the encryption key.'], ['Ciphertext', 'Store or transmit the transformed data. An interceptor sees this protected form.'], ['Decrypt', 'The authorised recipient uses the appropriate decryption algorithm and key.'], ['Recovered plaintext', 'With the correct key, the recipient recovers the original readable message.']]),
      'The algorithm specifies the transformation; the key controls it. Protect the key as well as the ciphertext. This chapter’s interactive cipher is a teaching example, not a claim about the strength of a production encryption system.') +
    exam('Encryption transforms plaintext into ciphertext using an algorithm and a key. Intercepted ciphertext cannot be understood without the appropriate decryption key. The recipient applies the decryption process with the correct key to recover the plaintext.') +
    '<p class="s6-callout">Encryption protects confidentiality. By itself, it does not stop interception, deletion or disruption of the computer, and it does not prove the original message was accurate.</p>' +
    source('9618/12/M/J/24 · Q3(a)(ii), 3 marks (QP p5; MS p5).', '9618/11/M/J/25 · Q7(a), 3 marks (QP p12; MS p11).')),
  material('s6-access-rights', 'Access rights · who may read, modify or delete?',
    figure(table('Permissions on Marks.csv', ['Account', 'Read', 'Modify', 'Delete'], [['Teacher', 'Allow', 'Allow', 'Deny'], ['Reviewer', 'Allow', 'Deny', 'Deny'], ['Visitor', 'Deny', 'Deny', 'Deny']]) +
      flow([['Authenticate', 'The reviewer enters the correct username and password.'], ['Request', 'The reviewer asks to delete Marks.csv.'], ['Check the right', 'The delete permission is Deny for this account and file.'], ['Result', 'Reject the operation. The file remains unchanged.']]),
      'Authentication and access rights are separate decisions. Rights can be assigned to an individual or a group and to particular files, tables or operations.') +
    table('Follow the record state', ['Request', 'Permission result', 'Record after the request'], [['Teacher reads mark 46', 'Allow', 'Still 46'], ['Teacher changes it to 48 after checking the source', 'Allow', '48'], ['Reviewer attempts deletion', 'Deny', 'File still exists, containing 48']]),
  ),
  material('s6-access-rights-exam', 'Access rights · the core marking points',
    table('Turn the permission matrix into an exam explanation', ['Marking idea', 'Explain it concretely'], [
      ['Different users can have different permissions.', 'A teacher may update marks; a reviewer may only read them.'],
      ['Rights control access to specific data.', 'Check the rights for the requested file or database table.'],
      ['Rights control the type of operation.', 'Allow reading while denying editing or deletion.'],
      ['The system enforces those permissions.', 'Only an account with the correct right can carry out the operation.'],
    ]) +
    exam('Access rights specify which data a user or group may access and which operations they may perform, for example read only or read and write. The system checks the account’s permissions and denies an operation for which the account has no right.') +
    '<p class="s6-callout">Permission to edit is not proof that the new value is correct. Rights on the original file also do not protect a separate, readable copy that has already left the system.</p>' +
    source('9618/12/O/N/23 · Q2(b), 4 marks · different rights for users and tables, including read-only and read/write (QP p4; MS p4).', '9618/13/O/N/25 · Q5(d), 4 marks · correct permissions for reading/editing (QP p8; MS p9).')),
];

const integrityIntroduction = [
  material('s6-validation-intro', 'Validation · does the entered value obey the rule?',
    figure(strip(record('Original mark', '46', 'Out of 75'), arrow('Typing error'), record('Entered mark', '64', 'Still within the allowed range')) +
      '<div class="s6-rule-gate"><strong>Rule: 0 ≤ Mark ≤ 75</strong><span>64 satisfies both bounds.</span>' + badge('Validation passes') + '</div>',
      'Validation tests whether data is reasonable and conforms to stated rules. It can reject an impossible value such as 76, but the plausible wrong value 64 still passes.') +
    exam('Validation checks data against specified rules to test whether it is reasonable or acceptable. It helps protect integrity by rejecting invalid entries; it does not establish that the data is true.') +
    source('9618/13/O/N/23 · Q8(a), 2 marks · name and explain a method other than verification (QP p12; MS p8).')),
  material('s6-verification-intro', 'Verification · was the source copied accurately?',
    figure(pair(panel('Source document', record('Student AB012', '46', 'The original value')), panel('Entered record', record('Student AB012', '64', 'The copied value'), 's6-negative')) +
      '<div class="s6-rule-gate"><strong>Compare 46 with 64</strong><span>The values differ. Check the source and correct the entry.</span>' + badge('Mismatch detected', false) + '</div>',
      'Verification checks that data has been entered or transferred accurately. During entry, a person may compare it with the source or the computer may compare two independent entries; during transfer, sender and receiver use checking information.') +
    exam('Verification checks whether data has been copied or transferred accurately. It checks agreement with the source or with the checking information sent with the data.')),
  material('s6-validation-verification-table', 'Validation and verification compared',
    table('Two checks, two different questions', ['Aspect', 'Validation', 'Verification'], [['Question', 'Does the value satisfy the required rules?', 'Does the copy agree with the source or checking information?'], ['Example', 'A mark must be from 0 to 75.', 'Compare entered 64 with source 46.'], ['Result for 64', 'Pass: it is inside the range.', 'Fail: it differs from 46.'], ['Methods', 'Range, format, length, presence, existence, limit, check digit.', 'Visual check, double entry, parity check, checksum.'], ['Limit', 'A plausible wrong value can pass.', 'A faithfully copied wrong source can still be wrong.']]) +
    '<p class="s6-callout">Suppose the source itself incorrectly says 64 and the entry also says 64. The value can pass both checks. Neither proves that the source describes the real mark.</p>' +
    source('9618/13/M/J/23 · Q4(d)(i–iii), 5 marks · validation, verification and a wrong original source (QP pp8–9; MS p7).')),
];

const codeTiles = (value, kinds = []) => `<div class="s6-code-tiles" aria-label="${esc(value)}">${[...value].map((char, i) => `<span class="${kinds[i] ?? ''}"><b>${esc(char)}</b><small>${i + 1}</small></span>`).join('')}</div>`;
const ruleCard = (id, title, number, body, caption, description, sources = '') => material(id, title,
  `<div class="s6-validation-strip s6-rule-${number}" data-s6-validation-segment="${number}"><div class="s6-rule-heading"><span>${number} / 7</span><strong>${title}</strong></div>${figure(body, caption)}${exam(description)}${sources}</div>`);
const checkDigit = checkDigitExample('4726');
const validationChecks = [
  ruleCard('s6-range-check', 'Range check', 1,
    '<div class="s6-range-visual"><div class="s6-range-axis"><span style="--s6-x:8%">−1</span><span style="--s6-x:16.667%">0</span><span style="--s6-x:57.556%">46</span><span style="--s6-x:83.333%">75</span><span style="--s6-x:92%">76</span></div><div class="s6-range-band"><b>Reject</b><strong>Accept 0 through 75 inclusive</strong><b>Reject</b></div></div>' +
    strip(record('Lower boundary', '0', 'Pass'), record('Inside', '46', 'Pass'), record('Upper boundary', '75', 'Pass'), record('Outside', '76', 'Fail')),
    'For integer marks, this rule tests both a lower and an upper bound. Equality is included: both endpoints pass.',
    'A range check tests whether a value lies between stated lower and upper bounds. For example, accept a mark only if 0 ≤ Mark ≤ 75.',
    source('9618/13/O/N/25 · Q7(e), 3 marks across three algorithms · identifying a range check (QP p14; MS p12).')),
  ruleCard('s6-format-check', 'Format check', 2,
    '<div class="s6-pattern-key"><span class="s6-letter">Uppercase letter</span><span class="s6-digit">Digit</span></div>' +
    pair(panel('Required: two letters, then four digits', codeTiles('AB0123', ['s6-letter','s6-letter','s6-digit','s6-digit','s6-digit','s6-digit']) + badge('Pattern matches')),
      panel('A digit appears in a letter position', codeTiles('A10123', ['s6-letter','s6-wrong','s6-digit','s6-digit','s6-digit','s6-digit']) + badge('Pattern fails', false))),
    'The format rule checks the type and order of characters. The two entries have the same length, but only the first fits this pattern.',
    'A format check tests whether characters follow a specified pattern, for example two uppercase letters followed by four digits.',
    source('9618/13/M/J/23 · Q4(d)(i), 2 marks · applying a character pattern to a registration number (QP p8; MS p7).')),
  ruleCard('s6-length-check', 'Length check', 3,
    pair(panel('Exactly six characters', codeTiles('AB0123') + badge('Length 6: pass')), panel('Only five characters', codeTiles('AB123') + badge('Length 5: fail', false))) +
    '<p class="s6-callout"><code>123456</code> also has length 6. It passes the length check even though it fails the format shown above.</p>',
    'Count characters, including leading zeros in a code. A length rule may require an exact, minimum or maximum length; use the stated requirement.',
    'A length check tests the number of characters. It does not by itself check which characters were entered.',
    source('9618/13/M/J/23 · Q4(d)(i), 2 marks · the required registration number has six characters (QP p8; MS p7).')),
  ruleCard('s6-presence-check', 'Presence check', 4,
    pair(panel('Required student ID is blank', '<div class="s6-form-field"><span>Student ID *</span><code class="s6-empty-field">No entry</code></div>' + badge('Presence fails', false)),
      panel('A value has been supplied', '<div class="s6-form-field"><span>Student ID *</span><code>ZZ999</code></div>' + badge('Presence passes'))),
    'A presence check requires something to be entered in a mandatory field. It does not establish that the supplied identifier is valid or exists.',
    'A presence check ensures that a required field is not left blank.',
    source('9618/12/M/J/23 · Q2(c)(i), 2 marks · checking that the rider level is entered (QP p6; MS p4).')),
  ruleCard('s6-existence-check', 'Existence check', 5,
    strip(record('Entered ID', 'ZZ999', 'Non-blank and correctly formatted'), arrow('Search stored list'), '<div class="s6-lookup-list"><strong>Existing student IDs</strong><code>AB012</code><code>CD345</code><span>No ZZ999 record</span></div>') +
    '<div class="s6-rule-gate">' + badge('Existence fails', false) + '<span>AB012 would pass because it is in this list.</span></div>',
    'Compare the supplied value with the specified stored records or list of allowed values. A present, well-formed value may still fail.',
    'An existence check tests whether the entered value is found in a specified stored list or lookup, for example an existing student ID.',
    source('9618/12/M/J/23 · Q2(c)(i), 2 marks · RiderLevel must exist in the allowed set (QP p6; MS p4).')),
  ruleCard('s6-limit-check', 'Limit check', 6,
    '<div class="s6-limit-visual"><div><span>8 MiB</span><i style="--s6-fill:66.67%"></i><b>Pass</b></div><div><span>10 MiB</span><i style="--s6-fill:83.33%"></i><b>Pass</b></div><div><span>11 MiB</span><i style="--s6-fill:91.67%"></i><b>Fail</b></div><strong>One upper boundary: 10 MiB</strong></div>',
    'The input here is already a non-negative file size. This upper-limit check asks only whether it is at most 10 MiB; it does not introduce a second bound.',
    'A limit check compares a value with one stated upper or lower bound. For example, reject an upload if its size exceeds 10 MiB. A range check has both bounds.'),
  ruleCard('s6-check-digit', 'Check digit', 7,
    '<p class="s6-rule-label">Example rule: multiply the four data digits by 3, 1, 3, 1; add a final digit that makes the total a multiple of 10.</p>' +
    table('Calculate a check digit', ['Data digit', ...[...checkDigit.data]], [['Weight', ...checkDigitWeights.map(String)], ['Product', ...checkDigit.products.map(String)]]) +
    strip(record('Product sum', String(checkDigit.sum)), arrow('Add 9 to reach 40'), record('Complete identifier', checkDigit.code, 'The final 9 is the check digit')) +
    pair(panel('Check supplied 47269', '<p>Recalculate from 4726: expected digit 9. Compare with supplied digit 9.</p>' + badge('Rule passes')), panel('Check supplied 47268', '<p>Recalculate from 4726: expected digit 9. Supplied digit 8 differs.</p>' + badge('Reject / re-enter', false))),
    'The check digit is calculated from the other digits and attached to the identifier. Different schemes use different rules: always use the algorithm supplied in the question. Some wrong identifiers can still pass.',
    'On entry, recalculate the expected check digit from the data digits and compare it with the supplied check digit. A mismatch detects an error; it does not reveal with certainty which digit was wrong.',
    source('9618/23/O/N/25 · Q6 uses a different check-digit rule, sum modulo 10 (QP p14). Its programming tasks are an extension, not a requirement for this diagram.')),
];

const verification = [
  material('s6-visual-double-entry', 'Visual check and double entry compared',
    figure(pair(panel('Visual check · human comparison', strip(record('Source', 'BK209'), arrow('Compare by eye'), record('Entry', 'BK290')) + badge('Source mismatch', false)),
      panel('Double entry · computer comparison', strip(record('Entry 1', 'BK209'), arrow('Compare strings'), record('Entry 2', 'BK290')) + badge('Entries differ', false))),
      'After a mismatch, consult the original source, correct the entry and repeat the check. Do not assume that the first entry is correct or average the two values.') +
    table('Verification during data entry', ['Aspect', 'Visual check', 'Double entry'], [['Who compares?', 'A person.', 'The computer.'], ['What is compared?', 'The entered value and original source.', 'Two independently entered versions.'], ['How is it done?', 'Read the source and input carefully; identify any differences.', 'Enter again without copying the first input; the system compares the entries.'], ['Mismatch response', 'Check the source and correct the record.', 'Flag the mismatch, check the source and re-enter.'], ['Limitation', 'A person can overlook an error; the source may itself be wrong.', 'The same mistake entered twice can match; the source may itself be wrong.']]) +
    source('9618/13/O/N/23 · Q3(c), 4 marks · who compares, what is compared and second entry (QP p6; MS p5).', '9618/13/M/J/23 · Q4(d)(ii–iii), 3 marks · entry methods and their limitation (QP p9; MS p7).')),
  material('s6-byte-parity', 'Parity check · switch between Byte and Block', renderSection6Lab('parity', { id: 's6-byte-parity-lab', variant: 'byte' }) +
    exam('The sender and receiver agree on even or odd parity. The sender adds a parity bit so that the total number of 1 bits has that parity. The receiver checks the complete group again; a mismatch indicates an error and can trigger retransmission.') +
    '<p class="s6-callout">Count the parity bit as well as the data bits. A parity byte check can detect an odd number of bit errors, but cannot locate the incorrect bit. An even number of bit errors can escape detection.</p>' +
    source('9618/11/M/J/24 · Q5(b), 5 marks · parity construction (QP p11; MS p6).', '9618/12/O/N/25 · Q6(c)(i), 1 mark · fill the parity bit (QP p11; MS p9).')),
  material('s6-block-parity', 'Block parity · construct, locate and correct',
    figure(flow([['Complete each data row', 'Count the 1s in seven data bits. Add the rightmost parity bit to make the row even.'], ['Build the parity byte', 'Count down each column, including the row parity bits. Add a bottom bit to make each column even.'], ['Transmit the complete block', 'Keep the original checking bits with the data. Do not replace them after an error.']]) +
      pair(panel('Sender · the complete block', parityGrid('s6-block-sender', parityExample.sentBlock)), panel('Receiver · one changed bit', parityGrid('s6-block-receiver', parityExample.receivedBlock, true), 's6-negative')),
      'The sender constructs both kinds of checking information before transmission. In this example, the received 1 at row 2, column 5 differs from the transmitted 0. The receiver identifies it from the failing row and column, not by being given the original data.') +
    table('Resolve this single-bit error', ['Step', 'Reasoning'], [['Locate', 'Row 2 has an odd count and column 5 has an odd count. Their intersection is the changed bit.'], ['Correct under the single-error assumption', 'Flip row 2, column 5 from 1 to 0.'], ['Recheck', 'All rows and columns now have even parity. The restored second row is 01100000.']]) +
    exam('The sender adds a parity bit to each data row and calculates a parity byte for the columns. Both are sent with the data. The receiver checks rows and columns again. If exactly one bit changed, the failing row and column locate it at their intersection.') +
    '<p class="s6-callout">Correcting the intersection assumes one changed bit. Multiple errors can be ambiguous or undetected; four flipped corners of a rectangle preserve every affected row and column parity.</p>' +
    source('9618/12/O/N/25 · Q6(c)(ii), 1 mark · locate a changed bit (QP p11; MS p9).', '9618/13/M/J/24 · Q7(f)(i) · block parity as a transfer-verification method (QP p16; MS p9).')),
  material('s6-checksum', 'Checksum · compare results calculated at both ends', renderSection6Lab('checksum', { id: 's6-checksum-lab' }) +
    exam('The sender uses an algorithm to calculate a checksum from the data and sends both. The receiver applies the same algorithm to the received data and compares its result with the received checksum. Different results show an error; the receiver rejects the data or requests retransmission.') +
    '<p class="s6-callout">A matching checksum means this check detected no error. Different data may produce the same checksum. The sum-modulo-256 calculation shown here is a specified example, not the definition of every checksum.</p>' +
    source('9618/11/M/J/25 · Q7(c), 3 marks · calculate, send, recalculate and compare (QP p13; MS p11).')),
];

export const section6Materials = {
  '6.1.1': concepts, '6.1.2': system, '6.1.3': measures, '6.1.4': threats,
  '6.1.5': precautions, '6.1.6': dataProtection,
  '6.2.1': integrityIntroduction, '6.2.2': validationChecks, '6.2.3': verification,
};
