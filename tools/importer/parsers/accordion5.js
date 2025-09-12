/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion panels
  const panels = element.querySelectorAll('.panel.event-accordion-box');
  const rows = [];

  // Header row as per guidelines
  const headerRow = ['Accordion (accordion5)'];
  rows.push(headerRow);

  panels.forEach((panel) => {
    // Title cell: find the h3 inside the .accordion-toggle
    const toggle = panel.querySelector('.accordion-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('h3');
    }
    // Defensive fallback: if no h3, use toggle itself
    if (!titleEl && toggle) {
      titleEl = toggle;
    }
    // Content cell: find the .panel-body
    const collapse = panel.querySelector('.panel-collapse');
    let contentEl = null;
    if (collapse) {
      const panelBody = collapse.querySelector('.panel-body');
      if (panelBody) {
        // Use the full panelBody, which contains all content for this accordion item
        contentEl = panelBody;
      }
    }
    // Defensive fallback: if no content, use empty string
    if (!contentEl) {
      contentEl = document.createElement('div');
    }
    // Push row: [title, content]
    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
