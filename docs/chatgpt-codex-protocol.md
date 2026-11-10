# ChatGPT ↔ Codex protocol

There is no assumed automatic conversation synchronization. Use the Git repository as the explicit interchange.

## ChatGPT → repository
- ChatGPT discussion generates a short product brief, candidate tradeoffs or acceptance criteria.
- Codex can inspect the real repository and prepare a proposed OpenSpec change.
- Once the owner approves material choices, record that approval in the change/ADR. ChatGPT transcripts are not authoritative.

## Repository → Codex
- Implementation instructions refer to an exact approved change identifier.
- Codex reads AGENTS.md, relevant docs and code, and uses Gortex when useful.
- Work can proceed within approved boundaries without turn-by-turn human approval.

## Codex → ChatGPT
- Codex writes `.agentic/handoff.md` or a PR description containing results and blockers.
- ChatGPT reviews these artifacts through an authorized GitHub connection or content the user supplies; never assume its Projects chat sees local files or Codex history.

## Handoff prompt for Codex
"Read AGENTS.md and the approved OpenSpec change <ID>. Inspect existing code, implement the bounded change, run all available verification, repair failures, and write .agentic/handoff.md. Stop for the approval boundaries defined in AGENTS.md. No merge or deploy."

## Handoff prompt for ChatGPT
"Using the current spec and handoff report, assess acceptance status, unresolved tradeoffs, and the next smallest approved change. Do not assume tests were run unless documented."
