import pool from '../../db';
import {
  createSuccessResponse,
  createErrorResponse,
} from '../../utils/responses';

export async function post(req, res, next) {
  const {oldDate, oldTime, newDate, newTime, period} = req.body;
  const query = `
    UPDATE gopher_wood.timeslots
    SET date = '${newDate}', time = '${newTime}', period = '${period}'
    WHERE date = '${oldDate}' AND time = '${oldTime}'
  `;

  let conn;
  try {
    conn = await pool.getConnection(); 
    const rows = await conn.query(query);
    return createSuccessResponse(res, rows, 'updated appointment');
  } catch (err) {
    return createErrorResponse(res, 'error updating appointment');
  } finally {
    if (conn) conn.end();
  }
}
