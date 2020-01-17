<script>
  import Nav from '../components/Nav.svelte';
  import Messages from '../components/Messages.svelte';
  import Footer from '../components/Footer.svelte';

  export let segment;
</script>

<style>
  .wrapper {
    min-height: 100%;
    /* Equal to height of footer */
    margin-bottom: -144px;
  }
  main {
		position: relative;
		max-width: 56em;
		background-color: white;
    padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
  }
  .push {
    height: 144px;
  }
</style>
<div class="wrapper">
  
  <Nav {segment}/>
  <main>
    <Messages/>
    <slot></slot>
  </main>
  <div class="push"></div>
</div>
<Footer />