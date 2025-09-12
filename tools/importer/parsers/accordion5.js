/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion panels
  const accordionPanels = element.querySelectorAll('.panel.event-accordion-box');
  const rows = [];

  // Header row as per block guidelines
  rows.push(['Accordion (accordion5)']);

  accordionPanels.forEach((panel) => {
    // Title cell: find the h3 inside the .accordion-toggle
    let titleCell = '';
    const toggle = panel.querySelector('.accordion-toggle');
    if (toggle) {
      const h3 = toggle.querySelector('h3');
      if (h3) {
        titleCell = h3;
      } else {
        // fallback: use toggle text
        titleCell = toggle.textContent.trim();
      }
    }

    // Content cell: find the .panel-body (expanded content)
    let contentCell = '';
    const panelBody = panel.querySelector('.panel-body');
    if (panelBody) {
      // Use the .default-mobile-padding div if present for more focused content
      const inner = panelBody.querySelector('.default-mobile-padding');
      if (inner) {
        contentCell = inner;
      } else {
        contentCell = panelBody;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
