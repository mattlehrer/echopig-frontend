<script>
  import 'bulma-slider/dist/css/bulma-slider.min.css';

  export let mp3URL;

  let duration, seekable, seeking, played, ended, currentTime = 0, paused = true, playbackRate, volume;

  function formatTime(remainder) {
    if (!remainder || typeof remainder !== 'number' || remainder < 0) return '-:--';
    let hours = 0, minutes = 0, seconds = 0;
    if (remainder > 60*60) {
      hours = Math.floor(remainder / (60*60));
      remainder -= hours * 60 * 60;
    }
    if (remainder > 60) {
      minutes = Math.floor(remainder / 60);
      remainder -= minutes * 60;
    }
    seconds = remainder;
    let output = '';
    if (hours) {
      output += `${hours}:`;
    }
    output += String(minutes).padStart(hours ? 2 : 1, '0');
    output += `:${String(Math.floor(seconds)).padStart(2, '0')}`;
    return output;
  }

  function playPause() {
    const el = document.getElementById('play-pause');
    if (String(el.classList).includes('play')) {
      el.classList.add('fa-pause');
      el.classList.remove('fa-play');
    } else {
      el.classList.add('fa-play');
      el.classList.remove('fa-pause');
    }
    paused = !paused;
  }

  function rewind() {
    currentTime -= .25;
  }

  function fastforward() {
    currentTime += .5;
  }
</script>

<style>
  .times {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1rem;
    margin-bottom: -.5rem;
  }

  .controls {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 2rem;
  }
</style>

<div class="columns">
  <div class="column">
    <audio
      src={mp3URL}
      type="audio/mpeg"
      bind:duration
      bind:seekable
      bind:seeking
      bind:played
      bind:ended
      bind:currentTime
      bind:paused
      bind:playbackRate
      bind:volume
    >
      Your browser does not support the <code>audio</code> element.
    </audio>
    <div class="seek">
      <div class="times">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <input class="slider is-fullwidth is-medium is-circle" step="1" min="0" max={duration} bind:value={currentTime} type="range">
    </div>
    <div class="controls">
      <span on:click={rewind} class="icon is-large">
        <i id="rewind" class="fas fa-backward"></i>
      </span>
      <span on:click={playPause} class="icon is-large">
        <i id="play-pause" class="fas fa-play"></i>
      </span>
      <span on:click={fastforward} class="icon is-large">
        <i id="forward" class="fas fa-forward"></i>
      </span>
    </div>
  </div>
</div>
