'use strict';

document.querySelector('thead').addEventListener('click', (e) => {
  const tHead = e.currentTarget;
  const tBody = tHead.nextElementSibling;
  const columnIndex = [...tHead.querySelectorAll('th')].indexOf(e.target);

  const compare = (a, b) => {
    if (a.innerText < b.innerText) {
      return -1;
    }

    if (a.innerText > b.innerText) {
      return 1;
    }

    return 0;
  };

  [...tBody.querySelectorAll('tr')]
    .map((row, index) => {
      let innerText = row.querySelectorAll('td')[columnIndex].innerText;

      innerText = innerText.match(/^[$]/)
        ? parseFloat(innerText.replace(/[.$]/, '').replace(',', '.'))
        : innerText;

      return {
        index: index,
        row: row,
        innerText: innerText,
      };
    })
    .sort(compare)
    .forEach((sortedRow) => {
      tBody.append(sortedRow.row);
    });
});
