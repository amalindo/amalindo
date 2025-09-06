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
        
        console.log('Gallery: Initializing with', this.slides.length, 'slides');
        this.init();
    }

    init() {
        try {
            this.renderSlides();
            this.renderDots();
            this.showSlide(0);
            this.addNavigationButtons();
            console.log('Gallery: Initialization complete');
        } catch (error) {
            console.error('Gallery: Error during initialization:', error);
        }
    }

    renderSlides() {
        this.slides.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'mySlides fade';
            slideDiv.innerHTML = `
                <img src="${slide.src}" 
                     alt="${slide.alt}" 
                     loading="lazy"
                     style="width:100%; max-height: 400px; object-fit: cover;">
            `;
            this.container.appendChild(slideDiv);
        });
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

        // Hide all slides
        Array.from(slides).forEach(slide => slide.style.display = 'none');
        Array.from(dots).forEach(dot => dot.classList.remove('active'));

        // Show current slide
        slides[index].style.display = 'block';
        dots[index].classList.add('active');

        this.currentSlideIndex = index;
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Gallery(gallerySlides, 'slideshow-container');
});
