<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { auth, db } from '../firebase';
  import Spinner from '../components/Spinner.svelte';

  let showSpinner = false,
    qNumHeader = '',
    qNumBody = '';

  const styles = {
    logo: 'tc',
    qNumHeader: 'tc f2 f1-ns ma0',
    qNumBody: 'ma0 tc f1 f-6-ns tracked-mega ti1 green',
    hours: 'tc',
  };

  onMount(() => {
    showSpinner = true;
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
      if (currentNum === 0 || currentNum > 999) {
        qNumHeader = 'qNumHeader.closed';
        qNumBody = '----';
      } else {
        qNumHeader = 'qNumHeader.currentNumber';
        qNumBody = currentNum.toString().padStart(4, '0');
      }
      showSpinner = false;
    });
  });
</script>

<svelte:head>
  <!-- <title>{$_('clinic.fullName')}</title> -->
  <!-- <meta name="description" content={$_('clinic.description')} /> -->
  <title>歌斐木診所 - {$_('page.home.title')}</title>
  <meta
    name="description"
    content="歌斐木診所。回歸起初創造之道，追求全人健康。" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={$_('clinic.fullName')} />
  <meta property="og:description" content={$_('clinic.description')} />
  <meta property="og:url" content="http://www.gopherwoodclinic.org" />
  <link rel="canonical" href="http://www.gopherwoodclinic.org" />
</svelte:head>

<!-- <Spinner visible={showSpinner} /> -->

<div class={styles.logo}>
  <img src="/images/logo.svg" alt="logo" />
</div>
<div>
  <p class={styles.qNumHeader}>{$_(qNumHeader)}</p>
  <p class={styles.qNumBody}>{qNumBody || '0000'}</p>
  <p class={styles.hours}>{$_('clinic.openingHours.title')}</p>
  <p class={styles.hours}>{$_('clinic.openingHours.weekdays')}</p>
  <p class={styles.hours}>{$_('clinic.openingHours.weekend')}</p>
</div>
