// Keep a single instance of each interactive example when switching reading modes.
(() => {
  const root = document.querySelector('[data-s6-classroom]');
  if (!root) return;
  const cards = [...root.querySelectorAll('[data-s6-card]')];
  const topics = [...root.querySelectorAll('[data-s6-topic]')];
  const nav = root.querySelector('.s6-navigation');
  const modeSwitch = root.querySelector('.s6-mode-switch');
  const directory = root.querySelector('.s6-directory');
  const position = root.querySelector('[data-s6-position]');
  const prev = nav.querySelector('[data-s6-prev]'), next = nav.querySelector('[data-s6-next]');
  let index = 0;
  let reading = false;
  try { reading = sessionStorage.getItem('s6-reading-mode') === 'reading'; } catch { /* Optional on local files. */ }

  function hideAnswers() {
    root.querySelectorAll('.exam-reveal[open], .s6-choice[open], .practice-question details[open]').forEach(el => { el.open = false; });
  }
  function leave() {
    hideAnswers();
    directory.open = false;
    root.querySelectorAll('.s6-reference[open]').forEach(el => { el.open = false; });
  }
  function display(scroll = false) {
    const card = cards[index], topic = card.closest('[data-s6-topic]');
    const peers = [...topic.querySelectorAll('[data-s6-card]')];
    root.dataset.mode = reading ? 'reading' : 'classroom';
    topics.forEach(el => { el.hidden = !reading && el !== topic; });
    cards.forEach(el => { el.hidden = !reading && el !== card; });
    position.hidden = nav.hidden = reading;
    nav.querySelector('[data-s6-hide]').hidden = !card.querySelector('.exam-reveal,.s6-choice');
    position.textContent = `${topic.dataset.label} · ${peers.indexOf(card) + 1} / ${peers.length}`;
    directory.querySelectorAll('a').forEach(el => el.setAttribute('aria-current', el.hash === '#' + topic.id ? 'location' : 'false'));
    modeSwitch.querySelectorAll('button').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.s6Mode === root.dataset.mode)));
    prev.disabled = index === 0 && !root.dataset.prevPage;
    prev.textContent = index === 0 && root.dataset.prevPage ? '← Previous lesson' : '← Previous';
    next.disabled = index === cards.length - 1 && !root.dataset.nextPage;
    next.textContent = index === cards.length - 1 ? (root.dataset.nextPage ? 'Next lesson →' : 'Chapter complete') : 'Next →';
    if (scroll) {
      const surface = peers[0] === card ? topic : card;
      const heading = surface.querySelector('h2,h3');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      surface.scrollIntoView({ block: 'start' });
    }
  }
  function followHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!id) return;
    let target = document.getElementById(id);
    if (!target && id.includes('--')) target = document.getElementById(id.split('--')[0]);
    if (target?.matches('[data-s6-moved]')) { location.replace(target.href); return; }
    if (id === 'last-material') target = cards.at(-1);
    if (id === 'visual-and-core' || id === 'classroom-unit') target = cards[0];
    if (['past-paper-questions', 'original-exam-style-question'].includes(id)) target = root.querySelector('.s6-boundary') ?? document.getElementById('additional-papers');
    if (!target) return;
    if (target.matches('[data-s6-moved]')) { location.replace(target.href); return; }
    leave();
    const card = target.closest('[data-s6-card]') ?? target.closest('[data-s6-topic]')?.querySelector('[data-s6-card]');
    if (card) {
      index = cards.indexOf(card);
      display(true);
    } else {
      for (let el = target; el && el !== root; el = el.parentElement) if (el.matches('details')) el.open = true;
      target.scrollIntoView({ block: 'start' });
    }
  }
  function move(delta) {
    const candidate = index + delta;
    leave();
    if (candidate < 0 || candidate >= cards.length) {
      const url = delta < 0 ? root.dataset.prevPage : root.dataset.nextPage;
      if (url) location.assign(url);
      return;
    }
    index = candidate;
    history.replaceState(null, '', '#' + cards[index].id);
    display(true);
  }
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  nav.querySelector('[data-s6-hide]').addEventListener('click', hideAnswers);
  modeSwitch.addEventListener('click', event => {
    const button = event.target.closest('[data-s6-mode]');
    if (!button || button.dataset.s6Mode === root.dataset.mode) return;
    if (reading) {
      // Follow the material occupying the reading area, not a previous card's tail.
      const toolbarBottom = root.querySelector('.s6-toolbar').getBoundingClientRect().bottom;
      const readingBottom = Math.max(toolbarBottom + 1, window.innerHeight / 2);
      const overlap = cards.map(card => {
        const bounds = card.getBoundingClientRect();
        return Math.max(0, Math.min(bounds.bottom, readingBottom) - Math.max(bounds.top, toolbarBottom));
      });
      const largest = Math.max(...overlap);
      if (largest > 0 && overlap[index] < largest) index = overlap.indexOf(largest);
    }
    leave();
    reading = button.dataset.s6Mode === 'reading';
    try { sessionStorage.setItem('s6-reading-mode', reading ? 'reading' : 'classroom'); } catch { /* Optional preference. */ }
    history.replaceState(null, '', '#' + cards[index].id);
    display(true);
  });
  root.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link && link.hash === location.hash && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey) {
      event.preventDefault();
      followHash();
    }
  });
  window.addEventListener('hashchange', followHash);

  const dialog = document.createElement('dialog');
  dialog.className = 's6-material-dialog';
  dialog.setAttribute('aria-label', 'Enlarged teaching material');
  dialog.innerHTML = '<form method="dialog"><button autofocus>Close</button></form>';
  root.append(dialog);
  let restore;
  const zoomable = '.s6-visual, .s6-table-scroll, .s6-lab, .official-extract';
  root.querySelectorAll(zoomable).forEach(material => {
    if (material.parentElement.closest(zoomable)) return;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 's6-enlarge';
    button.textContent = material.matches('.s6-lab') ? 'Enlarge interactive' : material.matches('.s6-table-scroll') ? 'Enlarge table' : material.matches('.official-extract') ? 'Enlarge original extract' : 'Enlarge figure';
    const home = document.createComment('teaching material');
    const heading = material.closest('[data-s6-card]')?.querySelector('.s6-card-heading');
    if (heading && !material.matches('.official-extract')) heading.append(button);
    else material.before(button);
    material.before(home);
    button.addEventListener('click', () => {
      restore = () => { home.after(material); button.focus({ preventScroll: true }); };
      dialog.append(material);
      dialog.showModal();
    });
  });
  dialog.addEventListener('close', () => { restore?.(); restore = undefined; });
  document.addEventListener('keydown', event => {
    if (reading || dialog.open || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    if (event.target.closest('button,select,input,textarea,a,summary,[contenteditable="true"],[tabindex="0"],details[open]')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  let printState, printRequest;
  const printControls = root.querySelector('.s6-print-controls');
  printControls.hidden = false;
  printControls.addEventListener('click', event => {
    const button = event.target.closest('[data-s6-print]');
    if (!button) return;
    printRequest = button.dataset.s6Print;
    window.print();
  });
  window.addEventListener('beforeprint', () => {
    if (printState) return;
    if (dialog.open) { dialog.close(); restore?.(); restore = undefined; }
    printState = [...root.querySelectorAll('details')].map(element => [element, element.open]);
    root.querySelectorAll('[data-s6-topic],[data-s6-card]').forEach(el => { el.hidden = false; });
    if (printRequest) {
      root.dataset.printMode = printRequest;
      root.querySelectorAll('#practice,#additional-papers,.exam-question-sheet').forEach(el => { el.open = true; });
      root.querySelectorAll('.exam-reveal,.practice-question details').forEach(el => { el.open = printRequest === 'answers'; });
    }
  });
  window.addEventListener('afterprint', () => {
    if (printState) printState.forEach(([element, open]) => { element.open = open; });
    delete root.dataset.printMode;
    printRequest = printState = undefined;
    display();
  });
  modeSwitch.hidden = false;
  display();
  followHash();
})();
