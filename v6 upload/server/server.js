#!/usr/bin/env node
var debug = require('debug')('tosap:server');
var app = require('../app').createApp();
var config = require('./config');
var name = 'TOSAP+';

// Server configration
module.exports.runServer = function(){
	
    var server = app.listen(config.serverPORT, config.serverIP, function(){
		//console.log(config.serverIP + ":" + server.address().port);
        debug('booting %s', name);
	   	debug("Server listening on port " + server.address().address +":"+ server.address().port);
	});
    
    process.on("SIGINT", function() {
        console.warn( "Server listening on port " + server.address().port + " exiting");
        process.exit(0);
    });
    
	return server;
};