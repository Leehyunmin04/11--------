function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0');
  return m + ':' + s;
}

function setupMedia(id) {
  const media = document.getElementById(id);
  const playBtn = document.querySelector('.play[data-target="' + id + '"]');
  const timeSpan = document.querySelector('.time[data-target="' + id + '"]');
  const volumeInput = document.querySelector(
    '.volume[data-target="' + id + '"]'
  );

  if (!media || !playBtn || !timeSpan || !volumeInput) return;

  // 버튼 안의 이미지 아이콘 찾기
  const icon = playBtn.querySelector('.play-icon');

  // 처음 상태는 항상 재생 아이콘으로
  if (icon) {
    icon.src = 'images/play-solid-full.svg';
    icon.alt = '재생';
  } else {
    playBtn.textContent = '재생';
  }

  // 재생 / 일시정지 토글
  playBtn.addEventListener('click', function () {
    if (media.paused) {
      media.play();
    } else {
      media.pause();
    }
  });

  // 재생되기 시작했을 때
  media.addEventListener('play', function () {
    if (icon) {
      icon.src = 'images/pause-solid-full.svg';
      icon.alt = '일시 정지';
    } else {
      playBtn.textContent = '일시 정지';
    }
  });

  // 일시정지 되었을 때
  media.addEventListener('pause', function () {
    if (icon) {
      icon.src = 'images/play-solid-full.svg';
      icon.alt = '재생';
    } else {
      playBtn.textContent = '재생';
    }
  });

  // 시간 표시 (메타데이터 로드 시)
  media.addEventListener('loadedmetadata', function () {
    timeSpan.textContent =
      formatTime(media.currentTime) + ' / ' + formatTime(media.duration);
  });

  // 재생 중 시간 업데이트
  media.addEventListener('timeupdate', function () {
    timeSpan.textContent =
      formatTime(media.currentTime) + ' / ' + formatTime(media.duration);
  });

  // 볼륨 조절
  volumeInput.addEventListener('input', function () {
    media.volume = parseFloat(volumeInput.value);
  });
}

window.addEventListener('DOMContentLoaded', function () {
  setupMedia('audio1');
  setupMedia('video1');
});
