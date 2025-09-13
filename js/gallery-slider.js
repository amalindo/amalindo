// Simple, reliable image slider
class GallerySlider {
    constructor(containerId, images) {
        this.container = document.getElementById(containerId);
        this.images = images;
        this.currentIndex = 0;
        this.isTransitioning = false;
        
        if (!this.container) {
            console.error('Slider container not found:', containerId);
            return;
        }
        
        this.init();
    }
    
    init() {
        this.createSliderHTML();
        this.showSlide(0);
        this.startAutoSlide();
        console.log('Gallery Slider initialized with', this.images.length, 'images');
    }
    
    createSliderHTML() {
        // Clear container
        this.container.innerHTML = '';
        
        // Create slides
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slide.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
            this.container.appendChild(slide);
        });
        
        // Create navigation
        const prevBtn = document.createElement('button');
        prevBtn.className = 'gallery-prev';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.onclick = () => this.prevSlide();
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'gallery-next';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.onclick = () => this.nextSlide();
        
        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);
        
        // Create dots with wrapper
        const dotsWrapper = document.createElement('div');
        dotsWrapper.style.textAlign = 'center';
        dotsWrapper.style.width = '100%';
        
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'gallery-dots';
        
        this.images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'gallery-dot';
            dot.onclick = () => this.showSlide(index);
            dotsContainer.appendChild(dot);
        });
        
        dotsWrapper.appendChild(dotsContainer);
        this.container.parentElement.appendChild(dotsWrapper);
    }
    
    showSlide(index) {
        if (this.isTransitioning) return;
        
        const slides = this.container.querySelectorAll('.gallery-slide');
        const dots = document.querySelectorAll('.gallery-dot');
        
        // Handle wrap around
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // Hide all slides and remove active dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide and activate dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        this.currentIndex = index;
        console.log(`Showing slide ${index + 1}/${slides.length}`);
    }
    
    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }
    
    startAutoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, 3000); // 3 seconds
    }
}

// Gallery Animation Enhancement
function triggerGalleryAnimations() {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        const animatedElements = gallerySection.querySelectorAll('.to-animate');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, index * 100);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Use the existing gallery data
    if (typeof gallerySlides !== 'undefined') {
        new GallerySlider('slideshow-container', gallerySlides);
    } else {
        console.error('Gallery slides data not found');
    }
    
    // Trigger gallery animations after a short delay
    setTimeout(triggerGalleryAnimations, 500);
});
