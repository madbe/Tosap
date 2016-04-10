var myfun = function(data) {
    console.log(" 1  " + data)
    console.log("2 ");
    return 777;
}
var connect = function( callback) {
    setTimeout(function(){
        console.log('3 ');
        console.log("4 ");
        callback("5 ")
    },5000)
    
    return callback("6 ");
};

console.log(connect(myfun));

// result:
// 1 6
// 2
// 777
// 3
// 4
// 1 5
// 2

// var myCallback = function(err, data) {
//   if (err) throw err; // Check for the error and throw if it exists.
//   console.log('got data: '+data); // Otherwise proceed as usual.
// };

// var usingItNow = function(callback) {
//   callback(null, 'get it?'); // I dont want to throw an error, so I pass null for the error argument
// };

// var usingItNow = function(callback) {
//   var myError = new Error('My custom error!');
//   callback(myError, 'get it?'); // I send my error as the first argument.
// };

// usingItNow(myCallback);

// async.series([
//   function doSomething() {...},
//   function doSomethingElse() {...},
//   function finish() {...}
// ]);