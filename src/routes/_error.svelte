<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<style>
  h1,
  p {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  .not-found-img-container {
    text-align: center;
  }

  .not-found-img {
    width: 50%;
  }

  .not-found-img-ref {
    font-size: 0.75em;
    float: right;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  @media (max-width: 480px) {
    .not-found-img {
      width: 75%;
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

{#if status !== 404}
  <h1>{status}</h1>
{/if}

{#if status === 404}
  <div class="not-found-img-container">
    <img class="not-found-img" src="images/404.svg" alt="Not Found" />
  </div>
  <a class="not-found-img-ref" href="https://storyset.com/web">
    Illustration by Freepik Storyset
  </a>
{:else}
  <p>{error.message}</p>
{/if}

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
