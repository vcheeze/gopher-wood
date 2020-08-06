<script>
  import { onMount } from 'svelte';
  import { locale, _ } from 'svelte-i18n';
  import Select from 'svelte-select';
  import moment from 'moment';

  const today = moment();
  let dateOptions = [];
  let timeOptions = [];
  let selectedDate = undefined;
  const isEnglish = locale === 'en';
  const datePlaceholder = isEnglish ? 'Select a date' : '選擇日期';
  const timePlaceholder = isEnglish ? 'Select a time' : '選擇時間';

  const styles = {
    title: 'tc',
    form: 'mv2 mh7-ns tc',
    formGroup: 'pv2 ph7-ns themed',
    label: 'f5',
    submitButton: 'bg-white ma2 pv2 ph4 pointer',
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

  async function updateTimeslots(date) {
    selectedDate = moment(date.detail.value);
    console.log('==> selectedDate: ', selectedDate);
    let response = await fetch(
      `/api/getBookedSlots?date=${formatDate(selectedDate)}`
    );
    if (response.ok) {
      let json = await response.json();
      console.log('==> json: ', json);
    } else {
      console.log('==> failed to get booked slots');
    }

    // if selected date is today
    if (selectedDate.isSame(today, 'day')) {
      if (moment().hour() < 9) {
        addTimeslots(selectedDate, false);
        timeOptions = timeOptions;
      }
    } else {
      addTimeslots(selectedDate, true);
      addTimeslots(selectedDate, false);
      timeOptions = timeOptions;
    }
    console.log('==> timeOptions: ', timeOptions);
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

  function onSubmit(e) {
    e.preventDefault();
    console.log('==> submit!');
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
    --placeholderColor: #333;
  }

  button:hover {
  }
</style>

<svelte:head>
  <title>IVC</title>
</svelte:head>

<h1 class={styles.title}>{$_('page.ivc.title')}</h1>
<form class={styles.form}>
  <div class={styles.formGroup}>
    <label class={styles.label} for="date">{$_('field.date')}</label>
    <Select
      id="date"
      placeholder={datePlaceholder}
      items={dateOptions}
      on:select={updateTimeslots} />
  </div>
  <div class={styles.formGroup}>
    <label class={styles.label} for="time">{$_('field.time')}</label>
    <Select
      id="time"
      placeholder={timePlaceholder}
      items={timeOptions}
      {groupBy} />
  </div>
  <button type="submit" class={styles.submitButton} on:click={onSubmit}>
    {$_('button.submit')}
  </button>
</form>
