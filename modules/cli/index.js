/**
 * CLI Configuration and Tool Functionality
 */
const program = require('commander');
const common = require('common-tags');
const chalk = require('chalk');
const sync = require('../operations/sync.js');
const utils = require('../common/utils.js');
const package = require('../../package.json');

module.exports = function(conf) {
  let space = () => console.log('');

  program
    .version(package.version)
    .description(`
    ${chalk.green('Seek and Sync')} is a tool for managing the sharing of modules 
    between rapidly changing projects.
    `);

  program
    .command('config')
    .description(`List and manage the configuration of the project.`)
    .action(function(key) {
      space();
      console.log(common.oneLineTrim`
        Based on the ${chalk.bold('.snsrc')} file you provided, your 
        configuration is,
      `);

      Object.keys(conf).map(key => {
        console.log(`  • ${chalk.blue(key)}: ${conf[key]}`);
      });
      space();
    });

    program
    .command('sync')
    .description(common.oneLine`
      Check for updates in parent directory and pull changes into 
      current module.
    `)
    .option('-p, --parent-path <path>', 'Specify explicit path to parent project')
    .action(function(options) {
      sync(conf);
    });

  program.parse(process.argv);
}