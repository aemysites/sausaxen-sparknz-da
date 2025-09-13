/* global WebImporter */
export default function parse(element, { document }) {
  // Get all accordion panels
  const accordionPanels = element.querySelectorAll('.panel.event-accordion-box');
  const cells = [];

  // Header row: must be a single cell array (block name)
  cells.push(['Accordion (accordion5)']);

  accordionPanels.forEach((panel) => {
    // Title cell: get the h3 inside the .accordion-toggle
    let titleCell = '';
    const toggle = panel.querySelector('.accordion-toggle');
    if (toggle) {
      const h3 = toggle.querySelector('h3');
      if (h3) {
        titleCell = h3.textContent.trim();
      } else {
        titleCell = toggle.textContent.trim();
      }
    }

    // Content cell: get all children of .panel-body > .text > .default-mobile-padding
    let contentCell = '';
    const panelBody = panel.querySelector('.panel-body');
    if (panelBody) {
      const contentWrapper = panelBody.querySelector('.default-mobile-padding');
      if (contentWrapper) {
        // Use all children (p, ul, etc) as content
        contentCell = Array.from(contentWrapper.children);
        if (contentCell.length === 1) {
          contentCell = contentCell[0];
        }
      } else {
        // fallback: use all children of panelBody
        contentCell = Array.from(panelBody.children);
        if (contentCell.length === 1) {
          contentCell = contentCell[0];
        }
      }
    }

    cells.push([titleCell, contentCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
