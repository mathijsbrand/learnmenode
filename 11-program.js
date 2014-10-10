// Write an HTTP server that serves the same text file for each request it receives.

// Your server should listen on the port provided by the first argument to your program.

// You will be provided with the location of the file to serve as the second command-line argument. 
// You must use the fs.createReadStream() method to stream the file contents to the response.
'use strict';

var http = require('http');
var fs = require('fs');

var port = process.argv[2];
var filePath = process.argv[3];

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var stream = fs.createReadStream(filePath);

    stream.on('data', function(chunk) {
        res.write(chunk);
    });

    stream.on('end', function(){
        res.end();
    });
});

server.listen(port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:/' + port);