/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and has children
  if (!element || !element.children || element.children.length === 0) return;

  // Header row as required
  const headerRow = ['Cards (cards6)'];

  // Get all feature blocks (cards)
  const cardEls = Array.from(element.querySelectorAll(':scope > .feature-block'));

  // Parse each card
  const rows = cardEls.map(card => {
    // Icon cell (first column)
    const iconWrap = card.querySelector('.feature-icon-size');
    // Defensive: fallback to first child if not found
    const iconCell = iconWrap || card.firstElementChild;

    // Text cell (second column)
    // Title
    const titleEl = card.querySelector('h3');
    // Description
    const descEl = card.querySelector('.description');
    // Compose text cell
    const textCellContent = [];
    if (titleEl) textCellContent.push(titleEl);
    if (descEl) textCellContent.push(descEl);

    return [iconCell, textCellContent];
  });

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
