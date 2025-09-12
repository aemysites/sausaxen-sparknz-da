/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all accordion items
  const accordionContainer = element.querySelector('.one-spark-accordion-container');
  if (!accordionContainer) return;

  // Get all panels (accordion items)
  const panels = accordionContainer.querySelectorAll('.panel.event-accordion-box');

  // Table header
  const headerRow = ['Accordion (accordion5)'];
  const rows = [headerRow];

  panels.forEach(panel => {
    // Title cell: find the clickable title
    const entry = panel.querySelector('.one-spark-accordion-entry');
    let titleCell = null;
    if (entry) {
      // Use the entire clickable header (h3 and any helptext)
      const toggle = entry.querySelector('.accordion-toggle');
      if (toggle) {
        // Defensive: use only the h3 if present, else the toggle div
        const h3 = toggle.querySelector('h3');
        titleCell = h3 ? h3 : toggle;
      } else {
        titleCell = entry;
      }
    } else {
      titleCell = panel;
    }

    // Content cell: find the expanded content
    let contentCell = null;
    const collapse = panel.querySelector('.panel-collapse');
    if (collapse) {
      const panelBody = collapse.querySelector('.panel-body');
      if (panelBody) {
        // Use the entire panel-body div for resilience
        contentCell = panelBody;
      } else {
        contentCell = collapse;
      }
    } else {
      contentCell = panel;
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
