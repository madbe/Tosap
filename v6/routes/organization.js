var bcrypt  = require('bcryptjs'),
	express = require('express');

var orgModels = require('../models/organization'); // require the org Schema
var userModels = require('../models/user'); // require the user Schema
var utils = require('../server/utils'); // require the utiletis

var router = express.Router();

module.exports = function(acl) {

    // Render the new organization page.
    //-----------------------------------------------------------
    router.get('/new', [utils.requireLogin], function(req, res) { //, acl.middleware()
        res.render('neworg', {
            title: 'New Organization',
            page: 'organization',
            error: 'null',
            csrfToken: req.csrfToken()
            
        }); //we passing csrfToken to our tamplate
        console.log('org.acl -->' + acl)
    });

    return router;
}

    // app.post('/bo/org',utils.requireLogin,function(req,res) {
    // 	if(!(req.user.role === "superAdmin")){
    // 		//if there is no user we redirect to the login page
    // 		res.send('user '+req.user+" doesnt have the required role ");
    // 	} else {
    // 		var org = new orgModels.Org({
    // 			orgName: req.body.orgName	
    // 	});


    // // 	org.save(function(err){
    // // 		//if an error as append we check the no fo the error and then gos to the
    // // 		//register page and show it.
    // // 		if(err){
    // // 			var err = 'Something wrong, try again!';
                
    // // 			res.send('errrr');
    // // 		} else {
    // // 			res.json(org);
    // // 		}
    // // 	});
    // // 	}	
    // });
