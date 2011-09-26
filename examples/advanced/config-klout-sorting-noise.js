
var search = require("../../");

var noise = [
	"LISP",
	"C++",
	"Java"
];

var config = {
	noise : noise,
	klout : true,
	// sort by text DESC
	sorting : function(a, b) {
		var x = a["text"].toLowerCase();
    	var y = b["text"].toLowerCase();
    	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}
};

// match all (for now);
search( { q : "from:kisshotch", regex : /ingk/ }, config, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: ", tweetCount);
		console.log(tweets);
	};
});