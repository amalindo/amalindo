# Website Structure Restructuring

This project has been restructured to improve maintainability and organization. The original monolithic `index.html` file has been split into logical, modular components.

## New File Structure

```
amalindo/
├── index.html                  # Original file (preserved)
├── index_restructured.html     # New standalone version
├── index_new.php              # PHP version with includes
├── includes/                   # Modular components
│   ├── head.html              # Meta tags, CSS links, analytics
│   ├── header.html            # Navigation and logo
│   ├── hero.html              # Hero/banner section
│   ├── about.html             # About company section
│   ├── gallery.html           # Image slideshow gallery
│   ├── data-table.html        # Data table wrapper
│   ├── table-data.html        # Table data content
│   ├── footer.html            # Footer with contact info
│   ├── scripts.html           # JavaScript includes
│   └── main-content.html      # Main content includes
├── templates/
│   └── base.html              # SSI template with includes
└── css/, js/, images/         # Existing assets
```

## Implementation Options

### 1. **Standalone HTML Version** (`index_restructured.html`)
- Complete working file with all content inline
- No server-side includes needed
- Ready to use immediately
- Easier to maintain than original monolithic file

### 2. **PHP Version** (`index_new.php`)
- Uses PHP includes to load components
- Requires PHP server
- Most modular approach
- Easy to maintain and update sections

### 3. **Server Side Includes Version** (`templates/base.html`)
- Uses HTML SSI comments
- Requires web server with SSI enabled
- Works with Apache, Nginx, IIS

## Benefits of Restructuring

1. **Maintainability**: Each section is in its own file
2. **Reusability**: Components can be reused across pages
3. **Team Collaboration**: Different team members can work on different sections
4. **Version Control**: Easier to track changes to specific sections
5. **Performance**: Easier to optimize individual components
6. **Testing**: Components can be tested individually

## Component Breakdown

### Head Section (`includes/head.html`)
- Meta tags for SEO and social media
- CSS stylesheet links
- Google Analytics code
- Favicon and font links

### Header Section (`includes/header.html`)
- Company logo and branding
- Navigation menu
- Mobile menu toggle

### Hero Section (`includes/hero.html`)
- Main banner with background image
- Company introduction text
- WhatsApp contact button
- Conversion tracking scripts

### About Section (`includes/about.html`)
- Company overview
- Service descriptions
- Experience highlights

### Gallery Section (`includes/gallery.html`)
- Image slideshow
- Client company photos
- Navigation controls and indicators
- Auto-advancing slides

### Data Table Section (`includes/data-table.html`)
- Structured table of client companies
- Location, name, and type columns
- DataTables integration for filtering/sorting

### Footer Section (`includes/footer.html`)
- Contact information
- Social media links
- Contact form
- Copyright information

### Scripts Section (`includes/scripts.html`)
- jQuery and Bootstrap
- DataTables functionality
- Image slider controls
- Contact form handling
- Analytics tracking

## Usage Instructions

### For Standalone Version:
1. Use `index_restructured.html` directly
2. Upload to any web server
3. Works immediately without configuration

### For PHP Version:
1. Upload all files to PHP-enabled server
2. Access `index_new.php`
3. Modify individual includes as needed

### For SSI Version:
1. Configure server to enable Server Side Includes
2. Use `templates/base.html` as base template
3. Apache: Enable mod_include
4. Nginx: Enable SSI in location block

## Customization

- **Header**: Edit `includes/header.html` for logo/navigation changes
- **Content**: Modify individual section files
- **Styling**: CSS files remain unchanged
- **Scripts**: Update `includes/scripts.html` for functionality changes
- **Data**: Update `includes/table-data.html` for client information

## Migration Strategy

1. **Phase 1**: Test `index_restructured.html` alongside original
2. **Phase 2**: Implement modular version based on server capabilities
3. **Phase 3**: Update content management workflow
4. **Phase 4**: Replace original file when confident

This restructuring maintains all original functionality while providing a much more maintainable and scalable foundation for future development.
