
var search = require("../../");

var noise = [
	"LISP",
	"C++",
	"Java"
];

var config = {
	noise : noise,
	klout : true,
	sorting : function(a, b) {
		return b.klout - a.klout;
	}
};

// match all (for now);
search( { q : "from:kisshotch", regex : /ryah/ }, config, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: ", tweetCount);
	};
});