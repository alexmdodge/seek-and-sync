const configManager = require('../common/configManager.js');

module.exports = function(conf) {
  console.log('-- Sync Started --');

  configManager.verifyConfiguration(conf);
  

  // perform check for git
  // if git, then confirm branch
  // on local confirm branch after pull

  // if git, copy changes to new branch, force merge conflict
  
}