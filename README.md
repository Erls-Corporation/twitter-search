
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
```

## Example ##

***Search with RegEx, kSorts, noise filters, Klout scores (sort by Klout score DESC), and singlePage vs. 2-15 pages***

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