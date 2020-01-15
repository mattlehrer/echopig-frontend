<script>
  import * as sapper from '@sapper/app';
  import { mutate } from 'svelte-apollo';
  import { client } from '../graphql/client';
  import { LOGIN } from '../graphql/queries';
  import ListErrors from './ListErrors.svelte';

  const { session } = sapper.stores();
  let errors = null;
  
  export const handleSubmit = async function(event) {
    if(!event.target.checkValidity()) {
      return;
    }
    try {
      const response = await mutate(client, {
        mutation: LOGIN, 
        variables: { 
          loginUser: 
            {
              username: event.target.username.value,
              password: event.target.password.value
            }
          },
      });
      if (!response.errors) {
        // Sets the User to true in the Store so we do not have to refresh the page.
        $session.user = response.data.login.user;
        return fetch('/auth/login', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(response.data.login.user),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(sapper.goto('/settings'));
      } else {
        sapper.goto('/login');
      }
    }
    catch (e) {
      errors = e;
    }
  }
</script>

<ListErrors {errors}/>

<form id="login"
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
      <button type="submit" class="button is-link">Login</button>
    </div>
  </div>
</form>
