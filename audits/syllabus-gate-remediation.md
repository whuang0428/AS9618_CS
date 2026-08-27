# Syllabus gate remediation — Batch 0

**Status:** Gate operational; course release remains blocked.

## Outcome

- Contract schema: v2, 121/121 unique requirement rows.
- Evidence mappings independently reviewed: 17/121; pending: 104/121.
- Strict coverage result: 17 Complete, 104 Partial.
- Sequence model: 121 nodes, 82 prerequisite edges, 0 blocking problems.
- Infrastructure repairs implemented and regression-tested: SCI-COV-001, SCI-COV-002, SCI-COV-003, SCI-COV-004 and SCI-SEQ-000. The frozen first-round register remains unchanged as historical evidence.

## Current sequence blockers


## Mutation evidence

- Every one of the 121 requirements rejects a synthetic concept removed from both Markdown and visible CORE HTML.
- CORE-to-OPTIONAL, direct-question content, prerequisite order and all five prohibited-semantics mutations are detected.
- Run `node scripts/test-syllabus-gate-mutations.mjs` to reproduce.

## Interpretation

A passing schema and mutation suite proves that the gate is active; it does not approve course content. Release remains blocked while any requirement is Partial, any evidence mapping is Pending, or any sequence problem remains.
