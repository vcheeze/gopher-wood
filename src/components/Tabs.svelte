<script>
  import { onMount } from 'svelte';
  import { locale, _ } from 'svelte-i18n';
  import { identity } from 'svelte/internal';

  /*--- props ---*/
  export let items;
  export let selectedTab = 'newAppointment';
  export let onTabClick;
  /*--- END props ---*/

  const styles = {
    ulContainer: 'mh8-ns',
    ul: 'ma0 pa0 flex justify-between',
    li: 'tab db pointer tc flex-auto',
    span: 'no-underline pv3 ph2 db',
  };
</script>

<style>
  .tab {
    border-bottom: 2px solid #19a974;
  }
  /* .tab:hover {
    background-color: #e8fdf5;
  } */
  .tab.selected {
    border-top: 2px solid #19a974;
    border-right: 2px solid #19a974;
    border-left: 2px solid #19a974;
    border-bottom: none;
  }
</style>

<div class={styles.ulContainer}>
  <ul class={styles.ul}>
    {#each items as { id, label }}
      <li
        class={styles.li}
        class:selected={selectedTab === id}
        on:click={onTabClick(id)}>
        <span class={styles.span}>{$_(label)}</span>
      </li>
    {/each}

    <!-- <li class={styles.li}>
      <span class={styles.a} class:selected={segment === 'about'} href="about">
        {$_('nav.about')}
      </span>
    </li> -->
    <!-- <li
      class={styles.li}
      class:selected={selectedTab === 'modifyAppointment'}
      on:click={updateTabs('modifyAppointment')}>
      <span class={styles.span}>{$_('ivcOptions.modifyAppointment')}</span>
    </li> -->
  </ul>
</div>
