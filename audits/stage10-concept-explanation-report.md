# Stage 10 Concept Accuracy and Explanation Audit

## Current gate

- Explanation targets: 782 across 150 lessons.
- Implemented pilot explanations: 45 across 10 lessons.
- Academic ImageGen assets in the revised pilot: 5.
- Visual records: 198; semantic statuses remain explicit and are not inferred from successful rendering.
- Rollout state: pilot only. Expansion beyond the ten named lessons requires human approval.

## Review rules

- Definitions alone do not satisfy an explanation target. Each panel uses three concise cause-and-effect steps plus an analogy and a boundary condition.
- Review lessons use causal synthesis rather than one panel per retrieval prompt.
- SVG, image, CSS and interactive visuals require factual review. Automated checks can verify structure and accessibility, not conceptual truth.
- Precise connections, sequences and symbols use deterministic SVG or HTML. ImageGen is restricted to academically styled analogies without labels, topology or exact sequences.
