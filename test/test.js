var expect = require('expect.js');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var stream = require('stream');
var appender = require('../index');

var dirPath = path.join(__dirname, "/files");
var files = [
  path.join(dirPath, "file1.txt"),
  path.join(dirPath, "file2.txt")
];

describe("", function () {

  var contents = "";

  before(function (done) {

    readFiles(files).then(function (contentsArr) {
      contents = contentsArr.join('');
      done();
    });

  });

  describe("When an array of valid files is passed", function () {

    it("should create a transform stream", function (done) {

      var filesArr = [].slice.call(files, 0);
      var transformStream = appender(filesArr);

      expect(transformStream instanceof stream.Transform).to.be(true);
      done();

    });

    it("should create a file with the contents of the files passed if piped to a write stream", function (done) {

      var filesArr = [].slice.call(files, 0);
      var transformStream = appender(filesArr);
      var output = fs.createWriteStream(path.join(dirPath, 'output.txt'));

      transformStream 
        .pipe(output)
        .on('finish', function () {

          fs.readFileAsync(path.join(dirPath, 'output.txt')).then(function (text) {

            expect(contents).to.be(text.toString());
            done();

          }).catch(function (err) {

            done(err);

          });

        });

    });

  });

});

function readFiles (files) {

  var promises = [];
 
  files.forEach(function (file) {
    promises.push(fs.readFileAsync(file).then(function (text) {
      return text.toString();
    }));
  });

  return Promise.all(promises);

}
