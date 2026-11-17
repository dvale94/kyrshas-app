// Single authority for the owner's narrowly approved Debug localhost policy.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const plist = require('@expo/plist').default;
const parser = require('xcode/lib/parser/pbxproj');

const BASE = 'kyrshasApp/Info.plist';
const DEBUG = 'kyrshasApp/Info.Debug.plist';
const PROJECT = 'kyrshasApp.xcodeproj/project.pbxproj';
function strictPolicy() {
  return { NSAllowsArbitraryLoads: false, NSAllowsLocalNetworking: false };
}
function debugPolicy() {
  return { ...strictPolicy(), NSExceptionDomains: { localhost: {
    NSExceptionAllowsInsecureHTTPLoads: true, NSIncludesSubdomains: false,
  } } };
}
function assertPolicy(value, configuration) {
  assert.ok(['Debug', 'Release', 'Default'].includes(configuration), 'Unknown policy configuration');
  // @expo/plist parses dictionaries with null prototypes; compare their JSON values.
  assert.deepEqual(value && JSON.parse(JSON.stringify(value)), configuration === 'Debug' ? debugPolicy() : strictPolicy(),
    `${configuration}: exact approved ATS policy required`);
}
function deriveDebug(base) {
  assertPolicy(base.NSAppTransportSecurity, 'Default');
  assert.equal(base.CFBundleIdentifier, '$(PRODUCT_BUNDLE_IDENTIFIER)', 'Unexpected base identity');
  return { ...base, NSAppTransportSecurity: debugPolicy() };
}
function unquote(value) {
  return typeof value === 'string' && value.startsWith('"') ? JSON.parse(value) : value;
}
function patchProject(text) {
  const objects = parser.parse(text).project.objects;
  const targets = Object.values(objects.PBXNativeTarget || {}).filter((entry) => typeof entry === 'object');
  assert.equal(targets.length, 1, 'Exactly one native app target required');
  const target = targets[0];
  assert.equal(unquote(target.productType), 'com.apple.product-type.application');
  assert.equal(unquote(target.name), 'kyrshasApp');
  const list = objects.XCConfigurationList[target.buildConfigurationList];
  const configurations = list.buildConfigurations.map(({ value }) => [value, objects.XCBuildConfiguration[value]]);
  assert.deepEqual(configurations.map(([, config]) => unquote(config.name)).sort(), ['Debug', 'Release']);
  // Reject policy overrides in app AND project configurations, including conditional keys.
  for (const config of Object.values(objects.XCBuildConfiguration).filter((entry) => typeof entry === 'object')) {
    for (const [key, value] of Object.entries(config.buildSettings)) {
      assert.ok(!key.includes('NSAppTransportSecurity'), 'Unexpected ATS build override');
      assert.ok(!key.startsWith('INFOPLIST_FILE['), 'Conditional plist override is unapproved');
      if (['INFOPLIST_PREPROCESS', 'GENERATE_INFOPLIST_FILE'].includes(key)) {
        assert.equal(unquote(value), 'NO', 'Generated/preprocessed plist is unapproved');
      }
    }
  }
  for (const [, config] of configurations) {
    assert.equal(unquote(config.buildSettings.PRODUCT_BUNDLE_IDENTIFIER), 'com.dvale1994.kyrshasapp');
  }
  const [debugId, debug] = configurations.find(([, config]) => unquote(config.name) === 'Debug');
  const release = configurations.find(([, config]) => unquote(config.name) === 'Release')[1];
  assert.equal(unquote(release.buildSettings.INFOPLIST_FILE), BASE, 'Release must retain strict base');
  const debugPath = unquote(debug.buildSettings.INFOPLIST_FILE);
  assert.ok([BASE, DEBUG].includes(debugPath), 'Unexpected Debug plist reference');
  if (debugPath === DEBUG) return text;
  // Retain every byte except the one app Debug path; never serialize the entire project.
  const block = new RegExp(`\\t\\t${debugId} /\\* Debug \\*/ = \\{[\\s\\S]*?\\n\\t\\t\\};`, 'g');
  const matches = text.match(block);
  assert.equal(matches?.length, 1, 'Unrecognized Debug project formatting; refuse rewrite');
  const setting = /INFOPLIST_FILE = (?:"kyrshasApp\/Info\.plist"|kyrshasApp\/Info\.plist);/g;
  assert.equal(matches[0].match(setting)?.length, 1, 'Unrecognized Debug plist setting');
  return text.replace(block, matches[0].replace(setting, `INFOPLIST_FILE = ${DEBUG};`));
}
function hash(bytes) { return crypto.createHash('sha256').update(bytes).digest('hex'); }
function safeFile(root, relative, optional = false) {
  assert.equal(fs.realpathSync(root), root, 'Symlinked root is unapproved');
  let current = root;
  const parts = relative.split('/');
  for (let i = 0; i < parts.length; i++) {
    current = path.join(current, parts[i]);
    if (optional && i === parts.length - 1 && !fs.existsSync(current)) {
      // existsSync follows dangling symlinks, so lstat must also fail with ENOENT.
      try { fs.lstatSync(current); assert.fail('Dangling link is unapproved'); }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
      return null;
    }
    const stat = fs.lstatSync(current);
    assert.ok(!stat.isSymbolicLink(), `Symlink is unapproved: ${relative}`);
    if (i === parts.length - 1) assert.ok(stat.isFile() && stat.nlink === 1, 'Regular unshared input required');
    else assert.ok(stat.isDirectory(), 'Directory required');
  }
  return fs.readFileSync(current, 'utf8');
}
function createPlan(projectRoot) {
  const root = path.resolve(projectRoot);
  const inputs = {};
  const read = (relative, optional) => {
    const value = safeFile(root, `ios/${relative}`, optional);
    inputs[relative] = value === null ? null : hash(value);
    return value;
  };
  const projectText = read(PROJECT);
  const baseText = read(BASE);
  const oldDebug = read(DEBUG, true);
  const debugText = plist.build(deriveDebug(plist.parse(baseText)));
  if (oldDebug !== null) assert.equal(oldDebug, debugText, 'Existing Debug plist drift; refuse overwrite');
  const updatedProject = patchProject(projectText);
  // A preselected but missing Debug file is incomplete state, not an approved starting point.
  if (oldDebug === null) assert.notEqual(updatedProject, projectText, 'Debug reference exists without approved file');
  const changes = [[DEBUG, oldDebug, debugText], [PROJECT, projectText, updatedProject]]
    .filter(([, before, after]) => before !== after)
    .map(([file, before, content]) => ({ file, before: before === null ? null : hash(before), after: hash(content), content }));
  return { version: 1, root, toolHash: hash(fs.readFileSync(__filename)), inputs, changes };
}
function applyPlan(receipt) {
  assert.deepEqual(createPlan(receipt.root), receipt, 'Plan/input drift; nothing applied');
  // All validation is complete before writes. Only two fixed native paths are writable.
  for (const change of receipt.changes) {
    assert.ok([DEBUG, PROJECT].includes(change.file));
    const file = path.join(receipt.root, 'ios', change.file);
    if (change.before === null) fs.writeFileSync(file, change.content, { flag: 'wx' });
    else {
      const temporary = `${file}.debug-policy-${process.pid}.tmp`;
      fs.writeFileSync(temporary, change.content, { flag: 'wx', mode: fs.statSync(file).mode });
      fs.renameSync(temporary, file);
    }
  }
  assert.equal(createPlan(receipt.root).changes.length, 0, 'Applied state must be idempotent');
  return { status: 'PASS', changed: receipt.changes.map(({ file }) => file), inputs: receipt.inputs };
}
module.exports = { BASE, DEBUG, PROJECT, strictPolicy, debugPolicy, assertPolicy, deriveDebug, patchProject, createPlan, applyPlan };
