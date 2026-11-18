# Home content orchestration — Pilot 03C

Issue [#13](https://github.com/dvale94/kyrshas-app/issues/13), following merged PR #12 at `ed9cf95`. Change: [home-content-orchestration](../../openspec/changes/home-content-orchestration/proposal.md). The complete proposal/design/spec/tasks passed strict validation before source edits. The issue and user's instruction authorize bounded autonomous delivery; no merge/archive.

## Content seam

`src/home/content.ts` exports `CardContent`, a discriminated union with exact legacy IDs (`quote`, `trivia`, `fact`, `dad joke`, `bucket list item`), title/text, optional attribution/local artwork and trivia-only required answer. `ContentProvider.load(id, { revision })` returns a promise; inject a stable provider object into `HomeScreen` in tests. The successful revision starts at zero and advances only after validated success. No transport DTO, dependency or global store is introduced.

`normalizeContent` copies only known fields, trims text/attribution, rejects mismatched identity, empty required content, missing trivia answer, unexpected non-trivia answer and malformed local artwork. Optional blank attribution is omitted. Image fields are local labels and six-digit colors, never URLs. Failure becomes a generic card error; raw error/response details are neither rendered nor logged.

`createMockContentProvider({ delayMs, wait })` reuses the existing synthetic variants. Default 650ms is entirely mock-owned; `delayMs: 0` or an injected wait permits deterministic tests. Revision modulo variant count chooses content without shared mutable cursors, clock data or randomness. A rejected attempt retries the same next variant. No provider transport or credentials are used.

## State and retained behavior

`useHomeContent` owns five stable slots with idle/loading/ready/error status, optional last-good content and successful revision. It launches independent requests, synchronously suppresses duplicate pending actions, and permits other categories to overlap. Each effect generation owns its request identities and active flag. Replacement/unmount invalidates that generation; obsolete success and failure cannot publish. Pending mock work finishes without cancellation or a post-unmount state write.

| Surface | Retained contract | Approved improvement from legacy / 03B |
|---|---|---|
| Five cards | Same IDs/order, green hierarchy, synthetic labels/artwork, optional author, growing text and 48px controls | Slots exist during asynchronous startup; completion order never sorts the feed |
| Startup | All five normal-day categories start concurrently | Independent success/failure replaces legacy Promise.all global blocking and data-dependent splash behavior |
| Refresh | One card's refresh leaves other content and answer state intact | Content ownership moves from card-local fixed fixture rotation to provider/hook; last-good stays visible while pending or failed |
| Failure/retry | Safe generic refresh error retains content | Initial failure has a useful error slot; labeled Retry actions clear error and restart only the affected card; every outcome clears busy |
| Trivia | Accessible Show/Hide, matching answer, hidden after new question | Only that slot's successful revision remounts CardText; unrelated updates and failed trivia refresh preserve visibility |
| Accessibility | Button names, expanded/busy/disabled states and readable content | Polite loading/error text plus explicit iOS VoiceOver status announcements; no raw exception payload |
| Native | Portrait/scroll/localhost Metro, strict default/Release ATS | No native/project/config/security or identity change; reused native binary provenance reported separately |

All content/state remains synthetic and in memory. Birthday, personal artwork, navigation, persistence, provider images/live APIs and credentials are deferred to separately approved phases. Legacy source/native projects and backup remain preserved.

## Reproducible verification

Select existing Node22.23.4/npm10.9.9 in `modernization/expo-next`; never run the root legacy Expo scripts or load legacy dotenv. In a clean external copy preserving the scaffold's relative `../../assets` path, run `npm ci --no-audit` then unchanged `CI=1 npm run verify`. Run existing native-source checker, `node scripts/sync-ios-debug-policy.cjs --check`, both policy test files, root harness/Python syntax, whitespace/scope and `openspec validate --all --strict`.

The retained 17 functional cases cover presentation/trivia/refresh/overflow/optional fields and network prohibition. The expanded suite uses deferred requests to test independent startup, out-of-order completion, partial failures/retry, same-tick duplicates, overlapping cards, stale provider replacement during initial/refresh, unmount, invalid shapes and injectable mock completion/rejection. Native and hosted evidence are distinct from these tests.

For normal native smoke, generate the existing standalone external runner and pass `-only-testing:KyrshaSmoke/SmokeTests/testSyntheticIPhoneSmoke`. For controlled failures, use the separate `testControlledMockFailureRecovery` method against an external-only App.tsx injection: stable wrapper around `createMockContentProvider({ delayMs: 8000 })`, reject quote's first initial request and trivia's first refresh after waiting, then delegate subsequent requests with the same revision. No failure flag exists in product source. Stop Metro before changing the external entry; after the controlled test restore App.tsx byte-for-byte, restart Metro and repeat normal smoke. Keep runners, logs, screenshots and xcresult outside Git; target only a newly created disposable iPhone.

## Execution evidence

See the [issue report](../../.agentic/reports/issue-13-content-orchestration.md) for final locked, native, hosted and preservation outcomes and workflow metrics. A reused prior patched unsigned binary is not a new native build. Physical devices, production artwork/launch parity, live providers, installed-upgrade continuity, signing and release are outside this issue.
