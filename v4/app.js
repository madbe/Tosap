var express    = require('express'),
    bodyParser = require('body-parser'),
    path 	   = require('path'),
    mongoose   = require('mongoose'),
    acl        = require('acl'),
    bcrypt     = require('bcryptjs'), // hash the password
    csrf       = require('csurf'), // ccsrf protection prevent as from submiting form that we don't what to submit
    uuid       = require('node-uuid'), // Generate long random id
    sessions   = require('client-sessions'), // sessions by mozila

    dbConfig = require('./server/db');
    middleware = require('./middleware/middleware');

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
	var app 			= express();
		indexRoutes     = require('./routes/index'),
		usersRoutes     = require('./routes/users'),
		orgRoutes		= require('./routes/organization'),
		printersRoutes	= require('./routes/printer');
	
	// connect db using Mongoose APIs
    mongoose.connect(dbConfig.mongoUrl, function(err){
        if(err) console.log('MongoDb: Connection error: ' + err);
    });
    // Connect Acl to mongodb
    mongoose.connection.on('open', function(ref){
        console.log('Connected to mongo server.');
        console.log("Lets do this to " + mongoose.connection.db);
        acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));
        
         /* now assign permissions to roles */

        // allow guests to view posts
            acl.allow("guest", "/index", "view");
        // allow registered users to view and create posts
        //acl.allow("registered users", "post", ["view", "create"]);

        // allow administrators to perform any action on posts
        //
            acl.allow("admin", "/", "*");
            acl.allow("sysAdmin","/bo/org/new", "*");
    });
    mongoose.connection.on('error', function (err) {
        console.log('Could not connect to mongo server!');
        console.log(err);
    });
    
	// Settings 
	// view engine setup
	app.set('view engine', 'ejs');

	// middleware
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(sessions({
		cookieName: 'session',
		//console.log(uuid.v4());
		secret: uuid.v4(), // secreatKey: random latters and number to hash the cookie
		duration: 30 * 60 * 1000, // set the time until the cookie expired
		activeDuration: 5 * 60 * 1000, //set the time to length the session if user active
		//In production site
		httpOnly: true, //dont let browser javascript access cookies ever
		secure: true, //only use cookies over https
		ephemeral: true, // delete this cookie when browser is closed
	}));

	// adding csrf protection
	app.use(csrf());
	// adding the simpleAuth middleware
	app.use(middleware.simpleAuth);
    
	// use 'XSRF-TOKEN' in the cookie to preventing cross-site request Forgery
	// set the crfToken in locals for global use
	app.use(function (req, res, next) {
	  var token = req.csrfToken();
	  res.cookie('XSRF-TOKEN', token);
	  res.locals.csrfToken = token;
	  // set the current user in locals variable
	  res.locals.currentUser = req.user; 
	  next();
	});
	
	// routes
	app.use(indexRoutes);
  	app.use(usersRoutes);
  	app.use(orgRoutes);
  	app.use(printersRoutes);

  	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	return app;
};

