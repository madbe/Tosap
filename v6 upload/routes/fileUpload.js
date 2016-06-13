// var IOfile = require('../server/IOfiles');
var express 	= require('express'),
	multer      = require('multer'), 
	router 		= express.Router();

var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
        callback(null, './uploads');
        },
        filename: function (req, file, callback) {

        callback(null, "upload-date-" + Date.now() + '-' + file.originalname);
        }
    });

var upload = multer({ storage : storage}).single('file');

module.exports = function () {
	
	router.get('/',function(req,res){
		res.render('fileUpload', {
			title: 'upload',
			page: 'upload',
			error: 'null',
			csrfToken: req.csrfToken()
		});
	});

	router.post('/catalog',function(req,res){
		upload(req,res,function(err) {
			if(err) {
				return res.end("Error uploading file.");
			}
	    console.log(req.file);
			res.end("File is uploaded");
		});
	});

}