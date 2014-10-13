// this program takes a file path and prints the number of lines
var fs = require("fs");

// get the input
var input = process.argv.slice(2,3);
var fileBuf = fs.readFileSync(input[0]);

var totalNewLines = 0;
// check all new lines in file
var newLineCharBuf = new Buffer('\n');
var newLineChar = newLineCharBuf[0];
for(var i = 0; i<fileBuf.length ; i++){
	if(fileBuf[i] === newLineChar ){
		totalNewLines += 1;
	}
}

console.log(totalNewLines);
