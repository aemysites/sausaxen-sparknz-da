/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion panels
  const panels = element.querySelectorAll('.panel.event-accordion-box');
  const rows = [];
  // Header row as per spec
  const headerRow = ['Accordion (accordion5)'];
  rows.push(headerRow);

  panels.forEach(panel => {
    // Title cell: find the h3 inside the .accordion-toggle
    const toggle = panel.querySelector('.accordion-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('h3');
    }
    // Defensive fallback
    if (!titleEl) {
      titleEl = document.createElement('span');
      titleEl.textContent = 'Untitled';
    }

    // Content cell: find the .panel-collapse > .panel-body
    const collapse = panel.querySelector('.panel-collapse');
    let contentEl = null;
    if (collapse) {
      const body = collapse.querySelector('.panel-body');
      if (body) {
        // Use the entire body content for resilience
        contentEl = body;
      }
    }
    // Defensive fallback
    if (!contentEl) {
      contentEl = document.createElement('div');
    }

    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
