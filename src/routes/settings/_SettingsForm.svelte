<script>
  import { createEventDispatcher } from 'svelte';
  export let inProgress,
    username,
    email,
    postTag,
    saveTag,
    avatar = '',
    oldPassword = '',
    newPassword = '';
  const savedEmail = email;
  const dispatch = createEventDispatcher();
  function submit(event) {
    const variables = {
      // username,
      email,
      avatar,
    };
    // if (email !== savedEmail) variables.email = email;
    if (!!oldPassword) {
      variables.oldPassword = oldPassword;
      variables.newPassword = newPassword;
    }
    dispatch('save', variables);
  }
</script>

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
    <label class="label" for="email">Secret Email for Public Feed</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input is-static"
        id="postTag"
        type="text"
        name="postTag"
        value={`post+${postTag}@echopig.com`}
        readonly />
      <span class="icon is-small is-left">
        <i class="fas fa-envelope" />
      </span>
    </div>
  </div>

  <div class="field">
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
