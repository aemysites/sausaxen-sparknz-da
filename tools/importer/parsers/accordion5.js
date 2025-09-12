/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract accordion items
  function getAccordionItems(container) {
    const items = [];
    // Find all panels (each is an accordion item)
    const panelEls = container.querySelectorAll('.panel.event-accordion-box');
    panelEls.forEach(panel => {
      // Title cell: find the clickable title
      let titleEl = panel.querySelector('.one-spark-accordion-entry > .accordion-toggle > h3');
      if (!titleEl) {
        titleEl = panel.querySelector('h3');
      }
      // Get only the text content for the title cell
      const titleText = titleEl ? titleEl.textContent.trim() : '';
      // Content cell: find the content area
      let contentEl = panel.querySelector('.panel-collapse .panel-body');
      if (!contentEl) {
        contentEl = panel.querySelector('.panel-collapse');
      }
      // If content is deeply nested, grab the innermost content block
      if (contentEl) {
        const innerContent = contentEl.querySelector('.default-mobile-padding');
        if (innerContent) {
          contentEl = innerContent;
        }
      }
      // Defensive: if title or content missing, skip
      if (titleText && contentEl) {
        items.push([titleText, contentEl]);
      }
    });
    return items;
  }

  // Find the accordion container
  let accordionContainer = element.querySelector('.one-spark-accordion-container');
  if (!accordionContainer) {
    accordionContainer = element;
  }

  // Build table rows
  const headerRow = ['Accordion (accordion5)']; // Only one column in header row
  const rows = [headerRow];
  const accordionItems = getAccordionItems(accordionContainer);
  rows.push(...accordionItems);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
