var db = require('./server/db')
  , app = require('./server/rest')
  , bluebird = require('bluebird');

bluebird.resolve()
.then(
  app.start
)
.catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1);
});
