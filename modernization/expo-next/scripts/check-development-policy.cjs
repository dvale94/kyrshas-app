// Read-only check of two independently processed simulator Info.plists.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { assertPolicy } = require('./ios-debug-policy.cjs');

function checkPlist(plist, configuration) {
  assert.ok(plist && typeof plist === 'object' && !Array.isArray(plist), `${configuration}: plist required`);
  assert.equal(plist.CFBundleIdentifier, 'com.dvale1994.kyrshasapp', `${configuration}: synthetic identity`);
  assert.equal(plist.CFBundleDisplayName, "kyrsha's App", `${configuration}: provisional name`);
  assert.equal(plist.CFBundleShortVersionString, '1.0.0');
  assert.equal(String(plist.CFBundleVersion), '1');
  assert.deepEqual(plist.CFBundleSupportedPlatforms, ['iPhoneSimulator'], `${configuration}: simulator only`);
  assert.deepEqual(plist.UIDeviceFamily, [1], `${configuration}: iPhone only`);
  assert.ok(['Debug', 'Release'].includes(configuration), 'Processed Debug or Release required');
  assertPolicy(plist.NSAppTransportSecurity, configuration);
  return {
    configuration, bundleIdentifier: plist.CFBundleIdentifier,
    version: plist.CFBundleShortVersionString, build: String(plist.CFBundleVersion),
    platforms: plist.CFBundleSupportedPlatforms, ats: plist.NSAppTransportSecurity,
  };
}

function checkPair(debug, release) {
  assert.notEqual(debug, release, 'Separate processed inputs are required');
  return { status: 'PASS', evidence: 'processed plist inputs, not runtime or refresh',
    configurations: [checkPlist(debug, 'Debug'), checkPlist(release, 'Release')] };
}

function readPlist(file) {
  assert.equal(path.basename(file), 'Info.plist', 'Expected a processed Info.plist');
  return JSON.parse(execFileSync('/usr/bin/plutil', ['-convert', 'json', '-o', '-', file], {
    encoding: 'utf8', maxBuffer: 2 * 1024 * 1024,
  }));
}

function main(files) {
  assert.equal(files.length, 2, 'Usage: node scripts/check-development-policy.cjs <Debug.app/Info.plist> <Release.app/Info.plist>');
  const resolved = files.map((file) => fs.realpathSync(file));
  assert.notEqual(resolved[0], resolved[1], 'Do not pass the same file for both configurations');
  console.log(JSON.stringify(checkPair(...resolved.map(readPlist)), null, 2));
}

module.exports = { checkPlist, checkPair, readPlist, main };
if (require.main === module) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(`FAIL: ${error.message}`); process.exitCode = 1; }
}
