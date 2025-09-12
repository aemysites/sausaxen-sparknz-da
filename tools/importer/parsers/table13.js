/* global WebImporter */
export default function parse(element, { document }) {
  // Find the table-component table inside the block
  const table = element.querySelector('table.table-component');
  if (!table) return;

  // Extract header cells from thead
  const thead = table.querySelector('thead');
  let columnHeaders = [];
  if (thead) {
    const headerCells = thead.querySelectorAll('tr th');
    columnHeaders = Array.from(headerCells).map(th => th.textContent.trim());
  }

  // Extract all rows from tbody
  const tbody = table.querySelector('tbody');
  let dataRows = [];
  if (tbody) {
    const rows = tbody.querySelectorAll('tr');
    dataRows = Array.from(rows).map(tr => {
      const tds = tr.querySelectorAll('td');
      return Array.from(tds).map(td => {
        // Get the .cellContent div if present, else fallback to td text
        const cellContent = td.querySelector('.cellContent');
        if (cellContent) {
          // If .cellContent contains an <a>, preserve the link element
          const link = cellContent.querySelector('a');
          if (link) {
            // Clone the link to avoid moving it from the DOM
            return link.cloneNode(true);
          }
          // Otherwise, return the full text content
          return cellContent.textContent.trim();
        }
        // Fallback: get all text content from td
        return td.textContent.trim();
      });
    });
  }

  // Compose the block table
  // First row: block name (single column)
  const headerRow = ['Table (table13)'];
  // Second row: the column headers (multi-column)
  const cells = [headerRow, columnHeaders, ...dataRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
