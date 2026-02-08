# openclaw-council

## Purpose
Run a multi-role council workflow with pluggable providers and synthesize one final answer.

## Run
```bash
cd /Users/stefan/.openclaw/workspace/dist/openclaw-council
cp examples/council.config.example.json council.config.json
python3 council.py run --query "<your query>" --config council.config.json --out run.json
python3 render_report.py --infile run.json --out report.md
```

## Add role
1. Create `roles/<name>.md`
2. Add the role object to `roles[]` in config.

## Add provider
Add a provider under `providers{}` with `base_url`, `api_key_env`, and `model`.

## Output
- `run.json` — raw council protocol
- `report.md` — human-readable summary
