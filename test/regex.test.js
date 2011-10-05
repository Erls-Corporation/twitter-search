
// testing
var vows = require("vows");
var assert = require("assert");
var should = require("should");

// twitter-search core
var search = require("../");

vows.describe("RegEx Tests").addBatch({
  "When performing a search with a regex looking for node or mongo which I'm always talking about" : {
    topic : function() {
      var config = {
        query : "from:kisshotch",
        regex : /node|mongo/gi
      };
      search(config, this.callback);
    },
    "We should get back no errors" : function(error, tweets, count) {
      assert.isNull(error);
    },
    "tweets should be an object" : function(error, tweets, count) {
      tweets.should.be.a("object");
    },
    "count should be a number" : function(error, tweets, count) {
      count.should.be.a("number");
    },
    "Result set should not be empty" : function(error, tweets, count) {
      tweets.should.not.be.empty;
    }
  }
}).export(module);

/* EOF */