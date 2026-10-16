const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

const tabs = [...document.querySelectorAll('.menu-card')];
const panels = [...document.querySelectorAll('.menu-panel')];
function activateMenu(id, focusPanel = false) {
  panels.forEach(panel => panel.hidden = panel.dataset.panel !== id);
  tabs.forEach(tab => {
    const active = tab.dataset.menuTarget === id;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  const activeTab = tabs.find(tab => tab.dataset.menuTarget === id);
  if (activeTab) activeTab.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
  if (focusPanel) {
    const panel = panels.find(panel => panel.dataset.panel === id);
    if (panel) panel.scrollIntoView({behavior:'smooth', block:'start'});
  }
}
if (tabs.length && panels.length) {
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateMenu(tab.dataset.menuTarget, true));
    tab.addEventListener('keydown', e => {
      if (!['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) return;
      e.preventDefault();
      let next = index;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      tabs[next].focus();
      activateMenu(tabs[next].dataset.menuTarget, false);
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
