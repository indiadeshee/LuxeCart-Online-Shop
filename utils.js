// Utility functions for the e-commerce platform

// Format currency based on locale
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
};

// Validate email address
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Generate random order ID
export const generateOrderId = () => {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Calculate discount
export const calculateDiscount = (price, discountPercentage) => {
    return price - (price * (discountPercentage / 100));
};

// Calculate tax
export const calculateTax = (subtotal, taxRate) => {
    return subtotal * taxRate;
};

// Calculate shipping cost
export const calculateShipping = (subtotal, weight, distance, config) => {
    if (subtotal >= config.cart.shipping.freeShippingThreshold) {
        return 0;
    }
    return config.cart.shipping.standardRate;
};

// Format date
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
};

// Debounce function for search
export const debounce = (func, wait) => {
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

// Validate password strength
export const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
        errors: {
            length: password.length < minLength,
            uppercase: !hasUpperCase,
            lowercase: !hasLowerCase,
            number: !hasNumbers,
            special: !hasSpecialChar
        }
    };
};

// Generate pagination
export const generatePagination = (currentPage, totalPages) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
            range.push(i);
        }
    }

    range.forEach(i => {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    });

    return rangeWithDots;
};

// Local storage wrapper
export const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }
};

// Image lazy loading
export const lazyLoadImages = () => {
    const images = document.querySelectorAll('[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Analytics tracking
export const analytics = {
    trackPageView: (page) => {
        // Implement your analytics tracking here
        console.log(`Page view: ${page}`);
    },
    trackEvent: (category, action, label) => {
        // Implement your event tracking here
        console.log(`Event: ${category} - ${action} - ${label}`);
    },
    trackPurchase: (orderId, amount) => {
        // Implement purchase tracking here
        console.log(`Purchase: ${orderId} - ${amount}`);
    }
};

// Form validation
export const validateForm = (formData, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
        const value = formData[field];
        const fieldRules = rules[field];

        if (fieldRules.required && !value) {
            errors[field] = 'This field is required';
        } else if (fieldRules.email && !isValidEmail(value)) {
            errors[field] = 'Invalid email address';
        } else if (fieldRules.minLength && value.length < fieldRules.minLength) {
            errors[field] = `Must be at least ${fieldRules.minLength} characters`;
        } else if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
            errors[field] = 'Invalid format';
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
