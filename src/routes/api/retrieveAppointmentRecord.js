import pool from '../../db';
let conn;
let query;

export async function post(req, res, next) {
  const {fullName, dateFrom, dateTo} = req.body;
  query = `SELECT * FROM gopher_wood.timeslots `;
  if (fullName !== 0){
    query += `WHERE full_name = '${fullName}'`;
  }
  else if(dateFrom !== 0){
    query += `WHERE date BETWEEN '${dateFrom}' AND '${dateTo}'`;
  }

  try {
    conn = await pool.getConnection(); 
    const rows = await conn.query(query);
    return (
      res.statusCode = 202, 
      res.end(JSON.stringify({ success: true, message: 'retrieved booked timeslots ', data: rows }))
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