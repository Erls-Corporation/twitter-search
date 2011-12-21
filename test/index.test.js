
// testing
var vows = require('vows');
var assert = require('assert');
var should = require('should');

// twitter-search core
var search = require('../lib/twitter-search');

vows.describe('General Module Tests').addBatch({
  'when instantiating twitter-search' : {
    topic : function() { 
      return search;
    },
    'search should be a function' : function (topic) {
      topic.should.be.a('function');
    },
  },
  'when performing a search without a config set' : {
    topic : function() {
      search(null, this.callback);
    },
    'should have error errors' : function(error, tweets, count) {
      assert.isNotNull(error);
    },
    'should receive error message \'config needs to be defined!\'': function(error, tweets, count) {
      assert.equal(error.message, 'config needs to be defined!');
    },
    'tweets should be null' : function(error, tweets, count) {
      assert.isNull(tweets);
    },
    'count should be null' : function(error, tweets, count) {
      assert.isNull(count);
    }
  }
}).export(module);

/* EOF */