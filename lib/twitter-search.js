
// twitter-search

(function(global, undefined) {
	var regex;
	var request = require("request");
	var memory = require("memory");
	var querystring = require("querystring");
	var Klout = require("node-klout");
	Klout.key = "cgs5847scr7q3pb7745kbu52";
	var base = "http://search.twitter.com";
	var path = "/search.json";
	var tweets = [];
	var currentCount = 1;
	var totalCount = 16;
	function kloutify(newTweets, callback) {
		callback(newTweets);
		var j = 0;
		for (tweet in newTweets) {
			Klout.klout(newTweets[tweet].from_user, function(error, klout) {
				console.log(j);
				if (error) {
					console.error(error); 
				} else {
        			newTweets[tweet].klout = klout;
    			};
    			j++;
    			if (j === newTweets.length) {
    				callback(newTweets);
    			};
			});
		};
	};
	module.exports = search = function(params, config, callback) {
		function cursor(page) {
			request(page, function (error, response, body) {
				if (error) {
					callback(error, null, null);
				} else {
			  		var page = JSON.parse(body);
			   		for (i in page.results) {
			   			var tweet = page.results[i];
			   			tweets.push(tweet);
			   		};
			   		currentCount++;
			   		if (currentCount === totalCount) {
			   			// check for regex
			   			if (regex === null) { 
			   				callback(null, tweets, tweets.length);
			   			} else {
			   				var results = [];
			   				for (tweet in tweets) {
			   					var tweetBody = tweets[tweet].text;
			   					var result = tweetBody.search(regex);
			   					if (result !== -1) {
			   						results.push(tweets[tweet]);
			   					};
			   				};
			   				tweets = results;
			   				// no config options
			   				if (!config) {
			   					callback(null, tweets, tweets.length);
			   				} else {
			   					if (config.klout === true) {
			   						kloutify(tweets, function(resultingTweets) {
			   							callback(null, resultingTweets, resultingTweets.length);
			   						});
			   					};
			   				};
			   			};
			   		}; 	
			  	};
			});
		};
		// queue up to 15 pages of results
		for (var i = 0; i < totalCount; i++) {
			if (params.regex) {
				regex = params.regex;
				delete params.regex;
			};
			if (i === 1) {
				params["rpp"] = 100;
				var page = base + path + "?" + querystring.stringify(params);
			} else {
				params["page"] = i;
				params["rpp"] = 100;
				var page = base + path + "?" + querystring.stringify(params);
			};
			cursor(page);
		};
	};
})(global);

/* EOF */