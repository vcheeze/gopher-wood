<script lang="ts">
	import { t } from '$lib/translations';

	type TabItem = {
		id: string;
		label: string;
	};

	/*--- props ---*/
	export let items: TabItem[];
	export let selectedTab: string = 'newAppointment';
	export let onTabClick: Function;
	/*--- END props ---*/
</script>

<div class="tabs-container">
	<ul class="tabs-list">
		{#each items as { id, label }}
			<li class="tab" class:selected={selectedTab === id} on:click={onTabClick(id)}>
				<span>{$t(label)}</span>
			</li>
		{/each}

		<!-- <li class={styles.li}>
      <span class={styles.a} class:selected={segment === 'about'} href="about">
        {$t('nav.about')}
      </span>
    </li> -->
		<!-- <li
      class={styles.li}
      class:selected={selectedTab === 'modifyAppointment'}
      on:click={updateTabs('modifyAppointment')}>
      <span class={styles.span}>{$t('ivcOptions.modifyAppointment')}</span>
    </li> -->
	</ul>
</div>

<style lang="less">
	.tabs-container {
		margin: 2rem 4rem;
	}

	.tabs-list {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: space-between;
	}

	.tab {
		padding: 1rem;
		display: block;
		border-bottom: 2px solid #19a974;
		cursor: pointer;
		flex: 1 1 auto;
		min-width: 0;
		min-height: 0;

		&.selected {
			border-top: 2px solid #19a974;
			border-right: 2px solid #19a974;
			border-left: 2px solid #19a974;
			border-bottom: none;
		}

		& > span {
			text-decoration: none;
		}
	}
	/* .tab:hover {
    background-color: #e8fdf5;
  } */
</style>
