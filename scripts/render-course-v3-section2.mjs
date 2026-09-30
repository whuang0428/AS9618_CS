// Compatibility command: rebuild only Section 2 and preserve other work.
if (!process.argv.includes("--section2")) process.argv.push("--section2");
await import("./render-course-v3.mjs");
