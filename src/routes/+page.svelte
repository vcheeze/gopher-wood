<script lang="ts">
	import { onMount } from 'svelte';
	// import { Alert } from 'flowbite-svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { t } from '$lib/translations';

	let showSpinner = false,
		qNumHeader = '',
		qNumBody = '';

	function updateQueueNumber(currentNum: number) {
		if (currentNum === 0 || currentNum > 999) {
			qNumHeader = 'home.qNumHeader.closed';
			qNumBody = '----';
		} else {
			qNumHeader = 'home.qNumHeader.currentNumber';
			qNumBody = currentNum.toString().padStart(4, '0');
		}
	}

	onMount(async () => {
		const sse = new EventSource('queueNumber');
		sse.onmessage = (e) => {
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
	<!-- <title>{$t('clinic.fullName')}</title> -->
	<!-- <meta name="description" content={$t('clinic.description')} /> -->
	<title>歌斐木診所 - 首頁</title>
	<meta name="description" content="歌斐木診所。回歸起初創造之道，追求全人健康。" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="歌斐木診所" />
	<meta property="og:description" content="歌斐木診所。回歸起初創造之道，追求全人健康。" />
	<meta property="og:url" content="https://www.gopherwoodclinic.org" />
	<meta property="og:image" content="https://www.gopherwoodclinic.org/images/logo-preview.jpg" />
	<link rel="canonical" href="https://www.gopherwoodclinic.org" />
</svelte:head>

<Spinner visible={showSpinner} />

<div>
	<img src="/images/logo.svg" alt="logo" />
</div>
<div>
	<p class="queueNumber-header">{$t(qNumHeader)}</p>
	<p class="queueNumber-body">{qNumBody || '0000'}</p>
	<p>{$t('common.clinic.openingHours.title')}</p>
	<p>{$t('common.clinic.openingHours.weekdays')}</p>
	<p>{$t('common.clinic.openingHours.weekend')}</p>
</div>

<!-- <div class="p-8">
	<Alert>
		<span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
	</Alert>
</div> -->
<style>
	.queueNumber-header {
		margin: 0;
		font-size: 2rem;
	}

	.queueNumber-body {
		margin: 0;
		font-size: 4rem;
		color: #19a974;
	}
</style>
