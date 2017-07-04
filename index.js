#! /usr/bin/env node
/**
 *    _____           __                      __   _____                 
 *   / ___/___  ___  / /__   ____ _____  ____/ /  / ___/__  ______  _____
 *   \__ \/ _ \/ _ \/ //_/  / __ `/ __ \/ __  /   \__ \/ / / / __ \/ ___/
 *  ___/ /  __/  __/ ,<    / /_/ / / / / /_/ /   ___/ / /_/ / / / / /__  
 * /____/\___/\___/_/|_|   \__,_/_/ /_/\__,_/   /____/\__, /_/ /_/\___/  
 *                                                   /____/
 * 
 * Seek and Sync is tool for managing development between two independent 
 * projects. The tool is meant to be structure agnostic, where two development 
 * teams can manage their own workflows. The primary use case is when one 
 * project is a subset, and the development workflow of the root project is separate 
 * than that of the parent project.
 * 
 * Author: Alex Dodge
 * Version: 0.3.0
 */

// Project Configuration Variables
const Utils = require('./modules/common/utils.js');
const rootConf = require('rc')('sns', {
  name: null,
  path: null,
  parent_path: null,
  git: false,
  git_check: false,
  default_branch: false,
});


// Verify Initial Configuration
const configManager = require('./modules/common/configManager.js');
configManager.initializeConfiguration(rootConf);

// Fix for absolute project path
const conf = Object.assign({}, rootConf, {
  path: Utils.fixPath(process.cwd(), rootConf.path),
});

// Enable CLI
require('./modules/cli')(conf);
