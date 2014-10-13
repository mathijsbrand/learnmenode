//The module must export a single function that takes three arguments: 
//the directory name, 
//the filename extension string and 
//a callback function, in that order. 

//The callback function must be called using the idiomatic node(err, data) convention. 
//This convention stipulates that unless there's an error, the first argument passed to the callback will be null, 
//and the second will be your data. In this case, the data will be your filtered list of files, as an Array. 
//If you receive an error, e.g. from your call to  fs.readdir(), the callback must be called with the error, 
//and only the error, as the first argument.

//You must not print directly to the console from your module file, only from your original program.
//In the case of an error bubbling up to your original program file, simply check for it and print an informative message to the console.

//These four things is the contract that your module must follow.
  // * Export a single function that takes exactly the arguments described.
  // * Call the callback exactly once with an error or some data as described.
  // * Don't change anything else, like global variables or stdout.
  // * Handle all the errors that may occur and pass them to the callback.
'use strict';

var fs = require('fs');
var path = require('path');

exports = module.exports = {};

module.exports = function (inputPath, extFilter, callback) {
    //check inputPath
    inputPath = path.normalize(inputPath);

    //check extension
    if (extFilter !== undefined) {
        extFilter.replace(/./g , '');
        extFilter = '.' + extFilter;
    }

    // compute data and return
    fs.readdir(inputPath, function (err, dirFileArray) {
        if (err) {
            return callback(err);
        }

        dirFileArray = dirFileArray.filter(function(fileName){
            //check if file
            if(fileName.lastIndexOf('.') > 0){
                return (fileName.slice(fileName.lastIndexOf('.')) === extFilter);
            }
        });


        return callback(null,dirFileArray);
    });
};