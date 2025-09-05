// Handle image slider functionality
class ImageSlider {
    constructor(options = {}) {
        this.slideIndex = 1;
        this.interval = options.interval || 1600;
        this.slides = document.getElementsByClassName("mySlides");
        this.dots = document.getElementsByClassName("dot");
        this.isAutoPlay = options.autoPlay !== false;
        
        this.init();
    }

    init() {
        this.showSlides(this.slideIndex);
        if (this.isAutoPlay) {
            this.startAutoPlay();
        }
        this.setupEventListeners();
    }

    startAutoPlay() {
        setInterval(() => this.plusSlides(1), this.interval);
    }

    setupEventListeners() {
        // Add event listeners for prev/next buttons
        document.querySelector('.prev')?.addEventListener('click', () => this.plusSlides(-1));
        document.querySelector('.nextSlider')?.addEventListener('click', () => this.plusSlides(1));
        
        // Add event listeners for dots
        Array.from(this.dots).forEach((dot, index) => {
            dot.addEventListener('click', () => this.currentSlide(index + 1));
        });
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    showSlides(n) {
        let i;
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        
        // Hide all slides
        Array.from(this.slides).forEach(slide => {
            slide.style.display = "none";
        });
        
        // Remove active class from all dots
        Array.from(this.dots).forEach(dot => {
            dot.className = dot.className.replace(" activeSlider", "");
        });
        
        // Show current slide and activate corresponding dot
        this.slides[this.slideIndex - 1].style.display = "block";
        this.dots[this.slideIndex - 1].className += " activeSlider";
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider({ autoPlay: true, interval: 1600 });
});
