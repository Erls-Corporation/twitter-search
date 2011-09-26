
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

search( { q : "from:kisshotch", regex : /^/gi }, config, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: ", tweetCount);
		//console.log(tweets);
	};
});