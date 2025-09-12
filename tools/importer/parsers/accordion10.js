/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the accordion panels
  const panels = Array.from(element.querySelectorAll('.panel.event-accordion-box'));
  const headerRow = ['Accordion (accordion10)'];
  const rows = [headerRow];

  panels.forEach(panel => {
    // Title cell: find the .one-spark-accordion-entry > .accordion-toggle > h3
    let title = '';
    const entry = panel.querySelector('.one-spark-accordion-entry');
    if (entry) {
      const toggle = entry.querySelector('.accordion-toggle');
      if (toggle) {
        const h3 = toggle.querySelector('h3');
        if (h3) title = h3.textContent.trim();
      }
    }
    // Content cell: find the .panel-collapse > .panel-body > .text > .default-mobile-padding
    let content = null;
    const collapse = panel.querySelector('.panel-collapse');
    if (collapse) {
      const body = collapse.querySelector('.panel-body');
      if (body) {
        const text = body.querySelector('.text .default-mobile-padding');
        if (text) {
          content = text;
        }
      }
    }
    // Defensive: if content not found, fallback to empty div
    if (!content) {
      content = document.createElement('div');
    }
    rows.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
