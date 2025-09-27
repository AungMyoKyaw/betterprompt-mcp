import {
  PromptRequest,
  OptimizationConfig,
  PromptStrategy
} from '../../types.js';

/**
 * Context Enhancement strategy implementation
 * Enriches prompts with relevant background information and structure
 */
export class ContextEnhancementStrategy implements PromptStrategy {
  name = 'Context Enhancement';
  description =
    'Enriches prompts with relevant background and contextual information';
  weight = 0.75;

  apply(request: PromptRequest, config: OptimizationConfig): string {
    if (!config.enableContextEnhancement) return request.originalRequest;

    const contextualPrompt = this.buildContextualPrompt(request);

    return `${contextualPrompt}

**Your Task:**
${request.originalRequest}

**Expected Outcome:**
${this.generateOutcomeExpectations(request, config)}`;
  }

  private buildContextualPrompt(request: PromptRequest): string {
    const sections: string[] = [];

    // Add context section
    if (request.context || request.domain) {
      sections.push('**Context:**');
      if (request.context) {
        sections.push(request.context);
      }
      if (request.domain) {
        sections.push(`This request relates to the ${request.domain} domain.`);
      }
    }

    // Add audience consideration
    if (request.targetAudience) {
      sections.push(`**Target Audience:** ${request.targetAudience}`);
    }

    // Add tone guidance
    if (request.desiredTone) {
      sections.push(`**Desired Tone:** ${request.desiredTone}`);
    }

    // Add constraints
    if (request.constraints && request.constraints.length > 0) {
      sections.push('**Constraints:**');
      request.constraints.forEach((constraint: string) => {
        sections.push(`- ${constraint}`);
      });
    }

    return sections.join('\n');
  }

  private generateOutcomeExpectations(
    request: PromptRequest,
    config: OptimizationConfig
  ): string {
    const expectations: string[] = [];

    switch (config.outputFormat) {
      case 'structured':
        expectations.push(
          'Provide a well-organized, structured response with clear sections and headings.'
        );
        break;
      case 'creative':
        expectations.push(
          'Deliver a creative, engaging response that captures attention and inspires action.'
        );
        break;
      default:
        expectations.push(
          'Provide a clear, comprehensive response that directly addresses the request.'
        );
    }

    if (config.level === 'expert') {
      expectations.push(
        'Include nuanced insights, consider multiple perspectives, and provide actionable recommendations.'
      );
    }

    if (config.creativity === 'maximum') {
      expectations.push(
        'Think outside the box and provide innovative, creative solutions.'
      );
    }

    return expectations.join(' ');
  }
}

/**
 * Output Formatting strategy implementation
 * Structures responses for optimal readability and impact
 */
export class OutputFormattingStrategy implements PromptStrategy {
  name = 'Output Formatting';
  description =
    'Structures responses for optimal readability and professional presentation';
  weight = 0.7;

  apply(request: PromptRequest, config: OptimizationConfig): string {
    const formattingInstructions = this.generateFormattingInstructions(
      request,
      config
    );

    return `${request.originalRequest}

${formattingInstructions}`;
  }

  private generateFormattingInstructions(
    request: PromptRequest,
    config: OptimizationConfig
  ): string {
    const instructions: string[] = [];

    switch (config.outputFormat) {
      case 'structured':
        instructions.push(...this.getStructuredFormatting(config));
        break;
      case 'creative':
        instructions.push(...this.getCreativeFormatting(config));
        break;
      default:
        instructions.push(...this.getConversationalFormatting());
    }

    return `**Formatting Guidelines:**
${instructions.map((instruction) => `• ${instruction}`).join('\n')}`;
  }

  private getStructuredFormatting(config: OptimizationConfig): string[] {
    const formatting = [
      'Use clear headings and subheadings to organize content',
      'Include bullet points or numbered lists for key information',
      'Provide a brief executive summary if the response is lengthy',
      'Use bold text for emphasis on important points'
    ];

    if (config.level === 'expert') {
      formatting.push(
        'Include a conclusion section with key takeaways',
        'Add relevant examples or case studies where appropriate',
        'Consider including visual elements descriptions (charts, diagrams) if helpful'
      );
    }

    return formatting;
  }

  private getCreativeFormatting(config: OptimizationConfig): string[] {
    const formatting = [
      'Use engaging, vivid language that captures attention',
      'Include storytelling elements or analogies where appropriate',
      'Vary sentence structure and length for dynamic flow',
      'Use emojis or special characters sparingly for visual appeal'
    ];

    if (config.creativity === 'maximum') {
      formatting.push(
        'Think metaphorically and use powerful imagery',
        'Include unexpected insights or unique perspectives',
        'Create memorable phrases or concepts that stick with the reader'
      );
    }

    return formatting;
  }

  private getConversationalFormatting(): string[] {
    return [
      'Write in a natural, conversational tone',
      'Use clear, concise language avoiding unnecessary jargon',
      'Break up long paragraphs for better readability',
      'Include smooth transitions between ideas',
      'End with a clear summary or call-to-action if appropriate'
    ];
  }
}

/**
 * Self-Consistency strategy implementation
 * Generates multiple reasoning paths for complex problems
 */
export class SelfConsistencyStrategy implements PromptStrategy {
  name = 'Self-Consistency';
  description =
    'Uses multiple reasoning paths to improve accuracy and confidence';
  weight = 0.8;

  apply(request: PromptRequest, config: OptimizationConfig): string {
    if (!config.enableSelfConsistency) return request.originalRequest;

    return `${request.originalRequest}

**Multi-Path Reasoning Instructions:**
Please approach this request using multiple reasoning strategies:

1. **Analytical Path**: Break down the problem systematically and use logical reasoning
2. **Creative Path**: Think outside the box and consider unconventional approaches
3. **Pragmatic Path**: Focus on practical, real-world applications and constraints

For each path:
- Work through the reasoning step-by-step
- Identify key insights and conclusions
- Note any assumptions or limitations

Finally, synthesize the insights from all paths to provide the most comprehensive and accurate response possible. If the different approaches lead to different conclusions, acknowledge this and explain why.`;
  }
}
