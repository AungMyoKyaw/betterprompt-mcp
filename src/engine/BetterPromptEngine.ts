import {
  PromptRequest,
  OptimizationConfig,
  OptimizedPrompt,
  PromptStrategy
} from '../types.js';
import {
  ChainOfThoughtStrategy,
  FewShotStrategy,
  RoleBasedStrategy
} from './strategies/CoreStrategies.js';
import {
  ContextEnhancementStrategy,
  OutputFormattingStrategy,
  SelfConsistencyStrategy
} from './strategies/AdvancedStrategies.js';

/**
 * Core prompt optimization engine that applies multiple strategies
 * to transform simple requests into world-class prompts
 */
export class BetterPromptEngine {
  private strategies: PromptStrategy[] = [];

  constructor() {
    this.initializeStrategies();
  }

  private initializeStrategies(): void {
    this.strategies = [
      new ChainOfThoughtStrategy(),
      new FewShotStrategy(),
      new RoleBasedStrategy(),
      new ContextEnhancementStrategy(),
      new OutputFormattingStrategy(),
      new SelfConsistencyStrategy()
    ];
  }

  /**
   * Main optimization method that transforms a request into an enhanced prompt
   */
  async optimizePrompt(
    request: PromptRequest,
    config: OptimizationConfig
  ): Promise<OptimizedPrompt> {
    // Validate inputs
    this.validateRequest(request);

    // Analyze the request to understand its complexity and intent
    const analysis = this.analyzeRequest(request);

    // Select and apply appropriate strategies
    const selectedStrategies = this.selectStrategies(config, analysis);
    const optimizedContent = this.applyStrategies(
      request,
      config,
      selectedStrategies
    );

    // Generate metadata and alternatives
    const metadata = this.generateMetadata(
      config,
      selectedStrategies,
      optimizedContent
    );
    const reasoning = this.generateReasoning(
      request,
      selectedStrategies,
      analysis
    );
    const alternatives =
      config.level === 'expert'
        ? this.generateAlternatives(request, config)
        : undefined;

    return {
      enhanced: optimizedContent,
      metadata,
      reasoning,
      alternatives
    };
  }

  private validateRequest(request: PromptRequest): void {
    if (
      !request.originalRequest ||
      request.originalRequest.trim().length === 0
    ) {
      throw new Error('Original request cannot be empty');
    }

    if (request.originalRequest.length > 10000) {
      throw new Error('Request is too long (maximum 10,000 characters)');
    }
  }

  private analyzeRequest(request: PromptRequest): RequestAnalysis {
    const content = request.originalRequest.toLowerCase();

    // Determine complexity based on length, keywords, and structure
    const complexity = this.assessComplexity(request);

    // Identify intent types
    const intents = this.identifyIntents(content);

    // Detect domain if not explicitly provided
    const detectedDomain = request.domain || this.detectDomain(content);

    // Analyze tone and style requirements
    const toneAnalysis = this.analyzeTone(content);

    return {
      complexity,
      intents,
      detectedDomain,
      toneAnalysis,
      wordCount: request.originalRequest.split(/\s+/).length,
      hasQuestions: content.includes('?'),
      hasConstraints:
        content.includes('must') ||
        content.includes('should') ||
        content.includes('requirements')
    };
  }

  private assessComplexity(
    request: PromptRequest
  ): 'simple' | 'moderate' | 'complex' | 'expert' {
    const wordCount = request.originalRequest.split(/\s+/).length;
    const hasMultipleParts =
      request.originalRequest.includes('and') ||
      request.originalRequest.includes('also');
    const hasConstraints =
      request.constraints && request.constraints.length > 0;
    const hasDomainSpecificity = request.domain !== undefined;

    if (wordCount < 10 && !hasMultipleParts && !hasConstraints) return 'simple';
    if (wordCount < 25 && !hasDomainSpecificity) return 'moderate';
    if (wordCount < 50 || hasConstraints || hasDomainSpecificity)
      return 'complex';
    return 'expert';
  }

  private identifyIntents(content: string): string[] {
    const intents: string[] = [];

    const intentPatterns = {
      explanation: [
        'explain',
        'describe',
        'what is',
        'how does',
        'tell me about'
      ],
      analysis: ['analyze', 'compare', 'evaluate', 'assess', 'review'],
      creation: ['create', 'generate', 'write', 'make', 'produce', 'design'],
      'problem-solving': [
        'solve',
        'fix',
        'resolve',
        'troubleshoot',
        'help with'
      ],
      planning: ['plan', 'strategy', 'approach', 'roadmap', 'timeline'],
      learning: ['teach', 'learn', 'understand', 'tutorial', 'guide']
    };

    for (const [intent, patterns] of Object.entries(intentPatterns)) {
      if (patterns.some((pattern) => content.includes(pattern))) {
        intents.push(intent);
      }
    }

    return intents.length > 0 ? intents : ['general'];
  }

  private detectDomain(content: string): string | undefined {
    const domainKeywords = {
      technology: [
        'software',
        'code',
        'programming',
        'api',
        'database',
        'algorithm'
      ],
      business: [
        'marketing',
        'sales',
        'revenue',
        'strategy',
        'customer',
        'market'
      ],
      science: [
        'research',
        'experiment',
        'hypothesis',
        'data',
        'theory',
        'method'
      ],
      education: [
        'learning',
        'teaching',
        'curriculum',
        'student',
        'course',
        'education'
      ],
      healthcare: [
        'medical',
        'health',
        'patient',
        'treatment',
        'diagnosis',
        'clinical'
      ],
      finance: ['investment', 'money', 'financial', 'budget', 'cost', 'profit']
    };

    for (const [domain, keywords] of Object.entries(domainKeywords)) {
      if (keywords.some((keyword) => content.includes(keyword))) {
        return domain;
      }
    }

    return undefined;
  }

  private analyzeTone(content: string): string {
    if (content.includes('please') || content.includes('could you'))
      return 'polite';
    if (content.includes('urgent') || content.includes('immediately'))
      return 'urgent';
    if (content.includes('professional') || content.includes('formal'))
      return 'formal';
    if (content.includes('fun') || content.includes('creative'))
      return 'casual';
    return 'neutral';
  }

  private selectStrategies(
    config: OptimizationConfig,
    analysis: RequestAnalysis
  ): PromptStrategy[] {
    const selected: PromptStrategy[] = [];

    // Always include core strategies based on config
    if (config.enableChainOfThought) {
      selected.push(
        this.strategies.find((s) => s.name === 'Chain-of-Thought')!
      );
    }

    if (config.includeExamples) {
      selected.push(
        this.strategies.find((s) => s.name === 'Few-Shot Learning')!
      );
    }

    if (config.enableRoleBasedPrompting) {
      selected.push(
        this.strategies.find((s) => s.name === 'Role-Based Prompting')!
      );
    }

    if (config.enableContextEnhancement) {
      selected.push(
        this.strategies.find((s) => s.name === 'Context Enhancement')!
      );
    }

    // Always include output formatting
    selected.push(this.strategies.find((s) => s.name === 'Output Formatting')!);

    // Add self-consistency for complex requests
    if (config.enableSelfConsistency && analysis.complexity === 'expert') {
      selected.push(
        this.strategies.find((s) => s.name === 'Self-Consistency')!
      );
    }

    return selected;
  }

  private applyStrategies(
    request: PromptRequest,
    config: OptimizationConfig,
    strategies: PromptStrategy[]
  ): string {
    let enhanced = request.originalRequest;

    // Apply strategies in order of importance (weighted)
    const sortedStrategies = strategies.sort((a, b) => b.weight - a.weight);

    for (const strategy of sortedStrategies) {
      const strategyRequest = { ...request, originalRequest: enhanced };
      enhanced = strategy.apply(strategyRequest, config);
    }

    return this.finalizePrompt(enhanced, config);
  }

  private finalizePrompt(content: string, config: OptimizationConfig): string {
    // Add optimization signature
    const signature = this.generateOptimizationSignature(config);

    return `${content}

${signature}`;
  }

  private generateOptimizationSignature(config: OptimizationConfig): string {
    const features: string[] = [];

    if (config.enableChainOfThought)
      features.push('Chain-of-Thought reasoning');
    if (config.includeExamples) features.push('example-guided responses');
    if (config.enableRoleBasedPrompting) features.push('expert persona');
    if (config.creativity === 'maximum') features.push('maximum creativity');

    return `---
*This prompt has been optimized using BetterPrompt with ${features.join(', ')} for ${config.level}-level performance.*`;
  }

  private generateMetadata(
    config: OptimizationConfig,
    strategies: PromptStrategy[],
    content: string
  ): OptimizedPrompt['metadata'] {
    return {
      optimizationLevel: config.level,
      strategiesApplied: strategies.map((s) => s.name),
      estimatedQuality: this.calculateQualityScore(strategies, content),
      wordCount: content.split(/\s+/).length,
      complexity: this.assessComplexity({ originalRequest: content })
    };
  }

  private calculateQualityScore(
    strategies: PromptStrategy[],
    content: string
  ): number {
    const baseScore = 60;
    const strategyBonus = strategies.reduce(
      (sum, strategy) => sum + strategy.weight * 10,
      0
    );
    const lengthBonus = Math.min(content.length / 100, 20); // Max 20 points for length

    return Math.min(Math.round(baseScore + strategyBonus + lengthBonus), 100);
  }

  private generateReasoning(
    request: PromptRequest,
    strategies: PromptStrategy[],
    analysis: RequestAnalysis
  ): string {
    const reasons: string[] = [];

    reasons.push(
      `**Request Analysis**: Detected ${analysis.complexity} complexity with ${analysis.intents.join(', ')} intent(s).`
    );

    if (analysis.detectedDomain) {
      reasons.push(
        `**Domain**: Identified ${analysis.detectedDomain} domain for specialized optimization.`
      );
    }

    reasons.push(
      `**Strategies Applied**: ${strategies.map((s) => s.name).join(', ')}.`
    );

    reasons.push(
      `**Optimization Focus**: Enhanced for clarity, depth, and actionable insights.`
    );

    return reasons.join('\n');
  }

  private generateAlternatives(
    request: PromptRequest,
    config: OptimizationConfig
  ): string[] {
    const alternatives: string[] = [];

    // Generate a more concise version
    const conciseConfig = {
      ...config,
      level: 'basic' as const,
      includeExamples: false
    };
    const conciseRequest = { ...request };
    const conciseStrategies = this.selectStrategies(
      conciseConfig,
      this.analyzeRequest(request)
    );
    alternatives.push(
      this.applyStrategies(conciseRequest, conciseConfig, conciseStrategies)
    );

    // Generate a more creative version if not already at maximum
    if (config.creativity !== 'maximum') {
      const creativeConfig = {
        ...config,
        creativity: 'maximum' as const,
        outputFormat: 'creative' as const
      };
      const creativeStrategies = this.selectStrategies(
        creativeConfig,
        this.analyzeRequest(request)
      );
      alternatives.push(
        this.applyStrategies(request, creativeConfig, creativeStrategies)
      );
    }

    return alternatives;
  }
}

// Internal interfaces
interface RequestAnalysis {
  complexity: 'simple' | 'moderate' | 'complex' | 'expert';
  intents: string[];
  detectedDomain?: string;
  toneAnalysis: string;
  wordCount: number;
  hasQuestions: boolean;
  hasConstraints: boolean;
}
