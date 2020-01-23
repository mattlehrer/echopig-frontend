<script>
  // create a query to lookup number of posts ref-ing each episode
  import EpisodeInList from './_EpisodeInList.svelte';
  export let title, genres, author, artworkUrl600, episodes;
  genres = genres.filter(g => g !== 'Podcasts');
</script>

<style>
  h1 {
    margin-bottom: 0.5rem;
  }

  .is-one-third img {
    border-radius: 0.25rem;
  }

  /* .genre {
    padding: 0 1rem 0 0;
  } */
</style>

<div class="wrapper">
  <div class="columns">
    <div class="column is-one-third">
      <img src={artworkUrl600} alt="{title} Logo" />
    </div>

    <div class="column is-one-half metadata">
      <h1 class="is-size-2">{title}</h1>
      <h2 class="is-size-4">{author}</h2>

      <div class="genres tags are-medium">
        {#each genres as genre}
          <a
            class="genre is-light tag"
            rel="prefetch"
            href="/g/{genre.toLowerCase()}">
            #{genre.toLowerCase()}
          </a>
        {/each}
      </div>
    </div>
  </div>

  {#each episodes as episode}
    <EpisodeInList {...episode} />
  {:else}
    <div class="block" />
  {/each}
</div>
