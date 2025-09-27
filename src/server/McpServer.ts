import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode
} from '@modelcontextprotocol/sdk/types.js';
import chalk from 'chalk';
import { z } from 'zod';

import { BetterPromptEngine } from '../engine/BetterPromptEngine.js';
import {
  PromptRequest,
  OptimizationConfig,
  DEFAULT_CONFIG,
  OptimizedPrompt
} from '../types.js';
import { ALL_TOOLS } from './tools.js';

/**
 * MCP server implementation for BetterPrompt
 */
export class BetterPromptMcpServer {
  private server: Server;
  private engine: BetterPromptEngine;
  private disableLogging: boolean;

  constructor() {
    this.engine = new BetterPromptEngine();
    this.disableLogging =
      process.env.DISABLE_BETTERPROMPT_LOGGING?.toLowerCase() === 'true';

    this.server = new Server(
      {
        name: 'betterprompt-mcp-server',
        version: '1.0.0'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    this.setupRequestHandlers();
  }

  private setupRequestHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: ALL_TOOLS
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        switch (request.params.name) {
          case 'betterprompt':
            return await this.handleBetterPrompt(request.params.arguments);
          case 'analyze-request':
            return await this.handleAnalyzeRequest(request.params.arguments);
          case 'quick-enhance':
            return await this.handleQuickEnhance(request.params.arguments);
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${request.params.name}`
            );
        }
      } catch (error) {
        this.logError('Tool execution error:', error);

        if (error instanceof McpError) {
          throw error;
        }

        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  private async handleBetterPrompt(
    args: unknown
  ): Promise<{ content: Array<{ type: string; text: string }> }> {
    const validatedArgs = this.validateBetterPromptArgs(args);

    const request: PromptRequest = {
      originalRequest: validatedArgs.request,
      context: validatedArgs.context,
      domain: validatedArgs.domain,
      targetAudience: validatedArgs.targetAudience,
      desiredTone: validatedArgs.desiredTone,
      constraints: validatedArgs.constraints
    };

    const config: OptimizationConfig = {
      level: validatedArgs.optimizationLevel || DEFAULT_CONFIG.level,
      includeExamples:
        validatedArgs.includeExamples ?? DEFAULT_CONFIG.includeExamples,
      outputFormat: validatedArgs.outputFormat || DEFAULT_CONFIG.outputFormat,
      enableChainOfThought:
        validatedArgs.enableChainOfThought ??
        DEFAULT_CONFIG.enableChainOfThought,
      enableRoleBasedPrompting:
        validatedArgs.enableRoleBasedPrompting ??
        DEFAULT_CONFIG.enableRoleBasedPrompting,
      enableContextEnhancement:
        validatedArgs.enableContextEnhancement ??
        DEFAULT_CONFIG.enableContextEnhancement,
      enableSelfConsistency:
        validatedArgs.enableSelfConsistency ??
        DEFAULT_CONFIG.enableSelfConsistency,
      creativity: validatedArgs.creativity || DEFAULT_CONFIG.creativity
    };

    this.logOperation('Optimizing prompt', {
      originalLength: request.originalRequest.length,
      level: config.level,
      strategies: Object.entries(config)
        .filter(([key, value]) => key.startsWith('enable') && value)
        .map(([key]) => key.replace('enable', ''))
    });

    const result = await this.engine.optimizePrompt(request, config);

    this.logSuccess('Prompt optimization completed', {
      enhancedLength: result.enhanced.length,
      qualityScore: result.metadata.estimatedQuality,
      strategiesApplied: result.metadata.strategiesApplied.length
    });

    return {
      content: [
        {
          type: 'text',
          text: this.formatBetterPromptResponse(result)
        }
      ]
    };
  }

  private async handleAnalyzeRequest(
    args: unknown
  ): Promise<{ content: Array<{ type: string; text: string }> }> {
    const validatedArgs = this.validateAnalyzeRequestArgs(args);

    const request: PromptRequest = {
      originalRequest: validatedArgs.request,
      domain: validatedArgs.domain
    };

    // Use a minimal config for analysis
    const analysisConfig: OptimizationConfig = {
      ...DEFAULT_CONFIG,
      level: 'basic'
    };

    // Get analysis without full optimization
    const result = await this.engine.optimizePrompt(request, analysisConfig);

    this.logOperation('Request analysis completed', {
      complexity: result.metadata.complexity,
      wordCount: result.metadata.wordCount
    });

    return {
      content: [
        {
          type: 'text',
          text: this.formatAnalysisResponse(result, request)
        }
      ]
    };
  }

  private async handleQuickEnhance(
    args: unknown
  ): Promise<{ content: Array<{ type: string; text: string }> }> {
    const validatedArgs = this.validateQuickEnhanceArgs(args);

    const request: PromptRequest = {
      originalRequest: validatedArgs.request,
      desiredTone: validatedArgs.tone
    };

    const quickConfig: OptimizationConfig = {
      level: 'basic',
      includeExamples: false,
      outputFormat: 'conversational',
      enableChainOfThought: false,
      enableRoleBasedPrompting: false,
      enableContextEnhancement: true,
      enableSelfConsistency: false,
      creativity: 'standard'
    };

    const result = await this.engine.optimizePrompt(request, quickConfig);

    this.logOperation('Quick enhancement completed', {
      originalLength: request.originalRequest.length,
      enhancedLength: result.enhanced.length
    });

    return {
      content: [
        {
          type: 'text',
          text: this.formatQuickEnhanceResponse(result)
        }
      ]
    };
  }

  private validateBetterPromptArgs(args: unknown): BetterPromptArgs {
    const schema = z.object({
      request: z.string().min(1).max(10000),
      optimizationLevel: z.enum(['basic', 'advanced', 'expert']).optional(),
      includeExamples: z.boolean().optional(),
      outputFormat: z
        .enum(['conversational', 'structured', 'creative'])
        .optional(),
      enableChainOfThought: z.boolean().optional(),
      enableRoleBasedPrompting: z.boolean().optional(),
      enableContextEnhancement: z.boolean().optional(),
      enableSelfConsistency: z.boolean().optional(),
      creativity: z.enum(['standard', 'high', 'maximum']).optional(),
      context: z.string().max(2000).optional(),
      domain: z.string().max(100).optional(),
      targetAudience: z.string().max(200).optional(),
      desiredTone: z
        .enum(['professional', 'casual', 'academic', 'creative', 'technical'])
        .optional(),
      constraints: z.array(z.string().max(200)).max(10).optional()
    });

    try {
      return schema.parse(args);
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid arguments: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private validateAnalyzeRequestArgs(args: unknown): AnalyzeRequestArgs {
    const schema = z.object({
      request: z.string().min(1).max(10000),
      domain: z.string().max(100).optional()
    });

    try {
      return schema.parse(args);
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid arguments: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private validateQuickEnhanceArgs(args: unknown): QuickEnhanceArgs {
    const schema = z.object({
      request: z.string().min(1).max(5000),
      tone: z
        .enum(['professional', 'casual', 'academic', 'creative'])
        .optional()
    });

    try {
      return schema.parse(args);
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid arguments: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private formatBetterPromptResponse(result: OptimizedPrompt): string {
    let response = `# 🚀 BetterPrompt Optimization Results

## Enhanced Prompt
${result.enhanced}

## Optimization Summary
- **Quality Score**: ${result.metadata.estimatedQuality}/100
- **Optimization Level**: ${result.metadata.optimizationLevel}
- **Word Count**: ${result.metadata.wordCount} words
- **Complexity**: ${result.metadata.complexity}
- **Strategies Applied**: ${result.metadata.strategiesApplied.join(', ')}

## Reasoning
${result.reasoning}`;

    if (result.alternatives && result.alternatives.length > 0) {
      response += `\n\n## Alternative Versions\n\n`;
      result.alternatives.forEach((alt: string, index: number) => {
        response += `### Alternative ${index + 1}\n${alt}\n\n`;
      });
    }

    return response;
  }

  private formatAnalysisResponse(
    result: OptimizedPrompt,
    request: PromptRequest
  ): string {
    return `# 📊 Request Analysis Results

## Original Request
"${request.originalRequest}"

## Analysis Summary
- **Complexity Level**: ${result.metadata.complexity}
- **Word Count**: ${result.metadata.wordCount}
- **Domain**: ${request.domain || 'Auto-detected during optimization'}

## Recommended Optimizations
${result.reasoning}

## Estimated Quality Improvement
With full BetterPrompt optimization, this request could achieve a quality score of **${result.metadata.estimatedQuality}/100**.

## Suggested Strategies
${result.metadata.strategiesApplied.map((strategy: string) => `- ${strategy}`).join('\n')}`;
  }

  private formatQuickEnhanceResponse(result: OptimizedPrompt): string {
    return (
      `# ⚡ Quick Enhancement Results

## Enhanced Request
${result.enhanced}

## Improvement Summary
- **Quality Score**: ${result.metadata.estimatedQuality}/100
- **Word Count**: ${result.metadata.wordCount} words
- **Enhancement Level**: Quick optimization applied

*For more advanced optimization, use the full ` +
      '`betterprompt`' +
      ` tool with expert-level settings.*`
    );
  }

  private logOperation(message: string, data?: unknown): void {
    if (this.disableLogging) return;

    console.error(chalk.blue('🔧 BetterPrompt:'), chalk.white(message));
    if (data) {
      console.error(
        chalk.gray('   Details:'),
        chalk.gray(JSON.stringify(data, null, 2))
      );
    }
  }

  private logSuccess(message: string, data?: unknown): void {
    if (this.disableLogging) return;

    console.error(chalk.green('✅ BetterPrompt:'), chalk.white(message));
    if (data) {
      console.error(
        chalk.gray('   Results:'),
        chalk.gray(JSON.stringify(data, null, 2))
      );
    }
  }

  private logError(message: string, error: unknown): void {
    if (this.disableLogging) return;

    console.error(chalk.red('❌ BetterPrompt:'), chalk.white(message));
    console.error(
      chalk.red('   Error:'),
      chalk.red(error instanceof Error ? error.message : String(error))
    );
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    if (!this.disableLogging) {
      console.error(
        chalk.cyan('🚀 BetterPrompt MCP Server'),
        chalk.white('running on stdio')
      );
      console.error(
        chalk.gray('   Transform any request into world-class prompts!')
      );
    }
  }
}

// Type definitions for validation
interface BetterPromptArgs {
  request: string;
  optimizationLevel?: 'basic' | 'advanced' | 'expert';
  includeExamples?: boolean;
  outputFormat?: 'conversational' | 'structured' | 'creative';
  enableChainOfThought?: boolean;
  enableRoleBasedPrompting?: boolean;
  enableContextEnhancement?: boolean;
  enableSelfConsistency?: boolean;
  creativity?: 'standard' | 'high' | 'maximum';
  context?: string;
  domain?: string;
  targetAudience?: string;
  desiredTone?:
    | 'professional'
    | 'casual'
    | 'academic'
    | 'creative'
    | 'technical';
  constraints?: string[];
}

interface AnalyzeRequestArgs {
  request: string;
  domain?: string;
}

interface QuickEnhanceArgs {
  request: string;
  tone?: 'professional' | 'casual' | 'academic' | 'creative';
}
