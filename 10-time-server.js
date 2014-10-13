// Write a TCP time server!
// Your server should listen to TCP connections on the port provided by the first argument to your program. 
// For each connection you must write the current date & 24 hour time in the format:
//     "YYYY-MM-DD hh:mm"

// followed by a newline character. Month, day, hour and minute must be zero-filled to 2 integers. 
// For example:
//     "2013-07-06 17:42"
'use strict';

var net = require('net');

var port = process.argv[2];

var provideTwoDigits = function (someNumber){
    if(someNumber < 10){
        return parseFloat(someNumber).toFixed(2);
    }
    else {
        return someNumber;
    }
};

var myDate = function(){
    var d = new Date(Date.now());
    return d.getFullYear() + '-' + provideTwoDigits((d.getMonth()+1)) + '-' + provideTwoDigits(d.getDate()) + ' ' + provideTwoDigits(d.getHours()) + ':' + provideTwoDigits(d.getMinutes());
};

var server = net.createServer(function (socket) {
  // socket handling logic
    socket.write(myDate());
    socket.write('\n');
    socket.end();
});

server.listen(port, function() { //'listening' listener
  //console.log('server bound');
});

