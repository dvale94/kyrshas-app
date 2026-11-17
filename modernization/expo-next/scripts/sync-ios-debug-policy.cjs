// Explicit, contained alternative to regenerating a native project.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createPlan, applyPlan } = require('./ios-debug-policy.cjs');
const root = path.resolve(__dirname, '..');
function main(args) {
  const [mode, receiptPath] = args;
  assert.ok((mode === '--check' && args.length === 1) ||
    (['--plan', '--apply'].includes(mode) && args.length === 2),
  'Usage: node scripts/sync-ios-debug-policy.cjs --check | --plan /external/receipt.json | --apply /external/receipt.json');
  if (mode === '--check') {
    const plan = createPlan(root);
    assert.equal(plan.changes.length, 0, 'Native policy differs; inspect a --plan receipt before applying');
    console.log(JSON.stringify({ status: 'PASS', evidence: 'source drift check only', inputs: plan.inputs }, null, 2));
    return;
  }
  assert.ok(path.isAbsolute(receiptPath), 'Absolute external receipt path required');
  const parent = fs.realpathSync(path.dirname(receiptPath));
  const receipt = path.join(parent, path.basename(receiptPath));
  const repository = path.resolve(root, '../..');
  assert.ok(receipt !== repository && !receipt.startsWith(`${repository}${path.sep}`), 'Keep receipts outside the repository');
  if (mode === '--plan') {
    const plan = createPlan(root);
    fs.writeFileSync(receipt, `${JSON.stringify(plan, null, 2)}\n`, { flag: 'wx', mode: 0o600 });
    console.log(JSON.stringify({ status: 'PREVIEW', receipt, changes: plan.changes.map(({ file, before, after }) => ({ file, before, after })) }, null, 2));
  } else {
    assert.ok(!fs.lstatSync(receipt).isSymbolicLink(), 'Receipt symlink is unapproved');
    const plan = JSON.parse(fs.readFileSync(receipt, 'utf8'));
    assert.equal(plan.root, root, 'Receipt belongs to another project');
    console.log(JSON.stringify(applyPlan(plan), null, 2));
  }
}
if (require.main === module) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(`FAIL: ${error.message}`); process.exitCode = 1; }
}
module.exports = { main };
