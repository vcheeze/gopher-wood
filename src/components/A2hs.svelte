<script>
  import { onMount } from 'svelte';

  onMount(() => {
    window.addEventListener('beforeinstallpropmt', e => {
      e.preventDefault();

      alert('==> before install prompt!');

      window.promptEvent = event;
    });
  });

  const styles = {
    a2hs: 'bg-washed-green absolute bottom-0 w-100 tc',
  };
</script>

<div class={styles.a2hs}>
  <span>Add to Home Screen</span>
</div>
