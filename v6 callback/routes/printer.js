var express = require('express'),
	router  = express.Router();

//This method should be logged for debugging
router.post('/campaignqury', function(req,res) {

	//verify •	MYORGID and token inside req.body


	//if all good do business logic, create reply object, then return: res.json(reply);
// {status: OK}
});

module.exports = router;
