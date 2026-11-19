/* Deterministic classroom models. Signature tokens and the XOR cipher are teaching
   models, not cryptographic implementations for protecting real information. */
const section6Models = (() => {
  'use strict';
  const item = (label, value, state = '') => ({ label, value: String(value), state });
  const lane = (label, items) => ({ label, items });
  const frame = (title, caption, lanes = [], extra = {}) => ({ title, caption, lanes, ...extra });
  const validateText = value => {
    if (typeof value !== 'string' || value.length < 1 || value.length > 120) throw new RangeError('Use a message of 1–120 characters.');
    return value;
  };
  function digest(text) {
    let hash = 2166136261;
    for (const byte of new TextEncoder().encode(text)) hash = Math.imul(hash ^ byte, 16777619) >>> 0;
    return hash.toString(16).padStart(8, '0').toUpperCase();
  }
  function signature({ message = 'Deliver to room A', altered = 'Deliver to room B', tamper = false, publicKey = 'A' } = {}) {
    validateText(message); if (tamper) validateText(altered);
    if (!['A', 'B'].includes(publicKey)) throw new Error('Choose public key A or B.');
    const received = tamper ? altered : message, sentDigest = digest(message), receivedDigest = digest(received);
    const keyMatches = publicKey === 'A', valid = keyMatches && sentDigest === receivedDigest;
    const sender = values => lane('SENDER · private key A stays here', values);
    const receiver = values => lane('RECEIVER · uses the trusted sender public key', values);
    const frames = [
      frame('1 · Start with a readable message', 'Signing supplies evidence about the sender and the signed content. It does not hide the message.', [sender([item('Message', message)])]),
      frame('2 · Calculate a message digest', 'Apply a hash function to the message. The digest value here illustrates the comparison.', [sender([item('Message', message), item('Digest', sentDigest, 'active')])]),
      frame('3 · Encrypt the digest to create the signature', 'In this simplified exam model, encrypt the digest with the sender’s private key to create the signature. The private key is not sent.', [sender([item('Digest', sentDigest), item('Private key A', 'Encrypt digest', 'active'), item('Signature', `SIG-A(${sentDigest})`)])]),
      frame('4 · Send the message and signature', tamper ? 'The attacker replaces only the message. The original signature travels unchanged.' : 'The readable message travels with its signature.', [sender([item('Sent message', message), item('Signature', `SIG-A(${sentDigest})`)]), receiver([item('Received message', received, tamper ? 'changed' : ''), item('Received signature', `SIG-A(${sentDigest})`)])]),
      frame('5 · Hash the received content', 'The receiver applies the same hash function to the actual received message.', [receiver([item('Received message', received), item('New digest', receivedDigest, 'active'), item('Public key selected', publicKey)])]),
      frame('6 · Check the signature and compare', keyMatches ? 'In the simplified model, decrypt the signature with sender public key A to recover the signed digest. Compare it with the newly calculated digest.' : 'Public key B does not correspond to the sender’s private key A; it cannot recover the sender’s signed digest in this model, so verification fails.', [receiver([item('Digest recovered using public key', keyMatches ? sentDigest : 'Cannot verify with key B', keyMatches ? '' : 'fail'), item('Received-content digest', receivedDigest), item('Verification', valid ? 'PASS' : 'FAIL', valid ? 'pass' : 'fail')])], { conclusion: valid ? 'The check supports the claimed sender and unchanged signed content. The readable message is still not confidential.' : 'Reject the claim that this is the unchanged message signed by the claimed sender. Signing alone has not hidden either message.' }),
    ];
    return { kind: 'signature', frames, sentDigest, receivedDigest, received, keyMatches, valid };
  }

  const firewallRules = [
    { number: 1, description: 'Traffic belongs to an already permitted connection', decision: 'ALLOW' },
    { number: 2, description: 'New inbound TCP to the public web server, port 443', decision: 'ALLOW' },
    { number: 3, description: 'New outbound TCP to port 443', decision: 'ALLOW' },
    { number: 4, description: 'Anything else (default)', decision: 'DENY' },
  ];
  function firewall({ direction = 'inbound', port = 22, established = false, target = 'public', placement = 'network', bypass = false } = {}) {
    port = Number(port);
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new RangeError('Port must be an integer from 1 to 65535.');
    if (!['inbound','outbound'].includes(direction) || !['public','staff'].includes(target) || !['network','host'].includes(placement)) throw new Error('Choose a listed traffic option.');
    const rule = established ? 1 : direction === 'inbound' && target === 'public' && port === 443 ? 2 : direction === 'outbound' && port === 443 ? 3 : 4;
    const decision = bypass ? 'NOT INSPECTED' : firewallRules[rule - 1].decision;
    const request = `${direction} TCP · ${target} server · port ${port} · ${established ? 'existing permitted connection' : 'new connection'}`;
    const scope = placement === 'host' ? 'one computer' : 'traffic crossing this network boundary';
    const path = lane(direction === 'inbound' ? 'EXTERNAL → PROTECTED' : 'PROTECTED → EXTERNAL', [item('Traffic', request), item(placement === 'host' ? 'Host firewall' : 'Network firewall', bypass ? 'Path bypasses this filter' : 'Inspect this path', bypass ? 'changed' : 'active'), item('Destination', 'Pending')]);
    const frames = [frame('1 · Choose the traffic path', `This ${placement} firewall protects ${scope}.`, [path])];
    if (!bypass) frames.push(frame('2 · Read packet and connection information', 'Compare the stated direction, destination, port, protocol and connection state with the configured rules.', [lane('REQUEST', [item('Protocol', 'TCP'), item('Direction', direction), item('Port', port), item('Connection', established ? 'Already permitted' : 'New')])]));
    if (!bypass) for (let i = 1; i <= rule; i += 1) frames.push(frame(`Rule ${i} · ${i === rule ? 'First match' : 'No match'}`, i === rule ? `Apply ${firewallRules[i - 1].decision}; later rules are not considered.` : 'Continue to the next rule in order.', [path], { rules: firewallRules.map(r => ({ ...r, status: r.number < i ? 'No match' : r.number === i ? (i === rule ? 'MATCH' : 'No match') : 'Not evaluated' })) }));
    frames.push(frame('Decision · Follow the actual path', bypass ? 'This traffic never passes through the selected filter, so this firewall makes no decision about it.' : `${decision} follows the firewall rules. It does not determine whether the data contains malware.`, [lane('RESULT', [item('Request', request), item('Matched rule', bypass ? 'None' : rule), item('Outcome', decision, decision === 'DENY' ? 'fail' : bypass ? 'changed' : 'pass')])], { conclusion: bypass ? 'A firewall cannot filter a path that bypasses it.' : decision === 'ALLOW' ? 'Traffic meets these rules. An allowed reply can still carry malicious content; anti-malware supplies a different check.' : 'The request is blocked by the stated rules. This does not prove that every blocked request contains malware.' }));
    return { kind: 'firewall', frames, rule: bypass ? null : rule, decision, rules: firewallRules };
  }

  function antivirus({ sample = 'recent', updated = false, response = 'quarantine' } = {}) {
    if (!['known','recent','unknown'].includes(sample) || !['quarantine','delete'].includes(response)) throw new Error('Choose a listed sample and response.');
    const detected = sample === 'known' || sample === 'recent' && updated;
    const signatureLabel = sample === 'known' ? 'V1' : sample === 'recent' ? 'V2' : 'V?';
    const definitions = updated ? ['V1','V2'] : ['V1'];
    const files = status => lane('FILE → SCANNER → NORMAL EXECUTION', [item('download.exe', `Sample ${signatureLabel}`), item('Detection database', definitions.join(', ')), item('File state', status, status.includes('Quarantine') || status === 'Deleted' ? 'pass' : 'active')]);
    const frames = [
      frame('1 · An executable arrives', 'The file has not been run. The selected sample is known to this simulation to contain a virus.', [lane('FILE → SCANNER → NORMAL EXECUTION', [item('download.exe', `Sample ${signatureLabel}`), item('Older detection database', 'V1'), item('File state', 'Waiting for scan')])]),
      frame('2 · Maintain detection information', updated ? 'An update supplies V2 as well as V1. Unknown signatures can still be absent.' : 'The older database knows only V1; information about V2 is missing.', [files('Database ready')]),
      frame('3 · Scan and compare', 'This demonstration compares file patterns with known virus signatures. Real anti-virus may also monitor suspicious behaviour.', [files(detected ? 'Pattern matched' : 'No matching pattern')]),
      frame('4 · Interpret the detection result', detected ? 'A matching signature flags the infected file; stop normal execution.' : 'No match is found. The undetected infected file remains present; a clean scan is not proof of safety.', [files(detected ? 'Execution blocked' : 'Undetected file remains')]),
      frame('5 · Contain the detected file', detected ? 'Quarantine isolates the file from normal use while retaining it for inspection.' : 'There is no detection to trigger quarantine in this run.', [files(detected ? 'Quarantined; cannot run normally' : 'Still undetected')]),
      frame('6 · Choose the response', !detected ? 'Updating helps when a new detection rule exists; it does not guarantee recognition of unknown threats.' : response === 'delete' ? 'Delete the detected file from this computer. Previously damaged data still needs recovery.' : 'Keep the file isolated for review. Quarantine is not the same as repairing every damaged document.', [files(!detected ? 'Undetected file remains' : response === 'delete' ? 'Deleted' : 'Quarantined; retained for review')], { conclusion: detected ? `${response === 'delete' ? 'Deletion removes this detected file' : 'Quarantine blocks normal execution of this file'}. Keep detection information current; recover damaged data from a suitable backup.` : 'This scan missed the infected sample. Do not interpret “no match” as “safe”.' }),
    ];
    return { kind: 'antivirus', frames, detected, definitions, finalState: detected ? response : 'undetected' };
  }

  function antispyware({ disclosed = true, replacePassword = false } = {}) {
    const route = (local, remote, password) => [lane('LOCAL COMPUTER', [item('Monitoring component', local), item('Password status', password)]), lane('THIRD PARTY', [item('Previously received copy', remote, remote === 'Recorded keystrokes retained' ? 'changed' : '')])];
    const remote = disclosed ? 'Recorded keystrokes retained' : 'No disclosure in this example';
    const frames = [
      frame('1 · Hidden monitoring is active', 'The spyware captures activity without the user’s informed permission.', route('Collecting keystrokes', disclosed ? 'Recorded keystrokes retained' : 'Nothing received yet', 'Original password')),
      frame('2 · Scan for spyware', 'Anti-spyware checks software and activity for known monitoring components or suspicious behaviour.', route('Detected by the scanner', remote, 'Original password')),
      frame('3 · Stop and isolate it', 'Block the detected component to stop further collection and transmission.', route('Stopped and quarantined', remote, 'Original password')),
      frame('4 · Remove the component', 'Remove the detected installation. The remote copy is outside the local removal operation.', route('Removed', remote, 'Original password')),
      frame('5 · Respond to disclosed information', replacePassword ? 'Replace the exposed password and address the entry route. Old captured information is not recalled.' : 'If the password was sent out, the recipient can still know it after removal.', route('Removed; no further capture', remote, replacePassword ? 'New password replaces the original' : 'Original password retained'), { conclusion: disclosed ? `Local spyware removal cannot retrieve the already disclosed keystrokes.${replacePassword ? ' Replacing the password reduces later use of that old password.' : ' Replace the exposed password as part of recovery.'}` : 'The detected component is removed before disclosure in this scenario. Removal cannot retroactively undo disclosure in a different case.' }),
    ];
    return { kind: 'antispyware', frames, collecting: false, remoteCopy: disclosed, oldCredentialExposed: disclosed, oldCredentialReplaced: replacePassword };
  }

  function encryption({ message = 'Meet at 8', key = 13, decryptionKey = 13 } = {}) {
    validateText(message);
    key = Number(key); decryptionKey = Number(decryptionKey);
    for (const value of [key, decryptionKey]) if (!Number.isInteger(value) || value < 1 || value > 255) throw new RangeError('Choose a key from 1 to 255.');
    const plainBytes = [...new TextEncoder().encode(message)], cipherBytes = plainBytes.map(byte => byte ^ key), decodedBytes = cipherBytes.map(byte => byte ^ decryptionKey);
    const ciphertext = cipherBytes.map(byte => byte.toString(16).padStart(2, '0').toUpperCase()).join(' '), recovered = new TextDecoder().decode(new Uint8Array(decodedBytes));
    const matches = message === recovered;
    const frames = [
      frame('1 · Start with plaintext', 'Plaintext is the readable original message.', [lane('SENDER', [item('Plaintext', message || '(empty message)'), item('Encryption key', key)])]),
      frame('2 · Apply an algorithm and key', 'The algorithm transforms the message using the key. This local demonstration uses byte-wise XOR so its result can be inspected.', [lane('ENCRYPT', [item('Plaintext', message || '(empty message)'), item('Algorithm + key', `XOR with ${key}`, 'active'), item('Ciphertext · hexadecimal', ciphertext || '(empty)')])]),
      frame('3 · Store or transmit ciphertext', 'An intercepted copy contains the transformed bytes. The legitimate recipient needs the appropriate key to recover the plaintext.', [lane('CHANNEL / STORAGE', [item('Sender output', ciphertext || '(empty)'), item('Intercepted copy', ciphertext || '(empty)', 'active'), item('Decryption key sent here?', 'No')])]),
      frame('4 · Decrypt using the selected key', 'Apply the inverse operation using the decryption key. In this symmetric classroom model the correct key is the same value.', [lane('DECRYPT', [item('Ciphertext', ciphertext || '(empty)'), item('Selected key', decryptionKey, key === decryptionKey ? 'active' : 'changed'), item('Recovered text', recovered || '(empty)')])]),
      frame('5 · Compare the recovered message', matches ? 'The recovered text matches the original in this run.' : 'The selected key does not recover the original text.', [lane('RESULT', [item('Original', message || '(empty)'), item('Recovered', recovered || '(empty)'), item('Comparison', matches ? 'MATCH' : 'DIFFERENT', matches ? 'pass' : 'fail')])], { conclusion: `${matches ? 'The matching key restores the plaintext.' : 'A different key gives a different result.'} Encryption protects confidentiality when the key is protected; it does not by itself authenticate the sender or prove factual accuracy.` }),
    ];
    return { kind: 'encryption', frames, plainBytes, cipherBytes, decodedBytes, ciphertext, recovered, matches };
  }

  const ones = bits => [...bits].reduce((sum, bit) => sum + Number(bit), 0);
  function parityBit(bits, convention = 'even') {
    if (!/^[01]+$/.test(bits) || !['even','odd'].includes(convention)) throw new Error('Use binary data and even or odd parity.');
    return (ones(bits) % 2) ^ (convention === 'odd' ? 1 : 0);
  }
  const counts = rows => ({ rows: rows.map(ones), columns: [...rows[0]].map((_, c) => rows.reduce((sum, row) => sum + Number(row[c]), 0)) });
  function parity({ mode = 'byte', convention = 'even', data = '1011001', rows = ['1011001','0110000','1100011'], flips = [{ row: 0, column: 3 }] } = {}) {
    if (!['byte','block'].includes(mode) || !['even','odd'].includes(convention)) throw new Error('Choose a listed parity mode.');
    const dataRows = mode === 'byte' ? [data] : rows;
    if (!Array.isArray(dataRows) || dataRows.length !== (mode === 'byte' ? 1 : 3) || dataRows.some(row => !/^[01]{7}$/.test(row))) throw new RangeError(mode === 'byte' ? 'Enter exactly seven binary data bits.' : 'Enter three rows of exactly seven binary data bits.');
    const sentRows = dataRows.map(row => row + parityBit(row, convention));
    const sentBlock = mode === 'block' ? [...sentRows, [...sentRows[0]].map((_, c) => parityBit(sentRows.map(row => row[c]).join(''), convention)).join('')] : [...sentRows];
    const unique = new Map();
    for (const flip of flips) {
      if (!Number.isInteger(flip.row) || !Number.isInteger(flip.column) || flip.row < 0 || flip.row >= sentBlock.length || flip.column < 0 || flip.column >= 8) throw new RangeError('The flipped bit must lie inside the transmitted block.');
      const key = `${flip.row}:${flip.column}`;
      if (unique.has(key)) unique.delete(key); else unique.set(key, flip);
    }
    const changed = [...unique.values()];
    const received = sentBlock.map((row,r) => [...row].map((bit,c) => unique.has(`${r}:${c}`) ? String(1 - Number(bit)) : bit).join(''));
    const expected = convention === 'odd' ? 1 : 0, receivedCounts = counts(received);
    const failedRows = receivedCounts.rows.flatMap((n,i) => n % 2 !== expected ? [i] : []);
    const failedColumns = mode === 'block' ? receivedCounts.columns.flatMap((n,i) => n % 2 !== expected ? [i] : []) : [];
    const detected = failedRows.length > 0 || failedColumns.length > 0;
    const candidate = mode === 'block' && failedRows.length === 1 && failedColumns.length === 1 ? { row: failedRows[0], column: failedColumns[0] } : null;
    const correctable = Boolean(candidate && changed.length === 1);
    const corrected = correctable ? received.map((row,r) => [...row].map((bit,c) => r === candidate.row && c === candidate.column ? String(1 - Number(bit)) : bit).join('')) : [...received];
    const grid = (values, checking = false, editable = false) => ({ grid: { rows: values, mode, checking, editable, failedRows: checking ? failedRows : [], failedColumns: checking ? failedColumns : [], changed, counts: counts(values), convention } });
    const frames = [
      frame('1 · Choose a parity convention', `${convention === 'even' ? 'Even' : 'Odd'} parity requires an ${convention} total number of 1 bits, including the checking bit.`, [], grid(dataRows)),
      frame('2 · Sender adds the checking bits', mode === 'byte' ? 'Append one parity bit to the seven data bits, forming one eight-bit byte.' : 'Append a parity bit to every data row, then add a parity byte containing one parity bit for each column. Transmit the parity bits and parity byte with the data.', [], grid(sentBlock)),
      frame('3 · Inspect the transmitted copy', 'Select any received bit to toggle a transmission error. The sender’s checking bits are not recalculated after an error.', [], grid(received, false, true)),
      frame('4 · Receiver counts the 1 bits', mode === 'byte' ? 'Count all eight received bits and test the agreed convention.' : 'Check every received row and column, including the transmitted parity row and column.', [], grid(received, true)),
      frame('5 · Interpret the check', !detected ? 'No parity error is detected. Some multiple-bit changes preserve every checked parity.' : mode === 'byte' ? 'Parity fails. This byte check detects a problem but cannot identify which bit changed.' : candidate ? `Row ${candidate.row + 1} and column ${candidate.column + 1} fail. Their intersection locates the error only under a single-bit error assumption.` : 'Several failures occur. This pattern does not identify one uniquely correctable bit.', [], { ...grid(received, true), conclusion: !detected ? 'A passed parity check is not proof of unchanged data.' : mode === 'byte' ? 'Reject or request retransmission; byte parity alone cannot correct the bit.' : correctable ? 'This simulation changed exactly one bit. The row/column intersection can now be corrected.' : 'Do not automatically correct a multi-bit case using a single-bit assumption; request retransmission.' }),
    ];
    if (mode === 'block') frames.push(frame('6 · Correct only the single-bit case, then recheck', correctable ? `Flip row ${candidate.row + 1}, column ${candidate.column + 1} back. Every row and column now satisfies ${convention} parity.` : 'No automatic correction is made: there is no known single-bit error to correct in this case.', [], { grid: { ...grid(corrected, true).grid, failedRows: correctable ? [] : failedRows, failedColumns: correctable ? [] : failedColumns }, conclusion: correctable ? 'The corrected block equals the original block in this one-bit example. Rechecking confirms the parity result.' : !detected ? 'The check can pass despite a changed block. Parity is a limited error-detection method.' : 'A multi-bit case requires further handling, such as retransmission.' }));
    return { kind: 'parity', frames, sentBlock, received, failedRows, failedColumns, detected, candidate, correctable, corrected, changed, receivedCounts };
  }

  function parseBytes(value) {
    const text = String(value).trim();
    const values = Array.isArray(value) ? value : /^\d+(?:(?:\s*,\s*|\s+)\d+)*$/.test(text) ? text.split(/[\s,]+/).map(Number) : [NaN];
    if (!values.length || values.length > 8 || values.some(byte => !Number.isInteger(byte) || byte < 0 || byte > 255)) throw new RangeError('Enter 1–8 integer bytes, each from 0 to 255, separated by commas.');
    return [...values];
  }
  const sumChecksum = bytes => parseBytes(bytes).reduce((sum, byte) => sum + byte, 0) % 256;
  function checksum({ original = [84,121,77], received, scenario = 'single' } = {}) {
    const sent = parseBytes(original);
    if (!['unchanged','single','cancelling','custom'].includes(scenario)) throw new Error('Choose a listed transmission case.');
    let arrived = [...sent];
    if (scenario === 'custom') arrived = parseBytes(received ?? sent);
    if (scenario === 'single') arrived[0] += arrived[0] === 255 ? -1 : 1;
    if (scenario === 'cancelling') {
      const a = sent.findIndex(byte => byte < 255), b = sent.findIndex((byte,i) => byte > 0 && i !== a);
      if (a < 0 || b < 0) throw new RangeError('For a cancelling example use at least two bytes, with one below 255 and a different one above 0.');
      arrived[a] += 1; arrived[b] -= 1;
    }
    if (arrived.length !== sent.length) throw new RangeError('The sender and receiver must have the same number of bytes in this example.');
    const sentSum = sent.reduce((a,b) => a+b,0), receivedSum = arrived.reduce((a,b) => a+b,0), sentChecksum = sentSum % 256, receivedChecksum = receivedSum % 256, matches = sentChecksum === receivedChecksum;
    const dataChanged = sent.some((byte,i) => arrived[i] !== byte);
    const frames = [
      frame('1 · Agree a checksum algorithm', 'For this example only: add the data bytes and take the remainder modulo 256. Use the algorithm specified by the exam question.', [lane('SENDER', [item('Data bytes', sent.join(', '))])]),
      frame('2 · Calculate the sender’s checksum', `${sent.join(' + ')} = ${sentSum}; ${sentSum} mod 256 = ${sentChecksum}.`, [lane('CALCULATE', [item('Sum', sentSum), item('Remainder modulo 256', sentChecksum, 'active')])]),
      frame('3 · Send data and checksum together', 'The transmitted checksum is retained while the selected errors affect the data bytes.', [lane('TRANSMISSION', [item('Sent bytes', sent.join(', ')), item('Arriving bytes', arrived.join(', '), dataChanged ? 'changed' : ''), item('Transmitted checksum', sentChecksum)])]),
      frame('4 · Recalculate at the receiver', `${arrived.join(' + ')} = ${receivedSum}; ${receivedSum} mod 256 = ${receivedChecksum}.`, [lane('RECEIVER', [item('Received bytes', arrived.join(', ')), item('Recalculated checksum', receivedChecksum, 'active')])]),
      frame('5 · Compare two independently obtained values', matches ? 'The recalculated checksum matches the transmitted checksum.' : 'The two checksum values differ, so an error is detected.', [lane('COMPARE', [item('Transmitted checksum', sentChecksum), item('Recalculated checksum', receivedChecksum), item('Decision', matches ? 'No error detected' : 'ERROR DETECTED', matches ? 'pass' : 'fail')])], { conclusion: matches ? dataChanged ? 'The data changed but this checksum still matches. The selected changes cancel; matching checksums do not prove identical data.' : 'No error is detected in this unchanged example. A match does not prove that every possible error would be detected.' : 'Reject the block or request retransmission. A checksum mismatch does not by itself identify the changed byte.' }),
    ];
    return { kind: 'checksum', frames, sent, received: arrived, sentSum, receivedSum, sentChecksum, receivedChecksum, matches, dataChanged };
  }
  return { digest, signature, firewall, firewallRules, antivirus, antispyware, encryption, parityBit, parity, parseBytes, sumChecksum, checksum };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = section6Models;
