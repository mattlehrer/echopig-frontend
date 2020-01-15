<script>
  import { goto, stores } from '@sapper/app';
  import { post } from '../utils/post';
  import ListErrors from './ListErrors.svelte';
  
  const { session } = stores();
  let username = '';
  let email = '';
	let password = '';
	let errors = null;
  
  async function submit(event) {
    if(!event.target.checkValidity()) {
      return;
    }
    try {
      const response = await post(`/auth/register`, { username, email, password });
      errors = response.errors;
      if (response.username) {
        $session.user = response;
        goto('/login');
      } else {
        goto('/register');
      }
    }
    catch (e) {
      errors = e;
    }
  }
</script>

<ListErrors {errors}/>

<div class="buttons">
  <a href="/auth/twitter" class="button is-info is-light is-fullwidth">
    <span class="icon">
      <i class="fab fa-twitter"></i>
    </span>
    <span>Sign up with Twitter</span>
  </a>
  <a href="/auth/facebook" class="button is-info is-light is-fullwidth">
    <span class="icon">
      <i class="fab fa-facebook"></i>
    </span>
    <span>Sign up with Facebook</span>
  </a>
</div>


<form
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
    <label class="label">Email</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input" type="email" name="email" placeholder="Email Address" required bind:value={email}>
      <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
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
      <label class="checkbox">
        <input type="checkbox" required>
        I agree to the <a href="/terms">terms and conditions</a>
      </label>
    </div>
  </div>

  <div class="field">
    <div class="control">
      <button type="submit" class="button is-link" disabled='{!username || !email || !password}'>Get Started</button>
    </div>
  </div>
</form>
