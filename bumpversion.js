#! /usr/bin/env node
/**
 * Bumps version of specific files within the package
 * for readability and cross-checking purposes.
 */

var bump = require('bump-regex');

console.log(process.argv);

// var options = {
//   type: process.argv[1],
//   key: 'version',

// }

// bump(options, function(err, out) {
//   console.log(err);
//   console.log(out);
// });