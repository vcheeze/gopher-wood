<script>
  import { _ } from 'svelte-i18n';
  import { db } from '../firebase';

  let qNumHeader = '',
    qNumBody = '';

  const queueNumRef = db.ref('queue-number');
  queueNumRef.on('value', snapshot => {
    const num = snapshot.val();
    console.log('==> num: ', num);
    if (num > 999) {
      qNumHeader = 'qNumHeader.closed';
      qNumBody = '----';
    } else {
      qNumHeader = 'qNumHeader.currentNumber';
      qNumBody = num.currentNum.toString().padStart(4, '0');
    }
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
