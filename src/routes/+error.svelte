<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

{#if $page.status !== 404}
	<h1>{$page.status}</h1>
{/if}

{#if $page.status === 404}
	<div class="not-found-img-container">
		<img class="not-found-img" src="images/404.svg" alt="Not Found" />
	</div>
	<a class="not-found-img-ref" href="https://storyset.com/web">
		Illustration by Freepik Storyset
	</a>
{:else}
	<!-- TODO add generic default error message -->
	<p>{$page.error?.message || ''}</p>
{/if}

<style lang="less">
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

	.not-found-img {
		width: 50%;

		&-container {
			text-align: center;
		}

		&-ref {
			font-size: 0.75em;
			float: right;
		}
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
