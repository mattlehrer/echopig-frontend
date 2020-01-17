<script>
  import Register from '../components/Register.svelte';
  import { stores } from '@sapper/app';
  const { session } = stores();
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
  <h2>Hot Episodes</h2>
  <h2>Hot Podcasts</h2>
</div>
