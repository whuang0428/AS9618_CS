// Both modes share the same DOM so that a paused animation retains its frame.
(() => {
  const root = document.querySelector('[data-s4-classroom]');
  if (!root) return;
  const groups = [...root.querySelectorAll('[data-s4-group]')];
  const cards = [...root.querySelectorAll('[data-s4-card]')];
  const directory = root.querySelector('.s4-directory');
  const navigation = root.querySelector('.s4-navigation');
  const modeSwitch = root.querySelector('.s4-mode-switch');
  const position = root.querySelector('[data-s4-position]');
  let index = 0;
  let mode = 'classroom';
  try { if (sessionStorage.getItem('s4-reading-mode') === 'reading') mode = 'reading'; } catch { /* Local files may disable storage. */ }
  function leave() {
    document.dispatchEvent(new CustomEvent('s4:leave'));
    root.querySelectorAll('.exam-reveal[open], .s4-reference[open], .s4-reference details[open]').forEach(d => { d.open = false; });
    directory.open = false;
  }
  function display(scroll = false) {
    const card = cards[index];
    const group = card.closest('[data-s4-group]');
    const classroom = mode === 'classroom';
    root.dataset.mode = mode;
    groups.forEach(item => { item.hidden = classroom && item !== group; });
    cards.forEach(item => { item.hidden = classroom && item !== card; });
    navigation.hidden = position.hidden = !classroom;
    modeSwitch.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.s4Mode === mode)));
    directory.querySelectorAll('a').forEach(a => a.setAttribute('aria-current', a.hash === '#' + group.id ? 'location' : 'false'));
    const peers = [...group.querySelectorAll('[data-s4-card]')];
    position.textContent = `${group.dataset.label} · ${peers.indexOf(card) + 1} / ${peers.length}`;
    const prev = navigation.querySelector('[data-s4-prev]'), next = navigation.querySelector('[data-s4-next]');
    prev.disabled = index === 0 && !root.dataset.prevPage;
    prev.textContent = index === 0 && root.dataset.prevPage ? '← Previous lesson' : '← Previous';
    next.disabled = index === cards.length - 1 && !root.dataset.nextPage;
    next.textContent = index === cards.length - 1 ? (root.dataset.nextPage ? 'Next lesson →' : 'Chapter complete') : 'Next →';
    if (scroll) {
      const target = peers[0] === card ? group : card;
      const heading = target.querySelector('h2,h3');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      target.scrollIntoView({ block: 'start' });
    }
  }
  function followHash(scroll) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!id) return;
    let target = document.getElementById(id);
    // Bookmarks created by the previous staged classroom ended in --explain-2, etc.
    if (!target && id.includes('--')) target = document.getElementById(id.split('--')[0]);
    if (target?.matches('[data-s4-moved]')) { location.replace(target.href); return; }
    if (id === 's4-last') target = cards.at(-1);
    if (id === 'visual-and-core') target = cards[0];
    if (!target) return;
    leave();
    const card = target.closest('[data-s4-card]') ?? target.closest('[data-s4-group]')?.querySelector('[data-s4-card]');
    if (card) {
      index = cards.indexOf(card);
      display(scroll && mode === 'classroom');
      if (scroll && mode === 'reading') target.scrollIntoView({ block: 'start' });
    } else {
      for (let node = target; node && node !== root; node = node.parentElement) if (node.matches('details')) node.open = true;
      if (scroll) target.scrollIntoView({ block: 'start' });
    }
  }
  function move(delta) {
    leave();
    const candidate = index + delta;
    if (candidate < 0 || candidate >= cards.length) {
      const url = candidate < 0 ? root.dataset.prevPage : root.dataset.nextPage;
      if (url) location.assign(url);
      return;
    }
    index = candidate;
    history.replaceState(null, '', '#' + cards[index].id);
    display(true);
  }
  navigation.addEventListener('click', event => {
    if (event.target.closest('[data-s4-prev]')) move(-1);
    if (event.target.closest('[data-s4-next]')) move(1);
  });
  modeSwitch.addEventListener('click', event => {
    const next = event.target.closest('[data-s4-mode]')?.dataset.s4Mode;
    if (!next || next === mode) return;
    if (mode === 'reading') {
      const top = root.querySelector('.s4-toolbar').getBoundingClientRect().height;
      const visible = cards.findIndex(card => card.getBoundingClientRect().bottom > top);
      if (visible >= 0) index = visible;
    }
    leave();
    mode = next;
    try { sessionStorage.setItem('s4-reading-mode', mode); } catch { /* Optional preference. */ }
    history.replaceState(null, '', '#' + cards[index].id);
    display(true);
  });
  root.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link && link.hash === location.hash && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      event.preventDefault(); followHash(true);
    }
  });
  window.addEventListener('hashchange', () => followHash(true));

  // Move the actual material into the dialog. Live controls, SVG IDs and
  // accessibility relationships stay attached to the same elements.
  const zoom = document.createElement('dialog');
  zoom.className = 's4-zoom';
  zoom.setAttribute('aria-label', 'Enlarged teaching material');
  zoom.innerHTML = '<form method="dialog"><button autofocus>Close</button></form>';
  root.append(zoom);
  let restore = null;
  root.querySelectorAll('.s4-figure,.s4-table-scroll,.s4-lab,.official-extract').forEach(material => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 's4-enlarge';
    button.textContent = material.matches('.s4-lab') ? 'Enlarge animation' : material.matches('.s4-table-scroll') ? 'Enlarge table' : 'Enlarge figure';
    material.after(button);
    button.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('s4:leave'));
      restore = () => button.before(material);
      zoom.append(material);
      zoom.showModal();
    });
  });
  zoom.addEventListener('close', () => { restore?.(); restore = null; });
  document.addEventListener('keydown', event => {
    if (mode !== 'classroom' || zoom.open || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('input,select,textarea,button,a,summary,details[open],[role="region"],[contenteditable="true"]')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  root.classList.add('s4-enhanced');
  modeSwitch.hidden = false;
  display();
  followHash(true);
})();
