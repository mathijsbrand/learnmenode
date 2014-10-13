// Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument.
// Write the String contents of each "data" event from the response to a new line on the console (stdout).
'use strict';

var http = require('http');

var inputPath = process.argv[2];

http.get(inputPath, function callback (response) {
    //console.log(response);
    response.on('data', function(data) {
        console.log(data);
    });
    response.setEncoding('utf8');
    response.on('error', function(e) {
        console.log(e.message);
    });
});