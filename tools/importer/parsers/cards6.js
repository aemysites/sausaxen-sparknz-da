/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract icon as an element
  function extractIcon(featureBlock) {
    const iconWrapper = featureBlock.querySelector('.feature-icon-size');
    if (iconWrapper) {
      // Use the icon wrapper div directly for resilience
      return iconWrapper;
    }
    return document.createElement('span'); // fallback empty
  }

  // Helper to extract text content (title, description, CTA)
  function extractText(featureBlock) {
    const fragment = document.createDocumentFragment();
    // Title
    const heading = featureBlock.querySelector('h3');
    if (heading) fragment.appendChild(heading);
    // Description
    const desc = featureBlock.querySelector('.description');
    if (desc) {
      // We'll extract paragraph and CTA link separately for flexibility
      const para = desc.querySelector('p');
      if (para) fragment.appendChild(para);
      const cta = desc.querySelector('a');
      if (cta) fragment.appendChild(cta);
    }
    return fragment;
  }

  // Get all card blocks
  const featureBlocks = element.querySelectorAll(':scope > .feature-block');

  // Table header row
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  featureBlocks.forEach((block) => {
    const iconCell = extractIcon(block);
    const textCell = extractText(block);
    rows.push([iconCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
