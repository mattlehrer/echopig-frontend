<script context="module">
  import { client } from '../graphql/client';
  import { TOP_EPISODES, TOP_PODCASTS } from '../graphql/queries';

  export async function preload() {
    return {
      podcastsCache: await client.query({
        query: TOP_PODCASTS,
        variables: {
          maxPodcasts: 3,
        },
      }),
      episodesCache: await client.query({
        query: TOP_EPISODES,
        variables: {
          maxEpisodes: 3,
        },
      }),
    };
  }
</script>

<script>
  import { subscribe, restore } from 'svelte-apollo';
  import { stores } from '@sapper/app';
  import { fade } from 'svelte/transition';
  import Spinner from '../components/Spinner.svelte';
  import PodcastCard from '../components/PodcastCard.svelte';
  import EpisodeCard from '../components/EpisodeCard.svelte';
  import Register from '../components/Register.svelte';

  const { session } = stores();
  export let podcastsCache, episodesCache;

  restore(client, TOP_PODCASTS, podcastsCache.data);
  restore(client, TOP_EPISODES, episodesCache.data);

  const getPodcasts = subscribe(client, {
    query: TOP_PODCASTS,
    variables: {
      maxPodcasts: 3,
    },
  });
  const getEpisodes = subscribe(client, {
    query: TOP_EPISODES,
    variables: {
      maxEpisodes: 3,
    },
  });
</script>

<svelte:head>
  <meta
    name="description"
    content="Echopig is the best way to share your favorite podcast episodes." />
  <title>Echopig</title>
</svelte:head>

{#if !$session.user}
  <div class="container">
    <div class="columns">
      <div class="column is-half">
        <h1 class="is-size-1">Echopig</h1>
        <h2 class="is-size-3">
          The best way to share your favorite podcast episodes.
        </h2>
        <div class="is-size-5">
          You don't need a new app, you just need a better way to find and share
          the best episodes.
        </div>
      </div>
      <div class="column" />
      <div id="sign-up-column" class="column is-two-fifths">
        <div class="block">
          <Register />
        </div>
      </div>
    </div>
  </div>
{/if}

<div class="container">
  <a href="/episodes">
    <h2 class="is-size-2">Hot Episodes</h2>
  </a>
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

  <div class="block" />

  <a href="/podcasts">
    <h2 class="is-size-2">Hot Podcasts</h2>
  </a>
  {#await $getPodcasts}
    <Spinner />
  {:then result}
    <div class="podcasts">
      {#each result.data.mostPostedPodcastsInTimeframe as { __typename, collectionExplicitness, artworkUrl100, feedUrl, ...podcast }, i}
        <div in:fade|local class="podcast is-4 column">
          <PodcastCard {...podcast} />
        </div>
      {/each}
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}

</div>
