import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const jobsPath = path.join(root, "scripts", "stage10-rollout-jobs.json");
const jobs = JSON.parse(fs.readFileSync(jobsPath, "utf8"));
const key = (job) => `${job.lesson}/${job.targetId}`;

if (!jobs.some((job) => key(job) === "010/drawing-list")) {
  jobs.push({
    lesson: "010",
    targetId: "drawing-list",
    title: "Vector drawing list: objects, properties and redrawing",
    kind: "mechanism",
    filename: "stage10-lesson-010-drawing-list.jpg",
    sourceFacts: [
      "A vector graphic stores a drawing list of drawing objects rather than a fixed grid of pixels.",
      "Each object stores properties such as type, coordinates, dimensions, line colour, fill colour and line thickness.",
      "Software follows the instructions to redraw the objects at the required size without pixelation.",
    ],
    prompt: "Deterministic code-native vector diagram for Lesson 010. Show drawing objects, their stored properties and redrawing at two sizes without pixelation.",
  });
  jobs.sort((left, right) => left.lesson.localeCompare(right.lesson) || left.targetId.localeCompare(right.targetId));
  fs.writeFileSync(jobsPath, `${JSON.stringify(jobs, null, 2)}\n`);
}

console.log("Registered the deterministic Lesson 010 Vector drawing-list explanation.");
