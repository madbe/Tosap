var express	=	require("express"),
    bodyParser = require('body-parser'),
    path     = require('path'),
    fs = require('fs'),
    buf = new Buffer(1024),
    multer	=	require('multer');

var app	=	express();

// // upload the file and store it on the disk.
// var storage	=	multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './uploads');
//   },
//   filename: function (req, file, callback) {
    
//     callback(null, "upload-date-" + Date.now() + '-' + file.originalname);
//   }
// });


// // var upload = multer({ storage : storage}).single('file');
// var upload = multer({ storage : storage}).any();
// //-----------------------------------------------------
// //upoad file and stores the files in memory as Buffer objects.
var storage = multer.memoryStorage()
var upload = multer({ storage: storage }).any();
// console.log("Going to open file!");
// fs.open(__dirname + '/uploads/input.txt', 'r+', function(err, fd) {
//    if (err) {
//        return console.error(err);
//    }
//   console.log("File opened successfully!"); 
//   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//       if (err){
//          console.log(err);
//       }
//       console.log(bytes + " bytes read");
      
//       // Print only read bytes to avoid junk.
//       if(bytes > 0){
//          console.log(buf.slice(0, bytes).toString());
//       }
//    });  
// });

app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
      res.render('/index');
});

app.post('/api/photo',function(req,res){
  
  
	upload(req, res, function(err) {
    var raw = new Buffer(req.files[0].buffer.toString(), 'ascii');
		if(err) {
			return res.end("Error uploading file.");
		}
    console.log(raw.toString());
    // parseFiles(req.files);
    // console.log(req.raw);
    
		res.end("File is uploaded");
	});
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});

// function parseFiles (Files) {
//   files.uploadedImages.forEach(function (element, index, array) {
//       fs.readFile(element.path, filesPath);
//       });    
// }

// function filesPath (err, data) {
//   var newPath = __dirname + "/public/uploadsDirectoryname/" + element.name;
//   fs.writeFile(newPath, data, function (err) {
//     if(err) { console.log(err); }
//   });
// }
