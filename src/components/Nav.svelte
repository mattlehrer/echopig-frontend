<script>
  import { stores } from '@sapper/app';
  const { session } = stores();

  export let segment;

  function menuToggle() {
    var target = this.dataset.target;
    var $target = document.getElementById(target);
    this.classList.toggle('is-active');
    $target.classList.toggle('is-active');
  }

  function logout() {
    delete session.user;
    session.set({});
  }
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding-top: 5px;
  }

  .navbar-brand {
    margin-top: -10px;
  }

  .navbar-item {
    margin: 0 0.25rem;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1.5em);
    height: 1px;
    background-color: #349494;
    display: block;
    bottom: -1px;
  }

  .button {
    border: 0;
    color: #4a4a4a;
  }
</style>

<section id="nav">
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class:selected={segment === undefined} class="navbar-item" href="/">
        <img alt="logo" src="images/logo.svg" width="81" height="28" />
      </a>

      <button
        class="button navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="mainNav"
        on:click={menuToggle}>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </div>

    <div id="mainNav" class="navbar-menu">
      <div class="navbar-start">
        <a
          rel="prefetch"
          class:selected={segment === 'episodes'}
          class="navbar-item button"
          href="/episodes">
          Episodes
        </a>
        <a
          rel="prefetch"
          class:selected={segment === 'podcasts'}
          class="navbar-item button"
          href="/podcasts">
          Podcasts
        </a>
        <a
          rel="prefetch"
          class:selected={segment === 'about'}
          class="navbar-item button"
          href="/about">
          About
        </a>
      </div>

      <div class="navbar-end">
        {#if $session.user}
          <a class="navbar-item button is-primary is-light" href="/post">
            Post an Episode
          </a>
          <a
            class="navbar-item button is-white"
            href="/u/{$session.user.username}">
            Profile
          </a>
          <a class="navbar-item button is-white" href="/settings">Settings</a>
          <a
            on:click={logout}
            class="navbar-item button is-white"
            href="/logout">
            Logout
          </a>
        {:else}
          <a
            rel="prefetch"
            class="navbar-item button is-info has-text-white"
            href="/register">
            <strong>Sign up</strong>
          </a>
          <a rel="prefetch" class="navbar-item button is-light" href="/login">
            Log in
          </a>
        {/if}
      </div>
    </div>
  </nav>
</section>
