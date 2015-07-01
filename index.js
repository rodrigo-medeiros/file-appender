var FileAppender = require('./lib/file-appender');
var helper = require('./lib/helper');

module.exports = appender;

function appender (input) {

  if (!(input = helper.init(input)).length) {
    return;

  }

  var destination = new FileAppender();

  return helper.pipeNext([].slice.call(input), destination);

}
