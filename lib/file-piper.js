var fs = require('fs');
var util = require('util');
var Transform = require('stream').Transform;
util.inherits(FilePiper, Transform);

module.exports = FilePiper;

function FilePiper (options) {

  if (!(this instanceof FilePiper)) {
    return new FilePiper(options);

  }
  
  Transform.call(this, options);

}

FilePiper.prototype._transform = function (chunk, encoding, done) {

  this.push(chunk);
  done();

};
