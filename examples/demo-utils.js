(function () {
  'use strict';

  // ============================================================
  // Demo toolbar — unified style, unified position (top-right)
  // ============================================================



  function initDemoToolbar(options = {}) {
    const {
      cssId = 'beautify-css',
      cssHref = '../dist/beautify.css',
      darkClass = 'dark',
      darkStorageKey = 'dark-mode-enabled',
      dirStorageKey = 'dir-enabled'
    } = options;

    // ---- Read saved state ----
    const isDarkMode = localStorage.getItem(darkStorageKey) === 'true';
    const isRtl = localStorage.getItem(dirStorageKey) === 'true';

    // Apply saved state
    if (isDarkMode) {
      document.documentElement.classList.add(darkClass);
    }
    if (isRtl) {
      document.documentElement.dir = 'rtl';
    }

    // ---- Create toolbar container ----
    const toolbar = document.createElement('div');
    toolbar.className = 'demo-toolbar';
    Object.assign(toolbar.style, {
      position: 'fixed',
      top: '10px',
      'inset-inline-end': '20px',
      zIndex: 99999,
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      justifyContent: 'flex-end'
    });

    // ============================================================
    // Button 1: CSS toggle
    // ============================================================
    const cssBtn = document.createElement('button');
    cssBtn.className = 'css-toggle';
    // Reflect the actual current state instead of assuming the
    // stylesheet is present on init.
    const cssLinkExists = !!document.getElementById(cssId);
    cssBtn.textContent = cssLinkExists ? 'CSS' : 'NOCSS';


    cssBtn.addEventListener('click', () => {
      const link = document.getElementById(cssId);
      if (link) {
        link.remove();
        cssBtn.textContent = 'NOCSS';
      } else {
        const newLink = document.createElement('link');
        newLink.id = cssId;
        newLink.rel = 'stylesheet';
        newLink.href = cssHref;
        document.head.appendChild(newLink);
        cssBtn.textContent = 'CSS';
      }
    });

    // ============================================================
    // Button 2: Dark / Light mode toggle
    // ============================================================
    const darkBtn = document.createElement('button');
    darkBtn.className = 'dark-toggle';
    darkBtn.textContent = isDarkMode ? 'Day' : 'Night';


    darkBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isCurrentlyDark = html.classList.contains(darkClass);
      if (isCurrentlyDark) {
        html.classList.remove(darkClass);
        darkBtn.textContent = 'Night';
        localStorage.setItem(darkStorageKey, 'false');
      } else {
        html.classList.add(darkClass);
        darkBtn.textContent = 'Day';
        localStorage.setItem(darkStorageKey, 'true');
      }
    });

    // ============================================================
    // Button 3: RTL / LTR direction toggle
    // ============================================================
    const dirBtn = document.createElement('button');
    dirBtn.className = 'dir-toggle';
    dirBtn.textContent = isRtl ? 'RTL' : 'LTR';


    dirBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isCurrentlyRtl = html.dir === 'rtl';
      if (isCurrentlyRtl) {
        html.dir = 'ltr';
        dirBtn.textContent = 'LTR';
        localStorage.setItem(dirStorageKey, 'false');
      } else {
        html.dir = 'rtl';
        dirBtn.textContent = 'RTL';
        localStorage.setItem(dirStorageKey, 'true');
      }
    });

    // ---- Assemble toolbar ----
    toolbar.appendChild(cssBtn);
    toolbar.appendChild(darkBtn);
    toolbar.appendChild(dirBtn);
    document.body.appendChild(toolbar);
  }

  // ============================================================
  // Init
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initDemoToolbar();
  });

  // Expose globally
  window.initDemoToolbar = initDemoToolbar;
})();