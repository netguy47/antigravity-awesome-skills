import os
import json
from datetime import datetime

base_path = 'd:\\antigravity-awesome-skills'
output_file = 'C:\\Users\\Donal\\.gemini\\antigravity\\brain\\64294421-1ac2-40b9-8376-a38a9b4832d7\\inventory_report.json'

inventory = []

for root, dirs, files in os.walk(base_path):
    if '.git' in dirs:
        dirs.remove('.git') # Skip git internals
    for name in files:
        file_path = os.path.join(root, name)
        try:
            stat = os.stat(file_path)
            inventory.append({
                'path': os.path.relpath(file_path, base_path),
                'size': stat.st_size,
                'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                'type': os.path.splitext(name)[1]
            })
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

with open(output_file, 'w') as f:
    json.dump(inventory, f, indent=2)

print(f"Report generated: {output_file}")
