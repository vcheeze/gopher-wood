import pool from '../../db';
import {
  createSuccessResponse,
  createErrorResponse,
} from '../../utils/responses';

export async function post(req, res, next) {
  // const {fullName, dateFrom, dateTo} = req.body;

  let query = `SELECT * FROM gopher_wood.timeslots`;
  // if (fullName !== 0){
  //   query += ` WHERE full_name = '${fullName}'`;
  // }
  // else if(dateFrom !== 0){
  //   query += ` WHERE date BETWEEN '${dateFrom}' AND '${dateTo}'`;
  // }
  
  let conn;

  try {
    conn = await pool.getConnection(); 
    const rows = await conn.query(query);
    return createSuccessResponse(res, rows, 'retrieve appointment records', 202);
  } catch (err) {
    return createErrorResponse(res, 'error retrieving appointment records');
  } finally {
    if (conn) conn.end();
  }
}