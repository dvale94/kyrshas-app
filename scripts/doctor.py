#!/usr/bin/env python3
"""Quick structural checks, not a substitute for application tests."""
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[1]
required = [
    'AGENTS.md', 'docs/product/brief.md', 'docs/architecture.md',
    'docs/verification.md', 'docs/setup-tools.md', '.agentic/handoff.md',
    '.agents/skills/audit-project/SKILL.md',
    '.agents/skills/deliver-feature/SKILL.md',
    '.agents/skills/verify-delivery/SKILL.md',
]
missing = [path for path in required if not (root/path).is_file()]
for path in required:
    print(('MISSING' if path in missing else 'OK') + '  ' + path)
for skill in (root/'.agents/skills').glob('*/SKILL.md'):
    content = skill.read_text(encoding='utf-8')
    if not content.startswith('---\n') or '\nname:' not in content or '\ndescription:' not in content:
        missing.append(str(skill) + ' (invalid frontmatter)')
if missing:
    print('\nStructural verification FAILED:', ', '.join(missing))
    sys.exit(1)
print('\nStarter structure OK. Application tests are NOT configured or run.')
