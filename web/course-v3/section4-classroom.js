// Progressive enhancement: one DOM keeps the experiments intact across both modes.
(() => {
  const root = document.querySelector('[data-s4-classroom]');
  if (!root) return;
  const groups = [...root.querySelectorAll('[data-s4-group]')];
  const navigation = root.querySelector('.s4-navigation');
  const stages = root.querySelector('.s4-phases');
  const modeSwitch = root.querySelector('.s4-mode-switch');
  const position = navigation.querySelector('[role="status"]');
  const directory = root.querySelector('.s4-directory');
  const labels = { observe: 'Observe', explain: 'Explain', worked: 'Work together', experiment: 'Experiment', check: 'Check', papers: 'Past paper', recap: 'Connect' };
  const cursors = groups.map(() => ({ phase: 0, steps: {} }));
  let groupIndex = 0;
  let mode = 'classroom';

  const currentGroup = () => groups[groupIndex];
  const currentCursor = () => cursors[groupIndex];
  const phasesFor = group => [...group.querySelectorAll('[data-s4-phase]')];
  const currentPhase = () => phasesFor(currentGroup())[currentCursor().phase];
  const stepsFor = phase => [...phase.querySelectorAll('[data-s4-step-panel]')];
  const currentStep = () => currentCursor().steps[currentPhase().dataset.s4Phase] ?? 0;
  function closeAnswers() {
    root.querySelectorAll('.s4-group details[open], .s4-reference details[open]').forEach(detail => { detail.open = false; });
  }
  function leave() {
    closeAnswers();
    root.querySelectorAll('.s4-reference[open]').forEach(detail => { detail.open = false; });
    document.dispatchEvent(new CustomEvent('s4:leave'));
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
        const key = phase.dataset.s4Phase;
        const steps = stepsFor(phase);
        const stepIndex = Math.max(0, Math.min(cursor.steps[key] ?? 0, Math.max(0, steps.length - 1)));
        cursor.steps[key] = stepIndex;
        steps.forEach((step, i) => { step.hidden = classroom && i !== stepIndex; });
        phase.querySelectorAll('[data-s4-step]').forEach(button => button.setAttribute('aria-current', Number(button.dataset.s4Step) === stepIndex ? 'step' : 'false'));
        const conclusion = phase.querySelector('[data-s4-worked-conclusion]');
        if (conclusion) conclusion.hidden = classroom && stepIndex !== steps.length - 1;
        phase.querySelectorAll('[data-s4-question-fold]').forEach(detail => { detail.open = classroom; });
      });
    });
    const phases = phasesFor(currentGroup());
    const cursor = currentCursor();
    const phase = currentPhase();
    const steps = stepsFor(phase);
    stages.innerHTML = phases.map((item, index) => `<button type="button" data-s4-stage="${index}" aria-current="${index === cursor.phase ? 'step' : 'false'}">${labels[item.dataset.s4Phase]}</button>`).join('');
    stages.hidden = !classroom;
    navigation.hidden = !classroom;
    modeSwitch.querySelectorAll('[data-s4-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.s4Mode === mode)));
    const atStart = groupIndex === 0 && cursor.phase === 0 && currentStep() === 0;
    const atEnd = groupIndex === groups.length - 1 && cursor.phase === phases.length - 1 && (!steps.length || currentStep() === steps.length - 1);
    navigation.querySelector('[data-s4-prev]').disabled = atStart;
    navigation.querySelector('[data-s4-next]').disabled = atEnd;
    navigation.querySelector('[data-s4-next]').textContent = atEnd ? 'Topic complete' : cursor.phase === phases.length - 1 ? 'Next concept →' : 'Next →';
    position.textContent = `Concept ${groupIndex + 1} / ${groups.length} · ${labels[phase.dataset.s4Phase]}${steps.length ? ` · Step ${currentStep() + 1} / ${steps.length}` : ''}`;
    directory.querySelectorAll('a').forEach(link => link.setAttribute('aria-current', link.hash === `#${currentGroup().id}` ? 'location' : 'false'));
    if (scroll) {
      const focus = steps[currentStep()]?.querySelector('h3') ?? currentGroup().querySelector('h2');
      focus.focus({ preventScroll: true });
      root.querySelector('[data-s4-scroll-anchor]').scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }
  function enterPhase(index, direction = 1) {
    currentCursor().phase = index;
    const phase = currentPhase();
    currentCursor().steps[phase.dataset.s4Phase] = direction < 0 ? Math.max(0, stepsFor(phase).length - 1) : 0;
  }
  function move(direction) {
    leave();
    const phase = currentPhase();
    const cursor = currentCursor();
    const steps = stepsFor(phase);
    const candidate = currentStep() + direction;
    if (steps.length && candidate >= 0 && candidate < steps.length) cursor.steps[phase.dataset.s4Phase] = candidate;
    else if (cursor.phase + direction >= 0 && cursor.phase + direction < phasesFor(currentGroup()).length) enterPhase(cursor.phase + direction, direction);
    else if (groupIndex + direction >= 0 && groupIndex + direction < groups.length) {
      groupIndex += direction;
      enterPhase(direction < 0 ? phasesFor(currentGroup()).length - 1 : 0, direction);
    }
    render(true);
    rememberLocation();
  }
  function followHash(scroll = true) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = id ? document.getElementById(id) : null;
    let group = target?.closest('[data-s4-group]');
    let phase = target?.closest('[data-s4-phase]');
    if (id === 'visual-and-core') { group = groups[0]; phase = null; }
    if (id === 'past-paper-questions' || id === 'original-exam-style-question') {
      group = groups.find(item => item.querySelector('[data-s4-phase="papers"]'));
      phase = group?.querySelector('[data-s4-phase="papers"]');
    }
    if (!group) {
      if (target?.matches('.s4-reference, .s4-directory')) {
        leave();
        target.open = true;
        if (scroll) target.scrollIntoView({ block: 'start' });
      }
      return;
    }
    leave();
    groupIndex = groups.indexOf(group);
    currentCursor().phase = phase ? phasesFor(group).indexOf(phase) : 0;
    const step = target?.closest('[data-s4-step-panel]');
    if (phase) currentCursor().steps[phase.dataset.s4Phase] = step ? stepsFor(phase).indexOf(step) : 0;
    directory.open = false;
    render(scroll && mode === 'classroom');
    if (target?.matches('.exam-question')) target.closest('[data-s4-question-fold]').open = true;
    else if (phase?.dataset.s4Phase === 'papers') phase.querySelector('[data-s4-question-fold]').open = true;
    if (scroll && (mode === 'reading' || target?.matches('.exam-question'))) target.scrollIntoView({ block: 'start' });
  }
  navigation.addEventListener('click', event => {
    if (event.target.closest('[data-s4-prev]')) move(-1);
    if (event.target.closest('[data-s4-next]')) move(1);
    if (event.target.closest('[data-s4-reset]')) {
      leave();
      cursors[groupIndex] = { phase: 0, steps: {} };
      currentGroup().querySelectorAll('[data-s4-lab]').forEach(lab => lab.dispatchEvent(new CustomEvent('s4:reset')));
      render(true);
      rememberLocation();
    }
  });
  stages.addEventListener('click', event => {
    const button = event.target.closest('[data-s4-stage]');
    if (!button) return;
    leave();
    currentCursor().phase = Number(button.dataset.s4Stage);
    render(true);
    rememberLocation();
  });
  modeSwitch.addEventListener('click', event => {
    const button = event.target.closest('[data-s4-mode]');
    if (!button || button.dataset.s4Mode === mode) return;
    leave();
    mode = button.dataset.s4Mode;
    render(mode === 'classroom');
    if (mode === 'reading') currentPhase().scrollIntoView({ block: 'start' });
  });
  root.addEventListener('click', event => {
    const step = event.target.closest('[data-s4-step]');
    if (step) {
      leave();
      const phase = step.closest('[data-s4-phase]');
      currentCursor().steps[phase.dataset.s4Phase] = Number(step.dataset.s4Step);
      render(true);
      rememberLocation();
    }
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (link && link.hash === location.hash) { event.preventDefault(); followHash(); }
  });
  window.addEventListener('hashchange', () => followHash());
  root.classList.add('s4-enhanced');
  modeSwitch.hidden = false;
  render();
  followHash(Boolean(location.hash));

  // Eagerly load every local image on this page, including folded mark schemes.
  // This reports only image readiness; it does not promise first-load offline access.
  const resourceStatus = root.querySelector('[data-s4-resources]');
  resourceStatus.hidden = false;
  const images = [...root.querySelectorAll('img')];
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
