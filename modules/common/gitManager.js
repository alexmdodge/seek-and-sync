const shell = require('shelljs');
const utils = require('../common/utils.js');

const gitManager = {
  /**
   * Checks whether user wants to use git, and if
   * git is install on the local machine. Outputs
   * helpful messages if not.
   * 
   * @param hasGit whether user wants to use git
   * @returns true if user wants git and git exists
   */
  verifyGit(hasGit) {
    if (hasGit && !!shell.which('git')) {
      console.log('You have opted to use Git. Git valid on current machine.');
      return true;
    } else if (hasGit && !shell.which('git')) {
      console.log('Error: Git cannot be found on this machine. Please install in order to use Git operations.');
      return false;
    } else {
      console.log('You have opted out of using Git.');
      return false;
    }
  },

  /**
   * Return an array of all current branches of the
   * git repository path specified.
   * 
   * @param repoPath 
   * @returns array of current branches
   */
  async listBranches(repoPath) {
    const git = `git -C ${repoPath}`;
    return Promise((resolve, reject) => {
      shell.exec(`${git} branch`, (code, stdout, sterr) => {
        console.log(stdout.split('*').map(branch => branch.trim()));
        resolve(stdout)
      })
    })
  },

  /**
   * Changes the current branch of the project to the branch
   * specified. Will either switch to branch or create and switch
   * if it doesn't already exist.
   * 
   * @param {any} repoPath 
   * @param {any} branch 
   * @returns void
   */
  async changeBranch(repoPath, newBranch) {
    const git = `git -C ${repoPath}`;

    // Get current list of branches and return positive matches
    const branches = await this.listBranches(repoPath);
    branches.filter( branch => {
      return utils.matchValue(branch, newBranch);
    });

    return new Promise((resolve, reject) => {

      if (branches ) {
        // if exists switch, if not create new
        shell.exec(`${git} branch`, (code, stdout, sterr) => {
          console.log(stdout);
        });
      } else {
        shell.exec(`${git} checkout -b ${newBranch}`, (code, stdout, sterr) => {
          resolve(stdout);
        });
      }
    });
  }
}

module.exports = gitManager;