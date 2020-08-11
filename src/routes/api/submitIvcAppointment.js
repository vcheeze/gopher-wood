import pool from '../../db';

export async function post(req, res, next) {
  // console.log('==> req: ', req.body);
  const { fullName, date, time, period } = req.body;
  let conn;

  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      `INSERT INTO gopher_wood.timeslots(full_name, date, time, is_booked, period) VALUES('${fullName}', '${date}', '${time}', true, '${period}')`
    );
    // console.log('==> result: ', result);
    return (
      res.statusCode = 201,
      res.end(JSON.stringify({ success: true, message: 'created IVC appointment', data: result }))
    );
  } catch (err) {
    // console.log('==> err: ', err); //ER_DUP_ENTRY
    return (
      res.statusCode = err.code === 'ER_DUP_ENTRY' ? 409 : 500,
      res.end(JSON.stringify({ success: false, message: 'error while creating IVC appointment', data: err.code }))
    );
  } finally {
    if (conn) conn.end();
  }
}
