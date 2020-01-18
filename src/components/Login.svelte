<script>
  import { stores, goto } from '@sapper/app';
  import { post, parseErrors } from '../utils/post';
  import { errorMsgs } from '../utils/stores';

  const { session } = stores();

  let username = '';
  let password = '';

  export const submit = async function(event) {
    if (!event.target.checkValidity()) {
      return;
    }
    try {
      const response = await post(`/auth/login`, { username, password });
      if (response.graphQLErrors || response.networkError) {
        errorMsgs.set([...$errorMsgs, parseErrors(response)]);
      } else {
        const { __typename, ...user } = response;
        $session.user = user;
        goto('/');
      }
    } catch (e) {
      errorMsgs.set([...$errorMsgs, JSON.stringify(e)]);
    }
  };
</script>

<form id="login" on:submit|preventDefault={submit}>
  <div class="field">
    <label class="label">Username</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input"
        name="username"
        type="text"
        placeholder="Username"
        required
        bind:value={username} />
      <span class="icon is-small is-left">
        <i class="fas fa-user" />
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label" for="password">Password</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input"
        id="password"
        type="password"
        name="password"
        placeholder="Password"
        required
        bind:value={password} />
      <span class="icon is-small is-left">
        <i class="fas fa-lock" />
      </span>
    </div>
  </div>

  <div class="field">
    <div class="control">
      <button
        type="submit"
        class="button is-link"
        disabled={!username || !password}>
        Login
      </button>
    </div>
  </div>
</form>
