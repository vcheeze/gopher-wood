<script>
  import { onMount } from 'svelte';
  import { locale, _ } from 'svelte-i18n';
  import Select from 'svelte-select';
  import SvelteTable from 'svelte-table';

  const styles = {
    title: 'tc',
    form: 'mv2 mh8-ns',
    formGroup: 'pa2 themed',
    label: 'f5',
    submitButton: 'primary bg-white ma2 pv2 ph4 fr pointer',
  };

  $: isEnglish = $locale === 'en';
  $: nameTitle = isEnglish ? 'Name' : '姓名';
  $: dateTitle = isEnglish ? 'Date' : '日期';
  $: selectPlaceholder = isEnglish ? 'search by' : '選擇查詢方式';
  $: enterName = isEnglish ? 'Enter your full name' : '輸入欲查詢姓名';
  $: enterDateFrom = isEnglish ? 'Enter start date' : '起始日期';
  $: enterDateTo = isEnglish ? 'Enter end date' : '終止日期';
  $: items = [dateTitle, nameTitle];
  $: selectedMethod = undefined;
  let dateFrom = undefined;
  let dateTo = undefined;
  let fullName = undefined;

  let queryType = 'empty';
  let queryString = 'empty';
  let rows = [];
  const columns = [
    {
      key: 'full_name',
      title: 'name',
      value: v => v.full_name,
      sortable: true,
      filterOptions: rows => rows.full_name,
    },
    {
      key: 'date',
      title: 'date',
      value: v => v.date.substring(0, 10),
      sortable: true,
    },
    {
      key: 'time',
      title: 'time',
      value: v => v.time.substring(0, 5),
      sortable: true,
    },
  ];

  let classNameTable = 'appointment-table';

  async function getAppointments() {
    const response = await fetch('/api/getAppointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      const { data } = await response.json();
      console.log('===== data: ', data);
      return data;
    } else {
      // TODO show error message
    }
  }

  onMount(async () => {
    const appointments = await getAppointments();
    rows = appointments;
  });
  // let savedData = [
  //   {
  //     date: '2020-08-14T04:00:00.000Z',
  //     time: '09:00:00',
  //     is_booked: 1,
  //     period: 'morning',
  //     full_name: '曹測試',
  //   },
  //   {
  //     date: '2020-08-14T04:00:00.000Z',
  //     time: '09:05:00',
  //     is_booked: 1,
  //     period: 'morning',
  //     full_name: 'test2',
  //   },
  //   {
  //     date: '2020-08-14T04:00:00.000Z',
  //     time: '09:10:00',
  //     is_booked: 1,
  //     period: 'morning',
  //     full_name: 'test3',
  //   },
  //   {
  //     date: '2020-08-21T04:00:00.000Z',
  //     time: '09:05:00',
  //     is_booked: 1,
  //     period: 'morning',
  //     full_name: 'Henry Bobo',
  //   },
  // ];
  // $: if ($locale === 'en') {
  //   if (savedData !== null) displayTable(savedData);
  // } else {
  //   if (savedData !== null) displayTable(savedData);
  // }
  // function displayTable(data) {
  //   // define some sample data...
  //   rows = data;
  //   savedData = data;
  //   // define column configs
  //   columns = [];
  // }
  // displayTable(savedData);

  // function makeQuery(e) {
  //   e.preventDefault();

  //   if (fullName === undefined) fullName = 0;
  //   if (dateFrom === undefined || dateFrom === undefined) {
  //     dateFrom = 0;
  //     dateTo = 0;
  //   }
  //   let request = { fullName: fullName, dateFrom: dateFrom, dateTo: dateTo };
  //   getAppointments(request);
  //   dateFrom = undefined;
  //   dateTo = undefined;
  //   fullName = undefined;
  // }

  // async function getAppointments(request) {
  //   console.log('request', JSON.stringify(request));
  //   let response = await fetch(`/api/retrieveAppointmentRecord`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(request),
  //   });

  //   if (response.ok) {
  //     let json = await response.json();
  //     console.log('==> json: ', json);
  //     displayTable(json.data);
  //     // TODO show success message
  //   } else {
  //     console.log('==> failed to book IVC appointment');
  //     // TODO show error message
  //   }
  // }

  // check out https://github.com/dasDaniel/svelte-table for example
</script>

<style>
  :global(.appointment-table) {
    border-collapse: collapse;
    border: solid #1ca47436 2px;
  }
  :global(.appointment-table td) {
    text-align: center;
    padding: 10px;
    width: 100px;
    border: solid #1ca47436 2px;
  }
  :global(.appointment-table th) {
    color: white;
    text-align: center;
    background: #1ca474;
  }
  :global(.appointment-table tr:nth-child(even)) {
    background: #1ca47436;
  }
</style>

<svelte:head>
  <title>歌斐木診所 - {$_('page.appointment.title')}</title>
</svelte:head>

<!-- <form class={styles.form}>
  <div class={styles.formGroup}>
    <Select
      placeholder={selectPlaceholder}
      {items}
      bind:selectedValue={selectedMethod} />
  </div>
  {#if selectedMethod !== undefined}
    {#if selectedMethod.value === dateTitle}
      <div class={styles.formGroup}>
        <input bind:value={dateFrom} placeholder={enterDateFrom} />
      </div>
      <div class={styles.formGroup}>
        <input bind:value={dateTo} placeholder={enterDateTo} />
      </div>
    {:else}
      <div class={styles.formGroup}>
        <input bind:value={fullName} placeholder={enterName} />
      </div>
    {/if}
  {/if}

  <button type="submit" class={styles.submitButton} on:click={makeQuery}>
    {$_('button.submit')}
  </button>
</form> -->

<SvelteTable {rows} {columns} {classNameTable} />
