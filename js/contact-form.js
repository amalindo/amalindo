// Handle contact form functionality with improved UX
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        this.submitButton = document.getElementById('btn-submit');
        this.emailAddress = 'baselfawzy566@hotmail.com';
        
        this.init();
    }

    init() {
        if (!this.form) return;
        
        // Add input validation on blur
        this.nameInput?.addEventListener('blur', () => this.validateField(this.nameInput, 'الرجاء إدخال الاسم'));
        this.emailInput?.addEventListener('blur', () => this.validateEmail());
        this.messageInput?.addEventListener('blur', () => this.validateField(this.messageInput, 'الرجاء إدخال الرسالة'));
        
        // Clear errors on focus
        [this.nameInput, this.emailInput, this.messageInput].forEach(input => {
            input?.addEventListener('focus', () => this.clearFieldError(input));
        });
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(input, errorMessage) {
        const feedback = input?.parentElement?.querySelector('.form-feedback');
        if (!input?.value?.trim()) {
            input?.classList.add('is-invalid');
            input?.classList.remove('is-valid');
            if (feedback) {
                feedback.textContent = errorMessage;
                feedback.className = 'form-feedback error';
            }
            return false;
        }
        input?.classList.remove('is-invalid');
        input?.classList.add('is-valid');
        if (feedback) {
            feedback.textContent = '';
            feedback.className = 'form-feedback';
        }
        return true;
    }

    validateEmail() {
        const feedback = this.emailInput?.parentElement?.querySelector('.form-feedback');
        const email = this.emailInput?.value?.trim();
        
        if (!email) {
            this.emailInput?.classList.add('is-invalid');
            this.emailInput?.classList.remove('is-valid');
            if (feedback) {
                feedback.textContent = 'الرجاء إدخال البريد الإلكتروني';
                feedback.className = 'form-feedback error';
            }
            return false;
        }
        
        if (!this.isValidEmail(email)) {
            this.emailInput?.classList.add('is-invalid');
            this.emailInput?.classList.remove('is-valid');
            if (feedback) {
                feedback.textContent = 'الرجاء إدخال بريد إلكتروني صحيح';
                feedback.className = 'form-feedback error';
            }
            return false;
        }
        
        this.emailInput?.classList.remove('is-invalid');
        this.emailInput?.classList.add('is-valid');
        if (feedback) {
            feedback.textContent = '';
            feedback.className = 'form-feedback';
        }
        return true;
    }

    clearFieldError(input) {
        const feedback = input?.parentElement?.querySelector('.form-feedback');
        input?.classList.remove('is-invalid');
        if (feedback) {
            feedback.textContent = '';
            feedback.className = 'form-feedback';
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = this.validateField(this.nameInput, 'الرجاء إدخال الاسم');
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateField(this.messageInput, 'الرجاء إدخال الرسالة');

        if (!isNameValid || !isEmailValid || !isMessageValid) {
            // Focus first invalid field
            const firstInvalid = this.form.querySelector('.is-invalid');
            firstInvalid?.focus();
            return;
        }

        // Show loading state
        this.submitButton.disabled = true;
        this.submitButton.classList.add('loading');
        const originalText = this.submitButton.textContent;
        this.submitButton.textContent = 'جاري الإرسال...';

        // Build mailto URL with proper subject and body
        const subject = encodeURIComponent(`رسالة من ${this.nameInput.value} عبر الموقع`);
        const body = encodeURIComponent(
            `الاسم: ${this.nameInput.value}\n` +
            `البريد الإلكتروني: ${this.emailInput.value}\n\n` +
            `الرسالة:\n${this.messageInput.value}`
        );
        
        // Open mailto with delay for UX
        setTimeout(() => {
            window.location.href = `mailto:${this.emailAddress}?subject=${subject}&body=${body}`;
            
            // Reset form after short delay
            setTimeout(() => {
                this.submitButton.disabled = false;
                this.submitButton.classList.remove('loading');
                this.submitButton.textContent = originalText;
                this.form.reset();
                [this.nameInput, this.emailInput, this.messageInput].forEach(input => {
                    input?.classList.remove('is-valid', 'is-invalid');
                });
            }, 1000);
        }, 500);
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Initialize form handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
