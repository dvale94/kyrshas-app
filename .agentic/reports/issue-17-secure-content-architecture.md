# Issue #17 — secure live-content architecture planning pilot

November 17, 2026 (America/New_York). **03F-A documentation delivery; implementation approval pending.** [Issue](https://github.com/dvale94/kyrshas-app/issues/17) fetched directly through GitHub connector, including comments (none). Branch `pilot/03fa-secure-content-architecture`; latest fetched main `0c829f354a135b5bfdcfe48fb9412944c2a1e188` (merged PR16). Kickoff `main`/index/worktree clean. Local main was behind and fast-forwarded before the dedicated branch; no owner modification was reset/stashed or discarded.

## Delivered decision package

- [OpenSpec proposal](../../openspec/changes/secure-live-content-architecture/proposal.md), [design](../../openspec/changes/secure-live-content-architecture/design.md), [scenarios](../../openspec/changes/secure-live-content-architecture/specs/secure-content-delivery/spec.md), [tasks](../../openspec/changes/secure-live-content-architecture/tasks.md) and metadata. Complete strict gate passed **before** delivery docs; seven repository changes passed strict validation. Specs remain proposed/unarchived; prospective runtime requirements are not implemented.
- [ADR0002](../../docs/decisions/0002-secure-content-delivery.md): recommend reviewed original/rights-cleared feed behind a versioned read-only HTTPS boundary, with optional separately approved private ingestion. Public reads never fetch providers.
- [Architecture](../../docs/migration/secure-live-content-architecture.md): five legacy methods/response shapes/categories/images, three options, public-source terms/pricing/confidence, synthetic contracts, source/rights metadata, quotas, cache/TTL, failures, image decision, privacy and operational limits.
- [Threat model](../../docs/migration/secure-content-threat-model.md): T1–T13, custody/lifecycle, owner-only compromised credential incident plan, public abuse/SSRF/publication/license risks, containment and residual device retention.
- [Roadmap/approval checklist](../../docs/migration/secure-content-roadmap.md) and [verification matrix](../../docs/migration/secure-content-verification.md): bounded03F-B1 offline backend, B2 approved staging/smoke, B3 mobile adapter, separate production approval; V1–V13 outcomes and explicit unexecuted status.

Current provider documentation materially affects recommendation: API Ninjas Free/Developer disallow output caching; Free redistribution is restricted and a public substitute feed needs provider clarification even on a paid caching plan. Reference links/access date and conservative cost assumptions are in the architecture. Default proposal avoids provider subscription by using reviewed originals; does not pretend to provide unlimited unique external results. No provider account or live content endpoint was accessed.

Birthday experience is permanently excluded from modern architecture and all future implementation/tests. Historical audit/brief/handoff birthday preservation/deferred03E wording is superseded for modern behavior by issue17/current owner instruction; legacy contents/assets remain untouched. Current independent loading/last-good/retry/stale protection, canonical IDs/order, trivia controls, local shapes and strict Release/default ATS/localhost-only Debug boundary are preserved.

## Local verification outcomes

| Check | Outcome and limit |
|---|---|
| Direct GitHub issue/comments, fetch main and clean kickoff status | PASS; no issue comments, base0c829f3, required branch created |
| Complete planning `openspec validate secure-live-content-architecture --strict` | PASS exit0 before architecture delivery documents |
| Planning `openspec validate --all --strict` | PASS exit0,7 passed/0 failed before architecture delivery documents |
| `python3 scripts/doctor.py` | PASS exit0; required starter files/skill frontmatter only; its message says application tests not configured (root harness scope) |
| `PYTHONPYCACHEPREFIX=/private/tmp/kyrshas-issue17-pycache python3 -m py_compile scripts/doctor.py` | PASS exit0; syntax only, external cache |
| Isolated modern `npm run typecheck` | PASS exit0; unchanged existing installation, no install/manifest/lock change |
| Isolated modern `npm test` | PASS exit0;62/62 in3 suites,0 snapshots,3.985s; synthetic mocks forbid fetch/XMLHttpRequest |
| Draft-doc consistency | PASS:9 initial Markdown planning/delivery files,27 existing local links and3 parsed JSON examples; report link was deferred until this file existed. Final all-file verification recorded below after handoff/report creation |
| Source scope guard | PASS at document draft:10 changed paths, all planning/docs only; final allowlist includes12 paths once report/handoff exist |
| Native metadata | PASS:20,437 legacy and30,193 modern entries identical in path/type/size/mtime/link target. No native file contents read. External baseline `/private/tmp/kyrshas-issue17-native-metadata.json`; not a bytewise/content/native runtime audit |
| Full modern `npm run verify`, Expo compatibility/config/Doctor, clean install | NOT RUN for docs-only change; selected unchanged local typecheck/Jest run instead; no dependency/config/product change |
| Native builds/simulator/device/VoiceOver, ATS runtime, live API/penetration tests | NOT RUN; intentionally outside pilot. No native PASS inferred from past PR16 evidence |
| Credential validity/revocation/account entitlement/terms approval | NOT RUN / pending owner; never read or test compromised credential |

Staged whitespace check PASS exit0; exactly12 documentation/planning files staged. Gortex staged detect sees12 files/163 symbols with MEDIUM lower-bound risk because its output/reach budget was reached, despite zero reported dependents/tests. On five returned documentation IDs, tests reports0/5 coverage (no suggested commands), guards reports no configured rules/zero violations, and contract verdict is allow with LOW blast risk. This is supplemental documentation graph evidence, not runtime security assurance. Final link/scope/strict and hosted evidence is completed in the delivery section below. No failing executed application test was hidden or repaired.

## Gortex, workflow and interventions

Used repository OpenSpec proposal and verify-delivery skills. Planning skill's normal stop after planning is overridden only by the issue's explicit authorization to produce architecture delivery documents after strict validation; no apply/product workflow was started. Repository Gortex MCP was used for instructions/source/docs reads, task evidence, impact, guarded document writes and durable notes. The one initial unresolved provider mapping was read through Gortex before the impact stage; no source/config shell dump or grep was used to inspect credentials.

Tool recoveries, all visible and autonomous: relative AGENTS path ambiguous across tracked repositories→absolute path; impact query returned `ids is required`→file-targeted handoff impact LOW/0 dependents; durable note required `body` rather than `content`→corrected; an instructions lookup before scaffold returned change-not-found→created metadata through Gortex and reran instructions. OpenSpec metadata/artifacts were written via Gortex (not CLI mutation) to honor mandatory guarded edits. CLI context/list/status/instructions/validate remained read/check operations. First detect reported no changes because new documents were untracked; staged detect is required below. No Gortex server fallback/daemon start or application mutation.

Initial sandbox Git fetch could not write `.git/FETCH_HEAD`; automatic environment escalation then succeeded. Fetch, clean fast-forward and branch creation each received automatic approval (3 at initial documentation draft),0 automatic review rejections. Subsequent scoped staging/commit/push actions are delivery operations, not owner architecture approval. No extra human scope decisions/clarification, no subagents, no provisioning/credential/account tool call. Public web research used documentation/status pages only, no provider demo submission.

Autonomous review correction: cache TTL now includes the next freshness transition so cached `fresh` metadata cannot cross24h. This was a documentation consistency repair; no test or policy was weakened. Root historical verification suggested comparing docs against the real key and testing birthday behavior; both are deliberately superseded by this issue's stricter no-key-read/permanent-exclusion boundaries, not silently executed.

## Preservation, risks and explicit stop

Expected diff: five new OpenSpec files, one ADR, four migration docs, this report and handoff only (12 paths). No App/content/hook/card/fixture/test/dependency/CI/app/EAS/env/native/security/signing/identity/ATS or legacy changes. Two ignored native trees have matching metadata; backup not accessed; no prebuild/Pods/Xcode/native generation, no owner cleanup. Current compromised-key status remains unknown and unresolved by this documentation PR.

**Owner approval required before implementation:** provider/content rights, hosting/operator/account, recurring/hard budget, domain/TLS authority, secret-store admins/custody and production/live access. Concrete recommendation/cost alternatives are reviewable in the roadmap. Recommend credential-owner revocation immediately if historic key active; no agent revocation/rotation/cleanup performed. Provider licensing/entitlements, hosting controls/charges, editor workload and delivered-content retention remain explicit risks. Merge of planning docs alone is not implementation approval.

No backend skeleton/networking, service/signup/provisioning, mobile switch, private media, merge/deploy/release or OpenSpec archive. Final draft PR remains the sole external delivery artifact requested.

## Delivery evidence

Pending scoped commit/push and creation of exactly one draft PR against main; hosted harness result will be checked independently. Expo hosted workflow is expected NOT RUN because unchanged paths do not match its app/assets/workflow filter. No claim of hosted success is made before observing it.
