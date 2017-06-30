const Utils = require('./utils.js');
let paths;

beforeEach(() => {
  paths = {
    rootPathAbsolute: '/absolute/path',
    rootPathRelative: './relative/path',
    callPath: '/User/name/project',
    userPath: './sub/module',
    fixedPath: '/User/name/project/sub/module',
  }
})

describe('fixPath()', () => {

  test('absolute input does not change', () => {
    expect(Utils.fixPath(paths.callPath, paths.rootPathAbsolute))
      .toBe(paths.rootPathAbsolute);
  });

  test('relative input should combine paths', () => {
    expect(Utils.fixPath(paths.callPath, paths.userPath))
      .toBe(paths.fixedPath);
  });
})