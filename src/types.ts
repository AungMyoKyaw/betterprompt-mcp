/**
 * Core types and interfaces for the BetterPrompt engine
 */

export interface OptimizationConfig {
  level: 'basic' | 'advanced' | 'expert';
  includeExamples: boolean;
  outputFormat: 'conversational' | 'structured' | 'creative';
  enableChainOfThought: boolean;
  enableRoleBasedPrompting: boolean;
  enableContextEnhancement: boolean;
  enableSelfConsistency: boolean;
  creativity: 'standard' | 'high' | 'maximum';
}

export interface PromptRequest {
  originalRequest: string;
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

export interface OptimizedPrompt {
  enhanced: string;
  metadata: {
    optimizationLevel: string;
    strategiesApplied: string[];
    estimatedQuality: number;
    wordCount: number;
    complexity: 'simple' | 'moderate' | 'complex' | 'expert';
  };
  reasoning: string;
  alternatives?: string[];
}

export interface PromptStrategy {
  name: string;
  description: string;
  apply(request: PromptRequest, config: OptimizationConfig): string;
  weight: number;
}

export const DEFAULT_CONFIG: OptimizationConfig = {
  level: 'advanced',
  includeExamples: true,
  outputFormat: 'conversational',
  enableChainOfThought: true,
  enableRoleBasedPrompting: true,
  enableContextEnhancement: true,
  enableSelfConsistency: false,
  creativity: 'high'
};
