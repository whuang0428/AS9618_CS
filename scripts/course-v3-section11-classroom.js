// Section 11 follows learning dependencies across stable lesson routes.
// The shared controller still owns each concept's stages and reading position.
(() => {
  const root = document.querySelector('[data-s11-classroom]');
  if (!root) return;
  const groups = [...root.querySelectorAll('[data-s11-group]')];
  const navigation = root.querySelector('.s5-navigation');
  const toolbar = root.querySelector('.s5-toolbar');
  const materialZoom = root.querySelector('.s11-content-zoom');
  let readingAnchor = null;
  let resumingReading = false;
  const current = () => groups.find(group => !group.hidden);
  const activePhase = group => [...group.querySelectorAll('[data-s5-phase]')].find(phase => !phase.hidden);
  const hide = group => group.dispatchEvent(new CustomEvent('s11:hide', { bubbles: true }));
  const hideAll = () => groups.forEach(hide);
  const closeGroupAnswers = group => group.querySelectorAll('details[open]:not([data-s5-question-fold]):not(.s11-lab-setup):not(.s11-lab-notes)').forEach(detail => { detail.open = false; });
  function hashTarget() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return null; }
    return id ? document.getElementById(id) : null;
  }
  function readingPosition() {
    const line = Math.max(0, toolbar?.getBoundingClientRect().bottom ?? 64) + 16;
    if (readingAnchor?.target.closest('[data-s5-group]')) {
      const rect = readingAnchor.target.getBoundingClientRect();
      const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight - 60) - Math.max(rect.top, line));
      // Focusing a sticky control can move the document. Keep the saved teaching
      // point while enough of it remains visible; use the new reading position
      // once the reader has moved past it.
      if (Math.abs(window.scrollY - readingAnchor.scrollY) < 3 || visible >= Math.min(rect.height / 2, 160)) return readingAnchor.target;
    }
    const reference = [...root.querySelectorAll('.s5-reference[open][id]')].find(item => {
      const rect = item.getBoundingClientRect();
      return rect.top <= line + 80 && rect.bottom > line;
    });
    if (reference) {
      const bookmark = hashTarget();
      if (bookmark?.closest('.s5-reference') === reference) return bookmark;
      return [...reference.querySelectorAll('.practice-question[id], .exam-question[id]')].find(item => item.getBoundingClientRect().bottom > line) ?? reference;
    }
    const phases = groups.flatMap(group => [...group.querySelectorAll('[data-s5-phase]')]);
    const phase = phases.find(item => item.getBoundingClientRect().bottom > line) ?? phases.at(-1);
    if (!phase) return null;
    const steps = [...phase.querySelectorAll('[data-s5-step-panel]')];
    return steps.find(step => step.getBoundingClientRect().bottom > line) ?? phase;
  }
  function resumeReading(event) {
    const target = readingPosition();
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const url = new URL(location.href);
    url.searchParams.delete('view');
    url.hash = target.id;
    history.replaceState(null, '', url.href);
    // Set the shared cursor from this exact phase/step before its mode changes.
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    resumingReading = true;
    try { root.querySelector('[data-s5-mode="classroom"]').click(); }
    finally { resumingReading = false; readingAnchor = null; }
    if (target.closest('.s5-reference')) queueMicrotask(() => revealReferenceBookmark(true));
  }
  if (toolbar && typeof ResizeObserver === 'function') {
    const measureToolbar = () => root.style.setProperty('--s11-toolbar-height', `${Math.ceil(toolbar.getBoundingClientRect().height)}px`);
    new ResizeObserver(measureToolbar).observe(toolbar);
    measureToolbar();
  }

  document.addEventListener('s5:leave', hideAll);
  document.addEventListener('s5:reset', event => {
    const group = event.target.closest?.('[data-s11-group]');
    if (group) group.dispatchEvent(new CustomEvent('s11:reset', { bubbles: true }));
  });
  function boundary(direction) {
    if (root.dataset.mode !== 'classroom') return null;
    const group = current();
    if (!group) return null;
    const phase = activePhase(group);
    const atBoundary = phase?.dataset.s5Phase === (direction < 0 ? 'observe' : 'recap');
    if (!atBoundary) return null;
    return { group, href: direction < 0 ? group.dataset.s11Prev : group.dataset.s11Next };
  }
  function moveAcrossConcept(direction, event) {
    const target = boundary(direction);
    if (!target) return false;
    event.preventDefault();
    event.stopImmediatePropagation();
    closeGroupAnswers(target.group);
    hideAll();
    if (!target.href) return true;
    const url = new URL(target.href, location.href);
    if (url.pathname === location.pathname) {
      if (location.hash === url.hash) window.dispatchEvent(new HashChangeEvent('hashchange'));
      else location.hash = url.hash;
    } else location.assign(url.href);
    return true;
  }
  root.addEventListener('click', event => {
    if (root.dataset.mode === 'classroom' && event.target.closest('[data-s5-mode="reading"]')) {
      const phase = activePhase(current());
      const bookmark = hashTarget();
      const referenceBookmark = bookmark?.closest('.s5-reference')?.open ? bookmark : null;
      const target = referenceBookmark ?? [...(phase?.querySelectorAll('[data-s5-step-panel]') ?? [])].find(step => !step.hidden) ?? phase;
      if (!target) return;
      // The shared controller expands every concept during this click. Scroll only
      // after that expansion so the browser cannot anchor us to an earlier concept.
      queueMicrotask(() => requestAnimationFrame(() => {
        if (root.dataset.mode !== 'reading') return;
        if (referenceBookmark) revealReferenceBookmark(false);
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
        readingAnchor = { target, scrollY: window.scrollY };
        const url = new URL(location.href);
        url.hash = target.id;
        history.replaceState(null, '', url.href);
      }));
    }
    if (event.target.closest('[data-s5-resume], [data-s5-mode="classroom"]')) {
      const url = new URL(location.href);
      if (url.searchParams.has('view')) {
        url.searchParams.delete('view');
        history.replaceState(null, '', url.href);
      }
    }
    if (event.target.closest('[data-s5-next]') && moveAcrossConcept(1, event)) return;
    if (event.target.closest('[data-s5-prev]') && moveAcrossConcept(-1, event)) return;
    if (event.target.closest('[data-s5-hide]')) hideAll();
    // The mode switch restores the shared classroom cursor. Its header button
    // can scroll into view before a click, so it must not sample that new scroll
    // position. The sticky Teach from this point control explicitly follows the
    // reader's current position instead.
    if (!resumingReading && root.dataset.mode === 'reading' && event.target.closest('[data-s5-resume]')) {
      resumeReading(event);
      return;
    }
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (link && root.dataset.mode === 'reading') {
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && /\/lesson-0(?:7[2-9]|8[0-3])\/$/.test(url.pathname) && url.pathname !== location.pathname) {
        event.preventDefault();
        url.searchParams.set('view', 'reading');
        location.assign(url.href);
      }
    }
  }, true);
  window.addEventListener('keydown', event => {
    // A separate dialog can contain a wide code listing or table. Keep the
    // shared classroom handler from navigating the lesson behind the dialog.
    if (materialZoom.open) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') event.stopImmediatePropagation();
      return;
    }
    if (root.dataset.mode !== 'classroom' || root.querySelector('.s5-zoom')?.open || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('input, select, textarea, [contenteditable="true"], summary, pre, [role="region"], [tabindex="0"]')) return;
    if (event.key === 'ArrowRight') moveAcrossConcept(1, event);
    if (event.key === 'ArrowLeft') moveAcrossConcept(-1, event);
  }, true);
  // Changing a prediction must never leave an answer to the previous input visible.
  for (const eventName of ['input', 'change']) root.addEventListener(eventName, event => {
    // A display choice keeps the same algorithm and trace; actual input changes reset it.
    if (event.target.matches('[data-s11-role="view"], [data-s11-role="prediction-note"]')) return;
    const group = event.target.closest('[data-s11-group]');
    if (!group) return;
    closeGroupAnswers(group);
    hide(group);
  }, true);

  let requestedReading = new URL(location.href).searchParams.get('view') === 'reading';
  let mobileStageKey = null;
  function revealMobileStage(group, phase) {
    if (innerWidth > 560) { mobileStageKey = null; return; }
    const key = `${group.id}:${phase?.dataset.s5Phase}`;
    if (key === mobileStageKey) return;
    const strip = root.querySelector('.s5-phases');
    const active = strip.querySelector('[aria-current="step"]');
    if (!active) return;
    mobileStageKey = key;
    const bounds = strip.getBoundingClientRect();
    const target = active.getBoundingClientRect();
    // Scroll only this strip. scrollIntoView could also move the lesson page.
    if (target.left < bounds.left) strip.scrollLeft += target.left - bounds.left - 4;
    else if (target.right > bounds.right) strip.scrollLeft += target.right - bounds.right + 4;
  }
  function syncNavigation() {
    if (!root.classList.contains('s5-enhanced')) return;
    if (requestedReading) {
      requestedReading = false;
      root.querySelector('[data-s5-mode="reading"]').click();
      queueMicrotask(() => revealReferenceBookmark(false));
    }
    const group = current();
    if (!group || root.dataset.mode !== 'classroom') { mobileStageKey = null; return; }
    const phase = activePhase(group);
    const previous = navigation.querySelector('[data-s5-prev]');
    const next = navigation.querySelector('[data-s5-next]');
    if (phase?.dataset.s5Phase === 'observe') {
      const atStart = !group.dataset.s11Prev;
      if (previous.disabled !== atStart) previous.disabled = atStart;
    }
    if (phase?.dataset.s5Phase === 'recap') {
      const complete = !group.dataset.s11Next;
      if (next.disabled !== complete) next.disabled = complete;
      const label = complete ? 'Section complete' : 'Next concept →';
      if (next.textContent !== label) next.textContent = label;
    }
    const position = navigation.querySelector('[role="status"]');
    const globalPosition = position.textContent.replace(/^Concept \d+ \/ \d+/, `Concept ${group.dataset.s11Order} / ${group.dataset.s11Total}`);
    if (position.textContent !== globalPosition) position.textContent = globalPosition;
    revealMobileStage(group, phase);
  }
  new MutationObserver(syncNavigation).observe(root, { subtree: true, attributes: true, attributeFilter: ['hidden', 'data-mode', 'class'] });
  matchMedia('(max-width: 560px)').addEventListener('change', () => { mobileStageKey = null; syncNavigation(); });
  syncNavigation();

  // Practice questions live in folded reference sections, outside the guided groups.
  function revealReferenceBookmark(scroll) {
    const target = hashTarget();
    const reference = target?.closest('.s5-reference');
    if (!reference) return;
    root.querySelectorAll('.s5-reference details[open]').forEach(detail => { detail.open = false; });
    hideAll();
    reference.open = true;
    // Bookmarks may identify a diagram inside an answer. Reveal its enclosing
    // reference, while keeping the answer itself under explicit learner control.
    const concealedAnswer = target.closest('details:not([open])');
    if (scroll) (concealedAnswer?.querySelector('summary') ?? target).scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', () => queueMicrotask(() => {
    revealReferenceBookmark(true);
    const target = hashTarget();
    if (root.dataset.mode === 'reading' && target?.closest('[data-s5-group]')) readingAnchor = { target, scrollY: window.scrollY };
  }));
  queueMicrotask(() => revealReferenceBookmark(Boolean(location.hash)));

  // Enlarge exact displayed material, not a rebuilt lesson or another live lab.
  // No controls or answer containers are copied, and the original DOM survives.
  const zoomSources = new WeakMap();
  const sourceButtons = new WeakMap();
  const zoomBody = materialZoom.querySelector('.s11-zoom-body');
  const zoomTitle = materialZoom.querySelector('h2');
  let zoomOrigin = null;
  const materialSelector = 'pre, .s5-table-scroll, .exam-table-scroll, .table-scroll, .official-page-scroll, .exam-diagram-scroll, .question-diagram, .s11-table-scroll, .s11-lab-code, [data-s11-role="variables"]';
  function addZoomControls() {
    for (const source of root.querySelectorAll(materialSelector)) {
      if (source.closest('dialog, [data-s11-no-zoom]')) continue;
      // Some code examples place a PRE inside a scroll region. Offer one control.
      if (source.parentElement.closest(materialSelector)) continue;
      const existing = sourceButtons.get(source);
      if (existing?.isConnected) continue;
      const type = source.matches('.official-page-scroll') ? 'paper extract' : source.matches('.exam-diagram-scroll, .question-diagram') ? 'diagram' : source.matches('pre, .s11-lab-code') ? 'code' : 'table';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 's11-enlarge';
      button.dataset.s11Enlarge = '';
      button.textContent = `Enlarge ${type}`;
      button.setAttribute('aria-haspopup', 'dialog');
      source.before(button);
      zoomSources.set(button, { source, type });
      sourceButtons.set(source, button);
    }
  }
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-s11-enlarge]');
    if (!button) return;
    const material = zoomSources.get(button);
    if (!material || material.source.closest('[hidden], details:not([open])')) return;
    const clone = material.source.cloneNode(true);
    clone.querySelectorAll('button, input, select, textarea, details, script').forEach(element => element.remove());
    // SVG marker links, scoped styles and accessible names need their IDs.
    // Namespace the copied IDs so the original page still has unique bookmarks.
    const identities = new Map();
    for (const element of [clone, ...clone.querySelectorAll('[id]')]) {
      if (!element.id) continue;
      identities.set(element.id, `s11-zoom-${element.id}`);
      element.id = identities.get(element.id);
    }
    for (const element of [clone, ...clone.querySelectorAll('*')]) {
      for (const attribute of [...element.attributes]) {
        if (attribute.name === 'id') continue;
        if (/^data-s(?:5|11)-/.test(attribute.name)) {
          element.removeAttribute(attribute.name);
          continue;
        }
        let value = attribute.value;
        for (const [oldId, newId] of identities) value = value.replaceAll(`#${oldId}`, `#${newId}`);
        if (['aria-labelledby', 'aria-describedby'].includes(attribute.name)) value = value.split(' ').map(id => identities.get(id) ?? id).join(' ');
        if (value !== attribute.value) element.setAttribute(attribute.name, value);
      }
      if (element.tagName.toLowerCase() === 'style') {
        for (const [oldId, newId] of identities) element.textContent = element.textContent.replaceAll(`#${oldId}`, `#${newId}`);
      }
    }
    zoomTitle.textContent = `Enlarged ${material.type}`;
    zoomBody.replaceChildren(clone);
    zoomOrigin = { button, x: window.scrollX, y: window.scrollY };
    materialZoom.showModal();
    const activeLine = clone.querySelector('.is-current');
    zoomBody.scrollLeft = material.source.scrollLeft;
    zoomBody.scrollTop = activeLine
      ? Math.max(0, activeLine.getBoundingClientRect().top - zoomBody.getBoundingClientRect().top - (zoomBody.clientHeight - activeLine.offsetHeight) / 2)
      : material.source.scrollTop;
  });
  materialZoom.addEventListener('close', () => {
    zoomBody.replaceChildren();
    if (!zoomOrigin) return;
    zoomOrigin.button.focus({ preventScroll: true });
    window.scrollTo({ left: zoomOrigin.x, top: zoomOrigin.y, behavior: 'instant' });
    zoomOrigin = null;
  });
  materialZoom.addEventListener('click', event => {
    if (event.target !== materialZoom) return;
    const rect = materialZoom.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) materialZoom.close();
  });
  let zoomUpdateQueued = false;
  new MutationObserver(() => {
    if (zoomUpdateQueued) return;
    zoomUpdateQueued = true;
    queueMicrotask(() => { zoomUpdateQueued = false; addZoomControls(); });
  }).observe(root.querySelector('.s5-content'), { childList: true, subtree: true });
  addZoomControls();
})();
