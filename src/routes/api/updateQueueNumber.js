import { auth, db } from '../../firebase';

export async function get(req, res, next) {
  const { s1, id, v1 } = req.query;
  // check s1 and id
  if (s1 === 'gopherwoodclinic' && id === 'g0pherw00dc1inic') {
    auth.signInAnonymously().catch(function(err) {
      var errCode = err.code;
      var errorMessage = err.message;
    });
    auth.onAuthStateChanged(function(user) {
      if (user) {
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
      } else {
        // user is signed out
      }
    });
    const queueNumRef = db.ref('queue-number');
    queueNumRef.update({ 'currentNum': +v1 });
    
    return (res.statusCode = 200, res.end('Set Queue Number!'));
  } else {
    return (res.statusCode = 403, res.end('Fail!'));
  }
}
