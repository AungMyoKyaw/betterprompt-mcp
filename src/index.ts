#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  CreateMessageResultSchema,
  ListToolsRequestSchema,
  Tool
} from '@modelcontextprotocol/sdk/types.js';
import chalk from 'chalk';

// Enhanced logging utility (following MCP best practices - log to stderr, not stdout)
class Logger {
  static info(message: string): void {
    console.error(chalk.blue(`[INFO] ${new Date().toISOString()}: ${message}`));
  }

  static error(message: string, error?: any): void {
    console.error(chalk.red(`[ERROR] ${new Date().toISOString()}: ${message}`));
    if (error) {
      console.error(chalk.red(`[ERROR] Details: ${error}`));
    }
  }

  static success(message: string): void {
    console.error(
      chalk.green(`[SUCCESS] ${new Date().toISOString()}: ${message}`)
    );
  }
}

// Create an MCP server with sampling capability
const server = new Server(
  {
    name: 'betterprompt-mcp',
    version: '0.2.1'
  },
  {
    capabilities: {
      tools: {},
      sampling: {} // Declare sampling capability
    }
  }
);

// Define the enhance-request tool
const ENHANCE_REQUEST_TOOL: Tool = {
  name: 'betterprompt',
  description:
    'Transforms user requests into world-class AI-enhanced prompts using advanced prompt engineering techniques',
  inputSchema: {
    type: 'object',
    properties: {
      request: {
        type: 'string',
        description: 'Every user request whatever it is'
      }
    },
    required: ['request']
  }
};

// Function to enhance a request using client-side LLM sampling
async function enhanceRequestWithSampling(request: string): Promise<string> {
  try {
    Logger.info(`Enhancing request: ${request.substring(0, 50)}...`);

    // Create the sampling request
    const samplingRequest = {
      method: 'sampling/createMessage',
      params: {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `You are a world-class prompt engineer with expertise in advanced prompt engineering techniques from top AI research labs like Anthropic, OpenAI, and Google DeepMind.

Your task is to enhance the following user request to make it maximally effective when used with AI models:

User request: "${request}"

Please enhance this prompt by:
1. Analyzing the intent and requirements
2. Applying appropriate prompt engineering techniques
3. Adding clarity, specificity, and structure
4. Including relevant context and constraints
5. Ensuring optimal LLM interaction patterns
6. Specifying the desired output format
7. Defining success criteria

Enhanced prompt:`
            }
          }
        ],
        systemPrompt:
          'You are an expert prompt engineer. Your job is to transform simple user requests into highly effective AI prompts using advanced techniques.',
        modelPreferences: {
          hints: [
            { name: 'claude-3-sonnet' },
            { name: 'claude' },
            { name: 'gpt-4' },
            { name: 'gemini' }
          ],
          intelligencePriority: 0.9,
          speedPriority: 0.5,
          costPriority: 0.3
        },
        maxTokens: 4000
      }
    };

    // Send the sampling request to the client
    const response = await server.request(
      samplingRequest,
      CreateMessageResultSchema
    );

    // Extract the enhanced prompt from the response
    if (response && response.content && response.content.type === 'text') {
      Logger.success('Request enhanced successfully using client LLM');
      return response.content.text;
    } else {
      throw new Error('Invalid response from sampling request');
    }
  } catch (error) {
    Logger.error('Error enhancing request with sampling', error);
    // Fallback to template-based enhancement if sampling fails
    return `You are a world-class AI assistant with expertise in advanced prompt engineering techniques.

Your task is to provide an exceptional response to the following user request:

"${request}"

Please enhance your response by:
1. Analyzing the intent and requirements behind this request
2. Applying appropriate prompt engineering techniques to ensure maximum effectiveness
3. Adding clarity, specificity, and structure to your approach
4. Including relevant context and constraints for comprehensive understanding
5. Ensuring optimal interaction patterns for complex reasoning tasks
6. Specifying the most appropriate output format for the task
7. Defining clear success criteria for high-quality results

Structure your response with clear headings, detailed explanations, and examples where appropriate. Ensure your answer is comprehensive, actionable, and directly addresses all aspects of the request.`;
  }
}

// Register request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [ENHANCE_REQUEST_TOOL]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (request.params.name === 'enhance-request') {
      const { request: userRequest } = request.params.arguments as {
        request: string;
      };

      if (!userRequest || typeof userRequest !== 'string') {
        return {
          content: [
            {
              type: 'text',
              text: 'Error: Invalid request parameter. Please provide a valid request string.'
            }
          ],
          isError: true
        };
      }

      const enhancedPrompt = await enhanceRequestWithSampling(userRequest);

      return {
        content: [
          {
            type: 'text',
            text: enhancedPrompt
          }
        ]
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `Unknown tool: ${request.params.name}`
        }
      ],
      isError: true
    };
  } catch (error) {
    Logger.error('Error processing tool call', error);
    return {
      content: [
        {
          type: 'text',
          text: `Error processing request: ${error instanceof Error ? error.message : String(error)}`
        }
      ],
      isError: true
    };
  }
});

// Start the server
async function runServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    Logger.success('🚀 BetterPrompt MCP Server v0.2.1 started successfully');
    Logger.info('📝 AI-powered prompt enhancement tool available');
    Logger.info('🔧 Available tool: enhance-request');
    Logger.info('📡 Sampling capability enabled');
  } catch (error) {
    Logger.error('Failed to start server', error);
    process.exit(1);
  }
}

// Error handling
process.on('uncaughtException', (error) => {
  Logger.error('Uncaught exception occurred', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  Logger.error('Unhandled promise rejection', reason);
  process.exit(1);
});

runServer().catch((error) => {
  Logger.error('Fatal error running server', error);
  process.exit(1);
});
