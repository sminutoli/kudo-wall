var express = require('express')
  , kudos = require('./routes/kudos')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , exphbs  = require('express-handlebars')
  , hbshelpers = require('./lib/handlebarsHelpers');

var favicon = require('serve-favicon')
  , logger = require('morgan')
  , connect        = require('connect')
  , methodOverride = require('method-override')
  , bodyParser = require('body-parser')
  , multer = require('multer')
  , errorHandler = require('errorhandler')
  , config = require('./config');

mongoose.createConnection(config.db.mongodb, function(err) {
    if(err) {
        console.log('Database connection error', err);
    } else {
        console.log('Database connection successful');
    }
});

var app = express();

// all environments
app.set('port', config.application.port);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
                            defaultLayout: 'main',
                            helpers: hbshelpers
                        }));
app.set('view engine', 'handlebars');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', kudos);

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(config.application.port, function(){
  console.log('Express server listening on port ' + config.application.port);
});
