<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';

  let qNumHeader, qNumBody;

  function getQueueNum() {
    fetch('/api/getQueueNumber')
      .then(response => {
        if (response.status !== 200) {
          console.warn(
            'Problem fetching queue number. Status code' + response.status
          );
          return;
        }
        console.log('==> response: ', response);
        response.json().then(data => {
          // console.log('==> data: ', data);
          const { num } = data;
          if (num > 999) {
            qNumHeader = 'qNumHeader.closed';
            qNumBody = '----';
          } else {
            qNumHeader = 'qNumHeader.currentNumber';
            qNumBody = num.toString().padStart(4, '0');
          }
        });
        poll();
      })
      .catch(err => {
        console.log(`==> err: ${err}`);
      });
  }

  function poll() {
    setTimeout(function() {
      getQueueNum();
    }, 5000);
  }

  onMount(() => {
    getQueueNum();
    poll();
  });

  const styles = {
    qNumHeader: 'tc f2 f1-ns ma0',
    qNumBody: 'ma0 tc f1 f-6-ns tracked-mega ti1 green',
  };
</script>

<svelte:head>
  <title>Home - Gopher Wood</title>
</svelte:head>

<div>
  <p class={styles.qNumHeader}>{$_(qNumHeader)}</p>
  <p class={styles.qNumBody}>{qNumBody || '0000'}</p>
</div>
