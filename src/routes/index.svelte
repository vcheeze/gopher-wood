<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { auth, db } from '../firebase';

  let qNumHeader = '',
    qNumBody = '';

  const styles = {
    logo: 'tc',
    qNumHeader: 'tc f2 f1-ns ma0',
    qNumBody: 'ma0 tc f1 f-6-ns tracked-mega ti1 green',
    hours: 'tc',
  };

  onMount(() => {
    auth.signInAnonymously().catch(function(err) {
      var errCode = err.code;
      var errorMessage = err.message;
    });
    auth.onAuthStateChanged(function(user) {
      if (user) {
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
      } else {
        // user is signed out
      }
    });
    const queueNumRef = db.ref('queue-number');
    queueNumRef.on('value', snapshot => {
      const { currentNum } = snapshot.val();
      if (currentNum > 999) {
        qNumHeader = 'qNumHeader.closed';
        qNumBody = '----';
      } else {
        qNumHeader = 'qNumHeader.currentNumber';
        qNumBody = currentNum.toString().padStart(4, '0');
      }
    });
  });
</script>

<svelte:head>
  <title>Home - Gopher Wood</title>
</svelte:head>

<div class={styles.logo}>
  <img src="/images/logo.svg" alt="logo image" />
</div>
<div>
  <p class={styles.qNumHeader}>{$_(qNumHeader)}</p>
  <p class={styles.qNumBody}>{qNumBody || '0000'}</p>
  <p class={styles.hours}>{$_('clinic.openingHours.title')}</p>
  <p class={styles.hours}>{$_('clinic.openingHours.weekdays')}</p>
  <p class={styles.hours}>{$_('clinic.openingHours.weekend')}</p>
</div>
