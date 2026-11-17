const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const plist = require('@expo/plist').default;
const { BASE, DEBUG, PROJECT, strictPolicy, debugPolicy, patchProject, createPlan, applyPlan } = require('./ios-debug-policy.cjs');
const ids = ['A', 'B', 'C', 'D'].map((value) => value.repeat(24));
function projectText() {
  const [target, list, debug, release] = ids;
  return `// !$*UTF8*$!\n{\n\tobjects = {\n/* Begin PBXNativeTarget section */\n\t\t${target} /* App */ = {\n\t\t\tisa = PBXNativeTarget;\n\t\t\tname = kyrshasApp;\n\t\t\tproductType = "com.apple.product-type.application";\n\t\t\tbuildConfigurationList = ${list};\n\t\t};\n/* End PBXNativeTarget section */\n/* Begin XCConfigurationList section */\n\t\t${list} = {\n\t\t\tisa = XCConfigurationList;\n\t\t\tbuildConfigurations = (${debug} /* Debug */, ${release} /* Release */,);\n\t\t};\n/* End XCConfigurationList section */\n/* Begin XCBuildConfiguration section */\n${[[debug, 'Debug'], [release, 'Release']].map(([id, name]) => `\t\t${id} /* ${name} */ = {\n\t\t\tisa = XCBuildConfiguration;\n\t\t\tbuildSettings = {\n\t\t\t\tINFOPLIST_FILE = ${BASE};\n\t\t\t\tPRODUCT_BUNDLE_IDENTIFIER = com.dvale1994.kyrshasapp;\n\t\t\t};\n\t\t\tname = ${name};\n\t\t};`).join('\n')}\n/* End XCBuildConfiguration section */\n\t};\n\trootObject = ${target};\n}\n`;
}
function fixture(t) {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'kyrsha-policy-test-')));
  fs.mkdirSync(path.join(root, 'ios', path.dirname(BASE)), { recursive: true });
  fs.mkdirSync(path.join(root, 'ios', path.dirname(PROJECT)), { recursive: true });
  fs.writeFileSync(path.join(root, 'ios', PROJECT), projectText());
  fs.writeFileSync(path.join(root, 'ios', BASE), plist.build({ CFBundleIdentifier: '$(PRODUCT_BUNDLE_IDENTIFIER)', NSAppTransportSecurity: strictPolicy(), preserved: 'synthetic' }));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}
function file(root, relative) { return path.join(root, 'ios', relative); }
test('native application changes only Debug reference and derived file, preserving base/Release and idempotence', (t) => {
  const root = fixture(t), before = fs.readFileSync(file(root, BASE), 'utf8');
  const plan = createPlan(root);
  assert.deepEqual(plan.changes.map(({ file }) => file), [DEBUG, PROJECT]);
  assert.equal(fs.existsSync(file(root, DEBUG)), false, 'Preview must not write');
  assert.equal(plan.changes[1].content, projectText().replace(`INFOPLIST_FILE = ${BASE};`, `INFOPLIST_FILE = ${DEBUG};`));
  applyPlan(plan);
  assert.equal(fs.readFileSync(file(root, BASE), 'utf8'), before);
  assert.deepEqual(JSON.parse(JSON.stringify(plist.parse(fs.readFileSync(file(root, DEBUG), 'utf8')).NSAppTransportSecurity)), debugPolicy());
  assert.equal(createPlan(root).changes.length, 0);
  assert.deepEqual(applyPlan(createPlan(root)).changed, []);
});
test('stale receipt and tampered output are rejected before any write', (t) => {
  const root = fixture(t), plan = createPlan(root);
  fs.appendFileSync(file(root, BASE), '\n');
  assert.throws(() => applyPlan(plan), /drift/);
  assert.equal(fs.existsSync(file(root, DEBUG)), false);
  const tampered = createPlan(root); tampered.changes[0].content += 'tampered';
  assert.throws(() => applyPlan(tampered), /drift/);
  assert.equal(fs.existsSync(file(root, DEBUG)), false);
});
test('unknown existing Debug content and incomplete reference are rejected', (t) => {
  const root = fixture(t);
  fs.writeFileSync(file(root, DEBUG), 'owner content');
  assert.throws(() => createPlan(root), /Debug plist drift/);
  fs.unlinkSync(file(root, DEBUG));
  fs.writeFileSync(file(root, PROJECT), patchProject(projectText()));
  assert.throws(() => createPlan(root), /without approved file/);
});
for (const link of ['file', 'directory', 'dangling']) {
  test(`rejects ${link} symlink escape before writes`, (t) => {
    const root = fixture(t);
    if (link === 'directory') {
      fs.renameSync(path.join(root, 'ios/kyrshasApp'), path.join(root, 'outside'));
      fs.symlinkSync(path.join(root, 'outside'), path.join(root, 'ios/kyrshasApp'));
    } else {
      if (link === 'file') fs.unlinkSync(file(root, BASE));
      fs.symlinkSync(path.join(root, 'absent'), file(root, link === 'file' ? BASE : DEBUG));
    }
    assert.throws(() => createPlan(root), /[Ss]ymlink|Dangling/);
  });
}
for (const drift of ['release', 'override', 'identity', 'debug-path', 'format']) {
  test(`rejects native ${drift} drift`, () => {
    let value = projectText();
    if (drift === 'release') value = value.replaceAll(`INFOPLIST_FILE = ${BASE};`, `INFOPLIST_FILE = ${DEBUG};`);
    if (drift === 'override') value = value.replace('buildSettings = {', 'buildSettings = {\n INFOPLIST_KEY_NSAppTransportSecurity = YES;');
    if (drift === 'identity') value = value.replace('com.dvale1994.kyrshasapp', 'example.other');
    if (drift === 'debug-path') value = value.replace(`INFOPLIST_FILE = ${BASE};`, 'INFOPLIST_FILE = owner/Other.plist;');
    if (drift === 'format') value = value.replace(`\t\t${ids[2]} /* Debug */`, ` ${ids[2]} /* Debug */`);
    assert.throws(() => patchProject(value));
  });
}
test('CLI rejects repository receipts and invalid arguments before creating output', () => {
  const { main } = require('./sync-ios-debug-policy.cjs');
  const forbidden = path.resolve(__dirname, '../../../policy-receipt-must-not-exist.json');
  assert.equal(fs.existsSync(forbidden), false);
  assert.throws(() => main(['--plan', forbidden]), /outside the repository/);
  assert.equal(fs.existsSync(forbidden), false);
  assert.throws(() => main(['--apply', 'relative.json']), /Absolute external/);
  assert.throws(() => main(['--force']), /Usage/);
});
test('Expo plugin registers the same synchronizer without adding a default ATS exception', () => {
  const plugin = require('../plugins/with-debug-localhost.cjs');
  const config = { name: 'synthetic', slug: 'synthetic', ios: { infoPlist: { NSAppTransportSecurity: strictPolicy() } } };
  const result = plugin(config);
  assert.deepEqual(result.ios.infoPlist.NSAppTransportSecurity, strictPolicy());
  assert.equal(typeof result.mods.ios.dangerous, 'function');
});
