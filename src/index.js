import FileAppender from "./file-appender";
import helper from "./helper";

module.exports = appender;

function appender (input) {

  if (!(input = helper.init(input)).length) {
    return;

  }

  var destination = new FileAppender();

  return helper.pipeNext(input, destination);

}
