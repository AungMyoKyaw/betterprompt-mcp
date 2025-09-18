# BetterPrompt MCP Server

<p align="center">
  <img src="assets/logo.png" alt="BetterPrompt MCP Logo" width="200">
</p>

[![CI/CD Pipeline](https://github.com/AungMyoKyaw/betterprompt-mcp/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/AungMyoKyaw/betterprompt-mcp/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/betterprompt-mcp?style=flat-square)](https://www.npmjs.com/package/betterprompt-mcp)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-brightgreen?style=flat-square)](https://modelcontextprotocol.io/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)

---

## Table of Contents

- [Overview](#overview)
- [Quickstart](#quickstart)
- [Installation](#installation)
- [Tool](#tool)
- [Usage Example](#usage-example)
- [Client Integration](#client-integration)
- [How It Works](#how-it-works)
- [Development](#development)
- [License](#license)
- [Support](#support)

---

## Overview

BetterPrompt MCP is a Model Context Protocol (MCP) server that enhances user requests using advanced prompt engineering techniques. It exposes a single, powerful tool that transforms simple requests into structured, context-rich instructions tailored for optimal AI model performance.

Instead of manually crafting detailed prompts, BetterPrompt MCP converts your requests into expertly engineered prompts that get better results from AI models.

**Before & After Example**

Without BetterPrompt:

> "Write a function to calculate fibonacci numbers"

With BetterPrompt Enhancement:

> "You are a world-class AI assistant with expertise in advanced prompt engineering techniques from top AI research labs like Anthropic, OpenAI, and Google DeepMind.

Your task is to provide an exceptional response to the following user request:

"Write a function to calculate fibonacci numbers"

Please enhance your response by:

1. Analyzing the intent and requirements behind this request
2. Applying appropriate prompt engineering techniques to ensure maximum effectiveness
3. Adding clarity, specificity, and structure to your approach
4. Including relevant context and constraints for comprehensive understanding
5. Ensuring optimal interaction patterns for complex reasoning tasks
6. Specifying the most appropriate output format for the task
7. Defining clear success criteria for high-quality results

Structure your response with clear headings, detailed explanations, and examples where appropriate. Ensure your answer is comprehensive, actionable, and directly addresses all aspects of the request."

---

## Quickstart

Install and run via npx:

```bash
npx -y betterprompt-mcp
```

Or add to your MCP client configuration:

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

---

## Installation

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

## Tool

### `enhance-request`

Transforms user requests into world-class AI-enhanced prompts using advanced prompt engineering techniques.

**Input:**

- `request` (string, required): The user request to transform into an enhanced AI prompt

**Output:** AI-enhanced prompt with structure, context, and clear instructions.

**Example Usage:**

```json
{
  "name": "enhance-request",
  "arguments": {
    "request": "Write a function to calculate fibonacci numbers"
  }
}
```

---

## Usage Example

**Request:**

```json
{
  "name": "enhance-request",
  "arguments": {
    "request": "Explain quantum computing"
  }
}
```

**Enhanced Result:**

> "You are a world-class AI assistant with expertise in advanced prompt engineering techniques from top AI research labs like Anthropic, OpenAI, and Google DeepMind.

Your task is to provide an exceptional response to the following user request:

"Explain quantum computing"

Please enhance your response by:

1. Analyzing the intent and requirements behind this request
2. Applying appropriate prompt engineering techniques to ensure maximum effectiveness
3. Adding clarity, specificity, and structure to your approach
4. Including relevant context and constraints for comprehensive understanding
5. Ensuring optimal interaction patterns for complex reasoning tasks
6. Specifying the most appropriate output format for the task
7. Defining clear success criteria for high-quality results

Structure your response with clear headings, detailed explanations, and examples where appropriate. Ensure your answer is comprehensive, actionable, and directly addresses all aspects of the request."

---

## How It Works

BetterPrompt MCP leverages the [MCP Sampling API](https://modelcontextprotocol.io/specification/2025-06-18/client/sampling) to enhance user requests:

1. When you call the `enhance-request` tool, the server sends a sampling request to your MCP client
2. Your client uses its configured LLM to enhance the prompt using advanced prompt engineering techniques
3. The enhanced prompt is returned to you for use with any AI model

This approach has several benefits:

- No API keys required - uses your client's existing LLM configuration
- Leverages the most capable model available in your client
- Works with any MCP-compatible client (Claude Desktop, VS Code, Cursor, etc.)
- Always up-to-date with the latest prompt engineering techniques

---

## Development

### Project Structure

```
betterprompt-mcp/
├── src/
│   └── index.ts          # Main server implementation
├── tests/                # Test files and verification scripts
├── dist/                 # Compiled output (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Documentation
```

### Build & Development

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

Test:

```bash
npm run test:comprehensive
```

## License

MIT License

---

## Support

For questions or issues, open an issue on [GitHub](https://github.com/AungMyoKyaw/betterprompt-mcp/issues) or contact the author via GitHub profile.

---

## Author

Aung Myo Kyaw ([GitHub](https://github.com/AungMyoKyaw))
