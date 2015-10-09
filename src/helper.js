import fs from 'fs';
import path from 'path';

exports.init = init;
exports.pipeNext = pipeNext;

function init (input) {

  if (Array.isArray(input)) {
    return [].slice.call(input);

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
            var stats = fs.statSync(filePath);

            if (stats.isFile()) {
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
