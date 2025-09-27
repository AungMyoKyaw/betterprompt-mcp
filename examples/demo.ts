#!/usr/bin/env node

/**
 * Comprehensive demonstration script for BetterPrompt MCP Server
 * Run this to see examples of all optimization capabilities
 */

import { BetterPromptEngine } from '../src/engine/BetterPromptEngine.js';
import { PromptRequest, OptimizationConfig } from '../src/types.js';
import chalk from 'chalk';

async function runDemo(): Promise<void> {
  console.log(chalk.cyan.bold('\n🚀 BetterPrompt MCP Server Demo\n'));
  console.log(
    chalk.gray(
      'Demonstrating world-class prompt optimization capabilities...\n'
    )
  );

  const engine = new BetterPromptEngine();

  // Demo 1: Simple request with basic optimization
  await demonstrateBasicOptimization(engine);

  // Demo 2: Complex request with advanced optimization
  await demonstrateAdvancedOptimization(engine);

  // Demo 3: Expert-level optimization with all features
  await demonstrateExpertOptimization(engine);

  // Demo 4: Different output formats
  await demonstrateOutputFormats(engine);

  // Demo 5: Domain-specific optimization
  await demonstrateDomainOptimization(engine);

  console.log(chalk.green.bold('\n✅ Demo completed successfully!'));
  console.log(
    chalk.gray(
      'BetterPrompt transforms any request into world-class prompts.\n'
    )
  );
}

async function demonstrateBasicOptimization(
  engine: BetterPromptEngine
): Promise<void> {
  console.log(chalk.blue.bold('🔹 Demo 1: Basic Optimization'));
  console.log(chalk.gray('Simple request with minimal enhancements\n'));

  const request: PromptRequest = {
    originalRequest: 'Explain what artificial intelligence is'
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

  console.log(chalk.yellow('Original:'), request.originalRequest);
  console.log(
    chalk.green('Enhanced:'),
    result.enhanced.substring(0, 200) + '...'
  );
  console.log(
    chalk.cyan('Quality Score:'),
    result.metadata.estimatedQuality + '/100'
  );
  console.log(
    chalk.magenta('Strategies:'),
    result.metadata.strategiesApplied.join(', ')
  );
  console.log();
}

async function demonstrateAdvancedOptimization(
  engine: BetterPromptEngine
): Promise<void> {
  console.log(chalk.blue.bold('🔹 Demo 2: Advanced Optimization'));
  console.log(chalk.gray('Business request with multiple strategies\n'));

  const request: PromptRequest = {
    originalRequest: 'Create a marketing strategy for our new app',
    domain: 'business',
    targetAudience: 'startup founders',
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

  console.log(chalk.yellow('Original:'), request.originalRequest);
  console.log(
    chalk.green('Enhanced:'),
    result.enhanced.substring(0, 300) + '...'
  );
  console.log(
    chalk.cyan('Quality Score:'),
    result.metadata.estimatedQuality + '/100'
  );
  console.log(
    chalk.magenta('Strategies:'),
    result.metadata.strategiesApplied.join(', ')
  );
  console.log(chalk.blue('Complexity:'), result.metadata.complexity);
  console.log();
}

async function demonstrateExpertOptimization(
  engine: BetterPromptEngine
): Promise<void> {
  console.log(chalk.blue.bold('🔹 Demo 3: Expert Optimization'));
  console.log(
    chalk.gray('Complex scientific request with all features enabled\n')
  );

  const request: PromptRequest = {
    originalRequest:
      'Analyze the environmental impact of renewable energy adoption and provide policy recommendations',
    domain: 'environment',
    context: 'Global climate change mitigation efforts',
    targetAudience: 'policy makers',
    desiredTone: 'academic',
    constraints: ['Consider economic factors', 'Include global perspective']
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

  console.log(chalk.yellow('Original:'), request.originalRequest);
  console.log(
    chalk.green('Enhanced:'),
    result.enhanced.substring(0, 400) + '...'
  );
  console.log(
    chalk.cyan('Quality Score:'),
    result.metadata.estimatedQuality + '/100'
  );
  console.log(
    chalk.magenta('Strategies:'),
    result.metadata.strategiesApplied.join(', ')
  );
  console.log(chalk.blue('Complexity:'), result.metadata.complexity);
  console.log(chalk.red('Word Count:'), result.metadata.wordCount);
  console.log(
    chalk.green('Alternatives:'),
    result.alternatives ? result.alternatives.length : 0
  );
  console.log();
}

async function demonstrateOutputFormats(
  engine: BetterPromptEngine
): Promise<void> {
  console.log(chalk.blue.bold('🔹 Demo 4: Output Formats'));
  console.log(chalk.gray('Same request with different formatting styles\n'));

  const request: PromptRequest = {
    originalRequest: 'Compare electric and gas vehicles'
  };

  const formats: Array<OptimizationConfig['outputFormat']> = [
    'conversational',
    'structured',
    'creative'
  ];

  for (const format of formats) {
    const config: OptimizationConfig = {
      level: 'advanced',
      includeExamples: false,
      outputFormat: format,
      enableChainOfThought: true,
      enableRoleBasedPrompting: true,
      enableContextEnhancement: true,
      enableSelfConsistency: false,
      creativity: format === 'creative' ? 'maximum' : 'high'
    };

    const result = await engine.optimizePrompt(request, config);

    console.log(chalk.yellow(`${format.toUpperCase()} Format:`));
    console.log(chalk.gray(result.enhanced.substring(0, 200) + '...'));
    console.log();
  }
}

async function demonstrateDomainOptimization(
  engine: BetterPromptEngine
): Promise<void> {
  console.log(chalk.blue.bold('🔹 Demo 5: Domain-Specific Optimization'));
  console.log(chalk.gray('Same request optimized for different domains\n'));

  const baseRequest = 'Explain the principles of optimization';
  const domains = ['technology', 'business', 'science', 'education'];

  for (const domain of domains) {
    const request: PromptRequest = {
      originalRequest: baseRequest,
      domain
    };

    const config: OptimizationConfig = {
      level: 'advanced',
      includeExamples: true,
      outputFormat: 'conversational',
      enableChainOfThought: true,
      enableRoleBasedPrompting: true,
      enableContextEnhancement: true,
      enableSelfConsistency: false,
      creativity: 'high'
    };

    const result = await engine.optimizePrompt(request, config);

    console.log(chalk.yellow(`${domain.toUpperCase()} Domain:`));
    console.log(chalk.gray('Role:'), result.reasoning.split('\n')[0]);
    console.log(
      chalk.gray('Quality:'),
      result.metadata.estimatedQuality + '/100'
    );
    console.log();
  }
}

// Run the demo if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runDemo().catch((error) => {
    console.error(chalk.red('Demo failed:'), error);
    process.exit(1);
  });
}

export { runDemo };
