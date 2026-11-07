/* Progressive enhancement: all research content is available without JavaScript. */
(() => {
  'use strict';
  const tabs = document.querySelector('.demo-tabs');
  if (tabs) {
    const buttons = [...tabs.querySelectorAll('button[data-panel]')];
    const panels = buttons.map(button => document.getElementById(button.dataset.panel));
    if (buttons.length && panels.every(Boolean)) {
      tabs.setAttribute('role', 'tablist');
      tabs.classList.add('enhanced');
      const activate = (index, moveFocus = false) => {
        buttons.forEach((button, i) => {
          const selected = index === i;
          button.setAttribute('aria-selected', String(selected));
          button.tabIndex = selected ? 0 : -1;
          panels[i].hidden = !selected;
        });
        if (moveFocus) buttons[index].focus();
      };
      buttons.forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', panels[index].id);
        panels[index].setAttribute('role', 'tabpanel');
        panels[index].setAttribute('aria-labelledby', button.id);
        panels[index].tabIndex = 0;
        button.addEventListener('click', () => activate(index));
        button.addEventListener('keydown', event => {
          let next;
          if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
          if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
          if (event.key === 'Home') next = 0;
          if (event.key === 'End') next = buttons.length - 1;
          if (next !== undefined) {
            event.preventDefault();
            activate(next, true);
          }
        });
      });
      activate(0);
    }
  }
  const copyButton = document.getElementById('copy-bibtex');
  const citation = document.getElementById('bibtex-code');
  const copyStatus = document.getElementById('copy-status');
  if (copyButton && citation && copyStatus) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(citation.textContent);
        copyButton.textContent = 'Copied';
        copyStatus.textContent = 'BibTeX copied to clipboard.';
      } catch {
        const selection = window.getSelection();
        if (selection) {
          const range = document.createRange();
          range.selectNodeContents(citation);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        copyStatus.textContent = 'Citation selected. Copy the text or use Download .bib.';
      }
    });
  }
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('nav a[href^="#"]')];
    const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();

// Make supplemental analysis printable, then restore the visitor's disclosure state.
(() => {
  let openedForPrint = [];
  window.addEventListener('beforeprint', () => {
    openedForPrint = [...document.querySelectorAll('details:not([open])')];
    openedForPrint.forEach(detail => { detail.open = true; });
  });
  window.addEventListener('afterprint', () => {
    openedForPrint.forEach(detail => { detail.open = false; });
    openedForPrint = [];
  });
})();
