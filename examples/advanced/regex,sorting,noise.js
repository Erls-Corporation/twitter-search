
var search = require("../../");

var noise = [
	"kindle",
	"ebook"
];

var config = {
	// filters
	noise : noise,
	// sort by text DESC
	sorting : function(a, b) {
		var x = a["text"].toLowerCase();
    	var y = b["text"].toLowerCase();
    	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}
};

// match all so that we can apply the filter
search( { q : "programming", regex : /^/ }, config, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: ", tweetCount);
		//console.log(tweets);
	};
});