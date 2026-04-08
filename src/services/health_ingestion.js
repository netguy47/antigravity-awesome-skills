/**
 * HealthShield AI - Data Ingestion Service (Step 2)
 * 
 * Handles incoming health logs from FlutterFlow/Mobile with strict validation.
 */

class HealthIngestionService {
  constructor(firestore) {
    this.db = firestore;
  }

  /**
   * logHealthData
   * @param {string} userId - Reference to the user.
   * @param {Object} data - { pulse, systolic, diastolic, steps, source }
   */
  async logHealthData(userId, data) {
    try {
      // 1. Validation
      const validatedData = this.validateInputs(data);
      if (!validatedData.isValid) {
        return { success: false, error: validatedData.message };
      }

      // 2. Metadata Enrichment
      const payload = {
        userId: userId,
        timestamp: new Date().toISOString(),
        pulse: validatedData.pulse,
        systolic: validatedData.systolic,
        diastolic: validatedData.diastolic,
        steps: validatedData.steps || 0,
        context_tags: data.context_tags || ["unknown"],
        emergency_status: validatedData.emergency_status || "none",
        source: data.source || 'manual',
        created_at: new Date()
      };

      // 3. Firestore Push (Pseudo-code for Firebase integration)
      console.log(`[INGESTION] Pushing data to health_logs for user: ${userId}`);
      // await this.db.collection('health_logs').add(payload);

      return { success: true, logId: 'log_' + Date.now(), data: payload };
    } catch (error) {
      console.error(`[INGESTION_ERROR] ${error.message}`);
      return { success: false, error: "Internal Ingestion Error" };
    }
  }

  /**
   * validateInputs
   * Ensures cardiovascular metrics are within biologically plausible ranges.
   */
  validateInputs(data) {
    const { pulse, systolic, diastolic } = data;
    let emergency_status = "none";

    // 1. Emergency Crisis Detection (Clinical Thresholds)
    if (systolic >= 180 || diastolic >= 120) {
      emergency_status = "hypertensive_crisis";
    } else if (pulse >= 160) {
      emergency_status = "severe_tachycardia";
    }

    // 2. Biological Plausibility
    if (!pulse || pulse < 30 || pulse > 220) {
      return { isValid: false, message: "Invalid Heart Rate (30-220 BPM required)" };
    }

    // 3. Blood Pressure (mmHg)
    if (!systolic || systolic < 70 || systolic > 250) {
      return { isValid: false, message: "Invalid Systolic Pressure (70-250 mmHg required)" };
    }
    if (!diastolic || diastolic < 40 || diastolic > 150) {
      return { isValid: false, message: "Invalid Diastolic Pressure (40-150 mmHg required)" };
    }

    return { 
      isValid: true, 
      pulse: Number(pulse), 
      systolic: Number(systolic), 
      diastolic: Number(diastolic),
      steps: Number(data.steps || 0),
      emergency_status
    };
  }
}

module.exports = HealthIngestionService;
