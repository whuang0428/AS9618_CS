// Progressive enhancement: one DOM keeps the experiments intact across both modes.
(() => {
  const root = document.querySelector('[data-s8-classroom]');
  if (!root) return;
  const groups = [...root.querySelectorAll('[data-s5-group]')];
  const navigation = root.querySelector('.s5-navigation');
  const stages = root.querySelector('.s5-phases');
  const modeSwitch = root.querySelector('.s5-mode-switch');
  const position = navigation.querySelector('[role="status"]');
  const directory = root.querySelector('.s5-directory');
  const toolbar = root.querySelector('.s5-toolbar');
  new ResizeObserver(() => root.style.setProperty('--s8-toolbar-height', `${toolbar.getBoundingClientRect().height}px`)).observe(toolbar);
  const labels = { observe: 'Observe', prepare: 'Recall', explain: 'Explain', worked: 'Work together', experiment: 'Experiment', check: 'Check', papers: 'Past paper', recap: 'Connect' };
  const cursors = groups.map(() => ({ phase: 0, steps: {} }));
  let groupIndex = 0;
  let mode = 'classroom';

  const currentGroup = () => groups[groupIndex];
  const currentCursor = () => cursors[groupIndex];
  const phasesFor = group => [...group.querySelectorAll('[data-s5-phase]')];
  const currentPhase = () => phasesFor(currentGroup())[currentCursor().phase];
  const stepsFor = phase => [...phase.querySelectorAll('[data-s5-step-panel]')];
  const currentStep = () => currentCursor().steps[currentPhase().dataset.s5Phase] ?? 0;
  function closeAnswers() {
    root.querySelectorAll('.s5-group details[open]:not([data-s5-question-fold]):not(.s8-source-context):not(.s8-sql-source):not(.s8-sql-source details), .s5-reference details[open]').forEach(detail => { detail.open = false; });
  }
  function leave() {
    closeAnswers();
    root.querySelectorAll('.s5-reference[open]').forEach(detail => { detail.open = false; });
    document.dispatchEvent(new CustomEvent('s5:leave'));
  }
  function rememberLocation() {
    const phase = currentPhase();
    const target = stepsFor(phase)[currentStep()] ?? phase;
    history.replaceState(null, '', `#${target.id}`);
  }
  function render(scroll = false) {
    const classroom = mode === 'classroom';
    root.dataset.mode = mode;
    groups.forEach((group, index) => {
      group.hidden = classroom && index !== groupIndex;
      const cursor = cursors[index];
      const phases = phasesFor(group);
      cursor.phase = Math.max(0, Math.min(cursor.phase, phases.length - 1));
      phases.forEach((phase, phaseIndex) => {
        phase.hidden = classroom && phaseIndex !== cursor.phase;
        const key = phase.dataset.s5Phase;
        const steps = stepsFor(phase);
        const stepIndex = Math.max(0, Math.min(cursor.steps[key] ?? 0, Math.max(0, steps.length - 1)));
        cursor.steps[key] = stepIndex;
        steps.forEach((step, i) => { step.hidden = classroom && i !== stepIndex; });
        phase.querySelectorAll('[data-s5-step]').forEach(button => button.setAttribute('aria-current', Number(button.dataset.s5Step) === stepIndex ? 'step' : 'false'));
        const conclusion = phase.querySelector('[data-s5-worked-conclusion]');
        if (conclusion) conclusion.hidden = classroom && stepIndex !== steps.length - 1;
        phase.querySelectorAll('[data-s5-question-fold]').forEach(detail => { detail.open = classroom; });
      });
    });
    const phases = phasesFor(currentGroup());
    const cursor = currentCursor();
    const phase = currentPhase();
    const steps = stepsFor(phase);
    stages.innerHTML = classroom ? phases.map((item, index) => `<button type="button" data-s5-stage="${index}" aria-current="${index === cursor.phase ? 'step' : 'false'}">${labels[item.dataset.s5Phase]}</button>`).join('') : '<button type="button" data-s5-resume>Teach from this point →</button>';
    stages.hidden = false;
    navigation.hidden = !classroom;
    modeSwitch.querySelectorAll('[data-s5-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.s5Mode === mode)));
    const atStart = !currentGroup().dataset.s8PrevHref && cursor.phase === 0 && currentStep() === 0;
    const atEnd = !currentGroup().dataset.s8NextHref && cursor.phase === phases.length - 1 && (!steps.length || currentStep() === steps.length - 1);
    navigation.querySelector('[data-s5-prev]').disabled = atStart;
    navigation.querySelector('[data-s5-next]').disabled = atEnd;
    navigation.querySelector('[data-s5-next]').textContent = atEnd ? 'Topic complete' : cursor.phase === phases.length - 1 ? 'Next concept →' : 'Next →';
    position.textContent = `Concept ${groupIndex + 1} / ${groups.length} · ${labels[phase.dataset.s5Phase]}${steps.length ? ` · Step ${currentStep() + 1} / ${steps.length}` : ''}`;
    directory.querySelectorAll('a').forEach(link => link.setAttribute('aria-current', link.hash === `#${currentGroup().id}` ? 'location' : 'false'));
    if (scroll) {
      const focus = steps[currentStep()]?.querySelector('h3') ?? currentGroup().querySelector('h2');
      focus.focus({ preventScroll: true });
      root.querySelector('[data-s5-scroll-anchor]').scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }
  function enterPhase(index, direction = 1) {
    currentCursor().phase = index;
    const phase = currentPhase();
    currentCursor().steps[phase.dataset.s5Phase] = direction < 0 ? Math.max(0, stepsFor(phase).length - 1) : 0;
  }
  function move(direction) {
    leave();
    const phase = currentPhase();
    const cursor = currentCursor();
    const steps = stepsFor(phase);
    const candidate = currentStep() + direction;
    if (steps.length && candidate >= 0 && candidate < steps.length) cursor.steps[phase.dataset.s5Phase] = candidate;
    else if (cursor.phase + direction >= 0 && cursor.phase + direction < phasesFor(currentGroup()).length) enterPhase(cursor.phase + direction, direction);
    else {
      const href = direction < 0 ? currentGroup().dataset.s8PrevHref : currentGroup().dataset.s8NextHref;
      if (href) {
        const url = new URL(href, location.href);
        const nextIndex = groups.findIndex(group => `#${group.id}` === url.hash);
        if (url.pathname === location.pathname && nextIndex >= 0) {
          groupIndex = nextIndex;
          enterPhase(direction < 0 ? phasesFor(currentGroup()).length - 1 : 0, direction);
        } else {
          location.assign(href + (direction < 0 ? '--recap' : ''));
          return;
        }
      }
    }
    render(true);
    rememberLocation();
  }
  function followHash(scroll = true) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = id ? document.getElementById(id) : null;
    let group = target?.closest('[data-s5-group]');
    let phase = target?.closest('[data-s5-phase]');
    if (id === 'visual-and-core') { group = groups[0]; phase = null; }
    if (id === 'past-paper-questions' || id === 'original-exam-style-question') {
      group = groups.find(item => item.querySelector('[data-s5-phase="papers"]'));
      phase = group?.querySelector('[data-s5-phase="papers"]');
    }
    if (!group) {
      if (target?.matches('.s5-reference, .s5-directory')) {
        leave();
        target.open = true;
        if (scroll) target.scrollIntoView({ block: 'start' });
      }
      return;
    }
    leave();
    groupIndex = groups.indexOf(group);
    currentCursor().phase = phase ? phasesFor(group).indexOf(phase) : 0;
    const step = target?.closest('[data-s5-step-panel]');
    if (phase) currentCursor().steps[phase.dataset.s5Phase] = step ? stepsFor(phase).indexOf(step) : 0;
    directory.open = false;
    render(scroll && mode === 'classroom');
    if (target?.matches('.exam-question')) target.closest('[data-s5-question-fold]').open = true;
    else if (phase?.dataset.s5Phase === 'papers') phase.querySelector('[data-s5-question-fold]').open = true;
    if (scroll && (mode === 'reading' || target?.matches('.exam-question'))) target.scrollIntoView({ block: 'start' });
  }
  navigation.addEventListener('click', event => {
    if (event.target.closest('[data-s5-hide]')) closeAnswers();
    if (event.target.closest('[data-s5-prev]')) move(-1);
    if (event.target.closest('[data-s5-next]')) move(1);
    if (event.target.closest('[data-s5-reset]')) {
      leave();
      cursors[groupIndex] = { phase: 0, steps: {} };
      currentGroup().dispatchEvent(new CustomEvent('s5:reset', { bubbles: true }));
      render(true);
      rememberLocation();
    }
  });
  function captureReadingPosition() {
    const candidates = groups.flatMap(group => phasesFor(group).map(phase => ({ group, phase, rect: phase.getBoundingClientRect() })));
    const visible = candidates.find(item => item.rect.bottom > 140 && item.rect.top < window.innerHeight);
    if (!visible) return;
    groupIndex = groups.indexOf(visible.group);
    currentCursor().phase = phasesFor(visible.group).indexOf(visible.phase);
    const steps = stepsFor(visible.phase);
    const visibleStep = steps.findIndex(step => step.getBoundingClientRect().bottom > 140);
    currentCursor().steps[visible.phase.dataset.s5Phase] = Math.max(0, visibleStep);
  }
  stages.addEventListener('click', event => {
    if (event.target.closest('[data-s5-resume]')) {
      captureReadingPosition();
      leave();
      mode = 'classroom';
      render(true);
      rememberLocation();
      return;
    }
    const button = event.target.closest('[data-s5-stage]');
    if (!button) return;
    leave();
    currentCursor().phase = Number(button.dataset.s5Stage);
    render(true);
    rememberLocation();
  });
  modeSwitch.addEventListener('click', event => {
    const button = event.target.closest('[data-s5-mode]');
    if (!button || button.dataset.s5Mode === mode) return;
    leave();
    mode = button.dataset.s5Mode;
    render(mode === 'classroom');
    if (mode === 'reading') currentPhase().scrollIntoView({ block: 'start' });
  });
  root.addEventListener('click', event => {
    const step = event.target.closest('[data-s5-step]');
    if (step) {
      leave();
      const phase = step.closest('[data-s5-phase]');
      currentCursor().steps[phase.dataset.s5Phase] = Number(step.dataset.s5Step);
      render(true);
      rememberLocation();
    }
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (link && link.hash === location.hash) { event.preventDefault(); followHash(); }
  });
  const zoom = root.querySelector('.s5-zoom');
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-s5-zoom]');
    if (!button) return;
    const original = button.querySelector('img');
    const image = zoom.querySelector('img');
    image.src = original.src;
    image.alt = original.alt;
    zoom.showModal();
  });
  const tableDialog = document.createElement('dialog');
  tableDialog.className = 's8-table-zoom';
  tableDialog.setAttribute('aria-label', 'Enlarged data table');
  tableDialog.innerHTML = '<form method="dialog"><button autofocus>Close table</button></form><div data-s8-table-content></div>';
  root.append(tableDialog);
  function addTableControls() {
    root.querySelectorAll('.s5-table-scroll, .s8-table-wrap, .s8-sql-lab .table-wrap').forEach(wrapper => {
      if (wrapper.dataset.s8Enlarge || !wrapper.querySelector('table') || wrapper.closest('dialog')) return;
      wrapper.dataset.s8Enlarge = 'true';
      const button = document.createElement('button');
      button.type = 'button'; button.className = 's8-enlarge-table'; button.textContent = 'Enlarge table';
      button.addEventListener('click', () => {
        const copy = wrapper.querySelector('table').cloneNode(true);
        copy.querySelectorAll('[id]').forEach(item => item.removeAttribute('id'));
        copy.querySelectorAll('button,input,select,textarea').forEach(item => { item.disabled = true; });
        tableDialog.querySelector('[data-s8-table-content]').replaceChildren(copy);
        tableDialog.showModal();
      });
      wrapper.prepend(button);
    });
  }
  let tableFrame;
  new MutationObserver(() => { cancelAnimationFrame(tableFrame); tableFrame = requestAnimationFrame(addTableControls); }).observe(root, { childList: true, subtree: true });
  addTableControls();
  window.addEventListener('keydown', event => {
    if (mode !== 'classroom' || root.querySelector('dialog[open]') || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('input, select, textarea, [contenteditable="true"], summary, pre, [role="region"], [tabindex="0"]')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  window.addEventListener('hashchange', () => followHash());
  root.classList.add('s5-enhanced');
  modeSwitch.hidden = false;
  render();
  followHash(Boolean(location.hash));

  // Eagerly load every local image on this page, including folded mark schemes.
  // This reports only image readiness; it does not promise first-load offline access.
  const resourceStatus = root.querySelector('[data-s5-resources]');
  resourceStatus.hidden = false;
  const images = [...root.querySelectorAll('img[src]')];
  images.forEach(image => { image.loading = 'eager'; });
  let loaded = 0;
  let failed = 0;
  function updateResources() {
    const done = loaded + failed === images.length;
    resourceStatus.dataset.ready = done && failed === 0 ? 'true' : 'false';
    resourceStatus.textContent = done ? failed ? `${failed} page image${failed === 1 ? '' : 's'} could not load. Reconnect and reload before using those materials.` : 'This page’s images are ready.' : `Loading this page’s images: ${loaded + failed} / ${images.length}`;
    if (!navigator.onLine) resourceStatus.textContent += ' Offline: stay on this loaded page.';
  }
  images.forEach(image => {
    const finish = ok => { if (ok) loaded += 1; else failed += 1; updateResources(); };
    if (image.complete) finish(image.naturalWidth > 0);
    else {
      image.addEventListener('load', () => finish(true), { once: true });
      image.addEventListener('error', () => finish(false), { once: true });
    }
  });
  window.addEventListener('online', updateResources);
  window.addEventListener('offline', updateResources);
  updateResources();
})();
