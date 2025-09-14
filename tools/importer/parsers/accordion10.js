/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion panels
  const panels = element.querySelectorAll('.panel.event-accordion-box');
  const rows = [];
  // Header row as per block guidelines
  rows.push(['Accordion (accordion10)']);

  panels.forEach((panel) => {
    // Title cell: find the clickable title
    const entry = panel.querySelector('.one-spark-accordion-entry');
    let titleEl = null;
    if (entry) {
      // The title is inside an h3 within the clickable div
      const h3 = entry.querySelector('h3');
      if (h3) {
        titleEl = h3;
      } else {
        // Fallback: use the entry itself if h3 is missing
        titleEl = entry;
      }
    }

    // Content cell: find the collapsible content
    let contentEl = null;
    const collapse = panel.querySelector('.panel-collapse');
    if (collapse) {
      // The actual content is inside .panel-body > .text > .default-mobile-padding
      const body = collapse.querySelector('.panel-body');
      if (body) {
        const text = body.querySelector('.text .default-mobile-padding');
        if (text) {
          contentEl = text;
        } else {
          // Fallback: use body itself
          contentEl = body;
        }
      } else {
        contentEl = collapse;
      }
    }

    // Defensive: only add row if both title and content exist
    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
