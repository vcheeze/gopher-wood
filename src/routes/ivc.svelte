<script>
  import { onMount } from 'svelte';
  import { locale, _ } from 'svelte-i18n';
  import Select from 'svelte-select';
  import moment from 'moment';
  import Spinner from '../components/Spinner.svelte';
  import Dialog from '../components/Dialog.svelte';

  let showSpinner = false;
  let showDialog = false,
    dialogStatus = 'regular',
    dialogTitle = '',
    dialogBody = '';
  const today = moment();
  let dateOptions = [];
  let timeOptions = [];
  let fullName = '',
    selectedDate = undefined,
    selectedTime = undefined;
  $: isEnglish = $locale === 'en';
  $: datePlaceholder = isEnglish ? 'Select a date' : '選擇日期';
  $: timePlaceholder = isEnglish ? 'Select a time' : '選擇時間';
  $: namePlaceholder = isEnglish ? 'Enter your full name' : '姓名';
  $: successTitle = isEnglish ? 'Your appointment is booked!' : '預約成功！';
  $: successText = isEnglish ? 'Appointment details' : '預約時段';
  $: errorTitle = isEnglish ? 'Appointment failed :(' : '預約失敗';
  $: errorText = isEnglish
    ? 'Oops, something went wrong. Please try again.'
    : '發生錯誤，麻煩您再預約一次！';

  const styles = {
    title: 'tc',
    form: 'mv2 mh8-ns',
    formGroup: 'pa2 themed',
    label: 'f5',
    action: 'w-100',
    button: 'primary fr',
  };

  // initialize date options
  initDateOptions();

  /**
   * Populate date options.
   * Only Tuesdays, Fridays, and Saturdays are viable.
   */
  function initDateOptions() {
    let fromDate = moment().hour() < 9 ? today : today.add(1, 'days');
    let toDate = moment(today).add(14, 'days');
    while (fromDate <= toDate) {
      if (fromDate.day() === 2 || fromDate.day() === 5 || fromDate.day() === 6)
        dateOptions.push({
          value: fromDate.toDate(),
          label: formatDate(fromDate),
        });
      fromDate.add(1, 'days'); // increment date
    }
  }

  function formatDate(date) {
    // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    return date.format('MM/DD/YYYY');
  }

  function formatTime(time) {
    return time.format('HH:mm A');
  }

  async function updateTimeslots() {
    let bookedSlots = [];
    const date = moment(selectedDate.value);
    let response = await fetch(
      `/api/getBookedSlots?date=${date.format('YYYY-MM-DD')}`
    );
    if (response.ok) {
      const { data } = await response.json();
      // console.log('==> data: ', data);
      bookedSlots = data;
    } else {
      // console.log('==> failed to get booked slots');
      // TODO show error message
    }

    // if selected date is today
    if (date.isSame(today, 'day')) {
      if (moment().hour() < 9) {
        addTimeslots(date, false, bookedSlots);
        timeOptions = timeOptions; // assign statement to make Svelte reload
      }
    } else {
      addTimeslots(date, true, bookedSlots);
      addTimeslots(date, false, bookedSlots);
      timeOptions = timeOptions; // assign statement to make Svelte reload
    }
    // console.log('==> timeOptions: ', timeOptions);
  }

  function addTimeslots(date, isMorning, bookedSlots) {
    const slotsForPeriod = bookedSlots.filter(slot =>
      isMorning ? slot.period === 'morning' : slot.period === 'afternoon'
    );
    const morning = isEnglish ? 'Morning' : '早上';
    const afternoon = isEnglish ? 'Afternoon' : '下午';

    let fromTime = moment(date).hour(isMorning ? 9 : 16);
    fromTime.minute(isMorning ? 0 : 30);
    fromTime.second(0);
    let toTime = moment(date).hour(isMorning ? 11 : 19);
    toTime.minute(0);
    toTime.second(0);

    while (fromTime <= toTime) {
      if (
        slotsForPeriod.length < 1 ||
        fromTime.format('HH:mm:ss') !== slotsForPeriod[0].time
      ) {
        timeOptions.push({
          value: fromTime.toDate(),
          label: formatTime(fromTime),
          group: isMorning ? morning : afternoon,
        });
      } else {
        slotsForPeriod.shift(); // remove first slot from booked slots
      }

      fromTime.add(5, 'minutes');
    }
  }

  function groupBy(item) {
    return item.group;
  }

  function clearFields() {
    fullName = '';
    selectedDate = undefined;
    selectedTime = undefined;
  }

  async function onSubmit(e) {
    e.preventDefault();
    showSpinner = true;

    const time = moment(selectedTime.value);
    const date = moment(selectedDate.value);
    const data = {
      fullName,
      date: date.format('YYYY-MM-DD'),
      time: time.format('HH:mm:ss'),
      period: time.hour() < 11 ? 'morning' : 'afternoon',
    };
    // console.log('==> data: ', data);
    let response = await fetch(`/api/submitIvcAppointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      let json = await response.json();
      // console.log('==> json: ', json);
      dialogStatus = 'success';
      dialogTitle = successTitle;
      dialogBody = successText;
    } else {
      // console.log('==> failed to book IVC appointment');
      dialogStatus = 'error';
      dialogTitle = errorTitle;
      dialogBody = errorText;
    }

    showDialog = true;
    showSpinner = false;
  }

  function onAcknowledge() {
    clearFields();
    showDialog = false;
  }

  // onMount(() => {
  //   let newDate;
  //   for (let i = 0; i < 14; i++) {
  //     newDate = addDays(startingDate, i);
  //     dateOptions.push({ value: newDate, label: formatDate(newDate) });
  //   }
  //   console.log('==> date options set');
  // });
</script>

<style>
  .themed {
    --borderRadius: 0;
    --itemHoverBG: #e8fdf5;
    --placeholderColor: #000;
  }

  .themed .selectContainer > input::placeholder,
  .themed .selectContainer > input::-webkit-input-placeholder,
  .themed .selectContainer > input:-ms-input-placeholder,
  .themed .selectContainer > input:-moz-placeholder,
  .themed .selectContainer > input::-moz-placeholder {
    font-family: Taipei Sans, huninn, Roboto, -apple-system, Segoe UI, Ubuntu,
      Fira Sans, Helvetica Neue, sans-serif;
  }
</style>

<svelte:head>
  <title>歌斐木診所 - {$_('page.ivc.title')}</title>
  <meta
    name="description"
    content={`歌斐木診所 - ${$_('page.ivc.description')}`} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={$_('clinic.fullName')} />
  <meta property="og:description" content={$_('clinic.description')} />
  <meta property="og:url" content="http://www.gopherwoodclinic.org" />
  <link rel="canonical" href="http://www.gopherwoodclinic.org" />
</svelte:head>

<Spinner visible={showSpinner} />

<Dialog visible={showDialog} status={dialogStatus}>
  <p slot="header">{dialogTitle}</p>
  <p slot="body">{dialogBody}</p>
  <div class={styles.action} slot="action">
    <button class={styles.button} on:click={onAcknowledge}>Okay!</button>
  </div>
</Dialog>
<!-- <Banner visible /> -->

<h1 class={styles.title}>{$_('page.ivc.title')}</h1>
<form class={styles.form}>
  <div class={styles.formGroup}>
    <input bind:value={fullName} placeholder={namePlaceholder} />
  </div>
  <div class={styles.formGroup}>
    <!-- <label class={styles.label} for="date">{$_('field.date')}</label> -->
    <Select
      placeholder={datePlaceholder}
      items={dateOptions}
      bind:selectedValue={selectedDate}
      on:select={updateTimeslots} />
  </div>
  <div class={styles.formGroup}>
    <!-- <label class={styles.label} for="time">{$_('field.time')}</label> -->
    <Select
      placeholder={timePlaceholder}
      items={timeOptions}
      {groupBy}
      bind:selectedValue={selectedTime} />
  </div>
  <button type="submit" class={styles.button} on:click={onSubmit}>
    {$_('button.submit')}
  </button>
</form>
