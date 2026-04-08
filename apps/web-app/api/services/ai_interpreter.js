/**
 * HealthShield AI - AI Interpreter (Intelligence Upgrade)
 * 
 * Implements: 
 * 1. Multi-Signal Severity Escalation.
 * 2. Confidence Score transparency.
 * 3. 3-Day Perspective (Trajectory Projection).
 * 4. Legal + Trust Layer guardrails.
 */

import axios from 'axios';

class AIInterpreterService {
  constructor(apiKey, provider = 'openrouter') {
    this.apiKey = apiKey;
    this.provider = provider;
    this.modelMap = {
      'openrouter': 'anthropic/claude-3.5-sonnet',
      'zai': 'zai-heartguard-v1',
      'local': 'llama-3-8b-instruct'
    };
    this.endpoints = {
      'openrouter': 'https://openrouter.ai/api/v1/chat/completions',
      'zai': process.env.ZAI_API_URL || 'https://zai.api.health/v1/chat',
      'local': process.env.LOCAL_AI_URL || 'http://localhost:3001/api/v1/chat'
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

      // Call AI Providers with Fallback Topology
      const providers = ['openrouter', 'zai', 'local'];
      let lastError = null;
      let selectedProvider = this.provider;

      for (const p of providers) {
        try {
          console.log(`[AI_INTERPRETER] Attempting analysis with provider: ${p}`);
          const aiResponse = await this._callAIProvider(p, prompt, userMessage);
          
          const parsedInsight = this.parseAIResponse(aiResponse);
          if (parsedInsight.isValid) {
            // Success: Add Metadata
            parsedInsight.data.confidence_score = preProcessedData.confidenceScore;
            parsedInsight.data.bp_projection_3day = preProcessedData.bpProjection;
            parsedInsight.data.provider = p; // Track which provider actually fulfilled the request

            return { success: true, insight: parsedInsight.data };
          }
        } catch (error) {
          console.warn(`[AI_PROVIDER_FAILED] ${p} failed: ${error.message}`);
          lastError = error;
          if (error.response?.status === 429) {
            console.log(`[AI_FALLBACK] Rate limit hit for ${p}. Escalating to next provider.`);
          }
        }
      }
      
      // Fallback exhausted
      return { 
        success: false, 
        error: "All AI Providers exhausted or throttled. Fallback to Local Heuristics required.",
        details: lastError?.message 
      };

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

  async _callAIProvider(provider, systemPrompt, userMessage) {
    const endpoint = this.endpoints[provider];
    const model = this.modelMap[provider];
    const apiKey = provider === 'openrouter' ? this.apiKey : (process.env.ZAI_API_KEY || this.apiKey);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: 10000 // 10s cutoff for resilience
    };

    if (provider === 'openrouter') {
      config.headers['HTTP-Referer'] = 'https://healthshield.ai';
      config.headers['X-Title'] = 'HealthShield AI';
    }

    const payload = {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.1 // Low temperature for clinical-style precision
    };

    const response = await axios.post(endpoint, payload, config);
    
    // Check for standard chat completion response shape
    if (response.data.choices && response.data.choices[0]?.message?.content) {
      return response.data.choices[0].message.content;
    }
    
    // Fallback for custom provider shapes if necessary
    return response.data.content || JSON.stringify(response.data);
  }
}

export default AIInterpreterService;

