//Create a program that prints a list of files in a given directory, filtered by the extension of the files. 
//The first argument is the directory name and the second argument is the extension filter. 
//Print the list of files (one file per line) to the console. You must use asynchronous I/O.

////The filename extension argument must be the same as was passed to your program. 
//i.e. don't turn it into a RegExp or prefix with "." or do anything else 
//but pass it to your module where you can do what you need to make your filter work.

// this program reads a directory and prints files in that directory filtered by extension
'use strict';

var fp = require('./6-filter-path-by-extension.js');

var inputPath = process.argv[2];
var extFilter = process.argv[3];

fp(inputPath, extFilter, function (err, list) {
    if (err) {
        throw err;
    }

    var i = 0;
    for (i; i < list.length; i++) {
        console.log(list[i]);
    }

});
