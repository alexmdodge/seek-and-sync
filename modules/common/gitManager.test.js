const gitManager = require('./gitManager.js');
const shell = require('shelljs');
const common = require('common-tags');

/**
 * Initializes a test Git project with branches
 * and information for testing git related operations.
 */
async function initializeGitRepo(repo, ...branches) {
  const path = `${__dirname}/${repo}`;
  const git = `git -C ${path}`;
  const gitSetup = common.oneLine`
    ${git} init &&
    ${git} add --all &&
    ${git} commit -m 'init' &&
    ${git} checkout -b ${branches[0]}
  `;

  return new Promise((resolve, reject) => {
    shell.mkdir(path);
    shell.touch(`${path}/a.c`);

    // Note that sterr still reports information for some commands
    // regardless of error. Must check return for error in string
    shell.exec(gitSetup, (code, stdout, sterr) => {
      const regex = new RegExp('error', 'ig');
      if (regex.test(sterr)) {
        reject(`(Test Structure): ${sterr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function initializeLocalRemote() {
  const testRemoteRepo = `.remote`;
  await initializeGitRepo('.remote', 'remote');
  return testRemoteRepo;
}

async function currentBranch(path) {
  return new Promise(resolve => {
    shell.exec(
      `git -C ${path} rev-parse --abbrev-ref HEAD`,
      (code, stdout, sterr) => {
        resolve(stdout);
      }
    );
  });
}

function clearTestRepos(...repos) {
  for (let repo of repos) {
    shell.rm('-rf', `${__dirname}/${repo}`);
  }
}

/**
 * Function: verifyGit
 * Based on a boolean of whether the user would like to use
 * git, check and verify git is operational.
 */
describe('verifyGit()', () => {
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
  /* Cross test variables */
  const testProject = '.project';
  const testRemote = '.remote';
  const testBranch = 'develop';
  let projectPath = `${__dirname}/${testProject}`;
  beforeEach(() => {
    return initializeGitRepo(testProject, testBranch);
  });
  afterEach(() => {
    return clearTestRepos(testProject);
  });
  test('should change the branch of the desired project to the desired branch', async () => {
    expect.assertions(1);
    const beforeBranch = await currentBranch(projectPath);
    await expect(
      gitManager.changeBranch(projectPath, testBranch)
    ).resolve.toBeFalsy();
  });
});

/**
 * Function: listBranches
 * Takes a path to a git repository and returns a list of the 
 * current available branches
 */
describe('listBranches()', () => {
  const testProject = `.project`;
  const testBranch = 'develop';
  const projectPath = `${__dirname}/${testProject}`;
  beforeEach(() => {
    return initializeGitRepo(testProject, testBranch);
  });
  afterEach(() => {
    return clearTestRepos(testProject);
  });
  test('should return an array', async () => {
    expect.assertions(1);
    const branches = await gitManager.listBranches(projectPath);
    expect(branches instanceof Array).toBeTruthy();
  });
  test('should have length equal to number of branches instantiated', async () => {
    expect.assertions(1);
    const branches = await gitManager.listBranches(projectPath);
    expect(branches.length).toEqual(2);
  });
  test('should contain created branch', async () => {});
});
