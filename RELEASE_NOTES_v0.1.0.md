# OpenClaw Council v0.1.0

First public release of **OpenClaw Council** as an installable OpenClaw plugin overlay.

## Highlights

- Plugin packaging for OpenClaw (`openclaw.plugin.json`, extension entry)
- Pluggable, multi-role council orchestration
- Parallel role execution + critique + synthesis flow
- Structured output with agreement/disagreement/risk/confidence fields
- Role packs for product, growth, and security viewpoints
- Safe defaults for secrets and local outputs

## Security

- No API keys committed
- `.env.example` included for local setup
- `.gitignore` excludes local config and generated artifacts

## Install

```bash
git clone https://github.com/Personaz1/openclaw-council.git
cd openclaw-council
openclaw plugins install .
openclaw plugins enable openclaw-council
openclaw gateway restart
```

## Notes

This project is an OpenClaw plugin/overlay. It does not modify OpenClaw core internals.
