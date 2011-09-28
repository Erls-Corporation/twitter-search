
twitter-search
==============

**Node.js Twitter API Search w/ search result pagination, returning up to 1500 queried tweets**

	* Install, run examples, easy.
	* Next up: 
	- rate limit pounding 
	- search queueing
	- schema ready data dumps
	- optional @Klout calculations

```bash
$ npm install twitter-search
$ cd examples && cd general
$ node bieber-search.js
```

## Examples ##

***Basic Twitter Search***

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

***Search with from user WITHOUT regex***

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

***Search with from user WITH regex***

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
	
***Search with result sorting (.text DESC)***

```javascript
var search = require("twitter-search");

var config = {
	// sort by text DESC
	sorting : function(a, b) {
		var x = a["text"].toLowerCase();
    	var y = b["text"].toLowerCase();
    	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}
};

search( { q : "from:kisshotch", regex : /node/ }, config, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets: ", tweetCount);
		console.log(tweets);
	};
});
```

***Search with RegEx, kSorts and noise filters***

```javascript
var search = require("twitter-search");

// filter out my work
var work = [
	"module",
	"node",
	"js",
	"klout",
	"github",
	"mongo",
	"api",
	"npm",
	"startup",
	"twitter",
	"facebook",
];

var config = {
	filter : work,
	sorting : function(a, b) {
		var x = a["text"].toLowerCase();
    	var y = b["text"].toLowerCase();
    	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}
};

// match all so that we can apply the filter
search( { q : "from:kisshotch", regex : /^/ }, config, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets:",tweetCount);
	};
});
```

***Search with RegEx, kSorts, noise filters, Klout scores (sort be Klout score DESC)***

```javascript
var search = require("twitter-search");

var work = [
	"module",
	"node",
	"js",
	"klout",
	"github",
	"mongo",
	"api",
	"npm",
	"startup",
	"twitter",
	"facebook",
];

var config = {
	filter : work,
	klout : true,
	sorting : function(a, b) {
		var x = a["klout"].toLowerCase();
    	var y = b["klout"].toLowerCase();
    	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}
};

search( { q : "from:kisshotch", regex : /^/ }, config, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets:",tweetCount);
	};
});

/* EOF */
```

***Search with RegEx, kSorts, noise filters, Klout scores (sort be Klout score DESC), and singlePage vs. 2-15 pages***

```javascript
var work = [
	"module",
	"node",
	"js",
	"klout",
	"github",
	"mongo",
	"api",
	"npm",
	"startup",
	"twitter",
	"facebook",
];

var config = {
	filter : work,
	klout : true,
	sorting : function(a, b) {
		var x = a["klout"];
    	var y = b["klout"];
    	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	},
	singlePage : true
};

search( { q : "from:kisshotch", regex : /^/ }, config, function(error, tweets, tweetCount) {
	if (error) {
		console.error(error);
	} else {
		console.log("tweets:",tweetCount);
	};
});

/* EOF */
```