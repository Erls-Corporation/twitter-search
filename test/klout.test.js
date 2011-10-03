
// testing
var vows = require("vows");
var assert = require("assert");
var should = require("should");

// twitter-search core
var search = require("../");

vows.describe("Klout Scores").addBatch({
  "when performing a search with klout : true" : {
    topic : function() {
      var myConfig = {
        filter : null,
        klout : true,
        singlePage : true
      };
      var myQuery = {q : "from:kisshotch", regex : /^/ };
      search(myQuery, myConfig, this.callback);
    },
    "we should get back objects with a .klout attribute" : function(error, tweets, count) {
      assert.isNull(error);
    }
  }
}).export(module);

/* EOF */