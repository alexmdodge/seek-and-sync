const shell = require('shelljs');

const gitManager =  {
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
  }
}

module.exports = gitManager;