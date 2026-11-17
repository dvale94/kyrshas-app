// Bundles only into existing temporary simulator build output; never installs an app.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { readPlist, checkPlist } = require('./check-development-policy.cjs');

function main(args) {
  assert.equal(args.length, 1, 'Usage: node scripts/embed-ios-debug.cjs <temporary Debug-iphonesimulator/app.app>');
  const project = fs.realpathSync(path.resolve(__dirname, '..'));
  const repository = fs.realpathSync(path.resolve(project, '../..'));
  const destination = fs.realpathSync(args[0]);
  assert.ok(!destination.startsWith(`${repository}${path.sep}`), 'Refuse repository/native output');
  const temporaryRoots = [os.tmpdir(), '/private/tmp'].map((p) => fs.realpathSync(p));
  assert.ok(temporaryRoots.some((p) => destination.startsWith(`${p}${path.sep}`)), 'Only temporary build output is accepted');
  assert.equal(path.basename(path.dirname(destination)), 'Debug-iphonesimulator', 'Debug simulator output only');
  assert.equal(path.extname(destination), '.app');
  checkPlist(readPlist(path.join(destination, 'Info.plist')), 'Debug');
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('EXPO_PUBLIC_') && !key.startsWith('EAS_')));
  Object.assign(env, { EXPO_NO_DOTENV: '1', EXPO_NO_TELEMETRY: '1', CI: '1' });
  const result = spawnSync(process.execPath, [require.resolve('expo/bin/cli'), 'export:embed',
    '--entry-file', 'index.ts', '--platform', 'ios', '--dev', 'true',
    '--bundle-output', path.join(destination, 'main.jsbundle'), '--assets-dest', destination], {
    cwd: project, env, stdio: 'inherit',
  });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, 'Embedded bundling failed');
  console.log('PASS: temporary embedded Debug bundle; NOT a Metro/Fast Refresh pass.');
}

if (require.main === module) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(`FAIL: ${error.message}`); process.exitCode = 1; }
}
