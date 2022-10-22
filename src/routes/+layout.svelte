<script lang="ts">
	import { navigating } from '$app/stores';
	import Spinner from '$lib/components/Spinner.svelte';
	import Nav from '$lib/components/Nav.svelte';

	const styles = {
		main: 'dtc v-mid pa4'
	};
</script>

{#if $navigating}
	<Spinner visible={true} />
{:else}
	<Nav />
	<main class="app">
		<slot />
	</main>
{/if}

<style lang="less" global>
	@import '../lib/styles/global.less';
</style>
