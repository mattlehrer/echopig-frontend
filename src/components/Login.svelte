<script>
  import { stores, goto } from '@sapper/app';
  import { post } from '../utils/post';
  import ListErrors from './ListErrors.svelte';

  const { session } = stores();

  let username = '';
	let password = '';
	let errors = null;
  
  export const submit = async function(event) {
    if(!event.target.checkValidity()) {
      return;
    }
    try {
      const response = await post(`/auth/login`, { username, password });
      errors = response.errors;
      if (response.username) {
        $session.user = response;
        goto('/');
      }
    }
    catch (e) {
      errors = e;
    }
  }
</script>

<ListErrors {errors}/>

<form id="login"
  on:submit|preventDefault="{submit}"
>
  <div class="field">
    <label class="label">Username</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input" name="username" type="text" placeholder="Username" required bind:value={username}>
      <span class="icon is-small is-left">
        <i class="fas fa-user"></i>
      </span>
    </div>
  </div>
  
  <div class="field">
    <label class="label" for="password">Password</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input" id="password" type="password" name="password" placeholder="Password" required bind:value={password}>
      <span class="icon is-small is-left">
        <i class="fas fa-lock"></i>
      </span>
    </div>
  </div>

  <div class="field">
    <div class="control">
      <button type="submit" class="button is-link" disabled='{!username || !password}'>Login</button>
    </div>
  </div>
</form>
