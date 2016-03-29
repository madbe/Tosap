var mongoose = require("mongoose");

// create the mongoose Schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//--------------------------------------------------------------
// Our Role model.
// 
// This is how we create, edit, delete, and retrieve user roles
// accounts via MongoDB.
//--------------------------------------------------------------
module.exports.Role = mongoose.model('Role', new Schema({
	id:         ObjectId,
	roleName: 	{ type: String, required: '{PATH} is required.' },
	privileges: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Permissions"
		}
	]
}));