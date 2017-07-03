const utils = require('./utils.js');
const shell = require('shelljs');

/**
 * Function: fixPath
 * Test cases for fixPath function. Takes two input paths and 
 * converts them to a machine readable absolute path.
 */
describe('fixPath()', () => {
  let paths;
  beforeEach(() => {
    paths = {
      rootPathAbsolute: '/absolute/path',
      rootPathRelative: './relative/path',
      callPath: '/User/name/project',
      userPath: './sub/module',
      fixedPath: '/User/name/project/sub/module',
    }
  });

  test('absolute input does not change', () => {
    expect(utils.fixPath(paths.callPath, paths.rootPathAbsolute))
      .toBe(paths.rootPathAbsolute);
  });

  test('relative input should combine paths', () => {
    expect(utils.fixPath(paths.callPath, paths.userPath))
      .toBe(paths.fixedPath);
  });
});

/**
 * Function: findDir
 * Finds a sub directory within a root directory. Works
 * on a larger number of OS.
 */
describe('findDir()', () => {
  let parentPath, trueProjectName, falseProjectName;

  beforeEach(() => {
    parentPath = `${__dirname}/test`;
    trueProjectName = 'my-project';
    falseProjectName = 'faulty-project';
    shell.mkdir('-p',`${__dirname}/test/a/b/my-project/c/d`);
  });

  afterEach(() => {
    shell.rm('-R', `${__dirname}/test`);
  });

  test('should return a dir path longer than or equal to root', () => {
    expect(utils.findDir(parentPath, trueProjectName).length)
      .toBeGreaterThan(parentPath.length);
  });

  test('should return the same parent path when faulty', () => {
    expect(utils.findDir(parentPath, falseProjectName))
      .toEqual(parentPath);
  });
});
