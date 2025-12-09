const orderForm = document.getElementById('orderForm');
const orderResult = document.getElementById('orderResult');
const resetBtn = document.getElementById('resetBtn');
const qtyInputs = document.querySelectorAll('.qty');

function calcTotals() {
  const rows = orderForm.querySelectorAll('table tr');
  let sumQty = 0;
  let sumPrice = 0;

  rows.forEach(function (tr, index) {
    if (index === 0 || index === rows.length - 1) return; // 헤더, 합계 행 제외

    const priceTd = tr.querySelector('td[data-price]');
    const qtyInput = tr.querySelector('.qty');
    const rowTotalInput = tr.querySelector('.rowTotal');

    if (!priceTd || !qtyInput || !rowTotalInput) return;

    const price = parseInt(priceTd.getAttribute('data-price'), 10);
    const qty = parseInt(qtyInput.value, 10) || 0;
    const rowTotal = price * qty;

    rowTotalInput.value = rowTotal;
    sumQty += qty;
    sumPrice += rowTotal;
  });

  document.getElementById('totalQty').value = sumQty;
  document.getElementById('totalPrice').value = sumPrice;
}

// 수량 입력 시 자동 계산
qtyInputs.forEach(function (input) {
  input.addEventListener('input', calcTotals);
});

// 초기화 버튼
resetBtn.addEventListener('click', function () {
  setTimeout(function () {
    const rowTotals = document.querySelectorAll('.rowTotal');
    rowTotals.forEach(function (rt) {
      rt.value = 0;
    });
    document.getElementById('totalQty').value = 0;
    document.getElementById('totalPrice').value = 0;
    orderResult.innerHTML = '';
  }, 0);
});

// 주문하기
orderForm.addEventListener('submit', function (e) {
  e.preventDefault();
  calcTotals();

  const rows = orderForm.querySelectorAll('table tr');
  let summaryRows = '';

  rows.forEach(function (tr, index) {
    if (index === 0 || index === rows.length - 1) return;

    const titleTd = tr.cells[0];
    const priceTd = tr.querySelector('td[data-price]');
    const qtyInput = tr.querySelector('.qty');
    const rowTotalInput = tr.querySelector('.rowTotal');

    if (!priceTd || !qtyInput || !rowTotalInput) return;

    const qty = parseInt(qtyInput.value, 10) || 0;
    if (qty === 0) return;

    summaryRows += `
      <tr>
        <td>${titleTd.textContent}</td>
        <td>${priceTd.textContent}</td>
        <td>${qty}</td>
        <td>${rowTotalInput.value}원</td>
      </tr>
    `;
  });

  if (!summaryRows) {
    orderResult.innerHTML = '<p>주문한 내역이 없습니다.</p>';
    return;
  }

  const userId = localStorage.getItem('userId') || '손님';
  orderResult.innerHTML = `
    <h3>${userId}님의 주문 내역입니다.</h3>
    <table border="1" cellpadding="5" cellspacing="0">
      <tr>
        <th>책 제목</th>
        <th>가격</th>
        <th>수량</th>
        <th>합계</th>
      </tr>
      ${summaryRows}
      <tr>
        <td>총합</td>
        <td></td>
        <td>${document.getElementById('totalQty').value}</td>
        <td>${document.getElementById('totalPrice').value}원</td>
      </tr>
    </table>
  `;
});
