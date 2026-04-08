/**
 * Vercel Serverless Function: analyze.js
 * 
 * Orchestrates HealthShield AI Intelligence (ESM Version)
 */

import IngestionService from './services/health_ingestion.js';
import PreProcessingEngine from './services/preprocessing_engine.js';
import AIInterpreter from './services/ai_interpreter.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, logs, profile } = req.body;

  try {
    // 1. Data Validation
    const ingestion = new IngestionService();
    const latestLogResponse = await ingestion.logHealthData(userId, logs[logs.length-1]);
    
    if (!latestLogResponse.success) {
      return res.status(400).json({ error: latestLogResponse.error });
    }

    // 2. Pre-processing
    const engine = new PreProcessingEngine();
    const processed = engine.processDailyData(logs, profile);

    // 3. AI Interpretation
    const apiKey = process.env.OPENROUTER_API_KEY || 'sk-or-v1-dummy';
    const interpreter = new AIInterpreter(apiKey, 'openrouter');
    const result = await interpreter.generateHealthInsight(processed);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    // 4. Tier & Usage Management (Sovereign Monetization)
    const userTier = req.headers['x-user-tier'] || 'free'; 
    const usageRemaining = userTier === 'free' ? 4 : 999; // Mock usage logic for demo
    
    // Mask premium features for free users
    const finalProjection = userTier === 'free' 
      ? "🔒 Upgrade to Pro to unlock 3-day cardiac trajectory projections." 
      : processed.bpProjection;

    // 5. Final Analytics Metadata Payload
    res.status(200).json({
      cardio_score: processed.cardioScore,
      recovery_score: processed.recoveryScore,
      confidence: processed.confidenceScore,
      projection: finalProjection,
      tier: userTier,
      usage_remaining: usageRemaining,
      insight: result.insight
    });

  } catch (error) {
    console.error(`[VERCEL_API_ERROR] ${error.message}`);
    res.status(500).json({ error: 'Internal Analysis Engine Failure' });
  }
}
