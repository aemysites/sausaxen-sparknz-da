/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion panels
  const panels = element.querySelectorAll('.panel.event-accordion-box');

  // Block header row as required
  const headerRow = ['Accordion (accordion10)'];
  const rows = [headerRow];

  panels.forEach((panel) => {
    // Title cell: .one-spark-accordion-entry > .accordion-toggle > h3
    let titleEl = null;
    const entry = panel.querySelector('.one-spark-accordion-entry');
    if (entry) {
      const toggle = entry.querySelector('.accordion-toggle');
      if (toggle) {
        titleEl = toggle.querySelector('h3');
      }
    }
    // Fallback: try first h3 in panel
    if (!titleEl) {
      titleEl = panel.querySelector('h3');
    }

    // Content cell: .panel-collapse > .panel-body > .text > .default-mobile-padding
    let contentEl = null;
    const collapse = panel.querySelector('.panel-collapse');
    if (collapse) {
      const body = collapse.querySelector('.panel-body');
      if (body) {
        const text = body.querySelector('.text');
        if (text) {
          contentEl = text.querySelector('.default-mobile-padding');
        }
      }
    }
    // Fallback: .panel-body
    if (!contentEl && collapse) {
      contentEl = collapse.querySelector('.panel-body');
    }
    // Fallback: panel itself
    if (!contentEl) {
      contentEl = panel;
    }

    // Add row: [title, content]
    rows.push([titleEl, contentEl]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
