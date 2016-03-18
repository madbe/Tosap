module.exports = {
	// Database url
	//'url' : 'mongodb://<dbuser>:<dbpassword>@novus.modulusmongo.net:27017/<dbName>' // on web server
	'url' : process.env.DATABASEURL || "mongodb://localhost/tosap" // on http://localhost:3000/ or DATABASEURL 

}