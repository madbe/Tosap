module.exports = {
	// Server ports & IP   
	serverPORT: process.env.PORT || "3000",
	serverIP: process.env.IP || "localhost",
    serverHOST: process.env.HOST || "localhost",
    
    // Database url
	//'url' : 'mongodb://<dbuser>:<dbpassword>@novus.modulusmongo.net:27017/<dbName>' // on web server
    // Database Local
    mongoUrl: process.env.DATABASEURL || "mongodb://localhost/tosap" // on http://localhost:3000/ or DATABASEURL
};
