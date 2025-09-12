/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the icon as a standalone element (for the image/icon cell)
  function extractIcon(featureBlock) {
    const iconWrapper = featureBlock.querySelector('.feature-icon-size');
    if (iconWrapper) {
      return iconWrapper;
    }
    return document.createElement('span'); // fallback empty
  }

  // Helper to extract the text content (title, description, CTA)
  function extractTextContent(featureBlock) {
    const fragment = document.createDocumentFragment();
    // Title (h3)
    const title = featureBlock.querySelector('h3');
    if (title) fragment.appendChild(title);
    // Description (p)
    const desc = featureBlock.querySelector('.description p');
    if (desc) fragment.appendChild(desc);
    // CTA (a.read-more)
    const cta = featureBlock.querySelector('.description a.read-more');
    if (cta) fragment.appendChild(cta);
    return fragment;
  }

  // Get all feature blocks (cards)
  const featureBlocks = element.querySelectorAll(':scope > .feature-block');

  // Build the table rows
  const rows = [];
  // Header row as per spec
  rows.push(['Cards (cards6)']);

  featureBlocks.forEach((block) => {
    const iconCell = extractIcon(block);
    const textCell = extractTextContent(block);
    rows.push([iconCell, textCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
