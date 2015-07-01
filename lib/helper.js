var fs = require('fs');
var path = require('path');

exports.init = init;
exports.pipeNext = pipeNext;

function init (input) {

  if (Array.isArray(input)) {
    return input;

  } else {
    var inputAsArray = [];

    if (typeof input === 'string') {

      if (input) {
        var stat = fs.statSync(input);

        if (stat.isFile()) {
          inputAsArray.push(input);

        } else {
          var files = fs.readdirSync(input);

          files.forEach(function (file) {
            var filePath = path.join(input, file);
            var stat = fs.statSync(filePath);

            if (stat.isFile()) {
              inputAsArray.push(filePath);

            }

          });

        }

      }

      return inputAsArray;

    } else {
      throw new TypeError(input + " is not a valid input.");

    }
  
  }

}

function pipeNext (input, destination) {

  if (!input.length) {
    destination.end();
    return destination; 

  } else {
    var file = input.shift();
    var readable = fs.createReadStream(file);

    return readable
      .on('error', function (err) {
        if (err.code === 'ENOENT') {
          pipeNext(input, destination);

        } 
        
      })
      .on('end', function () {
        pipeNext(input, destination);

      })
      .pipe(destination, { end: false });

  }
}
