
var search = require("twitter-searh");

var work = [
	"module",
	"node",
	"js",
	"klout",
	"github",
	"mongo",
	"api",
	"npm",
	"startup",
	"twitter",
	"facebook",
];

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

/* EOF */