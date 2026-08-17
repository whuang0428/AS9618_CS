(function () {
  "use strict";

  const catalog = globalThis.AS9618CourseCatalog;
  const content = document.querySelector(".lesson-content");
  const lessonMatch = location.pathname.match(/lesson-(\d{3})(?:\/|$)/);
  if (!Array.isArray(catalog) || !content || !lessonMatch) return;

  const lesson = catalog.find((item) => item.id === lessonMatch[1]);
  if (!lesson) return;

  const sections = [...content.children].filter((element) => element.matches("section[data-delivery-role]"));
  const lessonNav = document.querySelector(".lesson-nav");
  const actionPanel = document.querySelector(".topbar .action-panel");
  const toolbar = buildToolbar();
  const status = toolbar.querySelector(".teacher-toolbar__status");
  document.body.append(toolbar);
  document.body.classList.add("has-teacher-toolbar");
  if (lessonNav && actionPanel) setupContentsToggle();

  function lessonHref(number) {
    return number >= 1 && number <= 150 ? `../lesson-${String(number).padStart(3, "0")}/` : "";
  }

  function navLink(className, label, number) {
    const href = lessonHref(number);
    return href
      ? `<a class="${className}" href="${href}">${label}</a>`
      : `<a class="${className}" aria-disabled="true" tabindex="-1">${label}</a>`;
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  function buildToolbar() {
    const element = document.createElement("nav");
    element.className = "teacher-toolbar";
    element.setAttribute("aria-label", "Lesson navigation toolbar");
    element.innerHTML = `
      ${navLink("teacher-toolbar__previous", "Previous lesson", lesson.number - 1)}
      <div class="teacher-toolbar__lesson">
        <strong>Lesson ${lesson.id}: ${escapeHtml(lesson.title)}</strong>
        <span>${escapeHtml(lesson.paper)} · ${escapeHtml(lesson.section)}</span>
      </div>
      ${navLink("teacher-toolbar__next", "Next lesson", lesson.number + 1)}
      <details class="teacher-toolbar__more">
        <summary>Lesson jumps</summary>
        <div class="teacher-toolbar__menu">
          <button type="button" data-jump="warmup">Warm-up</button>
          <button type="button" data-jump="core">Core</button>
          <button type="button" data-jump="practice">Practice</button>
          <button type="button" data-jump="exam">Exam</button>
          <button type="button" data-jump="homework">Homework</button>
          <a href="../assessments/">Assessment Bank</a>
        </div>
      </details>
      <span class="teacher-toolbar__status" aria-live="polite" aria-atomic="true"></span>`;
    return element;
  }

  function targetFor(kind) {
    if (kind === "warmup") return sections.find((section) => section.id === "hook");
    if (kind === "core") {
      return sections.find((section) => section.dataset.deliveryRole === "CORE" && section.dataset.classroomActivity === "TEACH" && section.id !== "overview");
    }
    if (kind === "practice") {
      return sections.find((section) => section.id === "practice") || sections.find((section) => section.dataset.classroomActivity === "PRACTISE");
    }
    if (kind === "exam") return sections.find((section) => section.dataset.classroomActivity === "EXAM");
    if (kind === "homework") return sections.find((section) => section.dataset.deliveryRole === "AFTER_CLASS");
    return null;
  }

  function jump(kind) {
    const target = targetFor(kind);
    if (!target) return;
    const heading = target.querySelector("h2, h3") || target;
    heading.setAttribute("tabindex", "-1");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => heading.focus({ preventScroll: true }), 0);
    status.textContent = `Moved to ${heading.textContent.trim()}.`;
    toolbar.querySelector(".teacher-toolbar__more").removeAttribute("open");
  }

  function setupContentsToggle() {
    const toggle = document.createElement("button");
    lessonNav.id = "lesson-contents";
    toggle.type = "button";
    toggle.className = "course-home-link lesson-contents-toggle";
    toggle.setAttribute("aria-controls", lessonNav.id);
    actionPanel.append(toggle);

    function setExpanded(expanded, { announce = true, returnFocus = true } = {}) {
      const focusWasInside = lessonNav.contains(document.activeElement);
      lessonNav.hidden = !expanded;
      document.body.classList.toggle("lesson-nav-collapsed", !expanded);
      toggle.setAttribute("aria-expanded", String(expanded));
      toggle.textContent = expanded ? "Hide contents" : "Show contents";
      if (announce) status.textContent = expanded ? "Lesson contents shown." : "Lesson contents hidden.";
      if (!expanded && returnFocus && focusWasInside) toggle.focus({ preventScroll: true });
    }

    toggle.addEventListener("click", () => setExpanded(lessonNav.hidden));
    lessonNav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.getElementById(link.hash.slice(1));
        if (!target) return;
        event.preventDefault();
        const heading = target.querySelector("h2, h3") || target;
        heading.setAttribute("tabindex", "-1");
        history.pushState(null, "", link.hash);
        setExpanded(false, { announce: false, returnFocus: false });
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => heading.focus({ preventScroll: true }), 0);
        status.textContent = `Moved to ${heading.textContent.trim()}. Lesson contents hidden.`;
      });
    });
    setExpanded(false, { announce: false });
  }

  toolbar.querySelectorAll("[data-jump]").forEach((button) => button.addEventListener("click", () => jump(button.dataset.jump)));
}());
