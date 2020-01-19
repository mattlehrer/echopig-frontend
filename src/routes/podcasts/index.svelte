<script context="module">
  import { client } from '../../graphql/client';
  import { TOP_PODCASTS } from '../../graphql/queries';

  export async function preload() {
    return {
      cache: await client.query({
        query: TOP_PODCASTS,
      }),
    };
  }
</script>

<script>
  import { query, restore } from 'svelte-apollo';
  import PodcastCard from '../../components/PodcastCard.svelte';

  export let cache;

  restore(client, TOP_PODCASTS, cache.data);

  const getPodcasts = query(client, { query: TOP_PODCASTS });
</script>

<style>
  .podcasts {
    display: flex;
    flex-wrap: wrap;
  }

  .podcast {
    display: flex;
    flex-direction: column;
  }
</style>

<svelte:head>
  <title>Podcasts - Echopig</title>
</svelte:head>

<h1 class="is-size-1">Podcasts</h1>

{#await $getPodcasts}
  <p>...waiting</p>
{:then result}
  <p>Total podcasts: {result.data.mostPostedPodcastsInTimeframe.length}</p>
  <div class="podcasts">
    {#each result.data.mostPostedPodcastsInTimeframe as podcast, i}
        <div class="podcast is-4 column">
          <PodcastCard {...podcast}/>
        </div>
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
