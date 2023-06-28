<script lang="ts">
	import FullCalendar from 'svelte-fullcalendar';
	import zhLocale from '@fullcalendar/core/locales/zh-tw';
	import timegridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import { locale } from '$lib/translations';

	$: options = {
		locales: [zhLocale],
		locale: $locale === 'en' ? 'en' : 'zh-tw',
		initialView: 'timeGridWeek',
		plugins: [timegridPlugin, interactionPlugin],
		allDaySlot: false,
		slotMinTime: '09:00:00',
		slotMaxTime: '19:00:00',
		hiddenDays: [0],
		dateClick: (...args) => console.log('args :>> ', args)
		// slotLaneClassNames: (args) => {
		//   if (args.date?.getHours())
		// }
	};
</script>

<FullCalendar {options} />
