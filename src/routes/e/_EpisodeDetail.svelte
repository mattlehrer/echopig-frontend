<script>
  import moment from 'moment';
  import AudioPlayer from '../../components/AudioPlayer.svelte';

  // create a new query to lookup number of posts ref-ing this episode _id

  export let title, image, podcast, releaseDate, description, mp3URL;
</script>

<style>
  h3 {
    margin-bottom: 1em;
  }

  .is-one-third img {
    border-radius: .25rem;
  }

  /* audio {
    width: 65%;
  } */

  /* .post-count {
    align-self: flex-end;
    flex-shrink: 0;
  }

  .snout {
    line-height: 1.5rem;
    padding-right: 0.25rem;
  } */
</style>

<div class="columns">
  <div class="column is-one-third">
    <img src={image ? image : podcast.artworkUrl600} alt="{title} Logo" />
    <AudioPlayer {mp3URL} />
  </div>

  <div class="column metadata">
    <h2 class="is-size-4">
      <a
        rel="prefetch"
        href={'/p/' + podcast.iTunesID ? 'i' + podcast.iTunesID : podcast._id}>
        {podcast.title}
      </a>
    </h2>
    <h1 class="is-size-3">{title}</h1>
    {#if releaseDate}
      <h3 class="is-size-6 has-text-weight-light">{moment(releaseDate).format('MMMM DD, YYYY')}</h3>
    {/if}
    <!-- <audio
      controls
      src={mp3URL} type="audio/mpeg">
        Your browser does not support the
        <code>audio</code> element.
    </audio> -->
  </div>
  <div class="epfooter">

    <!-- {#if posts}
      <div class="post-count is-size-7">
        <span class="snout">🐽</span>
        {posts}
      </div>
    {/if} -->
  </div>
</div>

<div class="description">
  <p>{description}</p>
</div>  
