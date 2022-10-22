import pool from '../../db';
import {
  createSuccessResponse,
  createErrorResponse,
} from '../../utils/responses';

export async function get(req, res, next) {
  let conn;

  const query = `
    SELECT q_value FROM gopher_wood.queue_number
    WHERE q_name = 'currentNum'
  `;

  try {
    conn = await pool.getConnection(); 
    const rows = await conn.query(query);
    return createSuccessResponse(res, rows[0], 'retrieved current queue number');
  } catch (err) {
    return createErrorResponse(res, 'error retrieving current queue number');
  } finally {
    if (conn) conn.end();
  }
}
