<script>
  import { stores } from '@sapper/app';
  import { successMsgs, errorMsgs, infoMsgs } from '../utils/stores';
  import { post } from '../utils/post';

  const { session } = stores();
  const cookieMgs = $session.messages;

  async function del(event) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    const msg = event.target.parentNode.textContent.trim();
    if (event.target.parentNode.className.includes('error')) {
      errorMsgs.set($errorMsgs.filter(m => m !== msg));
    }
    if (event.target.parentNode.className.includes('success')) {
      successMsgs.set($successMsgs.filter(m => m !== msg));
    }
    if (event.target.parentNode.className.includes('info')) {
      infoMsgs.set($infoMsgs.filter(m => m !== msg));
    }
  }

  async function delCookieMsg(event) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    try {
      await post('/delmsg', {
        msg: event.target.parentNode.textContent.trim(),
      });
    } catch (e) {
      console.log(e);
    }
  }
</script>

<style>
  .notification {
    margin-bottom: 1.5rem;
    padding: 1rem;
  }
</style>

{#if cookieMgs || $successMsgs || $errorMsgs || $infoMsgs}
  <ul>
    {#if cookieMgs}
      {#each cookieMgs as msg}
        {#if msg.type === 'info'}
          <li>
            <div class="notification is-info">
              <button on:click={delCookieMsg} class="delete" />
              {msg.message}
            </div>
          </li>
        {:else if msg.type === 'error'}
          <li>
            <div class="notification is-danger">
              <button on:click={delCookieMsg} class="delete" />
              {msg.message}
            </div>
          </li>
        {:else}
          <li>
            <div class="notification is-warning">
              <button on:click={delCookieMsg} class="delete" />
              {msg.message}
            </div>
          </li>
        {/if}
      {/each}
    {/if}

    {#if $errorMsgs}
      {#each $errorMsgs as msg}
        <li>
          <div class="notification is-danger error">
            <button on:click={del} class="delete" />
            {msg}
          </div>
        </li>
      {/each}
    {/if}

    {#if $successMsgs}
      {#each $successMsgs as msg}
        <li>
          <div class="notification is-success success">
            <button on:click={del} class="delete" />
            {msg}
          </div>
        </li>
      {/each}
    {/if}

    {#if $infoMsgs}
      {#each $infoMsgs as msg}
        <li>
          <div class="notification is-info info">
            <button on:click={del} class="delete" />
            {msg}
          </div>
        </li>
      {/each}
    {/if}

  </ul>
{/if}
