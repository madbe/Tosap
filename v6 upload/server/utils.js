var express    = require('express'),
    sessions   = require('client-sessions'); // sessions by mozila
    color      = require('colors');
    
/**--------------------------------------------------------------
// Given a user object:
// 
// - Store the user object as a req.user
// - Make the user object available to the template as #{user}
// - Set a session cookie with the user object
//
//  @param {Object} req - The http request object.
//  @param {Object} res - The http response object.
//  @param {Object} user - A user object.
//-------------------------------------------------------------- */
module.exports.createUserSession = function(req, res, user){
    console.log('createUserSession: %s'.yellow , user.id);
	var userSession = {
        userId: user.id.toString(),
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		email: user.email,
		role: user.role,
		isActive: user.isActive
		//user.password, remove user password hash to prevent from store it in the session.
	};
    //console.log(userSession);
	req.session.user = userSession; // update the user object 
    console.log("user session: %s".yellow  , req.session.user )
    req.session.userId= userSession.userId; // store the userId for the ACL use
    console.log("reqUSER: %s".yellow , req.session.userId);
	req.user = userSession; // set the user info from the db to the req.user
    res.locals.user = req.user; // set the res.locals for all the tamplates
};

/**--------------------------------------------------------------
//  Given a user and ACL object:
// 
// - Create user object with UserID and Role
// - Set a ACL Permissions Role to the user
//
//  @param {Object} acl - The ACL object.
//  @param {Object} user - A user object.
//-------------------------------------------------------------- */
module.exports.createUserAcl = function(acl, user){
    console.log('createUserACl: ' + user.id);
	var userAcl = {
        userId: user.id.toString(),
		role: user.role
    };
    console.log(userAcl);
    acl.addUserRoles(userAcl.userId, userAcl.role, function(err){
        if (err){
            console.log("ERROR :", err.message);
        }else {
            console.log("user Role created");
        }
    }); // set the user ACL to the db from the userAcl
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
};

/**
* checkPermission
* checks if a user has permission to perform an action on a specified resource
*  
*  @param {string} resource - resource being accessed
*  @param {string/array} action - action(s) being performed on the resource
*  @param {object} req - express request object
*  @param {object} res - express response object
*  @param {object} next - express middleware next object
*/

module.exports.checkPermission = function(resource, action){
    var middleware = false;  // start out assuming this is not a middleware call

    return function(req, res, acl, next){
        // check if this is a middleware call
        if(next){
            // only middleware calls would have the "next" argument
            middleware = true;  
        }

        var userID = req.session.user.id;  // get user id property from express request

        // perform permissions check
        acl.isAllowed(userID, resource, action, function(err, result) {
            // return results in the appropriate way
            switch (middleware) {
                case true:
                    if(result){
                        // user has access rights, proceed to allow access to the route
                        next();
                    } else {
                        // user access denied
                        var checkError = new Error("user does not have permission to perform this action on this resource");
                        next(checkError);  // stop access to route
                    }
                    return;
                    
                case false:
                    if(result){
                        // user has access rights
                        return true;
                    } else {
                        // user access denied
                        return false;
                    }
            }
        });
    }
}
