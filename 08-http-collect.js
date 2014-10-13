// Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. 
// Collect all data from the server (not just the first "data" event) and then write two lines to the console (stdout).

// The first line you write should just be an integer representing the number of characters received from the server 
// and the second line should contain the complete String of characters sent by the server.
//'use strict';

var http = require('http');
const BufferList = require('bl');

var bl = new BufferList();

http.get(process.argv[2], function(res) {
    res.on('data', function(data){
        bl.append(data);
    });
    res.on('end', function(){
        console.log(bl.length);
        console.log(bl.toString());
    })
}).on('error', function(e) {
    console.log('Got error: ' + e.message);
});
