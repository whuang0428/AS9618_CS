// One DOM serves classroom, full reading, enlargement and printing.
(() => {
  const root = document.querySelector('[data-s8-classroom]');
  if (!root) return;
  const cards = [...root.querySelectorAll('[data-s8-card]')];
  const topics = [...root.querySelectorAll('[data-s8-topic]')];
  const nav = root.querySelector('.s8-navigation');
  const modes = root.querySelector('.s8-mode-switch');
  const directory = root.querySelector('.s8-directory');
  const position = root.querySelector('[data-s8-position]');
  const prev = nav.querySelector('[data-s8-prev]');
  const next = nav.querySelector('[data-s8-next]');
  let index = 0;
  let reading = false;
  try { reading = sessionStorage.getItem('s8-reading-mode') === 'reading'; } catch { /* Optional on local files. */ }

  function hideAnswers() {
    root.querySelectorAll('.exam-reveal[open], .s8-choice[open], .practice-question details[open]').forEach(element => { element.open = false; });
    root.dispatchEvent(new CustomEvent('s8:hide', { bubbles: true }));
  }
  function leave() {
    hideAnswers();
    directory.open = false;
    root.querySelectorAll('.s8-reference[open]').forEach(element => { element.open = false; });
  }
  function display(scroll = false) {
    const card = cards[index], topic = card.closest('[data-s8-topic]');
    const peers = [...topic.querySelectorAll('[data-s8-card]')];
    root.dataset.mode = reading ? 'reading' : 'classroom';
    topics.forEach(element => { element.hidden = !reading && element !== topic; });
    cards.forEach(element => { element.hidden = !reading && element !== card; });
    position.hidden = nav.hidden = reading;
    nav.querySelector('[data-s8-hide]').hidden = !card.querySelector('.exam-reveal,.s8-choice,[data-s8-lab]');
    nav.querySelector('[data-s8-hide]').hidden = false;
    position.textContent = `${topic.dataset.label} · ${peers.indexOf(card) + 1} / ${peers.length}`;
    directory.querySelectorAll('a').forEach(link => link.setAttribute('aria-current', link.pathname === location.pathname && link.hash === '#' + topic.id ? 'location' : 'false'));
    modes.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.s8Mode === root.dataset.mode)));
    prev.disabled = index === 0 && !root.dataset.prevPage;
    prev.textContent = index === 0 && root.dataset.prevPage ? 'Previous lesson' : 'Previous';
    next.disabled = index === cards.length - 1 && !root.dataset.nextPage;
    next.textContent = index === cards.length - 1 ? (root.dataset.nextPage ? 'Next lesson' : 'Chapter complete') : 'Next';
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
    if (target.matches('[data-s8-moved]')) { location.replace(target.href); return; }
    leave();
    const card = target.closest('[data-s8-card]') ?? target.closest('[data-s8-topic]')?.querySelector('[data-s8-card]');
    if (card) {
      index = cards.indexOf(card);
      display(true);
      for (let element = target; element && element !== card; element = element.parentElement) if (element.matches('details')) element.open = true;
    } else {
      for (let element = target; element && element !== root; element = element.parentElement) if (element.matches('details')) element.open = true;
      target.scrollIntoView({ block: 'start' });
    }
  }
  function move(delta) {
    if (document.documentElement.dataset.s8DbmsBusy === 'true') return;
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
  nav.querySelector('[data-s8-hide]').addEventListener('click', hideAnswers);
  modes.addEventListener('click', event => {
    const button = event.target.closest('[data-s8-mode]');
    if (!button || button.dataset.s8Mode === root.dataset.mode) return;
    if (reading) {
      const top = root.querySelector('.s8-toolbar').getBoundingClientRect().bottom;
      const bottom = Math.max(top + 1, window.innerHeight / 2);
      const overlaps = cards.map(card => {
        const rect = card.getBoundingClientRect();
        return Math.max(0, Math.min(rect.bottom, bottom) - Math.max(rect.top, top));
      });
      const largest = Math.max(...overlaps);
      if (largest > 0) index = overlaps.indexOf(largest);
    }
    leave();
    reading = button.dataset.s8Mode === 'reading';
    try { sessionStorage.setItem('s8-reading-mode', reading ? 'reading' : 'classroom'); } catch { /* Optional preference. */ }
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
  dialog.className = 's8-material-dialog';
  dialog.setAttribute('aria-label', 'Enlarged teaching material');
  dialog.innerHTML = '<form method="dialog"><button autofocus>Close</button></form>';
  root.append(dialog);
  let restore;
  const zoomable = '.s8-visual, .s8-table-scroll, .s8-lab, .official-extract';
  root.querySelectorAll(zoomable).forEach(material => {
    if (material.parentElement.closest(zoomable)) return;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 's8-enlarge';
    button.textContent = material.matches('.s8-lab') ? 'Enlarge interactive' : material.matches('.s8-table-scroll') ? 'Enlarge table' : material.matches('.official-extract') ? 'Enlarge original extract' : 'Enlarge figure';
    const home = document.createComment('teaching material');
    const heading = material.closest('[data-s8-card]')?.querySelector('.s8-card-heading');
    if (heading && material.closest('[data-s8-card]').querySelectorAll(zoomable).length === 1 && !material.matches('.official-extract') && !material.closest('details.s8-choice')) heading.append(button);
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
    if (reading || document.querySelector('dialog[open]') || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    if (event.target.closest('button,select,input,textarea,a,summary,[contenteditable="true"],[tabindex="0"],details[open]')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });

  let printRequest, printState;
  root.querySelector('.s8-print-controls').hidden = false;
  root.querySelectorAll('[data-s8-print]').forEach(button => button.addEventListener('click', () => {
    printRequest = button.dataset.s8Print;
    window.print();
  }));
  window.addEventListener('beforeprint', () => {
    if (printState) return;
    if (dialog.open) { dialog.close(); restore?.(); restore = undefined; }
    printState = [...root.querySelectorAll('details')].map(element => [element, element.open]);
    root.querySelectorAll('[data-s8-topic],[data-s8-card]').forEach(element => { element.hidden = false; });
    if (printRequest) {
      root.dataset.printMode = printRequest;
      root.querySelectorAll('#practice,.exam-question-sheet,.s8-extension').forEach(element => { element.open = true; });
      root.querySelectorAll('.exam-reveal,.practice-question details').forEach(element => { element.open = printRequest === 'answers'; });
    }
  });
  window.addEventListener('afterprint', () => {
    printState?.forEach(([element, open]) => { element.open = open; });
    delete root.dataset.printMode;
    printRequest = printState = undefined;
    display();
  });
  // A lesson may change while the shared DBMS is saving. Never abandon that write.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || document.documentElement.dataset.s8DbmsBusy !== 'true') return;
    if (link.origin === location.origin && link.pathname !== location.pathname) {
      event.preventDefault();
      position.hidden = false;
      position.textContent = 'Wait for the Library DBMS to finish saving before changing pages.';
    }
  }, true);
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-s8-vocabulary]');
    if (!button) return;
    const demo = button.closest('.s8-vocabulary-demo');
    demo.dataset.highlight = button.dataset.s8Vocabulary;
    demo.querySelectorAll('[data-s8-vocabulary]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const explanations = {
      entity: 'Member is the real-world entity type. Asha is one occurrence of that entity.',
      table: 'The Member table represents stored member occurrences using rows and named columns.',
      record: 'This whole row is one record, also called a tuple. It contains the values for member 1.',
      field: 'MemberName is an attribute, represented by this field (column). Asha is one value in that field.'
    };
    demo.querySelector('[data-s8-vocabulary-explanation]').textContent = button.dataset.explanation || explanations[button.dataset.s8Vocabulary];
  });
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-s8-er-highlight]');
    if (!button) return;
    const demo = button.closest('.s8-er-demo');
    demo.dataset.active = button.dataset.s8ErHighlight;
    demo.querySelectorAll('[data-s8-er-highlight]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    demo.querySelector('[data-s8-er-explanation]').textContent = button.dataset.explanation;
  });
  modes.hidden = false;
  display();
  followHash();
})();
