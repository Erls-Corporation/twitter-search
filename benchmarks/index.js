
// thanks mongoose
var search = require("../");
require("colors");

var start = new Date;
var total = 1000;
var i = total;

console.log("[twitter search] ".green + "starting benchmarking");

while (i--) {
	search( { q : 'twitter', regex : /#API/gi }, function(error, tweets, tweetCount) {
	if (error) {
		console.error("[twitter search] ".green + error.message);
	}
	// do do do
});
}
var time = (new Date - start) / 1000;
console.error("[twitter search] ".green + "Searches with Regular Expressions took %d seconds for %d searches (%d SPS)", time, total, total/time);
process.exit(0);

/* EOF */