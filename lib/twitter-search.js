
/*!
  Core Modules
 */

var belt = require('belt')
  , request = require('request')
  , querystring = require('querystring')
  , EventEmitter = require('events').EventEmitter
  , utils = require('./utils');

/*!
  TwitterSearch EventEmitter
 */

var TwitterSearch = new EventEmitter;

TwitterSearch.results = [];

/*!
  perform a request on the twitter API
  @param {String} page
 */

function _request(url) {
  request(url, function (error, response, body) {
    if (error) {
      TwitterSearch.emit('error', error);
    } else {
      try {
        var page = JSON.parse(body);
        if (page.error) {
          TwitterSearch.emit('error', page.error);
        } else {
          TwitterSearch.emit('page', page);
        }
      } catch(error) {
        TwitterSearch.emit('error', error);
      }
    };
  });
};

/*!
  TwitterSearch.Search
 */

TwitterSearch.Search = function(options) {
  TwitterSearch.options = options;
  var params = {
    q : options.query,
    rpp : 100
  };
  var url = 'http://search.twitter.com' + '/search.json' + '?' + querystring.stringify(params);
  _request(url);
};

/*!
  Merge Tweets into TwitterSearch.results
 */

TwitterSearch.on('page', function(page) {
  TwitterSearch.results = TwitterSearch.results.concat(page.results);
  if (page.next_page) {
    TwitterSearch.emit('complete', TwitterSearch.results);
  } else {
    TwitterSearch.emit('complete', TwitterSearch.results);
  };
});

/*!
  module entry point, TwitterSearch
 */

module.exports = TwitterSearch;

/* EOF */