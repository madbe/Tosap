var mongoose = require("mongoose");

// create the mongoose Schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.Org = mongoose.model('Org', new Schema({
	id:          ObjectId,
	orgName:     { type: String, required: '{PATH} is required.' },
	maxPrinters: { type: Number, required: '{PATH} is required.' },
	maxAdmins:   { type: Number, required: '{PATH} is required.' },
	// the organization super admin added by the sys admin
	admin: {
		id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
	},
	// the organization admin's added by the super admin group
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	// The Organazion printers
	printers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Printer"
		}
	],
	catalogs: [{}], // The catalog data
	campaigns: [{}] // The campaign data
}));