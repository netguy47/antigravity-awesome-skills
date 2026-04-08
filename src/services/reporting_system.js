/**
 * HealthShield AI - Reporting System (Step 6)
 * 
 * Generates comprehensive deep-dive reports for users and healthcare providers.
 * Includes trend analysis, risk scoring, and clinical compliance.
 */

class ReportingSystemService {
  constructor(firestore) {
    this.db = firestore;
  }

  /**
   * generateDeepReport
   * @param {string} userId - User reference.
   * @param {Array} history - Array of daily summaries for the past 7-30 days.
   * @param {Object} latestInsight - Current instance from ai_insights.
   */
  async generateDeepReport(userId, history, latestInsight) {
    try {
      if (!history || history.length === 0) return null;

      const reportId = `report_${userId}_${Date.now()}`;
      const pulseTrend = this.calculateTrends(history, 'avg_pulse');
      const bpTrend = this.calculateTrends(history, 'avg_bp');

      const reportContent = `
# 🔬 HealthShield AI: Deep-Dive Cardiovascular Report

## 📅 Analysis Period: Last ${history.length} Days
Generated At: ${new Date().toLocaleString()}

---

## 🛑 Executive Summary
${latestInsight.summary}
**Current Risk Level: ${latestInsight.risk_level.toUpperCase()}**

---

## 📈 Historical Trends
- **Blood Pressure**: ${bpTrend.direction} (${bpTrend.change}% Change)
- **Pulse Stability**: ${pulseTrend.direction} (Avg: ${pulseTrend.avg} BPM)
- **Activity Correlation**: ${latestInsight.flags.includes('high_activity') ? 'Positive (High steps detected)' : 'Stagnant (Needs improvement)'}

---

## 🧠 AI Observations
${latestInsight.observations.map(obs => `- ${obs}`).join('\n')}

---

## 🎯 Targeted Recommendations
${latestInsight.recommendations.map(rec => `### Level ${rec.level}\n${rec.text}`).join('\n\n')}

---

## 🛡️ Medical Disclaimer
${latestInsight.disclaimer}
      `.trim();

      const payload = {
        reportId,
        userId,
        type: history.length > 7 ? 'monthly' : 'weekly',
        generated_at: new Date(),
        risk_scores: {
          hypertension_index: latestInsight.risk_level === 'high' ? 0.75 : 0.40,
          cvd_index: history.length > 14 ? 0.35 : 0.20 // Dummy scoring logic
        },
        trends: {
          bp: bpTrend.direction,
          pulse: pulseTrend.direction
        },
        content: reportContent
      };

      // Firestore Write (Pseudo-code)
      console.log(`[REPORTER] Generating deep-dive report: ${reportId} for user: ${userId}`);
      // await this.db.collection('reports').doc(reportId).set(payload);

      return { success: true, reportId, data: payload };
    } catch (error) {
      console.error(`[REPORTER_ERROR] ${error.message}`);
      return { success: false, error: "Internal Reporting Error" };
    }
  }

  /**
   * calculateTrends
   * Simple logic to determine if a metric is increasing, decreasing, or stable.
   */
  calculateTrends(history, field) {
    const values = history.map(h => {
      if (typeof h[field] === 'string') return parseInt(h[field].split('/')[0]); // Use Systolic for BP trends
      return h[field];
    });

    const first = values[0];
    const last = values[values.length - 1];
    const change = ((last - first) / first) * 100;

    let direction = "stable";
    if (change > 5) direction = "increasing";
    if (change < -5) direction = "decreasing";

    return { 
      direction, 
      change: change.toFixed(1),
      avg: Math.round(values.reduce((a, b) => a + b, 0) / values.length)
    };
  }
}

module.exports = ReportingSystemService;
