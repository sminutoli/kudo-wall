var mongoose = require('mongoose')
  , config = require('../config');

mongoose.Promise = require('bluebird');

var options = {
    useMongoClient: true,
    bufferMaxEntries: 0
  };

module.exports.start = function(){
  return mongoose.connect(config.db.mongodb, options).then(() => {
      console.log('Database connection successful');
  })
}
