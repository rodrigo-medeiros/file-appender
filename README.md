# file-appender
[![travis build](https://img.shields.io/travis/rodrigo-medeiros/file-appender.svg?style=flat-square)](https://travis-ci.org/rodrigo-medeiros/file-appender)
[![codecov coverage](https://img.shields.io/codecov/c/github/rodrigo-medeiros/file-appender.svg?style=flat-square)](https://codecov.io/github/rodrigo-medeiros/file-appender)
[![version](https://img.shields.io/npm/v/file-appender.svg?style=flat-square)](http://npm.im/file-appender)
[![downloads](https://img.shields.io/npm/dm/file-appender.svg?style=flat-square)](http://npm-stat.com/charts.html?package=file-appender&from=2015-07-01)
[![MIT License](https://img.shields.io/npm/l/file-appender.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
> Pipe a list of files to a transform stream.

Sometimes you have a lot of files, and want to pipe them all to a writable `stream`. Instead of writing code, having to care about edge cases and everything, just use `file-appender`.

## Install

```shell
npm install file-appender
```

## Usage

Pipe a list of files to an output file:

```javascript
var appender = require('file-appender');

var output = require('fs').createWriteStream('./output.txt');

appender(['./foo.txt', './bar.txt']).pipe(output);
```
It also works if you pass a path to a directory, like:

```javascript
appender('./someDir').pipe(output);
```
It won't check if the files in the respective directory are text files, or even another directory. In this case, make sure it contains just the files you want to pipe.

It doesn't make much sense to do this, but it still work if you pass just a string with the path to a single file:

```javascript
appender('./foo.txt').pipe(output);
```

## License

Licensed under the [MIT license](http://opensource.org/licenses/MIT)

