
/*
Not a Just Bieber fan (however; dudes got talent).
But hey, should I really search for hello world? :P
*/

var search = require("twitter-search");

// Tweets containing exactly 'just bieber'
search( { q : '"justin bieber"' }, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log(tweetCount);
	}
});

/* EOF */