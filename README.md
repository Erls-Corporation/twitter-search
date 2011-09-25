
twitter-search
==============

**Node.js Twitter API Search w/ search result pagination, returning up to 1500 queried tweets**

	* Install, run examples, easy.
	* Next up: 
	- rate limit pounding 
	- search queueing
	- smart sorting
	- schema ready data dumps
	- noise filter
	- optional @Klout calculations

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
search( { q : "node" }, null, function(error, tweets, tweetCount) {
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

search( { q : 'from:kisshotch' }, null, function(error, tweets, tweetCount) {
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

search( { q : 'from:kisshotch', regex : /#UnitTests/gi }, null, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: " tweetCount);
		console.log(tweets);
	}
});
```
	
	* LET'S GET SERIOUS WITH OUR SEARCH.

```javascript
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
```

```bash
EOF
```