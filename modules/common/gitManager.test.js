const gitManager = require('./gitManager.js');
const shell = require('shelljs');

/**
 * Function: verifyGit
 * Based on a boolean of whether the user would like to use
 * git, check and verify git is operational.
 */
describe('verifyGit', () => {
  let useGit = false;
  let gitInstalled = !!shell.which('git');

  test('should return a boolean', () => {
    expect(typeof gitManager.verifyGit(true)).toEqual('boolean');
  });
  test('should return false is not using git', () => {
    expect(gitManager.verifyGit(useGit)).toEqual(useGit);
  });
  test('should return true if using git and git enabled, or false if not enabled', () => {
    expect(gitManager.verifyGit(true)).toEqual(gitInstalled);
  });
});