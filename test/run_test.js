var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var files = [
  "test/files/file1.txt",
  "test/files/file2.txt"
];

function readFiles (files) {

  var promises = [];
 
  files.forEach(function (file) {
    promises.push(fs.readFileAsync(file).then(function (text) {
      return text.toString();
    }));
  });

  return Promise.all(promises);

}

readFiles(files).then(function (text) {
//  console.log(text.join(''));
});
