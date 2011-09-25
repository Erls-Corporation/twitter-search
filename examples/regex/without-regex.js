
/*
Tweets from @kisshotch without a regex
*/

var search = require("twitter-search");

search( { q : 'from:kisshotch' }, null, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("Tweets: ", tweetCount);
	}
});

/* EOF */