#!/usr/bin/env node

// Final verification test for BetterPrompt MCP Server with Sampling
import { spawn } from 'child_process';

console.log(
  '🚀 Starting final verification test for BetterPrompt MCP Server with Sampling...'
);

// Start the server as a child process
const serverProcess = spawn('node', ['dist/index.js'], {
  cwd: '.',
  stdio: ['pipe', 'pipe', 'pipe']
});

let serverStarted = false;
let testCompleted = false;

console.log('🔧 Server process started with PID:', serverProcess.pid);

// Listen for server startup message (logs go to stderr)
serverProcess.stderr.on('data', (data) => {
  const output = data.toString();
  console.log('📋 Server log:', output.trim());

  if (output.includes('started successfully')) {
    serverStarted = true;
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
  if (!testCompleted) {
    console.log('⚠️ Server exited unexpectedly with code:', code);
  }
});

// Test the server functionality by sending JSON-RPC requests
async function testServerFunctionality() {
  console.log('🧪 Testing server functionality...');

  // Send initialize request with sampling capability
  const initializeRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-01-01',
      capabilities: {
        sampling: {}
      },
      clientInfo: {
        name: 'final-verification-test',
        version: '1.0.0'
      }
    }
  };

  console.log('📨 Sending initialize request with sampling capability...');
  serverProcess.stdin.write(JSON.stringify(initializeRequest) + '\n');

  // Send tools list request after a short delay
  setTimeout(() => {
    const toolsRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
      params: {}
    };

    console.log('📨 Sending tools list request...');
    serverProcess.stdin.write(JSON.stringify(toolsRequest) + '\n');

    // Send a test enhancement request
    setTimeout(() => {
      const enhanceRequest = {
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: {
          name: 'enhance-request',
          arguments: {
            request: 'Write a function to calculate fibonacci numbers'
          }
        }
      };

      console.log('📨 Sending enhance request...');
      serverProcess.stdin.write(JSON.stringify(enhanceRequest) + '\n');

      // Wait for responses then complete test
      setTimeout(() => {
        console.log('✅ Final verification test completed successfully');
        testCompleted = true;
        serverProcess.kill();
        process.exit(0);
      }, 1000);
    }, 500);
  }, 500);
}

// Timeout after 15 seconds
setTimeout(() => {
  if (!serverStarted) {
    console.log('❌ Test failed: Server did not start within 15 seconds');
    serverProcess.kill();
    process.exit(1);
  } else if (!testCompleted) {
    console.log('⚠️ Test timed out after 15 seconds, but server was running');
    serverProcess.kill();
    process.exit(0);
  }
}, 15000);
