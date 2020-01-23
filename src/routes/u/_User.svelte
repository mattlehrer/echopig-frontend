<script>
  import moment from 'moment';
  import { stores } from '@sapper/app';
  import PostInList from './_PostInList.svelte';

  const { session } = stores();
  export let username, avatar, name, createdAt, posts;

  const isProfile = $session.user.username === username;
</script>

<style>
  h1, h2 {
    margin-bottom: 0.5rem;
  }

  .avatar {
    border-radius: 0.5rem;
    max-height: 196px;
    max-width: 196px;
  }
</style>

<div class="wrapper">
  <div class="columns">
    <div class="column is-one-third">
      {#if avatar}
        <img class="avatar" src={avatar} alt="{username} avatar" />
      {/if}
    </div>

    <div class="column is-one-half metadata">
      <h1 class="is-size-2">{username}</h1>
      {#if name}
        <h2 class="is-size-4">{name}</h2>
      {/if}
      <h3>User since {moment(createdAt).format('MMMM DD, YYYY')}</h3>
      <h3>{posts.length} posts</h3>
      <h3>
        <a href="https://rss.echopig.com/{username}">Subscribe to feed</a>
      </h3>
    </div>
  </div>

  {#each posts as { __typename, ...post } (post._id)}
    <PostInList {...post} {avatar} {isProfile} />
  {:else}
    <div class="block" />
  {/each}
</div>
