#!/usr/bin/env node

// Simple verification script for BetterPrompt MCP Server
import { spawn } from 'child_process';

console.log('Verifying BetterPrompt MCP Server...');

// Start the server
const serverProcess = spawn('node', ['dist/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let serverStarted = false;

// Listen for server startup message
serverProcess.stderr.on('data', (data) => {
  const output = data.toString();
  console.log('Server log:', output);

  if (output.includes('started successfully')) {
    serverStarted = true;
    console.log('✅ Server started successfully');

    // Clean up and exit
    serverProcess.kill();
    process.exit(0);
  }
});

// Handle server errors
serverProcess.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Timeout after 10 seconds
setTimeout(() => {
  if (!serverStarted) {
    console.log('❌ Server failed to start within 10 seconds');
    serverProcess.kill();
    process.exit(1);
  }
}, 10000);
