import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import * as sapper from '@sapper/server';
import { init } from 'svelte-i18n';

init({
	fallbackLocale: 'en',
	initialLocale: 'zh-Hant',
});

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka();

app.use(bodyParser.json());

app.use(
	helmet(),
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
);

app.listen(PORT, err => {
	if (err) console.log('error', err);
});
