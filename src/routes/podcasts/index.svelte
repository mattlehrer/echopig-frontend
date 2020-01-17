<script context="module">
  import { client } from '../../graphql/client';
  import { GET_PODCASTS } from '../../graphql/queries';

  export async function preload() {
    return {
      cache: await client.query({
        query: GET_PODCASTS,
      }),
    };
  }
</script>

<script>
  import { query, restore } from 'svelte-apollo';

  export let cache;

  restore(client, GET_PODCASTS, cache.data);

  const getPodcasts = query(client, { query: GET_PODCASTS });
</script>

<style>

</style>

<svelte:head>
  <title>Podcasts - Echopig</title>
</svelte:head>
<h1 class="is-size-1">Podcasts</h1>

{#await $getPodcasts}
  <p>...waiting</p>
{:then result}
  <p>Total podcasts: {result.data.podcasts.length}</p>
  <ul>
    {#each result.data.podcasts as podcast}
      <li>{podcast.title}</li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
