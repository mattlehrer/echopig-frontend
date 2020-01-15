<script>
  import * as sapper from '@sapper/app';
  import { mutate } from 'svelte-apollo';
  import { client } from '../graphql/client';
  import { CREATE_USER } from '../graphql/queries';
  import ListErrors from './ListErrors.svelte';
  
  const { session } = sapper.stores();
  let errors = null;
  
  async function handleSubmit(event) {
    register(event.target.username.value, event.target.email.value, event.target.password.value)
  }

  async function register(username, email, password) {
    try {
      const response = await mutate(client, {
        mutation: CREATE_USER, 
        variables: { 
          createUserInput: 
            {
              username,
              email,
              password
            }
          }
        });
      if (!response.errors) {
        session.user = response.data.createUser;
        return fetch('/auth/login', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(response.data.createUser),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(sapper.goto('/settings'));
      } else {
        sapper.goto('/register');
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
  on:submit|preventDefault="{handleSubmit}"
>
  <div class="field">
    <label class="label">Username</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input" name="username" type="text" placeholder="Username" required>
      <span class="icon is-small is-left">
        <i class="fas fa-user"></i>
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">Email</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input" type="email" name="email" placeholder="Email Address" required>
      <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
      </span>
    </div>
  </div>
  <div class="field">
    <label class="label" for="password">Password</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input" id="password" type="password" name="password" placeholder="Password" required>
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
      <button type="submit" class="button is-link">Get Started</button>
    </div>
  </div>
</form>
