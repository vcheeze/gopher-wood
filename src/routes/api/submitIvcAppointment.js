import { nameValidator } from '../../utils/validators';
import {
  createSuccessResponse,
  createFailedResponse,
  createErrorResponse,
} from '../../utils/responses';
import pool from '../../db';

export async function post(req, res, next) {
  // console.log('==> req: ', req.body);
  const { fullName, telephone, date, time, period } = req.body;
  // perform input validations
  if (!nameValidator(fullName)) {
    return createFailedResponse(res, {}, 'invalid input: fullName', 409);
  }
  // TODO add input validations for date, time, and period

  let conn;

  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      `INSERT INTO gopher_wood.timeslots(full_name, telephone, date, time, is_booked, period) VALUES('${fullName}', '${telephone}', '${date}', '${time}', true, '${period}')`
    );
    // console.log('==> result: ', result);
    return createSuccessResponse(res, result, 'created IVC appointment', 201);
  } catch (err) {
    // console.log('==> err: ', err); //ER_DUP_ENTRY
    const isServerError = err.code !== 'ER_DUP_ENTRY';
    if (isServerError) {
      return createFailedResponse(
        res,
        err.code,
        'error while creating IVC appointment',
        409
      );
    } else {
      return createErrorResponse(res, 'error while creating IVC appointment');
    }
  } finally {
    if (conn) conn.end();
  }
}
