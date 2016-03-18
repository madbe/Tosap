#!/usr/bin/env node
var debug = require('debug')('tosap');
var app = require('../app').createApp();
var config = require('./config');
var name = 'My App';


// Server configration
module.exports.runServer = function(){
	debug('booting %s', name);

	var server = app.listen(config.serverPORT, config.serverIP, function(){
		console.log(config.serverIP + ":" + server.address().port);
	   	debug("Server listening on port " + server.address().address +":"+ server.address().port);
	});

	return server;
};



// + config.serverIP +":"

// app.set('port', process.env.PORT || 3000);

// var server = app.listen(app.get('port'), function() {
//   debug('Express server listening on port ' + server.address().port);
// });


