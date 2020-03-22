const getQueueNumber = (req, res) => {
  console.log('==> Getting Queue number...');
  // TODO add logic here to store number in db, etc.
  res.end('Got Queue Number!');
};

export default getQueueNumber;