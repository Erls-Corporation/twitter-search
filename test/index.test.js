
/*
  Core Modules
 */

var vows = require('vows'),
    assert = require('assert'),
    TwitterSearch = require('../lib/twitter-search');

/*
  Test Suite
*/

TwitterSearch.Search({
  query : 'node.js',
  regex : /node|mongo/gi,
  filter : /noise|filters|here/gi
});

TwitterSearch.on('complete', function(results) {
  assert.equal(typeof(results.length), 'number');
  assert.equal(typeof(results), 'object');
});

/* EOF */