// Adapt the shared guided-page controller without changing Sections 3–5.
(() => {
  const root = document.querySelector('[data-s7-classroom]');
  if (!root) return;
  const hideExperiments = () => root.querySelectorAll('[data-s7-group]').forEach(group => {
    group.dispatchEvent(new CustomEvent('s7:hide', { bubbles: true }));
  });
  document.addEventListener('s5:leave', hideExperiments);
  document.addEventListener('s5:reset', event => {
    const group = event.target.closest?.('[data-s7-group]');
    if (group) group.dispatchEvent(new CustomEvent('s7:reset', { bubbles: true }));
  });
  root.addEventListener('click', event => {
    if (event.target.closest('[data-s5-hide]')) hideExperiments();
    // The shared resume action locates the reading paragraph currently in view.
    if (root.dataset.mode === 'reading' && event.target.closest('[data-s5-mode="classroom"]')) {
      const resume = root.querySelector('[data-s5-resume]');
      if (resume) {
        event.preventDefault();
        event.stopImmediatePropagation();
        resume.click();
      }
    }
  }, true);
})();
