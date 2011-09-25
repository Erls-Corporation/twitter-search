
// just grabs current memory usage
(function(global, undefined) {
	module.exports =  memory = function() {
		var kDec = 2;
		var memoryObj = process.memoryUsage();
		var bytes = parseInt(memoryObj.rss);
		if (bytes) {
			var MBytes = bytes / (1024*1024);
			var roundedMegabytes = Math.round(MBytes*Math.pow(10,kDec))/Math.pow(10,kDec);
			var MB = roundedMegabytes.toString() + " MB";
			return MB;
		}
	}
})(global);