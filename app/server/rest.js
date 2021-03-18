var express = require('express')
  , kudos = require('../routes/kudos')
  , http = require('http')
  , path = require('path')
  , exphbs  = require('express-handlebars')
  , Handlebars = require('handlebars')
  , allowInsecurePrototypeAccess = require('@handlebars/allow-prototype-access').allowInsecurePrototypeAccess
  , hbshelpers = require('../lib/handlebarsHelpers')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , connect        = require('connect')
  , methodOverride = require('method-override')
  , bodyParser = require('body-parser')
  , errorHandler = require('errorhandler')
  , config = require('../config');

module.exports.start = function(){
    var app = express();

    // all environments
    app.set('port', config.application.port);
    app.set('views', path.join(__dirname, '..', 'views'));
    app.engine('handlebars', exphbs({
                                defaultLayout: 'main',
                                helpers: hbshelpers,
                                handlebars: allowInsecurePrototypeAccess(Handlebars)
                            }));
    app.set('view engine', 'handlebars');
    app.use(favicon(__dirname + '/../public/favicon.ico'));
    app.use(logger('dev'));
    app.use(methodOverride('_method'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, '..', 'public')));


    app.use('/', kudos);

    // development only
    if ('development' == app.get('env')) {
      app.use(errorHandler());
    }

    var server = http.createServer(app);

  server.listen(config.application.port)
  console.log('Express server listening on port ' + config.application.port);
  return Promise.resolve(true);  
}
