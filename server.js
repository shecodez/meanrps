/**
 * Created by Nicole J. Nobles on 11/17/2016.
 */

/**
 * Module Dependencies
 */

// Express 4.x.x Modules
var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');

// Additional Modules
var fs              = require('fs');
var config          = require('./config/config');
//var i18n            = require('i18next');
//TODO: Make i118next work from a separate file.
//var i18n            = require('./config/i18next');

/**
 * Create Express app
 */

var app = express();

/**
 * Express Configuration and Setup
 */

// Application local (>.> global...) variables are provided to *all* templates
// rendered within the application.

app.locals.application  = config.name;
app.locals.version      = config.version;
app.locals.description  = config.description;
app.locals.author       = config.author;
app.locals.keywords     = config.keywords;
app.locals.ga           = config.ga;

/**
 * i18next init Configuration
 */
/*
var i18_config = {

    lng         : 'en',
    load        : 'unspecific',
    fallbackLng : ['en','dev'],
    resGetPath  : "locales/__lng__/__ns__.json",
    ns: {
        namespaces  : ['translation'],
        defaultNs   : 'translation'
    },
    //ignoreRoutes: ['/downloads','/images', '/public', '/stylesheets', '/javascripts'],
    ignoreRoutes: ['img/','images/', 'public/', 'css/', 'js/'],

    // Do NOT use in production
    debug       : true,
    saveMissing : true,
    sendMissingTo: 'fallback'

};

i18n.init(i18_config, function() {});

// i18next before app.router
app.use(i18n.handle);
*/

/**
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/**
 * i18next helpers
 */
/*
i18n.registerAppHelper(app)
    .serveClientScript(app)
    .serveDynamicResources(app)
    .serveMissingKeyRoute(app);
*/

app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes/Routing
 */

var routes = require('./routes.js');
app.use('/', routes);

/**
 * Error Handling
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Error Handlers
 */

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var ip 		= process.env.IP    || '127.0.0.1';
var port 	= process.env.PORT  || 3000;

//app.listen(port, ip);
app.listen(port);

module.exports = app;