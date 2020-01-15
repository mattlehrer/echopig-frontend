<script>
  import { getClient, query } from 'svelte-apollo';
  import { gql } from 'apollo-boost';
  // import { PODCASTS } from '../../graphql/queries';
  
  const client = getClient();

  const GET_PODCASTS = gql`
    {
      podcasts {
        _id
        title
        genres
      }
    }`;

  const getPodcasts = query(client, { query: GET_PODCASTS });
</script>

<style></style>

<svelte:head>
	<title>Podcasts - Echopig</title>
</svelte:head>

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
