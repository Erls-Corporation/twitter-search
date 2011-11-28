
// testing
var vows = require("vows");
var assert = require("assert");
var should = require("should");

// twitter-search core
var search = require("../lib/twitter-search");

vows.describe("Noise Filter").addBatch({
  "When performing a search with a noise filter that is an 'Array' of length of 1 only" : {
    topic : function() {
      var config = {
        query : "from:nodejs",
        regex : /node|mongo/gi,
        filter : ["cancer"]
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
    },
    "result set should not be empty" : function(error, tweets, count) {
      tweets.should.not.be.empty;
    }
  }
}).export(module);

/* EOF */