(function () {
  "use strict";

  const catalog = globalThis.AS9618CourseCatalog;
  const content = document.querySelector(".lesson-content");
  const lessonMatch = location.pathname.match(/lesson-(\d{3})(?:\/|$)/);
  if (!Array.isArray(catalog) || !content || !lessonMatch) return;

  const lessonId = lessonMatch[1];
  const lesson = catalog.find((item) => item.id === lessonId);
  if (!lesson) return;

  const storageKey = "as9618-classroom-mode";
  const optionalStorageKey = "as9618-classroom-optional";
  const directSections = [...content.children].filter((element) => element.matches("section[data-delivery-role]"));
  const groupMap = new Map();
  let classroomMode = false;
  let includeOptional = false;
  let activeGroupId = "";
  let sequence = [];

  function preference(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // The page still works when storage is blocked or unavailable.
    }
  }

  for (const section of directSections) {
    const groupId = section.dataset.deliveryGroup;
    if (!groupMap.has(groupId)) {
      groupMap.set(groupId, {
        id: groupId,
        role: section.dataset.deliveryRole,
        activity: section.dataset.classroomActivity,
        sections: [],
      });
    }
    groupMap.get(groupId).sections.push(section);
    addDeliveryLabel(section);
  }

  const groups = [...groupMap.values()];
  const toolbar = buildToolbar();
  const status = toolbar.querySelector(".teacher-toolbar__status");
  const modeButton = toolbar.querySelector(".teacher-toolbar__mode");
  const optionalButton = toolbar.querySelector(".teacher-toolbar__optional");
  const fullscreenButton = toolbar.querySelector(".teacher-toolbar__fullscreen");
  document.body.append(toolbar);
  document.body.classList.add("has-teacher-toolbar");

  function addDeliveryLabel(section) {
    if (section.querySelector(":scope > .delivery-label, :scope > .section-title > .delivery-label, :scope > .hero-copy > .delivery-label")) return;
    const label = document.createElement("span");
    label.className = "delivery-label";
    label.textContent = `${section.dataset.deliveryRole.replace("_", " ")} · ${section.dataset.classroomActivity}`;
    const minutes = section.dataset.deliveryMinutes;
    if (minutes) label.textContent += ` · ${minutes} min`;
    const owner = section.querySelector(":scope > .section-title, :scope > .hero-copy") || section;
    owner.prepend(label);
  }

  function lessonHref(number) {
    return number >= 1 && number <= 150 ? `../lesson-${String(number).padStart(3, "0")}/` : "";
  }

  function navLink(className, label, number) {
    const href = lessonHref(number);
    return href
      ? `<a class="${className}" href="${href}">${label}</a>`
      : `<a class="${className}" aria-disabled="true" tabindex="-1">${label}</a>`;
  }

  function buildToolbar() {
    const element = document.createElement("nav");
    element.className = "teacher-toolbar";
    element.setAttribute("aria-label", "Teacher lesson toolbar");
    element.innerHTML = `
      ${navLink("teacher-toolbar__previous", "Previous lesson", lesson.number - 1)}
      <div class="teacher-toolbar__lesson">
        <strong>Lesson ${lesson.id}: ${escapeHtml(lesson.title)}</strong>
        <span>${escapeHtml(lesson.paper)} · ${escapeHtml(lesson.section)}</span>
      </div>
      ${navLink("teacher-toolbar__next", "Next lesson", lesson.number + 1)}
      <button class="teacher-toolbar__mode" type="button" aria-pressed="false">Classroom Mode</button>
      <details class="teacher-toolbar__more">
        <summary>Teaching tools</summary>
        <div class="teacher-toolbar__menu">
          <button type="button" data-jump="warmup">Warm-up</button>
          <button type="button" data-jump="core">Core</button>
          <button type="button" data-jump="practice">Practice</button>
          <button type="button" data-jump="exam">Exam</button>
          <button type="button" data-jump="homework">Homework</button>
          <button class="teacher-toolbar__optional" type="button" aria-pressed="false">Include optional</button>
          <button class="teacher-toolbar__fullscreen" type="button">Full screen</button>
          <a href="../assessments/">Assessment Bank</a>
        </div>
      </details>
      <span class="teacher-toolbar__status" aria-live="polite" aria-atomic="true"></span>`;
    return element;
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  function closeDisclosures() {
    document.querySelectorAll("details[open]").forEach((details) => details.removeAttribute("open"));
    document.querySelectorAll('[aria-expanded="true"][aria-controls]').forEach((button) => {
      if (button.closest(".teacher-toolbar")) return;
      button.click();
    });
    document.querySelectorAll(".answer.show, .answer.visible, .answer-panel.show, .answer-panel.visible, .ms-panel.show, .ms-panel.visible")
      .forEach((panel) => panel.classList.remove("show", "visible"));
  }

  function refreshSequence(preferredGroup = activeGroupId, moveFocus = false) {
    sequence = groups.filter((group) => group.role === "CORE" || (includeOptional && group.role === "OPTIONAL"));
    if (!sequence.some((group) => group.id === preferredGroup)) {
      preferredGroup = sequence.find((group) => group.activity === "ASK")?.id || sequence[0]?.id || "";
    }
    if (classroomMode && preferredGroup) showGroup(preferredGroup, moveFocus);
  }

  function showGroup(groupId, moveFocus = true) {
    const group = groupMap.get(groupId);
    if (!group) return;
    activeGroupId = groupId;
    for (const section of directSections) {
      section.classList.toggle("classroom-active", section.dataset.deliveryGroup === groupId);
    }
    const position = sequence.findIndex((item) => item.id === groupId);
    const heading = group.sections.flatMap((section) => [...section.querySelectorAll("h2, h3")])[0];
    const title = heading?.textContent.trim() || groupId;
    status.textContent = position >= 0
      ? `${title}. Classroom item ${position + 1} of ${sequence.length}.`
      : `${title}. ${group.role.replace("_", " ")}.`;
    if (moveFocus) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const focusTarget = heading || group.sections[0];
      focusTarget.setAttribute("tabindex", "-1");
      setTimeout(() => focusTarget.focus({ preventScroll: true }), 0);
    }
  }

  function setMode(active, persist = true) {
    classroomMode = active;
    document.body.classList.toggle("classroom-mode", active);
    modeButton.setAttribute("aria-pressed", String(active));
    modeButton.textContent = active ? "Exit Classroom" : "Classroom Mode";
    optionalButton.disabled = !active;
    if (persist) savePreference(storageKey, active ? "on" : "off");
    if (active) {
      closeDisclosures();
      refreshSequence(activeGroupId, true);
    } else {
      directSections.forEach((section) => section.classList.remove("classroom-active"));
      status.textContent = "Normal revision mode.";
    }
  }

  function step(direction) {
    if (!classroomMode || !sequence.length) return;
    const current = sequence.findIndex((group) => group.id === activeGroupId);
    const next = Math.min(sequence.length - 1, Math.max(0, (current < 0 ? 0 : current) + direction));
    showGroup(sequence[next].id);
  }

  function targetFor(kind) {
    const find = (test) => groups.find(test);
    if (kind === "warmup") return find((group) => group.sections.some((section) => section.id === "hook"));
    if (kind === "core") return find((group) => group.role === "CORE" && group.activity === "TEACH" && !group.sections.some((section) => section.id === "overview"));
    if (kind === "practice") return find((group) => group.sections.some((section) => section.id === "practice")) || find((group) => group.activity === "PRACTISE");
    if (kind === "exam") return find((group) => group.activity === "EXAM");
    if (kind === "homework") return find((group) => group.role === "AFTER_CLASS");
    return null;
  }

  function jump(kind) {
    const target = targetFor(kind);
    if (!target) return;
    if (classroomMode) showGroup(target.id);
    else target.sections[0].scrollIntoView({ behavior: "smooth", block: "start" });
    toolbar.querySelector(".teacher-toolbar__more").removeAttribute("open");
  }

  function toggleReveal() {
    if (!classroomMode) return;
    const group = groupMap.get(activeGroupId);
    if (!group) return;
    const details = group.sections.map((section) => section.querySelector("details")).find(Boolean);
    if (details) {
      details.toggleAttribute("open");
      return;
    }
    group.sections
      .map((section) => section.querySelector(".reveal, [data-reveal], [data-answer-toggle], [data-ms-toggle], .ms-toggle, .answer-toggle"))
      .find(Boolean)
      ?.click();
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    if (document.documentElement.requestFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
        return;
      } catch {
        // Fall through to the CSS-only presentation fallback.
      }
    }
    const fallback = document.body.classList.toggle("classroom-fullscreen-fallback");
    fullscreenButton.textContent = fallback ? "Exit presentation" : "Full screen";
  }

  modeButton.addEventListener("click", () => setMode(!classroomMode));
  optionalButton.addEventListener("click", () => {
    includeOptional = !includeOptional;
    optionalButton.setAttribute("aria-pressed", String(includeOptional));
    savePreference(optionalStorageKey, includeOptional ? "on" : "off");
    refreshSequence(activeGroupId, true);
  });
  fullscreenButton.addEventListener("click", toggleFullscreen);
  toolbar.querySelectorAll("[data-jump]").forEach((button) => button.addEventListener("click", () => jump(button.dataset.jump)));

  document.addEventListener("fullscreenchange", () => {
    fullscreenButton.textContent = document.fullscreenElement ? "Exit full screen" : "Full screen";
  });
  document.addEventListener("keydown", (event) => {
    if (!classroomMode || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.closest("input, select, textarea, button, details, [contenteditable='true']")) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      step(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      toggleReveal();
    } else if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      toggleFullscreen();
    }
  });

  includeOptional = preference(optionalStorageKey) === "on";
  optionalButton.setAttribute("aria-pressed", String(includeOptional));
  refreshSequence();
  setMode(preference(storageKey) === "on", false);
}());
