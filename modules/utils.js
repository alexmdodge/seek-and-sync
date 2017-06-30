/**
 * A number of pure utility functions that assist in setting up
 * the tool, as well as managing data between interactions.
 * 
 * @class Utils
 */
class Utils {

  /**
   * fixPath takes the user defined paths and returns a path relative
   * readable to the file system of the users local machine.
   * 
   * @param callPath is the location from where the package was called
   * @param userPath is the user specified path
   * @returns a machine readable path
   */
  static fixPath(callPath, userPath) {
    let fixedPath;
    if ( userPath.indexOf('.') === 0) {
      fixedPath = `${callPath}${userPath.substring(1)}`;
    } else if ( userPath.indexOf('/') === 0) {
      fixedPath = userPath;
    } else {
      fixedPath = `${callPath}${userPath}`;
    }
    return fixedPath;
  }
}

module.exports = Utils;