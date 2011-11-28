
# node-twitter

## Node.js Twitter API Search w/ search result pagination, returning up to 1500 queried tweets**

### Installation

```bash
$ npm install twitter-search
```

### Twitter Search Example

```javascript
var search = require("twitter-search");

 var config = {
  query : "from:kisshotch",
  regex : /node|mongo/gi,
  filter : ["was", "is"]
};

search(config, function(error, tweets, tweetCount) {
  if (error) {
    console.error(error);
  } else {
    console.log("tweets:", tweetCount);
    console.log(tweets);
  };
});

/* EOF */
```