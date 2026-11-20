# Proposal

## Why

[Issue #23](https://github.com/dvale94/kyrshas-app/issues/23) approves Afterglow — Cinematic Discovery Chapters as the Phase 04 direction. The current green scrolling card UI needs a source-grounded, implementation-ready design contract before small UI pilots can safely replace its presentation.

## What Changes

- Deliver Phase 04A documentation only: current-state audit, visual foundations and five chapter layouts, navigation/state model, artwork/motion feasibility, accessibility requirements and staged implementation roadmap.
- Record the two owner-supplied conceptual boards, their limits and the written approved direction: “Five little moments, just for you.” Five full-screen vertical snapping chapters in Quote → Trivia → Fact → Dad Joke → Bucket List Item order, with automatic content entrance.
- Define future acceptance criteria while preserving typed content validation, asynchronous independent loading/refresh, stale-request protection, last-good content, retry and trivia semantics.
- Preserve historical records and explicitly exclude birthday content from the modern app. Treat legacy platform notes as historical evidence.
- Provide strict OpenSpec, documentation/harness/scope/preservation evidence, a bounded report/handoff and a draft PR against main. Do not implement or archive this change.

## Capabilities

### New Capabilities

- `afterglow-experience-design`: Reviewable design contract for cinematic chapter presentation, accessible interaction and bounded future implementation pilots. This capability governs documentation deliverables; its target UI is not implemented by 04A.

### Modified Capabilities

None. `openspec list --specs` reports no main specs. Historical unarchived changes describe implemented green cards and local content behavior; preserve them. This change records the approved future presentation direction without claiming the running UI or historical requirements have already changed.

## Impact

Only `openspec/changes/afterglow-design-specification/`, new `docs/design/afterglow/` documents, `docs/migration/afterglow-design-audit.md`, `.agentic/reports/issue-23-afterglow-design.md`, and an additive `.agentic/handoff.md` entry are in scope. Base: fetched main `23a02c686c87d0e6bcb8e8405fd7d41cd5828d9e`; kickoff worktree/index clean.

No application source, tests, scripts, configuration, dependencies, CI, native tree, persistent model, provider/network architecture or credential changes. Preserve Expo SDK 58, portrait iPhone-only target and `com.dvale1994.kyrshasapp`; preserve default/production mock and explicitly enabled local-development `live-local` only. Never inspect private `.env.local` or historic credentials, call providers, regenerate native projects, modify Pods/signing, access the owner's separate backup, merge, deploy, publish or archive. No birthday, remote-photo feature or production asset generation. New packages, artwork rights, production services and material choices outside issue #23 require later owner approval.
