
# Twitter-Search [![Build Status](https://secure.travis-ci.org/edwardhotchkiss/twitter-search.png)](http://travis-ci.org/edwardhotchkiss/twitter-search)

> NodeJS Twitter API Search Wrapper with RegExp Filtering

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
  filter : ['noise', 'words'] // alternatively, filter : /noise|words/gi
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

## Run Tests

``` bash
$ npm test
```

## License (MIT)

Copyright (c) 2011, Edward Hotchkiss.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author: [Edward Hotchkiss][0]

[0]: http://ingklabs.com/