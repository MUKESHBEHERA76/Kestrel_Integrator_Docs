const icon = (paths, viewBox = '0 0 24 24') => `
  <svg viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${paths}
  </svg>
`;

export const ICONS = {
  home: icon(`
    <path d="M4 11.5L12 4l8 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.5 10.8V20h11V10.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10 20v-5h4v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  `),
  projects: icon(`
    <rect x="4.5" y="5" width="6.5" height="6.5" rx="1.6" stroke="currentColor" stroke-width="1.8" />
    <rect x="13" y="5" width="6.5" height="6.5" rx="1.6" stroke="currentColor" stroke-width="1.8" />
    <rect x="4.5" y="13.5" width="6.5" height="6.5" rx="1.6" stroke="currentColor" stroke-width="1.8" />
    <rect x="13" y="13.5" width="6.5" height="6.5" rx="1.6" stroke="currentColor" stroke-width="1.8" />
  `),
  connectors: icon(`
    <path d="M7 7.5h10M7 16.5h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    <circle cx="6" cy="7.5" r="2" stroke="currentColor" stroke-width="1.8" />
    <circle cx="18" cy="16.5" r="2" stroke="currentColor" stroke-width="1.8" />
  `),
  workflow: icon(`
    <path d="M6 7h6v4H6zM12 13h6v4h-6zM12 7h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 11v2M9 11v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  `),
  services: icon(`
    <path d="M8 7h8v3H8zM6 10h12v7H6z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
    <path d="M9 13h6M9 16h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  `),
  console: icon(`
    <rect x="4.5" y="5" width="15" height="14" rx="2" stroke="currentColor" stroke-width="1.8" />
    <path d="M7 9l2.2 2.2L7 13.4M10.5 14h4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  `),
  utilities: icon(`
    <path d="M7 5.5h10l1.5 3.5-6.5 9-6.5-9L7 5.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
    <path d="M9 9h6M10 12h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  `),
  reference: icon(`
    <path d="M7 4.5h7l3 3V19.5H7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
    <path d="M10 11h5M10 14h5M10 8h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  `),
  search: icon(`
    <circle cx="10" cy="10" r="5.8" stroke="currentColor" stroke-width="1.8" />
    <path d="M14.5 14.5L19 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  `),
  chevron: icon(`
    <path d="M8 10l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  `),
  spark: icon(`
    <path d="M12 4.5l1.6 4.2L18 10.2l-4.4 1.5L12 16l-1.6-4.3L6 10.2l4.4-1.5L12 4.5Z" fill="currentColor" />
  `),
  chip: icon(`
    <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.8" />
    <path d="M9 4.5v2M12 4.5v2M15 4.5v2M9 17.5v2M12 17.5v2M15 17.5v2M4.5 9h2M4.5 12h2M4.5 15h2M17.5 9h2M17.5 12h2M17.5 15h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
  `),
  document: icon(`
    <path d="M7 4.5h7l3 3V19.5H7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
    <path d="M10 11h5M10 14h5M10 8h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  `),
};
