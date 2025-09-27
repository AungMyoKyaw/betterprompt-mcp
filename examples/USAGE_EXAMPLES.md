# BetterPrompt MCP Server - Usage Examples

This document provides comprehensive examples of how to use the BetterPrompt MCP Server.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Advanced Configuration](#advanced-configuration)
3. [Domain-Specific Optimization](#domain-specific-optimization)
4. [Output Format Examples](#output-format-examples)
5. [Complex Business Scenarios](#complex-business-scenarios)
6. [Educational Content](#educational-content)
7. [Technical Documentation](#technical-documentation)

## Basic Usage

### Simple Question Enhancement

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "What is machine learning?"
  }
}
```

**Result:** Transforms a basic question into a structured prompt with expert context, step-by-step reasoning, and clear formatting guidelines.

### Creative Writing Request

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Write a short story about time travel",
    "outputFormat": "creative",
    "creativity": "maximum"
  }
}
```

**Result:** Enhances creative requests with storytelling frameworks, creative constraints, and imaginative guidance.

## Advanced Configuration

### Expert-Level Business Analysis

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Analyze our competitive position in the SaaS market",
    "optimizationLevel": "expert",
    "domain": "business",
    "targetAudience": "C-suite executives",
    "desiredTone": "professional",
    "outputFormat": "structured",
    "enableSelfConsistency": true,
    "context": "B2B project management software company with 200 employees",
    "constraints": [
      "Focus on enterprise segment",
      "Consider 12-month timeline",
      "Budget constraints under $2M"
    ]
  }
}
```

**Features:**

- Expert business strategist persona
- Multiple reasoning approaches (self-consistency)
- Structured output with executive summary
- Industry-specific examples and frameworks
- Constraint-aware recommendations

### Scientific Research Optimization

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Design an experiment to test a new drug's effectiveness",
    "optimizationLevel": "expert",
    "domain": "science",
    "targetAudience": "research scientists",
    "desiredTone": "academic",
    "enableChainOfThought": true,
    "enableSelfConsistency": true,
    "constraints": [
      "Must follow ethical guidelines",
      "Consider statistical significance",
      "Budget limitations"
    ]
  }
}
```

**Features:**

- Scientific research expert persona
- Rigorous methodology guidance
- Ethical considerations framework
- Statistical analysis requirements
- Multiple validation approaches

## Domain-Specific Optimization

### Technology Domain

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Design a scalable microservices architecture",
    "domain": "technology",
    "targetAudience": "software architects",
    "desiredTone": "technical"
  }
}
```

**Enhanced Features:**

- Senior Technology Architect persona
- Technical best practices
- Architecture patterns and examples
- Scalability considerations
- Implementation guidance

### Healthcare Domain

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Develop a patient care protocol for diabetes management",
    "domain": "healthcare",
    "targetAudience": "healthcare professionals",
    "desiredTone": "professional",
    "constraints": [
      "Follow clinical guidelines",
      "Consider patient safety",
      "Evidence-based approach"
    ]
  }
}
```

**Enhanced Features:**

- Medical Expert persona
- Clinical best practices
- Evidence-based protocols
- Patient safety considerations
- Regulatory compliance

## Output Format Examples

### Conversational Format

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Explain blockchain technology",
    "outputFormat": "conversational"
  }
}
```

**Result:** Natural, flowing explanation style perfect for educational content and general audiences.

### Structured Format

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Compare different programming languages",
    "outputFormat": "structured"
  }
}
```

**Result:** Organized with clear headings, bullet points, comparison tables, and executive summary.

### Creative Format

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Describe the future of artificial intelligence",
    "outputFormat": "creative",
    "creativity": "maximum"
  }
}
```

**Result:** Engaging storytelling approach with vivid imagery, analogies, and memorable concepts.

## Complex Business Scenarios

### Market Entry Strategy

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Develop a go-to-market strategy for our AI-powered analytics platform",
    "optimizationLevel": "expert",
    "domain": "business",
    "targetAudience": "investors and board members",
    "outputFormat": "structured",
    "context": "Series B startup with $10M funding, targeting Fortune 500 companies",
    "constraints": [
      "18-month runway",
      "Competing against established players",
      "Need 100% revenue growth"
    ]
  }
}
```

### Digital Transformation Consulting

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Create a digital transformation roadmap for a traditional manufacturing company",
    "optimizationLevel": "expert",
    "domain": "business",
    "targetAudience": "senior executives",
    "desiredTone": "professional",
    "context": "200-year-old family business, $500M revenue, manufacturing automotive parts",
    "constraints": [
      "Risk-averse culture",
      "Legacy systems integration",
      "Union workforce considerations"
    ]
  }
}
```

## Educational Content

### Curriculum Development

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Design a comprehensive data science curriculum for university students",
    "domain": "education",
    "targetAudience": "undergraduate students",
    "outputFormat": "structured",
    "context": "16-week semester, prerequisite: basic statistics and programming",
    "constraints": [
      "Hands-on projects required",
      "Industry relevance",
      "Assessment criteria"
    ]
  }
}
```

### Training Program Design

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Create a leadership development program for mid-level managers",
    "domain": "education",
    "targetAudience": "corporate managers",
    "desiredTone": "professional",
    "context": "Technology company with remote workforce",
    "creativity": "high"
  }
}
```

## Technical Documentation

### API Documentation

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Write comprehensive API documentation for our REST endpoints",
    "domain": "technology",
    "targetAudience": "developers",
    "outputFormat": "structured",
    "desiredTone": "technical",
    "constraints": [
      "Include code examples",
      "Cover error handling",
      "Authentication requirements"
    ]
  }
}
```

### System Architecture Documentation

**Input:**

```json
{
  "name": "betterprompt",
  "arguments": {
    "request": "Document our microservices architecture for new team members",
    "domain": "technology",
    "targetAudience": "software engineers",
    "outputFormat": "structured",
    "context": "Kubernetes-based deployment with 15 services",
    "includeExamples": true
  }
}
```

## Quick Enhancement Examples

### Professional Email

**Input:**

```json
{
  "name": "quick-enhance",
  "arguments": {
    "request": "Write an email declining a meeting invitation",
    "tone": "professional"
  }
}
```

### Academic Writing

**Input:**

```json
{
  "name": "quick-enhance",
  "arguments": {
    "request": "Summarize the key findings of a research paper",
    "tone": "academic"
  }
}
```

## Request Analysis Examples

### Complex Request Analysis

**Input:**

```json
{
  "name": "analyze-request",
  "arguments": {
    "request": "Develop a comprehensive sustainability strategy that balances environmental impact, cost efficiency, and stakeholder expectations while complying with emerging regulatory frameworks and maintaining competitive advantage in the global market",
    "domain": "business"
  }
}
```

**Analysis Result:**

- **Complexity Level:** Expert
- **Detected Intents:** Planning, Analysis, Strategy
- **Recommended Strategies:** All advanced techniques
- **Estimated Quality Improvement:** 85-95%

### Simple Request Analysis

**Input:**

```json
{
  "name": "analyze-request",
  "arguments": {
    "request": "What is Python?"
  }
}
```

**Analysis Result:**

- **Complexity Level:** Simple
- **Detected Intents:** Explanation
- **Recommended Strategies:** Basic enhancement with examples
- **Estimated Quality Improvement:** 60-70%

## Best Practices

### 1. Choose the Right Optimization Level

- **Basic:** Quick improvements for simple requests
- **Advanced:** Comprehensive enhancement for most use cases
- **Expert:** Maximum optimization for critical or complex tasks

### 2. Specify Domain When Known

Domain specification enables specialized optimization:

- Technology, Business, Science, Education, Healthcare, Legal, etc.

### 3. Define Target Audience

Helps tailor language and complexity:

- Executives, Technical teams, Students, General public, etc.

### 4. Use Constraints Effectively

Provide specific requirements:

- Budget limitations, Time constraints, Regulatory requirements, etc.

### 5. Select Appropriate Output Format

- **Conversational:** Explanations and discussions
- **Structured:** Reports and formal documents
- **Creative:** Marketing content and storytelling

### 6. Enable Self-Consistency for Critical Decisions

Use multiple reasoning paths for:

- Strategic business decisions
- Complex technical problems
- Research methodology design

## Integration Tips

1. **Claude Desktop:** Use the tools directly in conversations
2. **VS Code with Cline:** Integrate into development workflows
3. **Cursor:** Enhance code documentation and technical writing
4. **Custom Applications:** Build prompts programmatically

## Performance Optimization

- Use `quick-enhance` for fast iterations
- Enable `includeExamples` for better guidance
- Set `creativity` to `maximum` for innovative solutions
- Use `analyze-request` to understand optimization opportunities

---

_These examples demonstrate the full capabilities of BetterPrompt MCP Server. Experiment with different configurations to find what works best for your specific use cases._
