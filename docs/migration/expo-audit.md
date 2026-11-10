# Legacy Expo audit (pilot)

Status: NOT STARTED. No package upgrades or application edits approved.

## Inventory
- Expo SDK / React Native / React versions: [inspect package.json]
- Package manager and lockfile: [inspect]
- Routes/navigation: [inspect]
- Native folders (`ios`, `android`) and config plugins: [inspect]
- Auth, backend, persisted data, deep links, notifications, payments: [inspect]
- Deployment configuration: [inspect]
- Existing tests and usable run commands: [inspect]

## Preservation contract
List critical flows, app IDs, saved data, links, native features, and third-party integrations that must not break.

## Options
| Criterion | Incremental SDK upgrade | Fresh Expo scaffold + migration |
|---|---|---|
| Estimated work | TBD | TBD |
| Risk to native config | TBD | TBD |
| Dependency compatibility | TBD | TBD |
| Risk to user data | TBD | TBD |
| Regression/testability | TBD | TBD |

## Recommendation and approval
- Recommendation: TBD, with evidence and assumptions.
- Human approval: PENDING.

## Proposed migration slices
1. Establish working reproduction and verification baseline.
2. Prepare chosen migration path in a separate branch.
3. Port/upgrade one verified slice at a time.
4. Test on real simulator or device, verify deep links and persistence.
5. Release only after human approval.
