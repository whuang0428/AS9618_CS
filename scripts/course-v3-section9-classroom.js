// Section 9 follows learning dependencies across stable lesson routes.
// The shared controller still owns each concept's stages and reading position.
(() => {
  const root = document.querySelector('[data-s9-classroom]');
  if (!root) return;
  const groups = [...root.querySelectorAll('[data-s9-group]')];
  const navigation = root.querySelector('.s5-navigation');
  const toolbar = root.querySelector('.s5-toolbar');
  let readingAnchor = null;
  let resumingReading = false;
  const current = () => groups.find(group => !group.hidden);
  const activePhase = group => [...group.querySelectorAll('[data-s5-phase]')].find(phase => !phase.hidden);
  const hide = group => group.dispatchEvent(new CustomEvent('s9:hide', { bubbles: true }));
  const hideAll = () => groups.forEach(hide);
  const closeGroupAnswers = group => group.querySelectorAll('details[open]:not([data-s5-question-fold])').forEach(detail => { detail.open = false; });
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
  }
  if (toolbar && typeof ResizeObserver === 'function') {
    const measureToolbar = () => root.style.setProperty('--s9-toolbar-height', `${Math.ceil(toolbar.getBoundingClientRect().height)}px`);
    new ResizeObserver(measureToolbar).observe(toolbar);
    measureToolbar();
  }

  document.addEventListener('s5:leave', hideAll);
  document.addEventListener('s5:reset', event => {
    const group = event.target.closest?.('[data-s9-group]');
    if (group) group.dispatchEvent(new CustomEvent('s9:reset', { bubbles: true }));
  });
  function boundary(direction) {
    if (root.dataset.mode !== 'classroom') return null;
    const group = current();
    if (!group) return null;
    const phase = activePhase(group);
    const atBoundary = phase?.dataset.s5Phase === (direction < 0 ? 'observe' : 'recap');
    if (!atBoundary) return null;
    return { group, href: direction < 0 ? group.dataset.s9Prev : group.dataset.s9Next };
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
      const target = referenceBookmark ?? [...phase.querySelectorAll('[data-s5-step-panel]')].find(step => !step.hidden) ?? phase;
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
    if (!resumingReading && root.dataset.mode === 'reading' && event.target.closest('[data-s5-resume], [data-s5-mode="classroom"]')) {
      resumeReading(event);
      return;
    }
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (link && root.dataset.mode === 'reading') {
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && /\/lesson-0(?:49|5[0-7])\/$/.test(url.pathname) && url.pathname !== location.pathname) {
        event.preventDefault();
        url.searchParams.set('view', 'reading');
        location.assign(url.href);
      }
    }
  }, true);
  window.addEventListener('keydown', event => {
    if (root.dataset.mode !== 'classroom' || root.querySelector('.s5-zoom')?.open || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('input, select, textarea, [contenteditable="true"], summary, pre, [role="region"], [tabindex="0"]')) return;
    if (event.key === 'ArrowRight') moveAcrossConcept(1, event);
    if (event.key === 'ArrowLeft') moveAcrossConcept(-1, event);
  }, true);
  // Changing a prediction must never leave an answer to the previous input visible.
  for (const eventName of ['input', 'change']) root.addEventListener(eventName, event => {
    // A display choice keeps the same algorithm and trace; actual input changes reset it.
    if (event.target.matches('[data-s9-role="view"]')) return;
    const group = event.target.closest('[data-s9-group]');
    if (!group) return;
    closeGroupAnswers(group);
    hide(group);
  }, true);

  let requestedReading = new URL(location.href).searchParams.get('view') === 'reading';
  function syncNavigation() {
    if (!root.classList.contains('s5-enhanced')) return;
    if (requestedReading) {
      requestedReading = false;
      root.querySelector('[data-s5-mode="reading"]').click();
      queueMicrotask(() => revealReferenceBookmark(false));
    }
    const group = current();
    if (!group || root.dataset.mode !== 'classroom') return;
    const phase = activePhase(group);
    const previous = navigation.querySelector('[data-s5-prev]');
    const next = navigation.querySelector('[data-s5-next]');
    if (phase?.dataset.s5Phase === 'observe') {
      const atStart = !group.dataset.s9Prev;
      if (previous.disabled !== atStart) previous.disabled = atStart;
    }
    if (phase?.dataset.s5Phase === 'recap') {
      const complete = !group.dataset.s9Next;
      if (next.disabled !== complete) next.disabled = complete;
      const label = complete ? 'Section complete' : 'Next concept →';
      if (next.textContent !== label) next.textContent = label;
    }
    const position = navigation.querySelector('[role="status"]');
    const globalPosition = position.textContent.replace(/^Concept \d+ \/ \d+/, `Concept ${group.dataset.s9Order} / ${group.dataset.s9Total}`);
    if (position.textContent !== globalPosition) position.textContent = globalPosition;
  }
  new MutationObserver(syncNavigation).observe(root, { subtree: true, attributes: true, attributeFilter: ['hidden', 'data-mode', 'class'] });
  syncNavigation();

  // Practice questions live in folded reference sections, outside the guided groups.
  function revealReferenceBookmark(scroll) {
    const target = hashTarget();
    const reference = target?.closest('.s5-reference');
    if (!reference) return;
    root.querySelectorAll('.s5-reference details[open]').forEach(detail => { detail.open = false; });
    hideAll();
    reference.open = true;
    for (let parent = target.parentElement; parent && parent !== reference; parent = parent.parentElement) {
      if (parent.matches('details')) parent.open = true;
    }
    if (scroll) target.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', () => queueMicrotask(() => {
    revealReferenceBookmark(true);
    const target = hashTarget();
    if (root.dataset.mode === 'reading' && target?.closest('[data-s5-group]')) readingAnchor = { target, scrollY: window.scrollY };
  }));
  queueMicrotask(() => revealReferenceBookmark(Boolean(location.hash)));
})();
