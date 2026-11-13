// Keep a single instance of each interactive example when switching reading modes.
(() => {
  const root = document.querySelector('.s5-pages');
  if (!root) return;
  const cards = [...root.querySelectorAll('[data-s5-card]')];
  const topics = [...root.querySelectorAll('[data-s5-topic]')];
  const nav = root.querySelector('.s5-navigation');
  const modeSwitch = root.querySelector('.s5-mode-switch');
  const directory = root.querySelector('.s5-directory');
  const position = root.querySelector('[data-s5-position]');
  const prev = nav.querySelector('[data-s5-prev]'), next = nav.querySelector('[data-s5-next]');
  let index = 0;
  let reading = false;
  try { reading = sessionStorage.getItem('s5-reading-mode') === 'reading'; } catch { /* Optional on local files. */ }

  function hideAnswers() {
    root.querySelectorAll('.exam-reveal[open], .s5-choice[open], .practice-question details[open]').forEach(el => { el.open = false; });
  }
  function leave() {
    hideAnswers();
    directory.open = false;
    root.querySelectorAll('.s5-reference[open]').forEach(el => { el.open = false; });
  }
  function display(scroll = false) {
    const card = cards[index], topic = card.closest('[data-s5-topic]');
    const peers = [...topic.querySelectorAll('[data-s5-card]')];
    root.dataset.mode = reading ? 'reading' : 'classroom';
    topics.forEach(el => { el.hidden = !reading && el !== topic; });
    cards.forEach(el => { el.hidden = !reading && el !== card; });
    position.hidden = nav.hidden = reading;
    nav.querySelector('[data-s5-hide]').hidden = !card.querySelector('.exam-reveal,.s5-choice');
    position.textContent = `${topic.dataset.label} · ${peers.indexOf(card) + 1} / ${peers.length}`;
    directory.querySelectorAll('a').forEach(el => el.setAttribute('aria-current', el.hash === '#' + topic.id ? 'location' : 'false'));
    modeSwitch.querySelectorAll('button').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.s5Mode === root.dataset.mode)));
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
    if (id === 'last-material') target = cards.at(-1);
    if (id === 'visual-and-core') target = cards[0];
    if (!target) return;
    if (target.matches('[data-s5-moved]')) { location.replace(target.href); return; }
    leave();
    const card = target.closest('[data-s5-card]') ?? target.closest('[data-s5-topic]')?.querySelector('[data-s5-card]');
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
  nav.querySelector('[data-s5-hide]').addEventListener('click', hideAnswers);
  modeSwitch.addEventListener('click', event => {
    const button = event.target.closest('[data-s5-mode]');
    if (!button || button.dataset.s5Mode === root.dataset.mode) return;
    if (reading) {
      const toolbarHeight = root.querySelector('.s5-toolbar').offsetHeight;
      const visible = cards.findIndex(card => card.getBoundingClientRect().bottom > toolbarHeight);
      index = visible >= 0 ? visible : cards.length - 1;
    }
    leave();
    reading = button.dataset.s5Mode === 'reading';
    try { sessionStorage.setItem('s5-reading-mode', reading ? 'reading' : 'classroom'); } catch { /* Optional preference. */ }
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
  dialog.className = 's5-material-dialog';
  dialog.setAttribute('aria-label', 'Enlarged teaching material');
  dialog.innerHTML = '<form method="dialog"><button autofocus>Close</button></form>';
  root.append(dialog);
  let restore;
  const zoomable = '.s5-visual, .s5-table-scroll, [data-s5-translator], .official-extract';
  root.querySelectorAll(zoomable).forEach(material => {
    if (material.parentElement.closest(zoomable)) return;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 's5-enlarge';
    button.textContent = material.matches('[data-s5-translator]') ? 'Enlarge interactive' : material.matches('.s5-table-scroll') ? 'Enlarge table' : material.matches('.official-extract') ? 'Enlarge original extract' : 'Enlarge figure';
    const home = document.createComment('teaching material');
    const heading = material.closest('[data-s5-card]')?.querySelector('.s5-card-heading');
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
  modeSwitch.hidden = false;
  display();
  followHash();
})();
