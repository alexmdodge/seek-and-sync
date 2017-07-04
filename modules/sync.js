const configManager = require('./common/configManager.js');

/**
 * This file procedurally walks through each step of the
 * sync process to ensure an accurate copy of user data.
 * 
 * The sync type is all referenced from the current directory where
 * configuration is located. So it is either pull from parent or
 * push to parent. Parent is in some way considered a remote 
 * repository.
 *
 * @param conf configuration object from .snsrc
 * @param syncType which sync operation to perform, either push or pull
 */
module.exports = function(conf, syncType) {
  configManager.verifyConfiguration(conf);
  const hasGit = configManager.verifyGit(conf.git);
  
  if ( hasGit ) {
    gitManager.updateBranches(conf.parent_path);
    gitManager.pullBranches(conf.parent_path);

    // Copy operations for Git dependent
    gitManager.copyTo(conf.parent_path, syncType);
    gitManager.status(conf.parent_path);
  } else {
    dirManager.backup(conf.parent_path, syncType);
    dirManager.copyTo(conf.parent_path, syncType);
    dirManager.status(conf.parent_path);
  }
}