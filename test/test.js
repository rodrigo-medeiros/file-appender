var expect = require('expect.js');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var stream = require('stream');
var appender = require('../src/index');
var exec = require('child_process').exec;

var dirPath = path.join(__dirname, "/files");
var files = [
  path.join(dirPath, "file1.txt"),
  path.join(dirPath, "file2.txt")
];

describe("When an array of valid files is passed", function () {

  var contents = "";

  before(function (done) {

    readFiles(files).then(function (contentsArr) {
      contents = contentsArr.join('');
      done();
    });

  });

  after(function (done) {

    removeOutputFile(done);

  });

  it("should create a transform stream", function (done) {

    var filesArr = [].slice.call(files);
    var transformStream = appender(filesArr);

    expect(transformStream instanceof stream.Transform).to.be(true);
    done();

  });

  it("should create a file with the contents of the files inside the dir path passed if piped to a write stream", function (done) {

    var transformStream = appender(dirPath);
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

describe("When an array of valid and non-valid files is passed", function () {

  var contents = "";

  before(function (done) {

    readFiles(files).then(function (contentsArr) {
      contents = contentsArr.join('');
      done();
    });

  });

  it("should create a file with the contents of the files inside the dir path passed if piped to a write stream", function (done) {

    var transformStream = appender(dirPath);
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

  after(function (done) {

    removeOutputFile(done);

  });

  it("should create a transform stream", function (done) {

    files.push('/foo/bar.txt')
    var filesArr = [].slice.call(files);
    var transformStream = appender(filesArr);

    expect(transformStream instanceof stream.Transform).to.be(true);
    files.pop();
    done();

  });

});

describe("When just a dir path is passed", function () {

  var contents = "";

  before(function (done) {

    readFiles(files).then(function (contentsArr) {
      contents = contentsArr.join('');
      done();
    });

  });

  after(function (done) {

    removeOutputFile(done);

  });

  it("should create a transform stream", function (done) {

    var filesArr = [].slice.call(files);
    var transformStream = appender(filesArr);

    expect(transformStream instanceof stream.Transform).to.be(true);
    done();

  });

  it("should create a file with the contents of the files passed if piped to a write stream", function (done) {

    var filesArr = [].slice.call(files);
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

describe("When just a file path is passed", function () {

  var contents = "";

  before(function (done) {

    files.pop();

    readFiles(files).then(function (contentsArr) {
      contents = contentsArr.join('');
      done();
    });

  });

  after(function (done) {

    removeOutputFile(done);

  });
  
  it("should create a transform stream", function (done) {

    var filePath = path.join(dirPath, "file1.txt");
    var transformStream = appender(filePath);

    expect(transformStream instanceof stream.Transform).to.be(true);
    done();

  });

  it("should create a file with the contents of the file passed if piped to a write stream", function (done) {

    var filePath = path.join(dirPath, "file1.txt");
    var transformStream = appender(filePath);
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

describe("When invalid stuff is passed", function () {
  
  it("should throw an error for null", function (done) {

    expect(appender).to.throwException();
    done();

  });

  it("should return undefined for empty string", function (done) {

    expect(appender("")).to.not.be.ok();
    done();

  });

  it("should return undefined for empty array", function (done) {

    expect(appender([])).to.not.be.ok();
    done();

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

function removeOutputFile (done) {
  exec("rm ./test/files/output.txt", function (error, stdout, sdterr) {
    if (error) return done(error);
    done();
  });
}
