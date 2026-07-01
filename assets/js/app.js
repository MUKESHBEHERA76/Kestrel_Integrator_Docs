import { APP_COPY, DOCS_SECTIONS, DOCS_TABS, UTILITY_GROUPS } from './docs-data.js';
import { ICONS } from './icons.js';

const app = document.querySelector('#app');
const pageView = document.querySelector('#pageView');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const menuToggle = document.querySelector('#menuToggle');
const projectsToggle = document.querySelector('#projectsToggle');
const contextMenu = document.querySelector('#contextMenu');

const PAGE_FILES = {
  overview: './assets/pages/overview.html',
  projects: './assets/pages/projects.html',
  connectors: './assets/pages/connectors.html',
  workflow: './assets/pages/workflow.html',
  services: './assets/pages/services.html',
  api: './assets/pages/api.html',
  workflowTrigger: './assets/pages/workflow-trigger.html',
  dataStructure: './assets/pages/data-structure.html',
  xsltAlias: './assets/pages/xslt-alias.html',
  scheduler: './assets/pages/scheduler.html',
  logger: './assets/pages/logger.html',
  dataTransformer: './assets/pages/data-transformer.html',
  sendHttpResponse: './assets/pages/send-http-response.html',
  workflowEnd: './assets/pages/workflow-end.html',
  csvParser: './assets/pages/csv-parser.html',
  pipelineLogger: './assets/pages/pipeline-logger.html',
  xsltTransformer: './assets/pages/xslt-transformer.html',
  sleep: './assets/pages/sleep.html',
  raiseException: './assets/pages/raise-exception.html',
  multiTransformation: './assets/pages/multi-transformation.html',
  pgp: './assets/pages/pgp.html',
  snowflake: './assets/pages/snowflake.html',
  postgres: './assets/pages/postgres.html',
  mssql: './assets/pages/mssql.html',
  mysql: './assets/pages/mysql.html',
  mariadb: './assets/pages/mariadb.html',
  oracleDb: './assets/pages/oracle-db.html',
  ibmDb2: './assets/pages/ibm-db2.html',
  console: './assets/pages/console.html',
  utilities: './assets/pages/utilities.html',
  reference: './assets/pages/reference.html'
};

const PROJECT_TABS = new Set([
  'projects',
  'api',
  'workflowTrigger',
  'dataStructure',
  'xsltAlias',
  'scheduler'
]);

const WORKFLOW_CONNECTOR_TABS = new Set([
  'logger',
  'dataTransformer',
  'sendHttpResponse',
  'workflowEnd',
  'csvParser',
  'pipelineLogger',
  'xsltTransformer',
  'sleep',
  'raiseException',
  'multiTransformation',
  'pgp',
  'snowflake',
  'postgres',
  'mssql',
  'mysql',
  'mariadb',
  'oracleDb',
  'ibmDb2'
]);

const ROUTE_DEFAULT = 'overview';
const ROUTE_TABS = new Set(Object.keys(PAGE_FILES));

const PROJECT_MENU_TREE = [
  {
    key: 'workflow',
    title: 'Workflow',
    tab: 'workflow',
    children: [
      {
        key: 'workflow-connectors',
        title: 'Connectors',
        tab: 'workflow',
        children: [
          { title: 'Logger', tab: 'logger' },
          { title: 'Data Transformer', tab: 'dataTransformer' },
          { title: 'Send HttpResponse', tab: 'sendHttpResponse' },
          { title: 'Workflow End', tab: 'workflowEnd' },
          { title: 'CSV Parser', tab: 'csvParser' },
          { title: 'Pipeline Logger', tab: 'pipelineLogger' },
          { title: 'XSLT Transformer', tab: 'xsltTransformer' },
          { title: 'Sleep', tab: 'sleep' },
          { title: 'Raise Exception', tab: 'raiseException' },
          { title: 'Multi Transformation', tab: 'multiTransformation' },
          { title: 'PGP', tab: 'pgp' },
          { title: 'Snowflake', tab: 'snowflake' },
          { title: 'Postgres', tab: 'postgres' },
          { title: 'MSSQL', tab: 'mssql' },
          { title: 'MySql', tab: 'mysql' },
          { title: 'MariaDB', tab: 'mariadb' },
          { title: 'OracleDB', tab: 'oracleDb' },
          { title: 'IBMDB2', tab: 'ibmDb2' }
        ]
      },
      { title: 'Workflow Trigger', tab: 'workflowTrigger', anchor: 'workflow-trigger-overview' },
      { title: 'Utils', tab: 'utilities' }
    ]
  },
  {
    key: 'reusable-services',
    title: 'Reusable services',
    tab: 'services',
    children: [
      { title: 'API', tab: 'api' }
    ]
  },
  {
    key: 'connections',
    title: 'Connection',
    tab: 'connectors',
    children: [
      { title: 'Connector catalog', tab: 'connectors', anchor: 'connection-catalog' },
      { title: 'Enabled state', tab: 'connectors', anchor: 'connection-state' },
      { title: 'Reuse everywhere', tab: 'connectors', anchor: 'connection-reuse' }
    ]
  },
  {
    key: 'data-structure',
    title: 'Data Structure',
    tab: 'dataStructure',
    children: [
      { title: 'XSLT Alias', tab: 'xsltAlias', anchor: 'xslt-alias-overview' },
      { title: 'Scheduler', tab: 'scheduler', anchor: 'scheduler-overview' }
    ]
  }
];

const state = {
  activeTab: 'overview',
  query: '',
  projectsMenuOpen: false,
  projectTreeOpen: {},
  menuCollapsed: window.matchMedia('(max-width: 900px)').matches,
  menuAutoCollapsed: window.matchMedia('(max-width: 900px)').matches
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
  if (projectsToggle) {
    projectsToggle.setAttribute('aria-expanded', String(state.projectsMenuOpen));
  }
}

function getRailTab(tabId) {
  if (PROJECT_TABS.has(tabId)) {
    return 'projects';
  }
  if (WORKFLOW_CONNECTOR_TABS.has(tabId) || tabId === 'workflow') {
    return 'workflow';
  }
  return tabId;
}

function parseRouteFromHash() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) {
    return { tab: ROUTE_DEFAULT, anchor: '' };
  }

  const [tabPart = ROUTE_DEFAULT, anchor = ''] = raw.split('/');
  return {
    tab: ROUTE_TABS.has(tabPart) ? tabPart : ROUTE_DEFAULT,
    anchor
  };
}

function setRoute(tabId, anchor = '') {
  const route = anchor ? `${tabId}/${anchor}` : tabId;
  const nextHash = `#${route}`;
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
    return;
  }
  renderFromLocation();
}

function updateRailActiveState(tabId) {
  const effectiveTab = getRailTab(tabId);
  document.querySelectorAll('.docs-rail-button').forEach((item) => {
    item.classList.toggle('active', item.getAttribute('data-tab') === effectiveTab);
  });
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

function renderMenuNodes(nodes, depth = 0, parentKey = 'projects') {
  return nodes.map((node) => {
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    const label = escapeHtml(node.title);
    const nodeKey = node.key || `${parentKey}-${slugify(node.title)}`;
    if (hasChildren) {
      const isOpen = typeof node.open === 'boolean'
        ? node.open
        : Boolean(state.projectTreeOpen[nodeKey]);
      return `
        <details class="docs-tree-node" data-tree-key="${escapeHtml(nodeKey)}" ${isOpen ? 'open' : ''}>
          <summary class="docs-tree-summary" data-tree-depth="${depth}">
            <button class="docs-tree-summary-button" type="button" data-tab="${escapeHtml(node.tab || '')}" aria-label="Open ${label} page">
              <span class="docs-tree-title">${label}</span>
            </button>
            <button class="docs-tree-toggle" type="button" aria-label="Toggle ${label} submenu">
              <span class="docs-tree-caret" data-icon="chevron"></span>
            </button>
          </summary>
          <div class="docs-tree-children">
            ${renderMenuNodes(node.children, depth + 1, nodeKey)}
          </div>
        </details>
      `;
    }

    const anchorAttr = node.anchor ? `data-anchor="${escapeHtml(node.anchor)}"` : '';
    const tabAttr = node.tab ? `data-tab="${escapeHtml(node.tab)}"` : '';
    return `
      <button class="docs-tree-leaf" type="button" ${tabAttr} ${anchorAttr}>
        <span class="docs-tree-leaf-title">${label}</span>
      </button>
    `;
  }).join('');
}

function renderContextMenu() {
  if (!contextMenu) {
    return;
  }

  if (!state.projectsMenuOpen || state.query.trim()) {
    contextMenu.innerHTML = '';
    return;
  }

  contextMenu.innerHTML = `
    <div class="docs-tree-root">
      <div class="docs-tree-children">
        ${renderMenuNodes(PROJECT_MENU_TREE)}
      </div>
    </div>
  `;

  contextMenu.querySelectorAll('.docs-tree-node').forEach((details) => {
    details.addEventListener('toggle', () => {
      const key = details.getAttribute('data-tree-key');
      if (key) {
        state.projectTreeOpen[key] = details.open;
      }
    });
  });

  contextMenu.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const tab = button.getAttribute('data-tab');
      const anchor = button.getAttribute('data-anchor');
      if (!tab) {
        return;
      }
      setRoute(tab, anchor || '');
    });
  });

  contextMenu.querySelectorAll('.docs-tree-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const details = toggle.closest('.docs-tree-node');
      if (!details) {
        return;
      }
      details.open = !details.open;
      const key = details.getAttribute('data-tree-key');
      if (key) {
        state.projectTreeOpen[key] = details.open;
      }
    });
  });

  setIconTargets();
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
  updateRailActiveState(tabId);
  if (state.query.trim()) {
    renderSearchResults();
    renderContextMenu();
    return;
  }
  await loadPage(tabId);
}

async function renderFromLocation() {
  const { tab, anchor } = parseRouteFromHash();
  state.activeTab = tab;
  updateRailActiveState(tab);

  if (state.query.trim()) {
    renderSearchResults();
    renderContextMenu();
    return;
  }

  await loadPage(tab);
  if (anchor) {
    requestAnimationFrame(() => scrollToAnchor(anchor));
  }
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
    setRoute(button.getAttribute('data-tab'));
    if (window.matchMedia('(max-width: 900px)').matches) {
      state.menuCollapsed = true;
      syncMenuState();
    }
  });
});

projectsToggle?.addEventListener('click', () => {
  state.projectsMenuOpen = !state.projectsMenuOpen;
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

window.addEventListener('hashchange', () => {
  renderFromLocation();
});

if (!window.location.hash || window.location.hash === '#') {
  window.location.hash = `#${ROUTE_DEFAULT}`;
} else {
  renderFromLocation();
}

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
