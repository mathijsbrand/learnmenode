var input = process.argv.slice(2);

var total = 0;
for(var i=0; i < input.length ; i++){
	total = total + parseFloat(input[i]);
}

console.log(total);