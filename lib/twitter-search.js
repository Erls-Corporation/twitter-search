
// twitter-search

(function(global, undefined) {
	var request = require("request");
	var querystring = require("querystring");
	module.exports = search = function(params, callback) {
		var base = "http://search.twitter.com";
		var path = "/search.json";
		var tweets = [];
		var currentCount = 1;
		var totalCount = 16;
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
			   			callback(null, tweets, tweets.length);
			   		}; 	
			  	};
			});
		};
		// queue up to 15 pages of results
		for (var i = 1; i < totalCount; i++) {
			if (i === 1) {
				params["rpp"] = 100;
				var page = base + path + "?" + querystring.stringify(params);
			} else {
				params["page"] = i;
				params["rpp"] = 100;
				var page = base + path + "?" + querystring.stringify(params);
			};
			//console.log(page);
			cursor(page);
		};
	};
})(global);

/* EOF */