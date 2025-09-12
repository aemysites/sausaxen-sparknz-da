/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main accordion container
  const accordionData = element.querySelector('.event-accordion-data');
  if (!accordionData) return;

  // Get all accordion panels
  const panels = accordionData.querySelectorAll('.panel.event-accordion-box');
  if (!panels.length) return;

  // Table header
  const headerRow = ['Accordion (accordion10)'];
  const rows = [headerRow];

  panels.forEach((panel) => {
    // Title cell: find the clickable header
    const entry = panel.querySelector('.one-spark-accordion-entry');
    let titleCell = '';
    if (entry) {
      // Use the h3 if present, fallback to textContent
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
        // Use the entire body content for resilience
        contentCell = body;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
