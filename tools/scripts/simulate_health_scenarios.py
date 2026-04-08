import random
import json
import os
from datetime import datetime, timedelta

"""
HealthShield AI - Health-Skill Simulator (HSS)
---------------------------------------------
Generates synthetic health logs for testing heuristic engines and AI interpreters.
Supports: Baseline drift, Hypertension spikes, and Compound stress scenarios.
"""

class HealthSimulator:
    def __init__(self, user_id):
        self.user_id = user_id
        
    def generate_baseline(self, days=7):
        logs = []
        start_date = datetime.now() - timedelta(days=days)
        
        for i in range(days * 3): # 3 logs per day
            timestamp = start_date + timedelta(hours=i*8)
            logs.append({
                "userId": self.user_id,
                "timestamp": timestamp.isoformat(),
                "pulse": random.randint(68, 75),
                "systolic": random.randint(118, 124),
                "diastolic": random.randint(78, 82),
                "steps": random.randint(2000, 4000),
                "context_tags": ["resting"],
                "source": "manual"
            })
        return logs

    def inject_crisis(self, logs):
        # Add a hypertensive crisis at the end
        timestamp = datetime.now()
        logs.append({
            "userId": self.user_id,
            "timestamp": timestamp.isoformat(),
            "pulse": 115,
            "systolic": 185,
            "diastolic": 122,
            "steps": 0,
            "context_tags": ["resting", "stressed"],
            "emergency_status": "hypertensive_crisis",
            "source": "manual"
        })
        return logs

    def save_logs(self, logs, filename="synthetic_health_logs.json"):
        with open(filename, 'w') as f:
            json.dump(logs, f, indent=4)
        print(f"Successfully generated {len(logs)} logs to {filename}")

if __name__ == "__main__":
    sim = HealthSimulator("test_user_001")
    logs = sim.generate_baseline(days=7)
    logs = sim.inject_crisis(logs)
    sim.save_logs(logs)
