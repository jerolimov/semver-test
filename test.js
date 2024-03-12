const assert = require('node:assert');
const test = require('node:test');
const semver = require('semver');

const semverRange = '>=4.15.*'

// https://github.com/openshift/console/blob/master/frontend/packages/console-dynamic-plugin-sdk/src/runtime/plugin-dependencies.ts#L52
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

test('that the range should support nightly builds as well', (t) => {
  for (const version of [
    '4.15.0-0', '4.15.0-0-nightly', '4.15.0-0-nightly-2024-03-11-180746',
    '4.16.0-0', '4.16.0-0-nightly', '4.16.0-0-nightly-2024-03-11-180746'
  ]) {
    assert(
      semver.satisfies(version, semverRange, semverOptions),
      `expected ${version} to satisfy ${semverRange}`,
    );
  }
});

test('that the range should not support old nightly builds', (t) => {
  for (const version of [
    '4.14.0-0', '4.14.0-0-nightly', '4.14.0-0-nightly-2024-03-11-180746',
  ]) {
    assert(
      !semver.satisfies(version, semverRange, semverOptions),
      `expected ${version} to satisfy ${semverRange}`,
    );
  }
});
