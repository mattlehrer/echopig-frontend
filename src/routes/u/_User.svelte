<script>
  import moment from 'moment';
  import { stores } from '@sapper/app';
  import PostInList from './_PostInList.svelte';
  
  const { session } = stores();
  export let username, avatar, name, createdAt, posts;

  const isProfile = $session.user.username === username;
</script>

<style>
  h1 {
    margin-bottom: .5rem;
  }
</style>

<div class="wrapper">
  <div class="columns">
    <div class="column is-one-third">
      {#if avatar}
        <img src={avatar} alt="{username} avatar" />
      {/if}
    </div>

    <div class="column is-one-half metadata">
      <h1 class="is-size-2">{username}</h1>
      {#if name}
        <h2 class="is-size-4">{name}</h2>
      {/if}
      <h3>User since {moment(createdAt).format('MMMM DD, YYYY')}
    </div>
  </div>
  
  {#each posts as { __typename, ...post } (post._id)}
    <PostInList {...post} {avatar} {isProfile} />
  {:else}
    <div class="block"></div>
  {/each}
</div>
