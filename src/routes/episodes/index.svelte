<script context="module">
  import { client } from '../../graphql/client';
  import { TOP_EPISODES } from '../../graphql/queries';

  export async function preload() {
    return {
      cache: await client.query({
        query: TOP_EPISODES,
      }),
    };
  }
</script>

<script>
  import { subscribe, restore } from 'svelte-apollo';
  import { fade } from 'svelte/transition';
  import Spinner from '../../components/Spinner.svelte';
  import EpisodeCard from '../../components/EpisodeCard.svelte';

  export let cache;

  restore(client, TOP_EPISODES, cache.data);

  const getEpisodes = subscribe(client, { query: TOP_EPISODES });
</script>

<style>
  h1 {
    padding-left: 0.75rem;
  }
</style>

<svelte:head>
  <title>Top Episodes - Echopig</title>
</svelte:head>

<h1 class="is-size-2">Top Episodes</h1>

{#await $getEpisodes}
  <Spinner />
{:then result}
  <div class="episodes">
    {#each result.data.mostPostedEpisodesInTimeframe as { __typename, ...episode }, i}
      <div in:fade|local class="episode is-4 column">
        <EpisodeCard {...episode} />
      </div>
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
