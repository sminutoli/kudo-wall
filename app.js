
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , kudos = require('./routes/kudos')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');
  
  
mongoose.connect(`mongodb://${process.env.IP}/kudos`, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use('/', kudos.list);
app.post('/', kudos.add);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
