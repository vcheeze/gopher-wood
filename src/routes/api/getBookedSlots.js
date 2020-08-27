import pool from '../../db';

export async function get(req, res, next) {
  const { date, var2 } = req.query;
  console.log("date", date);
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`SELECT * FROM gopher_wood.timeslots WHERE date = '${date}'`);
    // console.log('==> rows: ', rows);
    return (
      res.statusCode = 200, 
      res.end(JSON.stringify({ success: true, message: 'retrieved booked timeslots', data: rows }))
    );
  } catch (err) {
    // console.log('==> err: ', err);
    return (
      res.statusCode = 500, 
      res.end(JSON.stringify({ success: false, message: 'failed to retrieve booked slots', data: err.code }))
    );
  } finally {
    if (conn) conn.end();
  }
}
