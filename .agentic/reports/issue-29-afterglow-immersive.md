# Issue 29 delivery report

Implementation `81b4ce06875438773e833e15e94132f9b86dc7e7`, based on main `3f28da4e48b7b814c3766268c136cdcfa74b2637`. The owner-supplied images were the only untracked files in the original checkout. All seven were visually inspected and copied byte-for-byte into an isolated checkout. The original working tree and index were preserved. The five canonical scenes use locally optimized JPEGs and a midnight fallback. Full provenance, measured bytes and decoded estimates are in the [asset inventory](../../docs/design/afterglow/evidence/issue-29/assets.md).

The presentation places dynamic content over chapter artwork with a localized contrast scrim and protected overflow reader, category-specific controls, finite progress, compact navigation and trivia reveal. Existing content and paging logic remain in place. The [visual evidence](../../docs/design/afterglow/evidence/issue-29/README.md) includes actual screenshots on compact and standard simulators, comparisons to both owner boards and known differences. Owner approval remains outstanding.

## Verification

- PASS — strict validation of this change and all 13 active changes before source edits. Full pinned Node 22.23.4/npm 10.9.9 `CI=1 npm run verify` with dotenv disabled passed after final implementation, including TypeScript, 139 Jest tests, Expo configuration, dependency check, Doctor 20/20 and 38 policy checks.
- PASS — 51 policy tests, root doctor, Python syntax, `git diff --check`, protected-path diff and all seven original-byte comparisons.
- PASS — actual iPhone SE 3 and iPhone 17 screenshots of five chapters, hidden/revealed trivia, refresh, loading, error and long content. Standard production mock and trivia revisit passed. Compact real swipe boundaries, overflow reading, offset retention, failed retry and identical successful trivia reset passed through the standalone XCTest runner.
- FAIL — standard simulator at the largest Dynamic Type setting. The existing overflow XCTest reached trivia answer, revisit, failed refresh and successful reset, then could not reach the long fact attribution within its 45-swipe limit. Complete access to that attribution at this setting remains unverified and requires investigation before acceptance.
- PASS — hosted CI and Expo next baseline workflows on `69145b0`.
- NOT RUN — dedicated assistive technology audit and formal memory profiling, consistent with the requested scope. Decoded footprint is an estimate.
- An initial standard XCTest launch timed out terminating a previous app instance. Restarting the task-only simulator and repeating the final run passed. Earlier incomplete dependency copies caused failed preliminary verification; the clean pinned offline install and final full verification passed.

The source copy, logs, xcresults and isolated runner are under `/private/tmp/kyrshas-issue29`. The original app binary was reused from a previous disposable simulator after checking its bundle identifier, localhost-only Debug ATS and absence of an embedded bundle. No app native rebuild or prebuild was performed. Gortex reported a high-risk lower-bound warning for the existing pager and no configured guard rules. Its suggested extraction was outside the scoped presentation change. Hosted CI and largest-type test status are recorded in the handoff.
