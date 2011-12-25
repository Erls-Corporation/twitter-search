
// testing
var vows = require('vows');
var assert = require('assert');
var should = require('should');

// twitter-search core
var search = require('../lib/twitter-search');

vows.describe('general module tests').addBatch({
  'when instantiating twitter-search' : {
    topic:function() { 
      return search;
    },
    'search should be a function' : function (topic) {
      topic.should.be.a('function');
    },
  },
  'when performing a search without a config set' : {
    topic:function() {
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
}).describe('twitter search [basic]').addBatch({
  'when performing a search':{
    topic:function(){
      var config = {
        query : 'from:nodejs',
        regex : /node|mongo/gi,
        filter : /cancer/gi
      };
      search(config, this.callback);
    },
    'we should get back no errors':function(error, tweets, count){
      assert.isNull(error);
    },
    'tweets should be an object':function(error, tweets, count){
      tweets.should.be.a('object');
    },
    'count should be a number':function(error, tweets, count){
      count.should.be.a('number');
    }
  }
}).export(module);

/* EOF */