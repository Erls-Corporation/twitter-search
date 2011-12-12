
# Twitter-Search

> NodeJS Twitter Search API Wrapper

### Installation

```bash
$ npm install twitter-search
```

### Twitter Search Example

```javascript
var search = require('twitter-search');

 var config = {
  query : 'from:kisshotch',
  regex : /node|mongo/gi,
  filter : ['noise', 'words']
};

search(config, function(error, tweets, tweetCount) {
  if (error) {
    console.error(error);
  } else {
    console.log('tweets:', tweetCount);
    console.log(tweets);
  };
});

/* EOF */
```