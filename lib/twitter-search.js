
// core
var request = require("request");
var querystring = require("querystring");

// final results
var results = new Array();

// api base + path
var base = "http://search.twitter.com";
var path = "/search.json";

// filter out noise
function filter(pattern) {
  if (typeof(pattern) === "array" || typeof(pattern) === "object") {
    var newPatternString = "";
    pattern.forEach(function(item) {
      newPatternString += item + "|";
    });
    var fixedPatternString = newPatternString.replace(/.$/, "");
    pattern = new RegExp(fixedPatternString, "gi");
  } else {
    // function/regex
  }
  for (var j = 0; j < results.length; j++) {
    var testText = results[j].text.toString();
    var match = testText.search(pattern);
    if (match !== -1) {
      results.splice(j, 1);
      j--;
    };
  };
};

// process regex
function regex(pattern) {
  for (var j = 0; j < results.length; j++) {
    var testText = results[j].text.toString();
    var match = testText.search(pattern);
    if (match === -1) {
      results.splice(j, 1);
      j--;
    };
  };
};

// search iterative
module.exports = search = function(config, callback) {
  var returnedPages = 0;
  var totalPages = 15;
  for (var currentPage = 0; currentPage < totalPages; currentPage++) {
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
    if (currentPage === 0) {
      var page = base + path + "?" + querystring.stringify(params);
    } else {
      params["page"] = currentPage;
      var page = base + path + "?" + querystring.stringify(params);
    };
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
          // setup results
          for (result in page.results) {
            var tweet = page.results[result];
            results.push(tweet);
          };
          returnedPages++;
          // 15 page max, done.
          if (returnedPages === totalPages) {
            // here's where the magic begins
            // regex?
            if (config.regex) {
              if (typeof(config.regex) !== "string") {
                regex(config.regex);
              };
            };
            // filter?
            if (config.filter) {
              filter(config.filter);
            };
            callback(null, results, results.length);
            return;
          };
        };
      };
    });
  };
};

/* EOF */