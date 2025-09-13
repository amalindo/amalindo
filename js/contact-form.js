// Handle contact form functionality
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.messageInput = document.getElementById('message');
        this.submitButton = document.getElementById('btn-submit');
        this.emailAddress = 'baselfawzy566@hotmail.com';
        
        this.init();
    }

    init() {
        this.messageInput?.addEventListener('input', () => this.updateMailtoLink());
        this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
        // Initial setup of mailto link
        this.updateMailtoLink();
    }

    updateMailtoLink() {
        if (!this.messageInput || !this.submitButton) return;
        
        const message = this.messageInput.value;
        const url = `mailto:${this.emailAddress}?body=${encodeURIComponent(message)}`;
        this.submitButton.href = url;
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const message = this.messageInput?.value;

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!this.isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // If validation passes, trigger the mailto link
        window.location.href = this.submitButton.href;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Initialize form handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
