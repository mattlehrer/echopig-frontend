<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  export let inProgress,
    username,
    email,
    name,
    postTag,
    // saveTag,
    avatar = '',
    oldPassword = '',
    newPassword = '';
  const savedEmail = email;
  const dispatch = createEventDispatcher();

  function submit(event) {
    const variables = {
      // username,
      email,
      name,
      avatar,
    };
    // if (email !== savedEmail) variables.email = email;
    if (!!oldPassword) {
      variables.oldPassword = oldPassword;
      variables.newPassword = newPassword;
    }
    dispatch('save', variables);
  }

  function useUnavatar(event) {
    event.target.checked = false;
    avatar = `https://unavatar.now.sh/${email}`;
    dispatch('save', { avatar });
  }
</script>

<style>
  .vcard-link {
    width: 100%;
    height: 2.5em;
    justify-content: flex-start;
    display: inline-flex;
    line-height: 1.5;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    padding-bottom: calc(0.5em - 1px);
    padding-top: calc(0.5em - 1px);
    position: relative;
    vertical-align: top;
  }

  .vcard-icon {
    color: #dbdbdb;
    left: 0;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    z-index: 4;
  }

  .has-icons-left:hover .vcard-icon {
    color: #363636;
  }

  .avatar-columns {
    display: flex;
    justify-content: space-between;
  }

  .avatar-input-column {
    flex-basis: auto;
  }

  .unavatar-column {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex: 1 1 content;
  }

  .unavatar-text {
    align-self: center;
  }

  .unavatar {
    display: inline-block;
    border-radius: 0.25rem;
    margin: 0 0 0 0.5rem;
  }
</style>

<form on:submit|preventDefault={submit}>
  <div class="field">
    <label class="label">Username</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input is-static"
        name="username"
        type="text"
        placeholder="Username"
        bind:value={username}
        readonly />
      <span class="icon is-small is-left">
        <i class="fas fa-user" />
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">RSS Feed of Your Posts</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input is-static"
        type="text"
        value={`https://rss.echopig.com/${username}`}
        readonly />
      <span class="icon is-small is-left">
        <i class="fas fa-rss" />
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label" for="email">
      Add Your Secret Email to Your Contacts
    </label>
    <a href="/vcard">
      <div class="vcard-link has-icons-left has-icons-right">
        <span class="vcard-icon icon is-small">
          <i class="fas fa-envelope" />
        </span>
        <span class="vcard-link-text">{`post+${postTag}@echopig.com`}</span>
      </div>
    </a>
  </div>

  <!-- <div class="field">
    <label class="label" for="saveTag">Secret Email for Private Feed</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input is-static"
        id="saveTag"
        type="text"
        name="saveTag"
        value={`save+${saveTag}@echopig.com`}
        readonly />
      <span class="icon is-small is-left">
        <i class="fas fa-envelope" />
      </span>
    </div>
  </div> -->

  <div class="field">
    <label class="label" for="name">Display Name</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input"
        id="name"
        type="text"
        name="name"
        placeholder=""
        bind:value={name} />
      <span class="icon is-small is-left">
        <i class="fas fa-id-card" />
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label" for="email">Email</label>
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

  <div class="field">
    <label class="label">Avatar</label>
    <div class="columns avatar-columns">
      <div class="column avatar-input-column">
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            id="avatar"
            type="text"
            name="avatar"
            placeholder="URL of profile picture"
            bind:value={avatar} />
          <span class="icon is-small is-left">
            <i class="fas fa-image" />
          </span>
        </div>
      </div>
      {#if !avatar && email}
        <div out:fade|local class="column unavatar-column">
          <label class="checkbox unavatar-text">
            Use Unavatar?
            <input on:click={useUnavatar} type="checkbox" />
          </label>
          <img
            src="https://unavatar.now.sh/{email}"
            alt="photo from unavatar"
            class="unavatar is-square"
            height="40px"
            width="40px" />
        </div>
      {/if}
    </div>
  </div>

  <div class="field">
    <label class="label" for="password">Old Password</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input"
        id="password"
        type="password"
        name="password"
        placeholder="Old password"
        bind:value={oldPassword} />
      <span class="icon is-small is-left">
        <i class="fas fa-lock" />
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label" for="password">New Password</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input"
        id="password"
        type="password"
        name="password"
        placeholder="New password"
        bind:value={newPassword} />
      <span class="icon is-small is-left">
        <i class="fas fa-lock" />
      </span>
    </div>
  </div>

  <button class="button is-link" type="submit" disabled={inProgress}>
    Update Settings
  </button>
</form>
