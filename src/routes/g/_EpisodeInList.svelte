<script>
  // create a new query to lookup number of posts ref-ing this episode _id
  import moment from 'moment';
  import { slide } from 'svelte/transition';
  import { post, parseErrors } from '../../utils/post';
  import { errorMsgs, successMsgs } from '../../utils/stores';
  import { relativeTime } from '../../utils/relative-time';

  export let _id, image, title, releaseDate, description, podcast;
  let isEnabled = true;

  async function del(event) {
    let node = event.target;
    while (node && node.parentNode && !node.attributes['data-post-id']) {
      node = node.parentNode;
    }
    // console.log(node.attributes['data-post-id'].value);
    if (node.attributes['data-post-id']) {
      try {
        const response = await post(`/post/delete`, {
          postId: node.attributes['data-post-id'].value,
        });
        if (response.graphQLErrors || response.networkError) {
          errorMsgs.set([...$errorMsgs, parseErrors(response)]);
        } else {
          successMsgs.set([...$successMsgs, `'Removed post.`]);
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
    margin-bottom: 0.25em;
  }

  .logo {
    max-width: 600px;
  }

  .is-square img {
    border-radius: 0.25rem;
  }

  .list-border {
    margin: 0 0 1.5rem;
    padding: 1.5rem 0 0;
    border-top: 1px solid #349494;
  }
</style>

<article out:slide|local={{ delay: 100, duration: 350 }} class="list-border">
  <div class="columns">
    <div class="column logo is-2">
      <figure class="image is-square">
        <a href="/e/{_id}">
          <img src={image ? image : podcast.artworkUrl600} alt="{title} Logo" />
        </a>
      </figure>
    </div>

    <div class="column is-8">
      <div class="post-meta">
        <h4 class="is-size-6 has-text-weight-light">
          <a href="/p/{podcast.iTunesID}">{podcast.title}</a>
        </h4>
        <h3 class="is-size-5">
          <a href="/e/{_id}">{title}</a>
        </h3>
      </div>
      <div class="description">
        <p>{description}</p>
      </div>
      <div class="post-footer">
        {#if releaseDate}
          <span class="is-size-7 has-text-weight-light">
            Episode published {moment(releaseDate).format('MMMM DD, YYYY')}
          </span>
        {/if}
      </div>
    </div>
  </div>
</article>
