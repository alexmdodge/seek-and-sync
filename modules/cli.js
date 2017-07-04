/**
 * CLI Configuration and Tool Functionality
 */
const program = require('commander');
const common = require('common-tags');
const chalk = require('chalk');
const sync = require('./sync.js');
const utils = require('./common/utils.js');
const package = require('../package.json');

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
        console.log(`  • ${chalk.yellow(key)}: ${conf[key]}`);
      });
      space();
    });

    program
    .command('pull')
    .description(common.oneLine`
      Check for updates in project directories and pull changes into 
      current project.
    `)
    .option('-p, --parent-path <path>', 'Specify explicit path to parent project')
    .action(function(options) {
      sync(conf, 'pull');
    });

    program
    .command('push')
    .description(common.oneLine`
      Check for updates in parent directory and push changes into 
      parent project.
    `)
    .option('-p, --parent-path <path>', 'Specify explicit path to parent project')
    .action(function(options) {
      sync(conf, 'push');
    });

  program.parse(process.argv);

  if (process.argv.length < 3) {
    program.help();
  } else {
    if (!program._execs[program.args[0]]){
      console.log('Unknown command. Use -h to see available options.');
    }
  }
}