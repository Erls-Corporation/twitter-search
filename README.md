
twitter-search
==============

**Node.js Twitter API Search w/ search result pagination, returning up to 1500 queried tweets**

	* Install, run examples, easy.
	* Next up: 
	- rate limit pounding 
	- search queueing
	- smart sorting
	- schema ready data dumps

```bash
$ npm install twitter-search
$ cd examples
$ node bieber-search.js
```

	* Examples

	* Basic Twitter Search

```javascript
var search = require("twitter-search");

// params: https://dev.twitter.com/docs/api/1/get/search
search( { q : "node" }, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: " tweetCount);
	}
});
```

	* Search with from user without regex

```javascript
var search = require("twitter-search");

search( { q : 'from:kisshotch' }, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: " tweetCount);
		console.log(tweets);
	}
});
```

	* Search with from user **with** regex

```javascript
var search = require("twitter-search");

search( { q : 'from:kisshotch', regex : /#UnitTests/gi }, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: " tweetCount);
		console.log(tweets);
	}
});
```