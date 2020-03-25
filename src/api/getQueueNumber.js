import global from './number';

const getQueueNumber = (req, res) => {
  // console.log('==> Getting Queue number...');
  // TODO add logic here to store number in db, etc.
  // console.log(global.number);
  res.end(JSON.stringify({num:global.number}));
};

export default getQueueNumber;