/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual table element containing the data
  const table = element.querySelector('table.table-component');
  if (!table) return;

  // Block header row (required)
  const headerRow = ['Table (table13)'];

  // Get table body rows (tr)
  const tbody = table.querySelector('tbody');
  const bodyRows = tbody ? Array.from(tbody.querySelectorAll('tr')) : [];

  // Table data rows
  const tableRows = bodyRows.map(tr => {
    // Each tr has 3 td cells
    const tds = Array.from(tr.querySelectorAll('td'));
    return tds.map(td => {
      // Prefer the .cellContent div inside td
      const cellContent = td.querySelector('.cellContent');
      if (cellContent) {
        // If cellContent contains an <a>, use the <a> element (preserves link)
        const link = cellContent.querySelector('a');
        if (link) {
          // Clone the link to avoid moving it from the DOM
          return link.cloneNode(true);
        }
        // Otherwise, use the text content of cellContent
        return cellContent.textContent.trim();
      }
      // Fallback: use td text
      return td.textContent ? td.textContent.trim() : '';
    });
  });

  // Compose final table cells array
  const cells = [headerRow, ...tableRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
