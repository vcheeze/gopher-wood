import { RequestHandler } from './$types';

import pool from '../../db';
import {
  createSuccessResponse,
  createErrorResponse,
} from '../../utils/responses';
let conn;

export async function POST({ request }: RequestHandler) {
  const {date, time} = req.body;
  const query = `
    DELETE FROM gopher_wood.timeslots
    WHERE date = '${date}' AND time = '${time}'
  `;

  try {
    conn = await pool.getConnection(); 
    const rows = await conn.query(query);
    return createSuccessResponse(res, rows, 'cancelled appointment');
  } catch (err) {
    return createErrorResponse(res, 'error cancelling appointment');
  } finally {
    if (conn) conn.end();
  }
}