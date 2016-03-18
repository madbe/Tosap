var user  = require('../models/user');
var utils = require('../server/utils');

//--------------------------------------------------------------
// A simple authentication middleware for Express.
// 
// This middleware will load users from session data, and handle
// all user proxying for convenience.
//--------------------------------------------------------------
module.exports.simpleAuth = function(req, res, next) {
  // check if user have session
  if (req.session && req.session.user) {
    //if session exits find user by email on db
    user.User.findOne({ email: req.session.user.email }, 'firstName lastName username email role isSysAdmin', function(err, user) {
      //if user email exits
      if (user) {
        console.log(user);
        // Calling to createUserSession function
        // and clean the user object
        utils.createUserSession(req, res, user);
      }
      next();
    });
  } else {
    next();
  }
};
