var http = require('http');
var fs = require("fs");
var async = require('async');


var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    



async.each(['du.json', 'dum.json', 'dummy.json'], function (file, callback) {
	var contents = fs.readFileSync(file);
    fs.writeFile(file, JSON.stringify(contents), function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(file + ' was updated.');
        }

        callback();
    });

}, function (err) {

    if (err) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log('A file failed to process');
    }
    else {
        console.log('All files have been processed successfully');
    }
});
}); app.listen(3000,"localhost");
