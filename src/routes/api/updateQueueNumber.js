import global from './number';

export async function get(req, res, next) {
  // check s1 and id
  if (req.query.s1 === 'gopherwoodclinic' && req.query.id === 'g0pherw00dc1inic'){
    global.number = req.query.v1;
    res.end('Set Queue Number!');
  } else {
    res.end('Fail');
  }
}
