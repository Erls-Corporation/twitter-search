
// testing
var vows = require("vows");
var assert = require("assert");
var should = require("should");

// twitter-search core
var search = require("../");

// wrapped search for testing
function search() {
  var work = ["module","node"];
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
};

vows.describe("Basic Twitter-Search module tests").addBatch({
  "when instantiating twitter-search" : {
    topic : function() { 
      return search;
    },
    "search should be a function" : function (topic) {
      topic.should.be.a("function");
    }
  }
}).export(module);

/* EOF */