/**
 * HealthShield AI - Analyzer Engine (Prototype)
 * 
 * This engine handles the "Heuristic Layer" before passing data to the LLM.
 * Implements the logic provided by the user for BP, Pulse, and Cardio Score.
 */

class HealthShieldEngine {
  constructor() {
    this.PENALTY_BP_HIGH = 20;
    this.PENALTY_PULSE_HIGH = 10;
    this.BONUS_STEPS = 5;
  }

  /**
   * analyzeLogs
   * @param {Array} logs - Array of health log objects { pulse, systolic, diastolic, steps }
   * @param {Object} profile - User profile { age, gender, bmi }
   */
  calculateHealthMetrics(logs, profile) {
    if (!logs || logs.length === 0) return null;

    const latest = logs[logs.length - 1];
    let flags = [];
    let trends = { bp_trend: "stable", pulse_trend: "stable" };
    let cardioScore = 100;

    // 1. Pre-Processing Heuristics
    if (latest.pulse > 100) {
      flags.push("high_pulse");
      cardioScore -= this.PENALTY_PULSE_HIGH;
    }

    if (latest.systolic >= 140 || latest.diastolic >= 90) {
      flags.push("stage_2_bp");
      cardioScore -= this.PENALTY_BP_HIGH;
    } else if (latest.systolic >= 130 || latest.diastolic >= 80) {
      flags.push("stage_1_bp");
      cardioScore -= 10; // Partial penalty
    }

    if (latest.steps >= 10000) {
      flags.push("high_activity");
      cardioScore += this.BONUS_STEPS;
    }

    // 2. Trend Analysis (Simple comparison of last 3 logs)
    if (logs.length >= 3) {
      const s1 = logs[logs.length - 1].systolic;
      const s2 = logs[logs.length - 2].systolic;
      const s3 = logs[logs.length - 3].systolic;

      if (s1 > s2 && s2 > s3) {
        trends.bp_trend = "increasing";
        flags.push("bp_trending_up");
      }
    }

    // 3. Clamping Cardio Score
    cardioScore = Math.min(100, Math.max(0, cardioScore));

    return {
      userId: latest.userId,
      cardioScore,
      latestMetrics: latest,
      flags,
      trends,
      ai_input: {
        user_profile: profile,
        recent_logs: logs.slice(-3).map(l => ({ pulse: l.pulse, bp: `${l.systolic}/${l.diastolic}` })),
        trends
      }
    };
  }

  /**
   * getSystemPrompt
   * Returns the system prompt for the AI Interpreter layer.
   */
  getSystemPrompt() {
    return `
You are an AI health analysis system.
Your role is to analyze cardiovascular-related data including pulse and blood pressure.

Rules:
1. Do NOT diagnose diseases
2. Do NOT provide medication instructions
3. Provide insights, trends, and risk awareness only
4. Use clear, simple language

Tasks:
- Identify trends (increasing, decreasing, stable)
- Detect anomalies (sudden spikes or unusual values)
- Estimate risk level (low, moderate, high)
- Provide 2–4 actionable recommendations

Output format:
Summary: (1–2 sentences)
Risk Level: (low/moderate/high)
Key Observations: (bullet points)
Recommendations: (Level 1–3)

Always include:
"This is not medical advice."
    `.trim();
  }
}

module.exports = HealthShieldEngine;
