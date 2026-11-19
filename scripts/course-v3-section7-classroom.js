// One DOM serves classroom, full reading, enlargement and printing.
(() => {
  const root = document.querySelector('[data-s7-classroom]');
  if (!root) return;
  const cards = [...root.querySelectorAll('[data-s7-card]')];
  const topics = [...root.querySelectorAll('[data-s7-topic]')];
  const nav = root.querySelector('.s7-navigation');
  const modes = root.querySelector('.s7-mode-switch');
  const directory = root.querySelector('.s7-directory');
  const position = root.querySelector('[data-s7-position]');
  const prev = nav.querySelector('[data-s7-prev]');
  const next = nav.querySelector('[data-s7-next]');
  let index = 0;
  let reading = false;
  try { reading = sessionStorage.getItem('s7-reading-mode') === 'reading'; } catch { /* Optional on local files. */ }

  function hideAnswers() {
    root.querySelectorAll('.exam-reveal[open], .s7-choice[open], .practice-question details[open]').forEach(element => { element.open = false; });
    root.dispatchEvent(new CustomEvent('s7:hide', { bubbles: true }));
  }
  function leave() {
    hideAnswers();
    directory.open = false;
    root.querySelectorAll('.s7-reference[open]').forEach(element => { element.open = false; });
  }
  function display(scroll = false) {
    const card = cards[index], topic = card.closest('[data-s7-topic]');
    const peers = [...topic.querySelectorAll('[data-s7-card]')];
    root.dataset.mode = reading ? 'reading' : 'classroom';
    topics.forEach(element => { element.hidden = !reading && element !== topic; });
    cards.forEach(element => { element.hidden = !reading && element !== card; });
    position.hidden = nav.hidden = reading;
    nav.querySelector('[data-s7-hide]').hidden = !card.querySelector('.exam-reveal,.s7-choice,[data-s7-lab]');
    position.textContent = `${topic.dataset.label} · ${peers.indexOf(card) + 1} / ${peers.length}`;
    directory.querySelectorAll('a').forEach(link => link.setAttribute('aria-current', link.pathname === location.pathname && link.hash === '#' + topic.id ? 'location' : 'false'));
    modes.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.s7Mode === root.dataset.mode)));
    prev.disabled = index === 0 && !root.dataset.prevPage;
    prev.textContent = index === 0 && root.dataset.prevPage ? '← Previous lesson' : '← Previous';
    next.disabled = index === cards.length - 1 && !root.dataset.nextPage;
    next.textContent = index === cards.length - 1 ? (root.dataset.nextPage ? 'Next lesson →' : 'Chapter complete') : 'Next →';
    if (scroll) {
      const surface = card === peers[0] ? topic : card;
      const heading = surface.querySelector('h2,h3');
      heading?.focus({ preventScroll: true });
      surface.scrollIntoView({ block: 'start' });
    }
  }
  function followHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!id) return;
    let target = document.getElementById(id);
    if (!target && id.includes('--')) target = document.getElementById(id.split('--')[0]);
    if (id === 'last-material') target = cards.at(-1);
    if (['visual-and-core', 'classroom-unit'].includes(id)) target = cards[0];
    if (!target) return;
    leave();
    const card = target.closest('[data-s7-card]') ?? target.closest('[data-s7-topic]')?.querySelector('[data-s7-card]');
    if (card) {
      index = cards.indexOf(card);
      display(true);
    } else {
      for (let element = target; element && element !== root; element = element.parentElement) if (element.matches('details')) element.open = true;
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
  nav.querySelector('[data-s7-hide]').addEventListener('click', hideAnswers);
  modes.addEventListener('click', event => {
    const button = event.target.closest('[data-s7-mode]');
    if (!button || button.dataset.s7Mode === root.dataset.mode) return;
    if (reading) {
      const top = root.querySelector('.s7-toolbar').getBoundingClientRect().bottom;
      const bottom = Math.max(top + 1, window.innerHeight / 2);
      const overlaps = cards.map(card => {
        const rect = card.getBoundingClientRect();
        return Math.max(0, Math.min(rect.bottom, bottom) - Math.max(rect.top, top));
      });
      const largest = Math.max(...overlaps);
      if (largest > 0) index = overlaps.indexOf(largest);
    }
    leave();
    reading = button.dataset.s7Mode === 'reading';
    try { sessionStorage.setItem('s7-reading-mode', reading ? 'reading' : 'classroom'); } catch { /* Optional preference. */ }
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
  dialog.className = 's7-material-dialog';
  dialog.setAttribute('aria-label', 'Enlarged teaching material');
  dialog.innerHTML = '<form method="dialog"><button autofocus>Close</button></form>';
  root.append(dialog);
  let restore;
  const zoomable = '.s7-visual, .s7-table-scroll, .s7-lab, .official-extract';
  root.querySelectorAll(zoomable).forEach(material => {
    if (material.parentElement.closest(zoomable)) return;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 's7-enlarge';
    button.textContent = material.matches('.s7-lab') ? 'Enlarge interactive' : material.matches('.s7-table-scroll') ? 'Enlarge table' : material.matches('.official-extract') ? 'Enlarge original extract' : 'Enlarge figure';
    const home = document.createComment('teaching material');
    const heading = material.closest('[data-s7-card]')?.querySelector('.s7-card-heading');
    if (heading && !material.matches('.official-extract') && !material.closest('details.s7-choice')) heading.append(button);
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

  let printRequest, printState;
  root.querySelector('.s7-print-controls').hidden = false;
  root.querySelectorAll('[data-s7-print]').forEach(button => button.addEventListener('click', () => {
    printRequest = button.dataset.s7Print;
    window.print();
  }));
  window.addEventListener('beforeprint', () => {
    if (printState) return;
    if (dialog.open) { dialog.close(); restore?.(); restore = undefined; }
    printState = [...root.querySelectorAll('details')].map(element => [element, element.open]);
    root.querySelectorAll('[data-s7-topic],[data-s7-card]').forEach(element => { element.hidden = false; });
    if (printRequest) {
      root.dataset.printMode = printRequest;
      root.querySelectorAll('#practice,.exam-question-sheet').forEach(element => { element.open = true; });
      root.querySelectorAll('.exam-reveal,.practice-question details').forEach(element => { element.open = printRequest === 'answers'; });
    }
  });
  window.addEventListener('afterprint', () => {
    printState?.forEach(([element, open]) => { element.open = open; });
    delete root.dataset.printMode;
    printRequest = printState = undefined;
    display();
  });
  modes.hidden = false;
  display();
  followHash();
})();
