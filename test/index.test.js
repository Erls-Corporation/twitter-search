
// full auto, thanks testosterone.
var fullauto = require("fullauto");
var should = fullauto.should;
var search = require("../");

fullauto.add("WHEN I CHECK if 'search' is of type function THEN it SHOULD", function() {
	search.should.be.a("function");
});

fullauto.run();