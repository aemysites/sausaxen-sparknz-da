/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if element has the expected class
  if (!element || !element.classList.contains('product-features')) return;

  // Header row as per block guidelines
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  // Get all feature-blocks (cards)
  const cards = element.querySelectorAll(':scope > .feature-block');

  cards.forEach((card) => {
    // Icon cell: get the icon container (first child div)
    const iconContainer = card.querySelector(':scope > .feature-icon-size');

    // Text cell: collect heading, description, and CTA
    const textContent = document.createElement('div');

    // Heading (h3)
    const heading = card.querySelector(':scope > h3');
    if (heading) textContent.appendChild(heading);

    // Description (p)
    const desc = card.querySelector('.description > p');
    if (desc) textContent.appendChild(desc);

    // CTA (a.read-more)
    const cta = card.querySelector('.description > a.read-more');
    if (cta) textContent.appendChild(cta);

    // Add row: [icon, text]
    rows.push([
      iconContainer,
      textContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
