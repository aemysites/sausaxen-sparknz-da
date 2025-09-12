/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion panels
  const panels = element.querySelectorAll('.panel.event-accordion-box');
  const rows = [];
  // Always use the required header
  const headerRow = ['Accordion (accordion5)'];
  rows.push(headerRow);

  panels.forEach((panel) => {
    // Title cell: find the entry with the h3
    const entry = panel.querySelector('.one-spark-accordion-entry');
    let titleCell = '';
    if (entry) {
      const h3 = entry.querySelector('h3');
      if (h3) {
        titleCell = h3;
      }
    }
    // Content cell: find the panel-collapse > panel-body
    let contentCell = '';
    const collapse = panel.querySelector('.panel-collapse');
    if (collapse) {
      const body = collapse.querySelector('.panel-body');
      if (body) {
        // Use the entire body content for resilience
        contentCell = body;
      }
    }
    // Defensive: if either cell is missing, skip this row
    if (titleCell && contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
