import global from '../../api/number';

export async function get(req, res, next) {
  global.number = req.query.v1;
  // TODO add logic here to store number in db, etc.

  res.end('Set Queue Number!');
}
