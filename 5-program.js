// this program reads a directory and prints files in that directory filtered by extension
'use strict';

var fs = require('fs');
var path = require('path');

var inputPath = process.argv[2];
var extFilter = process.argv[3];

// normalize inputpath
inputPath = path.normalize(inputPath);
// make sure there is exactly one . before the extension name
if (extFilter !== undefined) {
    extFilter.replace(/./g , '');
    extFilter = '.' + extFilter;
}

function printDir(fileArray, ext) {
    var i;
    for (i = 0; i < fileArray.length; i++) {
        if (ext === undefined) {
            console.log(fileArray[i]);
        }
        else if(path.extname(fileArray[i]) === extFilter){
            console.log(fileArray[i]);
        }
    }
}

fs.readdir(inputPath, function (err, dirFileArray) {
    if (err) {
        throw err;
    }
    printDir(dirFileArray, extFilter);
});