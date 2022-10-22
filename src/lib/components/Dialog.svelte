<script>
	import { fade } from 'svelte/transition';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

	/*--- props ---*/
	export let visible = false;
	export let status = 'regular';
	// export let headerTitle = 'Dialog title';
	// export let message = 'Dialog body';
	/*--- END props ---*/

	const styles = {
		dialogContainer:
			'fixed top-0 left-0 right-0 bottom-0 bg-dark-gray-75 flex justify-center items-center z-9999',
		dialog: 'w-40-l w-60-m w-90 pa2 bg-white relative flex flex-column items-center',
		header: 'w-100 pa2 tc f3 b',
		body: 'w-100 pa2 tc'
	};
</script>

{#if visible}
	<div class={styles.dialogContainer} transition:fade>
		<div class={styles.dialog}>
			<div class={styles.header}>
				{#if status === 'success'}
					<div>
						<Icon data={faCheckCircle} scale="4" style="fill: #19a974" />
					</div>
				{:else if status === 'error'}
					<Icon data={faTimesCircle} scale="4" style="fill: #a9194e" />
				{/if}
				<slot name="header" />
			</div>
			<div class={styles.body}>
				<slot name="body" />
				<slot name="action" />
			</div>
		</div>
	</div>
{/if}

<style>
</style>
