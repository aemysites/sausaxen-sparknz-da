/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and has children
  if (!element || !element.querySelectorAll) return;

  // Table header row
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  // Get all feature blocks (cards)
  const cardElements = element.querySelectorAll(':scope > .feature-block');

  cardElements.forEach((card) => {
    // --- Icon cell ---
    // Find the icon container and its child icon
    const iconContainer = card.querySelector('.feature-icon-size');
    let iconEl = null;
    if (iconContainer) {
      // Use the icon container directly (contains <i> icon)
      iconEl = iconContainer;
    }

    // --- Content cell ---
    // Heading
    const heading = card.querySelector('h3');
    // Description paragraph
    const desc = card.querySelector('.description p');
    // CTA link
    const cta = card.querySelector('.description a');

    // Compose content cell
    const contentParts = [];
    if (heading) contentParts.push(heading);
    if (desc) contentParts.push(desc);
    if (cta) contentParts.push(cta);

    // Defensive: If nothing found, skip this card
    if (!iconEl && contentParts.length === 0) return;

    rows.push([
      iconEl,
      contentParts
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
