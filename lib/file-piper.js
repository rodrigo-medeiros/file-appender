var fs = require('fs');
var util = require('util');
var Transform = require('stream').Transform;
util.inherits(FilePiper, Transform);

module.exports = filePiper;

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

function _pipeNext (input, destination) {

  if (!input.length) {
    return destination; 

  } else {
    var file = input.shift(),
        readable = fs.createReadStream(file);

    return readable
      .on('error', function (err) {
        if (err.code === 'ENOENT') {
          _pipeNext(input, destination);

        } 
        
      })
      .on('end', function () {
        _pipeNext(input, destination);

      })
      .pipe(destination, { end: false });

  }
}

function filePiper (input) {

  var destination = new FilePiper();

  return _pipeNext(input, destination);

}
