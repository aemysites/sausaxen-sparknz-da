/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion panels
  const panels = element.querySelectorAll('.panel.event-accordion-box');
  const rows = [];

  // Header row: must be exactly one column with the block name
  // But for correct table structure, use colspan=2 for the header cell
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = 'Accordion (accordion5)';
  headerTh.setAttribute('colspan', '2');
  headerTr.appendChild(headerTh);
  thead.appendChild(headerTr);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  panels.forEach((panel) => {
    // Title cell: find the clickable title (h3 inside .accordion-toggle)
    let titleCell = '';
    const toggle = panel.querySelector('.accordion-toggle');
    if (toggle) {
      const h3 = toggle.querySelector('h3');
      if (h3) {
        titleCell = h3;
      } else {
        titleCell = toggle.textContent.trim();
      }
    }

    // Content cell: find the .panel-body (expanded content)
    let contentCell = '';
    const panelBody = panel.querySelector('.panel-body');
    if (panelBody) {
      const pad = panelBody.querySelector('.default-mobile-padding');
      if (pad) {
        contentCell = pad;
      } else {
        contentCell = panelBody;
      }
    }

    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    if (titleCell instanceof HTMLElement) {
      td1.appendChild(titleCell.cloneNode(true));
    } else {
      td1.textContent = titleCell;
    }
    const td2 = document.createElement('td');
    if (contentCell instanceof HTMLElement) {
      td2.appendChild(contentCell.cloneNode(true));
    } else {
      td2.textContent = contentCell;
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  element.replaceWith(table);
}
