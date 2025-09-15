/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Hero (hero4)'];

  // Defensive selectors for background image
  let bgImgEl = null;
  // Try to find a background image in the HeroBannerSlide__ContentImageMobile-fv4g8g-1
  const bgImgDiv = element.querySelector('.HeroBannerSlide__ContentImageMobile-fv4g8g-1');
  if (bgImgDiv) {
    // Look for an <img> inside, or check for background-image style
    const img = bgImgDiv.querySelector('img');
    if (img) {
      bgImgEl = img;
    } else if (bgImgDiv.style && bgImgDiv.style.backgroundImage) {
      // Extract URL from background-image style
      const urlMatch = bgImgDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const imgEl = document.createElement('img');
        imgEl.src = urlMatch[1];
        bgImgEl = imgEl;
      }
    }
  }

  // Second row: background image (optional)
  const bgRow = [bgImgEl ? bgImgEl : ''];

  // Third row: title, subheading, description, CTA
  // Title
  let titleEl = null;
  const titleWrapper = element.querySelector('.HeroBannerSlide__TitleWrapper-fv4g8g-2');
  if (titleWrapper) {
    // Use the h2 directly if present
    const h2 = titleWrapper.querySelector('h2');
    if (h2) titleEl = h2;
  }

  // Description
  let descEl = null;
  const descDiv = element.querySelector('.Description__DescriptionText-q3i3d6-0');
  if (descDiv) {
    descEl = descDiv;
  }

  // Compose content cell for third row
  const contentCell = [];
  if (titleEl) contentCell.push(titleEl);
  if (descEl) contentCell.push(descEl);

  // Only add non-empty content
  const contentRow = [contentCell.length ? contentCell : ''];

  // Build the table
  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
