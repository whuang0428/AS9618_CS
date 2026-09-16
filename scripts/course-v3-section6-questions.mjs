const ids = (r,...ns) => ns.map(n=>'S6.'+String(r).padStart(2,'0')+'.A'+String(n).padStart(2,'0'));
const q = (lesson,n,prompt,objectiveIds,answerPoints,commonError,extra={}) => ({
  id:'S6-L0'+lesson+'-Q'+n,prompt,objectiveIds,answerPoints,commonError,
  marks:answerPoints.length,type:'Application',authored:true,...extra,
});
const revisions = [
  q(1,1,'Identify the principal concern and explain the consequence in each independent case: a school publishes unchanged private medical details; an authorised teacher enters 82 instead of source mark 28; an intruder deletes the only copy of required records. State whether the first incident necessarily establishes lost integrity.',ids(1,1),[
    'The first incident affects privacy and security through unauthorised disclosure; unchanged accurate contents do not by themselves establish an integrity failure.',
    'The incorrect mark affects integrity because the recorded value differs from the source, even though the teacher may edit it.',
    'Deleting the only copy causes unauthorised data loss and removes required information; the incident is a security failure and can leave the records incomplete.',
  ],'These properties are not mutually exclusive labels. Tie each claim to the stated consequence.'),
  q(2,2,'A sender signs document M with private key K. A receiver already trusts the corresponding sender public key. An attacker replaces M with M2 but sends the old signature unchanged. The supplied conceptual digest values are H(M)=h1 and H(M2)=h2, with h1 different from h2. Describe the receiver’s correct check and result, identify which key it uses, and explain why a signature alone does not hide either document.',ids(3,2),[
    'The receiver hashes the received M2 using the agreed algorithm and obtains h2.',
    'It uses the trusted sender public key, not the sender private key, to verify the received signature.',
    'In the simplified comparison model, the old signature is tied to h1; the h2 evidence does not match and verification fails.',
    'It rejects the claim that M2 is the unchanged signed document; it must not infer that the signature bytes themselves necessarily changed.',
    'The accompanying document remains readable without separate encryption, so signing alone has not supplied confidentiality.',
  ],'Verification must include the received content. A trusted key without a content check is insufficient.'),
  q(2,3,'Describe enrolment and later fingerprint authentication for a claimed account. A legitimate enrolled user is rejected after a poor scan, while an impostor is accepted in a different attempt. Identify both errors and explain why a successful match does not automatically permit deletion of a protected record.',ids(3,3),[
    'Enrolment captures the legitimate user’s features and stores a protected reference template for the correct account.',
    'A later capture supplies comparison features which are checked for a sufficient match against the enrolled reference.',
    'Rejecting the legitimate user is false rejection; accepting the impostor is false acceptance.',
    'Authentication evaluates identity; a separate permission check can deny deletion even after a match.',
  ],'Identify the actual user as well as the system decision; MATCH does not prove the decision was correct.'),
  q(2,4,'A firewall uses the first matching rule: (1) allow traffic belonging to an already permitted connection; (2) allow new inbound TCP connections to the public server on port 443; (3) deny everything else. Describe its decision for a new inbound TCP connection to port 22 and a reply belonging to an already permitted connection. Compare a host firewall with a network-boundary firewall and state why an allowed reply can still need malware checking.',ids(3,4),[
    'The new inbound port-22 connection matches neither rule 1 nor rule 2, so rule 3 denies it.',
    'The reply matches rule 1 and is allowed without needing to match a later rule.',
    'A host firewall filters traffic for one computer; a network firewall filters traffic passing through its boundary, not every path that bypasses it.',
    'Connection properties can satisfy the rules while the reply contains malicious code; permitted traffic is not proof of safe content.',
  ],'Apply the supplied rule order and default decision; do not invent a virus test in the rules.'),
  q(2,8,'A researcher account may read and modify Results.txt but may not delete it. Its stored result starts at 25. Describe the check results for three independent attempts from that state: wrong password then read; correct password then read; correct password then delete. For each, state the check result and the file result. Explain why a stolen correct password does not make its user legitimately authorised.',ids(3,1,8),[
    'The wrong password fails authentication; no read is granted and the stored result stays 25.',
    'The correct password authenticates the account; permitted reading returns 25 without changing it.',
    'The correct password succeeds at login but delete permission is denied; the file remains with result 25.',
    'An impostor can satisfy a credential check with a stolen secret while still lacking legitimate permission to act as the owner.',
  ],'Each attempt starts independently at 25; do not treat denied deletion as an update or assume a successful login permits every operation.'),
  q(4,5,'An invoice starts with Amount=60. Clerk may read and modify it but may not delete it; Auditor may only read it. In order, Clerk changes Amount to 70, Auditor reads it, and Auditor tries to delete it. State each result and the final record. Then explain why this permission matrix cannot establish that 70 is factually correct or protect an unencrypted copy already sent to an outsider.',ids(6,2),[
    'Clerk’s modification is allowed and the stored amount becomes 70.',
    'Auditor’s read returns 70; the read does not change the record.',
    'Auditor’s deletion is denied, leaving the invoice present with Amount=70.',
    'An authorised clerk can still enter a wrong value; the permission check does not compare the amount with the source invoice.',
    'An outsider can read the independent unencrypted copy without consulting the original service’s permissions.',
  ],'Follow the stated order. A denied operation preserves the current value, not necessarily the initial one.'),
  q(5,8,'Calculate the checking bits to complete an even-parity block from these three seven-bit data rows: 1110000, 0101010, 0011001. Append one parity bit at the right of each row, then calculate the transmitted column-parity row. Only the second complete row changes during transmission to 01011101. Identify the failed row and column, correct the bit under a single-bit error assumption, and state the final complete block.',ids(8,3),[
    'All three data rows have three 1s, so each row-parity bit is 1. The complete rows are 11100001, 01010101 and 00110011.',
    'The column-parity row is 10000111; it is sent with the complete data rows.',
    'Only row 2 and column 5 fail even parity, locating the single changed bit at their intersection.',
    'Change that bit from 1 to 0. The final block is 11100001 / 01010101 / 00110011 / 10000111.',
    'All final row counts are 4; column counts are 2,2,2,2,0,2,2,4. All are even, confirming the recheck.',
  ],'Calculate from the data bits first. Do not silently generate replacement column parity from the corrupted block.'),
  q(5,11,'A form requires CustomerID to be non-blank, in the format one uppercase letter followed by two digits, and present in {C10,C20}; BookingCode must have exactly four digits; Age is an integer from 5 to 18 inclusive. The source form says C20 / 0042 / 14, but the submitted record is C99 / 0042 / 12. Identify the checks, state which validation checks pass or fail, compare the submission with the source, and give the corrected accepted record.',[...ids(7,2,3,4,5,6,9),...ids(8,1)],[
    'CustomerID uses presence, format and existence checks. C99 passes presence and format but fails existence in the supplied customer set.',
    '0042 passes the four-character length and digit-format requirements; preserve the leading zeros.',
    '12 passes the age range because 5 <= 12 <= 18; this does not prove it is the source age.',
    'Visual comparison finds two source differences: C99 versus C20 and 12 versus 14.',
    'Correct to C20 / 0042 / 14, reapply the required validation checks and source comparison, then accept that corrected record when all pass.',
  ],'A rejected record can contain some fields that pass. Do not replace a failed identifier by guessing from the lookup.'),
  q(5,12,'A source identifier uses data digits 5834 with weights 3,1,3,1 and a final digit that makes the weighted total a multiple of 10. A clerk instead enters 53844. Calculate the expected final digit for both data values and explain why the check-digit rule and a visual source comparison give different results.',[...ids(7,8,9),...ids(8,1,5)],[
    '5834 has weighted total 15+8+9+4=36 and check digit 4, giving source code 58344.',
    '5384 has weighted total 15+3+24+4=46 and also needs check digit 4; 53844 passes the rule.',
    'Visual comparison with 58344 detects the transposition. Passing a check-digit rule does not establish the intended identifier.',
  ],'A different data value need not have a different check digit.'),
];

export function enhanceSection6Questions(lesson, number) {
  const selected = revisions.filter(q=>q.id.startsWith('S6-L0'+number+'-'));
  const replacements = new Map(selected.map(q=>[q.id,q]));
  const existing = new Set(lesson.practice.map(q=>q.id));
  return {...lesson,practice:[...lesson.practice.map(q=>replacements.get(q.id)??q),...selected.filter(q=>!existing.has(q.id))]};
}

const review = (n,prompt,requirements,answerPoints,commonError) => ({
  id:'REV-P1-S6-Q'+n,prompt,objectiveIds:requirements.map(r=>'S6.'+String(r).padStart(2,'0')+'.R'),
  answerPoints,commonError,marks:answerPoints.length,type:'Application',authored:true,
});
export const section6ReviewQuestions = [
  review(1,'A school’s verified medical file is copied unchanged to an unauthorised recipient. Later a permitted clerk records the wrong appointment time, and a system fault prevents staff opening the file although storage is intact. Explain the different consequences and justify one measure for each incident.',[1,2,5],[
    'The unchanged disclosure affects privacy/security but does not by itself demonstrate corrupted contents; control and verify recipients and permitted disclosure.',
    'The incorrect appointment affects integrity despite an authorised edit; compare the entry with its original source and correct it.',
    'The system fault makes the service unavailable without proving that the stored file changed; recover a trustworthy working processing environment.',
    'Protecting the data copy and maintaining a usable system are complementary; no one of the proposed measures resolves all three incidents.',
  ],'Do not force each event into one exclusive label or infer changed storage merely from an application failure.'),
  review(2,'An auditor logs in correctly and receives a signed but unencrypted report. The auditor has read-only rights on the original records. The sender’s public key is trusted. Explain what login, signature verification and access rights each establish, how the received report must be checked, and whether a person who intercepts it can read it.',[3,6],[
    'Login authenticates the account claim using its supplied evidence; it does not by itself authenticate every document.',
    'Signature verification must include the received report and the trusted sender public key, using the received-message digest in the taught model.',
    'Successful signature verification supports the claimed origin and unchanged signed content; it does not prove that the report’s original statements are true.',
    'Read-only rights allow reading but deny modification/deletion of the controlled records; they do not prohibit every independent copy.',
    'The unencrypted report remains readable to an interceptor; confidentiality needs separate encryption.',
  ],'Keep the account identity, signed message, controlled record and intercepted copy separate.'),
  review(3,'A booking needs an existing customer ID from {P12,P34}, a six-character code with two uppercase letters then four digits, and an integer age from 5 to 18 inclusive. Source: P34 / AB0012 / 14. Entry: P99 / AB0012 / 12. Describe the validation results, the source-verification result and the final correction. Explain why two identical copies of the entry would not settle the problem.',[7,8],[
    'P99 is present but fails existence in the stated customer lookup.',
    'AB0012 passes the stated length and format; 12 passes the age range.',
    'Visual source comparison finds the wrong ID and wrong age. Correct to P34 / AB0012 / 14 and recheck before acceptance.',
    'Two copies of the wrong entry can agree. Double entry tests agreement between copies, not membership in the lookup or truth of the source age.',
  ],'Passing the range is not evidence that 12 matches the supplied source.'),
  review(4,'A link uses seven data bits followed by an even-parity bit. Data 1001100 is transmitted, and the first received group is 10001001. Calculate the sent group and the receiving decision. A separate transfer sends data bytes 100,100,80 with a sum-modulo-256 checksum; it arrives as 101,99,80 with the original checksum. Calculate the check values and explain the different detection outcomes.',[8],[
    '1001100 has three 1s, so append parity bit 1 and send 10011001.',
    'Received 10001001 has three 1s and fails even parity. Reject or request retransmission; byte parity alone does not locate the bit.',
    'The original byte sum is 280, giving checksum 24 modulo 256.',
    'The changed byte sum is also 280 and the receiver calculates 24, matching the received checksum.',
    'The +1 and -1 changes cancel in this checksum; different data passed. Parity and checksum results must be interpreted under their specific rules.',
  ],'Do not apply the byte-parity rule to the separate checksum calculation, or call a matching checksum proof of an unchanged block.'),
];
