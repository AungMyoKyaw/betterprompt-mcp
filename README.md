# BetterPrompt MCP Server

[![CI/CD Pipeline](https://github.com/AungMyoKyaw/betterprompt-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/AungMyoKyaw/betterprompt-mcp/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/betterprompt-mcp?style=flat-square)](https://www.npmjs.com/package/betterprompt-mcp)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-brightgreen?style=flat-square)](https://modelcontextprotocol.io/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)

Advanced prompt enhancement tools for MCP clients. Ships three tools (rule-based, AI-enhanced, batch) to upgrade prompts w## Troubleshooting

- Server doesn't start with npx proven techniques and intelligent sampling.

— Built with the MCP TypeScript SDK v1.18.0, TypeScript 5.7+, ESM, and Zod.

---

## Quickstart

Install and run via npx:

```bash
npx -y betterprompt-mcp
```

Or install directly into VS Code (opens a prompt to add the MCP server):

[<img src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20Server&color=0098FF" alt="Install in VS Code">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522betterprompt%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522betterprompt-mcp%2522%255D%257D)

---

## Install in your coding agent

Most MCP clients work with this standard config:

```json
{
  "mcpServers": {
    "betterprompt": {
      "command": "npx",
      "args": ["-y", "betterprompt-mcp"]
    }
  }
}
```

Pick your client below. Where available, click the install button; otherwise follow the manual steps.

<details>
<summary><b>VS Code</b></summary>

Click a button to install:

[<img src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20Server&color=0098FF" alt="Install in VS Code">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522betterprompt%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522betterprompt-mcp%2522%255D%257D)
[<img alt="Install in VS Code Insiders" src="https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=flat-square&label=Install%20Server&color=24bfa5">](https://insiders.vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522betterprompt%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522betterprompt-mcp%2522%255D%257D)

Fallback (CLI):

```bash
code --add-mcp '{"name":"betterprompt","command":"npx","args":["-y","betterprompt-mcp"]}'
```

[Docs: Add an MCP server](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server)

</details>

<details>
<summary><b>Cursor</b></summary>

Click to install:

[<img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Install in Cursor">](https://cursor.com/en/install-mcp?name=BetterPrompt&config=eyJjb21tYW5kIjoibnB4IC15IGJldHRlcnByb21wdC1tY3AifQ%3D%3D)

Or add manually: Settings → MCP → Add new MCP Server → Type: command, Command: `npx -y betterprompt-mcp`.

</details>

<details>
<summary><b>LM Studio</b></summary>

Click to install:

[![Add MCP Server betterprompt to LM Studio](https://files.lmstudio.ai/deeplink/mcp-install-light.svg)](https://lmstudio.ai/install-mcp?name=betterprompt&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImJldHRlcnByb21wdC1tY3AiXX0%3D)

Or manually: Program → Install → Edit `mcp.json`, add the standard config above.

</details>

<details>
<summary><b>Continue</b></summary>

Install button: TODO – no public deeplink available yet.

Manual setup:

1. Open Continue Settings → open JSON configuration
2. Add `mcpServers` entry:

```json
{
  "mcpServers": {
    "betterprompt": {
      "command": "npx",
      "args": ["-y", "betterprompt-mcp"]
    }
  }
}
```

Restart Continue if needed.

</details>

<details>
<summary><b>Goose</b></summary>

Click to install:

[![Install in Goose](https://block.github.io/goose/img/extension-install-dark.svg)](https://block.github.io/goose/extension?cmd=npx&arg=-y&arg=betterprompt-mcp&id=betterprompt&name=BetterPrompt&description=Enhance%20prompts%20with%20advanced%20techniques%20for%20MCP%20clients)

Or manually: Advanced settings → Extensions → Add custom extension → Type: STDIO → Command: `npx -y betterprompt-mcp`.

</details>

<details>
<summary><b>Claude Code (CLI)</b></summary>

Install via CLI:

```bash
claude mcp add betterprompt npx -y betterprompt-mcp
```

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Add to `claude_desktop_config.json` using the standard config above, then restart Claude Desktop. See the MCP quickstart:

[Model Context Protocol – Quickstart](https://modelcontextprotocol.io/quickstart/user)

</details>

<details>
<summary><b>Windsurf</b></summary>

Follow the Windsurf MCP documentation and use the standard config above.

[Docs: Windsurf MCP](https://docs.windsurf.com/windsurf/cascade/mcp)

</details>

<details>
<summary><b>Gemini CLI</b></summary>

Follow the Gemini CLI MCP server guide; use the standard config above.

[Docs: Configure MCP server in Gemini CLI](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#configure-the-mcp-server-in-settingsjson)

</details>

<details>
<summary><b>Qodo Gen</b></summary>

Open Qodo Gen chat panel → Connect more tools → + Add new MCP → Paste the standard config above → Save.

[Qodo Gen documentation](https://docs.qodo.ai/qodo-documentation/qodo-gen)

</details>

<details>
<summary><b>opencode</b></summary>

Create or edit `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "betterprompt": {
      "type": "local",
      "command": ["npx", "-y", "betterprompt-mcp"],
      "enabled": true
    }
  }
}
```

[opencode MCP documentation](https://opencode.ai/docs/mcp-servers/)

</details>

---

## Overview

BetterPrompt MCP is a Model Context Protocol (MCP) server offering three complementary tools:

1. BetterPrompt (rule-based enhancement)
2. AI-Enhanced Prompt (sampling-powered enhancement)
3. Batch Enhance Prompts (process multiple prompts at once)

Transport: stdio. MCP clients launch this server as a subprocess and exchange JSON-RPC messages over stdin/stdout. The server writes MCP messages to stdout and logs to stderr (as recommended by the MCP spec).

---

## Tools

### 1) `betterprompt`

Rule-based enhancement using established techniques:

- Chain-of-Thought, Role Prompting, Few-Shot, Tree-of-Thoughts
- ReAct, Reflexion, Generate Knowledge, Prompt Chaining
- Self-Consistency, Sequential Thinking (default), Comprehensive

Input:

- `prompt` (string, required)
- `technique` (enum, optional)

Output: A rewritten prompt with structure, context, and clear instructions.

### 2) `ai-enhance-prompt`

AI-powered enhancement using MCP sampling API with configurable style and token limit.

Input:

- `prompt` (string, required)
- `enhancement_type` (enum: creative | analytical | technical | comprehensive, optional)

Fallback: If sampling isn’t available, it falls back to rule-based “comprehensive” enhancement.

### 3) `batch-enhance-prompts`

Enhance multiple prompts in one call.

Input:

- `prompts` (string[], 1–10, required)
- `technique` (enum, optional; default `sequential-thinking`)

Output: A formatted list of original vs. enhanced prompts.

---

## Features

- MCP TypeScript SDK v1.18.0 with stdio transport
- TypeScript 5.7+, ESM, Zod validation
- Enhanced, colorized server logging (to stderr)
- Hybrid approach: rule-based techniques + AI sampling

---

## Installation

Prerequisites:

- Node.js v18 or newer
- npm or yarn

---

## Client Integration

### Claude Desktop (macOS)

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "betterprompt": {
      "command": "npx",
      "args": ["-y", "betterprompt-mcp"]
    }
  }
}
```

Then restart Claude Desktop. If the server doesn’t appear, tail logs:

```bash
tail -n 20 -F ~/Library/Logs/Claude/mcp*.log
```

### VS Code

Install via CLI:

```bash
code --add-mcp '{"name":"betterprompt","command":"npx","args":["-y","betterprompt-mcp"]}'
```

### Other MCP clients (Cursor, Goose, LM Studio, Qodo Gen, etc.)

Follow each client’s standard MCP config pattern. See MCP Quickstart below.

---

## Usage Examples

### Rule-based enhancement

```json
{
  "name": "betterprompt",
  "arguments": {
    "prompt": "Write a story about a robot",
    "technique": "role"
  }
}
```

### AI-enhanced prompt

```json
{
  "name": "ai-enhance-prompt",
  "arguments": {
    "prompt": "Analyze this data",
    "enhancement_type": "analytical"
  }
}
```

### Batch processing

```json
{
  "name": "batch-enhance-prompts",
  "arguments": {
    "prompts": ["Write a poem", "Explain AI", "Create a business plan"],
    "technique": "comprehensive"
  }
}
```

---

## Verify locally

Smoke tests start the server via stdio and exercise tool listing and calls.

```bash
# Build first
npm run build

# Basic test
node tests/test.js

# Comprehensive verification
node tests/final-verification.js
```

Expected: tests print MCP responses and confirm tools are available and callable.

---

## Development

Project structure:

```
betterprompt-mcp/
├── src/
│   └── index.ts          # Main server implementation
├── tests/                # Test files
├── dist/                 # Compiled output (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

Build:

```bash
npm run build
```

Watch (dev):

```bash
npm run watch
```

Format:

```bash
npm run format
npm run format:check
```

## License

MIT

## Author

Aung Myo Kyaw (https://github.com/AungMyoKyaw)
