<script>
  let year = new Date().getFullYear();
</script>

<style>
  .button {
    border: 0;
    background-color: inherit;
    vertical-align: middle;
  }

  #copyright {
    /* padding-left: 1rem; */
    margin: 0 1rem;
    display: inline-block;
  }
  .footer {
    height: 144px;
  }
</style>

<section id="footer">
  <footer class="footer">
    <div class="content has-text-centered">
      <span>
        <a class="button is-small is-borderless" href="/terms">TERMS</a>
        <a class="button is-small is-borderless" href="/privacy">
          PRIVACY POLICY
        </a>
      </span>
      <span id="copyright" class="is-size-6">© {year} Echopig</span>
    </div>
  </footer>
</section>
