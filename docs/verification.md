# Verification contract

Status: TO CONFIGURE for the real application.

## Required checks
Record exact commands after auditing the repository. **Never claim checks pass while this section remains incomplete.**

| Layer | Command | Expected result | Available? |
|---|---|---|---|
| Format/lint | TBD | No errors | TBD |
| Typecheck/build | TBD | Exit 0 | TBD |
| Unit tests | TBD | Exit 0 | TBD |
| Integration tests | TBD | Exit 0 | TBD |
| E2E/manual device checks | TBD | Evidence attached | TBD |

## Reporting format
- Passed: command, environment, result.
- Failed: command, failure, next action.
- Not run: reason and impact.
- Blocked: unavailable environment or credentials.

## Expo-specific baseline
After the audit, Codex may propose `npx expo-doctor` and `npx expo install --check` as read-oriented diagnostics if dependencies/environment permit. Do not run `--fix`, regenerate native folders, or upgrade packages during the read-only audit. Simulator/device validation is separate from successful TypeScript checks.
