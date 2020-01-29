<script>
  import { goto, stores } from '@sapper/app';
  import FacebookAuth from './FacebookAuth.svelte';
  import { addMsg } from '../utils/add-msg';
  import { post, parseErrors } from '../utils/post';
  import { successMsgs, errorMsgs } from '../utils/stores';

  const { session } = stores();
  
  let username = '';
  let email = '';
  let password = '';
  let isSocialRegistration = false;
  let facebook = '';
  let token = '';

  if ($session.registration && $session.registration.oauthToken) {
    isSocialRegistration = true;
  }


  async function submit(event) {
    if (!event.target.checkValidity()) {
      return;
    }
    console.log(event);
    try {
      let response;
      if (!isSocialRegistration) {
        response = await post(`/auth/register`, {
          username,
          email,
          password,
        });
      } else {
        const dto = { username };
        if (facebook) {
          dto.facebook = facebook;
          dto.tokens = [{ kind: 'facebook', accessToken: token }];
        } else if ($session.registration) {
          dto.tokens = [{ kind: 'twitter', accessToken: $session.registration.oauthToken, tokenSecret: $session.registration.oauthTokenSecret }];
        }
        response = await post(`/auth/register-social`, dto);
      }
      console.log(response);
      if (response.graphQLErrors || response.networkError) {
        isSocialRegistration = false;
        delete session.registration;
        errorMsgs.set([...$errorMsgs, parseErrors(response)]);
      }
      if (response.username) {
        const { __typename, ...user } = response;
        $session.user = user;
        goto('/settings');
      } else {
        goto('/register');
      }
    } catch (e) {
      isSocialRegistration = false;
      delete session.registration;
      errorMsgs.set([...$errorMsgs, JSON.stringify(e)]);
    }
  }

  async function fbAuthSuccess({ detail }) {
    console.log(detail);
    let userId, rest;
    try {
      ({ userId, ...rest } = detail);
      facebook = userId;
      token = rest.accessToken;
      isSocialRegistration = true;
    } catch (e) {
      console.log(e);
      // errorMsgs.set([...$errorMsgs, 'Did not log in to Facebook']);
    }

    // check to see if we have existing user
    const response = await post(`/auth/facebook`, {
      id: facebook,
      accessToken: token,
    });

    console.log(response);
    if (response.username) {
      const { __typename, ...user } = response;
      $session.user = user;
      successMsgs.set([
        ...$successMsgs,
        'Successfully logged in with Facebook.',
      ]);
      goto('/settings');
    } else {
      successMsgs.set([
        ...$successMsgs,
        'Successfully logged in with Facebook. Please pick a username to complete registration.',
      ]);
    }
  }
</script>

<style>
  .facebook {
    width: 100%;
  }
</style>

{#if !isSocialRegistration}
  <div class="buttons">
    <a href="/auth/twitter" class="button is-info is-light is-fullwidth">
      <span class="icon">
        <i class="fab fa-twitter" />
      </span>
      <span>Sign up with Twitter</span>
    </a>
    <div class="facebook">
      <FacebookAuth
        text="Sign up with Facebook"
        appId="process.env.FB_APP_ID"
        on:init-error={ev => console.error(ev.detail.error.message)}
        on:auth-failure={ev => ($session.messages = addMsg('error', 'Authentication failure', $session.messages))}
        on:auth-success={fbAuthSuccess} />
    </div>
  </div>
{/if}

<form on:submit|preventDefault={submit}>
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
  {#if !isSocialRegistration}
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="email"
          name="email"
          placeholder="Email Address"
          required
          bind:value={email} />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope" />
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
  {/if}
  <div class="field">
    <div class="control">
      <label class="checkbox">
        <input type="checkbox" required />
        I agree to the
        <a href="/terms">terms and conditions</a>
      </label>
    </div>
  </div>

  <div class="field">
    <div class="control">
      <button
        type="submit"
        class="button is-link"
        disabled={!username || (!isSocialRegistration && (!email || !password))}>
        Get Started
      </button>
    </div>
  </div>
</form>
