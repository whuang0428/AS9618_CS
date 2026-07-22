# AS9618 Course Pack 1.0.0

Release date: 22 July 2026

This is the final Stage 8 offline-delivery release of the Cambridge International AS Level Computer Science 9618 course pack for the 2027-2029 syllabus years.

## Included

- 150 teacher-facing Markdown lesson plans;
- 150 interactive lesson webpages plus course, assessment and resource hubs;
- 30 short quizzes, 7 monthly checkpoints and 14 stage reviews;
- resource guides, syllabus audits and question/page approval evidence;
- verification and deterministic release-building scripts;
- `MANIFEST.sha256`, covering every other file inside the release archive.

## Start the Web Course

From the extracted release root:

```bash
python3 -m http.server 8769 --directory web
```

Open <http://127.0.0.1:8769/>. No application server, package installation or internet-hosted script/style asset is required.

## Verify the Download

Keep the `.zip` and `.zip.sha256` files together, then run from their directory:

```bash
shasum -a 256 -c AS9618-CS-2027-2029-v1.0.0.zip.sha256
```

The archive contains its own per-file `MANIFEST.sha256`. From the source repository, `node scripts/verify-all.mjs` rebuilds and validates the complete release after running every earlier stage check.

## Delivery Notes

- Serve the `web/` directory through a static HTTP server; opening pages directly with `file://` can prevent the course index from hydrating lesson titles.
- Preserve directory names and relative paths when copying the web course.
- External Cambridge links are references only. Course scripts, styles and lesson content remain local.
- Java examples are supporting practice; Cambridge-style pseudocode remains the Paper 2 answer standard.
