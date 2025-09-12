/* global WebImporter */
export default function parse(element, { document }) {
  // Find the table-component table inside the element
  const table = element.querySelector('table.table-component');
  if (!table) return;

  // Get tbody rows
  const tbody = table.querySelector('tbody');
  let dataRows = [];
  if (tbody) {
    const trs = tbody.querySelectorAll('tr');
    trs.forEach(tr => {
      const tds = tr.querySelectorAll('td');
      const row = Array.from(tds).map(td => {
        // Use all content inside td, not just .cellContent
        // This ensures we get all text and links
        let cellContent = [];
        td.childNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            cellContent.push(node.cloneNode(true));
          } else if (node.nodeType === Node.TEXT_NODE) {
            const txt = node.textContent.trim();
            if (txt) cellContent.push(txt);
          }
        });
        // If only one item, return it directly
        if (cellContent.length === 1) return cellContent[0];
        // If multiple, return array
        if (cellContent.length > 1) return cellContent;
        // Fallback: return td.textContent
        return td.textContent.trim();
      });
      dataRows.push(row);
    });
  }

  // Compose the block table: header row must be single cell with block name
  const headerRow = ['Table (table13)'];
  const blockRows = [headerRow, ...dataRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(blockRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
