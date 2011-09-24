
twitter-search
==============

**Node.js Twitter API Search w/ search result pagination, returning up to 1500 queried tweets**

	* Install, run examples, easy.
	* Next up: 
		rate limit pounding 
		search queueing
		RegEx searching
		smart sorting
		schema ready data dumps

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

	* Search with a RegEx

```javascript
var search = require("twitter-search");

search( { q : 'from:kisshotch', regex : }, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: " tweetCount);
		console.log(tweets);
	}
});
```