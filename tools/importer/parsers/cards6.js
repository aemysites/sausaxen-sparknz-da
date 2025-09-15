/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract icon (as element)
  function getIcon(card) {
    const iconContainer = card.querySelector('.feature-icon-size');
    if (iconContainer) {
      // Use the icon container directly (contains <i> icon)
      return iconContainer;
    }
    return null;
  }

  // Helper to extract text content (title, description, CTA)
  function getTextContent(card) {
    const frag = document.createDocumentFragment();
    // Title
    const title = card.querySelector('h3');
    if (title) {
      frag.appendChild(title);
    }
    // Description
    const desc = card.querySelector('.description p');
    if (desc) {
      frag.appendChild(desc);
    }
    // CTA link
    const cta = card.querySelector('.description a');
    if (cta) {
      frag.appendChild(cta);
    }
    return frag;
  }

  // Get all cards
  const cards = Array.from(element.querySelectorAll(':scope > .feature-block'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards6)']);
  // Card rows
  cards.forEach(card => {
    const icon = getIcon(card);
    const textContent = getTextContent(card);
    rows.push([
      icon,
      textContent
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
