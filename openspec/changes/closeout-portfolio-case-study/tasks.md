# Tasks

## 1. Evidence and portfolio

- [ ] 1.1 Audit repository history, design, architecture, reports and GitHub records; cite the resulting timeline and evidence.
- [x] 1.2 Rewrite the README with independent launch instructions and real visual evidence or a capture checklist; verify links and image paths.
- [x] 1.3 Document architecture evolution and the agentic retrospective with supported examples and limitations.
- [x] 1.4 Reconcile roadmap, handoff and active OpenSpec statuses with evidence and recommend archive decisions without archiving.

## 2. Verification and delivery

- [x] 2.1 Run strict OpenSpec validation before documentation edits and again on all changes; record results.
- [x] 2.2 Run documentation scope, relative-link, root harness and whitespace checks; record actual outcomes.

Final reconciliation: strict validation passed all 16 active changes; root `python3 scripts/doctor.py` and its Python syntax check passed; nine documentation files' relative links and image paths resolved; `git diff --check` passed. The diff against main contains documentation, planning artifacts and the six owner-supplied screenshots only. Application tests were not rerun. Task 1.1 remains open because the prior delivery recorded the broader evidence audit as incomplete; the independent review established alignment, not completion of every audit step. Draft [PR #35](https://github.com/dvale94/kyrshas-app/pull/35) exists and remains unmerged.
- [x] 2.3 Prepare a scoped draft PR for owner review, or document delivery blockers.
