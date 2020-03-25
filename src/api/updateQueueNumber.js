import global from './number';

const updateQueueNumber = (req, res) => {
  // console.log('==> Setting Queue number...');
  // console.log(req.query.v1);
  global.number = req.query.v1;
  // TODO add logic here to store number in db, etc.
  
  res.end('Set Queue Number!');
};

export default updateQueueNumber;