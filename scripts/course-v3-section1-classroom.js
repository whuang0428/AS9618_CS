// Section 1 follows learning dependencies across stable lesson routes.
// The shared controller still owns each concept's stages and reading position.
(() => {
  const root = document.querySelector('[data-s1-classroom]');
  if (!root) return;
  const groups = [...root.querySelectorAll('[data-s1-group]')];
  const navigation = root.querySelector('.s5-navigation');
  const current = () => groups.find(group => !group.hidden);
  const activePhase = group => [...group.querySelectorAll('[data-s5-phase]')].find(phase => !phase.hidden);
  const hide = group => group.dispatchEvent(new CustomEvent('s1:hide', { bubbles: true }));
  const hideAll = () => groups.forEach(hide);
  const closeGroupAnswers = group => group.querySelectorAll('details[open]:not([data-s5-question-fold]):not(.s1-lab-setup)').forEach(detail => { detail.open = false; });

  document.addEventListener('s5:leave', hideAll);
  document.addEventListener('s5:reset', event => {
    const group = event.target.closest?.('[data-s1-group]');
    if (group) group.dispatchEvent(new CustomEvent('s1:reset', { bubbles: true }));
  });
  function boundary(direction) {
    if (root.dataset.mode !== 'classroom') return null;
    const group = current();
    if (!group) return null;
    const phase = activePhase(group);
    const atBoundary = phase?.dataset.s5Phase === (direction < 0 ? 'observe' : 'recap');
    if (!atBoundary) return null;
    return { group, href: direction < 0 ? group.dataset.s1Prev : group.dataset.s1Next };
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
    if (root.dataset.mode === 'reading' && event.target.closest('[data-s5-resume]')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const top = Math.max(0, root.querySelector('.s5-toolbar').getBoundingClientRect().bottom);
      const visibleHeight = element => {
        const rect = element.getBoundingClientRect();
        return Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, top));
      };
      const mostVisible = elements => [...elements].reduce((best, element) => !best || visibleHeight(element) > visibleHeight(best) ? element : best, null);
      const phase = mostVisible(root.querySelectorAll('[data-s5-phase]'));
      const step = phase && mostVisible(phase.querySelectorAll('[data-s5-step-panel]'));
      const target = step && visibleHeight(step) > 0 ? step : phase;
      root.querySelector('[data-s5-mode="classroom"]').click();
      if (target) {
        const hash = `#${target.id}`;
        if (location.hash === hash) window.dispatchEvent(new HashChangeEvent('hashchange'));
        else location.hash = hash;
      }
      return;
    }
    // Classroom restores its saved cursor. The sticky "Teach from this point"
    // control separately resumes from the current reading position.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (link && root.dataset.mode === 'reading') {
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && /\/lesson-00[1-6]\/$/.test(url.pathname) && url.pathname !== location.pathname) {
        event.preventDefault();
        url.searchParams.set('view', 'reading');
        location.assign(url.href);
      }
    }
  }, true);
  window.addEventListener('keydown', event => {
    if (root.querySelector('dialog[open]')) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') event.stopImmediatePropagation();
      return;
    }
    if (root.dataset.mode !== 'classroom' || root.querySelector('dialog[open]') || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('input, select, textarea, [contenteditable="true"], summary, pre, .s1-lab, [role="region"], [tabindex="0"]')) return;
    if (event.key === 'ArrowRight') moveAcrossConcept(1, event);
    if (event.key === 'ArrowLeft') moveAcrossConcept(-1, event);
  }, true);
  // Changing a prediction must never leave an answer to the previous input visible.
  for (const eventName of ['input', 'change']) root.addEventListener(eventName, event => {
    const group = event.target.closest('[data-s1-group]');
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
    root.querySelectorAll('[data-s5-question-fold]').forEach(detail => { detail.open = true; });
    const group = current();
    if (!group || root.dataset.mode !== 'classroom') return;
    const phase = activePhase(group);
    const previous = navigation.querySelector('[data-s5-prev]');
    const next = navigation.querySelector('[data-s5-next]');
    if (phase?.dataset.s5Phase === 'observe') {
      const atStart = !group.dataset.s1Prev;
      if (previous.disabled !== atStart) previous.disabled = atStart;
    }
    if (phase?.dataset.s5Phase === 'recap') {
      const complete = !group.dataset.s1Next;
      if (next.disabled !== complete) next.disabled = complete;
      const label = complete ? 'Section complete' : 'Next concept →';
      if (next.textContent !== label) next.textContent = label;
    }
    const position = navigation.querySelector('[role="status"]');
    const globalPosition = position.textContent.replace(/^Concept \d+ \/ \d+/, `Concept ${group.dataset.s1Order} / ${group.dataset.s1Total}`);
    if (position.textContent !== globalPosition) position.textContent = globalPosition;
  }
  new MutationObserver(syncNavigation).observe(root, { subtree: true, attributes: true, attributeFilter: ['hidden', 'data-mode', 'class'] });
  syncNavigation();

  const materialZoom = document.createElement('dialog');
  materialZoom.className = 's1-table-zoom';
  materialZoom.setAttribute('aria-label', 'Enlarged teaching material');
  materialZoom.innerHTML = '<form method="dialog"><button autofocus>Close material</button></form><div></div>';
  root.append(materialZoom);
  root.querySelectorAll('.s5-table-scroll, .official-extract').forEach(material => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 's1-enlarge-table';
    button.textContent = material.matches('.official-extract') ? 'Enlarge original extract' : 'Enlarge table';
    button.addEventListener('click', () => {
      const copy = material.cloneNode(true);
      copy.querySelectorAll('button').forEach(item => item.remove());
      copy.querySelectorAll('[id]').forEach(item => item.removeAttribute('id'));
      materialZoom.querySelector('div').replaceChildren(copy);
      materialZoom.showModal();
    });
    material.before(button);
  });
  // Practice questions live in folded reference sections, outside the guided groups.
  function revealReferenceBookmark(scroll) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = id ? document.getElementById(id) : null;
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
  window.addEventListener('hashchange', () => queueMicrotask(() => revealReferenceBookmark(true)));
  queueMicrotask(() => revealReferenceBookmark(Boolean(location.hash)));
  // The browser's initial fragment scroll runs after the shared controller.
  // Restore the teaching canvas so a bookmarked phase does not cover its
  // concept heading with the sticky toolbar when the page finishes loading.
  window.addEventListener('load', () => requestAnimationFrame(() => {
    if (root.dataset.mode !== 'classroom') return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (document.getElementById(id)?.closest('[data-s1-group]')) {
      root.querySelector('[data-s5-scroll-anchor]').scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }), { once: true });
})();
