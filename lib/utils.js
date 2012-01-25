
/*!
  Filter out noise based on a pattern
  @param {RegExp OR Array} pattern 
  @returns null;
*/

exports.filter = function(pattern) {
  if (belt.typeOf(pattern) !== 'regexp') {
    pattern = belt.arrayToRegExp(pattern);
  };
  for (var j = 0; j < results.length; j++) {
    var testText = results[j].text.toString();
    var match = testText.search(pattern);
    if (match !== -1) {
      results.splice(j, 1);
      j--;
    };
  };
};

/*!
  If result does not match pattern,
  then remove that tweet from the results.
  @param {RegExp OR Array} pattern 
  @returns null;
*/

exports.regex = function(pattern) {
  if (belt.typeOf(pattern) !== 'regexp') {
    pattern = belt.arrayToRegExp(pattern);
  };
  for (var j = 0; j < results.length; j++) {
    var testText = results[j].text.toString();
    var match = testText.search(pattern);
    if (match === -1) {
      results.splice(j, 1);
      j--;
    };
  };
};

/* EOF */