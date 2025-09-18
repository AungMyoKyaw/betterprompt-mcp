#!/usr/bin/env node

import { spawn } from 'child_process';

console.log('Testing BetterPrompt MCP Server...');

// Start the server
const serverProcess = spawn('node', ['../dist/index.js'], {
  cwd: '..',
  stdio: ['pipe', 'pipe', 'pipe']
});

let serverOutput = '';

// Capture server output
serverProcess.stdout.on('data', (data) => {
  serverOutput += data.toString();
  console.log('Server stdout:', data.toString());
});

serverProcess.stderr.on('data', (data) => {
  console.log('Server stderr:', data.toString());
});

// After a delay, send a simple JSON-RPC request
setTimeout(() => {
  console.log('Sending initialize request...');

  const initializeRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-01-01',
      capabilities: {},
      clientInfo: {
        name: 'test-client',
        version: '1.0.0'
      }
    }
  };

  serverProcess.stdin.write(JSON.stringify(initializeRequest) + '\n');

  // Wait a bit then list tools
  setTimeout(() => {
    console.log('Sending tools list request...');

    const toolsRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
      params: {}
    };

    serverProcess.stdin.write(JSON.stringify(toolsRequest) + '\n');

    // Wait a bit then test the enhance-request tool
    setTimeout(() => {
      console.log('Sending enhance request...');

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

      serverProcess.stdin.write(JSON.stringify(enhanceRequest) + '\n');

      // Give some time for responses then exit
      setTimeout(() => {
        console.log('Test completed');
        serverProcess.kill();
        process.exit(0);
      }, 2000);
    }, 1000);
  }, 1000);
}, 3000);
