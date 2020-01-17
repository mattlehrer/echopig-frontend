<script>
  import { createEventDispatcher } from 'svelte';
  export let email;
  const dispatch = createEventDispatcher();
  function submit(event) {
    dispatch('resend', { email });
  }
</script>

<form on:submit|preventDefault={submit}>
  <div class="field">
    <label class="label" for="email">Email address</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input"
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        bind:value={email} />
      <span class="icon is-small is-left">
        <i class="fas fa-envelope" />
      </span>
    </div>
  </div>

  <button class="button is-link" type="submit">Resend email</button>
</form>
