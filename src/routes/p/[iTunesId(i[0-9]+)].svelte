<script context="module">
  import { client } from '../../graphql/client';
  import { GET_PODCAST } from '../../graphql/queries';

  export async function preload(page) {
    const cache = await client.query({
        query: GET_PODCAST,
        variables: {
          iTunesId: parseInt(page.params.iTunesId.slice(1)),
        },
      });
    cache.data.podcast.episodes = cache.data.podcast.episodes.map(e => {
      e.published = e.releaseDate ? new Date(e.releaseDate).toLocaleDateString('en-us', {
          dateStyle: 'long',
        }) : undefined;
      e.podcast = cache.data.podcast;
      return e;
    });
    return {
      iTunesId: parseInt(page.params.iTunesId.slice(1)),
      cache,
      title: `${cache.data.podcast.title}`,
    };
  }
</script>

<script>
  import { query, restore } from 'svelte-apollo';
  import { fade } from 'svelte/transition';
  import Spinner from '../../components/Spinner.svelte';
  import PodcastDetail from './_PodcastDetail.svelte';

  export let cache;
  export let iTunesId, title;

  restore(client, GET_PODCAST, cache.data);

  const podcast = query(client, { query: GET_PODCAST,
        variables: {
          iTunesId: iTunesId,
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
      <PodcastDetail {...result.data.podcast} />
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
