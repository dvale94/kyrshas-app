const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

// Evaluate only this app. Dotenv is disabled even when invoked outside npm scripts.
const projectRoot = path.resolve(__dirname, '..');
const cli = require.resolve('expo/bin/cli');
const env = { ...process.env, EXPO_NO_DOTENV: '1', EXPO_NO_TELEMETRY: '1' };
function config(type) {
  return JSON.parse(execFileSync(process.execPath, [cli, 'config', '--type', type, '--json'], {
    cwd: projectRoot,
    env,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  }));
}

const app = config('public');
assert.deepEqual(app.platforms, ['ios']);
assert.equal(app.ios.supportsTablet, false);
assert.equal(app.orientation, 'portrait');
assert.equal(app.userInterfaceStyle, 'light');
assert.equal(app.name, "kyrsha's App");
assert.equal(app.slug, 'kyrshas-app');
assert.equal(app.version, '1.0.0');
assert.equal(app.ios.buildNumber, '1');
assert.equal(app.ios.bundleIdentifier, 'com.dvale1994.kyrshasapp');
assert.equal(app.scheme, 'com.dvale1994.kyrshasapp');
assert.equal(app.extra.eas.projectId, '1eedc0a6-a315-467a-a326-ce48cba82b2c');
assert.deepEqual(Object.keys(app.extra).sort(), ['eas']);
assert.equal(app.updates.enabled, false);
assert.equal(app.icon, '../../assets/icon.png');
const splash = app.plugins.find((plugin) => Array.isArray(plugin) && plugin[0] === 'expo-splash-screen');
assert.ok(splash, 'Splash config plugin must be present');
assert.deepEqual(splash[1], {
  image: '../../assets/splash.png', resizeMode: 'contain', backgroundColor: '#38761d',
});

// Introspection runs supported config mods in memory; it does not create ios/.
const native = config('introspect')._internal.modResults.ios;
const plist = native.infoPlist;
assert.equal(plist.CFBundleDisplayName, app.name);
assert.equal(plist.CFBundleShortVersionString, '1.0.0');
assert.equal(plist.CFBundleVersion, '1');
assert.deepEqual(plist.UISupportedInterfaceOrientations, ['UIInterfaceOrientationPortrait']);
assert.ok(plist.CFBundleURLTypes.some((entry) => entry.CFBundleURLSchemes.includes(app.scheme)));
const ats = plist.NSAppTransportSecurity;
assert.equal(ats.NSAllowsArbitraryLoads, false);
assert.equal(ats.NSAllowsLocalNetworking, false);
assert.ok(!ats.NSExceptionDomains, 'No insecure ATS exceptions');
assert.equal(native.expoPlist.EXUpdatesEnabled, false);
console.log('PASS: iPhone-only Expo config, preservation mapping, introspected plist/scheme/ATS/updates');
console.log('NOT RUN: generated Xcode target, built plist, signing, runtime links and device behavior');
