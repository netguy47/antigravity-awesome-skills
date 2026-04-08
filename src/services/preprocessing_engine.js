/**
 * HealthShield AI - Preprocessing Engine (Intelligence Upgrade)
 * 
 * Implements: 
 * 1. Baseline Deviation Engine
 * 2. Multi-Signal Emergency Escalation (Compound Stress)
 * 3. Recovery Score formula
 * 4. Short-Term Prediction Layer (3-7 Days)
 * 5. Confidence Score logic
 */

class PreProcessingEngine {
  constructor() {
    this.PENALTY_BP_STAGE_2 = 20;
    this.PENALTY_BP_STAGE_1 = 10;
    this.PENALTY_PULSE_HIGH = 10;
    this.BONUS_STEPS = 5;
    
    // Recovery Weights
    this.WEIGHT_RESTING_PULSE = 20;
    this.WEIGHT_BP_ELEVATED = 25;
    this.WEIGHT_STEPS_6K = 10;
    this.WEIGHT_SLEEP_7H = 15;
  }

  processDailyData(logs, profile, userBaselines = null) {
    if (!logs || logs.length === 0) return null;

    const latest = logs[logs.length - 1];
    let flags = [];
    let trends = { bp: "stable", pulse: "stable" };
    let cardioScore = 100;
    let recoveryScore = 100;

    // 1. Baseline Deviation Engine
    const deviationReport = this.calculateBaselineDeviation(latest, userBaselines);
    if (deviationReport && deviationReport.flag) {
      flags.push("baseline_deviation_detected");
    }

    // 2. Multi-Signal Emergency Escalation (Compound Stress)
    if (
      latest.systolic >= 160 &&
      latest.pulse >= 110 &&
      (latest.context_tags && latest.context_tags.includes("resting"))
    ) {
      flags.push("compound_cardiovascular_stress");
      cardioScore = 40; // Severe penalty for compound stress
    }

    // 3. Emergency Status Check (Individual thresholds)
    if (latest.emergency_status && latest.emergency_status !== "none") {
      flags.push(`EMERGENCY_${latest.emergency_status.toUpperCase()}`);
      cardioScore = Math.min(cardioScore, 30);
    }

    // 4. Context-Aware Cardio Score
    const isResting = latest.context_tags && latest.context_tags.includes("resting");
    const isPostCaffeine = latest.context_tags && latest.context_tags.includes("post_caffeine");
    
    let bpWeight = 1.0;
    if (isPostCaffeine) bpWeight = 0.9; // Lower penalty significance post-caffeine
    if (isResting) bpWeight = 1.5;      // Higher penalty significance while resting

    if (latest.systolic >= 140 || latest.diastolic >= 90) {
      cardioScore -= (this.PENALTY_BP_STAGE_2 * bpWeight);
    } else if (latest.systolic >= 130 || latest.diastolic >= 80) {
      cardioScore -= (this.PENALTY_BP_STAGE_1 * bpWeight);
    }

    // 5. Recovery Score Logic
    if (latest.pulse > 85) recoveryScore -= this.WEIGHT_RESTING_PULSE;
    if (latest.systolic >= 135) recoveryScore -= this.WEIGHT_BP_ELEVATED;
    if (latest.steps >= 6000) recoveryScore += this.WEIGHT_STEPS_6K;
    if (latest.sleep_hours >= 7) recoveryScore += this.WEIGHT_SLEEP_7H;
    recoveryScore = Math.min(100, Math.max(0, recoveryScore));

    // 6. Short-Term Prediction (3-Day Projection)
    const bpProjection = this.projectTrend(logs.map(l => l.systolic), logs.map(l => l.diastolic));

    // 7. Confidence Score
    const confidenceScore = this.calculateConfidence(logs);

    return {
      cardioScore: Math.round(Math.min(100, Math.max(0, cardioScore))),
      recoveryScore: Math.round(recoveryScore),
      confidenceScore,
      flags: [...new Set(flags)],
      bpProjection,
      deviationReport,
      aiInputJson: {
        user_profile: profile,
        recent_metrics: logs.slice(-5).map(l => ({ 
          pulse: l.pulse, 
          bp: `${l.systolic}/${l.diastolic}`, 
          context: l.context_tags 
        })),
        trends: {
          bp_3day_projection: bpProjection,
          baseline_deviation: deviationReport
        },
        metadata: {
          confidence: confidenceScore,
          recovery: recoveryScore
        }
      }
    };
  }

  calculateBaselineDeviation(latest, baseline) {
    if (!baseline || !baseline.systolic || !baseline.pulse) return { flag: false };

    const sysDev = (latest.systolic - baseline.systolic) / baseline.systolic;
    const pulseDev = (latest.pulse - baseline.pulse) / baseline.pulse;

    const significant = Math.abs(sysDev) > 0.15 || Math.abs(pulseDev) > 0.15;

    return {
      flag: significant,
      systolic_deviation_percent: (sysDev * 100).toFixed(1),
      pulse_deviation_percent: (pulseDev * 100).toFixed(1)
    };
  }

  projectTrend(systolics, diastolics) {
    if (systolics.length < 3) return "Insufficient data";
    
    const calculateSlope = (values) => (values[values.length - 1] - values[0]) / values.length;
    const sysSlope = calculateSlope(systolics);
    const diaSlope = calculateSlope(diastolics);

    const projectedSys = Math.round(systolics[systolics.length - 1] + sysSlope * 3);
    const projectedDia = Math.round(diastolics[diastolics.length - 1] + diaSlope * 3);

    return `${projectedSys}/${projectedDia}`;
  }

  calculateConfidence(logs) {
    const dataCompleteness = Math.min(logs.length / 7, 1.0); // Full confidence at 7 days
    
    // Measure consistency (variance in logs)
    const systolics = logs.map(l => l.systolic);
    const mean = systolics.reduce((a, b) => a + b, 0) / systolics.length;
    const variance = systolics.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / systolics.length;
    const consistencyScore = variance < 100 ? 1.0 : (variance < 400 ? 0.7 : 0.4);

    return Number((dataCompleteness * 0.5 + consistencyScore * 0.5).toFixed(2));
  }
}

module.exports = PreProcessingEngine;
