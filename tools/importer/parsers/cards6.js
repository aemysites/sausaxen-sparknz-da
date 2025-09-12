/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract icon (as element)
  function getIcon(card) {
    const iconDiv = card.querySelector('.feature-icon-size');
    if (iconDiv) {
      // Use the icon container directly (includes <i> icon)
      return iconDiv;
    }
    return null;
  }

  // Helper to extract text content (title, description, CTA)
  function getTextContent(card) {
    const frag = document.createDocumentFragment();

    // Title (h3)
    const heading = card.querySelector('h3');
    if (heading) frag.appendChild(heading);

    // Description (p)
    const desc = card.querySelector('.description p');
    if (desc) frag.appendChild(desc);

    // CTA (a.read-more)
    const cta = card.querySelector('.description a.read-more');
    if (cta) frag.appendChild(cta);

    return frag;
  }

  // Get all cards
  const cards = Array.from(element.querySelectorAll(':scope > .feature-block'));

  // Build table rows
  const headerRow = ['Cards (cards6)'];
  const rows = cards.map(card => {
    const icon = getIcon(card);
    const textContent = getTextContent(card);
    return [icon, textContent];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
