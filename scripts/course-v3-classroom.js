// Progressive enhancement: the complete lesson remains available without JS.
(() => {
  const toolbar = document.querySelector('.classroom-toolbar');
  if (!toolbar) return;
  const toggle = toolbar.querySelector('[data-classroom-toggle]');
  const controls = toolbar.querySelector('.unit-controls');
  const select = toolbar.querySelector('select');
  const previous = toolbar.querySelector('[data-unit-previous]');
  const next = toolbar.querySelector('[data-unit-next]');
  const status = toolbar.querySelector('[role="status"]');
  const units = [...document.querySelectorAll('.knowledge-unit')];
  const stages = [...document.querySelectorAll('.lesson-stage')];
  const questions = [...document.querySelectorAll('.practice-question, .exam-question')];
  let active = false;
  let stage = 'visual-and-core';

  function render() {
    const index = Number(select.value);
    const objectives = new Set(units[index].dataset.objectives.split(' '));
    document.body.classList.toggle('classroom-mode', active);
    toggle.setAttribute('aria-pressed', String(active));
    toggle.textContent = active ? 'Show whole lesson' : 'Teach one unit';
    controls.hidden = !active;
    units.forEach((unit, i) => { unit.hidden = active && i !== index; });
    stages.forEach(section => { section.hidden = active && section.id !== stage; });
    questions.forEach(question => {
      question.hidden = active && !(question.dataset.objectives ?? '').split(' ').some(id => objectives.has(id));
    });
    toolbar.querySelectorAll('[data-unit-stage]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.unitStage === stage));
    });
    previous.disabled = index === 0;
    next.disabled = index === units.length - 1;
    const visibleQuestions = questions.filter(q => !q.hidden && q.closest('.lesson-stage')?.id === stage).length;
    status.textContent = `Unit ${index + 1} of ${units.length}: ${select.selectedOptions[0].textContent}${stage === 'practice' || stage === 'original-exam-style-question' ? ` · ${visibleQuestions} related questions` : ''}`;
    const empty = toolbar.querySelector('.unit-empty');
    empty.hidden = !active || !['practice', 'original-exam-style-question'].includes(stage) || visibleQuestions > 0;
  }

  function closeAnswers() {
    document.querySelectorAll('.lesson-stage details[open]').forEach(detail => { detail.open = false; });
  }
  toggle.addEventListener('click', () => { active = !active; closeAnswers(); render(); });
  select.addEventListener('change', () => { closeAnswers(); render(); });
  previous.addEventListener('click', () => { select.value = Number(select.value) - 1; closeAnswers(); render(); });
  next.addEventListener('click', () => { select.value = Number(select.value) + 1; closeAnswers(); render(); });
  toolbar.querySelectorAll('[data-unit-stage]').forEach(button => {
    button.addEventListener('click', () => { stage = button.dataset.unitStage; render(); });
  });
  function followAnchor() {
    const target = document.getElementById(location.hash.slice(1));
    if (!active || !target) return;
    const unit = target.closest('.knowledge-unit');
    if (unit) { select.value = units.indexOf(unit); stage = 'visual-and-core'; }
    else if (stages.includes(target)) stage = target.id;
    else { active = false; }
    render();
    target.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', followAnchor);
  toolbar.hidden = false;
  render();
})();
