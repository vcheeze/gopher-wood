<script>
  export const styles = {
    queueNumHeader: 'tc f2 f1-ns ma0',
    queueNumBody: 'tc f1 f-6-ns tracked-mega ma0 green',
  };
</script>

<svelte:head>
  <title>Home - Gopher Wood</title>
</svelte:head>

<div>
  <p class={styles.queueNumHeader}>即時診號</p>
  <p class={styles.queueNumBody}>0000</p>
</div>
