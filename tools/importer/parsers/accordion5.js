/* global WebImporter */
export default function parse(element, { document }) {
  // Get all accordion panels
  const panels = element.querySelectorAll('.panel.event-accordion-box');

  // Table header row: single column
  const headerRow = ['Accordion (accordion5)'];
  const cells = [headerRow];

  panels.forEach((panel) => {
    // Title cell: get h3 inside .accordion-toggle
    let titleCell = null;
    const toggle = panel.querySelector('.accordion-toggle');
    if (toggle) {
      const h3 = toggle.querySelector('h3');
      if (h3) {
        titleCell = h3;
      } else {
        titleCell = document.createElement('div');
        titleCell.textContent = toggle.textContent.trim();
      }
    } else {
      titleCell = document.createElement('div');
      titleCell.textContent = panel.textContent.trim();
    }

    // Content cell: get .panel-body
    let contentCell = null;
    const panelBody = panel.querySelector('.panel-body');
    if (panelBody) {
      contentCell = panelBody;
    } else {
      contentCell = document.createElement('div');
    }

    // Each row is an array of two cells
    cells.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
