import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

import { init } from 'svelte-i18n';
import { getQueueNumber, updateQueueNumber } from './api';

init({
	fallbackLocale: 'en',
	initialLocale: 'zh-Hant',
});

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka();

app.get('/api/get-number', getQueueNumber);
app.get('/api/update-number', updateQueueNumber);

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
);

app.listen(PORT, err => {
	if (err) console.log('error', err);
});
