var express    = require('express'),
    sessions   = require('client-sessions'); // sessions by mozila

//--------------------------------------------------------------
// Given a user object:
// 
// - Store the user object as a req.user
// - Make the user object available to the template as #{user}
// - Set a session cookie with the user object
//
//  @param {Object} req - The http request object.
//  @param {Object} res - The http response object.
//  @param {Object} user - A user object.
//--------------------------------------------------------------
module.exports.createUserSession = function(req, res, user){
	var userSession = {
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		email: user.email,
		role: user.role,
		isActive: user.isActive
		//user.password, remove user password hsah to prevent from store it in the session.
	};

	req.session.user = userSession; // update the user object
	req.user = userSession; // set the user info from the db to the req.user
    res.locals.user = req.user; // set the res.locals for all the tamplates
};

//--------------------------------------------------------------
// Ensure a user is logged in before allowing them to continue
// their request.
//
// If a user isn't logged in, they'll be redirected back to
// the login page.
//--------------------------------------------------------------
module.exports.requireLogin = function(req, res, next){
	if(!req.user) {
		//if there is no user we redirect to the login page
		res.redirect('/login');
	} else {
		//other wise we let the req come trow
		next();
	}
}