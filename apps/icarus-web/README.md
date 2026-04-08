# Project Icarus: Health Sentinel (The AI Tricorder)

Project Icarus is a next-generation, Vercel-native multi-agent dashboard. The **Health Sentinel** is its flagship agent—a clinical-grade "AI Tricorder" designed to transform raw biometrics into actionable health intelligence.

---

## 🧬 The Vision: "Stark Tech" Health Intelligence
We are building a high-fidelity, data-dense HUD that treats your health data as a mission-critical system. No more "chat-only" interfaces; we provide real-time telemetry and predictive risk awareness.

---

## 🚀 Core Features (Phase 1)
*   **Cardiovascular Mission Control**: Track Blood Pressure (manual) and Pulse (camera-based) with millisecond precision.
*   **The Cardio Score**: A proprietary formula that benchmarks your heart health based on BP, Pulse, and Movement.
*   **AI Health Analyzer**: A specialized "Brain" that uses **Framingham**, **ADA**, and **ASCVD** risk models to detect anomalies and trends.
*   **Star Trek HUD**: A premium, glassmorphic UI built with Next.js 14, Tailwind CSS, and Framer Motion.

---

## 🏗️ Database Architecture (Firebase)

| Collection | Role |
| :--- | :--- |
| `users` | Core profile (Age, BMI, Medical Context). |
| `health_logs` | The "Raw Truth" layer (Time-series BP, Pulse, Steps). |
| `daily_summary` | Precomputed performance stats & anomalies. |
| `ai_insights` | The "Intelligence" layer (Flags, Risk Levels, Recommendations). |
| `reports` | Professional-grade generated HTML health summaries. |

---

## 🧠 The AI Heart: `ai-analyzer`
The System utilizes a multi-step intelligence pipeline:
1.  **Pre-Processing**: Logic-based threshold detection (e.g., Identifying Stage 2 BP).
2.  **Cardio Scoring**: Algorithmic health benchmarking.
3.  **LLM Interpretation**: Claude 3.5 Sonnet (via OpenRouter/Z.AI) provides the "Why" behind the data.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Lucide Icons
- **Motion**: Framer Motion
- **Database/Auth**: Firebase (Firestore)
- **AI Gateway**: Vercel AI SDK + OpenRouter (Claude 3.5 Sonnet)

---

## 🚦 Getting Started
1.  **Configure Environment**: Set up `OPENROUTER_API_KEY` and Firebase credentials in `.env.local`.
2.  **Install**: `npm install`
3.  **Run**: `npm run dev`

---

> [!IMPORTANT]
> **Medical Disclaimer**: Project Icarus provides health insights and trend analysis only. It is not a medical diagnostic tool and does not provide medication instructions. Always consult a healthcare professional.
