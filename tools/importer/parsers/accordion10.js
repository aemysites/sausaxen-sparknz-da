/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the accordion panels
  const panels = Array.from(element.querySelectorAll('.panel.event-accordion-box'));
  const rows = [];

  // Always use the required header
  const headerRow = ['Accordion (accordion10)'];
  rows.push(headerRow);

  panels.forEach((panel) => {
    // Title cell: find the .one-spark-accordion-entry > .accordion-toggle > h3
    let title = '';
    const entry = panel.querySelector('.one-spark-accordion-entry');
    if (entry) {
      const toggle = entry.querySelector('.accordion-toggle');
      if (toggle) {
        const h3 = toggle.querySelector('h3');
        if (h3) {
          title = h3.textContent.trim();
        }
      }
    }

    // Content cell: find the .panel-collapse > .panel-body > .text > .default-mobile-padding
    let contentElem = null;
    const collapse = panel.querySelector('.panel-collapse');
    if (collapse) {
      const body = collapse.querySelector('.panel-body');
      if (body) {
        const text = body.querySelector('.text');
        if (text) {
          const inner = text.querySelector('.default-mobile-padding');
          if (inner) {
            contentElem = inner;
          }
        }
      }
    }

    // Defensive fallback: if no contentElem, use empty div
    if (!contentElem) {
      contentElem = document.createElement('div');
    }

    rows.push([title, contentElem]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
