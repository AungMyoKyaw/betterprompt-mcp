#!/usr/bin/env node

// Integration test for BetterPrompt MCP Server
import { spawn } from 'child_process';
import { createInterface } from 'readline';

console.log('Starting integration test for BetterPrompt MCP Server...');

// Start the server as a child process
const serverProcess = spawn('node', ['dist/index.js'], {
  cwd: '.',
  stdio: ['pipe', 'pipe', 'pipe']
});

// Create readline interface to read server output
const rl = createInterface({
  input: serverProcess.stderr, // MCP servers log to stderr
  crlfDelay: Infinity
});

console.log('Server process started with PID:', serverProcess.pid);

// Listen for server startup message
rl.on('line', (line) => {
  console.log('Server log:', line);

  if (line.includes('started successfully')) {
    console.log('✅ Server started successfully');
    testServerFunctionality();
  }
});

// Handle server errors
serverProcess.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

// Handle server exit
serverProcess.on('exit', (code) => {
  console.log('Server exited with code:', code);
});

// Test the server functionality
async function testServerFunctionality() {
  console.log('Testing server functionality...');

  // Send initialize request
  const initializeRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-01-01',
      capabilities: {},
      clientInfo: {
        name: 'integration-test',
        version: '1.0.0'
      }
    }
  };

  console.log('Sending initialize request...');
  serverProcess.stdin.write(JSON.stringify(initializeRequest) + '\n');

  // For now, we'll just exit after a delay
  setTimeout(() => {
    console.log('Integration test completed');
    serverProcess.kill();
    process.exit(0);
  }, 2000);
}

// Timeout after 15 seconds
setTimeout(() => {
  console.log('❌ Test timed out after 15 seconds');
  serverProcess.kill();
  process.exit(1);
}, 15000);
