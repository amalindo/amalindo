// Simple, reliable image slider with RTL support
class GallerySlider {
    constructor(containerId, images) {
        this.container = document.getElementById(containerId);
        this.images = images;
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.isPaused = false;
        this.autoSlideInterval = null;
        
        if (!this.container) {
            console.warn('Slider container not found:', containerId);
            return;
        }
        
        if (!this.images || this.images.length === 0) {
            console.warn('No images provided for slider');
            return;
        }
        
        this.init();
    }
    
    init() {
        this.createSliderHTML();
        this.showSlide(0);
        this.startAutoSlide();
        this.addKeyboardNavigation();
        this.addHoverPause();
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
    }
    
    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, 4000); // 4 seconds
    }
    
    pauseAutoSlide() {
        this.isPaused = true;
    }
    
    resumeAutoSlide() {
        this.isPaused = false;
    }
    
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only handle if gallery is in view
            const gallerySection = document.getElementById('gallery');
            if (!gallerySection) return;
            
            const rect = gallerySection.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInView) {
                if (e.key === 'ArrowLeft') {
                    this.nextSlide(); // RTL: left arrow goes next
                } else if (e.key === 'ArrowRight') {
                    this.prevSlide(); // RTL: right arrow goes prev
                }
            }
        });
    }
    
    addHoverPause() {
        this.container.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.container.addEventListener('mouseleave', () => this.resumeAutoSlide());
        
        // Touch support
        this.container.addEventListener('touchstart', () => this.pauseAutoSlide(), { passive: true });
        this.container.addEventListener('touchend', () => {
            setTimeout(() => this.resumeAutoSlide(), 2000);
        }, { passive: true });
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
        console.warn('Gallery slides data not found - gallery will not be initialized');
    }
    
    // Trigger gallery animations after a short delay
    setTimeout(triggerGalleryAnimations, 500);
});
