# Issue #3 handoff — local iOS inventory

- Work item: [issue #3 — pilot 02A](https://github.com/dvale94/kyrshas-app/issues/3); audit date November 10, 2026 (America/New_York).
- Baseline: fetched `main` / `origin/main` / initial HEAD `25122c389fa766a0c6019e93057b4d77dc90a9dc`; divergence `0 0`, initially clean worktree. Dedicated branch: `audit/issue-3-ios-native-inventory`; PR target `main`.
- Scope: documentation only, following `AGENTS.md`, `.agents/skills/audit-project/SKILL.md`, architecture, prior audit, verification contract, pilot runbook and prior handoff. The issue's three-path allowlist supersedes the prior issue's five-path delivery check. No modernization implementation is approved.
- Result: real ignored local `ios/` inspected; separate local backup independently checked; conditional config/plugin preservation and later isolated regeneration recommended. Tablet targeting, display-name/version drift, ATS policy and asset provenance require resolution before accepting a replacement.

## Deliverables

Exactly these paths are authorized:

- `docs/migration/ios-native-inventory.md`: local evidence table, generated-like versus likely local changes, app identity/signing/capabilities, dependencies/project metadata, risk, preservation actions, confidence and material questions.
- `.agentic/reports/issue-3-ios-inventory.md`: this task record and pilot metrics.
- `.agentic/handoff.md`: pointer to this report and prior audit context.

## Checks and outcomes

| Outcome | Check | Evidence / limit |
|---|---|---|
| PASS | GitHub issue and comments retrieved directly | Connector fetched issue #3 and empty comments; no issue copy-paste required. |
| PASS | Main sync and branch isolation | Fetch succeeded; baseline equal to current remote main; dedicated branch created. Sandbox initially denied `.git/FETCH_HEAD` and `index.lock`; automatically reviewed escalations succeeded. No reset or cleanup. |
| PASS | Native availability / Git exclusion | Local `ios/` exists, `git check-ignore ios` succeeds, `git ls-files ios` returns zero files. |
| PASS | Read-only native/project inventory | Parsed project with `plutil -convert json -o -`; parsed workspace/scheme XML and first-party plists; inspected all first-party source and build references, Pods metadata, settings and assets. No Xcode/build phases executed. Sensitive values suppressed before output. |
| PASS | Separate backup existence/content/independence | Outside worktree; distinct resolved roots, backup root not a symlink; 16,134 regular-file pairs share no inodes. All 20,437 path/type/hash-or-link entries match, including 2,626 symlinks; all 27 first-party regular files match. No backup copied, modified or uploaded. This is not a restore/off-device/external-symlink-target test. |
| PASS | Native syntax metadata checks | All three first-party plist/entitlements files parse. `ruby -c ios/Podfile` exits 0 (`Syntax OK`); parses only, does not execute Ruby/Pods. |
| PASS | `python3 scripts/doctor.py` | Exit 0; starter structure/skill frontmatter only. Application tests explicitly not configured/run. |
| PASS | `PYTHONPYCACHEPREFIX=/private/tmp/kyrshas-issue3-pycache python3 -m py_compile scripts/doctor.py` | Exit 0, Python syntax only; cache outside Git/native directories. |
| PASS | Final documentation/scope/leak/native-preservation checks | `git diff --check` exits 0; exactly three approved paths; relative links and native path citations resolve; no trailing whitespace. Boolean-only guard finds no configured credential, signing value, app/account identifier or private home path in the new documents. All native and backup path/type/file/link fingerprints remain unchanged. |
| NOT RUN | App startup, bundle/build, simulator/device, live API, signing/accounts, shipped-binary entitlements, backup restore | Outside this read-only task. No runtime or release-parity pass claimed. |
| NOT RUN | Installs, dependency repair, pod install, prebuild/run:ios, native regeneration/deletion, credential changes, deployment/publishing/merge | Explicitly excluded. Prior dependency failures remain prior-audit findings; they were not rerun or repaired. |
| FAIL | None of the required audit/delivery checks so far | Native/config inconsistencies are findings, not a passing migration gate. |
| BLOCKED | No blocker to documentation delivery | Decoded image/pixel comparison unavailable (Pillow absent); no installation attempted. Visual equivalence, effective built metadata, account state and device/storage behavior remain next-phase evidence gaps. |

## Tool contribution and limitations

Gortex MCP supplied indexed architecture/prior-audit/verification/runbook/handoff context and documentation impact evidence (LOW graph risk; two new paths were not indexed yet, so no-callers is not proof of no readers). A batched source response was capped at five files: required existing documents were returned, while package/config metadata came from safe local diagnostics. Gortex supplied no useful native source understanding for ignored `ios/`; the inventory is grounded in local files, not an assumed remote template. Changes use Gortex edits. Staged detect identifies exactly the three documentation files with LOW graph risk and zero affected dependents. Tests mapping finds no tests for the three document headings (not an application test pass); guards reports no configured rules or violations; contract returns `allow`, low risk. The initial unstaged detect omitted new untracked documents; staged detection includes them.

Minor tool retries: ambiguous relative `AGENTS.md` resolved with absolute path; unsupported recall selector removed; note save retried using `body`; initial official CNG documentation fetch succeeded on retry. None changed scope or required user intervention. SHA-256 fingerprints are temporary local verification artifacts outside Git; private paths/values are absent from committed evidence.

## Decisions and next work

Review the inventory's material questions before approving a scaffold: tablet/orientation intent, display name/version authority, ATS policy and secure identity/signing continuity. Preserve the original and matching backup; resolve asset provenance and validate equivalent generated settings, release behavior and installed data in a separately approved migration. The existing exposed client credential remains a separately owned security issue. No decision is required to open/review this documentation PR.

## Pilot metrics

User interventions after kickoff: **0**. Additional task-specific prompts: **0**. Issue contents retrieved autonomously from GitHub: **yes**. Tool/environment blockers preventing delivery: **none**; sandbox retries, Gortex response limits and unavailable optional pixel comparison are recorded above. This metric excludes later PR review or migration approval.
