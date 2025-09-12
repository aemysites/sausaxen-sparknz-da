/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion panels
  const panels = element.querySelectorAll('.panel.event-accordion-box');
  const rows = [];
  // Block header row as per guidelines
  const headerRow = ['Accordion (accordion10)'];
  rows.push(headerRow);
  panels.forEach((panel) => {
    // Title cell: .one-spark-accordion-entry > .accordion-toggle > h3
    let titleCell = '';
    const entry = panel.querySelector('.one-spark-accordion-entry');
    if (entry) {
      const toggle = entry.querySelector('.accordion-toggle');
      if (toggle) {
        const h3 = toggle.querySelector('h3');
        if (h3) titleCell = h3;
      }
    }
    // Content cell: .panel-collapse > .panel-body > .text > .default-mobile-padding
    let contentCell = '';
    const collapse = panel.querySelector('.panel-collapse');
    if (collapse) {
      const body = collapse.querySelector('.panel-body');
      if (body) {
        const text = body.querySelector('.text .default-mobile-padding');
        if (text) contentCell = text;
      }
    }
    // Only add row if both title and content are found
    if (titleCell && contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });
  // Create the accordion block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
