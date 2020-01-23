<script context="module">
  import { addMsg } from '../../utils/add-msg';

  export async function preload(page, session) {
    const { user } = session;

    if (!user) {
      session.messages = addMsg(
        'info',
        'Please log in to view your settings',
        session.messages,
      );
      return this.redirect(302, 'login');
    }

    const { isVerified } = user;
    return { user, isVerified };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import { FacebookAuth } from '@beyonk/svelte-social-auth';
  import * as animateScroll from 'svelte-scrollto';
  import SettingsForm from './_SettingsForm.svelte';
  import ResendEmailConfirmForm from './_ResendEmailConfirmForm.svelte';
  import { post } from '../../utils/post';
  import { errorMsgs, successMsgs } from '../../utils/stores';
  let inProgress, scrollY;

  const { session } = stores();
  let __typename, isVerified, user;

  if ($session.user) ({ __typename, isVerified, ...user } = $session.user);

  async function resend(event) {
    const response = await post(`/auth/resend`, event.detail);
    if (response.errors)
      errorMsgs.set([...$errorMsgs, JSON.stringify(response.errors)]);
    if (!response.errors) {
      successMsgs.set([...$successMsgs, 'Email sent.']);
    }
  }

  async function save(event) {
    inProgress = true;
    if (event.detail.email === user.email) delete event.detail.email;
    if (event.detail.avatar === user.avatar) delete event.detail.avatar;
    if (event.detail.name === user.name) delete event.detail.name;
    if (Object.keys(event.detail).length === 0) {
      inProgress = false;
      return;
    }

    animateScroll.scrollToTop();
    const response = await post(`/auth/save`, event.detail);
    if (response.errors)
      errorMsgs.set([...$errorMsgs, JSON.stringify(response.errors)]);
    if (response.user) {
      ({ __typename, isVerified, ...user } = response.user);
      session.user = user;
      successMsgs.set([...$successMsgs, `Settings updated.`]);
    }
    inProgress = false;
  }

  async function fbAuthSuccess({ detail }) {
    console.log(detail);
    const { userId, ...token } = detail;
    const response = await post(`/auth/save`, {
      facebook: userId,
      token: {
        ...token,
        kind: 'facebook',
      },
    });
    if (response.errors)
      errorMsgs.set([...$errorMsgs, JSON.stringify(response.errors)]);
    if (response.user) {
      ({ __typename, isVerified, ...user } = response.user);
      session.user = user;
      successMsgs.set([...$successMsgs, 'Facebook account linked.']);

    }
  }
</script>

<style>
  .content {
    padding: 0 0.75rem;
  }
</style>

<svelte:head>
  <title>Settings - Echopig</title>
</svelte:head>

<svelte:window bind:scrollY={scrollY}/>

<div class="content">
  <div class="columns">
    <div class="column is-two-thirds">
      {#if $session.user && !isVerified}
        <h1 class="is-size-4">Your account email address is unverified</h1>
        <p>
          Please verify your email address by clicking the link in the email we
          sent you. If you need a new email, please enter your address below.
        </p>
        <ResendEmailConfirmForm
          on:resend={resend}
          email={$session.user.email} />
      {:else}
        <h1 class="is-size-3">Your Settings</h1>

        {#if !user.facebook}
          <div class="block">
            <FacebookAuth
              text="Link your Facebook account"
              appId="process.env.FB_APP_ID"
              on:init-error={ev => console.error(ev.detail.error.message)}
              on:auth-failure={ev => ($session.messages = addMsg('error', 'Authentication failure', $session.messages))}
              on:auth-success={fbAuthSuccess} />
          </div>
        {/if}
        <SettingsForm on:save={save} {...user} {inProgress} />
      {/if}
    </div>
  </div>
</div>
