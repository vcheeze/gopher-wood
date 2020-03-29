import global from './number';

export async function get(req, res, next) {
  // TODO add logic to fetch number from db

  res.end(JSON.stringify({ num: global.number }));
}
