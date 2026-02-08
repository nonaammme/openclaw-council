# OpenClaw Council v0.2.0

This release adds a native command UX for OpenClaw users.

## What's new

- Added **slash command** support:
  - `/council <query>`
- Plugin now runs the full council pipeline directly from command handler:
  - `council.py run ...`
  - `render_report.py ...`
- Improved operator feedback in chat on success/failure.

## Upgrade

```bash
cd openclaw-council
git pull
openclaw plugins install .
openclaw plugins enable openclaw-council
openclaw gateway restart
```

## Usage

```text
/council Build a 14-day GTM plan for OpenClaw Council
```

## Notes

- This remains a plugin overlay for OpenClaw (not a core fork).
- Secrets remain env-only; no keys are stored in repository files.
