/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the table-component table inside the block
  const table = element.querySelector('table.table-component');
  if (!table) return;

  // Get tbody
  const tbody = table.querySelector('tbody');
  if (!tbody) return;

  // Build the block table rows
  const rows = [];

  // 1. Block header row (only one column)
  const headerRow = ['Table (table13)'];
  rows.push(headerRow);

  // 2. Data rows (skip the table header row)
  const trs = tbody.querySelectorAll('tr');
  trs.forEach((tr) => {
    const cells = [];
    const tds = tr.querySelectorAll('td');
    tds.forEach((td) => {
      // Use the full cellContent div if present, else fallback to td
      const cellContent = td.querySelector('.cellContent');
      if (cellContent) {
        // Push the entire cellContent div (preserves links and formatting)
        cells.push(cellContent);
      } else {
        // Fallback: use the td's text
        cells.push(td.textContent.trim());
      }
    });
    rows.push(cells);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
