/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion panels
  const accordionPanels = element.querySelectorAll('.panel.event-accordion-box');

  // Table header
  const headerRow = ['Accordion (accordion5)'];

  // Build rows for each accordion item
  const rows = Array.from(accordionPanels).map(panel => {
    // Title cell: find the .accordion-toggle and its h3
    const toggle = panel.querySelector('.accordion-toggle');
    let titleEl = null;
    if (toggle) {
      // Use the h3 as the title
      titleEl = toggle.querySelector('h3');
      // Defensive: fallback to toggle itself if h3 missing
      if (!titleEl) titleEl = toggle;
    }

    // Content cell: find the .panel-collapse and its .panel-body
    const collapse = panel.querySelector('.panel-collapse');
    let contentEl = null;
    if (collapse) {
      const body = collapse.querySelector('.panel-body');
      if (body) {
        // Use the full body block for resilience
        contentEl = body;
      } else {
        contentEl = collapse;
      }
    }

    // Defensive: if either cell missing, use empty string
    return [titleEl || '', contentEl || ''];
  });

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
