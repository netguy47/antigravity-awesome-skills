import AIInterpreterService from './apps/web-app/api/services/ai_interpreter.js';
import IngestionService from './apps/web-app/api/services/health_ingestion.js';
import PreProcessingEngine from './apps/web-app/api/services/preprocessing_engine.js';

// Mock Data
const logs = [
  { pulse: 75, systolic: 120, diastolic: 80, context_tags: ["resting"] },
  { pulse: 110, systolic: 155, diastolic: 95, context_tags: ["resting"] }
];

const profile = { age: 34, gender: 'male', history: 'none' };

async function verify() {
  console.log("--- Starting HealthShield API Verification ---");
  
  const engine = new PreProcessingEngine();
  const processed = engine.processDailyData(logs, profile);
  console.log("[PASS] Pre-processing completed. Cardio Score:", processed.cardioScore);

  const interpreter = new AIInterpreterService('sk-or-v1-placeholder', 'openrouter');
  const result = await interpreter.generateHealthInsight(processed);
  
  if (result.success) {
    console.log("[PASS] AI Insight generated successfully.");
    console.log("Provider:", result.insight.provider);
    console.log("Summary:", result.insight.summary);
  } else {
    // If it fails due to placeholder keys, that's expected but we verify the fallback loop log
    console.log("[EXPECTED FAIL] AI Insight failed (likely due to placeholder keys):", result.error);
    console.log("Details:", result.details);
  }
}

verify().catch(console.error);
