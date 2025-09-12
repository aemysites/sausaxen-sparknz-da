/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the table-component table inside the element
  const table = element.querySelector('table.table-component');
  if (!table) return;

  // Build the block table rows
  const rows = [];

  // 1. Block header row
  const headerRow = ['Table (table13)'];
  rows.push(headerRow);

  // 2. Table body rows (skip the column header row)
  const tbody = table.querySelector('tbody');
  if (!tbody) return;
  const trList = Array.from(tbody.querySelectorAll('tr'));
  trList.forEach(tr => {
    const tds = Array.from(tr.querySelectorAll('td'));
    // For each cell, extract the .cellContent div (which may contain a link or text)
    const row = tds.map(td => {
      const cellContent = td.querySelector('.cellContent');
      // Defensive: fallback to td if .cellContent missing
      // Extract all text and links from .cellContent
      if (cellContent) {
        // If there is a link, preserve it, otherwise just text
        const link = cellContent.querySelector('a');
        if (link) {
          // Clone the link to preserve it
          return link.cloneNode(true);
        } else {
          return cellContent.textContent.trim();
        }
      } else {
        return td.textContent.trim();
      }
    });
    rows.push(row);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
