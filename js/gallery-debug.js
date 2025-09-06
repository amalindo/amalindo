// Add this at the top of your JS file
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Check if gallerySlides exists
    if (typeof gallerySlides !== 'undefined') {
        console.log('Gallery Slides found:', gallerySlides.length);
    } else {
        console.error('Gallery Slides not found!');
    }
    
    // Check if container exists
    const container = document.getElementById('slideshow-container');
    if (container) {
        console.log('Container found');
    } else {
        console.error('Container not found!');
    }
    
    try {
        // Initialize gallery
        const gallery = new Gallery(gallerySlides, 'slideshow-container');
        console.log('Gallery initialized');
    } catch (error) {
        console.error('Error initializing gallery:', error);
    }
});
