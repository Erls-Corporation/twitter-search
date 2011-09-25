
/*
Tweets from without the regex
*/

var search = require("twitter-search");

search( { q : 'from:kisshotch+#nodejs', regex : /#UnitTests/gi }, null, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("Tweets: ", tweetCount);
	}
});

/* EOF */