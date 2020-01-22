<script context="module">
  import { client } from '../../graphql/client';
  import { GET_PODCAST_BY_ID } from '../../graphql/queries';

  export async function preload(page) {
    const cache = await client.query({
        query: GET_PODCAST_BY_ID,
        variables: {
          podcast: page.params.id,
        },
      });
    return {
      id: page.params.id,
      cache,
      title: `${cache.data.podcastById.title}`,
    };
  }
</script>

<script>
  import { query, restore } from 'svelte-apollo';
  import { fade } from 'svelte/transition';
  import Spinner from '../../components/Spinner.svelte';
  import PodcastDetail from './_PodcastDetail.svelte';

  export let cache;
  export let id, title;

  restore(client, GET_PODCAST_BY_ID, cache.data);

  const podcast = query(client, { query: GET_PODCAST_BY_ID,
        variables: {
          podcast: id,
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
  {#await $podcast}
    <Spinner />
  {:then result}
    <div in:fade|local class="podcast-detail">
      <PodcastDetail {...result.data.podcastById} />
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
