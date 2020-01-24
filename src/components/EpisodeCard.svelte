<script>
  import moment from 'moment';
  export let _id, title, image, podcast, releaseDate, posts;
</script>

<style>
  .card {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card-image {
    width: 100%;
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .card-content {
    flex: 1 1 auto;
  }

  .epfooter {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 1.5rem 1.5rem;
  }

  .post-count {
    align-self: flex-end;
    flex-shrink: 0;
  }

  .snout {
    line-height: 1.5rem;
    padding-right: 0.25rem;
  }
</style>

<div class="card">
  <div class="card-image">
    <figure class="image is-square">
      <a href="/e/{_id}">
        <!-- <a rel="prefetch" href="/e/{_id}"> -->
        <img src={image ? image : podcast.artworkUrl600} alt="{title} Logo" />
      </a>
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">
          <a rel="prefetch" href="/e/{_id}">{title}</a>
        </p>
        <p class="subtitle is-6">
          <a
            rel="prefetch"
            href={'/p/' + (podcast.iTunesID ? 'i' + podcast.iTunesID : podcast._id)}>
            {podcast.title}
          </a>
        </p>
      </div>
    </div>
  </div>
  <div class="epfooter">
    {#if releaseDate}
      <div class="releaseDate tag is-white">
        {moment(releaseDate).format('MMMM DD, YYYY')}
      </div>
    {/if}
    {#if posts}
      <div class="post-count is-size-7">
        <span class="snout">🐽</span>
        {posts}
      </div>
    {/if}
  </div>
</div>
