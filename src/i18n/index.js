import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('zh-Hant', () => import('./zh-Hant.json'));

init({
	fallbackLocale: 'en',
	initialLocale: 'zh-Hant',
});
