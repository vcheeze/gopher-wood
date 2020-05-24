import { db } from '../../firebase';

export async function get(req, res, next) {
  const { s1, id, v1 } = req.query;
  // check s1 and id
  if (s1 === 'gopherwoodclinic' && id === 'g0pherw00dc1inic') {
    const queueNumRef = db.ref('queue-number');
    queueNumRef.update({ 'currentNum': +v1 });
    
    return (res.statusCode = 200, res.end('Set Queue Number!'));
  } else {
    return (res.statusCode = 403, res.end('Fail!'));
  }
}
