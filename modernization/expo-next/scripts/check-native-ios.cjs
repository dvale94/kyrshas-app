// Read-only macOS check of generated files; never runs prebuild, Pods or Xcode.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const ios = path.join(root, 'ios');
if (process.platform !== 'darwin' || !fs.existsSync(ios)) {
  console.error('BLOCKED: macOS and a generated modernization/expo-next/ios tree are required. See docs/migration/expo-next-native-validation.md.');
  process.exit(2);
}

function contained(relative) {
  const file = path.resolve(ios, relative);
  assert.ok(fs.realpathSync(file).startsWith(`${ios}${path.sep}`), 'Native input must stay inside isolated ios/');
  return file;
}
function plist(relative) {
  return JSON.parse(execFileSync('/usr/bin/plutil', ['-convert', 'json', '-o', '-', contained(relative)], { encoding: 'utf8' }));
}
function json(relative) {
  return JSON.parse(fs.readFileSync(contained(relative), 'utf8'));
}
function main() {
  assert.equal(fs.realpathSync(ios), ios, 'Refuse a symlinked native root');
  const projects = fs.readdirSync(ios).filter((name) => name.endsWith('.xcodeproj'));
  assert.equal(projects.length, 1, 'Expected exactly one isolated Xcode project');
  const project = plist(`${projects[0]}/project.pbxproj`);
  const objects = project.objects;
  const targets = Object.entries(objects).filter(([, value]) => value.isa === 'PBXNativeTarget');
  assert.equal(targets.length, 1, 'Expected only the synthetic application target');
  const [targetId, target] = targets[0];
  assert.equal(target.productType, 'com.apple.product-type.application');
  const resourcePhase = target.buildPhases.map((id) => objects[id]).find((phase) => phase.isa === 'PBXResourcesBuildPhase');
  assert.ok(resourcePhase, 'App resource build phase required');
  const linkedResources = resourcePhase.files.map((id) => objects[objects[id].fileRef]?.path);
  for (const suffix of ['Images.xcassets', 'SplashScreen.storyboard', 'Expo.plist']) {
    assert.ok(linkedResources.some((resource) => resource?.endsWith(suffix)), `${suffix} must be linked to app resources`);
  }
  const configurations = objects[target.buildConfigurationList].buildConfigurations;
  const summaries = configurations.map((id) => {
    const config = objects[id];
    const settings = config.buildSettings;
    assert.equal(String(settings.TARGETED_DEVICE_FAMILY), '1', `${config.name}: iPhone only`);
    assert.equal(settings.PRODUCT_BUNDLE_IDENTIFIER, 'com.dvale1994.kyrshasapp');
    assert.equal(String(settings.CURRENT_PROJECT_VERSION), '1');
    assert.ok(!settings.INFOPLIST_KEY_CFBundleDisplayName || settings.INFOPLIST_KEY_CFBundleDisplayName === "kyrsha's App", 'Unexpected display-name override');
    assert.ok(!Object.keys(settings).some((key) => key.startsWith('INFOPLIST_KEY_NSAppTransportSecurity')), 'Unexpected ATS build override');
    const infoPath = settings.INFOPLIST_FILE;
    const info = plist(infoPath);
    assert.equal(info.CFBundleIdentifier, '$(PRODUCT_BUNDLE_IDENTIFIER)');
    assert.equal(info.CFBundleDisplayName, "kyrsha's App");
    assert.equal(info.CFBundleShortVersionString, '1.0.0');
    assert.equal(String(info.CFBundleVersion), '1');
    assert.deepEqual(info.UISupportedInterfaceOrientations, ['UIInterfaceOrientationPortrait']);
    assert.equal(info.UIUserInterfaceStyle, 'Light');
    assert.ok(info.CFBundleURLTypes.some((entry) => entry.CFBundleURLSchemes.includes('com.dvale1994.kyrshasapp')));
    const ats = info.NSAppTransportSecurity;
    assert.equal(ats.NSAllowsArbitraryLoads, false);
    assert.equal(ats.NSAllowsLocalNetworking, false);
    assert.ok(!ats.NSExceptionDomains, 'No ATS exceptions');
    const appDirectory = path.dirname(infoPath);
    assert.equal(plist(`${appDirectory}/Supporting/Expo.plist`).EXUpdatesEnabled, false);
    const entitlements = plist(settings.CODE_SIGN_ENTITLEMENTS);
    assert.deepEqual(entitlements, {}, 'No app entitlements added');
    assert.ok(Number(settings.IPHONEOS_DEPLOYMENT_TARGET) >= 16.4, 'Do not force the legacy iOS13 target onto SDK58');
    const storyboard = info.UILaunchStoryboardName;
    assert.ok(storyboard, 'Launch storyboard must be configured');
    const storyboardText = fs.readFileSync(contained(`${appDirectory}/${storyboard}.storyboard`), 'utf8');
    const imageView = storyboardText.match(/<imageView\b[^>]*\bimage="([^"]+)"[^>]*>/);
    assert.ok(imageView, 'Launch storyboard must reference an image');
    assert.ok(imageView[0].includes('contentMode="scaleAspectFit"'), 'Splash contain intent');
    const catalog = `${appDirectory}/Images.xcassets`;
    const iconSet = `${catalog}/${settings.ASSETCATALOG_COMPILER_APPICON_NAME}.appiconset`;
    const icon = json(`${iconSet}/Contents.json`);
    const splashSet = `${catalog}/${imageView[1]}.imageset`;
    const splash = json(`${splashSet}/Contents.json`);
    const background = json(`${catalog}/SplashScreenBackground.colorset/Contents.json`).colors[0].color.components;
    for (const [channel, byte] of Object.entries({ red: 56, green: 118, blue: 29, alpha: 255 })) {
      assert.ok(Math.abs(Number(background[channel]) - byte / 255) < 0.000001, 'Splash background #38761d');
    }
    const resources = [
      ...icon.images.filter((image) => image.filename).map((image) => `${iconSet}/${image.filename}`),
      ...splash.images.filter((image) => image.filename).map((image) => `${splashSet}/${image.filename}`),
    ];
    assert.ok(resources.length >= 2, 'Generated icon and splash image files required');
    const dimensions = resources.map((relative) => {
      const bytes = fs.readFileSync(contained(relative));
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Expected PNG resource');
      return { path: relative, width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
    });
    return {
      configuration: config.name, deviceFamily: settings.TARGETED_DEVICE_FAMILY,
      bundleIdentifier: settings.PRODUCT_BUNDLE_IDENTIFIER, displayName: info.CFBundleDisplayName,
      version: info.CFBundleShortVersionString, build: info.CFBundleVersion,
      marketingVersionSetting: settings.MARKETING_VERSION,
      deploymentTarget: settings.IPHONEOS_DEPLOYMENT_TARGET,
      schemes: info.CFBundleURLTypes.flatMap((entry) => entry.CFBundleURLSchemes),
      orientations: info.UISupportedInterfaceOrientations, ats, updatesEnabled: false,
      entitlementKeys: Object.keys(entitlements), storyboard, resources: dimensions,
    };
  });
  const attributes = objects[project.rootObject].attributes.TargetAttributes?.[targetId] || {};
  assert.deepEqual(attributes.SystemCapabilities || {}, {}, 'No project capabilities added');
  const schemeDirectory = contained(`${projects[0]}/xcshareddata/xcschemes`);
  const schemes = fs.readdirSync(schemeDirectory).filter((name) => name.endsWith('.xcscheme'));
  assert.ok(schemes.length, 'Shared Xcode build scheme required');
  console.log(JSON.stringify({ status: 'PASS', evidence: 'generated source only', project: projects[0], sharedSchemes: schemes, configurations: summaries }, null, 2));
  console.log('NOT RUN by this check: Pods resolution, effective Xcode build settings, built plist/entitlements, simulator behavior, icon/splash appearance or production approval.');
}
try {
  main();
} catch (error) {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
}
