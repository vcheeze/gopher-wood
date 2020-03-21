<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
  export const styles = {
    main: 'dtc v-mid pa4',
  };
</script>

<style lang="scss" global>
  @import './styles/global.scss';
</style>

<Nav {segment} />

<main class={styles.main}>
  <slot />
</main>
