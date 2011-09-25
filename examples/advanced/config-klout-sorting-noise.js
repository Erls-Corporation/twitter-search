
var search = require("../../");

// bzzZZZZZzzzz
var noise = [
	"LISP",
	"C++",
	"Java"
];

var config = {
	noise : noise,
	klout : true,
	sorting : function(a, b) {
		return b.Klout - a.Klout;
	}
};

search( { q : "programming", regex : /[^girls]/gi }, config, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: ", tweetCount);
		console.log(tweets);
	};
});