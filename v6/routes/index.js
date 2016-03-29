
var express = require('express');
var utils = require('../server/utils');

var router = express.Router();

//-----------------------------------------------------------
// Render the index page.
//-----------------------------------------------------------
router.get('/', function(req, res){
	res.render('index', {title: 'Home', page: 'home'});
});

//-----------------------------------------------------------
// Render the dashboard page.
//-----------------------------------------------------------
router.get('/dashboard', utils.requireLogin, function(req, res){
	res.render('dashboard', {title: 'Dashboard', page: 'dashboard'});
});

module.exports = router;

//// check if user have session
	//if(req.session && req.session.user) {
	//	//if session exits find user by email on db
	//	User.findOne({email: req.session.user.email }, function(err, user){
	//		//if user email don't exits reset session and redirect to login
	//		if (!user) {
	//			req.session.reset();
	//			res.redirect('/login');
	//		} else {
	//			// other wise store user in the global variable 'locals' and open the page
	//			res.locals.user = user;
	//			res.render('dashboard.jade');
	//		}
	//	});
	//} else {
	//	// if session don't exit redirect to login
	//	res.redirect('/login');
	//}