var fs = require('fs');
var util = require('util');
var Transform = require('stream').Transform;
util.inherits(FileAppender, Transform);

module.exports = FileAppender;

function FileAppender (options) {

  if (!(this instanceof FileAppender)) {
    return new FileAppender(options);

  }
  
  Transform.call(this, options);

}

FileAppender.prototype._transform = function (chunk, encoding, done) {

  this.push(chunk);
  done();

};
