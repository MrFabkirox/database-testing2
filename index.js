const log = console.log;
const restify = require('restify');
const _ = require('mongodb').MongoClient;
const mongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://localhost:27017/test';

const server = restify.createServer();
server.use(restify.plugins.queryParser());

const getErrorResponse = (error) => {
  return {
    result: false,
    error
  };
};

const getSuccessResponse = (data) => {
  return {
    result: false,
    data
  };
};

server.get('/api/data', (req, res) => {
  try {
    const zipCode = req.params.zip;
    if (zipCode === '' || zipCode.length < 5) {
      res.send(getErrorResponse('Zip is in the wrong format.'));
      return;
    }
    mongoClient.connect(MONGO_URL, (err, db) => {
      if (err) {
        res.send(getErrorResponse("error somewhere:", err));
        return;
      }
      const collection = db.collection('restaurants');
      collection.find({ "address.zipcode": zipCode }).toArray((err, docs) => {
        if (err) {
          res.send(getErrorResponse(err));
        }
        else {
          res.send({ results: docs });
        }
      })
    })
  }
  catch (err) {
    res.send(getErrorResponse("Unknown Error: " + err));
  }
});
server.get('/api/ping', (req, res) => {
  res.send({ result: true, data: 'pong' })
})

module.exports = {
  getErrorResponse,
  getSuccessResponse
}

if (require.main === module) {
  server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url)
  });
}

