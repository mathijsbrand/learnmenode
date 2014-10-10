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

function printAllUrlContent(){
    var i = 0;
    for (i; i < urlsContent.length; i++){
        console.log(urlsContent[i].content);
    }
}

function UrlContent(id, url){
    this.id = id;
    this.url = url;
    this.content = '';
}

UrlContent.prototype.getUrlContent = function(callback){
    var bl = new BufferList();
    var UC = this;

    var content = http.get(this.url, function(response) {
        response.on('data', function(data){
            bl.append(data);
        });
        response.on('end', function(){
            UC.content = bl.toString();
            return callback(null, bl.toString());
        })
    }).on('error', function(e) {
        return callback(e.message, null);
    });
};

var urlsContent = [];
urlsContent.push(new UrlContent(0,urls[0]));
urlsContent.push(new UrlContent(1,urls[1]));
urlsContent.push(new UrlContent(2,urls[2]));

// 1st parameter in async.each() is the array of items
async.each(urlsContent,
  // 2nd parameter is the function that each item is passed into
  function(UrlContent, callback){
    // Call an asynchronous function (often a save() to MongoDB)
    UrlContent.getUrlContent(function (){
      // Async call is done, alert via callback
      callback();
    });
  },
  // 3rd parameter is the function call when everything is done
  function(err){
    // All tasks are done now
    printAllUrlContent();
  }
);