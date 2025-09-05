#!/usr/bin/env python3
"""
Simple build script to combine modular HTML files
This script reads the base template and replaces include comments with actual file content
"""

import re
import os
import sys

def read_file(file_path):
    """Read file content safely"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"⚠ Warning: Could not find file: {file_path}")
        return ''
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return ''

def process_includes(content, base_path='.'):
    """Process include directives recursively"""
    include_pattern = r'<!--#include\s+file="([^"]+)"\s*-->'
    
    def replace_include(match):
        file_path = match.group(1)
        full_path = os.path.join(base_path, file_path)
        include_content = read_file(full_path)
        
        if include_content:
            print(f"✓ Included: {file_path}")
            # Recursively process includes in the included file
            return process_includes(include_content, base_path)
        else:
            print(f"⚠ Could not include: {file_path}")
            return f"<!-- Could not include: {file_path} -->"
    
    return re.sub(include_pattern, replace_include, content)

def build_html():
    """Main build function"""
    print("🔧 Building HTML from modular components...\n")
    
    template_path = "./templates/base.html"
    output_path = "./index_built.html"
    
    if not os.path.exists(template_path):
        print(f"❌ Template file not found: {template_path}")
        return False
    
    template = read_file(template_path)
    if not template:
        print("❌ Could not read template file")
        return False
    
    processed = process_includes(template)
    
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(processed)
    except Exception as e:
        print(f"❌ Error writing output file: {e}")
        return False
    
    file_size_kb = round(len(processed) / 1024)
    print(f"\n✅ Build complete! Output: {output_path}")
    print(f"📊 File size: {file_size_kb}KB")
    return True

if __name__ == "__main__":
    success = build_html()
    sys.exit(0 if success else 1)
