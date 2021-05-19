<script context="module">
  import { isLoading, waitLocale } from 'svelte-i18n';

  export async function preload() {
    return waitLocale();
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import Spinner from '../components/Spinner.svelte';
  import Nav from '../components/Nav.svelte';

  export let segment;

  const { preloading } = stores();

  const styles = {
    main: 'dtc v-mid pa4',
  };
</script>

<style lang="scss" global>
  @import './styles/global.scss';
</style>

{#if $preloading || $isLoading}
  <Spinner visible={true} />
{:else}
  <Nav {segment} />

  <main class={styles.main}>
    <slot />
  </main>
{/if}
