import re
import json

# File paths
input_file = "data.txt"
output_file = "data_modified.json"

def fix_invalid_json(input_file, output_file):
    with open(input_file, "r", encoding="utf-8") as file:
        # Read the file content as plain text
        content = file.read()
    
    # Match and replace the repeated "place" properties
    fixed_content = re.sub(
        r'"place":\s*"(.*?)",\s*"place":\s*"(.*?)",\s*"place":\s*"(.*?)",',
        r'"place": "\1", "institution": "\2", "type": "\3",',
        content
    )

    # Remove trailing commas (e.g., at the end of objects or arrays)
    fixed_content = re.sub(r",\s*}", "}", fixed_content)
    fixed_content = re.sub(r",\s*]", "]", fixed_content)
    
    # Wrap the content in an array if it's not already
    if not fixed_content.strip().startswith("["):
        fixed_content = f"[{fixed_content}]"
    
    # Attempt to parse the corrected text as JSON
    try:
        data = json.loads(fixed_content)
    except json.JSONDecodeError as e:
        print("Error decoding JSON:", e)
        print("Fixed content:")
        print(fixed_content)
        return
    
    # Write the corrected JSON to the output file
    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)
    
    print(f"Modified JSON saved to {output_file}")

# Run the function
fix_invalid_json(input_file, output_file)
