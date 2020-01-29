<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import loader from '@beyonk/async-script-loader';

  const dispatch = createEventDispatcher();
  const version = 'v5.0';

  let disabled = true;
  export let appId;
  export let text = 'Sign in with Facebook';

  onMount(() => {
    loader(
      '//connect.facebook.net/en_US/sdk.js',
      () => window['FB'],
      () => initialise(),
    );
  });

  function initialise() {
    const FB = window['FB'];
    FB.init({
      appId,
      cookie: true,
      xfbml: false,
      version,
    });
    disabled = false;
  }

  function login() {
    const FB = window['FB'];
    FB.login(
      function(response) {
        console.log(response);
        if (response.status === 'connected') {
          const authResponse = response.authResponse;
          const userId = authResponse.userID;
          const accessToken = authResponse.accessToken;

          dispatch('auth-success', {
            accessToken,
            userId,
          });
        } else {
          dispatch('auth-info', { response });
        }
      },
      { scope: 'email,public_profile' },
    );
  }
</script>

<style>
  button {
    background-color: #4285f4;
    cursor: pointer;
  }

  button:disabled {
    background-color: grey;
  }
</style>

<button class="button is-primary is-fullwidth" on:click={login} {disabled}>
  <span class="icon">
    <i class="fab fa-facebook" />
  </span>
  <span>{text}</span>
</button>
