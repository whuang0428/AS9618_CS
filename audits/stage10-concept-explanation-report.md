# Stage 10 Concept Accuracy and Explanation Audit

## Current gate

- Explanation targets: 779 across 150 lessons.
- Implemented visual explanations: 779 across 150 lessons.
- Academic infographic assets: 779 (778 ImageGen, 1 deterministic correction).
- Semantic reviews complete: 779/779; unresolved blocking assets: 0.
- Visual records: 965; semantic statuses remain explicit and are not inferred from successful rendering.
- Rollout state: complete across all 150 lessons after approval of the ten-lesson visual-style pilot.

## Review rules

- Definitions alone do not satisfy an explanation target. Each infographic must visualise the maintained lesson facts as a structured mechanism, comparison, process, trade-off or synthesis.
- Review lessons use causal synthesis rather than one infographic per retrieval prompt.
- Every infographic has an adjacent screen-reader transcript generated from the maintained factual source.
- Image and interactive visuals require factual review. Automated checks verify target coverage, structure, file state and accessibility, not conceptual truth.
- Human semantic review status comes from `audits/stage10-semantic-review-register.csv`; Critical and Major defects block release.
