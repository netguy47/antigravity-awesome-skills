/**
 * HealthShield AI - Storage & Aggregator (Step 5)
 * 
 * Handles the persistence of AI insights and the daily aggregation of health metrics.
 */

class StorageAggregatorService {
  constructor(firestore) {
    this.db = firestore;
  }

  /**
   * storeAIInsight
   * @param {string} userId - User reference.
   * @param {Object} insight - Parsed AI insight JSON.
   * @param {string} date - Local date string YYYY-MM-DD.
   */
  async storeAIInsight(userId, insight, date) {
    try {
      const insightId = `insight_${userId}_${Date.now()}`;
      const payload = {
        insightId,
        userId,
        date,
        ...insight,
        created_at: new Date()
      };

      // Firestore Write (Pseudo-code)
      console.log(`[STORAGE] Storing AI insight: ${insightId} for user: ${userId}`);
      // await this.db.collection('ai_insights').doc(insightId).set(payload);

      return { success: true, insightId, data: payload };
    } catch (error) {
      console.error(`[STORAGE_ERROR] ${error.message}`);
      return { success: false, error: "Internal Storage Error" };
    }
  }

  /**
   * aggregateDailySummary
   * @param {string} userId - User reference.
   * @param {string} date - Local date string YYYY-MM-DD.
   * @param {Array} logs - Raw daily health logs.
   * @param {number} cardioScore - Computed by PreProcessingEngine.
   */
  async aggregateDailySummary(userId, date, logs, cardioScore) {
    try {
      if (!logs || logs.length === 0) return null;

      const summaryId = `${userId}_${date}`;
      const avgPulse = Math.round(logs.reduce((a, b) => a + b.pulse, 0) / logs.length);
      const avgSystolic = Math.round(logs.reduce((a, b) => a + b.systolic, 0) / logs.length);
      const avgDiastolic = Math.round(logs.reduce((a, b) => a + b.diastolic, 0) / logs.length);
      const totalSteps = logs.reduce((a, b) => a + (b.steps || 0), 0);

      const payload = {
        summaryId,
        userId,
        date,
        avg_pulse: avgPulse,
        avg_bp: `${avgSystolic}/${avgDiastolic}`,
        total_steps: totalSteps,
        cardio_score: cardioScore,
        anomalies_detected: logs.some(l => l.pulse > 100 || l.systolic >= 140),
        updated_at: new Date()
      };

      // Firestore Write (Pseudo-code)
      console.log(`[AGGREGATOR] Generating summary: ${summaryId} with Score: ${cardioScore}`);
      // await this.db.collection('daily_summary').doc(summaryId).set(payload);

      return { success: true, summaryId, data: payload };
    } catch (error) {
      console.error(`[AGGREGATOR_ERROR] ${error.message}`);
      return { success: false, error: "Internal Aggregator Error" };
    }
  }
}

module.exports = StorageAggregatorService;
