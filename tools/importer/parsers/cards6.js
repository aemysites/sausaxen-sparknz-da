/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract icon as an element (wrap <i> in a span for robustness)
  function extractIcon(featureBlock) {
    const iconDiv = featureBlock.querySelector('.feature-icon-size');
    if (iconDiv) {
      // Use the <i> element directly, but wrap in a span for layout consistency
      const icon = iconDiv.querySelector('i');
      if (icon) {
        const span = document.createElement('span');
        span.appendChild(icon);
        return span;
      }
    }
    return '';
  }

  // Helper to extract text content (heading, description, CTA)
  function extractTextContent(featureBlock) {
    const fragment = document.createDocumentFragment();
    // Heading
    const heading = featureBlock.querySelector('h3');
    if (heading) {
      fragment.appendChild(heading);
    }
    // Description
    const descDiv = featureBlock.querySelector('.description');
    if (descDiv) {
      // Paragraph
      const para = descDiv.querySelector('p');
      if (para) fragment.appendChild(para);
      // CTA link
      const cta = descDiv.querySelector('a');
      if (cta) fragment.appendChild(cta);
    }
    return fragment;
  }

  // Get all feature blocks
  const featureBlocks = element.querySelectorAll(':scope > .feature-block');

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards6)']);

  featureBlocks.forEach((block) => {
    const iconCell = extractIcon(block);
    const textCell = extractTextContent(block);
    rows.push([iconCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
