/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main accordion container
  const accordionData = element.querySelector('.event-accordion-data');
  if (!accordionData) return;

  // Find all accordion panels
  const panels = accordionData.querySelectorAll('.panel.event-accordion-box');
  if (!panels.length) return;

  // Table header row
  const headerRow = ['Accordion (accordion10)'];
  const rows = [headerRow];

  panels.forEach((panel) => {
    // Title cell: Find the clickable title
    const entry = panel.querySelector('.one-spark-accordion-entry');
    let titleCell = '';
    if (entry) {
      // Defensive: Find h3 inside the entry
      const h3 = entry.querySelector('h3');
      if (h3) {
        titleCell = h3;
      } else {
        // Fallback: Use text content of entry
        titleCell = entry.textContent.trim();
      }
    }

    // Content cell: Find the panel body
    let contentCell = '';
    const panelCollapse = panel.querySelector('.panel-collapse');
    if (panelCollapse) {
      const panelBody = panelCollapse.querySelector('.panel-body');
      if (panelBody) {
        // Defensive: Use the entire panelBody content
        contentCell = panelBody;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
