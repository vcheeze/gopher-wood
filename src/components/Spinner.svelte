<script>
  import { SpinLine } from 'svelte-loading-spinners';

  /*--- props ---*/
  export let visible = false;
  export let size = 100;
  export let color = '#19a974';
  export let unit = 'px';
  export let stroke = parseInt(size / 12) + unit;
  /*--- END props ---*/

  const styles = {
    spinner:
      'bg-white-75 vh-100 w-100 absolute top-0 left-0 flex justify-center items-center z-9999',
  };
</script>

<style>
  .bg-white-75 {
    background-color: rgba(255, 255, 255, 0.75);
  }
</style>

{#if visible}
  <div class={styles.spinner}>
    <SpinLine {size} {color} {unit} {stroke} />
  </div>
{/if}
