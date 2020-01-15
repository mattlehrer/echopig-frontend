<script>
  import Register from '../components/Register.svelte';
</script>

<svelte:head>
  <meta name="description" content="Echopig is the best way to share your favorite podcast episodes.">
	<title>Echopig</title>
</svelte:head>

<div class="container">
  <div class="columns">
    <div class="column is-half">
      <h1 class="is-size-1">Echopig</h1>
      <h2 class="is-size-3">The best way to share your favorite podcast episodes.</h2>
      <div class="is-size-5">You don't need a new app, you just need a better way to find and share the best episodes.</div>
    </div>
    <div class="column"></div>
    <div id="sign-up-column" class="column is-two-fifths">
      <div class="block">
        <Register />
      </div>
    </div>
  </div>
</div>
