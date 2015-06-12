var fs = require('fs');
var path = require('path');
var FilePiper = require('./file-piper');

function _init (input) {

  if (Array.isArray(input)) {
    return input;

  } else {
    if (typeof input === 'string') {
      var inputAsArray = [];
      var stat = fs.statSync(input);

      if (stat.isFile()) {
        inputAsArray.push(input);

      } else {
        var files = fs.readDirSync(input);

        files.forEach(function (file) {
          var filePath = path.join(input, file);
          var stat = fs.statSync(filePath);

          if (stat.isFile()) {
            inputAsArray.push(filePath);

          }

        });

      }

      return inputAsArray;

    } else {
      throw new InputError(input + " is not a valid input.");
    }
  
  }

}

function _pipeNext (input, destination) {

  if (!input.length) {
    return destination; 

  } else {
    var file = input.shift();
    var readable = fs.createReadStream(file);

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