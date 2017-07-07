const shell = require('shelljs');

/**
 * A number of pure utility functions that assist in setting up
 * the tool, as well as managing data between interactions.
 */
const utils = {

  /**
   * fixPath takes the user defined paths and returns a path relative
   * readable to the file system of the users local machine.
   * 
   * @param callPath is the location from where the package was called
   * @param userPath is the user specified path
   * @returns a machine readable path
   */
  fixPath(callPath, userPath) {
    let fixedPath;
    if ( userPath.indexOf('.') === 0) {
      fixedPath = `${callPath}${userPath.substring(1)}`;
    } else if ( userPath.indexOf('/') === 0) {
      fixedPath = userPath;
    } else {
      fixedPath = `${callPath}${userPath}`;
    }
    return fixedPath;
  },

  /**
   * Navigates the current directory structure provided
   * to determine if dirName is present in the parent
   * path.
   * 
   * @param parentPath 
   * @param dirName 
   * @returns dirName absolute path, or parent path
   */
  findDir(parentPath, dirName) {
    const dirPath = shell.find(parentPath).filter((path) => {
      const dirPos = path.indexOf(dirName);
      const lastPos = path.length - dirName.length;
      return (dirPos === lastPos);
    });

    if (dirPath.length === 0) {
      return parentPath;
    } else {
      return dirPath[0];
    }
  },

  /**
   * Matches a string for a single test value
   * or an array of values.
   * 
   * @param value string to test against
   * @param tests single or array of test values to check
   * @param ignoreCase whether to ignore or pay attention to case
   * @returns true if one of tests values found
   */
  matchValue(value, tests, ignoreCase = true) {
    if (typeof tests === 'string') {
      tests = [ tests ];
    }
    let matched = false;
    for (let test of tests) {
      const conditions = ignoreCase ? 'ig' : 'g';
      const testRegex = new RegExp(`${test}`, conditions);
      if (value.match(testRegex)) {
        matched = true;
      }
    }
    return matched;
  }
}

module.exports = utils;