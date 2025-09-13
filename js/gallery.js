class Gallery {
    constructor(slides, containerId) {
        this.slides = slides;
        this.currentSlideIndex = 0;
        this.containerId = containerId;
        
        // Wait for DOM content to be loaded before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        if (!this.slides || !Array.isArray(this.slides)) {
            console.error('Gallery: slides data is missing or invalid', this.slides);
            return;
        }

        this.container = document.getElementById(this.containerId);
        
        if (!this.container) {
            console.error('Gallery: container not found:', this.containerId);
            return;
        }
        
        console.log('Gallery: Container found:', this.container);
        console.log('Gallery: Initializing with', this.slides.length, 'slides');
        this.init();
    }

    init() {
        try {
            this.preloadImages();
            this.renderSlides();
            this.renderDots();
            this.showSlide(0);
            this.addNavigationButtons();
            this.startAutoPlay();
            console.log('Gallery: Initialization complete');
        } catch (error) {
            console.error('Gallery: Error during initialization:', error);
        }
    }

    preloadImages() {
        // Preload all images to prevent white flashing
        this.slides.forEach((slide, index) => {
            const img = new Image();
            img.src = slide.src;
            img.onload = () => {
                console.log(`Preloaded image ${index + 1}/${this.slides.length}: ${slide.src}`);
            };
            img.onerror = () => {
                console.error(`Failed to preload image: ${slide.src}`);
            };
        });
    }

    startAutoPlay() {
        setInterval(() => {
            this.changeSlide(1);
        }, 1600);
    }

    renderSlides() {
        this.slides.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'mySlides fade';
            
            // Add active class to first slide
            if (index === 0) {
                slideDiv.classList.add('active');
            }
            
            const img = document.createElement('img');
            img.src = slide.src;
            img.alt = slide.alt;
            // Remove lazy loading since we're preloading
            img.style.cssText = 'width:100%; max-height: 400px; object-fit: cover;';
            
            // Add error handling for failed image loads
            img.onerror = function() {
                console.error(`Failed to load image: ${slide.src}`);
                this.style.backgroundColor = '#f0f0f0';
                this.style.minHeight = '200px';
            };
            
            console.log(`Rendering slide ${index + 1}: ${slide.src}`);
            
            slideDiv.appendChild(img);
            this.container.appendChild(slideDiv);
        });
        
        console.log(`Total slides rendered: ${this.slides.length}`);
    }

    renderDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'dots-container';
        dotsContainer.style.textAlign = 'center';
        dotsContainer.style.marginTop = '20px';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.setAttribute('aria-label', `اذهب إلى الصورة ${index + 1}`);
            dot.addEventListener('click', () => this.showSlide(index));
            dotsContainer.appendChild(dot);
        });

        this.container.parentElement.appendChild(dotsContainer);
    }

    addNavigationButtons() {
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');

        prevButton.className = 'prev';
        nextButton.className = 'nextSlider';

        prevButton.innerHTML = '<span aria-hidden="true">&#10094;</span>';
        nextButton.innerHTML = '<span aria-hidden="true">&#10095;</span>';

        prevButton.setAttribute('aria-label', 'الصورة السابقة');
        nextButton.setAttribute('aria-label', 'الصورة التالية');

        prevButton.addEventListener('click', () => this.changeSlide(-1));
        nextButton.addEventListener('click', () => this.changeSlide(1));

        this.container.appendChild(prevButton);
        this.container.appendChild(nextButton);
    }

    changeSlide(direction) {
        this.showSlide(this.currentSlideIndex + direction);
    }

    showSlide(index) {
        const slides = document.getElementsByClassName('mySlides');
        const dots = document.getElementsByClassName('dot');

        // Handle wrap-around
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Remove active class from all slides and dots
        Array.from(slides).forEach(slide => {
            slide.classList.remove('active');
        });
        Array.from(dots).forEach(dot => {
            dot.classList.remove('active');
            dot.classList.remove('activeSlider'); // Remove old class name too
        });

        // Show current slide with smooth transition
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        this.currentSlideIndex = index;
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Gallery(gallerySlides, 'slideshow-container');
});
