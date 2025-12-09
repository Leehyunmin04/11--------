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

  // 재생 / 일시정지
  playBtn.addEventListener('click', function () {
    if (media.paused) {
      media.play();
    } else {
      media.pause();
    }
  });

  media.addEventListener('play', function () {
    playBtn.textContent = '일시 정지';
  });
  media.addEventListener('pause', function () {
    playBtn.textContent = '재생';
  });

  // 시간 업데이트
  media.addEventListener('loadedmetadata', function () {
    timeSpan.textContent =
      formatTime(media.currentTime) + ' / ' + formatTime(media.duration);
  });

  media.addEventListener('timeupdate', function () {
    timeSpan.textContent =
      formatTime(media.currentTime) + ' / ' + formatTime(media.duration);
  });

  // 볼륨
  volumeInput.addEventListener('input', function () {
    media.volume = parseFloat(volumeInput.value);
  });
}

window.addEventListener('DOMContentLoaded', function () {
  setupMedia('audio1');
  setupMedia('video1');
});
