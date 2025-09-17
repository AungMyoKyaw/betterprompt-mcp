# BetterPrompt MCP Server

[![CI/CD Pipeline](https://github.com/AungMyoKyaw/betterprompt-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/AungMyoKyaw/betterprompt-mcp/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/betterprompt-mcp?style=flat-square)](https://www.npmjs.com/package/betterprompt-mcp)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-brightgreen?style=flat-square)](https://modelcontextprotocol.io/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)

---

## Table of Contents

- [Overview](#overview)
- [Why BetterPrompt?](#why-betterprompt)
- [Quickstart](#quickstart)
- [Installation](#installation)
- [Tools Summary](#tools-summary)
- [Usage Examples](#usage-examples)
- [Client Integration](#client-integration)
- [Auto-Apply Enhancement](#auto-apply-enhancement)
- [Development](#development)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Support](#support)

---

## Overview

BetterPrompt MCP is a Model Context Protocol (MCP) server that enhances your AI interactions by automatically transforming your prompts into more effective versions using world-class prompt engineering techniques.

Instead of spending time crafting perfect prompts, BetterPrompt does the heavy lifting for you - converting simple requests into structured, context-rich instructions that yield better results from AI models.

### Before & After Example

**Without BetterPrompt:**

> "Write a function to calculate fibonacci numbers"

**With BetterPrompt Enhancement:**

> "Create a JavaScript function that calculates Fibonacci numbers using an efficient algorithm. Include error handling for invalid inputs, support for both iterative and recursive approaches, and clear documentation with time complexity analysis. Format the response with clear code examples and explanations."

---

## Why BetterPrompt?

AI models respond much better to well-structured prompts with clear context and instructions. BetterPrompt applies proven prompt engineering techniques to transform your requests into optimal formats that:

- ✅ **Increase accuracy** - More precise responses with fewer hallucinations
- ✅ **Improve structure** - Organized, actionable output formats
- ✅ **Add context** - Relevant background information for better understanding
- ✅ **Define constraints** - Clear boundaries and requirements
- ✅ **Specify success criteria** - Know what constitutes a good response

BetterPrompt works with any MCP-compatible client, including VS Code, Cursor, Claude Desktop, LM Studio, and many others.

---

## Quickstart

Install and run via npx:

```bash
npx -y betterprompt-mcp
```

Or install directly into VS Code (opens a prompt to add the MCP server):

[<img src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20Server&color=0098FF" alt="Install in VS Code">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522betterprompt%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522betterprompt-mcp%2522%255D%257D)

Once installed, you can either:

1. **Call the enhancement tool explicitly** - Use the `enhance-prompt` tool when you want to improve a specific prompt
2. **Enable auto-enhancement** - Configure your client to automatically enhance every prompt (see [Auto-Apply Enhancement](#auto-apply-enhancement))

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

## Tools

### `enhance-prompt`

AI-powered enhancement using MCP sampling API with 4K token limit.

**Input:**

- `prompt` (string, required) - The user request to convert to an AI-enhanced prompt

**Output:** An AI-enhanced prompt with structure, context, and clear instructions.

**Example Usage:**

```json
{
  "name": "enhance-prompt",
  "arguments": {
    "prompt": "Write a function to calculate fibonacci numbers"
  }
}
```

---

## Usage Examples

### Basic Prompt Enhancement

**Request:**

```json
{
  "name": "enhance-prompt",
  "arguments": {
    "prompt": "Explain quantum computing"
  }
}
```

**Enhanced Result:**

> "Provide a comprehensive explanation of quantum computing for a technical audience. Cover fundamental concepts including qubits, superposition, entanglement, and quantum gates. Compare classical vs. quantum computing approaches. Include real-world applications and current limitations. Structure the response with clear headings and examples."

### Code Generation Enhancement

**Request:**

```json
{
  "name": "enhance-prompt",
  "arguments": {
    "prompt": "Create a React component for a todo list"
  }
}
```

**Enhanced Result:**

> "Build a React component for a todo list application with the following features: add new todos, mark as complete, delete items, and filter by status (all/active/completed). Use modern React hooks (useState, useEffect) and ensure accessible HTML. Include proper TypeScript typing, CSS styling, and error handling. Provide a clean, user-friendly interface with responsive design."

---

## Auto-Apply Enhancement

BetterPrompt offers a unique feature that automatically enhances every prompt without requiring manual tool calls.

### How it works

When you enable the `betterprompt-default-prelude` in your MCP client:

1. Every user request is internally enhanced using world-class prompt engineering techniques
2. The assistant applies the enhanced version to plan its reasoning
3. The assistant produces a superior result without mentioning the enhancement process
4. Your workflow remains simple - no need to call tools explicitly

### Enabling Auto-Enhancement

Many MCP clients allow selecting a prompt template to include at the start of a chat or session. BetterPrompt publishes:

- `betterprompt-default-prelude`

Enable this prompt in your client's "Prompts" or "Prelude/System" section to automatically apply BetterPrompt techniques to each user message.

**Notes:**

- The exact UI for enabling a default prompt varies by MCP client
- Look for a way to select or add a "prompt"/"system"/"prelude" entry for a server
- This approach works across MCP clients because it relies on standard `prompts/list` and `get_prompt` support

---

## Best Practices

### Writing Prompts for BetterPrompt

To get the most out of BetterPrompt, consider these tips when crafting your initial prompts:

1. **Be specific about the task**: Instead of "explain databases", try "explain database normalization for a beginner"
2. **Mention the audience**: Include who the content is for (developers, managers, students, etc.)
3. **Specify the format**: Request specific output formats when helpful (bullet points, code, tables, etc.)
4. **Include constraints**: Mention any limitations like word count, technical level, or specific requirements
5. **State the purpose**: Explain what you'll use the information for

### When to Use Manual vs. Auto Enhancement

**Use Manual Enhancement (`enhance-prompt` tool) when:**

- You want to see the enhanced prompt before using it
- You're working on critical tasks where you want to review the enhancement
- You only need to enhance specific prompts occasionally

**Use Auto Enhancement (prelude) when:**

- You want all prompts enhanced without extra steps
- You're doing exploratory work or brainstorming
- You prefer a seamless experience without manual tool calls

---

## Troubleshooting

### Common Issues

**Server not starting**

- Ensure you have Node.js >= 18 installed
- Try running `npx -y betterprompt-mcp` directly in your terminal
- Check that your MCP client supports stdio transport

**Tool not appearing in client**

- Verify the server is running correctly
- Check your client's MCP configuration
- Restart your MCP client after adding the server

**Auto-prelude not working**

- Confirm your client supports the `prompts/list` and `prompts/get` MCP methods
- Check that you've correctly enabled the `betterprompt-default-prelude` prompt
- Some clients may require a restart after enabling prompts

### Debugging

BetterPrompt logs enhancement activities to stderr. If you're having issues:

1. Check your client's MCP logs for error messages
2. Run the server directly to see console output:
   ```bash
   npx -y betterprompt-mcp
   ```
3. Look for the magenta "🤖 AI-Enhanced prompt" messages in the logs

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

---

## Support

For questions or issues, open an issue on [GitHub](https://github.com/AungMyoKyaw/betterprompt-mcp/issues) or contact the author.

---

## Author

Aung Myo Kyaw (https://github.com/AungMyoKyaw)
