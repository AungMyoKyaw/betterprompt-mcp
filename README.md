# BetterPrompt MCP Server

A powerful MCP (Model Context Protocol) server that provides advanced prompt engineering tools with AI model integration to enhance prompt effectiveness using world-class techniques.

## Overview

The BetterPrompt server offers three sophisticated tools for prompt enhancement:

1. **BetterPrompt Tool**: Rule-based prompt enhancement using proven techniques
2. **AI-Enhanced Prompt Tool**: AI-powered prompt enhancement with contextual understanding
3. **Batch Processing Tool**: Enhance multiple prompts simultaneously

Built with the latest MCP SDK v1.18.0, the server leverages cutting-edge prompt engineering techniques developed by leading AI research institutions including Anthropic, OpenAI, and Google DeepMind.

## Features

### 🛠️ Available Tools

#### 1. BetterPrompt Tool (`betterprompt`)

Rule-based prompt enhancement using proven techniques:

- **Chain-of-Thought**: Breaking down complex requests into step-by-step reasoning
- **Role Prompting**: Assigning expert roles to guide responses
- **Few-Shot Learning**: Providing examples to demonstrate desired output
- **Tree-of-Thoughts**: Exploring multiple reasoning paths simultaneously
- **ReAct (Reasoning + Action)**: Combining reasoning and action-taking
- **Reflexion**: Enabling self-reflection and iterative improvement
- **Generate Knowledge**: Instructing models to generate relevant background information
- **Prompt Chaining**: Breaking complex tasks into sequential steps
- **Self-Consistency**: Generating multiple reasoning paths and selecting the most consistent answer
- **Sequential Thinking**: Applying adaptive, step-by-step thinking like expert problem solvers
- **Comprehensive**: Combining multiple techniques for maximum effectiveness

#### 2. AI-Enhanced Prompt Tool (`ai-enhance-prompt`)

AI-powered prompt enhancement with model sampling:

- Uses the MCP sampling API to leverage AI models for intelligent prompt enhancement
- Contextual understanding of prompt requirements
- Four enhancement types: `creative`, `analytical`, `technical`, `comprehensive`
- Configurable token limits (50-2000 tokens)
- Fallback to rule-based enhancement if AI sampling fails

#### 3. Batch Processing Tool (`batch-enhance-prompts`)

Process multiple prompts simultaneously:

- Enhance up to 10 prompts at once
- Apply any technique to all prompts consistently
- Organized output with clear separation
- Efficient batch processing for productivity

### 🚀 Technical Features

- **Latest MCP SDK v1.18.0**: Built with the newest Model Context Protocol features
- **TypeScript 5.7+**: Modern TypeScript with advanced type safety
- **ESM Compatibility**: Full ES Module support for modern JavaScript
- **Zod Validation**: Robust input validation with detailed error messages
- **Enhanced Logging**: Colorful, informative console output
- **AI Model Integration**: Leverages MCP sampling for AI-powered enhancements

## Installation

### Prerequisites

- Node.js v18.x or higher
- npm or yarn package manager

### Local Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd betterprompt-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. (Optional) Link globally for easy access:

```bash
npm link
```

### Using with MCP Clients

To use this server with MCP-compatible clients (like Claude Desktop, MCP clients, etc.):

1. Start the server:

```bash
npx betterprompt-mcp
# or if linked globally:
betterprompt-mcp
```

2. Configure your MCP client to connect to the server using stdio transport

3. The server will expose three tools: `betterprompt`, `ai-enhance-prompt`, and `batch-enhance-prompts`

## Usage

### Tool 1: BetterPrompt (`betterprompt`)

Enhance prompts using rule-based techniques:

```json
{
  "name": "betterprompt",
  "arguments": {
    "prompt": "Write a story about a robot",
    "technique": "role"
  }
}
```

**Parameters:**

- `prompt` (required): The original prompt to enhance
- `technique` (optional): Enhancement technique to use (defaults to `sequential-thinking`)

**Available techniques:**

- `chain-of-thought` - Step-by-step reasoning
- `role` - Expert role assignment
- `few-shot` - Example-based learning
- `tree-of-thoughts` - Multiple reasoning paths
- `react` - Reasoning and action combination
- `reflexion` - Self-reflection and improvement
- `generate-knowledge` - Background information generation
- `prompt-chaining` - Sequential task breakdown
- `self-consistency` - Multiple path consistency
- `sequential-thinking` - Adaptive expert-level thinking (default)
- `comprehensive` - Combined techniques

### Tool 2: AI-Enhanced Prompt (`ai-enhance-prompt`)

Use AI model sampling for intelligent enhancement:

```json
{
  "name": "ai-enhance-prompt",
  "arguments": {
    "prompt": "Analyze this data",
    "enhancement_type": "analytical",
    "max_tokens": 1000
  }
}
```

**Parameters:**

- `prompt` (required): The original prompt to enhance
- `enhancement_type` (optional): Type of enhancement (`creative`, `analytical`, `technical`, `comprehensive`)
- `max_tokens` (optional): Maximum tokens for AI response (50-2000, default: 800)

### Tool 3: Batch Processing (`batch-enhance-prompts`)

Process multiple prompts simultaneously:

```json
{
  "name": "batch-enhance-prompts",
  "arguments": {
    "prompts": ["Write a poem", "Explain AI", "Create a business plan"],
    "technique": "comprehensive"
  }
}
```

**Parameters:**

- `prompts` (required): Array of prompts to enhance (max 10)
- `technique` (optional): Technique to apply to all prompts (default: `sequential-thinking`)

### Example Outputs

**Input:** "Write a story"

**Rule-based output (role technique):**

```
You are an award-winning science fiction author with a background in creative writing and literature. Write a compelling short story of approximately 800-1000 words that includes:

1. A well-developed protagonist with clear motivations
2. A engaging plot with conflict and resolution
3. Vivid descriptive language and dialogue
4. A specific setting that enhances the narrative
5. A satisfying conclusion that ties together all elements

The story should demonstrate sophisticated storytelling techniques including character development, pacing, and thematic depth. Target audience: Adult readers who appreciate literary fiction.

Enhanced story:
```

**AI-enhanced output:**
Uses contextual understanding to create even more sophisticated and tailored enhancements based on the AI model's analysis of the prompt requirements.

## Development

### Project Structure

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

### Building

```bash
npm run build
```

Compiles TypeScript to JavaScript in the `dist` directory and makes files executable.

### Development Mode

```bash
npm run watch
```

Continuously compile TypeScript files as they change for development.

### Testing

```bash
node tests/test.js
```

Or run the comprehensive verification suite:

```bash
node tests/final-verification.js
```

### Code Formatting

This project uses Prettier for consistent code style:

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check
```

### Dependencies

**Runtime Dependencies:**

- `@modelcontextprotocol/sdk@1.18.0` - Latest MCP SDK
- `chalk@^5.3.0` - Terminal styling
- `zod@^3.24.1` - Schema validation

**Development Dependencies:**

- `typescript@^5.7.2` - Latest TypeScript
- `@types/node@^22.9.0` - Node.js type definitions
- `prettier@^3.4.2` - Code formatting
- `shx@^0.3.4` - Cross-platform shell commands

## Architecture

### Server Implementation

Built with the latest MCP SDK v1.18.0 using the new `McpServer` API and `registerTool` methods for optimal performance and compatibility.

### Prompt Enhancement Techniques

The server implements specialized enhancement functions:

1. **Chain-of-Thought**: Sequential reasoning steps with checkpoints
2. **Role Prompting**: Expert role assignment with detailed credentials
3. **Few-Shot**: Sophisticated examples demonstrating desired approaches
4. **Tree-of-Thoughts**: Multiple reasoning path exploration
5. **ReAct**: Interleaved reasoning and action step formatting
6. **Reflexion**: Self-evaluation and iterative improvement components
7. **Generate Knowledge**: Background information generation steps
8. **Prompt Chaining**: Sequential task breakdown structure
9. **Self-Consistency**: Multiple reasoning path consistency checks
10. **Sequential Thinking**: Adaptive expert-level problem solving (default)
11. **Comprehensive**: Combined multi-technique approach

### AI Model Integration

The `ai-enhance-prompt` tool leverages MCP's sampling API to:

- Send enhancement requests to connected AI models
- Receive intelligent, contextually-aware prompt improvements
- Provide fallback to rule-based enhancement if AI sampling fails
- Support configurable token limits and enhancement types

This creates a hybrid approach combining rule-based techniques with AI-powered contextual understanding.

## License

MIT

## Author

Aung Myo Kyaw (https://github.com/AungMyoKyaw)
