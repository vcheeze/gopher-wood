<script>
  import { onMount } from 'svelte';
  import { locale, _ } from 'svelte-i18n';
  import Select from 'svelte-select';
  import moment from 'moment';
  import SvelteTable from 'svelte-table';

  $: isEnglish = $locale === 'en';
  $: nameTitle = isEnglish ? 'Name' : '姓名';
  $: dateTitle = isEnglish ? 'Date' : '日期';
  $: timeTitle = isEnglish ? 'Date' : '時間';
  $: periodTitle = isEnglish ? 'Name' : '時段';
  onMount(() => {
    getAppointments();
  });

  async function getAppointments() {
    let response = await fetch(`/api/retrieveAppointmentRecord`);
    if (response.ok) {
      let json = await response.json();
      console.log(
        'successfully fetched appointment data from database',
        '==> json: ',
        json
      );
      displayTable(json.data);
      // TODO show success message
    } else {
      console.log('==> failed to get booked slots');
      // TODO show error message
    }
  }

  let rows = [];
  let columns = [];
  function displayTable(data) {
    rows = data;
    columns = [
      {
        key: 'full_name',
        title: nameTitle,
        value: v => v.full_name,
        sortable: true,
        headerClass: 'text-right',
      },
      {
        key: 'date',
        title: dateTitle,
        value: v => v.date.substring(0, 10),
        sortable: true,
        headerClass: 'text-left',
      },
      {
        key: 'time',
        title: timeTitle,
        value: v => v.time.substring(0, 5),
        sortable: true,
        headerClass: 'text-left',
      },
      {
        key: 'period',
        title: periodTitle,
        value: v => v.period,
        sortable: true,
        headerClass: 'text-left',
      },
    ];
  }
</script>

<svelte:head>
  <title>IVC</title>
</svelte:head>

<div>
  <SvelteTable {rows} {columns} />
</div>
