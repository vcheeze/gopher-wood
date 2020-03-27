<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';

  let queueNumber;

  onMount(() => {
    fetch('/api/get-number')
      .then(response => {
        if (response.status !== 200) {
          console.warn(
            'Problem fetching queue number. Status code' + response.status
          );
          return;
        }
        console.log('==> response: ', response);
        response.json().then(data => {
          console.log('==> data: ', data);
          queueNumber = data.num.toString().padStart(4, '0');
        });
      })
      .catch(err => {
        console.log(`==> err: ${err}`);
      });
  });

  const styles = {
    queueNumHeader: 'tc f2 f1-ns ma0',
    queueNumBody: 'ma0 tc f1 f-6-ns tracked-mega ti1 green',
  };
</script>

<svelte:head>
  <title>Home - Gopher Wood</title>
</svelte:head>

<div>
  <p class={styles.queueNumHeader}>{$_('currentNumber')}</p>
  <p class={styles.queueNumBody}>{queueNumber}</p>
</div>
