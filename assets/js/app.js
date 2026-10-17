import {
  utilityBySlug,
  renderUtilityCatalog,
  renderUtilityDetail,
  renderUtilityNavigation
} from './utility-docs.js';

const pages = Object.freeze({
  'platform-execution': {
    title: 'Platform execution',
    description: 'How RabbitMQ controls workflow and reusable service execution',
    source: './assets/pages/platform-execution.html'
  },
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
  'workflow-triggers': {
    title: 'Workflow triggers',
    description: 'Choose how a workflow starts',
    source: './assets/pages/workflow-triggers.html'
  },
  'webhook-trigger': {
    title: 'Webhook Trigger',
    description: 'HTTP requests, payloads, authentication, and responses',
    source: './assets/pages/webhook-trigger.html'
  },
  'webhook-auth': {
    title: 'Webhook Auth',
    description: 'Create and manage centralized webhook authentication aliases',
    source: './assets/pages/webhook-auth.html'
  },
  security: {
    title: 'Security',
    description: 'Credentials, Keystore, and Webhook Auth guides',
    source: './assets/pages/security.html'
  },
  'security-credentials': {
    title: 'Security Credentials',
    description: 'Create and manage every supported credential type',
    source: './assets/pages/security-credentials.html'
  },
  keystore: {
    title: 'Keystore',
    description: 'Create and import keys, certificates, and keystores',
    source: './assets/pages/keystore.html'
  },
  'email-trigger': {
    title: 'Email Trigger',
    description: 'Start workflows from incoming IMAP or POP3 messages',
    source: './assets/pages/email-trigger.html'
  },
  'salesforce-trigger': {
    title: 'Salesforce Trigger',
    description: 'Subscribe to Salesforce CDC, event, Generic, and PushTopic channels',
    source: './assets/pages/salesforce-trigger.html'
  },
  'scheduler-trigger': {
    title: 'Scheduler Trigger',
    description: 'Schedule workflow runs with UTC cron expressions',
    source: './assets/pages/scheduler-trigger.html'
  },
  'mongodb-connection': { title: 'MongoDB connection', description: 'Create and test a project MongoDB connection', source: './assets/pages/mongodb-connection.html' },
  'mongodb-connector': { title: 'MongoDB connector', description: 'Run MongoDB document operations in a workflow', source: './assets/pages/mongodb-connector.html' },
  'ibm-db2-connection': { title: 'IBM DB2 connection', description: 'Create and test a project JDBC connection', source: './assets/pages/ibm-db2-connection.html' },
  'ibm-db2-connector': { title: 'IBM DB2 connector', description: 'Execute SQL and manage workflow transactions', source: './assets/pages/ibm-db2-connector.html' },
  'mariadb-connection': { title: 'MariaDB connection', description: 'Create and test a project JDBC connection', source: './assets/pages/mariadb-connection.html' },
  'mariadb-connector': { title: 'MariaDB connector', description: 'Execute SQL and manage workflow transactions', source: './assets/pages/mariadb-connector.html' },
  'mssql-connection': { title: 'Microsoft SQL Server connection', description: 'Create and test a project JDBC connection', source: './assets/pages/mssql-connection.html' },
  'mssql-connector': { title: 'Microsoft SQL Server connector', description: 'Execute SQL and manage workflow transactions', source: './assets/pages/mssql-connector.html' },
  'mysql-connection': { title: 'MySQL connection', description: 'Create and test a project JDBC connection', source: './assets/pages/mysql-connection.html' },
  'mysql-connector': { title: 'MySQL connector', description: 'Execute SQL and manage workflow transactions', source: './assets/pages/mysql-connector.html' },
  'oracle-db-connection': { title: 'Oracle Database connection', description: 'Create and test a project JDBC connection', source: './assets/pages/oracle-db-connection.html' },
  'oracle-db-connector': { title: 'Oracle Database connector', description: 'Execute SQL and manage workflow transactions', source: './assets/pages/oracle-db-connector.html' },
  'postgres-connection': { title: 'PostgreSQL connection', description: 'Create and test a project JDBC connection', source: './assets/pages/postgres-connection.html' },
  'postgres-connector': { title: 'PostgreSQL connector', description: 'Execute SQL and manage workflow transactions', source: './assets/pages/postgres-connector.html' },
  'snowflake-connection': { title: 'Snowflake connection', description: 'Create and test a project Snowflake JDBC connection', source: './assets/pages/snowflake-connection.html' },
  'snowflake-connector': { title: 'Snowflake connector', description: 'Execute SQL in a workflow', source: './assets/pages/snowflake-connector.html' },
  'amqp-connector': { title: 'AMQP connector', description: 'Publish and subscribe with AMQP 0-9-1', source: './assets/pages/amqp-connector.html' },
  'amqp10-connector': { title: 'AMQP 1.0 connector', description: 'Publish and subscribe with AMQP 1.0', source: './assets/pages/amqp10-connector.html' },
  'amqp-trigger': { title: 'AMQP Trigger', description: 'Consume AMQP 0-9-1 queue messages', source: './assets/pages/amqp-trigger.html' },
  'amqp10-trigger': { title: 'AMQP 1.0 Trigger', description: 'Consume AMQP 1.0 source messages', source: './assets/pages/amqp10-trigger.html' },
  'amqp-connection': { title: 'AMQP connection', description: 'Create and test an AMQP 0-9-1 project connection', source: './assets/pages/amqp-connection.html' },
  'amqp10-connection': { title: 'AMQP 1.0 connection', description: 'Create and test an AMQP 1.0 project connection', source: './assets/pages/amqp10-connection.html' },
  'subworkflow-trigger': {
    title: 'SubWorkflow Trigger',
    description: 'Define a callable workflow contract and map parent inputs and outputs',
    source: './assets/pages/subworkflow-trigger.html'
  },
  connections: {
    title: 'Connections',
    description: 'Create and test project connections',
    source: './assets/pages/connections.html'
  },
  'smtp-connection': {
    title: 'Email (SMTP) connection',
    description: 'Configure outbound email transport',
    source: './assets/pages/smtp-connection.html'
  },
  'incoming-email-connection': {
    title: 'Email (IMAP/POP3) connection',
    description: 'Configure an incoming mailbox',
    source: './assets/pages/incoming-email-connection.html'
  },
  'salesforce-connection': {
    title: 'Salesforce Connection',
    description: 'Create and test a project Salesforce connection',
    source: './assets/pages/salesforce-connection.html'
  },
  'salesforce-connector': {
    title: 'Salesforce connector',
    description: 'Salesforce REST, Apex, Bulk, event, and Place Order operations',
    source: './assets/pages/salesforce-connector.html'
  },
  'salesforce-operation-examples': {
    title: 'Salesforce operation examples',
    description: 'Pipeline requests and responses for every Salesforce connector action',
    source: './assets/pages/salesforce-operation-examples.html'
  },
  'slack-connection': { title: 'Slack Connection', description: 'Create and test a Slack workspace connection', source: './assets/pages/slack-connection.html' },
  'slack-connector': { title: 'Slack connector', description: 'Slack conversation and message operations', source: './assets/pages/slack-connector.html' },
  'schema-validator': {
    title: 'Schema Validator',
    description: 'Validate XML against XSD or JSON against an OpenAPI operation',
    source: './assets/pages/schema-validator.html'
  },
  'csv-parser': { title: 'CSV Parser', description: 'CSV Parser workflow guide', source: './assets/pages/csv-parser.html' },
  'sleep': { title: 'Sleep', description: 'Sleep workflow guide', source: './assets/pages/sleep.html' },
  'raise-exception': { title: 'Raise Exception', description: 'Raise Exception workflow guide', source: './assets/pages/raise-exception.html' },
  'logger': { title: 'Logger', description: 'Logger workflow guide', source: './assets/pages/logger.html' },
  'pipeline-logger': { title: 'Pipeline Logger', description: 'Pipeline Logger workflow guide', source: './assets/pages/pipeline-logger.html' },
  'send-http-response': { title: 'Send HttpResponse', description: 'Send HttpResponse workflow guide', source: './assets/pages/send-http-response.html' },
  'sftp-connection': { title: 'SFTP connection', description: 'SFTP connection workflow guide', source: './assets/pages/sftp-connection.html' },
  'xslt-alias': { title: 'XSLT Alias', description: 'Create and maintain project XSLT stylesheets', source: './assets/pages/xslt-alias.html' },
  'xslt-transformer': { title: 'XSLT transformer', description: 'Apply a project XSLT Alias in a workflow', source: './assets/pages/xslt-transformer.html' },
  'send-email': {
    title: 'Send Email',
    description: 'Send text, HTML, and attachments from workflows',
    source: './assets/pages/send-email.html'
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
  'runtime-operations': {
    title: 'Runtime Operations',
    description: 'Monitor workers, queues, outboxes, dependencies, and worker controls',
    source: './assets/pages/runtime-operations.html'
  },
  connector: {
    title: 'Connector',
    description: 'Workflow connector concepts and catalog',
    source: './assets/pages/connectors.html'
  },
  'http-request': {
    title: 'HTTP Request',
    description: 'Workflow REST, GraphQL, SOAP, authentication, retries, and pipeline contracts',
    source: './assets/pages/http-request.html'
  },
  sftp: {
    title: 'SFTP',
    description: 'SFTP prerequisites, host verification, connections, operations, and pipeline contracts',
    source: './assets/pages/sftp.html'
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
const workflowNavBranch = document.querySelector('#workflowNavBranch');
const workflowMenuToggle = document.querySelector('#workflowMenuToggle');
const workflowTriggersNavBranch = document.querySelector('#workflowTriggersNavBranch');
const workflowTriggersMenuToggle = document.querySelector('#workflowTriggersMenuToggle');
const connectionsNavBranch = document.querySelector('#connectionsNavBranch');
const connectionsMenuToggle = document.querySelector('#connectionsMenuToggle');
const securityNavBranch = document.querySelector('#securityNavBranch');
const securityMenuToggle = document.querySelector('#securityMenuToggle');
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

  if (route === 'slack-connection' || route === 'slack-connector' || route === 'project' || route === 'kvs' || route === 'workflow' || route === 'xslt-alias' || route === 'xslt-transformer' || route === 'http-request' || route === 'sftp' || route === 'csv-parser' || route === 'sleep' || route === 'raise-exception' || route === 'logger' || route === 'pipeline-logger' || route === 'send-http-response' || route === 'sftp-connection' || route === 'send-email' || route === 'salesforce-connector' || route === 'salesforce-operation-examples' || route === 'schema-validator' || route === 'workflow-triggers' || route === 'webhook-trigger' || route === 'email-trigger' || route === 'salesforce-trigger' || route === 'scheduler-trigger' || route === 'subworkflow-trigger' || route === 'amqp-trigger' || route === 'amqp10-trigger' || route === 'amqp-connector' || route === 'amqp10-connector' || route === 'amqp-connection' || route === 'amqp10-connection' || route === 'mongodb-connection' || route === 'mongodb-connector' || route === 'snowflake-connection' || route === 'snowflake-connector' || route === 'ibm-db2-connection' || route === 'ibm-db2-connector' || route === 'mariadb-connection' || route === 'mariadb-connector' || route === 'mssql-connection' || route === 'mssql-connector' || route === 'mysql-connection' || route === 'mysql-connector' || route === 'oracle-db-connection' || route === 'oracle-db-connector' || route === 'postgres-connection' || route === 'postgres-connector' || route === 'connections' || route === 'smtp-connection' || route === 'incoming-email-connection' || route === 'salesforce-connection' || route === 'reusable-service' || route === 'map-pipeline' || route === 'if-else' || route === 'switch-case' || route === 'loop' || route === 'exit' || route === 'error-handling' || route === 'utils') {
    setProjectMenuOpen(true);
  }
  if (route === 'slack-connector' || route === 'workflow' || route === 'http-request' || route === 'xslt-transformer' || route === 'sftp' || route === 'csv-parser' || route === 'sleep' || route === 'raise-exception' || route === 'logger' || route === 'pipeline-logger' || route === 'send-http-response' || route === 'sftp-connection' || route === 'send-email' || route === 'salesforce-connector' || route === 'salesforce-operation-examples' || route === 'schema-validator' || route === 'workflow-triggers' || route === 'webhook-trigger' || route === 'email-trigger' || route === 'salesforce-trigger' || route === 'scheduler-trigger' || route === 'subworkflow-trigger' || route === 'amqp-trigger' || route === 'amqp10-trigger' || route === 'amqp-connector' || route === 'amqp10-connector' || route === 'mongodb-connector' || route === 'snowflake-connector' || route === 'ibm-db2-connector' || route === 'mariadb-connector' || route === 'mssql-connector' || route === 'mysql-connector' || route === 'oracle-db-connector' || route === 'postgres-connector') {
    setWorkflowMenuOpen(true);
  }
  if (['workflow-triggers', 'webhook-trigger', 'email-trigger', 'salesforce-trigger', 'scheduler-trigger', 'subworkflow-trigger', 'amqp-trigger', 'amqp10-trigger'].includes(route)) setNestedMenuOpen(workflowTriggersNavBranch, workflowTriggersMenuToggle, 'Workflow triggers', true);
  if (['slack-connection', 'connections', 'smtp-connection', 'incoming-email-connection', 'salesforce-connection', 'amqp-connection', 'amqp10-connection', 'snowflake-connection', 'sftp-connection', 'mongodb-connection', 'ibm-db2-connection', 'mariadb-connection', 'mssql-connection', 'mysql-connection', 'oracle-db-connection', 'postgres-connection'].includes(route)) setNestedMenuOpen(connectionsNavBranch, connectionsMenuToggle, 'Connections', true);
  if (['security', 'webhook-auth', 'security-credentials', 'keystore'].includes(route)) setNestedMenuOpen(securityNavBranch, securityMenuToggle, 'Security', true);
  if (route === 'reusable-service' || route === 'map-pipeline' || route === 'if-else' || route === 'switch-case' || route === 'loop' || route === 'exit' || route === 'error-handling') {
    setReusableServiceMenuOpen(true);
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

function setWorkflowMenuOpen(open) {
  const isOpen = Boolean(open);
  workflowNavBranch?.classList.toggle('collapsed', !isOpen);
  workflowMenuToggle?.setAttribute('aria-expanded', String(isOpen));
  workflowMenuToggle?.setAttribute('aria-label', isOpen ? 'Collapse Workflow menu' : 'Expand Workflow menu');
}

function setNestedMenuOpen(branch, toggle, name, open) {
  branch?.classList.toggle('collapsed', !open);
  toggle?.setAttribute('aria-expanded', String(Boolean(open)));
  toggle?.setAttribute('aria-label', `${open ? 'Collapse' : 'Expand'} ${name} menu`);
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
workflowMenuToggle?.addEventListener('click', () => {
  setWorkflowMenuOpen(workflowNavBranch?.classList.contains('collapsed'));
});
workflowTriggersMenuToggle?.addEventListener('click', () => {
  setNestedMenuOpen(workflowTriggersNavBranch, workflowTriggersMenuToggle, 'Workflow triggers', workflowTriggersNavBranch?.classList.contains('collapsed'));
});
connectionsMenuToggle?.addEventListener('click', () => {
  setNestedMenuOpen(connectionsNavBranch, connectionsMenuToggle, 'Connections', connectionsNavBranch?.classList.contains('collapsed'));
});
securityMenuToggle?.addEventListener('click', () => {
  setNestedMenuOpen(securityNavBranch, securityMenuToggle, 'Security', securityNavBranch?.classList.contains('collapsed'));
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
