# Design

## Context

See [proposal](proposal.md) for motivation and boundaries and [design contract](specs/afterglow-experience-design/spec.md) for acceptance. Current main `23a02c6` renders `App → createContentSource → HomeScreen → ContentCard → CardText`; `useHomeContent` maintains independent validated category slots. Five mounted ScrollView children currently retain local trivia state. Typed content and provider behavior must survive future presentation work.

`docs/product/brief.md` and `docs/architecture.md` are November 9 legacy observations. Later migration records and issue #23 establish the modern iPhone-only portrait/no-birthday boundaries. Keep historical documents unchanged and explain precedence in the new audit. Main specs are empty; earlier changes remain unarchived historical evidence.

## Goals / Non-Goals

**Goals:** Make the owner-approved visual direction implementable in small pilots through linked documents, state tables, design values, source/test traceability, explicit recommendations and measurable acceptance. Keep 04A task completion separate from future UI acceptance.

**Non-Goals:** Running a visual prototype, changing production behavior or native state, introducing a new content model, deciding production artwork rights or requiring any new package/service. A checkbox depicted on the reference board is not approval for bucket-list completion or persistence.

## Decisions

1. **Documentation structure.** Put current-state evidence in `docs/migration/afterglow-design-audit.md`; put foundations/layouts, interactions, feasibility/accessibility and roadmap in four focused `docs/design/afterglow/` files. Record validation and preservation evidence in `.agentic/reports/issue-23-afterglow-design.md`, prepend an issue-specific handoff while preserving prior entries. Alternative: one very large mixed audit/spec; separate observed and target documents make assertions easier to review.
2. **Approval precision.** Issue #23 approves the Afterglow principles, worlds, five vertical chapters and core interactions. Exact colors, type sizes, timings, package choices and asset files are documented recommendations for future pilots, not claimed owner-approved production details. The two supplied ChatGPT conceptual boards are visually inspected in the conversation; no repository image or production license is assumed.
3. **First implementation recommendation.** Recommend a dependency-free built-in paging pilot with synthetic current content, stable five mounted slots and explicit Previous/Next navigation. Overflow reading uses an inner text scroll area with parent swipe paging disabled for that chapter; buttons/accessibility actions remain available. This avoids ambiguous handoff of one vertical gesture between reading and page changes. Do not add a navigation stack for five finite positions. A focused pager/gesture package is a later alternative only if real iPhone evidence demonstrates a built-in limitation.
4. **Content ownership.** Keep the current provider/normalizer/hook outside presentation changes. Successful trivia revision resets its answer, including repeated content; loading/failure/revisit do not. Mount retention or equivalent explicit presentation state must preserve this contract. Decorative chapter worlds depend on category, not on provider payloads, and must not expand the validated image metadata contract.
5. **Visual implementation recommendation.** Begin with solid dark surfaces, native type and simple local shapes; separate text and controls from background artwork. Use static rights-cleared local illustration assets only after artwork approval. Compare serif system typography with bundled-font options without installing one. Recommend built-in opacity/translation animation after the static experience passes, with Reduce Motion giving immediate static content.
6. **Verification boundary.** Strictly validate the complete OpenSpec change before writing delivery docs. Run final strict current/all OpenSpec, starter harness/Python syntax, local Markdown link and scope checks, contrast arithmetic and whitespace. Compare metadata-only native snapshots; do not read native contents or private env/key material. Full Expo verify is optional for unchanged source and must be explicitly marked NOT RUN if omitted. No simulator, Metro, build, provider call or production art generation in 04A.

## Risks / Trade-offs

- Full-screen art can reduce readability → opaque readable text fallback, measured contrast and complete overflow text take precedence over composition.
- One vertical axis serves both reading and navigation → disable swipe paging on overflowing chapters; visible and accessible navigation is always available; validate this in the first pilot.
- Five rich mounted worlds can consume memory → start with lightweight shapes/static assets, only animate the active chapter and measure before adopting heavier renderers.
- Concept boards contain illustrative controls/content rather than a production contract → explicitly omit completion checkboxes and invented joke splitting, scheduling or uniqueness promises.
- Gortex graph coverage may lag source → cite actual file content, use disk-backed evidence when an indexed response conflicts, and disclose graph limits independently of executable checks.
- Legacy preservation language conflicts with later no-birthday/platform scope → label historical evidence and use issue #23 for this pilot, without changing the legacy records.

## Migration Plan

04A changes documentation only, so no deployment, runtime migration or data rollback exists. Revert only the scoped documentation commit if needed; never reset owner work. Future pilots need their own approved OpenSpec artifacts and strict pre-implementation validation. No sync or archive is part of this delivery.

## Open Questions

These are deferrable execution approvals with conservative defaults, not gaps in the 04A contract: final serif/font file and rights (system fallback first); exact production illustration files/crops/licenses (local shapes first); final tuning of color/animation values after iPhone evidence; acceptable measured art/performance budgets before heavy assets. Package adoption or material departure from the written direction requires explicit future approval. Roadmap documents the decision owner and evidence for each.
