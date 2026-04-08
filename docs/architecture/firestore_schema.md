# Firestore Schema Definition: HealthShield AI

This document defines the production database structure for the HealthShield AI (Cardiovascular) project, optimizing for time-series health data and AI interpretation.

---

## 1. `users` Collection
**Purpose**: Stores the core physical profile required for BMI calculation and cardiovascular risk modeling.

| Field | Type | Description |
| :--- | :--- | :--- |
| `userId` | `string` | Unique identity from Firebase Auth. |
| `name` | `string` | Display name. |
| `age` | `number` | Required for risk scores (e.g., ADA, Framingham). |
| `gender` | `string` | `male` / `female`. |
| `height_cm` | `number` | |
| `weight_kg` | `number` | |
| `bmi` | `number` | Pre-calculated: `kg / (m^2)`. |
| `created_at` | `timestamp` | |

---

## 2. `health_logs` Collection
**Purpose**: The central "Raw Truth" layer for time-series cardiovascular metrics.

| Field | Type | Description |
| :--- | :--- | :--- |
| `logId` | `string` | Unique identifier. |
| `userId` | `reference` | Link to `users/userId`. |
| `timestamp` | `timestamp` | Exact time of reading. |
| `pulse` | `number` | Heart rate in BPM. |
| `systolic` | `number` | mmHg. |
| `diastolic` | `number` | mmHg. |
| `steps` | `number` | Aggregated since last log (or daily). |
| `context_tags` | `array<string>` | `["resting", "post_caffeine", "stressed"]`. |
| `emergency_status`| `string` | `none` / `hypertensive_crisis` / `tachycardia`. |
| `sleep_hours` | `number` | (Optional) |
| `stress_level` | `number` | (1-5 SCALE) |
| `source` | `string` | `manual` / `camera` / `device`. |

---

## 3. `daily_summary` Collection
**Purpose**: Pre-aggregated data for dashboard performance and history visualization.

| Field | Type | Description |
| :--- | :--- | :--- |
| `summaryId` | `string` | Format: `userId_YYYY-MM-DD`. |
| `userId` | `string` | |
| `date` | `string` | `YYYY-MM-DD`. |
| `avg_pulse` | `number` | |
| `avg_bp` | `string` | `systolic/diastolic`. |
| `total_steps` | `number` | |
| `cardio_score` | `number` | Result of the daily formula. |
| `recovery_score` | `number` | Result of the recovery formula (0-100). |
| `baseline_pulse` | `number` | User's rolling average pulse. |
| `baseline_systolic`| `number` | User's rolling average systolic. |
| `baseline_deviation_flag`| `boolean`| True if logs deviate >15% from baseline. |
| `anomalies_detected` | `boolean` | Flag for quick filtering. |
| `updated_at` | `timestamp` | |

---

## 4. `ai_insights` Collection
**Purpose**: Stores structured AI interpretations and weighted recommendations.

| Field | Type | Description |
| :--- | :--- | :--- |
| `insightId` | `string` | |
| `userId` | `string` | |
| `date` | `string` | |
| `summary` | `string` | 1-2 sentence AI overview. |
| `risk_level` | `string` | `low` / `moderate` / `high`. |
| `confidence_score`| `number` | 0.0 - 1.0 (Data completeness/consistency). |
| `bp_projection_3day`| `string` | Estimated BP trajectory (e.g., "145/92"). |
| `flags` | `array<string>` | `["bp_trending_up", "compound_stress", etc]`. |
| `recommendations` | `array<map>` | `[{level: 1, text: "..."}, {level: 2, text: "..."}]`. |
鼓风机

---

## 5. `reports` Collection (Premium)
**Purpose**: Large-form deep-dive reports generated periodically.

| Field | Type | Description |
| :--- | :--- | :--- |
| `reportId` | `string` | |
| `userId` | `string` | |
| `type` | `string` | `weekly` / `monthly`. |
| `generated_at` | `timestamp` | |
| `risk_scores` | `map` | `{"hypertension": 0.42, "cvd": 0.35}`. |
| `trends` | `map` | `{"bp": "increasing", "pulse": "stable"}`. |
| `content` | `string` | Full Markdown/HTML report body. |

---

## Document Examples (JSON)

### `ai_insights` Example
```json
{
  "insightId": "insight_99",
  "userId": "user_abc123",
  "date": "2026-04-01",
  "summary": "Pressure is slightly elevated after high sodium days. Exercise frequency is stable.",
  "risk_level": "moderate",
  "flags": ["high_bp_spike", "stable_pulse"],
  "recommendations": [
    { "level": 1, "text": "Increase daily walking to 6,000 steps." },
    { "level": 2, "text": "Reduce sodium and monitor caffeine intake." },
    { "level": 3, "text": "Consult a healthcare provider if trends persist." }
  ]
}
```
