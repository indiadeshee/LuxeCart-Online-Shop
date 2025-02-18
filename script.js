// Sample product data
const products = [
    {
        id: 1,
        name: "Luxury Watch Collection",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
        category: "Accessories",
        rating: 4.8,
        description: "Premium crafted timepiece with elegant design"
    },
    {
        id: 2,
        name: "Designer Leather Handbag",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        category: "Fashion",
        rating: 4.9,
        description: "Handcrafted luxury leather bag"
    },
    {
        id: 3,
        name: "Premium Wireless Headphones",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        category: "Electronics",
        rating: 4.7,
        description: "High-fidelity audio with noise cancellation"
    },
    {
        id: 4,
        name: "Signature Perfume Collection",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
        category: "Beauty",
        rating: 4.9,
        description: "Exclusive fragrance blend"
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Modal close buttons
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Search icon
    document.getElementById('searchIcon').addEventListener('click', () => {
        document.getElementById('searchModal').style.display = 'block';
    });

    // Cart icon
    document.getElementById('cartIcon').addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'block';
        displayCart();
    });

    // User icon
    document.getElementById('userIcon').addEventListener('click', () => {
        document.getElementById('userModal').style.display = 'block';
    });

    // Search input
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );
        displaySearchResults(filteredProducts);
    });

    // Filters
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('priceFilter').addEventListener('change', filterProducts);
    document.getElementById('sortFilter').addEventListener('change', filterProducts);
}

// Display products
function displayProducts(productList = products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    
    productList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${getStarRating(product.rating)}
                </div>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <div class="product-actions">
                    <button onclick="addToCart(${product.id})" class="cta-button">Add to Cart</button>
                    <i class="far fa-heart wishlist-icon" onclick="toggleWishlist(${product.id})"></i>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
        
        // Update wishlist icon if product is in wishlist
        if (wishlist.includes(product.id)) {
            productCard.querySelector('.wishlist-icon').classList.replace('far', 'fas');
        }
    });
}

// Generate star rating HTML
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    return starsHTML;
}

// Filter products
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const price = document.getElementById('priceFilter').value;
    const sort = document.getElementById('sortFilter').value;
    
    let filteredProducts = [...products];
    
    // Apply category filter
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category);
    }
    
    // Apply price filter
    if (price !== 'all') {
        const [min, max] = price.split('-').map(p => p === '+' ? Infinity : Number(p));
        filteredProducts = filteredProducts.filter(p => p.price >= min && p.price < max);
    }
    
    // Apply sorting
    switch(sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.reverse();
            break;
    }
    
    displayProducts(filteredProducts);
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No products found</p>';
        return;
    }
    
    results.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
            </div>
        `;
        resultItem.addEventListener('click', () => {
            document.getElementById('searchModal').style.display = 'none';
            // Scroll to product
            const productElement = document.querySelector(`[data-product-id="${product.id}"]`);
            if (productElement) productElement.scrollIntoView({ behavior: 'smooth' });
        });
        searchResults.appendChild(resultItem);
    });
}

// Add to cart functionality
function addToCart(productId) {
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!');
}

// Toggle wishlist
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
        showNotification('Added to wishlist!');
    } else {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist!');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    displayProducts();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

// Display cart
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
            total += product.price;
            const item = document.createElement('div');
            item.className = 'cart-item';
            item.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${product.id})">Remove</button>
            `;
            cartItems.appendChild(item);
        }
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Remove from cart
function removeFromCart(productId) {
    const index = cart.indexOf(productId);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
        showNotification('Product removed from cart!');
    }
}

// Show notification
function showNotification(message) {
    Swal.fire({
        text: message,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
}

// Add these styles
const styles = `
    .product-rating {
        color: #f1c40f;
        margin-bottom: 0.5rem;
    }
    
    .product-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .wishlist-icon {
        font-size: 1.5rem;
        cursor: pointer;
        transition: color 0.3s;
    }
    
    .wishlist-icon:hover {
        color: #e74c3c;
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .cart-item img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 4px;
    }
    
    .cart-item button {
        padding: 0.5rem 1rem;
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .search-result-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    .search-result-item:hover {
        background-color: #f8f9fa;
    }
    
    .search-result-item img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 4px;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
