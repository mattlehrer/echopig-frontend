<script context="module">
  import { client } from '../../graphql/client';
  import { GET_EPISODE } from '../../graphql/queries';

  export async function preload(page) {
    const cache = await client.query({
        query: GET_EPISODE,
        variables: {
          episode: page.params.id,
        },
      });
    return {
      id: page.params.id,
      cache,
      title: `${cache.data.episode.podcast.title} - ${cache.data.episode.title}`,
      published,
    };
  }
</script>

<script>
  import { query, restore } from 'svelte-apollo';
  import { fade } from 'svelte/transition';
  import Spinner from '../../components/Spinner.svelte';
  import EpisodeDetail from './_EpisodeDetail.svelte';

  export let cache;
  export let id, title, published;

  restore(client, GET_EPISODE, cache.data);

  const episode = query(client, { query: GET_EPISODE,
        variables: {
          episode: id,
        }, });
</script>

<style>
  .wrapper {
    padding: 0 0.75rem;
  }
</style>

<svelte:head>
  <title>{title} - Echopig</title>
</svelte:head>

<div class="wrapper">
  {#await $episode}
    <Spinner />
  {:then result}
    <div in:fade|local class="episode-detail">
      <EpisodeDetail {...result.data.episode} {published} />
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
