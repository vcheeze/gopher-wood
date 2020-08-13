import pool from '../../db';

export async function get(req, res, next) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`SELECT * FROM gopher_wood.timeslots LIMIT 5`); 
    console.log("done query");
    return (
      res.statusCode = 202, 
      res.end(JSON.stringify({ success: true, message: 'retrieved booked timeslots', data: rows }))
    );
  } catch (err) {
    return (
      res.statusCode = 500, 
      res.end(JSON.stringify({ success: false, message: 'failed to retrieve booked slots', data: err.code }))
    );
  } finally {
    if (conn) conn.end();
  }
}
