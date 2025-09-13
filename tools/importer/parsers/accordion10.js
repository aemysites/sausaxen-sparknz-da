/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion panels
  const panels = element.querySelectorAll('.panel.event-accordion-box');
  const rows = [];
  // Header row as required
  const headerRow = ['Accordion (accordion10)'];
  rows.push(headerRow);

  panels.forEach((panel) => {
    // Title cell: get the h3 inside .accordion-toggle
    const toggle = panel.querySelector('.accordion-toggle');
    let titleCell = '';
    if (toggle) {
      const h3 = toggle.querySelector('h3');
      if (h3) {
        titleCell = h3;
      } else {
        // fallback: use toggle textContent
        titleCell = document.createTextNode(toggle.textContent.trim());
      }
    }
    // Content cell: get the .panel-body (all content inside)
    let contentCell = '';
    const panelBody = panel.querySelector('.panel-body');
    if (panelBody) {
      // Use the entire panel-body content as the content cell
      contentCell = panelBody;
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
