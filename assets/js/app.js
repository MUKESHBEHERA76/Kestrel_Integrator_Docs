import {
  utilityBySlug,
  renderUtilityCatalog,
  renderUtilityDetail,
  renderUtilityNavigation
} from './utility-docs.js';

const pages = Object.freeze({
  introduction: {
    title: 'Introduction',
    description: 'Kestrel Integrator platform overview',
    source: './assets/pages/overview.html'
  },
  project: {
    title: 'Project',
    description: 'Project organization and resource boundaries',
    source: './assets/pages/project.html'
  },
  workflow: {
    title: 'Workflow',
    description: 'Workflow concepts, editor, triggers, utilities, and execution',
    source: './assets/pages/workflow.html'
  },
  'reusable-service': {
    title: 'Reusable Service',
    description: 'Reusable service contracts, flow steps, mapping, and invocation',
    source: './assets/pages/services.html'
  },
  'map-pipeline': {
    title: 'Map Pipeline',
    description: 'Reusable service MAP Pipeline operations and examples',
    source: './assets/pages/map-pipeline.html'
  },
  'if-else': {
    title: 'IF-ELSE',
    description: 'Reusable service IF, ELSE IF, and ELSE branching',
    source: './assets/pages/if-else.html'
  },
  'switch-case': {
    title: 'Switch Case',
    description: 'Reusable service SWITCH cases, matching, and default behavior',
    source: './assets/pages/switch-case.html'
  },
  loop: {
    title: 'Loop',
    description: 'Reusable service list iteration, current item, and loop exit',
    source: './assets/pages/loop.html'
  },
  exit: {
    title: 'Exit',
    description: 'Reusable service flow exit, loop exit, and exception behavior',
    source: './assets/pages/exit.html'
  },
  'error-handling': {
    title: 'Error Handling',
    description: 'Reusable service TRY, CATCH, FINALLY, and runtime error details',
    source: './assets/pages/error-handling.html'
  },
  utils: {
    title: 'Utils',
    description: 'Built-in workflow and reusable-service utility reference',
    source: './assets/pages/utils.html'
  },
  'pipeline-sub': {
    title: 'Pipeline Sub',
    description: 'Pipeline substitution syntax and editor copy workflow',
    source: './assets/pages/pipeline-sub.html'
  },
  kvs: {
    title: 'KVS',
    description: 'Project key-value storage and password handling',
    source: './assets/pages/kvs.html'
  },
  execution: {
    title: 'Execution',
    description: 'Durable workflow execution architecture',
    source: './assets/pages/execution.html'
  },
  connector: {
    title: 'Connector',
    description: 'Workflow connector concepts and catalog',
    source: './assets/pages/connectors.html'
  },
  'http-request': {
    title: 'HTTP Request',
    description: 'REST, GraphQL, SOAP, authentication, and multipart requests',
    source: './assets/pages/http-request.html'
  }
});

const defaultRoute = 'introduction';
const app = document.querySelector('#app');
const pageView = document.querySelector('#pageView');
const currentPageLabel = document.querySelector('#currentPageLabel');
const menuToggle = document.querySelector('#menuToggle');
const sidebarClose = document.querySelector('#sidebarClose');
const sidebarOverlay = document.querySelector('#sidebarOverlay');
const projectNavBranch = document.querySelector('#projectNavBranch');
const projectMenuToggle = document.querySelector('#projectMenuToggle');
const connectorNavBranch = document.querySelector('#connectorNavBranch');
const connectorMenuToggle = document.querySelector('#connectorMenuToggle');
const reusableServiceNavBranch = document.querySelector('#reusableServiceNavBranch');
const reusableServiceMenuToggle = document.querySelector('#reusableServiceMenuToggle');
const utilsNavBranch = document.querySelector('#utilsNavBranch');
const utilsMenuToggle = document.querySelector('#utilsMenuToggle');
const utilsSubmenu = document.querySelector('#utilsSubmenu');
const documentationMenuSearch = document.querySelector('#documentationMenuSearch');
const documentationNav = document.querySelector('.docs-nav');
const mobileQuery = window.matchMedia('(max-width: 900px)');

let activeRequest;
let initialRender = true;

function locationState() {
  const [routePart, ...pathParts] = window.location.hash.replace(/^#\/?/, '').split('/');
  const route = routePart?.trim().toLowerCase();
  return {
    route: Object.hasOwn(pages, route) ? route : defaultRoute,
    anchor: pathParts.join('/')
  };
}

function canonicalHash(route, anchor = '') {
  return anchor ? `#/${route}/${anchor}` : `#/${route}`;
}

function setMenuOpen(open) {
  const isOpen = Boolean(open && mobileQuery.matches);
  app.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close documentation menu' : 'Open documentation menu');
  document.body.classList.toggle('no-scroll', isOpen);
}

function updateNavigation(route, anchor = '') {
  const navigationAnchor = anchor.split('/')[0] || '';
  const utilityDetailActive = route === 'utils' && utilityBySlug.has(navigationAnchor);
  document.querySelectorAll('[data-route]').forEach((link) => {
    const linkAnchor = link.dataset.anchor || '';
    const active = link.dataset.route === route
      && (linkAnchor ? linkAnchor === navigationAnchor : !utilityDetailActive);
    link.classList.toggle('active', active);
    if (active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  if (route === 'project' || route === 'kvs' || route === 'workflow' || route === 'reusable-service' || route === 'map-pipeline' || route === 'if-else' || route === 'switch-case' || route === 'loop' || route === 'exit' || route === 'error-handling' || route === 'utils') {
    setProjectMenuOpen(true);
  }
  if (route === 'reusable-service' || route === 'map-pipeline' || route === 'if-else' || route === 'switch-case' || route === 'loop' || route === 'exit' || route === 'error-handling') {
    setReusableServiceMenuOpen(true);
  }
  if (route === 'connector' || route === 'http-request') {
    setConnectorMenuOpen(true);
  }
  if (route === 'utils') {
    setUtilsMenuOpen(true);
  }
}

function setProjectMenuOpen(open) {
  const isOpen = Boolean(open);
  projectNavBranch?.classList.toggle('collapsed', !isOpen);
  projectMenuToggle?.setAttribute('aria-expanded', String(isOpen));
  projectMenuToggle?.setAttribute('aria-label', isOpen ? 'Collapse Project menu' : 'Expand Project menu');
}

function setConnectorMenuOpen(open) {
  const isOpen = Boolean(open);
  connectorNavBranch?.classList.toggle('collapsed', !isOpen);
  connectorMenuToggle?.setAttribute('aria-expanded', String(isOpen));
  connectorMenuToggle?.setAttribute('aria-label', isOpen ? 'Collapse Connector menu' : 'Expand Connector menu');
}

function setReusableServiceMenuOpen(open) {
  const isOpen = Boolean(open);
  reusableServiceNavBranch?.classList.toggle('collapsed', !isOpen);
  reusableServiceMenuToggle?.setAttribute('aria-expanded', String(isOpen));
  reusableServiceMenuToggle?.setAttribute('aria-label', isOpen ? 'Collapse Reusable Service menu' : 'Expand Reusable Service menu');
}

function setUtilsMenuOpen(open) {
  const isOpen = Boolean(open);
  utilsNavBranch?.classList.toggle('collapsed', !isOpen);
  utilsMenuToggle?.setAttribute('aria-expanded', String(isOpen));
  utilsMenuToggle?.setAttribute('aria-label', isOpen ? 'Collapse Utils menu' : 'Expand Utils menu');
}

function filterDocumentationMenu(value = '') {
  const query = String(value).trim().toLowerCase();

  documentationNav?.querySelectorAll(':scope > .nav-link').forEach((link) => {
    link.hidden = Boolean(query && !link.textContent.toLowerCase().includes(query));
  });

  documentationNav?.querySelectorAll(':scope > .nav-branch').forEach((branch) => {
    const parentLink = branch.querySelector(':scope > .nav-branch-row .nav-link');
    const childLinks = [...branch.querySelectorAll('.nav-child-link')];
    const parentMatches = Boolean(parentLink?.textContent.toLowerCase().includes(query));
    const matchingChildren = childLinks.filter((link) => link.textContent.toLowerCase().includes(query));

    childLinks.forEach((link) => {
      link.hidden = Boolean(query && !parentMatches && !matchingChildren.includes(link));
    });
    branch.querySelectorAll('.utility-nav-group').forEach((group) => {
      const groupLinks = [...group.querySelectorAll('.nav-child-link')];
      group.hidden = Boolean(query && !parentMatches && groupLinks.every((link) => link.hidden));
    });
    branch.hidden = Boolean(query && !parentMatches && matchingChildren.length === 0);

    if (query && matchingChildren.length > 0) {
      const toggle = branch.querySelector(':scope > .nav-branch-row .nav-branch-toggle');
      const branchName = parentLink?.querySelector('strong')?.textContent.trim() || 'section';
      branch.classList.remove('collapsed');
      toggle?.setAttribute('aria-expanded', 'true');
      toggle?.setAttribute('aria-label', `Collapse ${branchName} menu`);
      matchingChildren.forEach((link) => {
        let ancestor = link.closest('.nav-branch');
        while (ancestor) {
          ancestor.classList.remove('collapsed');
          const ancestorLink = ancestor.querySelector(':scope > .nav-branch-row a');
          if (ancestorLink) ancestorLink.hidden = false;
          ancestor.querySelector(':scope > .nav-branch-row .nav-branch-toggle')?.setAttribute('aria-expanded', 'true');
          ancestor = ancestor.parentElement?.closest('.nav-branch');
        }
      });
    }
  });
}

function showLoadError(page) {
  pageView.innerHTML = `
    <section class="load-error" role="alert">
      <span class="load-error-icon" aria-hidden="true">!</span>
      <p class="eyebrow">Unable to load page</p>
      <h1>${page.title}</h1>
      <p>Run this static site through a local web server or verify that its page file is available.</p>
      <button class="primary-action" type="button" data-retry>Try again</button>
    </section>
  `;
  pageView.querySelector('[data-retry]')?.addEventListener('click', renderRoute);
}

async function renderRoute() {
  const { route, anchor } = locationState();
  const expectedHash = canonicalHash(route, anchor);

  if (window.location.hash !== expectedHash) {
    window.history.replaceState(null, '', expectedHash);
  }

  const page = pages[route];
  updateNavigation(route, anchor);
  const [utilitySlug = '', utilitySection = ''] = anchor.split('/');
  const utility = route === 'utils' && utilitySlug ? utilityBySlug.get(utilitySlug) : null;
  const pageTitle = utility ? utility.name : page.title;
  currentPageLabel.textContent = utility ? `Utils / ${utility.name}` : page.title;
  document.title = `${pageTitle} | Kestrel Integrator Docs`;
  setMenuOpen(false);

  activeRequest?.abort();
  activeRequest = new AbortController();
  pageView.setAttribute('aria-busy', 'true');
  pageView.innerHTML = '<div class="page-loading" role="status">Loading documentation…</div>';

  try {
    const response = await fetch(page.source, { signal: activeRequest.signal });
    if (!response.ok) {
      throw new Error(`Documentation request failed with ${response.status}`);
    }
    pageView.innerHTML = await response.text();
    if (route === 'utils') {
      if (utility) {
        pageView.innerHTML = renderUtilityDetail(utility);
      } else {
        const catalog = pageView.querySelector('[data-utility-catalog]');
        if (catalog) catalog.innerHTML = renderUtilityCatalog();
      }
    }
    pageView.setAttribute('aria-busy', 'false');

    if (anchor) {
      requestAnimationFrame(() => {
        const scrollTarget = utility ? (utilitySection || utilitySlug) : anchor;
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else if (!initialRender) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (!initialRender) {
      pageView.focus({ preventScroll: true });
    }
    initialRender = false;
  } catch (error) {
    if (error.name !== 'AbortError') {
      pageView.setAttribute('aria-busy', 'false');
      showLoadError(page);
      initialRender = false;
    }
  }
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(!app.classList.contains('menu-open'));
});
sidebarClose.addEventListener('click', () => setMenuOpen(false));
sidebarOverlay.addEventListener('click', () => setMenuOpen(false));
projectMenuToggle?.addEventListener('click', () => {
  setProjectMenuOpen(projectNavBranch?.classList.contains('collapsed'));
});
connectorMenuToggle?.addEventListener('click', () => {
  setConnectorMenuOpen(connectorNavBranch?.classList.contains('collapsed'));
});
reusableServiceMenuToggle?.addEventListener('click', () => {
  setReusableServiceMenuOpen(reusableServiceNavBranch?.classList.contains('collapsed'));
});
utilsMenuToggle?.addEventListener('click', () => {
  setUtilsMenuOpen(utilsNavBranch?.classList.contains('collapsed'));
});
documentationMenuSearch?.addEventListener('input', (event) => {
  filterDocumentationMenu(event.target.value);
});
documentationMenuSearch?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && event.currentTarget.value) {
    event.stopPropagation();
    event.currentTarget.value = '';
    filterDocumentationMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false);
  }
});

mobileQuery.addEventListener('change', () => setMenuOpen(false));
window.addEventListener('hashchange', renderRoute);

if (utilsSubmenu) {
  utilsSubmenu.innerHTML = renderUtilityNavigation();
}

if (!window.location.hash || window.location.hash === '#') {
  window.history.replaceState(null, '', canonicalHash(defaultRoute));
}
renderRoute();
