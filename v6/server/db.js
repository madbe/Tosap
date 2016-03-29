var express    = require('express'),
    debug      = require('debug')('tosap:mongoDB'),
    mongodb    = require('mongodb'),
    mongoose   = require('mongoose'),
   
    dbConfig   = require('./config');
  
module.exports.connectDb = function() {
    
    // connect db using Mongoose APIs
    var dbConn = mongoose.connect(dbConfig.mongoUrl, function(err){
        if(err) debug('MongoDb: Connection error: ' + err);
        else debug('MongoDb: Connection ok');
    })    
   
   dbConn.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbConfig.mongoUrl);
   });
   
   dbConn.connection.on('error', function (err) {
        console.log('Could not connect to mongo server!');
        console.log(err);
    });//----end of error----
    
    dbConn.connection.on('disconnected', function(){
        console.log('Mongoose disconnected');
    });//----end of disconnected----
    
    process.on('SIGINT', function() {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
    
    return dbConn; 
}

// Connection ready state

// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
// Each state change emits its associated event name.

// conn.on('connected', callback);
// conn.on('disconnected', callback);