const configManager = require('./common/configManager.js');
const gitManager = require('./common/gitManager.js');

/**
 * This file procedurally walks through each step of the
 * sync process to ensure an accurate copy of user data.
 * 
 * The sync type wording is in reference to the local directory
 * where this module is installed. So it is either pull from parent or
 * push to parent. Parent is in some way considered a remote 
 * repository.
 *
 * @param conf configuration object from .snsrc
 * @param syncType which sync operation to perform, either push or pull
 */
module.exports = async function(conf, syncType) {
  await configManager.verifyConfiguration(conf);
  const hasGit = gitManager.verifyGit(conf.git);
  
  if ( hasGit ) {
    gitManager.changeBranch(conf.parent_path, conf.parent_branch);
    // gitManager.pullRecent(conf.path, conf.parent_path);

    // // Copy operations for Git dependent
    // gitManager.copyTo(conf.parent_path, syncType);
    // gitManager.status(conf.parent_path);
  } else {
    // dirManager.backup(conf.parent_path, syncType);
    // dirManager.copyTo(conf.parent_path, syncType);
    // dirManager.status(conf.parent_path);
  }
}