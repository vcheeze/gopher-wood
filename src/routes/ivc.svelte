<script>
  import { locale, _ } from 'svelte-i18n';
  import Select from 'svelte-select';
  import dayjs from 'dayjs';
  import { Spinner, Tabs, Dialog } from '../components';

  let showSpinner = false;
  let disableSubmitBtn = true,
    disableSearchBtn = true;
  let showDialog = false,
    dialogStatus = 'regular',
    dialogTitle = '',
    dialogBody = '';
  const tabItems = [
    { id: 'newAppointment', label: 'ivcOptions.newAppointment' },
    { id: 'modifyAppointment', label: 'ivcOptions.modifyAppointment' },
  ];
  const editTypes = ['update', 'cancel'];
  let selectedEditType = 'update';
  let selectedTab = tabItems[0].id;
  // in modify appointment tab, if user's appointments are successfully retreived
  // show the option dropdown fields
  let prevAppointmentsFetched = false;
  let hidePrevAppointments = true;
  let hideNewOptions = true;
  const onTabClick = tabId => {
    return () => {
      selectedTab = tabId;
      updateFormState();
    };
  };
  const today = dayjs();
  let dateOptions = [];
  let timeOptions = [];
  let prevAppointmentOptions = []; // previous appointments
  let fullName = '',
    telephone = '',
    selectedDate = undefined,
    selectedTime = undefined,
    selectedPrevAppointment = undefined;
  $: hideSubmitButton = selectedTab === 'modifyAppointment';

  // i18n text
  $: isEnglish = $locale === 'en';
  $: namePlaceholder = isEnglish ? 'Enter your full name' : '姓名';
  $: telephonePlaceholder = isEnglish ? 'Enter your phone number' : '手機號碼';
  $: prevAppointmentPlaceholder = isEnglish
    ? 'Select previous appointment'
    : '選擇時段';
  $: datePlaceholder = isEnglish ? 'Select a date' : '選擇日期';
  $: timePlaceholder = isEnglish ? 'Select a time' : '選擇時間';
  $: successTitle = isEnglish ? 'Your appointment is booked!' : '預約成功！';
  $: successText = isEnglish ? 'Appointment details' : '預約時段';
  $: errorTitle = isEnglish ? 'Appointment failed :(' : '預約失敗';
  $: errorText = isEnglish
    ? 'Oops, something went wrong. Please try again.'
    : '發生錯誤，麻煩您再試一次！';

  // styles
  const styles = {
    title: 'tc',
    form: 'mv2 mh8-ns',
    formGroup: 'pa2 themed',
    radioGroup: 'radioGroup pa2 themed flex items-center',
    radioButton: 'w-50',
    radioInput: 'v-mid mr1',
    label: 'f5',
    action: 'w-100',
    buttonContainer: 'pa2 themed tr',
    button: 'primary',
  };

  // initialize date options
  initDateOptions();
  // set initial form state
  updateFormState();

  // functions
  /**
   * Populate date options.
   * Only Tuesdays, Fridays, and Saturdays are viable.
   */
  function initDateOptions() {
    let fromDate = dayjs().hour() < 9 ? today : today.add(1, 'days');
    const toDate = today.add(14, 'days');
    while (fromDate <= toDate) {
      if (fromDate.day() === 2 || fromDate.day() === 5 || fromDate.day() === 6)
        dateOptions.push({
          value: fromDate.toDate(),
          label: formatDate(fromDate),
        });
      fromDate = fromDate.add(1, 'days'); // increment date
    }
  }

  function formatDate(date, formatString = 'MM/DD/YYYY') {
    // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    return date.format(formatString);
  }

  function formatTime(time, formatString = 'HH:mm A') {
    return time.format(formatString);
  }

  async function updateTimeslots() {
    showSpinner = true;

    let bookedSlots = [];
    const date = dayjs(selectedDate.value);
    const now = dayjs();
    let response = await fetch(
      `/api/getBookedSlots?date=${date.format('YYYY-MM-DD')}`
    );
    if (response.ok) {
      const { data } = await response.json();
      bookedSlots = data;
    } else {
      // TODO show error message
    }

    const tomorrow = today.add(1, 'days');
    let newOptions = [];

    if (date.isSame(today, 'day') && now.hour() < 9) {
      // if selected date is today and it's before 9am
      newOptions = addTimeslots(date, false, bookedSlots);
    } else if (date.isSame(tomorrow, 'day')) {
      // if selected date is tomorrow
      newOptions = [
        ...(now.hour() < 17 ? addTimeslots(date, true, bookedSlots) : []),
        ...addTimeslots(date, false, bookedSlots),
      ];
    } else {
      newOptions = [
        ...addTimeslots(date, true, bookedSlots),
        ...addTimeslots(date, false, bookedSlots),
      ];
    }
    selectedTime = undefined; // clear time selection
    timeOptions = newOptions; // assign statement to make Svelte reload
    showSpinner = false;
  }

  function addTimeslots(date, isMorning, bookedSlots) {
    const slotsForPeriod = bookedSlots.filter(slot =>
      isMorning ? slot.period === 'morning' : slot.period === 'afternoon'
    );
    const morning = isEnglish ? 'Morning' : '早上';
    const afternoon = isEnglish ? 'Afternoon' : '下午';

    let options = [];
    let fromTime = dayjs(date)
      .hour(isMorning ? 9 : 16)
      .minute(isMorning ? 0 : 30)
      .second(0);
    let toTime = dayjs(date)
      .hour(isMorning ? 11 : 19)
      .minute(0)
      .second(0);

    while (fromTime <= toTime) {
      if (
        slotsForPeriod.length < 1 ||
        fromTime.format('HH:mm:ss') !== slotsForPeriod[0].time
      ) {
        options.push({
          value: fromTime.toDate(),
          label: formatTime(fromTime),
          group: isMorning ? morning : afternoon,
        });
      } else {
        slotsForPeriod.shift(); // remove first slot from booked slots
      }

      fromTime = fromTime.add(5, 'minutes');
    }

    return options;
  }

  function groupBy(item) {
    return item.group;
  }

  function clearFields() {
    if (selectedTab === 'newAppointment') {
      fullName = '';
      telephone = '';
    } else {
      selectedPrevAppointment = undefined;
    }
    selectedDate = undefined;
    selectedTime = undefined;
  }

  function clearTimeOptions() {
    selectedTime = undefined;
    timeOptions = [];
    updateFormState();
  }

  function updateFieldsState() {
    console.log('==> selectedTab: ', selectedTab);
    hidePrevAppointments =
      !prevAppointmentsFetched || selectedTab === 'newAppointment';
    hideNewOptions =
      !prevAppointmentsFetched ||
      selectedEditType === 'cancel' ||
      selectedTab === 'newAppointment';
  }

  function updateButtonsState() {
    if (selectedTab === 'newAppointment') {
      disableSubmitBtn =
        !fullName || !telephone || !selectedDate || !selectedTime;
    } else {
      // search button disable logic
      disableSearchBtn = !fullName || !telephone;
      if (selectedEditType === 'update') {
        disableSubmitBtn =
          !fullName ||
          !telephone ||
          !selectedPrevAppointment ||
          !selectedDate ||
          !selectedTime;
      } else {
        disableSubmitBtn = !fullName || !telephone || !selectedPrevAppointment;
      }
    }
  }

  function updateFormState() {
    updateFieldsState();
    updateButtonsState();
  }

  async function onSubmit(e) {
    e.preventDefault();
    showSpinner = true;

    let data = {},
      response,
      url = '';

    if (selectedTab === 'newAppointment') {
      url = '/api/submitIvcAppointment';
      const time = dayjs(selectedTime.value);
      const date = dayjs(selectedDate.value);
      data = {
        fullName,
        telephone,
        date: date.format('YYYY-MM-DD'),
        time: time.format('HH:mm:ss'),
        period: time.hour() < 11 ? 'morning' : 'afternoon',
      };
    } else {
      const prevAppointment = dayjs(selectedPrevAppointment.value);
      const prevDate = formatDate(prevAppointment, 'YYYY-MM-DD');
      const prevTime = prevAppointment.format('HH:mm:ss');
      if (selectedEditType === 'update') {
        url = '/api/updateAppointment';
        const time = dayjs(selectedTime.value);
        const date = dayjs(selectedDate.value);
        data = {
          oldDate: prevDate,
          oldTime: prevTime,
          newDate: formatDate(date, 'YYYY-MM-DD'),
          newTime: time.format('HH:mm:ss'),
          period: time.hour() < 11 ? 'morning' : 'afternoon',
        };
      } else {
        // selectedEditType === 'cancel'
        url = '/api/cancelAppointment';
        data = {
          date: prevDate,
          time: prevTime,
        };
      }
    }

    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      let json = await response.json();
      dialogStatus = 'success';
      dialogTitle = successTitle;
      dialogBody = successText;
    } else {
      dialogStatus = 'error';
      dialogTitle = errorTitle;
      dialogBody = errorText;
    }

    showDialog = true;
    showSpinner = false;
  }

  async function onSearch(e) {
    e.preventDefault();
    showSpinner = true;

    const toDate = today.add(15, 'days');
    let request = {
      fullName,
      telephone,
      dateFrom: today.toDate(),
      dateTo: toDate.toDate(),
    };
    let response = await fetch('/api/getUserAppointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (response.ok) {
      hideSubmitButton = false;
      let json = await response.json();
      prevAppointmentOptions = json.data.map(d => {
        const splitTime = d.time.split(':');
        const date = dayjs(new Date(d.date))
          .hour(splitTime[0])
          .minute(splitTime[1]);
        return {
          value: date.toDate(),
          label: formatDate(date, 'MM/DD/YYYY HH:mm A'),
        };
      });
      prevAppointmentsFetched = true;
      updateFormState();
    } else {
      dialogStatus = 'error';
      dialogTitle = errorTitle;
      dialogBody = errorText;
      showDialog = true;
    }

    showSpinner = false;
  }

  function onAcknowledge() {
    clearFields();
    showDialog = false;
  }
</script>

<style>
  .themed {
    --borderRadius: 0;
    --borderFocusColor: #333333;
    --itemHoverBG: #e8fdf5;
  }

  .themed .selectContainer > input::placeholder,
  .themed .selectContainer > input::-webkit-input-placeholder,
  .themed .selectContainer > input:-ms-input-placeholder,
  .themed .selectContainer > input:-moz-placeholder,
  .themed .selectContainer > input::-moz-placeholder {
    font-family: Taipei Sans, huninn, Roboto, -apple-system, Segoe UI, Ubuntu,
      Fira Sans, Helvetica Neue, sans-serif;
  }

  .radioGroup {
    height: 42px;
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
  <!-- <p slot="body">{dialogBody}</p> -->
  <div class={styles.action} slot="action">
    <button class={styles.button} on:click={onAcknowledge}>Okay!</button>
  </div>
</Dialog>

<h1 class={styles.title}>{$_('page.ivc.title')}</h1>
<Tabs items={tabItems} bind:selectedTab {onTabClick} />
<form class={styles.form}>
  <div class={styles.radioGroup} class:dn={selectedTab !== 'modifyAppointment'}>
    {#each editTypes as editType}
      <label class={styles.radioButton}>
        <input
          type="radio"
          class={styles.radioInput}
          bind:group={selectedEditType}
          on:change={updateFormState}
          value={editType} />
        {$_(`editOptions.${editType}`)}
      </label>
    {/each}
  </div>
  <div class={styles.formGroup}>
    <input
      bind:value={fullName}
      placeholder={namePlaceholder}
      on:input={updateFormState} />
  </div>
  <div class={styles.formGroup}>
    <input
      bind:value={telephone}
      type="tel"
      placeholder={telephonePlaceholder}
      on:input={updateFormState}
      inputMode="tel" />
  </div>
  <div
    class={styles.buttonContainer}
    class:dn={selectedTab === 'newAppointment'}>
    <button
      class={styles.button}
      class:disabled={disableSearchBtn}
      disabled={disableSearchBtn}
      on:click={onSearch}>
      {$_('button.search')}
    </button>
  </div>
  <div class={styles.formGroup} class:dn={hidePrevAppointments}>
    <span>{$_('field.prevAppointment')}</span>
  </div>
  <div class={styles.formGroup} class:dn={hidePrevAppointments}>
    <Select
      placeholder={prevAppointmentPlaceholder}
      items={prevAppointmentOptions}
      isSearchable={false}
      bind:selectedValue={selectedPrevAppointment}
      on:select={updateFormState}
      on:clear={updateFormState} />
  </div>
  <div class={styles.formGroup} class:dn={hideNewOptions}>
    <span>{$_('field.newOptions')}</span>
  </div>
  <div
    class={styles.formGroup}
    class:dn={selectedTab === 'modifyAppointment' && hideNewOptions}>
    <Select
      placeholder={datePlaceholder}
      items={dateOptions}
      isSearchable={false}
      bind:selectedValue={selectedDate}
      on:select={updateTimeslots}
      on:clear={clearTimeOptions} />
  </div>
  <div
    class={styles.formGroup}
    class:dn={selectedTab === 'modifyAppointment' && hideNewOptions}>
    <Select
      placeholder={timePlaceholder}
      items={timeOptions}
      {groupBy}
      isSearchable={false}
      bind:selectedValue={selectedTime}
      on:select={updateFormState}
      on:clear={updateFormState} />
  </div>
  <div class={styles.buttonContainer}>
    <button
      type="submit"
      class={styles.button}
      class:disabled={disableSubmitBtn}
      disabled={disableSubmitBtn}
      hidden={hideSubmitButton}
      on:click={onSubmit}>
      {$_('button.submit')}
    </button>
  </div>
</form>
