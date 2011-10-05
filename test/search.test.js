
// testing
var vows = require("vows");
var assert = require("assert");
var should = require("should");

// twitter-search core
var search = require("../");

vows.describe("Twitter Searches").addBatch({
  "when performing a search" : {
    topic : function() {
      var config = {
        filter : ["node", "mongo"],
        query : "from:kisshotch"
      };
      search(config, this.callback);
    },
    "we should get back no errors" : function(error, tweets, count) {
      assert.isNull(error);
    },
    "tweets should be an object" : function(error, tweets, count) {
      tweets.should.be.a("object");
    },
    "count should be a number" : function(error, tweets, count) {
      count.should.be.a("number");
    }
  }
}).export(module);

/* EOF */