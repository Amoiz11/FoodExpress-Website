// Menu Data with CORRECT Images
const menuItems = [
    // BURGERS
    {
        id: 1,
        name: "Zinger Burger",
        description: "Crispy chicken fillet with mayo and fresh vegetables",
        price: 450,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        category: "burger"
    },
    {
        id: 2,
        name: "Beef Burger",
        description: "Juicy beef patty with cheese and special sauce",
        price: 380,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400",
        category: "burger"
    },
    {
        id: 3,
        name: "Chicken Cheese Burger",
        description: "Grilled chicken with double cheese and veggies",
        price: 420,
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400",
        category: "burger"
    },
    {
        id: 4,
        name: "Crispy Chicken Burger",
        description: "Extra crispy chicken with coleslaw and sauce",
        price: 400,
        image: "https://images.unsplash.com/photo-1530554764233-e79e16c91d08?w=400",
        category: "burger"
    },

    // BROAST
    {
        id: 5,
        name: "Half Broast",
        description: "4 pieces of crispy broast with fries and dip",
        price: 650,
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400",
        category: "broast"
    },
    {
        id: 6,
        name: "Full Broast",
        description: "8 pieces of crispy broast with fries and 2 dips",
        price: 1200,
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
        category: "broast"
    },

    // ROLLS
    {
        id: 7,
        name: "Chicken Chatka Roll",
        description: "Spicy chicken pieces rolled in paratha with chatni",
        price: 220,
        image: "https://images.unsplash.com/photo-1643071269736-85d8777628b0?w=400",
        category: "roll"
    },
    {
        id: 8,
        name: "Beef Seekh Roll",
        description: "Beef seekh kebab wrapped in fresh naan",
        price: 250,
        image: "https://images.unsplash.com/photo-1555949969-aa5e6dbbdd4a?w=400",
        category: "roll"
    },
    {
        id: 9,
        name: "Chicken Mayo Roll",
        description: "Chicken with mayonnaise and vegetables in soft roll",
        price: 200,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
        category: "roll"
    },

    // DRINKS
    {
        id: 10,
        name: "Pepsi 500ml",
        description: "Chilled Pepsi in 500ml bottle",
        price: 120,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
        category: "drink"
    },
    {
        id: 11,
        name: "Coca Cola 500ml",
        description: "Chilled Coca Cola in 500ml bottle",
        price: 120,
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400",
        category: "drink"
    },
    {
        id: 12,
        name: "Mineral Water",
        description: "500ml mineral water bottle",
        price: 80,
        image: "https://images.unsplash.com/photo-1548839149-851a64d0da60?w=400",
        category: "drink"
    },
    {
        id: 13,
        name: "Mango Shake",
        description: "Fresh mango shake with cream",
        price: 180,
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400",
        category: "drink"
    },
    {
        id: 14,
        name: "Strawberry Shake",
        description: "Fresh strawberry shake with cream",
        price: 180,
        image: "https://images.unsplash.com/photo-1570194065650-2f4c1f306b71?w=400",
        category: "drink"
    },
    {
        id: 15,
        name: "Fresh Lime",
        description: "Fresh lime soda with mint",
        price: 150,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400",
        category: "drink"
    }
];

// Global Variables
let cart = [];
let isLoggedIn = false;
let currentFilter = 'all';

// DOM Elements
const menuContainer = document.getElementById('menu-container');
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-btn');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPrice = document.getElementById('total-price');
const placeOrderBtn = document.getElementById('place-order-btn');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.querySelector('.close-login');
const loginForm = document.getElementById('login-form');
const categoryBtns = document.querySelectorAll('.category-btn');
const notificationsContainer = document.getElementById('notifications-container');
const receiptModal = document.getElementById('receipt-modal');
const closeReceipt = document.querySelector('.close-receipt');
const checkDetailsBtn = document.getElementById('check-details-btn');
const continueOrderingBtn = document.getElementById('continue-ordering-btn');
const splashScreen = document.querySelector('.splash-screen');
const contactForm = document.querySelector('.contact-form');

// Splash Screen - Quick 1 second
if (splashScreen) {
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 1000);
}

// Display menu items with filtering
function displayMenuItems() {
    if (!menuContainer) return;
    
    menuContainer.innerHTML = '';
    const filteredItems = currentFilter === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentFilter);
    
    filteredItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400'">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">Rs. ${item.price}</span>
            <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuContainer.appendChild(menuItemElement);
    });
}

// Add item to cart with side notification
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    
    updateCart();
    showSideNotification(`✅ You added "${item.name}" to your cart!`);
    showNotification(`${item.name} added to cart!`);
}

// Show side notification
function showSideNotification(message) {
    const sideNotification = document.createElement('div');
    sideNotification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 3000;
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s forwards;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        border-left: 5px solid #FFD700;
        max-width: 300px;
        font-weight: bold;
    `;
    sideNotification.textContent = message;
    
    document.body.appendChild(sideNotification);
    
    setTimeout(() => {
        if (sideNotification.parentNode) {
            sideNotification.parentNode.removeChild(sideNotification);
        }
    }, 3000);
}

// Remove item from cart
function removeFromCart(itemId) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    showNotification(`❌ "${item.name}" removed from cart!`);
}

// Update cart display
function updateCart() {
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div>
                        <h4>${item.name}</h4>
                        <p>Rs. ${item.price} x ${item.quantity}</p>
                    </div>
                    <div>
                        <span style="font-weight: bold;">Rs. ${itemTotal}</span>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
                cartItems.appendChild(cartItemElement);
            });
        }
        
        if (totalPrice) {
            totalPrice.textContent = total;
        }
    }
}

// Show notification in notifications section
function showNotification(message) {
    if (!notificationsContainer) return;
    
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <strong>${message}</strong>
        <span style="float: right; font-size: 0.9rem; color: #666;">${new Date().toLocaleTimeString()}</span>
    `;
    
    notificationsContainer.insertBefore(notification, notificationsContainer.firstChild);
    
    const placeholder = document.querySelector('.notification-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
}

// Generate random delivery time (20-30 minutes)
function generateDeliveryTime() {
    return Math.floor(Math.random() * 11) + 20;
}

// Show receipt function - FIXED FOR FULL VISIBILITY
function showReceipt(orderNumber, deliveryTime) {
    if (!receiptModal) return;
    
    const receiptItems = document.getElementById('receipt-items');
    const receiptTotal = document.getElementById('receipt-total');
    const receiptOrderNumber = document.getElementById('receipt-order-number');
    const receiptDate = document.getElementById('receipt-date');
    const receiptDeliveryTime = document.getElementById('receipt-delivery-time');
    
    receiptItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const receiptItem = document.createElement('div');
        receiptItem.className = 'receipt-item';
        receiptItem.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <br>
                <small>Rs. ${item.price} x ${item.quantity}</small>
            </div>
            <div>
                <strong>Rs. ${itemTotal}</strong>
            </div>
        `;
        receiptItems.appendChild(receiptItem);
    });
    
    receiptOrderNumber.textContent = orderNumber;
    receiptDate.textContent = new Date().toLocaleString();
    receiptDeliveryTime.textContent = deliveryTime;
    receiptTotal.textContent = total;
    receiptModal.style.display = 'block';
}

// Place order function
function placeOrder() {
    if (!isLoggedIn) {
        showNotification('Please login first to place your order!');
        showSideNotification('🔐 Please login to place order!');
        if (loginModal) {
            loginModal.style.display = 'block';
        }
        if (cartModal) {
            cartModal.style.display = 'none';
        }
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        showSideNotification('🛒 Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryTime = generateDeliveryTime();
    const orderNumber = Math.floor(Math.random() * 10000) + 1000;
    
    showReceipt(orderNumber, deliveryTime);
    
    setTimeout(() => {
        showNotification(`✅ Order #${orderNumber} placed successfully! Total: Rs. ${total}`);
        showNotification(`🕒 Your order will be delivered in ${deliveryTime} minutes`);
        showNotification(`👨‍🍳 Your food is being prepared...`);
    }, 500);
    
    cart = [];
    updateCart();
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

// Event Listeners
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        if (cartModal) cartModal.style.display = 'block';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (cartModal) cartModal.style.display = 'none';
    });
}

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        if (loginModal) loginModal.style.display = 'block';
    });
}

if (closeLogin) {
    closeLogin.addEventListener('click', () => {
        if (loginModal) loginModal.style.display = 'none';
    });
}

if (closeReceipt) {
    closeReceipt.addEventListener('click', () => {
        if (receiptModal) receiptModal.style.display = 'none';
    });
}

if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', placeOrder);
}

if (checkDetailsBtn) {
    checkDetailsBtn.addEventListener('click', () => {
        if (receiptModal) receiptModal.style.display = 'none';
        const notificationsSection = document.getElementById('notifications');
        if (notificationsSection) {
            notificationsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

if (continueOrderingBtn) {
    continueOrderingBtn.addEventListener('click', () => {
        if (receiptModal) receiptModal.style.display = 'none';
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        isLoggedIn = true;
        if (loginModal) loginModal.style.display = 'none';
        showNotification('✅ Login successful! Welcome back!');
        showSideNotification('🎉 Welcome back! Ready to order?');
        if (loginBtn) loginBtn.textContent = 'Logout';
        
        if (loginBtn) {
            loginBtn.onclick = () => {
                isLoggedIn = false;
                loginBtn.textContent = 'Login';
                showNotification('Logged out successfully!');
                showSideNotification('👋 Logged out successfully!');
                loginBtn.onclick = () => {
                    if (loginModal) loginModal.style.display = 'block';
                };
            };
        }
    });
}

// Category filtering
if (categoryBtns.length > 0) {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            displayMenuItems();
        });
    });
}

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (cartModal && event.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (loginModal && event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (receiptModal && event.target === receiptModal) {
        receiptModal.style.display = 'none';
    }
});

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add CSS animations for side notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the page
if (menuContainer) {
    displayMenuItems();
}

// Add some sample notifications on load
setTimeout(() => {
    if (notificationsContainer) {
        showNotification('Welcome to FoodExpress! Start ordering delicious food.');
    }
}, 1500);