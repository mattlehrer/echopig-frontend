<script>
  // create a new query to lookup number of posts ref-ing this episode _id
  import moment from 'moment';
  export let _id, title, releaseDate, description;
</script>

<style>
  h3 {
    margin-bottom: 1em;
  }

  .list-border {
    margin: 0 0 1.5rem;
    padding: 1.5rem 0 0;
    border-top: 1px solid #349494;
  }

  /* .post-count {
    align-self: flex-end;
    flex-shrink: 0;
  }

  .snout {
    line-height: 1.5rem;
    padding-right: 0.25rem;
  } */
</style>

<div class="columns">
  <div class="column is-10">
    <div class="list-border">
      <h2 class="is-size-4"><a href='/e/{_id}'>{title}</a></h2>
      {#if releaseDate}
        <h3 class="is-size-6 has-text-weight-light">
          Published {moment(releaseDate).format('MMMM DD, YYYY')}
        </h3>
      {/if}
      <div class="description">
        <p>{description}</p>
      </div>

      <div class="epfooter">

        <!-- {#if posts}
          <div class="post-count is-size-7">
            <span class="snout">🐽</span>
            {posts}
          </div>
        {/if} -->
      </div>
    </div>
  </div>
</div>
