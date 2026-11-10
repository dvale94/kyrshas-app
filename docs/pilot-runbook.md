# Expo pilot runbook

1. **Protect original:** work in a clean clone/branch; inspect `git status`, back up important signing/configuration assets without copying secrets into the starter.
2. **Bootstrap harness:** `python3 /path/to/starter/scripts/bootstrap.py --target .` then `--apply`; inspect `git diff`.
3. **Configure integrations:** use `docs/setup-tools.md` to install/initialize Codex/OpenSpec/Gortex/Expo tools. Review generated changes.
4. **Audit only:** invoke `$audit-project` (or refer to the skill explicitly) using `docs/migration/expo-audit.md`. No application edits.
5. **Decide:** owner approves incremental upgrade or fresh scaffold based on evidence. Preserve app IDs, persistence, auth flows, deep links, notifications, and other installed native features.
6. **Propose:** generate an OpenSpec change for a verification baseline; approve scope. Do not combine modernization, redesign, and new features in the same change.
7. **Deliver:** invoke `deliver-feature` on one approved slice; Codex tests and reports evidence.
8. **Verify:** fresh `verify-delivery` review, real simulator/device testing, CI checks, and human acceptance.
9. **Generalize:** only after the pilot, update reusable starter files and test bootstrap on a separate web/API repo.

## Read-only initial audit prompt
"Use the audit-project skill. Inspect this legacy Expo repository and update docs/migration/expo-audit.md with actual versions, architecture, dependencies, risks, preserved functionality, and a supported recommendation for incremental SDK upgrade versus fresh scaffold. Do not modify application code or packages. Summarize blockers and approvals required."
