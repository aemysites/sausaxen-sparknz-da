/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find background image from inline style or child elements
  function findBackgroundImage(el) {
    // Check for style background-image
    let bgUrl = null;
    if (el && el.style && el.style.backgroundImage) {
      const match = el.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (match) bgUrl = match[1];
    }
    // Check for data attributes
    if (!bgUrl && el && el.getAttribute) {
      const dataBg = el.getAttribute('data-background-image');
      if (dataBg) bgUrl = dataBg;
    }
    // Check for <img> child
    if (!bgUrl) {
      const img = el.querySelector('img');
      if (img && img.src) bgUrl = img.src;
    }
    return bgUrl;
  }

  // 1. Header row
  const headerRow = ['Hero (hero4)'];

  // 2. Background image row
  // Try to find a background image from the HeroBanner__SlideDiv or its children
  let bgImageUrl = null;
  const heroBannerSlideDiv = element.querySelector('.HeroBanner__SlideDiv-sc-93v77t-2');
  if (heroBannerSlideDiv) {
    // Check for inline style background image
    bgImageUrl = findBackgroundImage(heroBannerSlideDiv);
    // Sometimes background image is set on a child div
    if (!bgImageUrl) {
      const bgDiv = heroBannerSlideDiv.querySelector('[class*="ContentImageMobile"]');
      if (bgDiv) {
        bgImageUrl = findBackgroundImage(bgDiv);
      }
    }
  }
  // If found, create an <img> for the background image
  let bgImageEl = null;
  if (bgImageUrl) {
    bgImageEl = document.createElement('img');
    bgImageEl.src = bgImageUrl;
    bgImageEl.alt = '';
  }
  const bgRow = [bgImageEl ? bgImageEl : ''];

  // 3. Content row: Title, subheading, description, CTA
  // We'll gather the main heading and the description
  let contentEls = [];
  if (heroBannerSlideDiv) {
    // Title (h2)
    const h2 = heroBannerSlideDiv.querySelector('h2');
    if (h2) contentEls.push(h2);
    // Description (p)
    const desc = heroBannerSlideDiv.querySelector('.Description__DescriptionText-q3i3d6-0 p');
    if (desc) contentEls.push(desc);
    // (No CTA button found in this HTML)
  }
  const contentRow = [contentEls];

  // Compose the table
  const cells = [
    headerRow,
    bgRow,
    contentRow,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
