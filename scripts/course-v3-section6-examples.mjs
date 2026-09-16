// Shared, inspectable teaching data. These are specified classroom checking rules,
// not implementations of a cryptographic signature or a production cipher.
export const checkDigitWeights = [3, 1, 3, 1];
export function checkDigitExample(data) {
  if (!/^\d{4}$/.test(data)) throw new Error('The teaching check-digit rule requires four digits');
  const products = [...data].map((digit, i) => Number(digit) * checkDigitWeights[i]);
  const sum = products.reduce((total, value) => total + value, 0);
  const digit = (10 - sum % 10) % 10;
  return { data, products, sum, digit, code: data + digit };
}
export const checkDigitCases = ['4726', '2462', '4276'].map(checkDigitExample);

export const parityExample = {
  convention: 'even', dataRows: ['1011001', '0110000', '1100011'],
  error: { row: 1, column: 4 }, // Zero-based internal coordinates; labels are one-based.
};
const parityBit = bits => [...bits].reduce((count, bit) => count + Number(bit), 0) % 2;
parityExample.sentRows = parityExample.dataRows.map(row => row + parityBit(row));
parityExample.parityRow = Array.from({length: 8}, (_, c) => parityBit(parityExample.sentRows.map(row => row[c]).join(''))).join('');
parityExample.sentBlock = [...parityExample.sentRows, parityExample.parityRow];
parityExample.receivedBlock = parityExample.sentBlock.map((row, r) => r === parityExample.error.row
  ? [...row].map((bit, c) => c === parityExample.error.column ? String(1 - Number(bit)) : bit).join('') : row);
export const blockCounts = rows => ({
  rows: rows.map(row => [...row].reduce((n, bit) => n + Number(bit), 0)),
  columns: Array.from({length: 8}, (_, c) => rows.reduce((n, row) => n + Number(row[c]), 0)),
});
export const parityTableRows = parityExample.sentBlock.map((row, r) => [r === 3 ? 'Column parity row' : `Data row ${r + 1}`, row.slice(0, 7), row[7], String(row.split('1').length - 1)]);

export const checksumExample = {
  modulus: 256, original: [84, 121, 77], changed: [84, 120, 77], cancelling: [85, 120, 77],
};
export const sumChecksum = bytes => bytes.reduce((sum, byte) => sum + byte, 0) % checksumExample.modulus;

export const firewallRules = [
  ['1', 'Traffic belongs to an already permitted connection', 'Allow'],
  ['2', 'New inbound TCP connection to the public web server, destination port 443', 'Allow'],
  ['3', 'New outbound TCP connection to destination port 443', 'Allow'],
  ['4', 'Anything not matched above', 'Deny'],
];
export const firewallRequests = [
  ['New inbound TCP to the public web server, port 443', '2', 'Allow'],
  ['New inbound TCP to a staff server, port 22', '4', 'Deny'],
  ['New outbound TCP to an external web server, port 443', '3', 'Allow'],
  ['Reply carrying a malicious download on that permitted outbound connection', '1', 'Allow by this traffic policy; content still needs checking'],
];

export const permissionRows = [
  ['Teacher', 'Allow', 'Allow', 'Deny'],
  ['Reviewer', 'Allow', 'Deny', 'Deny'],
  ['Visitor', 'Deny', 'Deny', 'Deny'],
];
export const permissionTrace = [
  ['Teacher reads mark', 'Read allowed', 'Returns 46', '46'],
  ['Teacher changes mark to 48 after checking the source', 'Modify allowed', 'Update saved', '48'],
  ['Reviewer requests deletion', 'Delete denied', 'Request rejected', '48'],
  ['Visitor requests the controlled record', 'Read denied', 'No record returned', '48'],
];

export const validationRules = [
  ['CustomerID', 'Required; two uppercase letters followed by three digits; must be in {AB012, CD345}', 'Presence, format, existence'],
  ['BookingCode', 'Exactly six characters; two uppercase letters followed by four digits', 'Length and format'],
  ['Age', 'An integer already supplied; 5 to 18 inclusive', 'Range'],
  ['UploadSize', 'A non-negative size in MiB already supplied; at most 10 MiB', 'Upper limit'],
];
export const validationRows = [
  ['AB012 / XY0012 / 12 / 8 MiB', 'All checks pass', 'Eligible for source verification; acceptance does not prove truth'],
  ['Blank / XY0012 / 12 / 8 MiB', 'CustomerID presence fails', 'Reject or request the missing ID; do not continue its lookup'],
  ['EF678 / XY0012 / 12 / 8 MiB', 'ID format passes; existence fails', 'Reject: no matching customer'],
  ['AB012 / 120012 / 12 / 8 MiB', 'BookingCode length passes; format fails', 'Reject the code'],
  ['AB012 / XY0012 / 19 / 8 MiB', 'Age range fails', 'Reject the age'],
  ['AB012 / XY0012 / 12 / 11 MiB', 'Upload limit fails', 'Reject this upload size'],
];
