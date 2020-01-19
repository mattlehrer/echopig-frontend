<script>
  export let title, iTunesID, genres, author, artworkUrl600, posts
  genres = genres.filter(g => g !== 'Podcasts');
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
    /* flex: 1; */
  }

  .podfooter {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 1.5rem 1.5rem .75rem;
  }

  .genres {
    align-self: flex-start;
  }

  .post-count {
    align-self: flex-end;
    flex-shrink: 0;
    line-height: inherit;
  }

  .snout {
    padding-right: .25rem;
  }
</style>

<div class="card">
  <div class="card-image">
    <figure class="image is-square">
      <img src={artworkUrl600} alt="{title} Logo">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4"><a href='/p/i{iTunesID}'>{title}</a></p>
        <p class="subtitle is-6">{author}</p>
      </div>
    </div>
  </div>
  <div class="podfooter">
    <div class="genres">
      {#each genres as genre}
        <a class='is-normal is-white tag' href="/g/{genre.toLowerCase()}">#{genre.toLowerCase()}</a>
      {/each}
    </div>
    <div class="post-count is-size-7">
      <span class='snout'>🐽</span>{posts}
    </div>
  </div>
</div>
