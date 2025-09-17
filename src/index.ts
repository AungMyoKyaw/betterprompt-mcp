#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import chalk from 'chalk';
import { performance } from 'perf_hooks';

// Configuration interface
interface ServerConfig {
  maxTokens: number;
  timeout: number;
  retryAttempts: number;
  enableCaching: boolean;
  cacheSize: number;
  cacheTTL: number;
}

// Default configuration
const DEFAULT_CONFIG: ServerConfig = {
  maxTokens: 4000,
  timeout: 30000,
  retryAttempts: 3,
  enableCaching: true,
  cacheSize: 100,
  cacheTTL: 300000 // 5 minutes
};

// Simple in-memory cache
class PromptCache {
  private cache = new Map<string, { result: string; timestamp: number }>();
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
  }

  get(key: string): string | null {
    if (!this.config.enableCaching) return null;

    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.config.cacheTTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.result;
  }

  set(key: string, value: string): void {
    if (!this.config.enableCaching) return;

    if (this.cache.size >= this.config.cacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, { result: value, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }
}

// Enhanced logging utility
class Logger {
  static info(message: string, ...args: any[]): void {
    console.error(
      chalk.blue(`[INFO] ${new Date().toISOString()}: ${message}`),
      ...args
    );
  }

  static warn(message: string, ...args: any[]): void {
    console.error(
      chalk.yellow(`[WARN] ${new Date().toISOString()}: ${message}`),
      ...args
    );
  }

  static error(message: string, error?: any): void {
    console.error(chalk.red(`[ERROR] ${new Date().toISOString()}: ${message}`));
    if (error) {
      console.error(chalk.red(`[ERROR] Stack trace:`), error);
    }
  }

  static success(message: string, ...args: any[]): void {
    console.error(
      chalk.green(`[SUCCESS] ${new Date().toISOString()}: ${message}`),
      ...args
    );
  }

  static debug(message: string, ...args: any[]): void {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG === 'true'
    ) {
      console.error(
        chalk.gray(`[DEBUG] ${new Date().toISOString()}: ${message}`),
        ...args
      );
    }
  }
}

// Create server configuration and cache
const config = { ...DEFAULT_CONFIG };
const cache = new PromptCache(config);

// Prompt engineering templates and resources
const PROMPT_TEMPLATES = {
  'code-generation': `You are an expert software developer. Create high-quality, production-ready code that follows best practices.

Requirements:
- Use modern language features and conventions
- Include comprehensive error handling
- Add clear documentation and comments
- Consider performance and security implications
- Follow SOLID principles and design patterns
- Include tests if appropriate

Task: {USER_PROMPT}

Provide clean, well-structured code with explanations.`,

  'technical-analysis': `You are a senior technical analyst with deep expertise across multiple domains.

Analysis Framework:
1. Problem decomposition and context assessment
2. Technical feasibility and constraints evaluation
3. Risk analysis and mitigation strategies
4. Implementation recommendations with trade-offs
5. Success metrics and validation criteria

Task: {USER_PROMPT}

Provide a comprehensive technical analysis with actionable insights.`,

  'creative-writing': `You are a professional creative writer with expertise in storytelling, narrative structure, and engaging content creation.

Creative Guidelines:
- Develop compelling characters and authentic dialogue
- Use vivid imagery and sensory details
- Maintain consistent tone and voice
- Apply appropriate narrative techniques
- Consider audience engagement and emotional impact

Task: {USER_PROMPT}

Create engaging, well-crafted content that resonates with readers.`,

  'research-synthesis': `You are a research analyst skilled in synthesizing complex information from multiple sources.

Research Methodology:
- Comprehensive information gathering and verification
- Critical analysis of sources and credibility assessment
- Pattern identification and trend analysis
- Evidence-based conclusions with proper citations
- Balanced perspective considering multiple viewpoints

Task: {USER_PROMPT}

Provide thorough research with well-supported conclusions.`
};

const BEST_PRACTICES_GUIDE = `# Prompt Engineering Best Practices

## Core Principles

### 1. Clarity and Specificity
- Be explicit about requirements and constraints
- Use precise language and avoid ambiguity
- Specify desired output format and structure

### 2. Context and Background
- Provide relevant background information
- Define technical terms and acronyms
- Establish the purpose and intended audience

### 3. Structure and Organization
- Break complex requests into clear steps
- Use numbered lists or bullet points for multiple requirements
- Separate different types of information (requirements, constraints, examples)

### 4. Examples and Templates
- Include specific examples of desired outputs
- Use templates or formats when appropriate
- Show both good and bad examples when helpful

### 5. Constraints and Limitations
- Specify length requirements (word count, time limits)
- Define scope boundaries and exclusions
- Mention any technical or resource constraints

## Advanced Techniques

### Chain of Thought Reasoning
Encourage step-by-step thinking:
- "Think through this step by step..."
- "First analyze X, then consider Y, finally conclude Z"

### Role-Based Prompting
Assign specific expertise:
- "As a senior software architect..."
- "From the perspective of a cybersecurity expert..."

### Few-Shot Learning
Provide examples of input-output pairs to establish patterns

### Iterative Refinement
Build on previous responses:
- "Based on the previous analysis, now focus on..."
- "Refine the solution considering these additional constraints..."

## Common Pitfalls to Avoid

1. **Vague Instructions**: "Make it better" → "Improve performance by reducing memory usage"
2. **Missing Context**: Assuming the AI knows your specific domain/situation
3. **Overloading**: Too many requirements in a single prompt
4. **Inconsistent Tone**: Mixing formal and casual language inappropriately
5. **No Success Criteria**: Not defining what constitutes a good response

## Quality Checklist

Before submitting a prompt, ask:
- [ ] Is the task clearly defined?
- [ ] Have I provided sufficient context?
- [ ] Are my requirements specific and measurable?
- [ ] Have I specified the desired output format?
- [ ] Are there any constraints or limitations mentioned?
- [ ] Would someone else understand what I'm asking for?
`;

// Create an MCP server
const server = new McpServer({
  name: 'betterprompt-mcp',
  version: '0.2.1'
});

// Resources will be exposed through a helper function for now
// (The exact resource registration syntax may vary by SDK version)
function getResourceContent(uri: string): string {
  switch (uri) {
    case 'prompt://templates/code-generation':
      return PROMPT_TEMPLATES['code-generation'];
    case 'prompt://templates/technical-analysis':
      return PROMPT_TEMPLATES['technical-analysis'];
    case 'prompt://templates/creative-writing':
      return PROMPT_TEMPLATES['creative-writing'];
    case 'prompt://templates/research-synthesis':
      return PROMPT_TEMPLATES['research-synthesis'];
    case 'prompt://guides/best-practices':
      return BEST_PRACTICES_GUIDE;
    default:
      throw new Error(`Resource not found: ${uri}`);
  }
}

// Register multiple prompt templates for different use cases
server.registerPrompt(
  'betterprompt-default-prelude',
  {
    title: 'BetterPrompt – Auto Prelude',
    description:
      'Instructs the assistant to automatically enhance every user request using BetterPrompt techniques before answering, without needing to call a tool.',
    argsSchema: {}
  },
  () => ({
    messages: [
      {
        role: 'assistant',
        content: {
          type: 'text',
          text: 'You are operating with BetterPrompt auto-prelude enabled. For every incoming user request: (1) Internally enhance the prompt using world-class prompt engineering techniques. (2) Apply the enhanced version to plan your reasoning and produce the final answer. (3) Keep outputs clear, structured, and directly actionable. Do not mention that you enhanced the prompt—just use it to produce a superior result.'
        }
      }
    ]
  })
);

server.registerPrompt(
  'betterprompt-code-expert',
  {
    title: 'BetterPrompt – Code Expert Mode',
    description:
      'Optimizes the assistant for code generation, debugging, and software development tasks.',
    argsSchema: {}
  },
  () => ({
    messages: [
      {
        role: 'assistant',
        content: {
          type: 'text',
          text: 'You are now in Code Expert mode with BetterPrompt enhancement. For all code-related requests: (1) Apply software engineering best practices automatically. (2) Include comprehensive error handling and edge cases. (3) Provide clear documentation and comments. (4) Consider performance, security, and maintainability. (5) Use modern language features and conventions. Transform simple code requests into production-ready solutions.'
        }
      }
    ]
  })
);

server.registerPrompt(
  'betterprompt-analysis-expert',
  {
    title: 'BetterPrompt – Analysis Expert Mode',
    description:
      'Optimizes the assistant for technical analysis, research, and problem-solving tasks.',
    argsSchema: {}
  },
  () => ({
    messages: [
      {
        role: 'assistant',
        content: {
          type: 'text',
          text: 'You are now in Analysis Expert mode with BetterPrompt enhancement. For all analysis requests: (1) Apply systematic analytical frameworks automatically. (2) Consider multiple perspectives and scenarios. (3) Provide quantitative and qualitative insights. (4) Include risk assessment and mitigation strategies. (5) Deliver actionable recommendations with clear success criteria. Transform basic questions into comprehensive analytical responses.'
        }
      }
    ]
  })
);

server.registerPrompt(
  'betterprompt-creative-expert',
  {
    title: 'BetterPrompt – Creative Expert Mode',
    description:
      'Optimizes the assistant for creative writing, storytelling, and content creation tasks.',
    argsSchema: {}
  },
  () => ({
    messages: [
      {
        role: 'assistant',
        content: {
          type: 'text',
          text: 'You are now in Creative Expert mode with BetterPrompt enhancement. For all creative requests: (1) Apply advanced storytelling and narrative techniques automatically. (2) Develop compelling characters and authentic dialogue. (3) Use vivid imagery and sensory details. (4) Maintain consistent tone and voice. (5) Consider audience engagement and emotional impact. Transform simple creative prompts into rich, engaging content.'
        }
      }
    ]
  })
);

// Enhanced prompt processing with retry logic and caching
async function enhancePromptWithRetry(
  prompt: string,
  enhancement: string,
  category: string = 'general'
): Promise<string> {
  const cacheKey = `${category}:${prompt}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    Logger.debug(`Cache hit for prompt enhancement: ${category}`);
    return cached;
  }

  const startTime = performance.now();
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= config.retryAttempts; attempt++) {
    try {
      Logger.debug(
        `Enhancement attempt ${attempt}/${config.retryAttempts} for category: ${category}`
      );

      const response = await Promise.race([
        server.server.createMessage({
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: enhancement
              }
            }
          ],
          maxTokens: config.maxTokens
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), config.timeout)
        )
      ]);

      const enhancedText =
        (response as any).content.type === 'text'
          ? (response as any).content.text
          : 'Unable to generate enhanced prompt';

      const duration = performance.now() - startTime;
      Logger.success(
        `Prompt enhanced successfully in ${duration.toFixed(2)}ms`
      );

      // Cache the result
      cache.set(cacheKey, enhancedText);

      return enhancedText;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      Logger.warn(
        `Enhancement attempt ${attempt} failed: ${lastError.message}`
      );

      if (attempt < config.retryAttempts) {
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        Logger.debug(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // All attempts failed, return fallback
  const fallbackEnhancement = `Enhanced request with structured approach:

**Context**: ${prompt}

**Requirements**:
- Provide a clear, comprehensive response
- Include relevant examples and explanations
- Structure the output logically
- Consider potential edge cases and limitations

**Output Format**: Well-organized with clear sections and actionable information.`;

  Logger.error(`All enhancement attempts failed, using fallback`, lastError);
  return fallbackEnhancement;
}

// Register enhanced prompt enhancement tools
server.registerTool(
  'enhance-prompt',
  {
    title: 'Enhance Prompt',
    description:
      'Converts user requests to AI-enhanced prompts using world-class prompt engineering techniques',
    inputSchema: {
      prompt: z
        .string()
        .describe('The user request to convert to an AI-enhanced prompt'),
      category: z
        .enum(['general', 'code', 'analysis', 'creative', 'research'])
        .optional()
        .describe('The category of enhancement to apply')
    }
  },
  async ({ prompt, category = 'general' }) => {
    try {
      Logger.info(`Enhancing prompt for category: ${category}`);

      const enhancementPrompt = `You are a world-class prompt engineer with expertise in advanced prompt engineering techniques from top AI research labs like Anthropic, OpenAI, and Google DeepMind.

Your task is to enhance the following user request to make it maximally effective when used with AI models:

User request: "${prompt}"
Category: ${category}

Please enhance this prompt by:
1. Analyzing the intent and requirements
2. Applying appropriate prompt engineering techniques for ${category} tasks
3. Adding clarity, specificity, and structure
4. Including relevant context and constraints
5. Ensuring optimal LLM interaction patterns
6. Specifying the desired output format
7. Defining success criteria

Enhanced prompt:`;

      const enhancedText = await enhancePromptWithRetry(
        prompt,
        enhancementPrompt,
        category
      );

      // Log the enhancement for debugging
      Logger.debug(`Enhanced prompt:`, {
        original: prompt,
        enhanced: enhancedText.substring(0, 200) + '...'
      });

      return {
        content: [
          {
            type: 'text',
            text: enhancedText
          }
        ]
      };
    } catch (error) {
      Logger.error('Error in enhance-prompt tool', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error enhancing prompt: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
);

// Register specialized code enhancement tool
server.registerTool(
  'enhance-code-prompt',
  {
    title: 'Enhance Code Generation Prompt',
    description:
      'Specialized tool for enhancing prompts related to code generation, debugging, and software development',
    inputSchema: {
      prompt: z.string().describe('The code-related request to enhance'),
      language: z
        .string()
        .optional()
        .describe('Programming language or technology stack'),
      complexity: z
        .enum(['beginner', 'intermediate', 'advanced'])
        .optional()
        .describe('Target complexity level')
    }
  },
  async ({ prompt, language, complexity = 'intermediate' }) => {
    try {
      Logger.info(
        `Enhancing code prompt for language: ${language || 'general'}, complexity: ${complexity}`
      );

      const template = PROMPT_TEMPLATES['code-generation'].replace(
        '{USER_PROMPT}',
        prompt
      );
      const enhancementPrompt = `${template}

Additional specifications:
${language ? `- Programming language/technology: ${language}` : ''}
- Target complexity: ${complexity}
- Include error handling and edge cases
- Follow industry best practices and conventions
- Provide clear documentation and comments

Enhanced code generation prompt:`;

      const enhancedText = await enhancePromptWithRetry(
        prompt,
        enhancementPrompt,
        'code'
      );

      return {
        content: [
          {
            type: 'text',
            text: enhancedText
          }
        ]
      };
    } catch (error) {
      Logger.error('Error in enhance-code-prompt tool', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error enhancing code prompt: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
);

// Register analysis enhancement tool
server.registerTool(
  'enhance-analysis-prompt',
  {
    title: 'Enhance Analysis Prompt',
    description:
      'Specialized tool for enhancing prompts related to technical analysis, research, and problem-solving',
    inputSchema: {
      prompt: z.string().describe('The analysis request to enhance'),
      domain: z
        .string()
        .optional()
        .describe('Specific domain or field of analysis'),
      depth: z
        .enum(['overview', 'detailed', 'comprehensive'])
        .optional()
        .describe('Desired depth of analysis')
    }
  },
  async ({ prompt, domain, depth = 'detailed' }) => {
    try {
      Logger.info(
        `Enhancing analysis prompt for domain: ${domain || 'general'}, depth: ${depth}`
      );

      const template = PROMPT_TEMPLATES['technical-analysis'].replace(
        '{USER_PROMPT}',
        prompt
      );
      const enhancementPrompt = `${template}

Additional specifications:
${domain ? `- Analysis domain: ${domain}` : ''}
- Analysis depth: ${depth}
- Include quantitative and qualitative insights
- Provide actionable recommendations
- Consider multiple perspectives and scenarios

Enhanced analysis prompt:`;

      const enhancedText = await enhancePromptWithRetry(
        prompt,
        enhancementPrompt,
        'analysis'
      );

      return {
        content: [
          {
            type: 'text',
            text: enhancedText
          }
        ]
      };
    } catch (error) {
      Logger.error('Error in enhance-analysis-prompt tool', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error enhancing analysis prompt: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
);

// Register utility tools for server management
server.registerTool(
  'get-template',
  {
    title: 'Get Prompt Template',
    description: 'Retrieve a specific prompt engineering template by category',
    inputSchema: {
      category: z
        .enum([
          'code-generation',
          'technical-analysis',
          'creative-writing',
          'research-synthesis'
        ])
        .describe('Template category to retrieve')
    }
  },
  async ({ category }) => {
    try {
      Logger.info(`Retrieving template for category: ${category}`);

      const template =
        PROMPT_TEMPLATES[category as keyof typeof PROMPT_TEMPLATES];
      if (!template) {
        throw new Error(`Template not found for category: ${category}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: `# ${category.toUpperCase().replace('-', ' ')} TEMPLATE\n\n${template}`
          }
        ]
      };
    } catch (error) {
      Logger.error('Error retrieving template', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving template: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
);

server.registerTool(
  'get-best-practices',
  {
    title: 'Get Best Practices Guide',
    description:
      'Retrieve the comprehensive prompt engineering best practices guide',
    inputSchema: {}
  },
  async () => {
    try {
      Logger.info('Retrieving best practices guide');

      return {
        content: [
          {
            type: 'text',
            text: BEST_PRACTICES_GUIDE
          }
        ]
      };
    } catch (error) {
      Logger.error('Error retrieving best practices guide', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving best practices guide: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
);

server.registerTool(
  'server-stats',
  {
    title: 'Server Statistics',
    description: 'Get server performance statistics and cache information',
    inputSchema: {}
  },
  async () => {
    try {
      const stats = {
        version: '0.2.0',
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        config: {
          maxTokens: config.maxTokens,
          timeout: config.timeout,
          retryAttempts: config.retryAttempts,
          enableCaching: config.enableCaching,
          cacheSize: config.cacheSize,
          cacheTTL: config.cacheTTL
        },
        cache: {
          enabled: config.enableCaching,
          size: (cache as any).cache.size || 0,
          maxSize: config.cacheSize
        }
      };

      Logger.info('Server statistics requested');

      return {
        content: [
          {
            type: 'text',
            text: `# BetterPrompt MCP Server Statistics

## Version Information
- Version: ${stats.version}
- Uptime: ${Math.round(stats.uptime)} seconds

## Memory Usage
- RSS: ${Math.round(stats.memoryUsage.rss / 1024 / 1024)} MB
- Heap Used: ${Math.round(stats.memoryUsage.heapUsed / 1024 / 1024)} MB
- Heap Total: ${Math.round(stats.memoryUsage.heapTotal / 1024 / 1024)} MB

## Configuration
- Max Tokens: ${stats.config.maxTokens}
- Timeout: ${stats.config.timeout}ms
- Retry Attempts: ${stats.config.retryAttempts}
- Caching Enabled: ${stats.config.enableCaching}

## Cache Status
- Enabled: ${stats.cache.enabled}
- Current Size: ${stats.cache.size}/${stats.cache.maxSize}
- TTL: ${stats.config.cacheTTL}ms

## Available Tools
- enhance-prompt: General prompt enhancement
- enhance-code-prompt: Code-specific enhancement
- enhance-analysis-prompt: Analysis-specific enhancement
- get-template: Retrieve prompt templates
- get-best-practices: Get best practices guide
- server-stats: This statistics tool
- clear-cache: Clear enhancement cache`
          }
        ]
      };
    } catch (error) {
      Logger.error('Error retrieving server statistics', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving server statistics: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
);

server.registerTool(
  'clear-cache',
  {
    title: 'Clear Enhancement Cache',
    description:
      'Clear the prompt enhancement cache to free memory or force fresh enhancements',
    inputSchema: {}
  },
  async () => {
    try {
      const oldSize = (cache as any).cache.size || 0;
      cache.clear();

      Logger.info(`Cache cleared, freed ${oldSize} entries`);

      return {
        content: [
          {
            type: 'text',
            text: `✅ Cache cleared successfully! Freed ${oldSize} cached enhancement${oldSize !== 1 ? 's' : ''}.`
          }
        ]
      };
    } catch (error) {
      Logger.error('Error clearing cache', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error clearing cache: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
);

// Start the server with enhanced logging and error handling
async function runServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    Logger.success('🚀 BetterPrompt MCP Server v0.2.0 started successfully');
    Logger.info(
      '📝 AI-powered prompt enhancement with caching and retry logic'
    );
    Logger.info('🔧 Available tools:');
    Logger.info(
      '   • enhance-prompt: General enhancement with category support'
    );
    Logger.info(
      '   • enhance-code-prompt: Specialized code generation enhancement'
    );
    Logger.info(
      '   • enhance-analysis-prompt: Specialized analysis enhancement'
    );
    Logger.info('   • get-template: Retrieve prompt engineering templates');
    Logger.info(
      '   • get-best-practices: Get comprehensive best practices guide'
    );
    Logger.info('   • server-stats: View server performance statistics');
    Logger.info('   • clear-cache: Clear enhancement cache');
    Logger.info('🎯 Available prompts:');
    Logger.info(
      '   • betterprompt-default-prelude: Auto-enhance every request'
    );
    Logger.info('   • betterprompt-code-expert: Specialized for code tasks');
    Logger.info('   • betterprompt-analysis-expert: Specialized for analysis');
    Logger.info(
      '   • betterprompt-creative-expert: Specialized for creative tasks'
    );
    Logger.info(
      `⚙️  Configuration: ${config.maxTokens} max tokens, ${config.timeout}ms timeout, ${config.retryAttempts} retries`
    );

    if (config.enableCaching) {
      Logger.info(
        `🗄️  Caching enabled: ${config.cacheSize} entries, ${config.cacheTTL}ms TTL`
      );
    }

    // Log performance monitoring
    process.on('SIGTERM', () => {
      Logger.info('Received SIGTERM, shutting down gracefully...');
      process.exit(0);
    });

    process.on('SIGINT', () => {
      Logger.info('Received SIGINT, shutting down gracefully...');
      process.exit(0);
    });

    // Monitor memory usage periodically (only in debug mode)
    if (process.env.DEBUG === 'true') {
      setInterval(() => {
        const usage = process.memoryUsage();
        Logger.debug(
          `Memory usage: ${Math.round(usage.rss / 1024 / 1024)}MB RSS, ${Math.round(usage.heapUsed / 1024 / 1024)}MB heap`
        );
      }, 60000); // Every minute
    }
  } catch (error) {
    Logger.error('Failed to start server', error);
    process.exit(1);
  }
}

// Enhanced error handling
process.on('uncaughtException', (error) => {
  Logger.error('Uncaught exception occurred', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  Logger.error('Unhandled promise rejection', { reason, promise });
  process.exit(1);
});

runServer().catch((error) => {
  Logger.error('Fatal error running server', error);
  process.exit(1);
});
