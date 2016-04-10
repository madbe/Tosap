var mongoose = require("mongoose");

// create the mongoose Schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.Printer = mongoose.model('Printer', new Schema({
	id: 			ObjectId,
	token: 			{ type: String, required: '{PATH} is required.' },
	description: 	{ type: String, required: '{PATH} is required.' }
}));

