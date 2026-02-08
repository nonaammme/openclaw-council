import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function runProcess(command, args, cwd) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd, env: process.env });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));
    child.on("close", (code) => resolve({ code, stdout, stderr }));
    child.on("error", (err) => resolve({ code: 1, stdout, stderr: String(err) }));
  });
}

async function runCouncil(query) {
  const cwd = __dirname;
  const config = join(cwd, "council.config.json");
  const runJson = join(cwd, "run.json");
  const reportMd = join(cwd, "report.md");

  const runRes = await runProcess(
    "python3",
    ["council.py", "run", "--query", query, "--config", config, "--out", runJson],
    cwd,
  );

  if (runRes.code !== 0) {
    return {
      ok: false,
      text:
        "Council failed. Check your local config and API env vars.\n" +
        (runRes.stderr || runRes.stdout || "Unknown error"),
    };
  }

  const reportRes = await runProcess(
    "python3",
    ["render_report.py", "--infile", runJson, "--out", reportMd],
    cwd,
  );

  if (reportRes.code !== 0) {
    return {
      ok: false,
      text:
        "Council run completed but report rendering failed.\n" +
        (reportRes.stderr || reportRes.stdout || "Unknown error"),
    };
  }

  const preview = [
    "✅ Council completed.",
    `Artifacts: ${runJson}, ${reportMd}`,
    "Tip: open report.md for the final synthesis.",
  ].join("\n");

  return { ok: true, text: preview };
}

export default function register(api) {
  api.logger?.info?.("[openclaw-council] plugin loaded");

  api.registerCommand({
    name: "council",
    description: "Run OpenClaw Council. Usage: /council <query>",
    acceptsArgs: true,
    requireAuth: true,
    handler: async (ctx) => {
      const query = (ctx.args || "").trim();
      if (!query) {
        return {
          text:
            "Usage: /council <query>\n" +
            "Example: /council Build a 14-day GTM plan for this plugin",
        };
      }

      const result = await runCouncil(query);
      return { text: result.text };
    },
  });
}
