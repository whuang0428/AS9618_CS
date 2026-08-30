import fs from "node:fs";

const source = JSON.parse(fs.readFileSync(new URL("./lesson-identity-contract.json", import.meta.url), "utf8"));

if (source.schemaVersion !== 2 || source.lessons.length !== 151) {
  throw new Error("Lesson identity contract must contain exactly 151 schema-v2 lessons");
}

export const lessonIdentities = Object.freeze(source.lessons.map((lesson, index) => {
  const expectedLesson = index + 1;
  const expectedId = String(expectedLesson).padStart(3, "0");
  if (lesson.lesson !== expectedLesson || lesson.id !== expectedId || !lesson.title || !lesson.markdownFile.startsWith(`${expectedId}-`)) {
    throw new Error(`Invalid canonical lesson identity at position ${expectedLesson}`);
  }
  return Object.freeze({ ...lesson });
}));

export const lessonIdentityByNumber = Object.freeze(Object.fromEntries(
  lessonIdentities.map((lesson) => [lesson.lesson, lesson]),
));
