# 🛡️ HealthShield AI: Autonomous Health Sentinel

HealthShield AI is a next-generation health tracking and analysis platform built on top of the **Antigravity Awesome Skills** repository. It transforms raw time-series data into actionable cardiovascular insights using a hybrid engine of heuristic pre-processing and advanced AI.

## 🚀 Vision
To empower individuals with a professional-grade, privacy-first diagnostic awareness tool that bridges the gap between consumer wearables and clinical data.

---

## 🧠 Core Architecture: "The Brain"

HealthShield AI doesn't just pass data to an LLM; it utilizes a multi-layered analysis pipeline.

### 1. Heuristic Pre-processing (The Rules Engine)
Before any AI engagement, the system runs local heuristics:
- **Trend Detection**: Analyzing the last 72 hours for upward/downward shifts in BP and Pulse.
- **Anomaly Detection**: Triggering flags for spikes (e.g., Systolic >= 140 or Pulse > 100).
- **Metric Scaling**: Normalizing data across different source types (Manual, Camera-Oximetry, Wearables).

### 2. AI Interpretation (The Insight Engine)
Using the highly-tuned `ai-analyzer` skill, the system processes structured JSON fragments to generate contextual reports.
- **System Role**: Professional Health Analyst.
- **Outputs**: Weighted Recommendations (Level 1-3), Risk Assessment (Low/Moderate/High), and Trend Summaries.

### 3. The Cardio Score™ Formula
A baseline metric for heart health:
`Score = 100 - (BP Penalty) - (Pulse Penalty) + (Steps Bonus)`
*Example: Stage 1 Hypertension (-20), Resting Pulse 105 (-10), 10k Steps (+5) = Cardio Score 75.*

---

## 🗄️ Database Schema (Firebase)

Designed for speed, scalability, and HIPAA-compliant data segregation.

| Collection | Purpose | Key Fields |
| :--- | :--- | :--- |
| **`users`** | Identity & Physical Profile | `userId`, `age`, `gender`, `bmi` |
| **`health_logs`** | The "Raw Truth" Layer | `pulse`, `systolic`, `diastolic`, `source` |
| **`daily_summary`** | Precomputed Performance Stats | `avg_pulse`, `total_steps`, `cardio_score` |
| **`ai_insights`** | Intelligent Trend Logging | `risk_level`, `flags`, `weighted_recommendations` |
| **`reports`** | Premium Deep-Dive Exports | `trends`, `deep_report_text`, `risk_scores` |

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite (Premium Dashboard UI).
- **Backend/Database**: Firebase (Authentication + Firestore).
- **AI Intelligence**: Antigravity `ai-analyzer` (Powered by Claude Code).
- **Algorithms**: CUSUM (Anomaly detection) & Framingham Risk Score Integration.

---

## 🚦 Safety & Compliance
- **Rule 1**: No Medical Diagnosis.
- **Rule 2**: No Medication Modification.
- **Disclaimer**: *"This application is for informational purposes only. Always consult a healthcare professional for clinical decisions."*

---

## 📦 Installation (Part of Awesome Skills)
To run the analyzer locally:
```bash
npx antigravity-awesome-skills --path .agent/skills
/ai analyze
```

---
*Built with ❤️ using the Antigravity Awesome Skills Repository.*
