#!/usr/bin/env node

// Simple test for BetterPrompt MCP server
import { spawn } from 'child_process';

async function testServer() {
  console.log('Testing BetterPrompt MCP server...');

  // Spawn the server process
  const server = spawn('node', ['dist/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Handle server output
  server.stdout.on('data', (data) => {
    console.log('STDOUT:', data.toString());
  });

  server.stderr.on('data', (data) => {
    console.log('STDERR:', data.toString());
  });

  server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });

  // Wait a bit for the server to start
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Send a test request
  const testRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  };

  console.log('Sending tools/list request...');
  server.stdin.write(JSON.stringify(testRequest) + '\n');

  // Wait for response
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Send another test request
  const testRequest2 = {
    jsonrpc: '2.0',
    id: 2,
    method: 'prompts/list',
    params: {}
  };

  console.log('Sending prompts/list request...');
  server.stdin.write(JSON.stringify(testRequest2) + '\n');

  // Wait for response
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Close the server
  console.log('Closing server...');
  server.kill();
}

testServer().catch(console.error);
