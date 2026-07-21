# AS9618 Computer Science 2027-2029 AS Lesson Plans

This repository contains a work-in-progress teaching and self-study course pack for Cambridge International AS Level Computer Science 9618, syllabus years 2027-2029.

Official qualification page: <https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/>

Syllabus reference used for this pack: Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2027, 2028 and 2029, Version 2.

## Project Status

All 150 lesson numbers currently have both a teacher-facing Markdown plan and an interactive webpage. The course is now in syllabus-audit and quality-assurance work: explicit syllabus gaps, supporting assessments and Cambridge-style marking guidance still need to be reviewed before the pack is described as complete.

## Course Design

- Target: AS Level only.
- Papers: Paper 1, Sections 1-8; Paper 2, Sections 9-12.
- Length: 150 lessons, 45 minutes each.
- Orientation-only lessons are not included; Lesson 001 starts with syllabus content.
- Included: stage review, short quizzes, monthly assessments, marking guidance.
- Excluded: school midterm and final examinations.
- Language style: English first, Chinese support for difficult concepts.
- Programming approach: Cambridge pseudocode is the exam standard; Java is used only as a supporting implementation language.

## Folder Structure

- `course-map.md`: syllabus mapping, pacing, and assessment rhythm.
- `syllabus-audit.md`: requirement-level coverage evidence, gaps, and fixed repair targets.
- `lessons/`: 150 generated lesson plans undergoing syllabus coverage and content-quality review.
- `assessments/`: quizzes, monthly assessments, stage reviews, answer keys.
- `resources/`: glossary, pseudocode-Java guide, and misconception bank.
- `web/`: 150 independent teaching/self-study lesson webpages plus a searchable web index.

## How To Use

1. Start with `course-map.md` to see the full pacing plan, then use `syllabus-audit.md` to check current coverage status.
2. Teach lessons in numerical order unless your school timetable requires rearrangement.
3. Use the mini-quiz inside each lesson for retrieval practice.
4. Use `assessments/quizzes.md` every 4-5 lessons and `assessments/monthly-assessments.md` roughly every 18-20 lessons.
5. For Paper 2, keep reminding students that Java examples are practice scaffolds, not Cambridge pseudocode answers.

## Web Version

Run a local static server from the project root:

```bash
python3 -m http.server 8769 --directory web
```

Then open:

- Course web index: <http://127.0.0.1:8769/>
- Example lesson: <http://127.0.0.1:8769/lesson-001/>

Each webpage is self-contained in its own `web/lesson-XXX/` folder and uses local answer/MS toggles rather than a global student/teacher view.

## Generated Lesson Count

Total lessons generated: 150
