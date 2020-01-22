<script context="module">
  import { client } from '../../graphql/client';
  import { TOP_EPISODES_IN_GENRE } from '../../graphql/queries';
  import { titleCase } from '../../utils/title-case';

  export async function preload(page) {
    const cache = await client.query({
        query: TOP_EPISODES_IN_GENRE,
        variables: {
          genre: page.params.genre,
        },
      });
    return {
      genre: page.params.genre,
      cache,
    };
  }
</script>

<script>
  import { query, restore } from 'svelte-apollo';
  import { fade } from 'svelte/transition';
  import Spinner from '../../components/Spinner.svelte';
  import EpisodeInList from './_EpisodeInList.svelte';

  export let cache;
  export let genre;
  restore(client, TOP_EPISODES_IN_GENRE, cache.data);

  const episodes = query(client, { query: TOP_EPISODES_IN_GENRE,
        variables: {
          genre,
        }, });
</script>

<style>
  .wrapper {
    padding: 0 0.75rem;
  }
</style>

<svelte:head>
  <title>#{genre} - Echopig</title>
</svelte:head>

<div class="wrapper">
<h1 class="is-size-2">Hot Episodes in {titleCase(genre)}</h1>
  {#await $episodes}
    <Spinner />
  {:then result}
    <div in:fade|local class="podcast-detail">
      {#each result.data.mostPostedEpisodesInGenreInTimeframe as episode}
        <EpisodeInList {...episode} />
      {:else}
        <div class="block"></div>
      {/each}
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
