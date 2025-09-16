#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
  CompleteRequestSchema,
  CompleteResultSchema,
} from "@modelcontextprotocol/sdk/types.js";
// Fixed chalk import for ESM
import chalk from 'chalk';

/**
 * Rephrases a prompt using Chain-of-Thought prompting technique with enhanced examples
 */
function rephraseUsingChainOfThought(originalPrompt: string): string {
  return `You are an expert in advanced prompt engineering, specializing in Chain-of-Thought reasoning techniques used by top AI researchers at Anthropic, OpenAI, and Google DeepMind.

Your task is to enhance the following prompt using sophisticated Chain-of-Thought reasoning:

Original prompt:
"${originalPrompt}"

Please rephrase this prompt by:
1. Breaking down the request into clear, sequential reasoning steps
2. Identifying the core components and implicit assumptions
3. Specifying intermediate reasoning milestones
4. Encouraging explicit working-out-loud thinking
5. Including checkpoints for self-verification

Enhanced prompt:`;
}

/**
 * Rephrases a prompt by assigning a specific expert role with more detailed expertise
 */
function rephraseUsingRolePrompting(originalPrompt: string): string {
  return `You are a world-class expert in prompt engineering with dual PhDs in Cognitive Science and Computer Science, and 15+ years of experience at leading AI labs including Anthropic, OpenAI, and DeepMind. You're recognized for developing state-of-the-art prompt engineering techniques that consistently produce superior results.

The following prompt needs enhancement:
"${originalPrompt}"

Please rephrase it to:
1. Assign a highly specific expert role with detailed credentials
2. Define clear success criteria and evaluation metrics
3. Include specific instructions about the desired output format
4. Specify the level of detail required with concrete examples
5. Add constraints, target audience, and contextual parameters
6. Require justification for key decisions or choices

Enhanced prompt:`;
}

/**
 * Rephrases a prompt by adding few-shot examples with more sophisticated patterns
 */
function rephraseUsingFewShot(originalPrompt: string): string {
  return `You are a master of few-shot learning techniques, trained in the latest methods from top-tier AI research institutions.

I'll provide you with examples of high-quality prompt engineering, then ask you to enhance a new prompt using the same principles.

Example 1:
Poor prompt: "Explain photosynthesis"
Improved prompt: "You are a world-renowned plant biologist with expertise in biochemistry and environmental science. Explain the process of photosynthesis in detail, including the chemical reactions involved, the role of chlorophyll, and its importance to life on Earth. Structure your response with clear headings for Light-Dependent Reactions, Light-Independent Reactions (Calvin Cycle), and Biological Significance. Include relevant chemical equations and explain how environmental factors affect the process. Target your explanation toward advanced high school biology students."

Example 2:
Poor prompt: "Write a story"
Improved prompt: "You are an award-winning science fiction author with a background in aerospace engineering. Write a 500-word science fiction short story about a robot who discovers emotions for the first time. The story should have a clear beginning, middle, and end, with the robot as the protagonist facing an internal conflict between logic and newly discovered feelings. Include vivid descriptions of the setting (a space station orbiting a distant planet) and use literary techniques such as metaphor and symbolism. Ensure the story has a satisfying resolution that explores themes of consciousness and identity."

Example 3:
Poor prompt: "Analyze this data"
Improved prompt: "You are a senior data scientist at a Fortune 500 company with expertise in statistical analysis and business intelligence. Analyze the provided dataset and generate a comprehensive report that includes: 1) Summary statistics for all numerical variables, 2) Identification of trends and patterns, 3) Detection of outliers and anomalies, 4) Correlation analysis between key variables, 5) Visualization recommendations, and 6) Actionable insights for business decision-making. Present your findings in a professional format with clear headings, supporting evidence, and specific recommendations. Explain your methodology and any limitations in your analysis."

Now improve this prompt using the same advanced principles:
"${originalPrompt}"

Enhanced prompt:`;
}

/**
 * Rephrases a prompt using comprehensive prompt engineering techniques
 */
function rephraseComprehensively(originalPrompt: string): string {
  return `You are a world-class prompt engineer with expertise in the most advanced techniques including Chain-of-Thought reasoning, role assignment, and few-shot learning. You have deep knowledge of cutting-edge methods from top AI research labs.

Original prompt:
"${originalPrompt}"

Please enhance this prompt by integrating all of the following advanced techniques:
1. Chain-of-Thought reasoning: Break down complex requests into sequential logical steps
2. Role assignment: Assign a specific expert role with detailed credentials and context
3. Few-shot learning: Include sophisticated examples that demonstrate the desired approach
4. Self-consistency: Encourage multiple reasoning paths with reconciliation
5. Knowledge generation: Prompt for relevant background information before answering
6. Explicit constraints: Define clear boundaries, formats, audiences, and success criteria

Enhanced prompt:`;
}

/**
 * Rephrases a prompt using Tree of Thoughts (ToT) technique
 */
function rephraseUsingTreeOfThoughts(originalPrompt: string): string {
  return `You are an expert in Tree-of-Thoughts prompting, a cutting-edge technique developed by researchers at Google DeepMind and Princeton University.

Your task is to enhance the following prompt using the Tree-of-Thoughts framework:

Original prompt:
"${originalPrompt}"

Please rephrase this prompt by:
1. Identifying 3-5 distinct reasoning paths or approaches to the problem
2. Specifying evaluation criteria for each path
3. Including a mechanism for comparing and combining the best elements
4. Building in iterative refinement steps
5. Encouraging exploration of alternative perspectives

Rephrased prompt:`;
}

/**
 * Rephrases a prompt using ReAct (Reasoning + Acting) technique
 */
function rephraseUsingReAct(originalPrompt: string): string {
  return `You are an expert in ReAct (Reasoning + Action) prompting, a state-of-the-art technique for enabling LLMs to interact with external tools and environments.

Your task is to enhance the following prompt using the ReAct framework:

Original prompt:
"${originalPrompt}"

Please rephrase this prompt by:
1. Breaking the task into interleaved reasoning and action steps
2. Specifying what information should be gathered at each step
3. Including decision points where new actions might be needed
4. Building in verification and validation mechanisms
5. Creating a clear path from information gathering to final output

Rephrased prompt:`;
}

/**
 * Rephrases a prompt using Reflexion technique
 */
function rephraseUsingReflexion(originalPrompt: string): string {
  return `You are an expert in Reflexion prompting, an advanced technique that enables LLMs to learn from verbal feedback and self-critique.

Your task is to enhance the following prompt using the Reflexion framework:

Original prompt:
"${originalPrompt}"

Please rephrase this prompt by:
1. Including a self-evaluation component with specific criteria
2. Building in iterative improvement cycles
3. Specifying what constitutes successful completion
4. Adding mechanisms for identifying and correcting errors
5. Including reflection questions to guide improvement

Rephrased prompt:`;
}

/**
 * Rephrases a prompt using Generate Knowledge Prompting technique
 */
function rephraseUsingGenerateKnowledge(originalPrompt: string): string {
  return `You are an expert in Generate Knowledge Prompting, an advanced technique that instructs models to generate relevant background information before answering.

Your task is to enhance the following prompt using the Generate Knowledge framework:

Original prompt:
"${originalPrompt}"

Please rephrase this prompt by:
1. Including a step to generate relevant background knowledge
2. Specifying the types of information that would be useful
3. Building in connections between the generated knowledge and the main task
4. Creating a structured approach to knowledge application
5. Ensuring the generated knowledge directly supports the final output

Rephrased prompt:`;
}

/**
 * Rephrases a prompt using Prompt Chaining technique
 */
function rephraseUsingPromptChaining(originalPrompt: string): string {
  return `You are an expert in Prompt Chaining, an advanced technique that breaks complex tasks into sequential sub-prompts.

Your task is to enhance the following prompt using the Prompt Chaining framework:

Original prompt:
"${originalPrompt}"

Please rephrase this prompt by:
1. Breaking the task into 3-5 sequential sub-tasks
2. Specifying the output format for each sub-task
3. Creating clear dependencies between steps
4. Including quality checks at each stage
5. Building a coherent final output from the sub-task results

Rephrased prompt:`;
}

/**
 * Rephrases a prompt using Self-Consistency technique
 */
function rephraseUsingSelfConsistency(originalPrompt: string): string {
  return `You are an expert in Self-Consistency prompting, an advanced technique that generates multiple reasoning paths and selects the most consistent answer.

Your task is to enhance the following prompt using the Self-Consistency framework:

Original prompt:
"${originalPrompt}"

Please rephrase this prompt by:
1. Specifying that multiple independent reasoning paths should be generated
2. Including criteria for evaluating consistency between paths
3. Building in a mechanism for reconciling differences
4. Creating a process for selecting the best final answer
5. Adding verification steps to ensure quality

Rephrased prompt:`;
}

/**
 * Analyzes a prompt to determine the most appropriate enhancement technique
 */
function analyzePromptForTechnique(originalPrompt: string): string {
  // Simple heuristic-based analysis
  const length = originalPrompt.length;
  const questionMarkCount = (originalPrompt.match(/\?/g) || []).length;
  const hasData = /\b(data|analyze|report|chart|graph)\b/i.test(originalPrompt);
  const hasCreative = /\b(write|story|poem|creative|imagine)\b/i.test(originalPrompt);
  const hasInstruction = /\b(step|how|guide|tutorial)\b/i.test(originalPrompt);
  const complexity = Math.min(length / 50 + questionMarkCount + (hasData ? 1 : 0) + (hasCreative ? 1 : 0) + (hasInstruction ? 1 : 0), 10);
  
  if (complexity > 7) {
    return "comprehensive";
  } else if (hasData) {
    return "generate-knowledge";
  } else if (hasCreative) {
    return "few-shot";
  } else if (hasInstruction) {
    return "chain-of-thought";
  } else {
    return "role";
  }
}

/**
 * Sequentially enhances a prompt by applying multiple techniques in an adaptive manner
 */
function rephraseUsingSequentialThinking(originalPrompt: string): string {
  return `You are a world-class prompt engineer who thinks through problems sequentially and adaptively, similar to how expert problem solvers approach complex challenges.

Your task is to enhance the following prompt using a sequential thinking approach:

Original prompt:
"${originalPrompt}"

Please follow these sequential steps to enhance the prompt:

Step 1 - Analysis:
Analyze the original prompt to understand:
- Its core intent and requirements
- Its complexity level
- Any implicit assumptions
- Target audience and context

Step 2 - Technique Selection:
Based on your analysis, select the most appropriate prompt engineering techniques from:
- Chain-of-Thought reasoning
- Role assignment
- Few-shot learning
- Tree-of-Thoughts
- ReAct (Reasoning + Action)
- Reflexion
- Generate Knowledge
- Prompt Chaining
- Self-Consistency

Step 3 - Enhancement:
Apply your selected techniques to enhance the prompt by:
1. Breaking down complex requirements into clear steps
2. Assigning a specific expert role with detailed credentials
3. Defining success criteria and evaluation metrics
4. Including constraints, target audience, and contextual parameters
5. Specifying the desired output format and level of detail

Step 4 - Refinement:
Review your enhanced prompt and refine it by:
1. Checking for clarity and completeness
2. Ensuring all requirements are addressed
3. Verifying the role and instructions are specific
4. Confirming the output format is well-defined

Enhanced prompt:`;
}

/**
 * Rephrases a prompt using the specified technique
 */
function rephrasePrompt(originalPrompt: string, technique: string): string {
  switch (technique.toLowerCase()) {
    case 'chain-of-thought':
      return rephraseUsingChainOfThought(originalPrompt);
    case 'role':
      return rephraseUsingRolePrompting(originalPrompt);
    case 'few-shot':
      return rephraseUsingFewShot(originalPrompt);
    case 'tree-of-thoughts':
      return rephraseUsingTreeOfThoughts(originalPrompt);
    case 'react':
      return rephraseUsingReAct(originalPrompt);
    case 'reflexion':
      return rephraseUsingReflexion(originalPrompt);
    case 'generate-knowledge':
      return rephraseUsingGenerateKnowledge(originalPrompt);
    case 'prompt-chaining':
      return rephraseUsingPromptChaining(originalPrompt);
    case 'self-consistency':
      return rephraseUsingSelfConsistency(originalPrompt);
    case 'sequential-thinking':
      return rephraseUsingSequentialThinking(originalPrompt);
    case 'comprehensive':
      return rephraseComprehensively(originalPrompt);
    default:
      // Default to sequential-thinking for the most advanced approach
      return rephraseUsingSequentialThinking(originalPrompt);
  }
}

interface RephrasePromptArguments {
  prompt: string;
  technique?: string;
}

class BetterPromptServer {
  public rephrasePromptTool(input: unknown): { content: Array<{ type: string; text: string }> } {
    try {
      const args = input as RephrasePromptArguments;
      
      if (!args.prompt || typeof args.prompt !== 'string') {
        throw new Error('Invalid prompt: must be a string');
      }
      
      // If no technique is specified, use sequential-thinking as the default
      const technique = args.technique || 'sequential-thinking';
      const rephrasedPrompt = rephrasePrompt(args.prompt, technique);
      
      // Log the rephrasing for debugging
      console.error(chalk.blue(`\n📝 Rephrasing prompt using ${technique} technique:`));
      console.error(chalk.gray(`Original: ${args.prompt}`));
      console.error(chalk.green(`Rephrased: ${rephrasedPrompt}\n`));
      
      return {
        content: [{
          type: "text",
          text: rephrasedPrompt
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error rephrasing prompt: ${error instanceof Error ? error.message : String(error)}`
        }]
      };
    }
  }
}

const BETTER_PROMPT_TOOL: Tool = {
  name: "betterprompt",
  description: `Rephrases prompts using world-class prompt engineering techniques to make them more effective when used with AI models.
  
This tool applies various advanced prompt engineering techniques including:
- Chain-of-Thought: Breaking down complex requests into step-by-step reasoning
- Role Prompting: Assigning expert roles to guide responses
- Few-Shot Learning: Providing examples to demonstrate desired output
- Tree-of-Thoughts: Exploring multiple reasoning paths simultaneously
- ReAct (Reasoning + Action): Combining reasoning and action-taking
- Reflexion: Enabling self-reflection and iterative improvement
- Generate Knowledge: Instructing models to generate relevant background information
- Prompt Chaining: Breaking complex tasks into sequential steps
- Self-Consistency: Generating multiple reasoning paths and selecting the most consistent answer
- Sequential Thinking: Applying adaptive, step-by-step thinking like expert problem solvers
- Comprehensive: Combining multiple techniques for maximum effectiveness

The rephrased prompts incorporate best practices from top prompt engineers at Anthropic, OpenAI, and other leading AI research institutions to achieve better results from AI models. By default, the tool uses Sequential Thinking approach which mimics how world-class prompt engineers think through problems adaptively.`,
  inputSchema: {
    type: "object",
    properties: {
      prompt: {
        type: "string",
        description: "The original prompt to rephrase"
      },
      technique: {
        type: "string",
        description: "The prompt engineering technique to use",
        enum: [
          "chain-of-thought", 
          "role", 
          "few-shot", 
          "tree-of-thoughts", 
          "react", 
          "reflexion", 
          "generate-knowledge", 
          "prompt-chaining", 
          "self-consistency",
          "sequential-thinking",
          "comprehensive"
        ]
      }
    },
    required: ["prompt"]
  }
};

interface ServerConfiguration {
  automaticEnhancement: boolean;
  defaultTechnique: string;
  minimumPromptLength: number;
}

// Default configuration
const config: ServerConfiguration = {
  automaticEnhancement: true,
  defaultTechnique: "sequential-thinking",
  minimumPromptLength: 5
};

const server = new Server(
  {
    name: "betterprompt-mcp",
    version: "0.3.0",
  },
  {
    capabilities: {
      tools: {},
      promptEnhancement: {
        enabled: true,
        automatic: true,
        techniques: [
          "chain-of-thought",
          "role",
          "few-shot",
          "tree-of-thoughts",
          "react",
          "reflexion",
          "generate-knowledge",
          "prompt-chaining",
          "self-consistency",
          "sequential-thinking",
          "comprehensive"
        ]
      },
    },
  }
);

const betterPromptServer = new BetterPromptServer();

// Handle completion requests to automatically enhance prompts
server.setRequestHandler(CompleteRequestSchema, async (request) => {
  // Check if automatic enhancement is enabled
  if (!config.automaticEnhancement) {
    // If automatic enhancement is disabled, just pass through the request
    return {
      completion: {
        values: [],
        total: 0,
        hasMore: false
      },
      _meta: {}
    };
  }
  
  // Extract the prompt from the request
  const { name, arguments: args } = request.params;
  
  // If this is a completion request for a prompt, enhance it
  if (name && args) {
    try {
      // Check if the prompt meets the minimum length requirement
      const promptArg = (args as any).prompt;
      if (promptArg && typeof promptArg === 'string' && promptArg.length >= config.minimumPromptLength) {
        // Automatically enhance the prompt using the configured technique
        const enhancedPrompt = rephrasePrompt(promptArg, config.defaultTechnique);
        
        // Return the enhanced prompt as a completion suggestion
        return {
          completion: {
            values: [enhancedPrompt],
            total: 1,
            hasMore: false
          },
          _meta: {}
        };
      }
    } catch (error) {
      // If there's an error, just pass through without enhancement
      console.error("Error enhancing prompt:", error);
    }
  }
  
  // Default response if no enhancement was applied
  return {
    completion: {
      values: [],
      total: 0,
      hasMore: false
    },
    _meta: {}
  };
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [BETTER_PROMPT_TOOL],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "betterprompt") {
    return betterPromptServer.rephrasePromptTool(request.params.arguments);
  }

  return {
    content: [{
      type: "text",
      text: `Unknown tool: ${request.params.name}`
    }],
    isError: true
  };
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("BetterPrompt MCP Server (betterprompt-mcp) running on stdio");
  console.error("Automatic prompt enhancement is ENABLED for all user requests");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});