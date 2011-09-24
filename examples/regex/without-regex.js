
/*
Tweets from @kisshotch without a regex
*/

var search = require("twitter-search");

search( { q : 'from:kisshotch' }, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("Tweets: ", tweetCount);
	}
});

/* EOF */