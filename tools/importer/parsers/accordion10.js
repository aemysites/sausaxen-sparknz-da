/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion panels
  const panels = element.querySelectorAll('.panel.event-accordion-box');
  const rows = [];
  // Header row as specified
  rows.push(['Accordion (accordion10)']);

  panels.forEach((panel) => {
    // Title cell: get the h3 inside the .accordion-toggle
    const toggle = panel.querySelector('.accordion-toggle');
    let titleCell;
    if (toggle) {
      const h3 = toggle.querySelector('h3');
      if (h3) {
        titleCell = h3;
      } else {
        // fallback: use toggle text
        titleCell = document.createElement('div');
        titleCell.textContent = toggle.textContent.trim();
      }
    } else {
      // fallback: empty
      titleCell = document.createElement('div');
    }

    // Content cell: get the .panel-body content
    let contentCell;
    const panelBody = panel.querySelector('.panel-body');
    if (panelBody) {
      // Use the entire panel-body as content
      contentCell = panelBody;
    } else {
      // fallback: empty
      contentCell = document.createElement('div');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
