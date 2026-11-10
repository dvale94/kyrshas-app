# Tool setup — deliberately explicit

Run these steps at the repo root after bootstrap. Pin tool versions in your team's machine setup when reproducibility matters. Confirm generated changes before committing.

## Codex
- Open the repo root in VS Code with your Codex extension, or launch Codex CLI from the root.
- Codex reads root `AGENTS.md` and skills under `.agents/skills/<name>/SKILL.md`.
- In a session, ask: "Read AGENTS.md and list the repository skills you can use." Verify the answers against the files.

## OpenSpec (feature/change planning)
Install according to https://openspec.dev/docs/installation. Current standalone macOS/Linux option:

```bash
curl -fsSL https://openspec.dev/cli/install.sh | sh
openspec --version
```

**Security note:** review externally downloaded install scripts before executing them. If using npm, check the current Node requirements first. Before running `openspec init`, inspect any older OpenSpec-managed skills/commands (including `~/.codex/prompts/opsx-*`); initialization may clean up legacy files. Back those up if you need them.

From the actual project root:

```bash
openspec init --tools codex --profile core
```

Verify the `openspec/` directory and `.agents/skills/openspec-*/SKILL.md` files. Codex typically invokes generated skills as `$openspec-propose`, `$openspec-apply-change`, etc.; check the names actually installed. Do not manually recreate generated files in the starter.

## Gortex (code intelligence)
Follow https://gortex.dev/docs for your OS. Example macOS installation:

```bash
brew install zzet/tap/gortex
gortex --version
```

Machine-wide setup (run only once, after reviewing what it changes):

```bash
gortex install --dry-run --json
gortex install
gortex doctor
```

Per-repository setup (inspect before applying, particularly if AGENTS.md already contains other instructions):

```bash
gortex init --agents=codex --dry-run --json
gortex init --agents=codex --analyze
gortex doctor
```

Gortex's Codex adapter can modify `AGENTS.md` and `~/.codex/config.toml`. Review `git diff` and confirm Codex can actually invoke the Gortex MCP tools; merely having configuration files is not proof of use. Gortex is **optional** for functioning repository workflows; if unavailable, Codex should use normal code search and report this limitation.

## Expo pilot (machine setup)

Official Expo Codex plugin: https://docs.expo.dev/agents/codex/

```bash
codex plugin add expo@openai-curated
codex mcp login expo
```

The Expo plugin provides SDK-specific skills and the Expo MCP integration. It may require account login. For an existing Expo repo, review and merge Expo's current canonical AGENTS.md instructions rather than overwriting this file: https://docs.expo.dev/agents/ . Confirm SDK version from the actual package.json before selecting migration commands.

## Integration smoke test
Ask Codex to:
1. Read `AGENTS.md` and describe the stop/approval policy.
2. Read package.json and report the Expo SDK actually installed.
3. Invoke a Gortex tool to map the app entry point's dependencies, **or** report why Gortex is unavailable.
4. Find the installed OpenSpec propose skill and report its location.
5. Identify checks from `docs/verification.md`, stating which can run.

Do not assume a ChatGPT Project conversation syncs automatically with a local Codex session. Sync through committed specs, PRs, and `.agentic/handoff.md`.
