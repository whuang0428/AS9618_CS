export const wordingReviewHeaders = Object.freeze([
  "surface",
  "id",
  "source",
  "status",
  "independent_review_status",
  "evidence_location",
  "content_hash",
  "reviewer_id",
  "review_round",
  "official_basis",
  "review_note",
]);

export function parseCsv(text) {
  const records = [];
  let record = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") { record.push(field); field = ""; }
    else if (character === "\n") {
      record.push(field.replace(/\r$/, ""));
      records.push(record);
      record = [];
      field = "";
    } else field += character;
  }
  if (quoted) throw new Error("unterminated quoted CSV field");
  if (field || record.length) {
    record.push(field.replace(/\r$/, ""));
    records.push(record);
  }
  const [headers = [], ...body] = records.filter((values) => values.some(Boolean));
  return {
    headers,
    rows: body.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]))),
  };
}

export function evaluateWordingReviewRegister(text, expectedHashes, { requireAllApproved = true } = {}) {
  const problems = [];
  const { headers, rows } = parseCsv(text);
  const expectedHeader = wordingReviewHeaders.join(",");
  if (headers.join(",") !== expectedHeader) problems.push("wording review register schema is not the remediation-v2 schema");

  const seen = new Set();
  let approved = 0;
  let pending = 0;
  let rejected = 0;
  for (const row of rows) {
    const key = `${row.surface}:${row.id}`;
    if (seen.has(key)) problems.push(`${key}: duplicate review record`);
    seen.add(key);
    if (!expectedHashes.has(key)) problems.push(`${key}: unexpected review record`);
    else if (row.content_hash !== expectedHashes.get(key)) problems.push(`${key}: content hash is stale`);

    if (row.status === "Approved") {
      approved += 1;
      if (row.independent_review_status !== "IndependentlyReviewed") problems.push(`${key}: Approved without independent review status`);
      if (!row.evidence_location.trim()) problems.push(`${key}: Approved without an evidence location`);
      if (!row.reviewer_id.trim()) problems.push(`${key}: Approved without a reviewer ID`);
      if (!/^R[1-9]\d*$/.test(row.review_round)) problems.push(`${key}: Approved without a valid review round`);
      if (!/^(?:syllabus|syllabus-update|pseudocode-guide):p(?:age)?\d+(?:[-,]\d+)?(?:;.+)?$/i.test(row.official_basis)) {
        problems.push(`${key}: Approved without a page-specific official basis`);
      }
    } else if (row.status === "Pending") pending += 1;
    else if (row.status === "Rejected") rejected += 1;
    else problems.push(`${key}: invalid status ${row.status || "<empty>"}`);
  }
  for (const key of expectedHashes.keys()) if (!seen.has(key)) problems.push(`${key}: missing review record`);
  if (requireAllApproved && (pending > 0 || rejected > 0 || approved !== expectedHashes.size)) {
    problems.push(`review completion blocked: Approved=${approved}, Pending=${pending}, Rejected=${rejected}, Expected=${expectedHashes.size}`);
  }
  return { status: problems.length ? "Blocked" : "Ready", problems, counts: { approved, pending, rejected, total: rows.length } };
}
