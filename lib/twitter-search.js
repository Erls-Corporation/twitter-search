
// core
var request = require("request");
var querystring = require("querystring");
var memory = require("memory");
var Klout = require("node-klout");
Klout.key = process.env.KLOUT_KEY;

// final results
var results = new Array();

// api base + path
var base = "http://search.twitter.com";
var path = "/search.json";

// get single users Klout
function getKlout(handle, i, callback) {
  Klout.getSingle(handle, function(error, klout) {
    if (error) {
      console.error(error); 
      } else {
          callback(i, klout);
      };
  }); 
};

// process resulting tweets klout
function processKlout(tweets, callback) {
  var received = 0;
  for (var i = 0; i < tweets.length; i++) {
    var result = results[i];
    var handle = result.from_user;
    getKlout(handle, i, function(i, klout) {
      results[i].klout = klout;
      received++;
      if (received === results.length) {
        // sort?
        if (config.sorting) {
          results.sort(config.sorting);
        };
        callback(null, results, results.length);
      };
    });
  };
};

// filter out noise
function filter(tweets, filters) {
  var returnResults = [];
  for (var i = 0; i < tweets.length; i++) {
    var tweet = tweets[i];
    var testText = tweet.text.toString();
    var m = testText.match(new RegExp(words.join("|"), "gi"));
    if (m !== null) {
      results.splice(i, 1);
      i--;
    };
  };
};

// process regex
function regex(tweets, regex) {
  if (typeof(regex) === "string") {
    regex = new RegExp(regex);  
  };
  for (var j = 0; j < results.length; j++) {
    var result = results[j];
    var testText = result.text.toString();
    var result = testText.search(regex);
    if (result === -1) {
      tweets.splice(j, 1);
      j--;
    };
  };
};

// search iterative
module.exports = search = function(config, callback) {
  if (config === null) {
    callback({ message : "config needs to be defined!" }, null, null);
    return;
  };
  // twitter search params for querystring setup
  var params = {
    q : config.query,
    rpp : 100
  };
  // setup querystring param
  var page = base + path + "?" + querystring.stringify(params);
  request(page, function (error, response, body) {
    if (error) {
      callback(error, null, null);
      return;
    } else {
      var page = JSON.parse(body);
      if (page.error) {
        callback(page.error, null, null);
        return;
      } else {
        for (result in page.results) {
          var tweet = page.results[result];
          results.push(tweet);
        };
        callback(null, results, results.length);
        return;
      };
    };
  });
};

/* EOF */