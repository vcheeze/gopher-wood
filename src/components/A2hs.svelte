<script>
  import { _ } from 'svelte-i18n';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import { plus } from 'svelte-awesome/icons';

  const styles = {
    container: 'w-100 absolute bottom-0 bg-green tc',
    text: 'dib h2 lh2',
  };
</script>

<div class={styles.container}>
  <span class={styles.text}>
    <Icon data={plus} scale={0.8} />
    Add to home screen
  </span>
</div>
