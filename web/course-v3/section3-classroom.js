// A focused classroom journey; every explanation remains in the HTML for review.
(() => {
  const root = document.querySelector('[data-s3-classroom]');
  if (!root) return;
  const groups = [...root.querySelectorAll('[data-s3-group]')];
  const nav = root.querySelector('.s3-navigation');
  const stageNav = root.querySelector('.s3-phases');
  const status = nav.querySelector('[role="status"]');
  const label = { observe: 'Observe', explain: 'Explain', explore: 'Explore', check: 'Check', exam: 'Past paper', connect: 'Connect' };
  let groupIndex = 0;
  let stageIndex = 0;
  let stepIndex = 0;

  const active = () => groups[groupIndex];
  const stages = () => [...active().querySelectorAll('[data-s3-phase]')];
  const closeAnswers = () => root.querySelectorAll('.s3-group details[open], .s3-reference details[open]').forEach(el => { el.open = false; });
  function leave() {
    closeAnswers();
    root.querySelectorAll('.s3-reference[open]').forEach(el => { el.open = false; });
    document.dispatchEvent(new CustomEvent('s3:leave'));
  }
  function render(scroll = false) {
    groups.forEach((group, i) => { group.hidden = i !== groupIndex; });
    const panels = stages();
    stageIndex = Math.max(0, Math.min(stageIndex, panels.length - 1));
    panels.forEach((panel, i) => { panel.hidden = i !== stageIndex; });
    const steps = [...active().querySelectorAll('[data-s3-step-panel]')];
    stepIndex = Math.max(0, Math.min(stepIndex, steps.length - 1));
    steps.forEach((panel, i) => { panel.hidden = i !== stepIndex; });
    active().querySelectorAll('[data-s3-media]').forEach(media => {media.hidden = Number(media.dataset.s3Media) === 4 ? stepIndex !== 4 : stepIndex === 4;});
    active().querySelectorAll('[data-s3-step]').forEach(button => button.setAttribute('aria-current', Number(button.dataset.s3Step) === stepIndex ? 'step' : 'false'));
    stageNav.innerHTML = panels.map((panel, i) => `<button type="button" data-s3-stage="${i}" aria-current="${i === stageIndex ? 'step' : 'false'}">${label[panel.dataset.s3Phase]}</button>`).join('');
    status.textContent = `Concept ${groupIndex + 1} / ${groups.length} · ${label[panels[stageIndex].dataset.s3Phase]}${panels[stageIndex].dataset.s3Phase === 'explain' ? ` · ${stepIndex+1}/${steps.length}` : ''}`;
    nav.querySelector('[data-s3-prev]').disabled = groupIndex === 0 && stageIndex === 0;
    const atEnd = groupIndex === groups.length - 1 && stageIndex === panels.length - 1;
    nav.querySelector('[data-s3-next]').disabled = atEnd;
    nav.querySelector('[data-s3-next]').textContent = atEnd ? 'Topic complete' : stageIndex === panels.length - 1 ? 'Next concept →' : 'Next →';
    root.querySelectorAll('.s3-directory a').forEach(a => a.setAttribute('aria-current', a.hash === `#${active().id}` ? 'location' : 'false'));
    if (scroll) {
      active().querySelector('h2').focus({ preventScroll: true });
      root.querySelector('[data-s3-scroll-anchor]').scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }
  function move(direction) {
    leave();
    const panels=stages();
    const totalSteps=active().querySelectorAll('[data-s3-step-panel]').length;
    if (panels[stageIndex].dataset.s3Phase === 'explain' && stepIndex + direction >= 0 && stepIndex + direction < totalSteps) stepIndex += direction;
    else if (stageIndex + direction >= 0 && stageIndex + direction < panels.length) {
      stageIndex += direction;
      stepIndex = direction < 0 ? totalSteps - 1 : 0;
    } else if (groupIndex + direction >= 0 && groupIndex + direction < groups.length) {
      groupIndex += direction;
      stageIndex = direction < 0 ? stages().length - 1 : 0;
      stepIndex = 0;
      history.replaceState(null, '', `#${active().id}`);
    }
    render(true);
  }
  function followHash(scroll = true) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = id ? document.getElementById(id) : null;
    let group = target?.closest('[data-s3-group]');
    let phase = target?.closest('[data-s3-phase]');
    if (id === 'visual-and-core') { group = groups[0]; phase = null; }
    if (id === 'past-paper-questions' || id === 'original-exam-style-question') {
      group = groups.find(g => g.querySelector('[data-s3-phase="exam"]'));
      phase = group?.querySelector('[data-s3-phase="exam"]');
    }
    if (!group) { if (target?.matches('.s3-reference')) {leave();target.open=true;target.scrollIntoView();} return; }
    leave();
    groupIndex = groups.indexOf(group);
    stageIndex = phase ? [...group.querySelectorAll('[data-s3-phase]')].indexOf(phase) : 0;
    stepIndex = 0;
    root.querySelector('.s3-directory').open = false;
    render(scroll);
    if (scroll && target?.matches('.exam-question')) target.scrollIntoView({block:'start'});
  }
  nav.addEventListener('click', event => {
    if (event.target.closest('[data-s3-prev]')) move(-1);
    if (event.target.closest('[data-s3-next]')) move(1);
    if (event.target.closest('[data-s3-reset]')) {
      leave();stageIndex=0;stepIndex=0;
      active().querySelectorAll('[data-s3-lab]').forEach(lab => lab.dispatchEvent(new CustomEvent('s3:reset')));
      render(true);
    }
  });
  stageNav.addEventListener('click', event => {
    const button = event.target.closest('[data-s3-stage]');
    if (button) {leave();stageIndex=Number(button.dataset.s3Stage);stepIndex=0;render(true);}
  });
  root.addEventListener('click', event => {
    const step=event.target.closest('[data-s3-step]');
    if(step) {leave();stepIndex=Number(step.dataset.s3Step);render(true);}
    const link=event.target.closest('a[href^="#"]');
    if(link && link.hash===location.hash) {event.preventDefault();followHash();}
  });
  window.addEventListener('hashchange', () => followHash());
  root.classList.add('s3-enhanced');
  document.body.classList.add('s3-page');
  nav.hidden=false;stageNav.hidden=false;
  render();followHash(Boolean(location.hash));
})();
