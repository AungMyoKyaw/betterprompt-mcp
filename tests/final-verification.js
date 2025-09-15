#!/usr/bin/env node

// Final verification test for BetterPrompt MCP server
import { spawn } from 'child_process';

async function finalVerification() {
  console.log('=== FINAL VERIFICATION OF BETTER PROMPT MCP ===\n');
  
  // Spawn the server
  const server = spawn('node', ['dist/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  // Collect all output
  let stdoutData = '';
  let stderrData = '';
  
  server.stdout.on('data', (data) => {
    stdoutData += data.toString();
  });
  
  server.stderr.on('data', (data) => {
    stderrData += data.toString();
  });
  
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Test 1: List tools
  console.log('1. Testing tool listing...');
  const listRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/list",
    params: {}
  };
  
  server.stdin.write(JSON.stringify(listRequest) + '\n');
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if we got a response with the betterprompt tool
  const hasToolList = stdoutData.includes('betterprompt');
  console.log(hasToolList ? '✓ Tool listing works' : '✗ Tool listing failed');
  
  // Test 2: Call the tool
  console.log('\n2. Testing prompt enhancement...');
  const callRequest = {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/call",
    params: {
      name: "betterprompt",
      arguments: {
        prompt: "Write a function to calculate fibonacci numbers"
      }
    }
  };
  
  // Clear previous output
  stdoutData = '';
  server.stdin.write(JSON.stringify(callRequest) + '\n');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if we got an enhanced prompt
  const hasEnhancedPrompt = stdoutData.includes('You are a world-class prompt engineer') && 
                           stdoutData.includes('enhance the prompt') &&
                           stdoutData.includes('fibonacci numbers');
  console.log(hasEnhancedPrompt ? '✓ Prompt enhancement works' : '✗ Prompt enhancement failed');
  
  // Test 3: Test with specific technique
  console.log('\n3. Testing with specific technique...');
  const techniqueRequest = {
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: {
      name: "betterprompt",
      arguments: {
        prompt: "Explain quantum computing",
        technique: "chain-of-thought"
      }
    }
  };
  
  // Clear previous output
  stdoutData = '';
  server.stdin.write(JSON.stringify(techniqueRequest) + '\n');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if we got technique-specific enhancement
  const hasTechniquePrompt = stdoutData.includes('Chain-of-Thought reasoning') && 
                            stdoutData.includes('quantum computing');
  console.log(hasTechniquePrompt ? '✓ Technique-specific enhancement works' : '✗ Technique-specific enhancement failed');
  
  // Close server
  server.kill();
  
  // Final result
  console.log('\n=== FINAL VERIFICATION RESULT ===');
  if (hasToolList && hasEnhancedPrompt && hasTechniquePrompt) {
    console.log('🎉 ALL TESTS PASSED - BETTER PROMPT MCP IS WORKING CORRECTLY!');
    console.log('\n✓ Server starts properly');
    console.log('✓ Tool listing works');
    console.log('✓ Prompt enhancement functions');
    console.log('✓ Technique-specific enhancement works');
    console.log('✓ JSON-RPC communication is functional');
    return true;
  } else {
    console.log('❌ SOME TESTS FAILED - ISSUES DETECTED');
    return false;
  }
}

finalVerification().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test failed with error:', error);
  process.exit(1);
});