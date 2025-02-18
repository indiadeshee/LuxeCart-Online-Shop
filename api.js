// API endpoints and handlers

class API {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    // Set authentication token
    setToken(token) {
        this.headers['Authorization'] = `Bearer ${token}`;
    }

    // Generic request method
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(this.baseURL + endpoint, {
                ...options,
                headers: { ...this.headers, ...options.headers }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('API request failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Authentication endpoints
    auth = {
        login: async (email, password) => {
            return this.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
        },

        register: async (userData) => {
            return this.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
        },

        forgotPassword: async (email) => {
            return this.request('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email })
            });
        },

        resetPassword: async (token, newPassword) => {
            return this.request('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ token, newPassword })
            });
        }
    };

    // Product endpoints
    products = {
        getAll: async (params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return this.request(`/products?${queryString}`);
        },

        getById: async (id) => {
            return this.request(`/products/${id}`);
        },

        search: async (query) => {
            return this.request(`/products/search?q=${encodeURIComponent(query)}`);
        },

        getCategories: async () => {
            return this.request('/products/categories');
        },

        getFeatured: async () => {
            return this.request('/products/featured');
        }
    };

    // Cart endpoints
    cart = {
        get: async () => {
            return this.request('/cart');
        },

        add: async (productId, quantity) => {
            return this.request('/cart/add', {
                method: 'POST',
                body: JSON.stringify({ productId, quantity })
            });
        },

        update: async (productId, quantity) => {
            return this.request('/cart/update', {
                method: 'PUT',
                body: JSON.stringify({ productId, quantity })
            });
        },

        remove: async (productId) => {
            return this.request(`/cart/remove/${productId}`, {
                method: 'DELETE'
            });
        },

        clear: async () => {
            return this.request('/cart/clear', {
                method: 'DELETE'
            });
        }
    };

    // Order endpoints
    orders = {
        create: async (orderData) => {
            return this.request('/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
        },

        getAll: async () => {
            return this.request('/orders');
        },

        getById: async (orderId) => {
            return this.request(`/orders/${orderId}`);
        },

        cancel: async (orderId) => {
            return this.request(`/orders/${orderId}/cancel`, {
                method: 'POST'
            });
        }
    };

    // User profile endpoints
    user = {
        getProfile: async () => {
            return this.request('/user/profile');
        },

        updateProfile: async (userData) => {
            return this.request('/user/profile', {
                method: 'PUT',
                body: JSON.stringify(userData)
            });
        },

        getAddresses: async () => {
            return this.request('/user/addresses');
        },

        addAddress: async (address) => {
            return this.request('/user/addresses', {
                method: 'POST',
                body: JSON.stringify(address)
            });
        },

        updateAddress: async (addressId, address) => {
            return this.request(`/user/addresses/${addressId}`, {
                method: 'PUT',
                body: JSON.stringify(address)
            });
        },

        deleteAddress: async (addressId) => {
            return this.request(`/user/addresses/${addressId}`, {
                method: 'DELETE'
            });
        }
    };

    // Wishlist endpoints
    wishlist = {
        get: async () => {
            return this.request('/wishlist');
        },

        add: async (productId) => {
            return this.request('/wishlist/add', {
                method: 'POST',
                body: JSON.stringify({ productId })
            });
        },

        remove: async (productId) => {
            return this.request(`/wishlist/remove/${productId}`, {
                method: 'DELETE'
            });
        }
    };

    // Review endpoints
    reviews = {
        getForProduct: async (productId) => {
            return this.request(`/reviews/product/${productId}`);
        },

        create: async (productId, reviewData) => {
            return this.request('/reviews', {
                method: 'POST',
                body: JSON.stringify({ productId, ...reviewData })
            });
        },

        update: async (reviewId, reviewData) => {
            return this.request(`/reviews/${reviewId}`, {
                method: 'PUT',
                body: JSON.stringify(reviewData)
            });
        },

        delete: async (reviewId) => {
            return this.request(`/reviews/${reviewId}`, {
                method: 'DELETE'
            });
        }
    };

    // Payment endpoints
    payment = {
        createIntent: async (amount) => {
            return this.request('/payment/create-intent', {
                method: 'POST',
                body: JSON.stringify({ amount })
            });
        },

        processPayment: async (paymentIntentId) => {
            return this.request('/payment/process', {
                method: 'POST',
                body: JSON.stringify({ paymentIntentId })
            });
        }
    };
}

// Create and export API instance
const api = new API('https://api.example.com');
export default api;
