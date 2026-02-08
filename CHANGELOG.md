# Changelog

## 0.1.0 - 2026-02-08

Initial public release.

### Added
- OpenClaw plugin packaging (`openclaw.plugin.json`, `index.js`, extension metadata)
- Pluggable council engine (`council.py`) with:
  - parallel round-1 role execution
  - critique round
  - synthesis round
- Role packs: analyst, skeptic, builder, startup, security, growth, synthesizer
- Structured output schema (`schemas/council-output.schema.json`)
- Markdown report renderer (`render_report.py`)
- Install helper (`install.sh`)
- Security defaults:
  - `.gitignore` excludes local config and outputs
  - `.env.example` template
  - no secrets in repository

### Notes
- This project is an OpenClaw overlay/plugin, not a fork of OpenClaw core.
