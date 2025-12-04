/**
 * INBA/PNBA Mountain States - Clean JavaScript
 * =============================================================================
 * 
 * A clean, maintainable JavaScript file with shared functionality
 * across all pages. Uses modern ES6+ features and follows best practices.
 * 
 * @author INBA/PNBA Mountain States
 * @version 1.0.0
 */

'use strict';

/**
 * =============================================================================
 * CONFIGURATION
 * =============================================================================
 */

const CONFIG = {
    // Animation durations
    animation: {
        fast: 300,
        normal: 500,
        slow: 800
    },
    
    // Breakpoints for responsive behavior
    breakpoints: {
        tablet: 768,
        desktop: 1024
    },
    
    // Selectors
    selectors: {
        navToggle: '#navToggle',
        navMenu: '#navMenu',
        showsDropdown: '#showsDropdown'
    }
};

/**
 * =============================================================================
 * UTILITY FUNCTIONS
 * =============================================================================
 */

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Check if element exists in DOM
 * @param {string} selector - CSS selector
 * @returns {boolean} True if element exists
 */
const elementExists = (selector) => {
    return document.querySelector(selector) !== null;
};

/**
 * Get element by selector with error handling
 * @param {string} selector - CSS selector
 * @returns {Element|null} Element or null
 */
const getElement = (selector) => {
    try {
        return document.querySelector(selector);
    } catch (error) {
        return null;
    }
};

/**
 * =============================================================================
 * NAVIGATION MODULE
 * =============================================================================
 */

class Navigation {
    constructor() {
        this.navToggle = getElement(CONFIG.selectors.navToggle);
        this.navMenu = getElement(CONFIG.selectors.navMenu);
        this.showsDropdown = getElement(CONFIG.selectors.showsDropdown);
        
        this.init();
    }
    
    /**
     * Initialize navigation functionality
     */
    init() {
        if (!this.navToggle || !this.navMenu) {
            return;
        }
        
        this.bindEvents();
        this.handleResize();
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Shows dropdown (mobile only)
        if (this.showsDropdown) {
            this.showsDropdown.addEventListener('click', (e) => {
                this.handleShowsDropdown(e);
            });
        }
        
        // Window resize handler
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, CONFIG.animation.fast));
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });
    }
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        this.navMenu.classList.toggle('nav__menu--active');
        
        // Update aria-expanded for accessibility
        const isExpanded = this.navMenu.classList.contains('nav__menu--active');
        this.navToggle.setAttribute('aria-expanded', isExpanded);
    }
    
    /**
     * Handle shows dropdown click
     * @param {Event} e - Click event
     */
    handleShowsDropdown(e) {
        if (window.innerWidth < CONFIG.breakpoints.tablet) {
            e.preventDefault();
            this.showsDropdown.classList.toggle('is-active');
        }
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        if (window.innerWidth >= CONFIG.breakpoints.tablet) {
            this.navMenu.classList.remove('nav__menu--active');
            if (this.showsDropdown) {
                this.showsDropdown.classList.remove('is-active');
            }
        }
    }
    
    /**
     * Handle clicks outside navigation
     * @param {Event} e - Click event
     */
    handleOutsideClick(e) {
        const isNavClick = this.navToggle.contains(e.target) || 
                          this.navMenu.contains(e.target);
        
        if (!isNavClick && this.navMenu.classList.contains('nav__menu--active')) {
            this.navMenu.classList.remove('nav__menu--active');
            this.navToggle.setAttribute('aria-expanded', 'false');
        }
    }
}

/**
 * =============================================================================
 * FORM MODULE
 * =============================================================================
 */

class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    /**
     * Initialize form handling
     */
    init() {
        if (this.forms.length === 0) return;
        
        this.forms.forEach(form => {
            this.setupForm(form);
        });
    }
    
    /**
     * Setup individual form
     * @param {HTMLFormElement} form - Form element
     */
    setupForm(form) {
        // Add form validation
        form.addEventListener('submit', (e) => {
            this.handleSubmit(e, form);
        });
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }
    
    /**
     * Handle form submission
     * @param {Event} e - Submit event
     * @param {HTMLFormElement} form - Form element
     */
    handleSubmit(e, form) {
        e.preventDefault();
        
        if (this.validateForm(form)) {
            this.submitForm(form);
        }
    }
    
    /**
     * Validate entire form
     * @param {HTMLFormElement} form - Form element
     * @returns {boolean} True if valid
     */
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    /**
     * Validate individual field
     * @param {HTMLElement} field - Form field
     * @returns {boolean} True if valid
     */
    validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        const type = field.type;
        
        // Clear previous error states
        this.clearFieldError(field);
        
        // Required field validation
        if (isRequired && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\D/g, ''))) {
                this.showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Show field error
     * @param {HTMLElement} field - Form field
     * @param {string} message - Error message
     */
    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }
    
    /**
     * Clear field error
     * @param {HTMLElement} field - Form field
     */
    clearFieldError(field) {
        field.classList.remove('error');
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    /**
     * Submit form (placeholder for actual submission)
     * @param {HTMLFormElement} form - Form element
     */
    submitForm(form) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }
        
        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your submission! We will contact you soon.');
            form.reset();
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';
            }
        }, 1000);
    }
}

/**
 * =============================================================================
 * ANIMATION MODULE
 * =============================================================================
 */

class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    /**
     * Initialize animations
     */
    init() {
        if ('IntersectionObserver' in window) {
            this.setupScrollAnimations();
        }
    }
    
    /**
     * Setup scroll-triggered animations
     */
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.feature-list__item, .show, .champion, .trainer');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

/**
 * =============================================================================
 * ERROR HANDLING
 * =============================================================================
 */

/**
 * Global error handler
 * @param {Error} error - Error object
 * @param {string} context - Error context
 */
const handleError = (error, context = 'Unknown') => {
    
    // In production, you might want to send errors to a logging service
    // Example: sendToLoggingService(error, context);
};

/**
 * =============================================================================
 * INITIALIZATION
 * =============================================================================
 */

/**
 * Initialize application when DOM is ready
 */
const initApp = () => {
    try {
        // Initialize modules
        new Navigation();
        new FormHandler();
        new AnimationController();
        
    } catch (error) {
        handleError(error, 'App initialization');
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        FormHandler,
        AnimationController,
        CONFIG
    };
}