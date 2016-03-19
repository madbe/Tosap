module.exports = {
	// Database url
	//'url' : 'mongodb://<dbuser>:<dbpassword>@novus.modulusmongo.net:27017/<dbName>' // on web server
	'mongoUrl' : process.env.DATABASEURL || "mongodb://localhost/tosap" // on http://localhost:3000/ or DATABASEURL 

}

// Connection ready state

// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
// Each state change emits its associated event name.

// conn.on('connected', callback);
// conn.on('disconnected', callback);