# AS9618 remediation v2 — Stage 5 technical content and critical images

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 6.

## Change summary

- Aligned L050 performance-factor teaching, assessment, transcript and deterministic image with the complete official list: processor type and number of cores, bus width, clock speed and cache memory.
- Enforced the pseudocode-guide CHAR/STRING boundary in L108/L134 and supplied complete typed signatures/index rules for guide-external functions in L122.
- Corrected the systemic command-normalisation defect that changed field identifier Name into Identify after a comma, then re-reviewed all 17 changed questions without changing IDs or marks.
- Rebuilt and reviewed eight critical images in forward and reverse order; all load as 1536x1024 assets in the browser.
- Repaired the visual-evidence gate that had trusted stale CSV delivery metadata: 79 required evidence rows now resolve to 75 unique panels that are CORE/TEACH in both the register and live DOM, and 42 panels were relocated so none appears before official first use or on an Optional-only page.

## Issue closure table

| Issue | Disposition | Evidence |
|---|---|---|
| RV2-AUDIT-003 | Resolved | Required visual evidence now checks the contract mapping, target register and actual DOM section role/activity together; Optional evidence cannot satisfy CORE coverage; 75 unique required visual panels are anchored after reviewed CORE teaching, with 42 source panels relocated so none precedes first use or depends on an Optional-only page |
| RV2-CONT-001 | Resolved | L050 topic heading, teaching, assessment, maintained transcript and deterministic concept image use processor type and number of cores, bus width, clock speed and cache memory; The word-length discussion remains visibly labelled Optional enrichment and is excluded from the official performance-factor list |
| RV2-PSEUDO-001 | Resolved | L108/L134 keep MID results as STRING and reserve LCASE/UCASE for declared CHAR values with single-quoted literals; LEFT is identified as guide-external and is not called without a complete question-supplied signature |
| RV2-PSEUDO-002 | Resolved | L122 defines SPLIT, STRING_TO_INTEGER, IS_NUMERIC and FIELD_COUNT with complete typed signatures before use; The supplied SPLIT array starts at index 1; parameter order and return types are explicit in teaching, questions, transcript and pixels |

## Passed evidence

- Technical gate: Ready; zero L050/L108/L122/L134 failures.
- Targeted question review: 17/17 current-hash Reviewed; stable IDs 17/17; stable marks 17/17; 68/68 correct/common/boundary/out-of-scope trials passed.
- Critical visuals: 8/8 forward reviewed and 8/8 reverse reviewed; disagreement=0; dimensions 1536x1024.
- Browser: four desktop pages and four 390px records have zero horizontal overflow; eight critical images load; answer details expand; L134 rejects STRING input to UCASE and accepts one CHAR; console warnings/errors=0.
- Coverage visual integrity: the full semantic gate is Ready with 121/121 requirements and zero failures; required visuals are checked against contract, register, actual DOM and reviewed first-use order.
- The full 784-image structural verifier passes, but its old Approved rows are not treated as the Stage 6 independent census.

## Active failed samples

- Removing bus width, substituting word length, or deleting processor type from the official list fails.
- Passing MID(...) or a double-quoted STRING to LCASE/UCASE fails.
- Removing supplied function signatures/index rules or introducing undeclared LEFT fails.
- Rewriting a comma-delimited Name field as Identify fails while a leading Name command still calibrates to Identify.
- Relabelling a required visual as Optional in either the register or live DOM, or moving it before reviewed first use, fails.

## Command evidence

- node scripts/remediation-v2-stage5-gate.mjs
- node scripts/test-remediation-v2-stage5-mutations.mjs
- node scripts/verify-remediation-v2-stage5.mjs
- node scripts/verify-syllabus-coverage.mjs
- node scripts/verify-all.mjs --through-current-stage

## Failed / open

- Registered P0/P1 defects: 0 open.
- Current release decision remains BLOCKED because Stage 6 and Stage 7 have not been accepted.

## Optional enrichment

- L050 word length remains available only inside a visibly labelled Optional enrichment section and is excluded from the official performance-factor coverage and assessment contract.
- Existing Stage 2/3 Optional enrichment classifications remain excluded from CORE first-use and formal coverage.

## Unverified

- The unscoped `node scripts/verify-all.mjs` correctly stops at the stale Stage 6 page-review hashes; refreshing those approvals belongs to Stage 6 and is not inherited here.
- Stage 6 first-pass/reverse-pass review of all 784 Stage 10 images.
- Stage 6 971 visual-object checks and 154-page desktop plus 390px browser matrix (308 records).
- Stage 7 independent high-risk review and double-generation release gate.

## Remaining risks

- The eight Stage 5 images are closed, but this does not transfer approval to the other 776 images.
- The targeted browser run does not replace the Stage 6 all-page matrix.
- No commit, push or publication has been performed or authorised.

## Stop condition

Do not start Stage 6 until the user approves progression from Stage 5.
