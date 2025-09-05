const fs = require('fs');
const path = require('path');

/**
 * Simple build script to combine modular HTML files
 * This script reads the base template and replaces include comments with actual file content
 */

function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return '';
    }
}

function processIncludes(content, basePath = '.') {
    // Match <!--#include file="path/to/file.html" --> patterns
    const includeRegex = /<!--#include\s+file="([^"]+)"\s*-->/g;
    
    return content.replace(includeRegex, (match, filePath) => {
        const fullPath = path.join(basePath, filePath);
        const includeContent = readFile(fullPath);
        
        if (includeContent) {
            console.log(`✓ Included: ${filePath}`);
            // Recursively process includes in the included file
            return processIncludes(includeContent, basePath);
        } else {
            console.warn(`⚠ Could not include: ${filePath}`);
            return `<!-- Could not include: ${filePath} -->`;
        }
    });
}

function buildHTML() {
    console.log('🔧 Building HTML from modular components...\n');
    
    const templatePath = './templates/base.html';
    const outputPath = './index_built.html';
    
    if (!fs.existsSync(templatePath)) {
        console.error(`❌ Template file not found: ${templatePath}`);
        return;
    }
    
    const template = readFile(templatePath);
    const processed = processIncludes(template);
    
    fs.writeFileSync(outputPath, processed);
    
    console.log(`\n✅ Build complete! Output: ${outputPath}`);
    console.log(`📊 File size: ${Math.round(processed.length / 1024)}KB`);
}

// Run the build
buildHTML();
