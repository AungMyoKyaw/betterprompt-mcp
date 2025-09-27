/**
 * Example usage and test cases for BetterPrompt MCP Server
 */

// Simple request optimization
const simpleExamples = [
  {
    name: 'Basic Question',
    request: 'What is machine learning?',
    expectedImprovement: 'Should add structure, examples, and expert context'
  },
  {
    name: 'Creative Request',
    request: 'Write a story about robots',
    expectedImprovement:
      'Should enhance creativity, add structure, and provide creative guidelines'
  },
  {
    name: 'Technical Explanation',
    request: 'Explain how APIs work',
    expectedImprovement:
      'Should add technical depth, examples, and step-by-step reasoning'
  }
];

// Complex request optimization
const complexExamples = [
  {
    name: 'Business Analysis',
    request:
      'Analyze the competitive landscape for electric vehicles and provide strategic recommendations for a new market entrant',
    config: {
      optimizationLevel: 'expert',
      domain: 'business',
      targetAudience: 'executives',
      desiredTone: 'professional',
      outputFormat: 'structured'
    },
    expectedFeatures: [
      'Executive role assignment',
      'Structured analysis framework',
      'Industry-specific examples',
      'Strategic reasoning steps'
    ]
  },
  {
    name: 'Scientific Research',
    request:
      'Design an experiment to test the effectiveness of a new drug treatment',
    config: {
      optimizationLevel: 'expert',
      domain: 'science',
      enableSelfConsistency: true,
      constraints: [
        'Must follow ethical guidelines',
        'Consider statistical significance'
      ]
    },
    expectedFeatures: [
      'Scientific methodology guidance',
      'Ethical considerations',
      'Statistical framework',
      'Multiple reasoning paths'
    ]
  },
  {
    name: 'Educational Content',
    request:
      'Create a lesson plan for teaching calculus to high school students',
    config: {
      optimizationLevel: 'advanced',
      domain: 'education',
      targetAudience: 'high school students',
      outputFormat: 'structured',
      creativity: 'high'
    },
    expectedFeatures: [
      'Educational expert persona',
      'Age-appropriate language',
      'Structured lesson format',
      'Creative teaching approaches'
    ]
  }
];

// Quick enhancement examples
const quickEnhanceExamples = [
  {
    name: 'Professional Email',
    request: 'Write an email to decline a meeting',
    tone: 'professional',
    expectedImprovement: 'Should add professional structure and polite language'
  },
  {
    name: 'Creative Writing',
    request: 'Describe a sunset',
    tone: 'creative',
    expectedImprovement: 'Should enhance descriptive language and imagery'
  }
];

// Test cases for different optimization levels
const optimizationLevelTests = [
  {
    level: 'basic',
    request: 'Explain photosynthesis',
    expectedStrategies: ['Context Enhancement', 'Output Formatting'],
    minQualityScore: 60
  },
  {
    level: 'advanced',
    request: 'Explain photosynthesis',
    expectedStrategies: [
      'Chain-of-Thought',
      'Few-Shot Learning',
      'Role-Based Prompting',
      'Context Enhancement'
    ],
    minQualityScore: 75
  },
  {
    level: 'expert',
    request: 'Explain photosynthesis',
    expectedStrategies: [
      'Chain-of-Thought',
      'Few-Shot Learning',
      'Role-Based Prompting',
      'Context Enhancement',
      'Self-Consistency'
    ],
    minQualityScore: 85,
    shouldHaveAlternatives: true
  }
];

export {
  simpleExamples,
  complexExamples,
  quickEnhanceExamples,
  optimizationLevelTests
};
