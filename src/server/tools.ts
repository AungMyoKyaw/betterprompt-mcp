import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Tool definitions for the BetterPrompt MCP server
 */

export const BETTERPROMPT_TOOL: Tool = {
  name: 'betterprompt',
  description: `Transforms user requests into world-class, optimized prompts using advanced prompt engineering techniques.

This tool applies multiple optimization strategies including:
- Chain-of-Thought reasoning for step-by-step thinking
- Few-shot learning with relevant examples
- Role-based prompting with expert personas
- Context enhancement and output formatting
- Self-consistency for complex problems

Perfect for enhancing any request, from simple questions to complex tasks, ensuring maximum AI performance and response quality.`,
  inputSchema: {
    type: 'object',
    properties: {
      request: {
        type: 'string',
        description: 'The original user request to be optimized (required)',
        minLength: 1,
        maxLength: 10000
      },
      optimizationLevel: {
        type: 'string',
        enum: ['basic', 'advanced', 'expert'],
        description: 'Level of optimization to apply (default: advanced)',
        default: 'advanced'
      },
      includeExamples: {
        type: 'boolean',
        description:
          'Whether to include relevant examples in the optimized prompt (default: true)',
        default: true
      },
      outputFormat: {
        type: 'string',
        enum: ['conversational', 'structured', 'creative'],
        description:
          'Desired format for the response (default: conversational)',
        default: 'conversational'
      },
      enableChainOfThought: {
        type: 'boolean',
        description:
          'Enable chain-of-thought reasoning instructions (default: true)',
        default: true
      },
      enableRoleBasedPrompting: {
        type: 'boolean',
        description:
          'Enable expert role assignment for enhanced authority (default: true)',
        default: true
      },
      enableContextEnhancement: {
        type: 'boolean',
        description:
          'Enable context enrichment and structure enhancement (default: true)',
        default: true
      },
      enableSelfConsistency: {
        type: 'boolean',
        description:
          'Enable multiple reasoning paths for complex problems (default: false)',
        default: false
      },
      creativity: {
        type: 'string',
        enum: ['standard', 'high', 'maximum'],
        description: 'Level of creativity to encourage (default: high)',
        default: 'high'
      },
      context: {
        type: 'string',
        description:
          'Additional context or background information for the request (optional)',
        maxLength: 2000
      },
      domain: {
        type: 'string',
        description:
          'Specific domain or field for specialized optimization (optional)',
        maxLength: 100
      },
      targetAudience: {
        type: 'string',
        description: 'Target audience for the response (optional)',
        maxLength: 200
      },
      desiredTone: {
        type: 'string',
        enum: ['professional', 'casual', 'academic', 'creative', 'technical'],
        description: 'Desired tone for the response (optional)'
      },
      constraints: {
        type: 'array',
        items: {
          type: 'string',
          maxLength: 200
        },
        description: 'Specific constraints or requirements (optional)',
        maxItems: 10
      }
    },
    required: ['request']
  }
};

export const ANALYZE_REQUEST_TOOL: Tool = {
  name: 'analyze-request',
  description: `Analyzes a user request to provide insights about its complexity, intent, and optimization recommendations.

This tool helps users understand:
- Request complexity level (simple, moderate, complex, expert)
- Detected intents (explanation, analysis, creation, problem-solving, etc.)
- Suggested optimization strategies
- Domain detection and recommendations

Useful for understanding how BetterPrompt would approach optimizing a particular request.`,
  inputSchema: {
    type: 'object',
    properties: {
      request: {
        type: 'string',
        description: 'The user request to analyze',
        minLength: 1,
        maxLength: 10000
      },
      domain: {
        type: 'string',
        description: 'Known domain or field (optional)',
        maxLength: 100
      }
    },
    required: ['request']
  }
};

export const QUICK_ENHANCE_TOOL: Tool = {
  name: 'quick-enhance',
  description: `Quickly enhances a user request with basic optimizations for immediate improvement.

This is a lightweight version of the full BetterPrompt optimization, perfect for:
- Quick improvements without extensive processing
- Simple requests that need minor enhancements
- When you want faster results with good quality

Applies essential optimizations like clarity improvements, structure enhancement, and basic context enrichment.`,
  inputSchema: {
    type: 'object',
    properties: {
      request: {
        type: 'string',
        description: 'The user request to quickly enhance',
        minLength: 1,
        maxLength: 5000
      },
      tone: {
        type: 'string',
        enum: ['professional', 'casual', 'academic', 'creative'],
        description: 'Desired tone (optional)'
      }
    },
    required: ['request']
  }
};

export const ALL_TOOLS = [
  BETTERPROMPT_TOOL,
  ANALYZE_REQUEST_TOOL,
  QUICK_ENHANCE_TOOL
];
