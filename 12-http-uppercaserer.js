// Write an HTTP server that receives only POST requests and converts incoming POST body characters
// to upper-case and returns it to the client.

// Your server should listen on the port provided by the first argument to your program.

'use strict';

var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var port = process.argv[2];

var parseInput = function(input){
    var allContent = '';
    for (var key in input) {
        if (input.hasOwnProperty(key)) {
            allContent += key.toUpperCase();
            //value is input[key]
        }
    }
    return allContent;
};

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    if(req.method === 'POST'){
        req.on('data', function(chunk) {
            var formInput = qs.parse(chunk.toString());
            res.write(parseInput(formInput));
        });
    }

    req.on('end', function(){
        res.end();
    });
});
server.listen(port, '127.0.0.1');

console.log('Server running at http://127.0.0.1:/' + port);

//the form server is just there to help create the POSTS to be able to test the application
var helperFormPath = '12-program-helper-form.html';
var formServerPort = 9090;
if(port === formServerPort){
    formServerPort ++;
}

var formServer = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var stream = fs.createReadStream(helperFormPath);

    stream.on('data', function(chunk) {
        var replaceContentActionInForm = chunk.toString();
        replaceContentActionInForm = replaceContentActionInForm.replace('${actionPath}', 'http://127.0.0.1:' + port);
        res.write(replaceContentActionInForm);
    });

    stream.on('end', function(){
        res.end();
    });
});

formServer.listen(formServerPort, '127.0.0.1');
console.log('Form server running at http://127.0.0.1:/' + formServerPort);
