# file-appender
[![Build Status](https://travis-ci.org/rodrigo-medeiros/file-appender.svg?branch=master)](https://travis-ci.org/rodrigo-medeiros/file-appender)
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

Licensed under the [MIT License](https://github.com/rodrigo-medeiros/file-appender/blob/master/LICENSE)
