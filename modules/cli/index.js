/**
 * CLI Configuration and Tool Functionality
 */
const program = require('commander');
const common = require('common-tags');
const chalk = require('chalk');
const sync = require('../sync');
const Utils = require('../utils.js');

module.exports = function(conf) {

  // Colour and Format Helpers
  let blue = text => chalk.blue(text);
  let bold = text => chalk.bold(text);
  let yellow = text => chalk.yellow(text);
  let green = text => chalk.green(text);
  let space = () => console.log('');
  let hr = () => console.log('\t\t\t\t\t----');

  program
    .version('0.1.2')
    .description(`
    ${green('Seek and Sync')} is a tool for managing the sharing of modules 
    between rapidly changing projects.
    `);

  program
    .command('config')
    .description(`List and manage the configuration of the project.`)
    .action(function(key) {
      space();
      console.log(common.oneLineTrim`
        Based on the ${bold('.snsrc')} file you provided, your 
        configuration is,
      `);

      Object.keys(conf).map(key => {
        console.log(`  • ${blue(key)}: ${conf[key]}`);
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
      const syncConf = Object.assign({}, conf, {
        parent_path: options.parentPath || conf.parent_path,
      });
      
      sync(syncConf);
    });

  program.parse(process.argv);
}