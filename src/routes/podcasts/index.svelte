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
  import { subscribe, restore } from 'svelte-apollo';
  import { fade } from 'svelte/transition';
  import Spinner from '../../components/Spinner.svelte';
  import PodcastCard from '../../components/PodcastCard.svelte';

  export let cache;

  restore(client, TOP_PODCASTS, cache.data);

  const getPodcasts = subscribe(client, { query: TOP_PODCASTS });
</script>

<style>
  h1 {
    padding-left: 0.75rem;
  }
</style>

<svelte:head>
  <title>Top Podcasts - Echopig</title>
</svelte:head>

<h1 class="is-size-2">Top Podcasts</h1>

{#await $getPodcasts}
  <Spinner />
{:then result}
  <div in:fade class="podcasts">
    {#each result.data.mostPostedPodcastsInTimeframe as { __typename, collectionExplicitness, artworkUrl100, feedUrl, ...podcast }, i}
      <div class="podcast is-4 column">
        <PodcastCard {...podcast} />
      </div>
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
