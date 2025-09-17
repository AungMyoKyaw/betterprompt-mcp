#!/usr/bin/env python3

import subprocess
import json
import time

def test_mcp_server():
    # Start the server
    print("Starting BetterPrompt MCP server...")
    server_process = subprocess.Popen(
        ['node', 'dist/index.js'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=1
    )
    
    # Wait a moment for the server to start
    time.sleep(2)
    
    # Check if server is running
    if server_process.poll() is not None:
        print("Server failed to start")
        stderr_output = server_process.stderr.read()
        print(f"Error: {stderr_output}")
        return
    
    print("Server started successfully")
    
    # Send a tools/list request
    request = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/list",
        "params": {}
    }
    
    print("Sending tools/list request...")
    server_process.stdin.write(json.dumps(request) + '\n')
    server_process.stdin.flush()
    
    # Try to read response (with timeout)
    try:
        # Note: This is a simplified test and may not work perfectly
        # due to how subprocess pipes work with interactive processes
        print("Attempting to read response...")
        time.sleep(1)
        
        # Try to get any output
        stdout_output = server_process.stdout.read()
        stderr_output = server_process.stderr.read()
        
        print(f"STDOUT: {stdout_output}")
        print(f"STDERR: {stderr_output}")
        
    except Exception as e:
        print(f"Error reading response: {e}")
    
    # Terminate the server
    print("Terminating server...")
    server_process.terminate()
    try:
        server_process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        server_process.kill()

if __name__ == "__main__":
    test_mcp_server()