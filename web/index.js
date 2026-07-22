const units = [
  { id: "section-1", range: [1, 15], paper: "Paper 1", label: "Section 1", title: "Information representation" },
  { id: "section-2", range: [16, 26], paper: "Paper 1", label: "Section 2", title: "Communication" },
  { id: "section-3", range: [27, 40], paper: "Paper 1", label: "Section 3", title: "Hardware" },
  { id: "section-4", range: [41, 51], paper: "Paper 1", label: "Section 4", title: "Processor fundamentals" },
  { id: "section-5", range: [52, 61], paper: "Paper 1", label: "Section 5", title: "System software" },
  { id: "section-6", range: [62, 71], paper: "Paper 1", label: "Section 6", title: "Security, privacy and data integrity" },
  { id: "section-7", range: [72, 77], paper: "Paper 1", label: "Section 7", title: "Ethics and ownership" },
  { id: "section-8", range: [78, 89], paper: "Paper 1", label: "Section 8", title: "Databases" },
  { id: "paper-1-review", range: [90, 97], paper: "Paper 1", label: "Review", title: "Paper 1 integrated review" },
  { id: "section-9", range: [98, 112], paper: "Paper 2", label: "Section 9", title: "Algorithm design and problem-solving" },
  { id: "section-10", range: [113, 125], paper: "Paper 2", label: "Section 10", title: "Data types and structures" },
  { id: "section-11", range: [126, 141], paper: "Paper 2", label: "Section 11", title: "Programming" },
  { id: "section-12", range: [142, 146], paper: "Paper 2", label: "Section 12", title: "Software development" },
  { id: "paper-2-review", range: [147, 150], paper: "Paper 2", label: "Review", title: "Paper 2 integrated review" },
];

const lessons = Array.from({ length: 150 }, (_, index) => {
  const number = index + 1;
  const unit = units.find((item) => number >= item.range[0] && number <= item.range[1]);
  return {
    number,
    id: String(number).padStart(3, "0"),
    title: `Lesson ${String(number).padStart(3, "0")}`,
    unit,
  };
});

function lessonHref(id) {
  return `./lesson-${id}/`;
}

function renderUnits() {
  const list = document.querySelector("#unitList");
  list.innerHTML = units.map((unit) => {
    const count = unit.range[1] - unit.range[0] + 1;
    return `
      <article class="unit-card">
        <strong>${unit.paper} ${unit.label}: ${unit.title}</strong>
        <span>Lessons ${String(unit.range[0]).padStart(3, "0")}-${String(unit.range[1]).padStart(3, "0")} | ${count} lessons</span>
      </article>
    `;
  }).join("");
}

function setupCourseMapDialog() {
  const dialog = document.querySelector("#courseMapDialog");
  const openButton = document.querySelector("#courseMapButton");
  const closeButton = document.querySelector("#closeCourseMapButton");

  const closeDialog = () => {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  };

  openButton.addEventListener("click", () => {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  });
  closeButton.addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
}

function renderFilter() {
  const filter = document.querySelector("#unitFilter");
  filter.innerHTML = `
    <option value="all">All units</option>
    ${units.map((unit) => `<option value="${unit.id}">${unit.paper} ${unit.label}: ${unit.title}</option>`).join("")}
  `;
}

function renderLessons() {
  const search = document.querySelector("#searchInput").value.trim().toLowerCase();
  const unitId = document.querySelector("#unitFilter").value;
  const filtered = lessons.filter((lesson) => {
    const unitMatch = unitId === "all" || lesson.unit.id === unitId;
    const haystack = `${lesson.id} ${lesson.title} ${lesson.unit.paper} ${lesson.unit.label} ${lesson.unit.title}`.toLowerCase();
    return unitMatch && (!search || haystack.includes(search));
  });

  document.querySelector("#resultHeading").textContent = `${filtered.length} lesson${filtered.length === 1 ? "" : "s"}`;
  document.querySelector("#lessonGrid").innerHTML = filtered.length
    ? filtered.map((lesson) => `
      <a class="lesson-card" href="${lessonHref(lesson.id)}">
        <small>${lesson.unit.paper} | ${lesson.unit.label}</small>
        <strong>${lesson.id}. ${lesson.title}</strong>
        <span>${lesson.unit.title}</span>
      </a>
    `).join("")
    : `<div class="empty">No lessons match the current filter.</div>`;
}

async function hydrateTitles() {
  await Promise.all(lessons.map(async (lesson) => {
    try {
      const response = await fetch(lessonHref(lesson.id));
      if (!response.ok) return;
      const html = await response.text();
      const match = html.match(/<h1>(.*?)<\/h1>/s);
      if (match) lesson.title = match[1].replace(/\s+/g, " ").trim();
    } catch {
      // Keep fallback lesson title if served from a context that blocks fetch.
    }
  }));
  renderLessons();
}

function init() {
  renderUnits();
  setupCourseMapDialog();
  renderFilter();
  renderLessons();
  document.querySelector("#searchInput").addEventListener("input", renderLessons);
  document.querySelector("#unitFilter").addEventListener("change", renderLessons);
  document.querySelector("#clearBtn").addEventListener("click", () => {
    document.querySelector("#searchInput").value = "";
    document.querySelector("#unitFilter").value = "all";
    renderLessons();
  });
  hydrateTitles();
}

document.addEventListener("DOMContentLoaded", init);
