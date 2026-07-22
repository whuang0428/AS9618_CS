(function () {
  "use strict";

  const interactiveSelector = [
    ".answer-toggle:not([data-sample])",
    ".ms-toggle",
    "[data-reveal]",
    "[data-correction-toggle]",
    "[data-answer-toggle]",
    "[data-ms-toggle]",
  ].join(",");

  let generatedId = 0;

  function ensureId(element, prefix) {
    if (!element.id) {
      generatedId += 1;
      element.id = `${prefix}-${generatedId}`;
    }
    return element.id;
  }

  function candidateIds(button) {
    const patterns = {
      answer: (value) => [`${value}-answer`, `answer-${value}`, value],
      ms: (value) => [`${value}-ms`, `ms-${value}`, value],
      fix: (value) => [`${value}-fix`, `fix-${value}`, value],
      correction: (value) => [`${value}-correction`, `correction-${value}`, value],
      reveal: (value) => [`${value}-reveal`, `reveal-${value}`, value],
    };

    return Object.entries(patterns).flatMap(([key, build]) => {
      const value = button.dataset[key];
      return value === undefined ? [] : build(value);
    });
  }

  function isPanel(element, button) {
    return element && element !== button && !element.matches("button, input, select, textarea");
  }

  function controlledPanel(button) {
    for (const id of candidateIds(button)) {
      const candidate = document.getElementById(id);
      if (isPanel(candidate, button)) return candidate;
    }

    if (isPanel(button.nextElementSibling, button)) return button.nextElementSibling;

    const owner = button.closest("article, section, li, .question, .practice-item");
    return owner?.querySelector(
      ".answer-panel, .ms-panel, .marking, .correction, .reveal-panel, .answer, [class*='answer'][id], [class*='marking'][id]",
    ) || null;
  }

  function buttonIsExpanded(button, panel) {
    const label = button.textContent.trim();
    if (/^hide\b/i.test(label)) return true;
    if (/^show\b/i.test(label)) return false;
    if (panel.hidden || panel.classList.contains("hidden")) return false;
    return getComputedStyle(panel).display !== "none" && getComputedStyle(panel).visibility !== "hidden";
  }

  function syncDisclosure(button, panel) {
    const expanded = buttonIsExpanded(button, panel);
    button.setAttribute("aria-expanded", String(expanded));
    panel.setAttribute("aria-hidden", String(!expanded));
  }

  function enhanceDisclosure(button) {
    if (button.dataset.stage7Disclosure === "ready") return;
    const panel = controlledPanel(button);
    if (!panel) return;

    button.dataset.stage7Disclosure = "ready";
    const buttonId = ensureId(button, "stage7-disclosure");
    const panelId = ensureId(panel, "stage7-panel");
    button.setAttribute("aria-controls", panelId);
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", buttonId);
    syncDisclosure(button, panel);
    button.addEventListener("click", () => requestAnimationFrame(() => syncDisclosure(button, panel)));
  }

  function tabPanelFor(container) {
    const section = container.closest("section, article, .panel") || container.parentElement;
    return section?.querySelector(
      ".example-box, .example-output, .tab-panel, .tab-content, [id*='exampleBox'], [id*='ExampleBox'], [id*='exampleResult']",
    ) || null;
  }

  function syncTabs(tabs) {
    let selected = tabs.find((tab) => tab.classList.contains("active"));
    if (!selected) selected = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
    for (const tab of tabs) {
      const active = tab === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    }
  }

  function enhanceTabs(container) {
    if (container.dataset.stage7Tabs === "ready") return;
    const tabs = [...container.querySelectorAll("button.tab, button.tab-button")];
    if (tabs.length < 2) return;

    container.dataset.stage7Tabs = "ready";
    container.setAttribute("role", "tablist");
    const panel = tabPanelFor(container);
    const panelId = panel ? ensureId(panel, "stage7-tabpanel") : null;
    if (panel) panel.setAttribute("role", "tabpanel");

    tabs.forEach((tab, index) => {
      tab.setAttribute("role", "tab");
      if (panelId) tab.setAttribute("aria-controls", panelId);
      tab.addEventListener("click", () => requestAnimationFrame(() => syncTabs(tabs)));
      tab.addEventListener("keydown", (event) => {
        const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        let targetIndex = index;
        if (event.key === "ArrowLeft") targetIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "ArrowRight") targetIndex = (index + 1) % tabs.length;
        if (event.key === "Home") targetIndex = 0;
        if (event.key === "End") targetIndex = tabs.length - 1;
        tabs[targetIndex].focus();
        tabs[targetIndex].click();
      });
    });
    syncTabs(tabs);
  }

  function enhanceControlName(control) {
    if (control.getAttribute("aria-label") || control.getAttribute("aria-labelledby")) return;
    if (control.closest("label")) return;
    if (control.id && document.querySelector(`label[for="${CSS.escape(control.id)}"]`)) return;

    const owner = control.closest("article, .practice-item, .question");
    const prompt = owner?.querySelector("p");
    if (!prompt) return;
    control.setAttribute("aria-labelledby", ensureId(prompt, "stage7-prompt"));
  }

  function enhanceLiveRegion(region) {
    if (!region.hasAttribute("aria-live")) region.setAttribute("aria-live", "polite");
    if (!region.hasAttribute("aria-atomic")) region.setAttribute("aria-atomic", "true");
  }

  function syncFilters(buttons) {
    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.classList.contains("active")));
    }
  }

  function enhanceSampleChoices() {
    const groups = new Set([...document.querySelectorAll("button[data-sample]")].map((button) => button.parentElement));
    for (const group of groups) {
      if (!group || group.dataset.stage7Choices === "ready") continue;
      group.dataset.stage7Choices = "ready";
      const buttons = [...group.querySelectorAll("button[data-sample]")];
      for (const button of buttons) {
        button.setAttribute("aria-pressed", "false");
        button.addEventListener("click", () => {
          for (const item of buttons) item.setAttribute("aria-pressed", String(item === button));
        });
      }
    }
  }

  function annotateChinese(root) {
    if (!root || root.closest?.('[lang="zh-CN"]')) return;
    const excluded = "script, style, code, pre, textarea, input, select, option";
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (/\p{Script=Han}/u.test(node.textContent) && !node.parentElement?.closest(excluded)) textNodes.push(node);
    }

    for (const node of textNodes) {
      const parts = node.textContent.split(/(\p{Script=Han}+)/gu);
      const fragment = document.createDocumentFragment();
      for (const part of parts) {
        if (!part) continue;
        if (/^\p{Script=Han}+$/u.test(part)) {
          const span = document.createElement("span");
          span.lang = "zh-CN";
          span.textContent = part;
          fragment.append(span);
        } else {
          fragment.append(document.createTextNode(part));
        }
      }
      node.replaceWith(fragment);
    }
  }

  function enhance(root) {
    root.querySelectorAll?.(interactiveSelector).forEach(enhanceDisclosure);
    root.querySelectorAll?.('[role="tablist"], .example-tabs, .tabs, .tab-row').forEach(enhanceTabs);
    root.querySelectorAll?.("input, select, textarea").forEach(enhanceControlName);
    root.querySelectorAll?.(
      ".feedback, .result-box, .mark, [id$='Feedback'], [id$='Result'], [id$='Output'], [id$='-mark']",
    ).forEach(enhanceLiveRegion);

    const filterButtons = [...document.querySelectorAll("button[data-filter]")];
    if (filterButtons.length) {
      syncFilters(filterButtons);
      for (const button of filterButtons) {
        if (button.dataset.stage7Filter === "ready") continue;
        button.dataset.stage7Filter = "ready";
        button.addEventListener("click", () => requestAnimationFrame(() => syncFilters(filterButtons)));
      }
    }
    enhanceSampleChoices();
  }

  function init() {
    enhance(document);
    annotateChinese(document.body);
    document.documentElement.classList.add("stage7-a11y-ready");
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            enhance(node);
            annotateChinese(node);
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
}());
