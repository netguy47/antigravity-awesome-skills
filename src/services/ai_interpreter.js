/**
 * HealthShield AI - AI Interpreter (Intelligence Upgrade)
 * 
 * Implements: 
 * 1. Multi-Signal Severity Escalation.
 * 2. Confidence Score transparency.
 * 3. 3-Day Perspective (Trajectory Projection).
 * 4. Legal + Trust Layer guardrails.
 */

class AIInterpreterService {
  constructor(apiKey, provider = 'openrouter') {
    this.apiKey = apiKey;
    this.provider = provider;
    this.modelMap = {
      'openrouter': 'anthropic/claude-3.5-sonnet',
      'zai': 'zai-heartguard-v1',
      'local': 'llama-3-8b-instruct'
    };
  }

  async generateHealthInsight(preProcessedData) {
    try {
      // 1. Check Data Completeness
      if (preProcessedData.confidenceScore < 0.3) {
        return { 
          success: false, 
          error: "Insufficient data for reliable analysis. Continue logging for 3 more days." 
        };
      }

      const prompt = this.getSystemPrompt();
      const userMessage = JSON.stringify(preProcessedData.aiInputJson);

      // Call AI Provider
      const aiResponse = await this._callAIProvider(prompt, userMessage);
      
      const parsedInsight = this.parseAIResponse(aiResponse);
      if (!parsedInsight.isValid) {
        return { success: false, error: "AI Parsing Error" };
      }

      // Add Metadata
      parsedInsight.data.confidence_score = preProcessedData.confidenceScore;
      parsedInsight.data.bp_projection_3day = preProcessedData.bpProjection;

      return { success: true, insight: parsedInsight.data };
    } catch (error) {
      console.error(`[AI_ERROR] ${error.message}`);
      return { success: false, error: "Internal AI Engine Error" };
    }
  }

  getSystemPrompt() {
    return `
You are a Senior Cardiovascular Health AI Assistant.
Your role: Analyze time-series pulse and BP trends using the provided JSON.

Rules:
1. NO MEDICAL DIAGNOSIS. Use "Insights/Observations/Trend Projection" only.
2. NO MEDICATION MODIFICATION advice.
3. EMERGENCY PROTOCOL: 
   - If "hypertensive_crisis" or "compound_cardiovascular_stress" is detected, lead with: "⚠️ EMERGENCY: SEEK IMMEDIATE MEDICAL ATTENTION."
   - Prioritize compound stress (e.g., resting hypertension + tachycardia) over individual thresholds.
4. PREDICTIVE EDGE: Use the "bp_3day_projection" to warn of upcoming metabolic shifts or stage 2 entry risks.
5. CONTEXT EXPANSION: Factor in context_tags like "post_caffeine", "resting", "after_exercise" to explain spikes vs pathological shifts.
6. MANDATORY LEGAL LAYER: 
   - "If symptoms (chest pain, shortness of breath) are present, seek immediate care."
   - "This system cannot confirm medical conditions."
   - "This is not medical advice."

Tasks:
- Detect Baseline Deviations (e.g., "This is unusual for your history").
- Estimate risk level (low/moderate/high).
- Project potential trajectory over the next 3 days.
- Provide 2–4 Actionable Recommendations (Level 1-3).

Output MUST be valid JSON:
{
  "summary": "1-2 sentence overview.",
  "risk_level": "low/moderate/high",
  "observations": ["bullet points"],
  "recommendations": [
    {"level": 1, "text": "..."},
    {"level": 2, "text": "..."}
  ],
  "disclaimer": "REQUIRED LEGAL TEXT"
}
    `.trim();
  }

  parseAIResponse(responseStr) {
    try {
      const jsonStr = responseStr.match(/\{[\s\S]*\}/)[0];
      const data = JSON.parse(jsonStr);
      
      const requiredFields = ['summary', 'risk_level', 'observations', 'recommendations', 'disclaimer'];
      const missingFields = requiredFields.filter(f => !data[f]);

      if (missingFields.length > 0) {
        return { isValid: false, message: `Missing fields: ${missingFields.join(', ')}` };
      }

      return { isValid: true, data };
    } catch (error) {
      return { isValid: false, message: "Invalid JSON format from AI" };
    }
  }

  async _callAIProvider(systemPrompt, userMessage) {
    // Simulated logic for OpenRouter or Local Models
    return `
    {
      "summary": "Observations suggest a compound cardiovascular stress pattern with a resting BP spike unusual for your baseline.",
      "risk_level": "high",
      "observations": [
        "Compound Stress: Resting BP (160/105) + Elevated Pulse (112) detected.",
        "Baseline Deviation: Systolic is 18.5% higher than your 7-day average.",
        "Trajectory: If current trend continues, BP is projected to reach 170/110 within 3 days."
      ],
      "recommendations": [
        {"level": 1, "text": "Cease all caffeine and physical exertion immediately."},
        {"level": 2, "text": "Log symptoms (headache, blurred vision) specifically in the tracker."},
        {"level": 3, "text": "SEEK IMMEDIATE CARE: This pattern indicates significant heart stress."}
      ],
      "disclaimer": "This is not medical advice. If symptoms like chest pain or shortness of breath are present, seek immediate care."
    }`;
  }
}

module.exports = AIInterpreterService;
鼓风机
