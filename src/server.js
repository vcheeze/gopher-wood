import sirv from 'sirv';
import polka from 'polka';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import SSE from 'express-sse';
import * as sapper from '@sapper/server';

import { i18nMiddleware } from './i18n';
import pool from './db';
import {
  createSuccessResponse,
  createErrorResponse,
} from './utils/responses';

// SSE
const sse = new SSE(0);

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka();

// streaming route for SSE on FE
app.get('/queueNumber', sse.init);

// route for updating queue number and sending SSE
app.get('/api/updateQueueNumber', async (req, res) => {
	const { s1, id, v1 } = req.query;

	// check s1 and id
  if (s1 === 'gopherwoodclinic' && id === 'g0pherw00dc1inic') {
		// send SSE event
		sse.send(+v1);

		// update DB with latest queue number
		const query = `
			UPDATE gopher_wood.queue_number
			SET q_value = '${+v1}'
			WHERE q_name = 'currentNum'
		`;
		let conn;
		try {
			conn = await pool.getConnection(); 
			const rows = await conn.query(query);
			return createSuccessResponse(res, rows, 'updated queue number');
		} catch (err) {
			return createErrorResponse(res, 'error updating queue number');
		} finally {
			if (conn) conn.end();
		}
	}
})

app
	.use(bodyParser.json())
	.use(
		helmet(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		i18nMiddleware(),
		sapper.middleware(),
	);

app.listen(PORT, err => {
	if (err) console.log('error', err);
});
