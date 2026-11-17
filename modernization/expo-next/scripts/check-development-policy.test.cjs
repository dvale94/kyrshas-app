const { test } = require('node:test');
const assert = require('node:assert/strict');
const { checkPair } = require('./check-development-policy.cjs');
const { strictPolicy, debugPolicy, assertPolicy, deriveDebug } = require('./ios-debug-policy.cjs');
function fixture(configuration) {
  return { CFBundleIdentifier: 'com.dvale1994.kyrshasapp', CFBundleDisplayName: "kyrsha's App",
    CFBundleShortVersionString: '1.0.0', CFBundleVersion: '1',
    CFBundleSupportedPlatforms: ['iPhoneSimulator'], UIDeviceFamily: [1],
    NSAppTransportSecurity: configuration === 'Debug' ? debugPolicy() : strictPolicy() };
}
test('accepts only exact approved Debug and separate strict Release without mutation', () => {
  const inputs = [fixture('Debug'), fixture('Release')];
  const before = JSON.stringify(inputs);
  assert.equal(checkPair(...inputs).status, 'PASS');
  assert.equal(JSON.stringify(inputs), before);
});
for (const configuration of ['Debug', 'Release']) {
  for (const change of ['arbitrary', 'local', 'web', 'missing', 'IP', 'LAN', 'subdomains', 'extra-domain', 'missing-subdomains', 'false-exception']) {
    test(`rejects ${configuration} ${change} policy drift`, () => {
      const inputs = [fixture('Debug'), fixture('Release')];
      const value = inputs[configuration === 'Debug' ? 0 : 1];
      const ats = value.NSAppTransportSecurity;
      if (change === 'arbitrary') ats.NSAllowsArbitraryLoads = true;
      if (change === 'local') ats.NSAllowsLocalNetworking = true;
      if (change === 'web') ats.NSAllowsArbitraryLoadsInWebContent = true;
      if (change === 'missing') delete value.NSAppTransportSecurity;
      if (['IP', 'LAN', 'subdomains', 'extra-domain', 'missing-subdomains', 'false-exception'].includes(change)) {
        ats.NSExceptionDomains = debugPolicy().NSExceptionDomains;
        if (change === 'IP' || change === 'LAN') {
          ats.NSExceptionDomains[change === 'IP' ? '127.0.0.1' : 'example.local'] = ats.NSExceptionDomains.localhost;
          delete ats.NSExceptionDomains.localhost;
        }
        if (change === 'extra-domain') ats.NSExceptionDomains['example.com'] = ats.NSExceptionDomains.localhost;
        if (change === 'subdomains') ats.NSExceptionDomains.localhost.NSIncludesSubdomains = true;
        if (change === 'missing-subdomains') delete ats.NSExceptionDomains.localhost.NSIncludesSubdomains;
        if (change === 'false-exception') ats.NSExceptionDomains.localhost.NSExceptionAllowsInsecureHTTPLoads = false;
      }
      assert.throws(() => checkPair(...inputs), /exact approved ATS/);
    });
  }
}
test('Release/default reject even the approved Debug exception; Debug requires its explicit policy', () => {
  for (const configuration of ['Release', 'Default']) assert.throws(() => assertPolicy(debugPolicy(), configuration));
  assert.throws(() => assertPolicy(strictPolicy(), 'Debug'));
  assert.throws(() => assertPolicy(strictPolicy(), 'Profile'), /Unknown/);
});
test('derivation preserves every non-ATS base value and never mutates it', () => {
  const base = { CFBundleIdentifier: '$(PRODUCT_BUNDLE_IDENTIFIER)', NSAppTransportSecurity: strictPolicy(), untouched: { value: 1 } };
  const before = JSON.stringify(base), derived = deriveDebug(base);
  assert.deepEqual(derived, { ...base, NSAppTransportSecurity: debugPolicy() });
  assert.equal(JSON.stringify(base), before);
  assert.throws(() => deriveDebug({ ...base, NSAppTransportSecurity: debugPolicy() }));
});
test('rejects accidentally reused input instead of certifying uninspected Release', () => {
  const debug = fixture('Debug'); assert.throws(() => checkPair(debug, debug), /Separate processed inputs/);
});
test('rejects physical-device artifacts, identity changes and malformed input', () => {
  const release = fixture('Release'); release.CFBundleSupportedPlatforms = ['iPhoneOS'];
  assert.throws(() => checkPair(fixture('Debug'), release), /simulator only/);
  release.CFBundleSupportedPlatforms = ['iPhoneSimulator']; release.CFBundleIdentifier = 'example.other';
  assert.throws(() => checkPair(fixture('Debug'), release), /synthetic identity/);
  assert.throws(() => checkPair(fixture('Debug'), null), /plist required/);
});
// Included in the existing cross-platform node:test verification entry point.
require('./ios-debug-policy.test.cjs');
