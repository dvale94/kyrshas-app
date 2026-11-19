# Secure content verification and acceptance plan

November 17, 2026 (America/New_York). **Planning acceptance and future runtime acceptance are different gates.** [Issue #17](https://github.com/dvale94/kyrshas-app/issues/17), [architecture](secure-live-content-architecture.md), [threat model](secure-content-threat-model.md), [roadmap/owner gate](secure-content-roadmap.md), [OpenSpec scenarios](../../openspec/changes/secure-live-content-architecture/specs/secure-content-delivery/spec.md). This plan was produced after complete strict planning validation passed.

## This pilot: executable documentation checks

Run existing safe repository/harness commands and strict OpenSpec; do not install packages, add doc-lint dependencies, change CI or execute legacy Expo commands. [Historical verification](../verification.md) describes an older audit and is not permission to load EAS/`.env`, scan against the actual key, test birthday/private content or rebuild native projects. Issue #17 overrides those checks for this pilot. Compare only new scoped text for synthetic credential canaries/patterns without reading any real credential. No scanner can establish absence of an unknown secret without broader inspection; scope and no-secret-input custody provide additional assurance.

Required commands:

```text
python3 scripts/doctor.py
PYTHONPYCACHEPREFIX=/private/tmp/kyrshas-issue17-pycache python3 -m py_compile scripts/doctor.py
openspec validate secure-live-content-architecture --strict
openspec validate --all --strict
git diff --check
```

Supplemental unchanged mock regression commands, only with existing isolated dependencies:

```text
cd modernization/expo-next
npm run typecheck
npm test
```

These tests mock/forbid fetch/XMLHttpRequest and use synthetic data; no live provider or credential is needed. Do not call root `npm start`, Expo/EAS environment config, prebuild, Pods, Xcode, simulator or provider smoke. Full `npm run verify` includes configuration/online compatibility/Doctor checks and is not required for documentation-only changes; distinguish it as NOT RUN unless actually executed. No clean install is needed. Hosted Expo workflow is path-filtered to modern app/assets/workflow changes; this documentation diff should not trigger it. Root harness CI outcome must be read independently after push, not inferred from local checks or previous PR16.

Additional read-only validations:

- Scope allowlist: exactly the five files in the new OpenSpec change (including metadata), one new ADR, four migration documents, one issue report and the handoff update. No other tracked delta from fetched main; no app/native/CI/dependency/config/credential changes. Check index/worktree before/after; preserve owner changes (kickoff was clean).
- Native metadata fingerprint: capture path/type/size/mtime/link target for both ignored `ios/` trees without reading their file contents, compare at completion. Backup not accessed. This demonstrates no observed metadata drift, not a bytewise native audit or runtime pass.
- Documentation: local relative links resolve, all fenced JSON examples parse and contain invented text only; exact five route→canonical ID mappings, field bounds, typed errors and approval gates agree across OpenSpec/ADR/architecture/threat/roadmap. Check all sources have links and access date; distinguish provider assertions from live/account verification.
- Product/privacy: only permanent exclusion language or historical precedence discussion refers to birthday; no date logic, personal content or private-asset references copied into examples or future tests. No remote URL/base64 appears as a proposed `PlaceholderImage` value.
- Gortex: impact before guarded document edits, detect after, then tests/guards/contract on detected IDs. Treat graph findings as supplemental; documentation graph extraction may be incomplete and never proves runtime security.

## Future contract/security matrix — NOT RUN in 03F-A

All tests below belong to a separately approved implementation. Use wholly synthetic fixture records, fake-clock/time, mocked upstream and synthetic canary credentials, never historical provider content/keys. Bind scenarios to the `secure-content-delivery` requirements and T1–T13 threat register. Test at boundary and user outcome level; do not merely mirror helper implementation.

| ID / phase | Test input and setup | Required observable acceptance |
|---|---|---|
| V1 / B1 normal mapping | Five valid synthetic records and each exact GET path | Exactly one matching canonical ID/title; quote optional author handled, trivia required answer; no answer on other cards; schemaVersion1; no remote image; source/rights metadata valid; order remains mobile-owned canonical order |
| V2 / B1 empty/malformed | Empty arrays/object/pool, invalid JSON/content-type, nulls/wrong types/ID/version, blank required strings, absent trivia answer, duplicate/unknown producer fields | Reject before publish/adapter return; public503 for unavailable pool, safe card error; no partial invalid publish or raw provider text; unsupported version/input handled deterministically |
| V3 / B1 payload bounds | Exactly at and over text2000/answer500/author160 codepoints; Unicode/newlines; response16KiB/upstream64KiB decompressed, compressed expansion, slow body | Valid boundary accepted, overflow terminated/rejected before unbounded allocation; no truncation that silently changes answer; job deadline8s and attempt3s enforced; no new unreviewed record |
| V4 / B1 methods/URL/headers | Unknown slug/version; POST/HEAD; extra query/revision/cache-buster; nonempty/oversized body/header/path; user-controlled URL/userinfo/port, HTTP, cross-origin redirect | 400/404/405/413 or host431 as applicable, Allow GET on405; no provider call; fixed TLS origin/port only for ingestion, redirects disabled and secrets not forwarded; do not test real internal endpoints |
| V5 / B1 upstream classification | Mock401/403/429/500/timeouts/empty/invalid data | Auth failure stops ingestion and alerts; quota scheduling respects Retry-After/counts attempts; at most one jittered transient retry within budget; three transient failures open15min circuit; half-open consumes budget; last approved artifact unchanged |
| V6 / B1 freshness/rights/cache | Fake-clock24h/7d boundaries, earlier license expiry, takedown, cache hit/miss/stale, failed store | TTL≤300s and remaining permitted lifetime; fresh/stale metadata correct; no stale past expiry/takedown; corrupt/missing pool503; errors no-store; no upstream on miss; timestamp cannot auto-refresh without review |
| V7 / B1 storms/counter races | 10,000 synthetic public GETs from multiple IPs/locations; concurrent ingestion reservation attempts; unavailable counter | Zero provider calls from public reads;60/min/IP across routes rejected with429/Retry-After60 where enforced; global job calls never exceed50/day or1,000/month including retries; atomic counter rejects races/fails closed; demonstrate per-location limiter cannot stand in for budget |
| V8 / B1 cache/publication integrity | Caller cache/header injection, unauthorized publisher, direct origin/preview bypass, malformed artifact | Unknown headers cannot vary poisoned cache; reader cannot publish; only reviewed schema-valid artifact usable; unsafe content can be disabled/purged across variants; no control bypass through aliases |
| V9 / B1 safe errors and secrets | Mock auth/upstream errors containing synthetic key canary/header/stack/internal host; capture response/logs/CI artifacts | No canary/config/raw headers/body/account detail in public output or logs; generic typed≤1KiB errors and opaque ID; content JSON/nosniff/cache controls correct; PR CI has zero production secret access |
| V10 / B1 safety/privacy | Script/HTML/links, offensive/private/risky/false-claim synthetic drafts, source/license/attribution missing; log retention fixtures | No executable/autolink behavior; unreviewed/risky record not publishable; rights ledger/reviewer required; no body/IP/device/auth log fields, retention configured and demonstrated; originals fallback only if rights-cleared |
| V11 / B2 isolated environment | Owner-authorized staging host/control plane; mock upstream first | TLS/HTTPS/HSTS policy, request bounds, all aliases, secret/publisher/read role isolation, protected deployment identity, actual edge/cache-hit throttle, budget cutoff and alert routing demonstrated. Live provider smoke only with explicit authority and new key:≤5 category successes +≤2 diagnostic attempts total; store no raw response/key in report; no image calls |
| V12 / B3 mobile outcome | Approved adapter with mocked HTTP normal/empty/error/429/offline and controllable completions, then separately approved iPhone checks | Five independent slots/IDs/order, no global blockage; failed refresh retains last-good and same revision; no same-card duplicate; obsolete/unmounted/provider-replaced completion ignored; trivia resets only on new success, unrelated/failed updates preserve visibility; generic safe errors/retry, local images, long Unicode/author/a11y48px controls retained.5s total timeout/abort and retry/cooldown tested; same cached success valid. No birthday/private assets; existing62 tests still pass |
| V13 / rollout | Controlled operator drills for credential rejection, rights loss, spend cap, poisoned publish and rollback | Assigned owner receives alert and can disable ingestion/serving, purge/recover safe artifact and retain redacted evidence; public reads never recover by provider fetch. Budget exhaustion safely denies availability; account-wide impact documented. No claim of already-delivered text erasure; separate owner go/no-go before production |

## Evidence and release criteria

Record exact commands, exit codes, test counts, head SHA, host/account role confirmations and redacted incident/smoke receipts. A mock contract test is not a provider availability/license test. A static/native-policy test is not a device run. A hosted job skipped by paths is NOT RUN, not PASS. A merged planning PR is not service approval.

Planning pilot passes when its documentation checks pass and draft PR/hosted evidence is recorded honestly, while owner decisions remain explicitly pending. Follow-on implementation passes only its separately approved phase and matrix exits; no phase grants later production authority. Keep all new OpenSpec artifacts unarchived; do not merge/deploy/release in this pilot.
