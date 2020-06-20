<script>
  import { _ } from 'svelte-i18n';
  import DatePicker from '../components/DatePicker.svelte';
  import TimePicker from '../components/TimePicker.svelte';

  let fullName = '',
    date = '',
    time = '';

  const styles = {
    formgroup: 'mt2 mb2',
    field: 'mt1 mb1 pt2 pb2',
    submitButton: 'ph4 pv2 bg-transparent ba pointer',
  };

  async function handleSubmit() {
    console.log('==> submit!');
    const payload = { fullName, date, time };
    const response = await fetch('/api/submitIvcAppointment', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log('==> data: ', data);
  }
</script>

<svelte:head>
  <title>Make an Appointment</title>
</svelte:head>

<h1>{$_('page.ivc.title')}</h1>

<p>{$_('page.ivc.description')}</p>

<form>
  <div class={styles.formgroup}>
    <label>{$_('form.ivc.fullName.label')}</label>
    <br />
    <input
      class={styles.field}
      type="text"
      placeholder={$_('form.ivc.fullName.placeholder')}
      bind:value={fullName} />
  </div>
  <div class={styles.formgroup}>
    <label>{$_('form.ivc.date.label')}</label>
    <br />
    <!-- <input class={styles.field} type="date" bind:value={date} /> -->
    <DatePicker />
  </div>
  <div class={styles.formgroup}>
    <label>{$_('form.ivc.time.label')}</label>
    <br />
    <!-- <input class={styles.field} type="time" bind:value={time} /> -->
    <TimePicker />
  </div>
  <button class={styles.submitButton} type="button" on:click={handleSubmit}>
    Submit
  </button>
</form>
