#!/usr/bin/env node

/**
 * Comprehensive test and validation script for BetterPrompt MCP Server
 * Tests the complete system functionality
 */

import { BetterPromptEngine } from '../src/engine/BetterPromptEngine.js';
import { BetterPromptMcpServer } from '../src/server/McpServer.js';
import {
  PromptRequest,
  OptimizationConfig,
  DEFAULT_CONFIG
} from '../src/types.js';
import chalk from 'chalk';

async function runValidationTests(): Promise<void> {
  console.log(
    chalk.cyan.bold(
      '\n🧪 BetterPrompt MCP Server - Comprehensive Validation Tests\n'
    )
  );

  let testsPassed = 0;
  let testsFailed = 0;

  // Test 1: Engine instantiation
  try {
    console.log(chalk.blue('Test 1: Engine Instantiation'));
    const engine = new BetterPromptEngine();
    console.log(chalk.green('✅ Engine created successfully'));
    testsPassed++;
  } catch (error) {
    console.log(chalk.red('❌ Engine creation failed:'), error);
    testsFailed++;
  }

  // Test 2: Basic optimization
  try {
    console.log(chalk.blue('\nTest 2: Basic Optimization'));
    const engine = new BetterPromptEngine();
    const request: PromptRequest = {
      originalRequest: 'Explain artificial intelligence'
    };
    const config: OptimizationConfig = {
      level: 'basic',
      includeExamples: false,
      outputFormat: 'conversational',
      enableChainOfThought: true,
      enableRoleBasedPrompting: false,
      enableContextEnhancement: true,
      enableSelfConsistency: false,
      creativity: 'standard'
    };

    const result = await engine.optimizePrompt(request, config);

    if (
      result.enhanced &&
      result.enhanced.length > request.originalRequest.length
    ) {
      console.log(chalk.green('✅ Basic optimization successful'));
      console.log(
        chalk.gray(`   Original: ${request.originalRequest.length} chars`)
      );
      console.log(chalk.gray(`   Enhanced: ${result.enhanced.length} chars`));
      console.log(
        chalk.gray(`   Quality: ${result.metadata.estimatedQuality}/100`)
      );
      testsPassed++;
    } else {
      console.log(
        chalk.red('❌ Basic optimization failed - no enhancement detected')
      );
      testsFailed++;
    }
  } catch (error) {
    console.log(chalk.red('❌ Basic optimization failed:'), error);
    testsFailed++;
  }

  // Test 3: Advanced optimization
  try {
    console.log(chalk.blue('\nTest 3: Advanced Optimization'));
    const engine = new BetterPromptEngine();
    const request: PromptRequest = {
      originalRequest: 'Create a business plan for a tech startup',
      domain: 'business',
      targetAudience: 'investors',
      desiredTone: 'professional'
    };
    const config: OptimizationConfig = {
      level: 'advanced',
      includeExamples: true,
      outputFormat: 'structured',
      enableChainOfThought: true,
      enableRoleBasedPrompting: true,
      enableContextEnhancement: true,
      enableSelfConsistency: false,
      creativity: 'high'
    };

    const result = await engine.optimizePrompt(request, config);

    if (
      result.enhanced &&
      result.metadata.strategiesApplied.length >= 3 &&
      result.metadata.estimatedQuality > 70
    ) {
      console.log(chalk.green('✅ Advanced optimization successful'));
      console.log(
        chalk.gray(
          `   Strategies: ${result.metadata.strategiesApplied.join(', ')}`
        )
      );
      console.log(
        chalk.gray(`   Quality: ${result.metadata.estimatedQuality}/100`)
      );
      console.log(chalk.gray(`   Complexity: ${result.metadata.complexity}`));
      testsPassed++;
    } else {
      console.log(
        chalk.red('❌ Advanced optimization failed - insufficient enhancement')
      );
      testsFailed++;
    }
  } catch (error) {
    console.log(chalk.red('❌ Advanced optimization failed:'), error);
    testsFailed++;
  }

  // Test 4: Expert optimization with alternatives
  try {
    console.log(chalk.blue('\nTest 4: Expert Optimization'));
    const engine = new BetterPromptEngine();
    const request: PromptRequest = {
      originalRequest:
        'Analyze the environmental impact of renewable energy adoption',
      domain: 'environment',
      constraints: [
        'Consider economic factors',
        'Include policy recommendations'
      ]
    };
    const config: OptimizationConfig = {
      level: 'expert',
      includeExamples: true,
      outputFormat: 'structured',
      enableChainOfThought: true,
      enableRoleBasedPrompting: true,
      enableContextEnhancement: true,
      enableSelfConsistency: true,
      creativity: 'maximum'
    };

    const result = await engine.optimizePrompt(request, config);

    if (
      result.enhanced &&
      result.alternatives &&
      result.alternatives.length > 0 &&
      result.metadata.estimatedQuality > 80
    ) {
      console.log(chalk.green('✅ Expert optimization successful'));
      console.log(
        chalk.gray(`   Quality: ${result.metadata.estimatedQuality}/100`)
      );
      console.log(chalk.gray(`   Alternatives: ${result.alternatives.length}`));
      console.log(chalk.gray(`   Word Count: ${result.metadata.wordCount}`));
      testsPassed++;
    } else {
      console.log(
        chalk.red('❌ Expert optimization failed - insufficient features')
      );
      testsFailed++;
    }
  } catch (error) {
    console.log(chalk.red('❌ Expert optimization failed:'), error);
    testsFailed++;
  }

  // Test 5: Error handling
  try {
    console.log(chalk.blue('\nTest 5: Error Handling'));
    const engine = new BetterPromptEngine();
    const request: PromptRequest = {
      originalRequest: '' // Empty request should fail
    };

    try {
      await engine.optimizePrompt(request, DEFAULT_CONFIG);
      console.log(
        chalk.red(
          '❌ Error handling failed - should have thrown error for empty request'
        )
      );
      testsFailed++;
    } catch (error) {
      if (error instanceof Error && error.message.includes('empty')) {
        console.log(
          chalk.green(
            '✅ Error handling successful - correctly rejected empty request'
          )
        );
        testsPassed++;
      } else {
        console.log(
          chalk.red('❌ Error handling failed - unexpected error:'),
          error
        );
        testsFailed++;
      }
    }
  } catch (error) {
    console.log(chalk.red('❌ Error handling test failed:'), error);
    testsFailed++;
  }

  // Test 6: MCP Server instantiation
  try {
    console.log(chalk.blue('\nTest 6: MCP Server Instantiation'));
    // Disable logging for test
    process.env.DISABLE_BETTERPROMPT_LOGGING = 'true';
    const server = new BetterPromptMcpServer();
    console.log(chalk.green('✅ MCP Server created successfully'));
    testsPassed++;
  } catch (error) {
    console.log(chalk.red('❌ MCP Server creation failed:'), error);
    testsFailed++;
  }

  // Test 7: Output format variations
  try {
    console.log(chalk.blue('\nTest 7: Output Format Variations'));
    const engine = new BetterPromptEngine();
    const request: PromptRequest = {
      originalRequest: 'Compare electric and gas vehicles'
    };

    const formats: Array<OptimizationConfig['outputFormat']> = [
      'conversational',
      'structured',
      'creative'
    ];
    let formatTestsPassed = 0;

    for (const format of formats) {
      const config: OptimizationConfig = {
        ...DEFAULT_CONFIG,
        outputFormat: format
      };

      const result = await engine.optimizePrompt(request, config);
      if (
        result.enhanced
          .toLowerCase()
          .includes(format.toLowerCase().substring(0, 5))
      ) {
        formatTestsPassed++;
      }
    }

    if (formatTestsPassed === formats.length) {
      console.log(chalk.green('✅ Output format variations successful'));
      testsPassed++;
    } else {
      console.log(
        chalk.red(
          `❌ Output format variations failed - only ${formatTestsPassed}/${formats.length} formats working`
        )
      );
      testsFailed++;
    }
  } catch (error) {
    console.log(chalk.red('❌ Output format variations failed:'), error);
    testsFailed++;
  }

  // Summary
  console.log(chalk.cyan.bold('\n📊 Test Results Summary'));
  console.log(chalk.green(`✅ Tests Passed: ${testsPassed}`));
  console.log(chalk.red(`❌ Tests Failed: ${testsFailed}`));
  console.log(
    chalk.blue(
      `📈 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`
    )
  );

  if (testsFailed === 0) {
    console.log(
      chalk.green.bold(
        '\n🎉 All tests passed! BetterPrompt MCP Server is ready for production.'
      )
    );
    process.exit(0);
  } else {
    console.log(
      chalk.red.bold('\n⚠️  Some tests failed. Please review the issues above.')
    );
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runValidationTests().catch((error) => {
    console.error(chalk.red('Validation tests failed:'), error);
    process.exit(1);
  });
}

export { runValidationTests };
