<script context="module">
  export async function preload(page, session) {
    const { user } = session;

    if (user) {
      return this.redirect(302, '/');
    }
  }
</script>

<script>
  import Register from '../components/Register.svelte';
</script>

<style>
  .column {
    margin: 0 auto;
  }
</style>

<svelte:head>
  <title>Register - Echopig</title>
</svelte:head>

<div class="column is-two-thirds">
  <h1>Get started</h1>
  <Register />
</div>
