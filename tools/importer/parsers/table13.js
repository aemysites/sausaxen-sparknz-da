/* global WebImporter */
export default function parse(element, { document }) {
  // Find the table-component table inside the element
  const table = element.querySelector('table.table-component');
  if (!table) return;

  // Prepare the header row as required
  const headerRow = ['Table (table13)'];

  // Get all table rows from tbody
  const tbody = table.querySelector('tbody');
  let dataRows = [];
  if (tbody) {
    const trs = tbody.querySelectorAll('tr');
    trs.forEach(tr => {
      const tds = tr.querySelectorAll('td');
      // For each cell, get the .cellContent div (or fallback to textContent)
      const row = Array.from(tds).map(td => {
        // Get all content inside .cellContent, including links and text
        const cellContent = td.querySelector('.cellContent');
        if (cellContent) {
          // If there is a link, include the link element, else include the text
          const link = cellContent.querySelector('a');
          if (link) {
            // Clone the link to avoid moving it in the DOM
            return link.cloneNode(true);
          } else {
            // Use the full text content
            return cellContent.textContent.trim();
          }
        } else {
          // Fallback to td text
          return td.textContent.trim();
        }
      });
      dataRows.push(row);
    });
  }

  // Compose the cells array for the block table
  // First row: block name
  // Remaining: data rows
  const cells = [
    headerRow,
    ...dataRows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
