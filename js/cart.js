// ==========================================
// Shopping Cart Functionality
// ==========================================

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }
    
    init() {
        this.createCartUI();
        this.updateCartCount();
        this.attachEventListeners();
    }
    
    // ==========================================
    // Create Cart Sidebar UI
    // ==========================================
    createCartUI() {
        const cartHTML = `
            <div class="cart-sidebar">
                <div class="cart-header">
                    <h3>Korpa</h3>
                    <button class="close-cart" aria-label="Zatvori korpu">&times;</button>
                </div>
                <div class="cart-items-container"></div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Ukupno:</span>
                        <span class="total-amount">0 RSD</span>
                    </div>
                    <button class="checkout-btn">Poruči</button>
                </div>
            </div>
            <div class="cart-overlay"></div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', cartHTML);
        
        // Add cart styles
        this.addCartStyles();
    }
    
    addCartStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cart-sidebar {
                position: fixed;
                top: 0;
                right: 0;
                width: 400px;
                height: 100vh;
                background: var(--white);
                box-shadow: -4px 0 20px rgba(0,0,0,0.1);
                z-index: 10000;
                transform: translateX(100%);
                display: flex;
                flex-direction: column;
            }
            
            .cart-sidebar.active {
                transform: translateX(0);
            }
            
            .cart-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .cart-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .cart-header {
                padding: 1.5rem;
                border-bottom: 1px solid var(--gray-light);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .cart-header h3 {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .close-cart {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition);
            }
            
            .close-cart:hover {
                transform: rotate(90deg);
            }
            
            .cart-items-container {
                flex: 1;
                overflow-y: auto;
                padding: 1rem;
            }
            
            .cart-item {
                display: flex;
                gap: 1rem;
                padding: 1rem;
                border-bottom: 1px solid var(--gray-light);
            }
            
            .cart-item-icon {
                font-size: 2rem;
                width: 60px;
                height: 60px;
                background: var(--gray-light);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
            }
            
            .cart-item-details {
                flex: 1;
            }
            
            .cart-item-name {
                font-weight: 600;
                margin-bottom: 0.3rem;
            }
            
            .cart-item-price {
                color: var(--gray-medium);
                font-size: 0.95rem;
            }
            
            .cart-item-controls {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-top: 0.5rem;
            }
            
            .qty-btn {
                background: var(--black);
                color: var(--white);
                border: none;
                width: 25px;
                height: 25px;
                cursor: pointer;
                font-size: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition);
            }
            
            .qty-btn:hover {
                background: var(--gray-dark);
            }
            
            .cart-item-quantity {
                font-weight: 600;
                min-width: 30px;
                text-align: center;
            }
            
            .remove-item {
                margin-left: auto;
                background: none;
                border: none;
                color: #e74c3c;
                cursor: pointer;
                font-size: 1.2rem;
                padding: 0.3rem;
            }
            
            .cart-empty {
                text-align: center;
                padding: 3rem 1rem;
                color: var(--gray-medium);
            }
            
            .cart-empty-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
                opacity: 0.3;
            }
            
            .cart-footer {
                padding: 1.5rem;
                border-top: 2px solid var(--gray-light);
            }
            
            .cart-total {
                display: flex;
                justify-content: space-between;
                font-size: 1.3rem;
                font-weight: 700;
                margin-bottom: 1rem;
            }
            
            .checkout-btn {
                width: 100%;
                padding: 1rem;
                background: var(--black);
                color: var(--white);
                border: none;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                transition: var(--transition);
            }
            
            .checkout-btn:hover {
                background: var(--gray-dark);
            }
            
            .checkout-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            @media (max-width: 480px) {
                .cart-sidebar {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ==========================================
    // Event Listeners
    // ==========================================
    attachEventListeners() {
        // Open cart
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', () => this.openCart());
        }
        
        // Close cart
        document.querySelector('.close-cart').addEventListener('click', () => this.closeCart());
        document.querySelector('.cart-overlay').addEventListener('click', () => this.closeCart());
        
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const product = {
                    id: productCard.dataset.id,
                    name: productCard.querySelector('h3').textContent,
                    price: parseFloat(productCard.dataset.price),
                    icon: productCard.querySelector('.product-icon').textContent
                };
                this.addItem(product);
            });
        });
        
        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', () => this.checkout());
    }
    
    // ==========================================
    // Cart Operations
    // ==========================================
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        
        this.saveCart();
        this.renderCart();
        this.updateCartCount();
        this.showNotification(`${product.name} dodato u korpu!`, 'success');
        this.openCart();
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCart();
        this.updateCartCount();
    }
    
    updateQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.renderCart();
                this.updateCartCount();
            }
        }
    }
    
    // ==========================================
    // UI Updates
    // ==========================================
    renderCart() {
        const container = document.querySelector('.cart-items-container');
        
        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <p>Vaša korpa je prazna</p>
                </div>
            `;
            document.querySelector('.checkout-btn').disabled = true;
        } else {
            container.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-icon">${item.icon}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price.toLocaleString()} RSD</div>
                        <div class="cart-item-controls">
                            <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">🗑️</button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Attach item event listeners
            container.querySelectorAll('.qty-minus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.updateQuantity(e.target.dataset.id, -1);
                });
            });
            
            container.querySelectorAll('.qty-plus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.updateQuantity(e.target.dataset.id, 1);
                });
            });
            
            container.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.removeItem(e.target.dataset.id);
                    this.showNotification('Proizvod uklonjen iz korpe', 'info');
                });
            });
            
            document.querySelector('.checkout-btn').disabled = false;
        }
        
        this.updateTotal();
    }
    
    updateTotal() {
        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.querySelector('.total-amount').textContent = `${total.toLocaleString()} RSD`;
    }
    
    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }
    
    openCart() {
        document.querySelector('.cart-sidebar').classList.add('active');
        document.querySelector('.cart-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeCart() {
        document.querySelector('.cart-sidebar').classList.remove('active');
        document.querySelector('.cart-overlay').classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ==========================================
    // Checkout
    // ==========================================
    checkout() {
        if (this.items.length === 0) return;
        
        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemsList = this.items.map(item => 
            `${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} RSD`
        ).join('%0A');
        
        const message = `Pozdrav! Želim da poručim:%0A%0A${itemsList}%0A%0AUkupno: ${total.toLocaleString()} RSD`;
        const whatsappUrl = `https://wa.me/381601234567?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
        this.showNotification('Preusmjeravamo vas na WhatsApp...', 'success');
    }
    
    // ==========================================
    // LocalStorage
    // ==========================================
    saveCart() {
        localStorage.setItem('tattoo-cart', JSON.stringify(this.items));
    }
    
    loadCart() {
        const saved = localStorage.getItem('tattoo-cart');
        return saved ? JSON.parse(saved) : [];
    }
    
    // ==========================================
    // Notifications
    // ==========================================
    showNotification(message, type = 'info') {
        // Use the notification system from main.js
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        }
    }
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.cart = new ShoppingCart();
});
