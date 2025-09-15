#!/usr/bin/env node

import { spawn } from 'child_process';

async function testServer() {
  // Spawn the server process
  const server = spawn('node', ['dist/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Handle server output
  server.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
  });

  server.stderr.on('data', (data) => {
    console.log(`Server stderr: ${data}`);
  });

  server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });

  // Wait a bit for the server to start
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Send a test request
  const testRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/list",
    params: {}
  };

  server.stdin.write(JSON.stringify(testRequest) + '\n');

  // Wait for response
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Close the server
  server.kill();
}

testServer().catch(console.error);