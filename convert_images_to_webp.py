#!/usr/bin/env python3
"""
Image Conversion Script for Amalindo Website
Converts JPG/JPEG/PNG images to WebP format for better performance.

Usage:
    python convert_images_to_webp.py

Requirements:
    pip install Pillow

This script will:
1. Find all JPG/JPEG/PNG images in the images/ folder
2. Convert them to WebP format with 85% quality
3. Keep original files as backup
4. Report file size savings
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow library is required.")
    print("Install it with: pip install Pillow")
    sys.exit(1)


def get_file_size_mb(filepath):
    """Get file size in MB"""
    return os.path.getsize(filepath) / (1024 * 1024)


def convert_to_webp(input_path, output_path, quality=85):
    """Convert an image to WebP format"""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for PNG with transparency)
            if img.mode in ('RGBA', 'P'):
                # For images with transparency, keep RGBA
                if img.mode == 'P':
                    img = img.convert('RGBA')
                img.save(output_path, 'WEBP', quality=quality, method=6)
            else:
                # Convert to RGB for JPG images
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                img.save(output_path, 'WEBP', quality=quality, method=6)
        return True
    except Exception as e:
        print(f"  Error converting {input_path}: {e}")
        return False


def main():
    # Get the script's directory
    script_dir = Path(__file__).parent
    images_dir = script_dir / "images"
    
    if not images_dir.exists():
        print(f"Error: Images directory not found at {images_dir}")
        sys.exit(1)
    
    # Find all image files
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']
    image_files = []
    for ext in extensions:
        image_files.extend(images_dir.glob(ext))
    
    if not image_files:
        print("No images found to convert.")
        return
    
    print(f"Found {len(image_files)} images to convert\n")
    print("=" * 60)
    
    total_original_size = 0
    total_webp_size = 0
    converted_count = 0
    skipped_count = 0
    
    for image_path in sorted(image_files):
        # Skip if already a WebP file exists
        webp_path = image_path.with_suffix('.webp')
        
        if webp_path.exists():
            print(f"Skipping {image_path.name} - WebP already exists")
            skipped_count += 1
            continue
        
        original_size = get_file_size_mb(image_path)
        total_original_size += original_size
        
        print(f"Converting: {image_path.name}")
        print(f"  Original size: {original_size:.2f} MB")
        
        if convert_to_webp(image_path, webp_path):
            webp_size = get_file_size_mb(webp_path)
            total_webp_size += webp_size
            savings = ((original_size - webp_size) / original_size) * 100
            
            print(f"  WebP size: {webp_size:.2f} MB")
            print(f"  Savings: {savings:.1f}%")
            converted_count += 1
        print()
    
    print("=" * 60)
    print(f"\nConversion Complete!")
    print(f"  Files converted: {converted_count}")
    print(f"  Files skipped: {skipped_count}")
    
    if converted_count > 0:
        total_savings = total_original_size - total_webp_size
        savings_percent = (total_savings / total_original_size) * 100
        print(f"\nTotal size reduction:")
        print(f"  Original: {total_original_size:.2f} MB")
        print(f"  WebP: {total_webp_size:.2f} MB")
        print(f"  Saved: {total_savings:.2f} MB ({savings_percent:.1f}%)")
    
    print("\n" + "=" * 60)
    print("NEXT STEPS:")
    print("=" * 60)
    print("""
1. Update your HTML/JS to use WebP images with fallback:

   <picture>
     <source srcset="images/example.webp" type="image/webp">
     <img src="images/example.jpg" alt="Description">
   </picture>

2. Or update gallery-data.js to use .webp extensions

3. Test in browsers that support WebP (Chrome, Firefox, Edge, Safari 14+)

4. Once confirmed working, you can delete the original JPG files
""")


if __name__ == "__main__":
    main()
