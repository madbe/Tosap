var mongoose = require("mongoose");

// create the mongoose Schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//--------------------------------------------------------------
// Our Permissions model.
// 
// This is how we create, edit, delete, and retrieve user roles
// Permissions accounts via MongoDB.
//--------------------------------------------------------------
module.exports.Permissions = mongoose.model('Permissions', new Schema({
	id:         ObjectId,
	permaissionName: { type: String, required: '{PATH} is required.' }
}));