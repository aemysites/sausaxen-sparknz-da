/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main accordion container
  const accordionData = element.querySelector('.event-accordion-data');
  if (!accordionData) return;

  // Find all accordion panels
  const panels = accordionData.querySelectorAll('.panel.event-accordion-box');
  if (!panels.length) return;

  // Table header
  const headerRow = ['Accordion (accordion10)'];
  const rows = [headerRow];

  panels.forEach(panel => {
    // Title cell: find the clickable title
    const entry = panel.querySelector('.one-spark-accordion-entry');
    let titleCell = '';
    if (entry) {
      // Prefer h3, fallback to textContent of entry
      const h3 = entry.querySelector('h3');
      if (h3) {
        titleCell = h3;
      } else {
        titleCell = entry.textContent.trim();
      }
    }

    // Content cell: find the panel body
    let contentCell = '';
    const collapse = panel.querySelector('.panel-collapse');
    if (collapse) {
      const body = collapse.querySelector('.panel-body');
      if (body) {
        // Use the inner content of panel-body
        contentCell = body;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
