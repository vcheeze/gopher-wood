<script>
  import { onMount } from 'svelte';
  import { locale, _ } from 'svelte-i18n';
  import Select from 'svelte-select';
  import moment from 'moment';

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

  const styles = {
    title: 'tc',
    form: 'mv2 mh8-ns',
    formGroup: 'pa2 themed',
    label: 'f5',
    submitButton: 'bg-white ma2 pv2 ph4 fr pointer',
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
    const date = moment(selectedDate.value);
    let response = await fetch(
      `/api/getBookedSlots?date=${date.format('YYYY-MM-DD')}`
    );
    if (response.ok) {
      let json = await response.json();
      console.log('==> json: ', json);
      // TODO show success message
    } else {
      // console.log('==> failed to get booked slots');
      // TODO show error message
    }

    // if selected date is today
    if (date.isSame(today, 'day')) {
      if (moment().hour() < 9) {
        addTimeslots(date, false);
        timeOptions = timeOptions;
      }
    } else {
      addTimeslots(date, true);
      addTimeslots(date, false);
      timeOptions = timeOptions;
    }
    // console.log('==> timeOptions: ', timeOptions);
  }

  function addTimeslots(date, isMorning) {
    const morning = isEnglish ? 'Morning' : '早上';
    const afternoon = isEnglish ? 'Afternoon' : '下午';

    let fromTime = moment(date).hour(isMorning ? 9 : 16);
    fromTime.minute(isMorning ? 0 : 30);
    fromTime.second(0);
    let toTime = moment(date).hour(isMorning ? 11 : 19);
    toTime.minute(0);
    toTime.second(0);
    while (fromTime <= toTime) {
      timeOptions.push({
        value: fromTime.toDate(),
        label: formatTime(fromTime),
        group: isMorning ? morning : afternoon,
      });
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
    const time = moment(selectedTime.value);
    const date = moment(selectedDate.value);
    const data = {
      fullName,
      date: date.format('YYYY-MM-DD'),
      time: time.format('HH:mm:ss'),
      period: time.hour() < 11 ? 'morning' : 'afternoon',
    };
    console.log('==> data: ', data);
    debugger;

    let response = await fetch(`/api/submitIvcAppointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      let json = await response.json();
      console.log('==> json: ', json);
      clearFields();
      // TODO show success message
    } else {
      console.log('==> failed to book IVC appointment');
      // TODO show error message
    }
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
    --itemHoverBG: rgb(232, 253, 245);
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
  <title>IVC</title>
</svelte:head>

<h1 class={styles.title}>{$_('page.ivc.title')}</h1>
<form class={styles.form}>
  <div class={styles.formGroup}>
    <input bind:value={fullName} placeholder={namePlaceholder} />
  </div>
  <div class={styles.formGroup}>
    <!-- <label class={styles.label} for="date">{$_('field.date')}</label> -->
    <Select
      id="date"
      placeholder={datePlaceholder}
      items={dateOptions}
      bind:selectedValue={selectedDate}
      on:select={updateTimeslots} />
  </div>
  <div class={styles.formGroup}>
    <!-- <label class={styles.label} for="time">{$_('field.time')}</label> -->
    <Select
      id="time"
      placeholder={timePlaceholder}
      items={timeOptions}
      {groupBy}
      bind:selectedValue={selectedTime} />
  </div>

  <button type="submit" class={styles.submitButton} on:click={onSubmit}>
    Submit
  </button>
</form>
