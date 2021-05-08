import pool from '../../db';
import {
  createSuccessResponse,
  createErrorResponse,
} from '../../utils/responses';

export async function post(req, res, next) {
  const {date, time} = req.body;
  const query = `
  DELETE FROM gopher_wood.timeslots
  WHERE date = '${date}' AND time = '${time}'
  `;
  
  let conn;

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