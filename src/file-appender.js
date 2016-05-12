import util from "util";
import {Transform} from "stream";
util.inherits(FileAppender, Transform);

module.exports = FileAppender;

function FileAppender (options) {

  Transform.call(this, options);

}

FileAppender.prototype._transform = function (chunk, encoding, done) {

  this.push(chunk);
  done();

};