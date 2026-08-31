import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { courseV2Blueprint, sectionTitles } from "./v2-course-blueprint.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const legacyRef = "559eb16";
const currentIdentity = JSON.parse(fs.readFileSync(path.join(root, "scripts", "lesson-identity-contract.json"), "utf8"));
const usingCurrentLegacyIdentity = currentIdentity.lessons.length === 151;
const identity = usingCurrentLegacyIdentity
  ? currentIdentity
  : JSON.parse(execFileSync("git", ["show", `${legacyRef}:scripts/lesson-identity-contract.json`], { cwd: root, encoding: "utf8" }));
const syllabus = JSON.parse(fs.readFileSync(path.join(root, "scripts", "syllabus-coverage-contract.json"), "utf8"));
const frequency = JSON.parse(fs.readFileSync(path.join(root, "scripts", "past-paper-frequency-contract.json"), "utf8"));
const requirementById = new Map(syllabus.requirements.map((requirement) => [requirement.id, requirement]));
const legacyCourseUnits = Object.freeze([
  { range: [1, 16], section: "Section 1", id: "section-1" },
  { range: [17, 27], section: "Section 2", id: "section-2" },
  { range: [28, 41], section: "Section 3", id: "section-3" },
  { range: [42, 52], section: "Section 4", id: "section-4" },
  { range: [53, 62], section: "Section 5", id: "section-5" },
  { range: [63, 72], section: "Section 6", id: "section-6" },
  { range: [73, 78], section: "Section 7", id: "section-7" },
  { range: [79, 90], section: "Section 8", id: "section-8" },
  { range: [91, 98], section: "Review", id: "paper-1-review" },
  { range: [99, 113], section: "Section 9", id: "section-9" },
  { range: [114, 126], section: "Section 10", id: "section-10" },
  { range: [127, 142], section: "Section 11", id: "section-11" },
  { range: [143, 147], section: "Section 12", id: "section-12" },
  { range: [148, 151], section: "Review", id: "paper-2-review" },
]);

const stopwords = new Set("a an and are as at be been by can data describe different each explain for from give how identify in including is it its may of on one or other show state system systems that the their these this to two understand understanding use used using when where which with write".split(" "));

function sanitizeStudentText(value) {
  return String(value ?? "")
    .replace(/The Version 2 Notes also name/gi, "The syllabus also names")
    .replace(/The Version 2 Notes name/gi, "The syllabus names")
    .replace(/The Version 2 (?:row|table) requires/gi, "The syllabus requires")
    .replace(/Version 2 explicitly includes/gi, "The syllabus explicitly includes")
    .replace(/Version 2 explicitly requires/gi, "The syllabus explicitly requires")
    .replace(/Version 2 requires/gi, "The syllabus requires")
    .replace(/the preceding Version 2 row/gi, "the syllabus list above")
    .replace(/the Version 2 (?:row|table)/gi, "the syllabus")
    .replace(/Use the complete Version 2 instruction set/gi, "Use the complete specified instruction set")
    .replace(/\bVersion 2\b/gi, "the syllabus")
    .replace(/\s+/g, " ")
    .trim();
}

function normalise(value) {
  return String(value ?? "")
    .toLowerCase()
    .replaceAll("’", "'")
    .replace(/`[^`]+`/g, " code ")
    .replace(/\d+(?:\.\d+)?/g, " number ")
    .replace(/[^a-z0-9+#' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyForFingerprint(value) {
  return normalise(value).replaceAll(" ", "-");
}

function tokens(value) {
  return new Set(normalise(value).split(" ").filter((token) => token.length > 2 && !stopwords.has(token)));
}

function similarity(left, right) {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  return intersection / new Set([...a, ...b]).size;
}

function relevance(text, focus) {
  const a = tokens(text);
  const b = tokens(focus);
  let score = 0;
  for (const token of a) if (b.has(token)) score += token.length > 7 ? 2 : 1;
  return score;
}

function stripMarkdown(value) {
  return sanitizeStudentText(String(value ?? "")
    .replace(/`\*`/g, "__SQL_WILDCARD__")
    .replace(/\bSELECT\s+\*/gi, (match) => match.replace("*", "__SQL_WILDCARD__"))
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/SQLWILDCARD/g, "*")
    .replace(/\s+/g, " ")
    .trim());
}

function trimText(value, maximum = 900) {
  const clean = stripMarkdown(value);
  if (clean.length <= maximum) return clean;
  const shortened = clean.slice(0, maximum);
  const boundary = Math.max(shortened.lastIndexOf(". "), shortened.lastIndexOf("; "));
  return `${shortened.slice(0, boundary > maximum * 0.55 ? boundary + 1 : maximum).trim()}…`;
}

function uniqueSentences(values, threshold = 0.72) {
  const result = [];
  for (const raw of values) {
    const value = stripMarkdown(raw).replace(/^[-*]\s*/, "").trim();
    if (value.length < 12) continue;
    if (result.some((existing) => normalise(existing) === normalise(value) || similarity(existing, value) >= threshold || normalise(existing).includes(normalise(value)) || normalise(value).includes(normalise(existing)))) continue;
    result.push(value);
  }
  return result;
}

function unitForOldLesson(number) {
  return legacyCourseUnits.find(({ range }) => number >= range[0] && number <= range[1]);
}

function extractBetween(source, startPattern, endPattern) {
  const start = source.search(startPattern);
  if (start < 0) return "";
  const afterStart = source.slice(start).replace(startPattern, "");
  const end = afterStart.search(endPattern);
  return end < 0 ? afterStart : afterStart.slice(0, end);
}

function extractQuestions(source, oldLesson, section) {
  const questions = [];
  const targeted = extractBetween(source, /### Targeted practice and answers\s*/i, /### Exam-style question and MS|<!-- stage2-practice:end -->/i);
  const lines = targeted.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^\s*\d+\.\s+(.+?)\s*$/);
    if (!match) continue;
    const answerLine = lines.slice(index + 1, index + 4).find((line) => /\*\*Answer:\*\*/i.test(line));
    if (!answerLine) continue;
    const answer = stripMarkdown(answerLine.replace(/^.*?\*\*Answer:\*\*\s*/i, ""));
    questions.push({
      oldLesson,
      section,
      sourceKind: "original-targeted",
      prompt: stripMarkdown(match[1]),
      answer,
      marks: 2,
      guidance: "Award one mark for each distinct, technically accurate point or method step.",
    });
  }

  const examMatch = source.match(/\*\*Question \((\d+) marks?\):\*\*\s*([^\n]+(?:\n(?!\|)[^\n]+)*)/i);
  if (examMatch) {
    const practiceBlock = extractBetween(source, /### Exam-style question and MS\s*/i, /<!-- stage2-practice:end -->/i);
    const tableRows = [...practiceBlock.matchAll(/^\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|\s*(\d+)\s*\|$/gm)]
      .filter((match) => !/^-+$/.test(match[1].trim()) && match[1].trim().toLowerCase() !== "answer");
    questions.push({
      oldLesson,
      section,
      sourceKind: "original-exam-style",
      prompt: stripMarkdown(examMatch[2]),
      answer: tableRows.map((match) => stripMarkdown(match[1])).filter(Boolean).join("; ") || "Use the lesson method and show each credited step.",
      marks: Number(examMatch[1]),
      guidance: tableRows.map((match) => stripMarkdown(match[2])).find(Boolean) || "Credit distinct points that answer the command word in context.",
    });
  }
  return questions;
}

function extractLessonRecord(entry) {
  const sourcePath = path.join(root, "lessons", entry.markdownFile);
  const source = usingCurrentLegacyIdentity && fs.existsSync(sourcePath)
    ? fs.readFileSync(sourcePath, "utf8")
    : execFileSync("git", ["show", `${legacyRef}:lessons/${entry.markdownFile}`], { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  const unit = unitForOldLesson(entry.lesson);
  const direct = extractBetween(source, /### Direct explanation\s*/i, /### Worked example/i)
    .split("\n")
    .filter((line) => /^\s*-\s+/.test(line))
    .map((line) => stripMarkdown(line.replace(/^\s*-\s+/, "")));
  const workedBlock = extractBetween(source, /### Worked example\s*/i, /<!-- stage2-practice:start -->|### Targeted practice/i);
  const worked = stripMarkdown(workedBlock).split(/\b(?:Core syllabus practice|Targeted practice|Exam-style question(?: and mark scheme| and MS)?)\b/i)[0].trim();
  const misconception = source.match(/Misconception:\s*([^\n]+?)\s*Correction:\s*([^\n]+)/i);
  const visualBlocks = [...source.matchAll(/### ([^\n]+)\n\n([\s\S]*?)(?=\n### |<!-- stage10-explanations:end -->)/g)]
    .map((match) => {
      const image = match[2].match(/stage10-infographics\/([^`)\s]+)/)?.[1];
      const facts = match[2].split("\n").filter((line) => /^\d+\.\s+/.test(line.trim())).map((line) => stripMarkdown(line.replace(/^\d+\.\s+/, "")));
      return image ? { title: stripMarkdown(match[1]), image: `assets/diagrams/stage10-infographics/${image}`, facts } : null;
    })
    .filter(Boolean);
  return {
    ...entry,
    section: typeof unit?.section === "string" && /Section \d+/.test(unit.section) ? Number(unit.section.match(/\d+/)[0]) : null,
    unitId: unit?.id ?? null,
    direct,
    worked,
    misconception: misconception ? `${stripMarkdown(misconception[1])} Correction: ${stripMarkdown(misconception[2])}` : "",
    visuals: visualBlocks,
    questions: extractQuestions(source, entry.lesson, typeof unit?.section === "string" && /Section \d+/.test(unit.section) ? Number(unit.section.match(/\d+/)[0]) : null),
  };
}

const oldLessons = identity.lessons.map(extractLessonRecord);
const oldLessonByNumber = new Map(oldLessons.map((lesson) => [lesson.lesson, lesson]));

function blueprintFocus(lesson) {
  return [
    lesson.title,
    ...lesson.syllabusIds.flatMap((id) => {
      const requirement = requirementById.get(id);
      return [requirement?.requirement ?? "", requirement?.notes ?? "", ...(requirement?.requiredGroups ?? []).flat()];
    }),
  ].join(" ");
}

function mapOldLesson(oldLesson) {
  if (oldLesson.lesson >= 91 && oldLesson.lesson <= 98) return 45;
  if (oldLesson.lesson >= 148 && oldLesson.lesson <= 151) return 90;
  if (!oldLesson.section) return oldLesson.lesson <= 98 ? 45 : 90;
  const candidates = courseV2Blueprint.filter((lesson) => lesson.section === oldLesson.section);
  const scored = candidates.map((candidate) => {
    const focus = blueprintFocus(candidate);
    const directMapping = candidate.syllabusIds.some((id) => requirementById.get(id)?.teachingLessons?.includes(oldLesson.lesson));
    return {
      lesson: candidate.lesson,
      score: relevance(oldLesson.title, focus) + relevance(oldLesson.direct.join(" "), focus) * 0.25 + (directMapping ? 12 : 0),
    };
  }).sort((a, b) => b.score - a.score || a.lesson - b.lesson);
  return scored[0].lesson;
}

const migration = oldLessons.map((oldLesson) => ({
  oldLesson: oldLesson.lesson,
  oldId: oldLesson.id,
  oldTitle: oldLesson.title,
  primaryNewLesson: mapOldLesson(oldLesson),
  reason: oldLesson.lesson >= 91 && oldLesson.lesson <= 98
    ? "Paper 1 review consolidated into L045"
    : oldLesson.lesson >= 148
      ? "Paper 2 review consolidated into L090"
      : "Mapped by official section, syllabus teaching evidence and topic similarity",
}));

const mappedSources = new Map(courseV2Blueprint.map((lesson) => [lesson.lesson, []]));
for (const row of migration) mappedSources.get(row.primaryNewLesson).push(row.oldLesson);

const extensionBySection = Object.freeze({
  1: "Beyond syllabus / 延伸知识（不要求背诵）: real file formats also store headers and metadata, so two files with the same visible content may still have different sizes.",
  2: "Beyond syllabus / 延伸知识（不要求背诵）: real networks organise communication in layers so that hardware, addressing and application protocols can change independently.",
  3: "Beyond syllabus / 延伸知识（不要求背诵）: professional device selection also considers accessibility, reliability, repairability and energy use.",
  4: "Beyond syllabus / 延伸知识（不要求背诵）: modern processors add pipelining and several cache levels, but exam answers should begin with the syllabus processor model.",
  5: "Beyond syllabus / 延伸知识（不要求背诵）: production build systems automate translation, linking, testing and packaging, while the syllabus examines the purpose of each stage separately.",
  6: "Beyond syllabus / 延伸知识（不要求背诵）: real security uses defence in depth, combining controls so that one failed control does not expose the whole system.",
  7: "Beyond syllabus / 延伸知识（不要求背诵）: professional decisions are often reviewed against law, organisational policy, public interest and a published code of conduct.",
  8: "Beyond syllabus / 延伸知识（不要求背诵）: production databases also manage transactions and concurrent users; these ideas extend the syllabus model of integrity and access control.",
  9: "Beyond syllabus / 延伸知识（不要求背诵）: the same algorithm can be expressed in many programming languages; its logic should remain independent of syntax.",
  10: "Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.",
  11: "Beyond syllabus / 延伸知识（不要求背诵）: consistent style, modularity and automated tests reduce maintenance errors in larger programs.",
  12: "Beyond syllabus / 延伸知识（不要求背诵）: modern teams often use continuous integration to repeat building and testing whenever a program changes.",
});

function commandWord(prompt) {
  const words = ["compare", "complete", "construct", "convert", "calculate", "define", "describe", "design", "draw", "evaluate", "explain", "give", "identify", "justify", "name", "outline", "show", "state", "suggest", "trace", "write"];
  const text = normalise(prompt);
  const matches = words
    .map((word) => ({ word, index: text.search(new RegExp(`\\b${word}\\b`)) }))
    .filter(({ index }) => index >= 0)
    .sort((left, right) => left.index - right.index);
  return matches[0]?.word ?? (/\bhow\b|\bwhy\b/.test(text) ? "explain" : "apply");
}

function questionType(prompt, command) {
  const text = normalise(prompt);
  if (/calculate|convert|show your working|file size/.test(text)) return "calculate";
  if (/trace|dry run/.test(text)) return "trace";
  if (/write pseudocode|write an algorithm|program fragment/.test(text)) return "write";
  if (/debug|correct the error|logic error|syntax error/.test(text)) return "debug";
  if (["draw", "construct"].includes(command)) return "diagram";
  if (["compare", "evaluate", "justify"].includes(command)) return "evaluate";
  if (["explain", "describe", "outline", "suggest"].includes(command)) return "explain";
  return "recall";
}

function syntheticQuestion(lesson, coreFacts, index) {
  if (index === 0) return {
    prompt: `State two precise facts about ${lesson.title.toLowerCase()}.`,
    answer: coreFacts.slice(0, 2).join(" "),
    marks: 2,
    guidance: "Award one mark for each distinct fact; do not credit a repeated point.",
    sourceKind: "original-v2",
  };
  if (index === 1) return {
    prompt: `Explain how ${lesson.title.toLowerCase()} would be applied in a suitable computing context.`,
    answer: coreFacts.slice(1, 4).join(" "),
    marks: 3,
    guidance: "Each mark needs a relevant point linked to the stated context.",
    sourceKind: "original-v2",
  };
  return {
    prompt: `A student gives an incomplete answer about ${lesson.title.toLowerCase()}. Correct it by giving the key distinction and one justified example.`,
    answer: coreFacts.slice(0, 4).join(" "),
    marks: 4,
    guidance: "Credit the correction, the distinction, the example and its justification.",
    sourceKind: "original-v2",
  };
}

const allOldQuestionsBySection = new Map();
for (const lesson of oldLessons) {
  if (!lesson.section) continue;
  if (!allOldQuestionsBySection.has(lesson.section)) allOldQuestionsBySection.set(lesson.section, []);
  allOldQuestionsBySection.get(lesson.section).push(...lesson.questions);
}

const globalQuestionFingerprints = new Set();
const questionBank = [];
const lessonQuestionExclusions = Object.freeze({
  "017": ["boolean expression", "design circuit"],
  "018": ["name logic gate", "identify logic gate symbol"],
  "058": ["two dimensional", "2d array"],
  "059": ["one dimensional", "1d array"],
  "060": ["bubble sort", "binary search"],
  "061": ["linear search", "binary search"],
  "064": ["queue", "linked list"],
  "065": ["stack", "linked list"],
  "066": ["stack", "queue"],
  "073": ["count controlled", "pre condition", "post condition", "while", "repeat"],
  "074": ["if statement", "case statement", "pre condition", "post condition", "while", "repeat"],
  "075": ["if statement", "case statement", "count controlled", "for loop"],
});

function selectQuestions(lesson, coreFacts, commonError, sourceOldLessons) {
  const targetCount = lesson.focus === "integrated-review" ? 4 : 3;
  const relevantSections = lesson.focus === "integrated-review" ? lesson.reviewSections : [lesson.section];
  const focus = blueprintFocus(lesson);
  const sourceSet = new Set(sourceOldLessons);
  const excludedTerms = lessonQuestionExclusions[lesson.id] ?? [];
  const scoredCandidates = relevantSections.flatMap((section) => allOldQuestionsBySection.get(section) ?? [])
    .filter((question) => !excludedTerms.some((term) => normalise(question.prompt).includes(normalise(term))))
    .map((question) => ({
      ...question,
      titleScore: relevance(`${question.prompt} ${question.answer}`, lesson.title),
      focusScore: relevance(`${question.prompt} ${question.answer}`, focus),
      score: relevance(`${question.prompt} ${question.answer}`, lesson.title) * 10 + relevance(`${question.prompt} ${question.answer}`, focus) + (sourceSet.has(question.oldLesson) ? 20 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.marks - a.marks || a.oldLesson - b.oldLesson);
  const sourceCandidates = scoredCandidates.filter((question) => sourceSet.has(question.oldLesson) && (question.titleScore >= 1 || question.focusScore >= 2));
  const candidates = lesson.focus === "integrated-review"
    ? scoredCandidates
    : sourceCandidates.length
      ? sourceCandidates
      : scoredCandidates.filter((question) => question.score >= 3);
  const selected = [];
  const reviewSectionOrder = lesson.focus === "integrated-review"
    ? [...lesson.reviewSections].sort((left, right) => {
      const marksFor = (section) => frequency.sectionStatistics[String(section)]?.marks ?? 0;
      return marksFor(right) - marksFor(left) || left - right;
    })
    : [];
  const orderedCandidates = lesson.focus === "integrated-review"
    ? reviewSectionOrder.flatMap((section) => candidates.filter((candidate) => candidate.section === section).slice(0, 1))
    : candidates;
  for (const candidate of orderedCandidates) {
    const fingerprint = normalise(candidate.prompt);
    if (globalQuestionFingerprints.has(fingerprint)) continue;
    if (selected.some((existing) => similarity(existing.prompt, candidate.prompt) >= 0.58)) continue;
    const command = commandWord(candidate.prompt);
    const type = questionType(candidate.prompt, command);
    if (selected.some((existing) => existing.commandWord === command && existing.questionType === type && similarity(existing.prompt, candidate.prompt) >= 0.35)) continue;
    const existingTypes = new Set(selected.map((question) => question.questionType));
    if (selected.length >= 1 && existingTypes.size === 1 && existingTypes.has(type) && orderedCandidates.some((other) => questionType(other.prompt, commandWord(other.prompt)) !== type && !globalQuestionFingerprints.has(normalise(other.prompt)))) continue;
    selected.push({ ...candidate, commandWord: command, questionType: type });
    globalQuestionFingerprints.add(fingerprint);
    if (selected.length === targetCount) break;
  }

  if (lesson.focus === "integrated-review") {
    const prompts = [
      (section) => `State two linked high-frequency facts from Section ${section}: ${sectionTitles[section]}.`,
      (section) => `Explain one common error from Section ${section}: ${sectionTitles[section]}, and give the corrected reasoning.`,
      (section) => `Compare two closely related ideas from Section ${section}: ${sectionTitles[section]}.`,
      (section) => `Apply one method from Section ${section}: ${sectionTitles[section]} to a fresh exam context.`,
    ];
    for (const section of reviewSectionOrder) {
      if (selected.length >= targetCount) break;
      if (selected.some((question) => question.section === section)) continue;
      const prompt = prompts[selected.length % prompts.length](section);
      const command = commandWord(prompt);
      const sectionFact = coreFacts[lesson.reviewSections.indexOf(section)] ?? coreFacts[selected.length % coreFacts.length];
      selected.push({
        prompt,
        answer: sectionFact,
        marks: selected.length === 0 ? 2 : selected.length === 1 ? 3 : 4,
        guidance: "Credit distinct syllabus-accurate points that follow the command word.",
        sourceKind: "original-v2-review",
        oldLesson: null,
        section,
        commandWord: command,
        questionType: questionType(prompt, command),
      });
      globalQuestionFingerprints.add(normalise(prompt));
    }
  }

  let syntheticIndex = 0;
  while (selected.length < targetCount) {
    const candidate = syntheticQuestion(lesson, coreFacts, syntheticIndex % 3);
    if (syntheticIndex >= 3) {
      const lenses = ["accuracy", "transfer", "diagnosis", "justification", "method checking"];
      candidate.prompt += ` Focus this response on ${lenses[(syntheticIndex - 3) % lenses.length]}.`;
    }
    syntheticIndex += 1;
    if (syntheticIndex > 20) throw new Error(`Unable to build ${targetCount} distinct questions for L${lesson.id}`);
    const fingerprint = normalise(candidate.prompt);
    if (globalQuestionFingerprints.has(fingerprint) || selected.some((existing) => similarity(existing.prompt, candidate.prompt) >= 0.58)) continue;
    const command = commandWord(candidate.prompt);
    selected.push({ ...candidate, commandWord: command, questionType: questionType(candidate.prompt, command), oldLesson: null, section: lesson.section });
    globalQuestionFingerprints.add(fingerprint);
  }

  if (new Set(selected.map((question) => question.questionType)).size < 2) {
    const replacement = syntheticQuestion(lesson, coreFacts, 1);
    const command = commandWord(replacement.prompt);
    selected[selected.length - 1] = { ...replacement, commandWord: command, questionType: "explain", oldLesson: null, section: lesson.section };
  }

  return selected.map((question, index) => {
    const id = `Q-L${lesson.id}-${String(index + 1).padStart(2, "0")}`;
    const semanticFingerprint = {
      concept: `${lesson.syllabusIds.length ? lesson.syllabusIds.join("+") : `Paper${lesson.paper}-review`}|${slugifyForFingerprint(lesson.title)}`,
      action: question.commandWord,
      scenario: [...tokens(question.prompt)].filter((token) => !tokens(lesson.title).has(token)).slice(0, 4).join("-") || "course-context",
      representation: /pseudocode|algorithm/.test(normalise(question.prompt)) ? "pseudocode" : /diagram|table|circuit/.test(normalise(question.prompt)) ? "visual" : "written",
      answerForm: question.questionType,
    };
    const item = {
      id,
      lesson: lesson.lesson,
      sourceType: "original",
      sourceKind: question.sourceKind,
      syllabusIds: lesson.syllabusIds,
      questionType: question.questionType,
      commandWord: question.commandWord,
      marks: Math.max(1, Math.min(8, question.marks)),
      difficulty: index === 0 ? "foundation" : index === selected.length - 1 ? "transfer" : "application",
      prompt: question.prompt,
      answer: question.answer,
      guidance: question.guidance,
      commonError: index === 0
        ? `For the command word ${question.commandWord}, perform that exact action; do not replace it with an unrelated fact.`
        : index === 1
          ? "Do not repeat the same point in different words; each mark needs a separate idea or method step."
          : "Do not copy the worked example unchanged; transfer the method and check it against the new context.",
      semanticFingerprint,
      originalSourceLesson: question.oldLesson,
    };
    questionBank.push(item);
    return id;
  });
}

const lessons = courseV2Blueprint.map((lesson, index) => {
  const requirements = lesson.focus === "integrated-review"
    ? syllabus.requirements.filter((requirement) => lesson.reviewSections.includes(requirement.section))
    : lesson.syllabusIds.map((id) => requirementById.get(id));
  const focus = [lesson.title, ...requirements.flatMap((requirement) => [requirement.requirement, requirement.notes])].join(" ");
  const mapped = mappedSources.get(lesson.lesson) ?? [];
  const evidenceSources = requirements.flatMap((requirement) => requirement.teachingLessons ?? []);
  const sourceOldLessons = [...new Set(lesson.focus === "integrated-review" ? mapped : [...mapped, ...evidenceSources])].sort((a, b) => a - b);
  const sourceRecords = sourceOldLessons.map((number) => oldLessonByNumber.get(number)).filter(Boolean);
  const requirementFacts = lesson.focus === "integrated-review"
    ? lesson.reviewSections.map((section) => {
      const sectionRequirements = requirements.filter((requirement) => requirement.section === section);
      const highestFrequency = sectionRequirements.sort((left, right) => {
        const marksFor = (identifier) => frequency.entries.filter((entry) => entry.primaryRequirement === identifier).reduce((sum, entry) => sum + entry.marks, 0);
        return marksFor(right.id) - marksFor(left.id) || left.id.localeCompare(right.id);
      })[0];
      return highestFrequency?.notes || highestFrequency?.requirement;
    })
    : requirements.map((requirement) => requirement.notes || requirement.requirement);
  const objectiveTexts = requirements.map((requirement) => requirement.requirement);
  const oldFacts = sourceRecords.flatMap((record) => record.direct)
    .filter((fact) => relevance(fact, focus) >= 1)
    .filter((fact) => !objectiveTexts.some((objective) => similarity(fact, objective) >= 0.72));
  const coreFacts = uniqueSentences([...requirementFacts, ...oldFacts], 0.58).slice(0, lesson.focus === "integrated-review" ? 12 : 12);
  const fallbackFacts = [
    `For ${lesson.title.toLowerCase()}, identify the required concept before describing its mechanism or consequence.`,
    `Choose the answer structure for ${lesson.title.toLowerCase()} from the command word and the number of available marks.`,
    `Apply ${lesson.title.toLowerCase()} to a new context and check every credited step against the scenario.`,
  ];
  while (coreFacts.length < 4) {
    const fallback = fallbackFacts.find((fact) => !coreFacts.some((existing) => normalise(existing) === normalise(fact)));
    if (!fallback) break;
    coreFacts.push(fallback);
  }
  const workedCandidates = sourceRecords.map((record) => record.worked).filter(Boolean).sort((a, b) => relevance(b, focus) - relevance(a, focus));
  const misconceptionCandidates = sourceRecords.map((record) => record.misconception).filter(Boolean).sort((a, b) => relevance(b, focus) - relevance(a, focus));
  const commonError = misconceptionCandidates[0] || `Do not give a vague definition of ${lesson.title.toLowerCase()}; connect the correct term to its mechanism or consequence.`;
  const visualCandidates = sourceRecords.flatMap((record) => record.visuals.map((visual) => ({ ...visual, oldLesson: record.lesson })))
    .sort((a, b) => relevance(`${b.title} ${b.facts.join(" ")}`, focus) - relevance(`${a.title} ${a.facts.join(" ")}`, focus));
  const visual = visualCandidates.find((candidate) => relevance(`${candidate.title} ${candidate.facts.join(" ")}`, focus) >= 1) ?? null;
  const questionIds = selectQuestions(lesson, coreFacts, commonError, sourceOldLessons);
  const pastPaperRefs = frequency.entries
    .filter((entry) => lesson.focus === "integrated-review" ? entry.paper === lesson.paper : lesson.syllabusIds.includes(entry.primaryRequirement))
    .sort((a, b) => b.year - a.year || b.marks - a.marks || a.sourceRef.localeCompare(b.sourceRef))
    .slice(0, 4)
    .map((entry) => ({ sourceRef: entry.sourceRef, marks: entry.marks, commandWord: entry.commandWord, questionType: entry.questionType }));
  const prerequisiteIds = [...new Set(requirements.flatMap((requirement) => requirement.prerequisites ?? []))];
  const visualAltFacts = visual
    ? uniqueSentences(visual.facts).filter((fact) => !coreFacts.some((coreFact) => similarity(fact, coreFact) >= 0.62)).slice(0, 5)
    : [];
  const prerequisiteKnowledge = uniqueSentences(prerequisiteIds.flatMap((identifier) => {
    const prerequisite = requirementById.get(identifier);
    return prerequisite ? [prerequisite.notes, prerequisite.requirement] : [];
  }), 0.58).slice(0, 6);
  const conceptChecklist = [...new Map(requirements.flatMap((requirement) => (requirement.requiredGroups ?? []))
    .map((group) => group.join(" / "))
    .filter(Boolean)
    .map((value) => [normalise(value), value])).values()].slice(0, 24);
  return {
    ...lesson,
    syllabusIds: lesson.focus === "integrated-review" ? requirements.map((requirement) => requirement.id) : lesson.syllabusIds,
    previousLesson: index ? courseV2Blueprint[index - 1].id : null,
    nextLesson: index < courseV2Blueprint.length - 1 ? courseV2Blueprint[index + 1].id : null,
    sourceOldLessons,
    prerequisiteIds,
    prerequisiteKnowledge,
    prerequisitePrompt: prerequisiteIds.length
      ? `Recall ${prerequisiteIds.join(", ")} before starting this lesson.`
      : index === 0
        ? "Check that you can use place value and distinguish a value from the way it is represented."
        : `Recall the main conclusion from Lesson ${courseV2Blueprint[index - 1].id}: ${courseV2Blueprint[index - 1].title}.`,
    learningObjectives: requirements.slice(0, 3).map((requirement) => stripMarkdown(requirement.requirement)),
    conceptChecklist,
    teachingRoutes: {
      quick: "Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.",
      full: "Teach every core explanation point, the worked example and all lesson questions. Use the visual only when it adds a different representation.",
      deep: "Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.",
    },
    coreFacts,
    workedExample: trimText(workedCandidates[0] || `Use one fresh scenario to apply ${lesson.title.toLowerCase()}, showing each decision or calculation step and checking the result against the question context.`),
    extension: extensionBySection[lesson.focus === "integrated-review" ? (lesson.paper === 1 ? 8 : 12) : lesson.section],
    visual: visual && visualAltFacts.length ? {
      title: visual.title,
      path: visual.image,
      altFacts: visualAltFacts,
      sourceOldLesson: visual.oldLesson,
    } : null,
    questionIds,
    summaryPoints: [
      `Define ${lesson.title.toLowerCase()} with the exact technical vocabulary expected by the syllabus.`,
      `Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.`,
      "Match the shape of the answer to the command word and the available marks.",
      "Check the final answer against the scenario instead of repeating a memorised sentence.",
    ],
    commonError,
    examTips: [
      "Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.",
      "Match the number of independent points or method steps to the available marks.",
      `For ${lesson.title.toLowerCase()}, use the exact technical term before applying it to the scenario.`,
    ],
    pastPaperRefs,
  };
});

const contentContract = {
  schemaVersion: 1,
  source: "One-time evidence-preserving consolidation of the 151-lesson course into the reviewed 90-lesson blueprint.",
  syllabus: syllabus.syllabus,
  lessonCount: lessons.length,
  lessons,
};

const questionContract = {
  schemaVersion: 1,
  source: "Original course questions selected and deduplicated for the 90-lesson course; no Cambridge question wording is stored.",
  questionCount: questionBank.length,
  questions: questionBank,
};

const migrationContract = {
  schemaVersion: 1,
  sourceLessonCount: oldLessons.length,
  targetLessonCount: lessons.length,
  rows: migration.map((row) => ({
    ...row,
    newTitle: courseV2Blueprint[row.primaryNewLesson - 1].title,
    syllabusIds: lessons[row.primaryNewLesson - 1].syllabusIds,
  })),
};

fs.writeFileSync(path.join(root, "scripts", "course-v2-content.json"), `${JSON.stringify(contentContract, null, 2)}\n`);
fs.writeFileSync(path.join(root, "scripts", "question-bank-contract.json"), `${JSON.stringify(questionContract, null, 2)}\n`);
fs.writeFileSync(path.join(root, "scripts", "course-v2-migration.json"), `${JSON.stringify(migrationContract, null, 2)}\n`);

console.log(JSON.stringify({
  lessons: lessons.length,
  questions: questionBank.length,
  migratedOldLessons: migration.length,
  lessonsWithVisuals: lessons.filter((lesson) => lesson.visual).length,
  sourceCoverage: lessons.filter((lesson) => lesson.sourceOldLessons.length).length,
}, null, 2));
