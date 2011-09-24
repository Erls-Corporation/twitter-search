
/*
Tweets from @kisshotch hash tagged #nodejs
*/

var search = require("twitter-search");

search( { q : 'from:kisshotch #nodejs -#mongodb' }, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("Tweets: ", tweetCount);
		console.log(tweets);
	}
});

/* EOF */