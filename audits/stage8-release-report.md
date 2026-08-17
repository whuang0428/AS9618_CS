# Stage 8 Final Release and Handover Report

Release date: 22 July 2026

## Scope

Stage 8 converts the approved seven-stage source tree into the final versioned offline deliverable. Completion requires a deterministic ZIP archive, one archive checksum, one package-internal per-file manifest, exact source parity, complete course inventory, local runtime assets, successful extraction and a working extracted website.

## Release Identity

- Product: AS9618 Computer Science 2027-2029 AS Course Pack
- Version: 1.0.0
- Archive: `AS9618-CS-2027-2029-v1.0.0.zip`
- Status: final
- Primary entry point: `web/index.html`

## Acceptance Matrix

| Requirement | Evidence | Status |
|---|---|---|
| Versioned metadata | `release/stage8-release.json` | Pass |
| Deterministic build | fixed ZIP timestamps, sorted allowlisted sources and standard-library builder | Pass |
| Archive checksum | adjacent `.zip.sha256` sidecar | Pass |
| Per-file integrity | package-root `MANIFEST.sha256` | Pass |
| Source parity | every manifest hash checked against the current repository file | Pass |
| Course inventory | 150 lesson Markdown files and 150 web HTML/JS/CSS triples | Pass |
| Assessment/resources | three assessment Markdown banks and four resource guides | Pass |
| Runtime independence | no external script, stylesheet, image, media or iframe dependency | Pass |
| Browser request hygiene | every HTML page declares a local/data favicon; no fallback `/favicon.ico` request | Pass |
| Local references | every packaged HTML `href`/`src` target resolves or is an allowed external/reference link | Pass |
| Archive safety | one root, no duplicates, traversal, encryption, symlinks, `.DS_Store` or cache directories | Pass |
| Extracted runtime | fresh extraction served locally; hubs plus Lessons 001, 075 and 150 loaded with correct counts, structure and zero local runtime errors | Pass |
| HTTP request log | homepage uses one static course catalogue and makes no lesson-page hydration requests; final extracted-package run contained no 4xx/5xx responses | Pass |
| Unified acceptance | `node scripts/verify-all.mjs` runs Stages 2-9, builds the archive and verifies Stage 8 packaging | Pass |

## Handover

The generated archive and checksum are placed in `dist/`, which is intentionally ignored because both files are reproducible build outputs. `release/RELEASE-NOTES.md` provides extraction, serving and checksum instructions. The source release inventory is stored at `audits/stage8-release-inventory.csv`; the archive also contains and verifies that inventory.

The final runtime check must be performed from an extracted copy rather than the repository `web/` directory. It covers the course index, assessment bank, resource centre and representative early/middle/final lessons, including local asset loading and page-level runtime errors.

The first extracted runtime pass exposed one server-side 404 that was not reported by page JavaScript: lesson pages lacked an explicit favicon and caused a fallback `/favicon.ico` request. All 150 lesson pages now declare a data favicon, and the package verifier rejects any future HTML page without an icon declaration.
