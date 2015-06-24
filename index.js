var FileAppender = require('./lib/file-appender');
var helper = require('./lib/helper');

module.exports = appender;

function appender (input) {

  var destination = new FileAppender();

  return helper.pipeNext(input, destination);

}
