import i18n from 'sveltekit-i18n';
import lang from './lang.json';

import type { Config } from 'sveltekit-i18n';

const config: Config = {
  initLocale: 'en',
  translations: {
    en: { lang },
    'zh-Hant': { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('./en/common.json')).default,
    },
    {
      locale: 'en',
      key: 'about',
      routes: ['/about'],
      loader: async () => (await import('./en/about.json')).default,
    },
    {
      locale: 'en',
      key: 'contact',
      routes: ['/contact'],
      loader: async () => (await import('./en/contact.json')).default,
    },
    {
      locale: 'en',
      key: 'home',
      routes: ['/'],
      loader: async () => (await import('./en/home.json')).default,
    },
    {
      locale: 'en',
      key: 'ivc',
      routes: ['/ivc'],
      loader: async () => (await import('./en/ivc.json')).default,
    },
    {
      locale: 'zh-Hant',
      key: 'common',
      loader: async () => (await import('./zh/common.json')).default,
    },
    {
      locale: 'zh-Hant',
      key: 'about',
      routes: ['/about'],
      loader: async () => (await import('./zh/about.json')).default,
    },
    {
      locale: 'zh-Hant',
      key: 'contact',
      routes: ['/contact'],
      loader: async () => (await import('./zh/contact.json')).default,
    },
    {
      locale: 'zh-Hant',
      key: 'home',
      routes: ['/'],
      loader: async () => (await import('./zh/home.json')).default,
    },
    {
      locale: 'zh-Hant',
      key: 'ivc',
      routes: ['/ivc'],
      loader: async () => (await import('./zh/ivc.json')).default,
    },
  ],
};

export const { t, locale, locales, setLocale, loading, loadTranslations } = new i18n(config);
