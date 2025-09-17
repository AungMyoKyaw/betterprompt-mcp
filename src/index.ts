#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import chalk from 'chalk';

// Create an MCP server
const server = new McpServer({
  name: 'betterprompt-mcp',
  version: '0.1.1'
});

// Register a default prompt prelude so clients can auto-apply BetterPrompt on every request
server.registerPrompt(
  'betterprompt-default-prelude',
  {
    title: 'BetterPrompt – Auto Prelude',
    description:
      'Instructs the assistant to automatically enhance every user request using BetterPrompt techniques before answering, without needing to call a tool.',
    argsSchema: {}
  },
  () => ({
    messages: [
      {
        role: 'assistant',
        content: {
          type: 'text',
          text: 'You are operating with BetterPrompt auto-prelude enabled. For every incoming user request: (1) Internally enhance the prompt using world-class prompt engineering techniques. (2) Apply the enhanced version to plan your reasoning and produce the final answer. (3) Keep outputs clear, structured, and directly actionable. Do not mention that you enhanced the prompt—just use it to produce a superior result.'
        }
      }
    ]
  })
);

// Register the single AI-powered prompt enhancement tool
server.registerTool(
  'enhance-prompt',
  {
    title: 'Enhance Prompt',
    description:
      'Converts user requests to AI-enhanced prompts using world-class prompt engineering techniques',
    inputSchema: {
      prompt: z
        .string()
        .describe('The user request to convert to an AI-enhanced prompt')
    }
  },
  async ({ prompt }) => {
    try {
      // Use MCP sampling to get AI-powered enhancement with 4K token limit
      const enhancementPrompt = `You are a world-class prompt engineer with expertise in advanced prompt engineering techniques from top AI research labs like Anthropic, OpenAI, and Google DeepMind.

Your task is to enhance the following user request to make it maximally effective when used with AI models:

User request: "${prompt}"

Please enhance this prompt by:
1. Analyzing the intent and requirements
2. Applying appropriate prompt engineering techniques
3. Adding clarity, specificity, and structure
4. Including relevant context and constraints
5. Ensuring optimal LLM interaction patterns
6. Specifying the desired output format
7. Defining success criteria

Enhanced prompt:`;

      const response = await server.server.createMessage({
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: enhancementPrompt
            }
          }
        ],
        maxTokens: 4000
      });

      const enhancedText =
        response.content.type === 'text'
          ? response.content.text
          : 'Unable to generate enhanced prompt';

      // Log the AI enhancement for debugging
      console.error(chalk.magenta(`\n🤖 AI-Enhanced prompt:`));
      console.error(chalk.gray(`Original: ${prompt}`));
      console.error(chalk.cyan(`Enhanced: ${enhancedText}\n`));

      return {
        content: [
          {
            type: 'text',
            text: enhancedText
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error enhancing prompt: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
);

// Start the server
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🚀 BetterPrompt MCP Server v0.1.1 running on stdio');
  console.error('📝 Converting user requests to AI-enhanced prompts');
  console.error('🔧 Available tool: enhance-prompt');
}

runServer().catch((error) => {
  console.error('Fatal error running server:', error);
  process.exit(1);
});
