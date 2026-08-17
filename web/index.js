const lessons = globalThis.AS9618CourseCatalog ?? [];
const units = lessons.reduce((items, lesson) => {
  if (!items.some((item) => item.id === lesson.unitId)) {
    const unitLessons = lessons.filter((item) => item.unitId === lesson.unitId);
    items.push({
      id: lesson.unitId,
      range: [unitLessons[0].number, unitLessons.at(-1).number],
      paper: lesson.paper,
      label: lesson.section,
      title: lesson.unitTitle,
    });
  }
  return items;
}, []);

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
    const unitMatch = unitId === "all" || lesson.unitId === unitId;
    const haystack = `${lesson.id} ${lesson.title} ${lesson.paper} ${lesson.section} ${lesson.unitTitle}`.toLowerCase();
    return unitMatch && (!search || haystack.includes(search));
  });

  document.querySelector("#resultHeading").textContent = `${filtered.length} lesson${filtered.length === 1 ? "" : "s"}`;
  document.querySelector("#lessonGrid").innerHTML = filtered.length
    ? filtered.map((lesson) => `
      <a class="lesson-card" href="${lessonHref(lesson.id)}">
        <small>${lesson.paper} | ${lesson.section}</small>
        <strong>${lesson.id}. ${lesson.title}</strong>
        <span>${lesson.unitTitle}</span>
      </a>
    `).join("")
    : `<div class="empty">No lessons match the current filter.</div>`;
}

function init() {
  if (lessons.length !== 150) {
    document.querySelector("#lessonGrid").innerHTML = '<div class="empty">The course catalogue could not be loaded.</div>';
    return;
  }
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
}

document.addEventListener("DOMContentLoaded", init);
