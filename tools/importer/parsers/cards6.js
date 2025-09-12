/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element has expected structure
  if (!element || !element.classList.contains('product-features')) return;

  // Table header row
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  // Get all card blocks
  const cardBlocks = element.querySelectorAll(':scope > .feature-block');

  cardBlocks.forEach((card) => {
    // Icon: Use the icon container div (includes <i> icon)
    const iconDiv = card.querySelector('.feature-icon-size');
    // Defensive: fallback to the <i> if div missing
    let iconCell = iconDiv || card.querySelector('i');

    // Text content cell
    const cellContent = [];

    // Heading
    const heading = card.querySelector('h3');
    if (heading) cellContent.push(heading);

    // Description paragraph
    const desc = card.querySelector('.description p');
    if (desc) cellContent.push(desc);

    // CTA link
    const cta = card.querySelector('.description a');
    if (cta) cellContent.push(cta);

    // Add row: [icon, text content]
    rows.push([iconCell, cellContent]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
