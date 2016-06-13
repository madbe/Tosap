var express         = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require("method-override"),
    path 	        = require('path'),
    mongodb         = require('mongodb'),
    mongoose        = require('mongoose'),
    bcrypt          = require('bcryptjs'), // hash the password
    csrf            = require('csurf'), // csurf protection prevent as from submiting form that we don't what to submit
    uuid            = require('node-uuid'), // Generate long random id
    sessions        = require('client-sessions'), // sessions by mozila
    debug           = require('debug')('tosap:app'),
      
    middleware      = require('./middleware/middleware'),
    startDB         = require('./server/db'), // connect to DB server
    startAcl        = require('./server/aclConfig'); // Start the acl config Object
    

defineAppAndRouts = function(app, acl){

    

    
        
        // Settings   
    // view engine setup
    app.set('view engine', 'ejs');

    // Middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(sessions({
        cookieName: 'session',
        secret: uuid.v4(),              // secretKey: random letters and number to hash the cookie
        duration: 30 * 60 * 1000,       // set the time until the cookie expired
        activeDuration: 5 * 60 * 1000,  //set the time to length the session if user active
        //In production site:
        httpOnly: true,                 //don't let browser javascript access cookies ever
        secure: true,                   //only use cookies over https
        ephemeral: true                 // delete this cookie when browser is closed
    }));
    
    // Prevents harmful javascript code when using the <%- ejs.
    // app.use(expressSanitizer());
    // adding method override to use put and delete
    app.use(methodOverride("_method"));
    // adding csrf protection
    app.use(csrf());
    // adding the simpleAuth middleware
    app.use(middleware.simpleAuth);
    //app.use(acl.middleware());
    app.use(function (req, res, next) {
        var token = req.csrfToken();
        res.cookie('XSRF-TOKEN', token); // use 'XSRF-TOKEN' in the cookie to preventing cross-site request Forgery
        res.locals.csrfToken = token; // set the crfToken in locals for global use
        res.locals.currentUser = req.user; // set the current user in locals variable
        next();
    });
    
    // TODO: pass the acl to each routes
    var indexRoutes     = require('./routes/index'),
        usersRoutes     = require('./routes/users')(acl),
        orgRoutes       = require('./routes/organization')(acl),
        uploadRoutes    = require('./routes/fileUpload'),
        printersRoutes  = require('./routes/printer');

    // Routes
    app.use('/', indexRoutes);
    app.use('/orgs', orgRoutes);//
    app.use(usersRoutes);//'/org/:id/users',
    app.use('/uploads',uploadRoutes);
    // app.use('/org/:id/printers', printersRoutes);
    // app.use('/org/:id/catalogs', printersRoutes);
    // app.use('/org/:id/campaigns', printersRoutes);
    
     app.use(function (err, req, res, next) {
        if (!!err) {
            res.status(err.errorCode);
            res.render('error', {
                message: "THis Is My Err Handling" + err.message,
                error: err
            });
        } else {
            next();
        }
     });

    // simple logger
    app.use(function(req, res, next){
        console.log('%s %s', req.method, req.url);
        next();
    });
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Page Not Found');
        err.status = 404;
        next(err);
    });

     //app.use(function(req, res, next) {
     //    var err = new Error('Insufficient permissions to access resource');
     //    err.status = 403;
     //    next(err);
     //});
};

//--------------------------------------------------------------
// Create and initialize an Express application that
// is 'fully loaded' and ready for usage!
//
// This will also handle setting up all dependencies
// (like database connections).
//
// @returns {Object} - An Express app object.
//--------------------------------------------------------------
module.exports.createApp = function(){

    var app = express();
    
    startAcl.connectAcl(startDB.connectDb(),function (err, aclConn) { 
        if(err) debug('ACL: Acl Connection error: ' + err); 
        /* do some stuff with acl conn */
        console.log("app.acl 2 -->", aclConn);
        defineAppAndRouts(app, aclConn);
    });
    
    return app;
};
    

