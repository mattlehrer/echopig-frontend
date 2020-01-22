<script context="module">
  import { client } from '../../graphql/client';
  import { GET_USER } from '../../graphql/queries';

  export async function preload(page) {
    const cache = await client.query({
        query: GET_USER,
        variables: {
          username: page.params.username,
        },
      });
    return {
      cache,
      username: page.params.username,
    };
  }
</script>

<script>
  import { subscribe, restore } from 'svelte-apollo';
  import { fade } from 'svelte/transition';
  import Spinner from '../../components/Spinner.svelte';
  import User from './_User.svelte';

  export let cache, username;

  restore(client, GET_USER, cache.data);

  const user = subscribe(client, { query: GET_USER,
        variables: {
          username,
        }, });
</script>

<style>
  .wrapper {
    padding: 0 0.75rem;
  }
</style>

<svelte:head>
  <title>{username} - Echopig</title>
</svelte:head>

<div class="wrapper">
  {#await $user}
    <Spinner />
  {:then result}
    <div in:fade|local class="podcast-detail">
      <User {...result.data.user} />
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
