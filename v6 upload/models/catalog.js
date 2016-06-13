var mongoose = require("mongoose");

// create the mongoose Schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//--------------------------------------------------------------
// Our Catalog model.
// 
// This is how we create, edit, delete, and retrieve catalog
// via MongoDB.
//--------------------------------------------------------------
module.exports.Catalog = mongoose.model('Catalog', new Schema({
	Id:         ObjectId,
	Name:  	{ type: String, required: '{PATH} is required.' },
	SKU:   	{ type: String, required: '{PATH} is required.' },
	tags: 	[{ type: String, required: '{PATH} is required.' }]
}));