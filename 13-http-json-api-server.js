// Write an HTTP server that serves JSON data when it receives a GET request to the path '/api/parsetime'. 
// Expect the request to contain a query string with a key 'iso' and an ISO-format time as the value.

// For example:
//   /api/parsetime?iso=2013-08-10T12:10:15.474Z
// The JSON response should contain only 'hour', 'minute' and 'second' properties. For example:
//     {
//       "hour": 14,
//       "minute": 23,
//       "second": 15
//     }
// Add second endpoint for the path '/api/unixtime' which accepts the same query string but returns UNIX epoch time under the property 
// 'unixtime'. For example:
//     { "unixtime": 1376136615474 }
// Your server should listen on the port provided by the first argument to your program.
'use strict';

var http = require('http');
var url = require('url');
var qs = require('querystring');

var port = process.argv[2];

var help = function(){
    //provide all the possible rest calls
    var options = 'Options:\n';
    options = options + '/api/parsetime \n with iso parameter containing time. Example: /api/parsetime?iso=2013-08-10T12:10:15.474Z\n';
    options = options + '/api/unixtime \n with iso parameter containing time. Example: /api/parsetime?iso=2013-08-10T12:10:15.474Z';
    return options;
};


var parseTime = function(urlQuery){
    if(urlQuery.iso !== undefined){
        //console.log('Key = ' + urlQuery.iso);
        var d = new Date(urlQuery.iso);
        var jsonResult = {
            hour: parseFloat(d.getHours().toFixed(2)),
            minute: parseFloat(d.getMinutes().toFixed(2)),
            second: parseFloat(d.getSeconds().toFixed(2))
        };
        return JSON.stringify(jsonResult);
    } else{
        console.error('Error: iso is undefined');
    }
};

var unixTime = function(urlQuery){
    if(urlQuery.iso !== undefined){
        //console.log('Key = ' + urlQuery.iso);
        var d = new Date(urlQuery.iso);
        var jsonResult = {
            unixtime: d.getTime()
        };
        return JSON.stringify(jsonResult);

    } else{
        console.error('Error: iso is undefined');
    }
};

var matchAndProcessURL = function(reqURL, callback){
    if(reqURL.pathname === '/api/parsetime'){
        return callback(null, parseTime(qs.parse(reqURL.query)));
    } else if(reqURL.pathname === '/api/unixtime'){
        return callback(null, unixTime(qs.parse(reqURL.query)));
    }
    else {
        return callback(reqURL.path + ' didn\'t match any of the url matchers\n\n' + help() , false);
    }
};


var server = http.createServer(function (req, res) {
    var srvUrl = url.parse('http://' + req.url);
    //console.log(srvUrl);
    //res.write('Matching URL...\n');
    matchAndProcessURL(srvUrl, function(err, data){
        if(err){
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end(err);
        } else {
            //console.log(data);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data);
        }
    });
});

server.listen(port, '127.0.0.1');
//console.log('Server running at http://127.0.0.1:' + port);