const { withDangerousMod } = require('@expo/config-plugins');
const { createPlan, applyPlan } = require('../scripts/ios-debug-policy.cjs');

// Introspection skips dangerous mods: the default Info.plist remains strictly unchanged.
// No prebuild is needed for an existing tree: use the explicit receipt-based CLI instead.
module.exports = function withDebugLocalhost(config) {
  return withDangerousMod(config, ['ios', async (mod) => {
    applyPlan(createPlan(mod.modRequest.projectRoot));
    return mod;
  }]);
};
