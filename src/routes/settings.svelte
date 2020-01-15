<script>
  import { stores } from '@sapper/app';
  const { session } = stores();
</script>

<svelte:head>
	<title>Settings - Echopig</title>
</svelte:head>

<div class="content">
  {JSON.stringify($session.user)}
</div>