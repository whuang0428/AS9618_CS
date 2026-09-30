const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("#lesson-menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".table-scroll").forEach((scroller) => {
  scroller.addEventListener("scroll", () => scroller.classList.add("has-scrolled"), { once: true });
});

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
    status.textContent = `Unit ${index + 1} of ${units.length}: ${select.selectedOptions[0].textContent}${stage === 'practice' || stage === 'past-paper-questions' ? ` · ${visibleQuestions} related questions` : ''}`;
    const empty = toolbar.querySelector('.unit-empty');
    empty.hidden = !active || !['practice', 'past-paper-questions'].includes(stage) || visibleQuestions > 0;
  }

  function closeAnswers() {
    document.querySelectorAll('.lesson-stage details[open]').forEach(detail => { detail.open = false; });
  }
  toggle.addEventListener('click', () => { active = !active; closeAnswers(); render(); });
  select.addEventListener('change', () => { closeAnswers(); render(); });
  previous.addEventListener('click', () => { select.value = Number(select.value) - 1; closeAnswers(); render(); });
  next.addEventListener('click', () => { select.value = Number(select.value) + 1; closeAnswers(); render(); });
  toolbar.querySelectorAll('[data-unit-stage]').forEach(button => {
    button.addEventListener('click', () => { stage = button.dataset.unitStage; closeAnswers(); render(); });
  });
  function followAnchor() {
    const target = document.getElementById(location.hash.slice(1));
    if (!active || !target) return;
    const unit = target.closest('.knowledge-unit');
    if (unit) {
      if (Number(select.value) !== units.indexOf(unit)) closeAnswers();
      select.value = units.indexOf(unit);
      stage = 'visual-and-core';
    }
    else if (target.closest('.lesson-stage')) stage = target.closest('.lesson-stage').id;
    else { active = false; }
    render();
    target.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', followAnchor);
  document.addEventListener('click', event => {
    if (!active || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (link && link.hash === location.hash) {
      // An unchanged fragment does not fire hashchange, but its target may
      // have been hidden since the previous visit by classroom controls.
      event.preventDefault();
      followAnchor();
    }
  });
  toolbar.hidden = false;
  render();
})();

// Print state is temporary; closing the dialog restores classroom visibility and answer states.
(() => {
 const controls=document.querySelector('.exam-print-controls');
 if(!controls)return;
 let snapshot=null;
 let mode='questions';
 function prepare(){
  if(snapshot)return;
  const details=[...document.querySelectorAll('.lesson-stage details, .s5-teaching details, .s5-exam-challenge details')];
  snapshot={details:details.map(el=>[el,el.open]),attribute:document.body.getAttribute('data-exam-print')};
  document.body.dataset.examPrint=mode;
  details.forEach(el=>{el.open=el.classList.contains('optional-practice') || mode==='answers';});
 }
 function restore(){
  if(!snapshot)return;
  snapshot.details.forEach(([el,open])=>{el.open=open;});
  if(snapshot.attribute===null)document.body.removeAttribute('data-exam-print');else document.body.setAttribute('data-exam-print',snapshot.attribute);
  snapshot=null;mode='questions';
 }
 window.addEventListener('beforeprint',prepare);
 window.addEventListener('afterprint',restore);
 controls.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
  mode=button.dataset.printExam;prepare();
  try{window.print();}finally{restore();}
 }));
 controls.hidden=false;
})();
