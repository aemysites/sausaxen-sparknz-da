/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate card blocks
  const cards = Array.from(element.querySelectorAll(':scope > .feature-block'));
  const rows = [];

  // Always use block name as header
  const headerRow = ['Cards (cards6)'];
  rows.push(headerRow);

  cards.forEach(card => {
    // Icon cell (first column)
    // Find the icon container
    const iconContainer = card.querySelector('.feature-icon-size');
    // Defensive: use the whole icon container (could be <i> or other)
    let iconCell = iconContainer ? iconContainer : document.createElement('div');

    // Text cell (second column)
    const textCellContent = [];

    // Heading (h3)
    const heading = card.querySelector('h3');
    if (heading) textCellContent.push(heading);

    // Description (p)
    const desc = card.querySelector('.description > p');
    if (desc) textCellContent.push(desc);

    // CTA link
    const cta = card.querySelector('.description > a');
    if (cta) textCellContent.push(cta);

    rows.push([iconCell, textCellContent]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
