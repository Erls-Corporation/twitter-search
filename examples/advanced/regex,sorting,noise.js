
var search = require("twitter-search");

// filter out my work
var work = [
	"module",
	"node",
	"js",
	"klout",
	"github",
	"mongo",
	"api",
	"npm",
	"startup",
	"twitter",
	"facebook",
];

var config = {
	filter : work,
	sorting : function(a, b) {
		var x = a["text"].toLowerCase();
    	var y = b["text"].toLowerCase();
    	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}
};

// match all so that we can apply the filter
search( { q : "from:kisshotch", regex : /^/ }, config, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets:",tweetCount);
	};
});