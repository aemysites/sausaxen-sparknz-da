/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual table element inside the block
  const table = element.querySelector('table');
  if (!table) return;

  // Build the header row as required
  const headerRow = ['Table (table13)'];

  // Extract all data rows from the table (skip the table's header row)
  const rows = [];
  const trs = table.querySelectorAll('tbody tr');
  trs.forEach(tr => {
    const cells = [];
    const tds = tr.querySelectorAll('td');
    tds.forEach(td => {
      // Use the full td, not just cellContent, to ensure all text is captured
      // Clone the td's content (including links and text)
      if (td.childNodes.length > 0) {
        // Create a fragment to hold all child nodes
        const frag = document.createDocumentFragment();
        td.childNodes.forEach(node => {
          frag.appendChild(node.cloneNode(true));
        });
        cells.push(frag);
      } else {
        cells.push(td.textContent.trim());
      }
    });
    rows.push(cells);
  });

  // Compose the block table: header row, then all table rows
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
