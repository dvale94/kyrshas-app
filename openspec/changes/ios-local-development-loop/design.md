# Design

## Context

See proposal.md for motivation. Main08406d6 includes merged pilot02C, its passing embedded Debug path and native XCTest tools. The owner has five staged paths; preserve their worktree hashes and index blob/mode exactly. Legacy/native fingerprints currently contain20437/30192 entries. The prior disposable simulator and synthetic binary are still available and match recorded identity/UUID. App config, generated plist and installed Debug explicitly set arbitrary/local networking false. The same generated Info.plist serves Debug and Release; verify effective settings rather than assuming no override.

## Goals / Non-Goals

**Goals:** Pinpoint actual transport behavior, attempt safe Metro feedback, retain a repeatable local fallback, deliver a concrete security approval proposal when necessary.

**Non-Goals:** No policy exception, certificate/trust installation, new development-client dependency, account, tunnel service, native regeneration, product migration or release. A local unsigned simulator Release configuration check is not a distribution/release action.

## Decisions

1. Use the existing pinned Node22/npm10 and working Homebrew Pods tooling. Reuse the existing disposable test simulator only after matching recorded synthetic app identity; keep its installed fallback reproducible. Store logs/screenshots/builds/snapshots outside Git and never read legacy credentials into tools.
2. Compare actual Debug/Release effective build settings and selected processed plists. Read-only policy verification rejects any ATS exception/transport allowance rather than silently normalizing it. Add fixture tests for fail-closed policy/identity and distinct Debug/Release inputs, without weakening prior checks.
3. Start isolated Metro on loopback with dotenv/telemetry disabled; verify status and synthetic bundle separately. Probe native localhost and numeric-loopback host selection via ephemeral Debug launch arguments, with native logs identifying the failing URL. A harmless temporary caption edit is evidence only if the simulator actually receives it without native rebuild; embedded stale rendering must never count as Fast Refresh.
4. Expo Go or adding expo-dev-client would change the native runtime being validated; neither removes the installed app's ATS policy. Expo CLI documents --https as web-only. A trusted native HTTPS/WebSocket workflow needs existing compatible trust/certificates or new trust provisioning; do not install a CA or disable verification. No public tunnel/new service is introduced. Embedded bundling is supported but requires bundling/reinstallation, so it is a fallback, not a live-loop pass.
5. If probes confirm a policy boundary, prepare a documentation-only diff preview for a dedicated Debug plist that inherits the existing base and adds only a localhost insecure-HTTP domain exception. Release must continue referencing the strict base, with no global exception. A later approved implementation must establish a committed config-plugin/tooling source-of-truth without automatically regenerating the protected native tree; explicit contained application and Debug/Release processed-plist tests are prerequisites. Preview remains inert documentation until owner approval.
6. Complete safe verification/docs/report and open a PR even when live reload is blocked, as issue9 explicitly permits. Keep staged owner changes out of commits using path-limited commits and verify index blob/mode after delivery. Record tool escalations, failed attempts and required owner decisions separately.

## Risks / Trade-offs

- [Embedded fallback hides rejected networking] → Compare the edited Metro marker with actual simulator text and retain ATS logs; do not infer freshness from a launch PASS.
- [Build tools touch generated artifacts] → Compare original native project/config separately from disposable Pods/build products; no deletion/regeneration. Preserve all legacy entries and disclose any unexpected change.
- [Numeric host or TLS changes appear to bypass the symptom] → Require observed native transport and unchanged policy; never disable security verification.
- [A future Debug exception leaks into Release] → Dedicated source/build-setting separation plus built Release negative assertions, reviewed before policy application.

## Approved implementation — 2026-11-16

The separate owner decision authorizes only the proposal's exact localhost Debug dictionary, superseding the historical no-policy-change non-goal for that allowance alone. A shared CommonJS module supplies strict/default and approved Debug policies plus fail-closed native transformation. An Expo dangerous mod calls the same explicit synchronizer used by the CLI; introspection must leave the default Info.plist strict and perform no disk mutation. The synchronizer checks the single synthetic app target, exact Debug/Release configurations, paths, strict base, absence of ATS overrides, and expected existing Debug state. It produces a receipt of input/output hashes before an explicit apply; changed input, unknown Debug contents or symlink traversal is rejected. Only the Debug plist and Debug INFOPLIST_FILE reference may change. Repeated application is idempotent; no native prebuild is invoked.

Checks distinguish approved Debug from strict Release/default and reject any extra policy keys/domains, subdomains, broad allowances or missing values. Independent actual simulator configuration builds provide processed-plist proof before an initial approved Debug installation. Metro acceptance then requires baseline rendering, a harmless source edit and native refresh in the same installed app, with binary fingerprints and no intervening build/install. Restore the probe source and run native smoke afterward. Exact-policy failure is a stopping condition, never a reason to widen transport permission.

## Migration Plan

No deployment occurs. Restore temporary synthetic source probes by exact-match guarded edits. Retain the existing embedded bundle baseline. A future approved Debug policy change must include a narrow patch preview, strict Release proof, no native regeneration, and rollback by removing only its dedicated source/config files and reference; do not overwrite owner edits or restore native trees wholesale.
