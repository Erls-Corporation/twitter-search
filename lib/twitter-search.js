
var regex;
var request = require("request");
var querystring = require("querystring");
var memory = require("memory");

var base = "http://search.twitter.com";
var path = "/search.json";
var currentCount = 1;
var totalCount = 16;

// single page of tweets
function cursor(page, callback) {
	var results = new Array();
	var nextPage = null;
	request(page, function (error, response, body) {
		if (error) {
			callback(error, null, null);
		} else {
			var page = JSON.parse(body);
			if (page.next_page) {
				nextPage = page.next_page;
			}
			for (i in page.results) {
				var tweets = page.results;
			};
			if (regex === null) {
				callback(null, nextPage, tweets);
			} else {
				for (tweet in tweets) {
					var tweetBody = tweets[tweet].text;
					var result = tweetBody.search(regex);
					if (result !== -1) {
						results.push(tweets[tweet]);
					};
				}
				callback(null, nextPage, results);
			};
		};
	});
};

// search iterative
module.exports = search = function(params, config, callback) {
	if (params.regex) {
		regex = params.regex;
		delete params.regex;
	};
	params["rpp"] = 100;
	var page = base + path + "?" + querystring.stringify(params);
	cursor(page, function(error, nextPage, tweets) {
		callback(null, tweets, tweets.length);
	});
};

/* EOF */