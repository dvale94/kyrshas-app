---
name: verify-delivery
description: Independently assess a completed change against its acceptance criteria and run available checks without modifying product code. Use before final acceptance or merge.
---

1. Identify the approved spec, diff base, changed files, and evidence claimed in `.agentic/handoff.md`.
2. Independently compare acceptance criteria to the actual code, tests, and observable behavior.
3. Run available, non-destructive verification commands; distinguish 'not run' from 'passed'.
4. Examine regressions, auth/privacy/security boundaries, persistence, failure paths, and unexpected scope changes.
5. Report evidence-backed findings by severity with file paths and reproduction steps; no speculative noise.
6. State PASS, FAIL, or BLOCKED with a concise rationale and whether human acceptance is still needed. Do not change product code.
