#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Convert table-config.js data to JSON format"""

import re
import json
import os

# Read the JavaScript file
script_dir = os.path.dirname(os.path.abspath(__file__))
js_file = os.path.join(script_dir, '..', 'js', 'table-config.js')

with open(js_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the array content
match = re.search(r'var\s+tableData\s*=\s*\[(.*?)\];', content, re.DOTALL)
if not match:
    print("Could not find tableData array")
    exit(1)

array_content = match.group(1)

# Parse each object
objects = []
obj_pattern = re.compile(r'\{\s*place:\s*"([^"]*)",\s*name:\s*"([^"]*)",\s*type:\s*"([^"]*)"\s*\}', re.DOTALL)

for m in obj_pattern.finditer(array_content):
    objects.append({
        "place": m.group(1).strip(),
        "name": m.group(2).strip(),
        "type": m.group(3).strip()
    })

print(f"Found {len(objects)} entries")

# Create data directory
data_dir = os.path.join(script_dir, '..', 'data')
os.makedirs(data_dir, exist_ok=True)

# Write JSON file
json_file = os.path.join(data_dir, 'partners.json')
with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(objects, f, ensure_ascii=False, indent=2)

print(f"Wrote {len(objects)} entries to {json_file}")
