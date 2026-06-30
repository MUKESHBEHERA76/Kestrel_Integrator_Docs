import { APP_COPY, DOCS_SECTIONS, DOCS_TABS, UTILITY_GROUPS } from './docs-data.js';
import { ICONS } from './icons.js';

const app = document.querySelector('#app');
const pageView = document.querySelector('#pageView');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const menuToggle = document.querySelector('#menuToggle');
const contextMenu = document.querySelector('#contextMenu');
const projectsDropdownToggle = document.querySelector('#projectsDropdownToggle');

const PAGE_FILES = {
  overview: './assets/pages/overview.html',
  projects: './assets/pages/projects.html',
  connectors: './assets/pages/connectors.html',
  workflow: './assets/pages/workflow.html',
  services: './assets/pages/services.html',
  console: './assets/pages/console.html',
  utilities: './assets/pages/utilities.html',
  reference: './assets/pages/reference.html'
};

const state = {
  activeTab: 'overview',
  query: '',
  menuCollapsed: window.matchMedia('(max-width: 900px)').matches,
  menuAutoCollapsed: window.matchMedia('(max-width: 900px)').matches,
  projectsExpanded: false
};

let renderToken = 0;

function slugify(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderIcon(name) {
  return ICONS[name] || ICONS.reference;
}

function setIconTargets() {
  document.querySelectorAll('[data-icon]').forEach((node) => {
    const name = node.getAttribute('data-icon');
    node.innerHTML = renderIcon(name);
  });
}

function syncMenuState() {
  app.classList.toggle('is-menu-collapsed', state.menuCollapsed);
  menuToggle.setAttribute('aria-expanded', String(!state.menuCollapsed));
  if (projectsDropdownToggle) {
    projectsDropdownToggle.setAttribute('aria-expanded', String(state.projectsExpanded));
  }
}

function flattenUtilities() {
  return UTILITY_GROUPS.flatMap((group) => group.utilities.map((utility) => ({
    ...utility,
    groupId: group.id,
    groupLabel: group.label,
    searchText: `${group.label} ${utility.name} ${(utility.aliases || []).join(' ')} ${utility.summary} ${(utility.params || []).map((param) => `${param.name} ${param.description}`).join(' ')} ${utility.notes || ''}`.toLowerCase()
  })));
}

function renderSectionCard(item, index) {
  const body = item.body || item.summary || '';
  return `
    <article class="docs-card" id="${escapeHtml(item.anchor || slugify(item.title || `item-${index + 1}`))}">
      <div class="docs-card-head">
        <h3>${escapeHtml(item.title)}</h3>
        <small>${String(index + 1).padStart(2, '0')}</small>
      </div>
      <p>${escapeHtml(body)}</p>
    </article>
  `;
}

function renderUtilityParam(param) {
  return `
    <div class="docs-key">
      <strong>${escapeHtml(param.name)}</strong>
      <span>${escapeHtml(param.description)}</span>
    </div>
  `;
}

function scrollToAnchor(anchor) {
  const target = pageView.querySelector(`[data-doc-anchor="${CSS.escape(anchor)}"]`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderContextMenu() {
  if (!contextMenu) {
    return;
  }

  const section = DOCS_SECTIONS[state.activeTab];
  const items = section?.menuItems || [];

  if (state.activeTab !== 'projects' || !state.projectsExpanded || !items.length || state.query.trim()) {
    contextMenu.innerHTML = '';
    return;
  }

  contextMenu.innerHTML = `
    <div class="docs-context-group">
      <h2>${escapeHtml(section.title)}</h2>
      <div class="docs-context-list">
        ${items.map((item) => `
          <button class="docs-context-button" type="button" data-anchor="${escapeHtml(item.anchor)}">
            <span>${escapeHtml(item.title)}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  contextMenu.querySelectorAll('.docs-context-button').forEach((button) => {
    button.addEventListener('click', () => {
      scrollToAnchor(button.getAttribute('data-anchor'));
      if (window.matchMedia('(max-width: 900px)').matches) {
        state.menuCollapsed = true;
        syncMenuState();
      }
    });
  });
}

function renderUtilityGroup(group) {
  const utilities = group.utilities.filter((utility) => !state.query || utility.searchText.includes(state.query.toLowerCase()));
  return `
    <section class="docs-group" id="group-${escapeHtml(group.id)}" data-doc-anchor="group-${escapeHtml(group.id)}" data-doc-subtitle="${escapeHtml(group.utilities.length)} utilities">
      <div class="docs-group-header">
        <div>
          <strong>${escapeHtml(group.label)} Utilities</strong>
          <div class="docs-pill-row">
            <span class="docs-pill">${utilities.length} items</span>
            <span class="docs-pill">Searchable</span>
          </div>
        </div>
        <span>Click any utility to inspect its inputs and usage</span>
      </div>
      <div class="docs-utility-list">
        ${utilities.map((utility) => `
          <details class="docs-utility">
            <summary>
              <div class="docs-utility-main">
                <h4>${escapeHtml(utility.name)}</h4>
                <div class="docs-pill-row">
                  ${(utility.aliases || []).map((alias) => `<span class="docs-pill">${escapeHtml(alias)}</span>`).join('')}
                  ${!utility.aliases?.length ? `<span class="docs-pill">${escapeHtml(group.label)}</span>` : ''}
                </div>
                <p>${escapeHtml(utility.summary)}</p>
              </div>
              <span class="docs-pill">Open</span>
            </summary>
            <div class="docs-utility-body">
              <div class="docs-results">
                <strong>How to use</strong>
                <p>${escapeHtml(utility.example)}</p>
              </div>
              <div class="docs-results">
                <strong>Parameters</strong>
                <div class="docs-key-grid">
                  ${utility.params.length ? utility.params.map(renderUtilityParam).join('') : '<div class="docs-empty">This utility does not require any explicit parameters.</div>'}
                </div>
              </div>
              ${utility.output ? `
                <div class="docs-note"><strong>Output:</strong> ${escapeHtml(utility.output)}</div>
              ` : ''}
              ${utility.notes ? `
                <div class="docs-note">${escapeHtml(utility.notes)}</div>
              ` : ''}
            </div>
          </details>
        `).join('')}
        ${utilities.length === 0 ? `<div class="docs-empty">${APP_COPY.utilityEmpty}</div>` : ''}
      </div>
    </section>
  `;
}

function renderUtilitiesPage() {
  const groups = UTILITY_GROUPS.map((group) => ({
    ...group,
    utilities: group.utilities.filter((utility) => !state.query || utility.searchText.includes(state.query.toLowerCase()))
  }));
  const visibleGroups = groups.filter((group) => group.utilities.length > 0);
  const catalog = pageView.querySelector('#utilitiesCatalog');
  if (catalog) {
    catalog.innerHTML = `
      <div class="docs-utility-groups">
        ${visibleGroups.map(renderUtilityGroup).join('')}
        ${visibleGroups.length === 0 ? `<div class="docs-empty">${APP_COPY.utilityEmpty}</div>` : ''}
      </div>
    `;
  }
}

async function loadPage(tabId) {
  const file = PAGE_FILES[tabId] || PAGE_FILES.overview;
  const token = ++renderToken;
  pageView.innerHTML = `
    <section class="docs-grid">
      <h2>Loading ${escapeHtml(tabId)}...</h2>
      <p>Please wait while the documentation page is loaded.</p>
    </section>
  `;

  try {
    const response = await fetch(file, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load ${tabId} page`);
    }
    const html = await response.text();
    if (token !== renderToken) return;
    pageView.innerHTML = html;
    if (tabId === 'utilities') {
      renderUtilitiesPage();
    }
    renderContextMenu();
    setIconTargets();
  } catch (error) {
    if (token !== renderToken) return;
    pageView.innerHTML = `
      <section class="docs-grid">
        <h2>${escapeHtml(tabId)}</h2>
        <p>Unable to load this page right now.</p>
        <div class="docs-empty">${escapeHtml(error.message)}</div>
      </section>
    `;
    renderContextMenu();
  }
}

function renderSearchResults() {
  const query = state.query.trim().toLowerCase();
  const flattenedUtilities = flattenUtilities();
  const matchedUtilities = query
    ? flattenedUtilities.filter((utility) => utility.searchText.includes(query))
    : [];
  const matchedSections = query
    ? Object.entries(DOCS_SECTIONS)
      .flatMap(([key, section]) => {
        const text = `${section.title} ${section.intro} ${(section.cards || section.steps || []).map((item) => `${item.title} ${item.body || item.summary || ''}`).join(' ')}`.toLowerCase();
        return text.includes(query) ? [{ key, title: section.title, detail: section.intro }] : [];
      })
    : [];

  if (!query) {
    return;
  }

  if (contextMenu) {
    contextMenu.innerHTML = '';
  }

  pageView.innerHTML = `
    <section class="docs-grid">
      <h2>Search results</h2>
      <p>Showing matches for <strong>${escapeHtml(state.query)}</strong>.</p>
      <div class="docs-grid" id="search-sections">
        <article class="docs-card">
          <h3>Sections</h3>
          <div class="docs-search-results">
            ${matchedSections.length ? matchedSections.map((section) => `
              <div class="docs-search-hit">
                <h4>${escapeHtml(section.title)}</h4>
                <p>${escapeHtml(section.detail)}</p>
              </div>
            `).join('') : `<div class="docs-empty">${APP_COPY.searchEmpty}</div>`}
          </div>
        </article>
        <article class="docs-card" id="search-utilities">
          <h3>Utilities</h3>
          <div class="docs-search-results">
            ${matchedUtilities.length ? matchedUtilities.map((utility) => `
              <div class="docs-search-hit">
                <h4>${escapeHtml(utility.name)}</h4>
                <p>${escapeHtml(utility.summary)}<br><span class="docs-pill">${escapeHtml(utility.groupLabel)}</span></p>
              </div>
            `).join('') : `<div class="docs-empty">${APP_COPY.searchEmpty}</div>`}
          </div>
        </article>
      </div>
    </section>
  `;
}

async function renderTab(tabId) {
  state.activeTab = tabId;
  if (state.query.trim()) {
    renderSearchResults();
    renderContextMenu();
    return;
  }
  if (tabId === 'projects') {
    state.projectsExpanded = true;
  }
  await loadPage(tabId);
}

function applySearch() {
  state.query = searchInput.value.trim();
  renderTab(state.activeTab);
}

searchButton.addEventListener('click', applySearch);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    applySearch();
  }
});

document.querySelectorAll('.docs-rail-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.docs-rail-button').forEach((item) => item.classList.toggle('active', item === button));
    renderTab(button.getAttribute('data-tab'));
    if (window.matchMedia('(max-width: 900px)').matches) {
      state.menuCollapsed = true;
      syncMenuState();
    }
  });
});

projectsDropdownToggle?.addEventListener('click', () => {
  state.projectsExpanded = !state.projectsExpanded;
  syncMenuState();
  renderContextMenu();
});

menuToggle?.addEventListener('click', () => {
  state.menuCollapsed = !state.menuCollapsed;
  state.menuAutoCollapsed = false;
  syncMenuState();
});

setIconTargets();
syncMenuState();
renderTab('overview');

window.addEventListener('resize', () => {
  const shouldCollapse = window.matchMedia('(max-width: 900px)').matches;
  if (shouldCollapse && !state.menuCollapsed) {
    state.menuCollapsed = true;
    state.menuAutoCollapsed = true;
    syncMenuState();
  }
  if (!shouldCollapse && state.menuAutoCollapsed && state.menuCollapsed) {
    state.menuCollapsed = false;
    state.menuAutoCollapsed = false;
    syncMenuState();
  }
});
