<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
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

  function updateQueueNumber(currentNum) {
    if (currentNum === 0 || currentNum > 999) {
      qNumHeader = 'qNumHeader.closed';
      qNumBody = '----';
    } else {
      qNumHeader = 'qNumHeader.currentNumber';
      qNumBody = currentNum.toString().padStart(4, '0');
    }
  }

  onMount(async () => {
    const sse = new EventSource('queueNumber');
    sse.onmessage = e => {
      const currentNum = parseInt(e.data);
      updateQueueNumber(currentNum);
    };

    showSpinner = true;

    let response = await fetch('/api/getCurrentQueueNumber');
    if (response.ok) {
      const { data } = await response.json();
      updateQueueNumber(data.q_value);
    } else {
      // TODO show error message
    }

    showSpinner = false;

    return () => {
      if (sse.readyState === 1) {
        sse.close();
      }
    };
  });
</script>

<svelte:head>
  <!-- <title>{$_('clinic.fullName')}</title> -->
  <!-- <meta name="description" content={$_('clinic.description')} /> -->
  <title>歌斐木診所 - 首頁</title>
  <meta
    name="description"
    content="歌斐木診所。回歸起初創造之道，追求全人健康。" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="歌斐木診所" />
  <meta
    property="og:description"
    content="歌斐木診所。回歸起初創造之道，追求全人健康。" />
  <meta property="og:url" content="https://www.gopherwoodclinic.org" />
  <meta
    property="og:image"
    content="https://www.gopherwoodclinic.org/images/logo-preview.jpg" />
  <link rel="canonical" href="https://www.gopherwoodclinic.org" />
</svelte:head>

<Spinner visible={showSpinner} />

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
