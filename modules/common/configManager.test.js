const configManager = require('./configManager.js');
const defaultConf = require('../defaults.json');
let testConf;

/**
 * Wraps a set timeout in a promise to delay the check
 * for a value related to async functions.
 */
async function delayCheck(value, time) {
  return new Promise((resolve, reject) => {
    setTimeout((value, time) => {
      resolve(value);
    }, time);
  });
}

beforeAll(() => {
  testConf = Object.assign({}, defaultConf, {
    name: 'my-test-project',
    path: '.',
    parent_path: '/some-path',
    parent_branch: 'master',
  })
})

/**
 * Function: verify
 * Checks the provided user configuration and prompts
 * them to keep or make modifications if errors.
 */
describe('verify()', () => {
  test('should be called', () => {
    expect(configManager.verifyConfiguration(testConf));
  });
});

/**
 * Function: initializeConfiguration
 * A series of steps to check initial user configuration and
 * provide warnings and support for invalid setup.
 */
describe('initializeConfiguration()', () => {
  test('should be called', () => {
    expect(configManager.initializeConfiguration(testConf));
  });
});