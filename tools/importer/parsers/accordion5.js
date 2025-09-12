/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordionContainer = element.querySelector('.one-spark-accordion-container');
  if (!accordionContainer) return;

  // Get all accordion panels
  const panels = accordionContainer.querySelectorAll('.panel.event-accordion-box');
  if (!panels.length) return;

  // Table header: block name only, exactly one column
  const headerRow = ['Accordion (accordion5)'];
  const rows = [headerRow];

  panels.forEach(panel => {
    // Title cell: .one-spark-accordion-entry > .accordion-toggle > h3
    let titleCell = null;
    const entry = panel.querySelector('.one-spark-accordion-entry');
    if (entry) {
      const toggle = entry.querySelector('.accordion-toggle');
      if (toggle) {
        const h3 = toggle.querySelector('h3');
        if (h3) titleCell = h3;
      }
    }
    if (!titleCell && entry) titleCell = entry;

    // Content cell: .panel-collapse > .panel-body
    let contentCell = null;
    const collapse = panel.querySelector('.panel-collapse');
    if (collapse) {
      const body = collapse.querySelector('.panel-body');
      if (body) contentCell = body;
    }
    if (!contentCell && collapse) contentCell = collapse;

    if (titleCell && contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
