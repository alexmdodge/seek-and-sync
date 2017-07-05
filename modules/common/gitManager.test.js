const gitManager = require('./gitManager.js');
const shell = require('shelljs');

/* Cross test variables */
const testPath = `${__dirname}/.tmp`;

/**
 * Helper functions for setup and teardown
 */
function initializeGitDir() {
  return new Promise((resolve, reject) => {
    // create directory with file
    shell.mkdir(testPath);
    shell.touch(`${testPath}/a.c`);
    shell.exec(`git -C ${testPath} init`, (code, stdout, sterr) => {
      if ( sterr) {
        reject(sterr);
      }
      shell.exec(`git -C ${testPath} add --all`, (code, stdout, sterr) => {
        if (sterr ) {
          reject(sterr);
        }
        shell.exec(`git -C ${testPath} commit -m 'init'`, (code, stdout, sterr) => {
          if (sterr) {
            reject(sterr);
          }
          console.log(stdout);
          resolve(true);
        });
      });
    });
  });
}

/**
 * Function: verifyGit
 * Based on a boolean of whether the user would like to use
 * git, check and verify git is operational.
 */
describe('verifyGit', () => {
  let gitInstalled = !!shell.which('git');

  test('should return a boolean', () => {
    expect(typeof gitManager.verifyGit(true)).toEqual('boolean');
  });
  test('should return false when not using git', () => {
    expect(gitManager.verifyGit(false)).toBeFalsy();
  });
  test('should return true if using git and git enabled, or false if not enabled', () => {
    expect(gitManager.verifyGit(true)).toEqual(gitInstalled);
  });
});

/**
 * Function: changeBranch
 * Takes a valid path to a Git project and a desired branch
 * to confirm. If branch is currently not active will
 */
describe('changeBranch()', () => {
  let testBranch = 'develop';
  beforeAll(() => {
    return initializeGitDir();
  })
  test('should return old branch if unsuccessful', () => {
    expect
  });
  afterAll(() => {
    shell.rm('-R', `${__dirname}/.tmp`);
  });
});