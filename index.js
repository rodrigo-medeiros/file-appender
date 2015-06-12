var FilePiper = require('./lib/file-piper');
var helper = require('./lib/helper');

module.exports = filePiper;

function filePiper (input) {

  var destination = new FilePiper();

  return helper.pipeNext(input, destination);

}
