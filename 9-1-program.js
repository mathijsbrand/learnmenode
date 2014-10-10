// This problem is the same as the previous problem (HTTP COLLECT) in that you need to use http.get(). 
// However, this time you will be provided with three URLs as the first three command-line arguments.

// You must collect the complete content provided to you by each of the URLs and print it to the console (stdout). 
// You don't need to print out the length, just the data as a String; one line per URL. 
// The catch is that you must print them out in the same order as the URLs are provided to you as command-line arguments.

// 'use strict';

var http = require('http');
var async = require('async');
const BufferList = require('bl');

var urls = [process.argv[2],process.argv[3],process.argv[4]];
var results = [-1,-1,-1];
var callbackCounter = 0;

var checkRequest = function(id, url, callback){

    var bl = new BufferList();
    http.get(urls[id], function(res) {
        res.on('data', function(data){
            bl.append(data);
        });
        res.on('end', function(){
            results[id] = bl.toString();
            return callback(null, results);
        })
    }).on('error', function(e) {
        return callback(e.message, null);
    });
};

var checkRequests = function(callback){
    var i = 0;
    for(i; i < urls.length; i++){
        checkRequest(i, urls[i], function(err, data){
            if(err){
                callback(err, null);
            }
            callbackCounter += 1;

            if(callbackCounter == 3){
                return callback(null, results);
            }
        });
    }
};

checkRequests(function(err, data){
    if(err){
        throw err;
    }
    var i = 0;
    for (i; i < 3; i++){
        console.log(data[i]);
    }
});

// setTimeout(function(){
//     checkRequests(function(err, data){
//         if(err){
//             throw err;
//         }
//         var i = 0;
//         for (i; i < 3; i++){
//             console.log(data[i]);
//         }
//     });
// }, 4000);
