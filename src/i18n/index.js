import {
	register,
	init,
	getLocaleFromNavigator,
	locale as $locale,
} from 'svelte-i18n';

import { setCookie, getCookie } from '../utils/cookies';

const INIT_OPTIONS = {
	fallbackLocale: 'en',
	initialLocale: 'zh-Hant',
	loadingDelay: 200,
};

let currentLocale = null;

register('en', () => import('./en.json'));
register('zh-Hant', () => import('./zh-Hant.json'));

$locale.subscribe(value => {
	if (value === null) return;

	currentLocale = value;

	// if running in client, save language prefence in a cookie
	if (typeof window !== 'undefined') {
		setCookie('locale', value);
	}
});

export function startClient() {
	init({
		...INIT_OPTIONS,
		initialLocale: getCookie('locale') || getLocaleFromNavigator(),
	});
}

// init only for routes (urls with no extensions such as .js, .css, etc) and for service worker
const DOCUMENT_REGEX = /(^([^.?#@]+)?([?#](.+)?)?|service-worker.*?\.html)$/;

export function i18nMiddleware() {
	// initialLocale will be set by the middleware
	init(INIT_OPTIONS);

	return (req, res, next) => {
		const isDocument = DOCUMENT_REGEX.test(req.originalUrl);
		// get the initial locale only for a document request
		if (!isDocument) {
			next();
			return;
		}

		let locale = getCookie('locale', req.headers.cookie);

		// no cookie, let's get the first accepted language
		if (locale == null) {
			if (req.headers['accept-language']) {
				const headerLang = req.headers['accept-language'].split(',')[0].trim();
				if (headerLang.length > 1) {
					locale = headerLang;
				}
			} else {
				locale = INIT_OPTIONS.initialLocale || INIT_OPTIONS.fallbackLocale;
			}
		}

		if (locale != null && locale !== currentLocale) {
			$locale.set(locale);
		}

		next();
	};
}
