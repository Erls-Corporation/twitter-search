
// core
var request = require("request");
var querystring = require("querystring");
var memory = require("memory");
var Klout = require("node-klout");
Klout.key = process.env.KLOUT_KEY;

var regex;

// single page of tweets
function cursor(page, config, callback) {
  var results = new Array();
  var nextPage = null;
  request(page, function (error, response, body) {
    if (error) {
      callback(error, null, null);
    } else {
      var page = JSON.parse(body);
      if (page.error) {
        callback(null, null, null);
      } else {
        if (page.next_page) {
          nextPage = page.next_page;
        };
        for (i in page.results) {
          var tweets = page.results;
        };
        callback(null, nextPage, tweets);
      };
    };
  });
};

function getKlout(handle, i, callback) {
  Klout.getSingle(handle, function(error, klout) {
    if (error) {
      console.error(error); 
      } else {
          callback(i, klout);
      };
  }); 
};

// search iterative
module.exports = search = function(params, config, callback) {
  var base = "http://search.twitter.com";
  var path = "/search.json";
  var results = new Array();
  if (params.regex) {
    regex = params.regex;
    delete params.regex;
  };
  params["rpp"] = 100;
  function paginate(page) {
    if (!page) {
      var page = base + path + "?" + querystring.stringify(params);
    } else {
      var page = base + path + page;
    };
    cursor(page, config, function(error, nextPage, tweets) {
      if (results.length === 0) {
        results = tweets;
      } else {
        if (tweets !== null) {
          var tmp = results.concat(tweets);
          results = tmp;
          tmp = null;
        };
      };
      // check for more pages, otherwise...
      if (nextPage && config.singlePage !== true) {
        paginate(nextPage);
      } else {
        // filter?
        if (config.filter) {
          var words = config.filter;
          for (var i = 0; i < tweets.length; i++) {
            var result = results[i];
            var testText = result.text.toString();
            var m = testText.match(new RegExp(words.join("|"), "gi"));
            if (m !== null) {
              results.splice(i, 1);
              i--;
            };
          };
        };
        // regex?
        if (regex !== undefined) {
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
        // klout?
        if (config.klout === true) {
          var received = 0;
          for (var i = 0; i < results.length; i++) {
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
              
            })
          };
        } else if (config.sorting) {
          results.sort(config.sorting);
          callback(null, results, results.length);
        };
      };
    });
  };
  paginate();
};

/* EOF */
