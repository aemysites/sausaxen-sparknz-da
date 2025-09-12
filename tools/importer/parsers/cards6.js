/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate feature-block children
  const cardEls = Array.from(element.querySelectorAll(':scope > .feature-block'));

  // Table header
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  cardEls.forEach(card => {
    // --- Icon cell ---
    // Find the icon wrapper
    const iconWrapper = card.querySelector('.feature-icon-size');
    let iconCell = null;
    if (iconWrapper) {
      // Use the icon wrapper div directly for resilience
      iconCell = iconWrapper;
    } else {
      // Fallback: try to find any <i> tag
      const icon = card.querySelector('i');
      iconCell = icon || '';
    }

    // --- Text cell ---
    const textContent = [];
    // Heading
    const heading = card.querySelector('h3');
    if (heading) textContent.push(heading);
    // Description paragraph
    const desc = card.querySelector('.description p');
    if (desc) textContent.push(desc);
    // CTA link
    const cta = card.querySelector('.description a');
    if (cta) textContent.push(cta);

    rows.push([iconCell, textContent]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
