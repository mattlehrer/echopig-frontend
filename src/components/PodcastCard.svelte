<script>
  export let _id, title, iTunesID, genres, author, artworkUrl600, posts;
  genres = genres.filter(g => g !== 'Podcasts');
  const podUrl = `/p/${iTunesID ? 'i' + iTunesID : _id}`;
</script>

<style>
  .card {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card-image {
    width: 100%;
  }

  .card-content {
    flex: 1 1 auto;
  }

  .podfooter {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 1.5rem 1.5rem 0.75rem;
  }

  .genres {
    align-self: flex-start;
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
      <a rel="prefetch" href={podUrl}>
        <img src={artworkUrl600} alt="{title} Logo" />
      </a>
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">
          <a rel="prefetch" href={podUrl}>{title}</a>
        </p>
        <p class="subtitle is-6">{author}</p>
      </div>
    </div>
  </div>
  <div class="podfooter">
    <div class="genres">
      {#each genres as genre}
        <a
          class="is-normal is-white tag"
          rel="prefetch"
          href="/g/{genre.toLowerCase()}">
          #{genre.toLowerCase()}
        </a>
      {/each}
    </div>
    <div class="post-count is-size-7">
      <span class="snout">🐽</span>
      {posts}
    </div>
  </div>
</div>
