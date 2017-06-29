#! /usr/bin/env node
/**
 * Bumps version of specific files within the package
 * for readability and cross-checking purposes.
 */
var fs = require('fs');
var bump = require('bump-regex');

var options = {
  type: process.argv[2],
  key: 'version',
}

var fileList = [
  './index.js',
]

var buffer;
fileList.forEach(file => fs.readFile(file, 'utf8', (err, data) => {
  options.str = data;
  bump(options, (err, out) => {
    console.log(err, out);
    fs.writeFile(file, out.str, err => console.log(err));
  })
}));

// bump(option, (err, out) => {
//   console.log(err);
//   console.log(out);
// });