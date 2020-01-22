<script>
  // create a new query to lookup number of posts ref-ing this episode _id
  import moment from 'moment';
  import { slide } from 'svelte/transition';
  import { post, parseErrors } from '../../utils/post';
  import { errorMsgs, successMsgs } from '../../utils/stores';
  import { relativeTime } from '../../utils/relative-time';

  export let _id, comment, updatedAt, episode, isProfile;
  let isEnabled = true;

  async function del(event) {
    let node = event.target;
    while (node && node.parentNode && !node.attributes['data-post-id']) {
      node = node.parentNode;
    }
    // console.log(node.attributes['data-post-id'].value);
    if (node.attributes['data-post-id']) {
      try {
        const response = await post(`/post/delete`, { postId: node.attributes['data-post-id'].value });
        if (response.graphQLErrors || response.networkError) {
          errorMsgs.set([...$errorMsgs, parseErrors(response)]);
        } else {
          successMsgs.set([
            ...$successMsgs,
            `'Removed post.`,
          ]);
          isEnabled = false;
        }
      } catch (e) {
        errorMsgs.set([...$errorMsgs, JSON.stringify(e)]);
      }
    }
  }
</script>

<style>
  h3 {
    margin-bottom: .25em;
  }

  .logo {
    max-width: 600px;
  }

  .is-square img {
    border-radius: .25rem;
  }

  .list-border {
    margin: 0 0 1.5rem;
    padding: 1.5rem 0 0;
    border-top: 1px solid #349494;
  }

  .delete-column {
    display: flex;
    flex-direction: row-reverse;
  }

  @media only screen and (max-width: 600px) {
    .post-footer {
      max-width: 85%;
    }

    .delete-column {
      margin-top: -3.5rem;
    }
  }
</style>

{#if isEnabled}
  <article out:slide|local={{delay: 100, duration: 350 }} class="list-border">
    <div class="columns">
      <div class="column logo is-2">
        <figure class="image is-square">
          <a href="/e/{episode._id}">
            <img src={episode.image ? episode.image : episode.podcast.artworkUrl600} alt="{episode.title} Logo" />
          </a>
        </figure>
      </div>

      <div class="column is-8">
        <div class="post-meta">
          <h4 class="is-size-6 has-text-weight-light"><a href='/p/{episode.podcast.iTunesID}'>{episode.podcast.title}</a></h4>
          <h3 class="is-size-5"><a href='/e/{episode._id}'>{episode.title}</a></h3>
          {#if comment}
            <!-- <img src={avatar} alt='comment by' /> -->
            <p>{comment}</p>
          {/if}
          <div class="post-footer">
            <span class="is-size-7 has-text-weight-medium">🐽 {relativeTime(updatedAt)}</span>
            {#if episode.releaseDate}
              <span class="is-size-7 has-text-weight-light">
                • Episode published {moment(episode.releaseDate).format('MMMM DD, YYYY')}
              </span>
            {/if}
          </div>
        </div>
      </div>
      {#if isProfile}
        <div class="column delete-column">
          <button on:click={del} data-post-id={_id} class="button is-small is-danger is-outlined">
            <span class="icon">
              <i class="fas fa-times"></i>
            </span>
          </button>
        </div>
      {/if}
    </div>
  </article>
{/if}
