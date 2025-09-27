#!/usr/bin/env node

/**
 * BetterPrompt MCP Server
 *
 * A Model Context Protocol server that transforms any user request into world-class,
 * optimized prompts using advanced prompt engineering techniques.
 *
 * Features:
 * - Chain-of-Thought reasoning
 * - Few-shot learning with examples
 * - Role-based expert prompting
 * - Context enhancement and formatting
 * - Self-consistency for complex problems
 * - Request analysis and optimization recommendations
 * - Quick enhancement for fast improvements
 */

import { BetterPromptMcpServer } from './server/McpServer.js';

async function main(): Promise<void> {
  try {
    const server = new BetterPromptMcpServer();
    await server.start();
  } catch (error) {
    console.error('Failed to start BetterPrompt MCP Server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.error('\nShutting down BetterPrompt MCP Server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('\nShutting down BetterPrompt MCP Server...');
  process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception in BetterPrompt MCP Server:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection in BetterPrompt MCP Server:', reason);
  process.exit(1);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}
