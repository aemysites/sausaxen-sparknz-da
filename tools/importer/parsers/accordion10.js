/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract accordion items
  function getAccordionItems(container) {
    const items = [];
    // Find all panels (each is an accordion item)
    const panels = container.querySelectorAll('.panel.event-accordion-box');
    panels.forEach(panel => {
      // Title: find the .one-spark-accordion-entry > .accordion-toggle > h3
      const entry = panel.querySelector('.one-spark-accordion-entry');
      let title = null;
      if (entry) {
        const toggle = entry.querySelector('.accordion-toggle');
        if (toggle) {
          title = toggle.querySelector('h3');
        }
      }
      // Content: find the .panel-collapse > .panel-body > .text > .default-mobile-padding
      let content = null;
      const collapse = panel.querySelector('.panel-collapse');
      if (collapse) {
        const body = collapse.querySelector('.panel-body');
        if (body) {
          const text = body.querySelector('.text .default-mobile-padding');
          if (text) {
            content = text;
          }
        }
      }
      // Defensive: only add if title and content exist
      if (title && content) {
        items.push([title, content]);
      }
    });
    return items;
  }

  // Find the accordion container
  const accordionData = element.querySelector('.event-accordion-data');
  if (!accordionData) return;

  // Get all accordion items
  const rows = getAccordionItems(accordionData);

  // Build table cells: header + rows
  const cells = [
    ['Accordion (accordion10)'], // Block name header
    ...rows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
