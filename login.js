const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');
const resetBtn = document.getElementById('reset');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = document.getElementById('username').value.trim();

  if (!id) {
    alert('아이디가 비어 있습니다.');
    document.getElementById('username').focus();
    return;
  }

  // 웹 스토리지에 저장
  localStorage.setItem('userId', id);

  // 화면에 출력
  loginMsg.textContent = id + '님 로그인되었습니다.';

  // 알림창으로도 알려주기
  alert(id + '님 로그인되었습니다.');
});

resetBtn.addEventListener('click', function () {
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  loginMsg.textContent = '';
});
