import {
  PromptRequest,
  OptimizationConfig,
  PromptStrategy
} from '../../types.js';

/**
 * Chain-of-Thought strategy implementation
 * Adds structured reasoning steps to encourage step-by-step thinking
 */
export class ChainOfThoughtStrategy implements PromptStrategy {
  name = 'Chain-of-Thought';
  description =
    'Encourages step-by-step reasoning and explicit thought processes';
  weight = 0.9;

  apply(request: PromptRequest, config: OptimizationConfig): string {
    if (!config.enableChainOfThought) return request.originalRequest;

    const cotInstructions = this.generateCoTInstructions(request, config);

    return `${request.originalRequest}

${cotInstructions}

Please think through this step by step:
1. First, let me understand what is being asked...
2. Then, I'll consider the key factors and constraints...
3. Next, I'll work through the reasoning process...
4. Finally, I'll provide a comprehensive response...`;
  }

  private generateCoTInstructions(
    request: PromptRequest,
    config: OptimizationConfig
  ): string {
    const instructions = [
      'Think through this systematically and show your reasoning process.'
    ];

    if (config.level === 'expert') {
      instructions.push(
        'Consider multiple perspectives and potential edge cases.',
        'Validate your reasoning at each step.',
        'If you encounter uncertainty, explicitly acknowledge it and explain your approach.'
      );
    }

    if (request.domain) {
      instructions.push(
        `Apply domain-specific expertise in ${request.domain}.`
      );
    }

    return instructions.join(' ');
  }
}

/**
 * Few-Shot Learning strategy implementation
 * Provides relevant examples to guide the response
 */
export class FewShotStrategy implements PromptStrategy {
  name = 'Few-Shot Learning';
  description = 'Provides relevant examples to guide response generation';
  weight = 0.8;

  apply(request: PromptRequest, config: OptimizationConfig): string {
    if (!config.includeExamples) return request.originalRequest;

    const examples = this.generateExamples(request, config);

    if (examples.length === 0) return request.originalRequest;

    return `Here are some examples of excellent responses to similar requests:

${examples.join('\n\n')}

Now, please respond to this request with the same level of quality and attention to detail:

${request.originalRequest}`;
  }

  private generateExamples(
    request: PromptRequest,
    config: OptimizationConfig
  ): string[] {
    const examples: string[] = [];

    // Generate domain-specific examples based on request analysis
    const requestLower = request.originalRequest.toLowerCase();

    if (requestLower.includes('explain') || requestLower.includes('describe')) {
      examples.push(this.createExplanationExample());
    }

    if (requestLower.includes('analyze') || requestLower.includes('compare')) {
      examples.push(this.createAnalysisExample());
    }

    if (
      requestLower.includes('create') ||
      requestLower.includes('write') ||
      requestLower.includes('generate')
    ) {
      examples.push(this.createCreativeExample());
    }

    return examples.slice(0, config.level === 'expert' ? 3 : 2);
  }

  private createExplanationExample(): string {
    return `Example 1 - Excellent Explanation:
Q: "Explain how photosynthesis works"
A: "Photosynthesis is the process by which plants convert light energy into chemical energy. Here's how it works:

**The Process:**
1. **Light Absorption**: Chlorophyll in leaves captures sunlight
2. **Water Uptake**: Roots absorb water from soil
3. **Carbon Dioxide Intake**: Leaves take in CO2 from air
4. **Chemical Reaction**: 6CO2 + 6H2O +光能 → C6H12O6 + 6O2
5. **Energy Storage**: Glucose stores the energy for later use

**Why It Matters**: This process not only feeds the plant but also produces the oxygen we breathe, making it fundamental to life on Earth."`;
  }

  private createAnalysisExample(): string {
    return `Example 2 - Thorough Analysis:
Q: "Compare electric cars vs gas cars"
A: "Here's a comprehensive comparison:

**Performance:**
- Electric: Instant torque, quiet operation, smooth acceleration
- Gas: Familiar driving experience, longer range, quick refueling

**Environmental Impact:**
- Electric: Zero direct emissions, but depends on electricity source
- Gas: Direct CO2 emissions, established recycling infrastructure

**Economics:**
- Electric: Lower operating costs, higher upfront cost, tax incentives
- Gas: Lower purchase price, higher fuel and maintenance costs

**Conclusion**: Electric cars excel in efficiency and environmental benefits, while gas cars offer convenience and lower entry costs. The best choice depends on your driving patterns, budget, and environmental priorities."`;
  }

  private createCreativeExample(): string {
    return `Example 3 - Creative Excellence:
Q: "Write a product description for smart headphones"
A: "**SoundMind Pro: Where Music Meets Intelligence**

Transform your audio experience with headphones that think as beautifully as they sound. The SoundMind Pro doesn't just play music—it creates a personalized acoustic sanctuary that adapts to your world.

✨ **Intelligent Features:**
- AI-powered noise cancellation that learns your environment
- Biometric mood detection for automatic playlist curation
- Seamless device switching with gesture controls

🎵 **Premium Audio:**
- Studio-quality drivers with 360° spatial audio
- 30-hour battery with 5-minute quick charge
- Crystal-clear call quality with dual-mic array

**Your Music, Elevated**: Whether you're conquering deadlines or conquering mountains, SoundMind Pro delivers the perfect soundtrack to your life."`;
  }
}

/**
 * Role-Based Prompting strategy implementation
 * Defines expert personas to enhance response quality
 */
export class RoleBasedStrategy implements PromptStrategy {
  name = 'Role-Based Prompting';
  description =
    'Defines expert personas to enhance response authority and depth';
  weight = 0.85;

  apply(request: PromptRequest, config: OptimizationConfig): string {
    if (!config.enableRoleBasedPrompting) return request.originalRequest;

    const role = this.determineOptimalRole(request);
    const rolePrompt = this.generateRolePrompt(role, request, config);

    return `${rolePrompt}

${request.originalRequest}

Please respond with the expertise, depth, and perspective that your role provides.`;
  }

  private determineOptimalRole(request: PromptRequest): string {
    const requestLower = request.originalRequest.toLowerCase();

    // Domain-specific role mapping
    if (request.domain) {
      return this.mapDomainToRole(request.domain);
    }

    // Intent-based role detection
    if (requestLower.includes('analyze') || requestLower.includes('research')) {
      return 'Senior Research Analyst';
    }
    if (requestLower.includes('explain') || requestLower.includes('teach')) {
      return 'Expert Educator and Communicator';
    }
    if (requestLower.includes('create') || requestLower.includes('design')) {
      return 'Creative Director and Innovation Specialist';
    }
    if (requestLower.includes('solve') || requestLower.includes('fix')) {
      return 'Problem-Solving Expert';
    }
    if (requestLower.includes('strategy') || requestLower.includes('plan')) {
      return 'Strategic Consultant';
    }

    return 'Multi-Disciplinary Expert and Thought Leader';
  }

  private mapDomainToRole(domain: string): string {
    const domainRoles: Record<string, string> = {
      technology: 'Senior Technology Architect and Innovation Leader',
      business: 'Strategic Business Consultant and Industry Expert',
      science: 'Research Scientist and Academic Authority',
      education: 'Educational Design Expert and Learning Specialist',
      healthcare: 'Medical Expert and Healthcare Innovation Specialist',
      finance: 'Financial Strategist and Investment Expert',
      marketing: 'Brand Strategy Expert and Marketing Innovation Leader',
      design: 'Design Thinking Expert and Creative Director',
      law: 'Legal Expert and Regulatory Specialist',
      environment: 'Environmental Scientist and Sustainability Expert'
    };

    return domainRoles[domain.toLowerCase()] || 'Subject Matter Expert';
  }

  private generateRolePrompt(
    role: string,
    request: PromptRequest,
    config: OptimizationConfig
  ): string {
    const basePrompt = `You are a ${role} with deep expertise and years of experience in your field.`;

    const qualities = [
      'You have a reputation for providing comprehensive, nuanced, and actionable insights.',
      'You approach problems with both analytical rigor and creative thinking.',
      'You communicate complex ideas clearly and effectively.'
    ];

    if (config.level === 'expert') {
      qualities.push(
        'You stay current with the latest developments and emerging trends.',
        'You consider multiple perspectives and acknowledge areas of uncertainty.',
        'You provide evidence-based recommendations with clear reasoning.'
      );
    }

    if (request.targetAudience) {
      qualities.push(
        `You tailor your communication style to be appropriate for ${request.targetAudience}.`
      );
    }

    return `${basePrompt}

${qualities.join(' ')}`;
  }
}
