import pool from '../../db';
import {
  createSuccessResponse,
  createErrorResponse,
} from '../../utils/responses';
let conn;

export async function post(req, res, next) {
  const {fullName, telephone, dateFrom, dateTo} = req.body;
  const query = `
    SELECT * FROM gopher_wood.timeslots
    WHERE full_name = '${fullName}' AND telephone = '${telephone}' AND date BETWEEN '${dateFrom}' AND '${dateTo}'
  `;

  try {
    conn = await pool.getConnection(); 
    const rows = await conn.query(query);
    return createSuccessResponse(res, rows, 'retrieved user\'s appointments');
  } catch (err) {
    return createErrorResponse(res, 'error retrieving user\'s appointments');
  } finally {
    if (conn) conn.end();
  }
}