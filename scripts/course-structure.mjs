export const courseUnits = Object.freeze([
  { id: "section-1", range: [1, 16], paper: "Paper 1", section: "Section 1", title: "Information representation" },
  { id: "section-2", range: [17, 27], paper: "Paper 1", section: "Section 2", title: "Communication" },
  { id: "section-3", range: [28, 41], paper: "Paper 1", section: "Section 3", title: "Hardware" },
  { id: "section-4", range: [42, 52], paper: "Paper 1", section: "Section 4", title: "Processor fundamentals" },
  { id: "section-5", range: [53, 62], paper: "Paper 1", section: "Section 5", title: "System software" },
  { id: "section-6", range: [63, 72], paper: "Paper 1", section: "Section 6", title: "Security, privacy and data integrity" },
  { id: "section-7", range: [73, 78], paper: "Paper 1", section: "Section 7", title: "Ethics and ownership" },
  { id: "section-8", range: [79, 90], paper: "Paper 1", section: "Section 8", title: "Databases" },
  { id: "paper-1-review", range: [91, 98], paper: "Paper 1", section: "Review", title: "Paper 1 integrated review" },
  { id: "section-9", range: [99, 113], paper: "Paper 2", section: "Section 9", title: "Algorithm design and problem-solving" },
  { id: "section-10", range: [114, 126], paper: "Paper 2", section: "Section 10", title: "Data types and structures" },
  { id: "section-11", range: [127, 142], paper: "Paper 2", section: "Section 11", title: "Programming" },
  { id: "section-12", range: [143, 147], paper: "Paper 2", section: "Section 12", title: "Software development" },
  { id: "paper-2-review", range: [148, 151], paper: "Paper 2", section: "Review", title: "Paper 2 integrated review" },
]);

export function unitForLesson(number) {
  const unit = courseUnits.find(({ range }) => number >= range[0] && number <= range[1]);
  return unit;
}
