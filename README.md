
twitter-search
==============

***Node.js Twitter API Search w/ search result pagination, returning up to 1500 queried tweets

	* Install, run examples, easy.
	* Next up: rate limit pounding, search queues and RegEx searching :-]

```bash
$ npm install twitter-search
$ cd examples
$ node bieber-search.js
```

	* Examples

```javascript
var search = require("twitter-search");

// params: https://dev.twitter.com/docs/api/1/get/search
search( { q : "node" }, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log(tweetCount);
	}
});
```