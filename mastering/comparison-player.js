document.addEventListener('DOMContentLoaded', () => {
  const players = [...document.querySelectorAll('[data-comparison-player]')];
  const format = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  for (const el of players) {
    const audio = el.querySelector('audio');
    const play = el.querySelector('.comparison-play');
    const seek = el.querySelector('.comparison-seek');
    const time = el.querySelector('.comparison-time');
    const mute = el.querySelector('.comparison-mute');
    const volume = el.querySelector('.comparison-volume');
    const duration = () => Number.isFinite(audio.duration) ? audio.duration : 30;
    const update = () => {
      seek.max = duration();
      seek.value = Math.min(audio.currentTime || 0, duration());
      time.textContent = `${format(audio.currentTime || 0)} / ${format(duration())}`;
      play.setAttribute('aria-pressed', String(!audio.paused));
      play.setAttribute('aria-label', `${audio.paused ? 'Play' : 'Pause'} audio`);
      mute.setAttribute('aria-pressed', String(audio.muted));
      mute.setAttribute('aria-label', audio.muted ? 'Unmute audio' : 'Mute audio');
    };
    play.addEventListener('click', async () => {
      if (!audio.paused) { audio.pause(); return; }
      players.forEach(other => { if (other !== el) other.querySelector('audio').pause(); });
      try { await audio.play(); } catch (e) { console.warn('Audio could not be played', e); }
    });
    seek.addEventListener('input', () => { if (audio.readyState > 0) audio.currentTime = Number(seek.value); update(); });
    mute.addEventListener('click', () => { audio.muted = !audio.muted; update(); });
    volume.addEventListener('input', () => { audio.volume = Number(volume.value); audio.muted = audio.volume === 0; update(); });
    for (const event of ['loadedmetadata','timeupdate','play','pause','ended','volumechange']) audio.addEventListener(event, update);
    update();
  }
});
