const { test } = require('node:test');
const assert = require('node:assert/strict');
const { checkPair } = require('./check-development-policy.cjs');

function fixture() {
  return { CFBundleIdentifier: 'com.dvale1994.kyrshasapp', CFBundleDisplayName: "kyrsha's App",
    CFBundleShortVersionString: '1.0.0', CFBundleVersion: '1',
    CFBundleSupportedPlatforms: ['iPhoneSimulator'], UIDeviceFamily: [1],
    NSAppTransportSecurity: { NSAllowsArbitraryLoads: false, NSAllowsLocalNetworking: false } };
}

test('accepts separate strict Debug and Release processed inputs without mutating them', () => {
  const debug = fixture(), release = fixture();
  const before = JSON.stringify([debug, release]);
  assert.equal(checkPair(debug, release).status, 'PASS');
  assert.equal(JSON.stringify([debug, release]), before);
});

for (const configuration of ['Debug', 'Release']) {
  for (const change of ['arbitrary', 'local', 'exception', 'web', 'missing']) {
    test(`rejects ${configuration} ${change} policy drift`, () => {
      const inputs = [fixture(), fixture()];
      const value = inputs[configuration === 'Debug' ? 0 : 1];
      if (change === 'arbitrary') value.NSAppTransportSecurity.NSAllowsArbitraryLoads = true;
      if (change === 'local') value.NSAppTransportSecurity.NSAllowsLocalNetworking = true;
      if (change === 'exception') value.NSAppTransportSecurity.NSExceptionDomains = { localhost: { NSExceptionAllowsInsecureHTTPLoads: true } };
      if (change === 'web') value.NSAppTransportSecurity.NSAllowsArbitraryLoadsInWebContent = true;
      if (change === 'missing') delete value.NSAppTransportSecurity;
      assert.throws(() => checkPair(...inputs), /strict baseline/);
    });
  }
}

test('rejects accidentally reused input instead of certifying a Release that was not inspected', () => {
  const debug = fixture();
  assert.throws(() => checkPair(debug, debug), /Separate processed inputs/);
});
test('rejects a physical-device artifact', () => {
  const release = fixture(); release.CFBundleSupportedPlatforms = ['iPhoneOS'];
  assert.throws(() => checkPair(fixture(), release), /simulator only/);
});
test('rejects identity changes and malformed input', () => {
  const release = fixture(); release.CFBundleIdentifier = 'example.other';
  assert.throws(() => checkPair(fixture(), release), /synthetic identity/);
  assert.throws(() => checkPair(fixture(), null), /plist required/);
});
