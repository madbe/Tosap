var bcrypt = require('bcryptjs');
var express = require('express');

var userModels = require('../models/user'); // require the user Schema
var utils = require('../server/utils');

var router = express.Router();

//-----------------------------------------------------------
// Render the registration page rout.
//-----------------------------------------------------------
router.get('/register', function(req, res){
	res.render('register', {
		title: 'Register',
		page: 'register',
		error: 'null',
		csrfToken: req.csrfToken()
	}); //we passing csrfToken to our tamplate
});

//-----------------------------------------------------------
// Create a new user account, and store in db.
// Once a user is logged in, they will be sent to the [page].
//-----------------------------------------------------------
router.post('/register', function(req, res){
	// salt and hash the password
	var salt = bcrypt.genSaltSync(10)
	var hash = bcrypt.hashSync(req.body.password, salt);

	// create new User
	var user = new userModels.User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		email: req.body.email,
		password: hash,
		role: req.body.role,
		isActive: req.body.isActive
	});
	user.save(function(err){				
		//If an error occurred we check the no' of the error 
		//and then redirect to the registration page.
		if(err){
			var error = 'Something wrong, try again! ' + err.message.toString();
			if(err.code === 11000){
				error = 'That email already taken, please try another.';
			}
			res.render('register', {title: 'Register', page: 'register', error: error});
		} else {
			utils.createUserSession(req, res, user);
			res.redirect('/dashboard');
		}
	})
});// end register

//-----------------------------------------------------------
// Render the login page.
//-----------------------------------------------------------
router.get('/login', function(req, res){
	res.render('login', {
		title: 'Login',
		page: 'login',
		error: 'null',
		csrfToken: req.csrfToken()
	});
});

//-----------------------------------------------------------
// Log a user into their account.
// Once a user is logged in, they will be sent to the [page].
//-----------------------------------------------------------
router.post('/login', function(req, res){
	//find the user who make login in the db
	userModels.User.findOne({email: req.body.email}, 'firstName lastName email password role isActive', function(err, user){
		if(!user){
			res.render('login', {
				title: 'Login',
				page: 'login',
				error: 'Invalid email or password.',
				csrfToken: req.csrfToken()
			});
		} else {
			// if the user do exists we check the password
			// and redirect to dashboard
			if(bcrypt.compareSync(req.body.password, user.password)) { //req.body.password === user.password
				// create a user session after login
				//set-cookie: session= { email: '...', password: '...', ...}
				utils.createUserSession(req, res, user);				
				res.redirect('/dashboard');
			} else {
				res.render('login', {
					title: 'Login',
					page: 'login',
					error: 'Invalid email or password.',
					csrfToken: req.csrfToken()
				});
			}
		}
	})
});// end login

//-----------------------------------------------------------
// Log a user out of their account,
// Then redirect them to the home page.
//-----------------------------------------------------------
router.get('/logout', function(req, res){
	if(req.session) {
		req.session.reset(); //Logout from the session
	}
	res.redirect('/');
}); // end of logout

module.exports = router;