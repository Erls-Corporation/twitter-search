
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

***Basic Twitter Search***

```javascript
var config = {
  filter : ["node", "mongo"],
  query : "from:kisshotch"
};

search(config, function(error, tweets, tweetCount) {
  if (error) {
    console.error(error);
  } else {
    console.log("tweets:",tweetCount);
  };
});

/* EOF */
```