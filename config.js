// API Configuration
const config = {
    // Payment Gateway Settings (example with Stripe)
    stripe: {
        publicKey: 'YOUR_STRIPE_PUBLIC_KEY',
        currency: 'USD',
        allowedCards: ['visa', 'mastercard', 'amex']
    },

    // Product Settings
    products: {
        imageQuality: 'high',
        itemsPerPage: 12,
        enableQuickView: true,
        enableComparison: true
    },

    // User Settings
    user: {
        sessionTimeout: 30, // minutes
        passwordMinLength: 8,
        requireEmailVerification: true
    },

    // Shopping Cart
    cart: {
        saveForLater: true,
        guestCheckout: true,
        taxRate: 0.08,
        shipping: {
            freeShippingThreshold: 100,
            standardRate: 9.99,
            expressRate: 19.99
        }
    },

    // Notification Settings
    notifications: {
        position: 'top-end',
        duration: 3000,
        enableSound: true
    },

    // Analytics
    analytics: {
        enableTracking: true,
        hotjar: true,
        googleAnalytics: true
    }
};

export default config;
