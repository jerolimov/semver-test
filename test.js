const assert = require('node:assert');
const test = require('node:test');
const semver = require('semver');

const semverRange = '>=4.15.0'
const semverOptions = { includePrerelease: true };

test('that the range does not support old versions', (t) => {
  for (const version of ['3.1', '4.13.0', '4.14.0']) {
    assert(
      !semver.satisfies(version, semverRange, semverOptions),
      `expected ${version} not to satisfy ${semverRange}`,
    );
  }
});

test('that the range should support upcoming versions', (t) => {
  for (const version of ['4.15.0', '4.15.1', '4.16.0', '5.0.0']) {
    assert(
      semver.satisfies(version, semverRange, semverOptions),
      `expected ${version} to satisfy ${semverRange}`,
    );
  }
});
