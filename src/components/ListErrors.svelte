<script>
  export let errors;

  function parse(e) {
    try {
      const { graphQLErrors, networkError } = e;
      let messages = [];
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          messages.push(message);
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          );
        });
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        messages.push(message);
      }
      return messages;
    } catch (err) {
      return [];
    }
  }

  $: msgs = parse(errors);
</script>

<style>
  .notification {
    margin-bottom: 1.5rem;
    padding: 1rem;
  }
</style>

{#if msgs}
  <ul>
    {#each msgs as msg}
      <li>
        <div class="notification is-danger">
          <button
            on:click={({ target }) => target.parentNode.parentNode.removeChild(target.parentNode)}
            class="delete" />
          {msg}
        </div>
      </li>
    {/each}
  </ul>
{/if}
