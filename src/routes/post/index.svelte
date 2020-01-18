<script>
  import { stores, goto } from '@sapper/app';
  import { post, parseErrors } from '../../utils/post';
  import { errorMsgs, successMsgs } from '../../utils/stores';

  const { session } = stores();

  let shareURL = '';
  let comment = '';

  export const submit = async function(event) {
    if (!event.target.checkValidity()) {
      return;
    }
    try {
      const response = await post(`/post/link`, { shareURL, comment });
      if (response.graphQLErrors || response.networkError) {
        errorMsgs.set([...$errorMsgs, parseErrors(response)]);
      } else {
        successMsgs.set([
          ...$successMsgs,
          `'${response.data.episode.title}' from ${response.data.episode.podcast.title} posted.`,
        ]);
        shareURL = '';
        comment = '';
      }
    } catch (e) {
      errorMsgs.set([...$errorMsgs, JSON.stringify(e)]);
    }
  };
</script>

<svelte:head>
  <title>Post an Episode - Echopig</title>
</svelte:head>

<form id="login" on:submit|preventDefault={submit}>
  <div class="field">
    <label class="label">Share URL</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input"
        name="shareURL"
        type="text"
        placeholder="Apple Podcasts, Overcast, Breaker, Stitcher, or Pocket
        Casts episode share link"
        required
        bind:value={shareURL} />
      <span class="icon is-small is-left">
        <i class="fas fa-podcast" />
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label" for="Comment">Comment</label>
    <div class="control has-icons-left has-icons-right">
      <input
        class="input"
        id="comment"
        type="text"
        placeholder="Comment"
        bind:value={comment} />
      <span class="icon is-small is-left">
        <i class="fas fa-comment-dots" />
      </span>
    </div>
  </div>

  <div class="field">
    <div class="control">
      <button type="submit" class="button is-link" disabled={!shareURL}>
        Post Episode
      </button>
    </div>
  </div>
</form>
