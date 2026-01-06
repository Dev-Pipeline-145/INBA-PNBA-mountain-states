/**
 * INBA/PNBA Mountain States - Shop & Cart Functionality
 * =============================================================================
 * 
 * Shopping cart and Square payment integration
 * 
 * @author INBA/PNBA Mountain States
 * @version 1.0.0
 */

'use strict';

/**
 * =============================================================================
 * SHOPPING CART MODULE
 * =============================================================================
 */

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.cartModal = document.getElementById('cartModal');
        this.cartIcon = document.getElementById('cartIcon');
        this.cartBadge = document.getElementById('cartBadge');
        this.cartItems = document.getElementById('cartItems');
        this.cartSummary = document.getElementById('cartSummary');
        this.cartSubtotal = document.getElementById('cartSubtotal');
        this.cartTax = document.getElementById('cartTax');
        this.cartTotal = document.getElementById('cartTotal');
        this.cartCheckout = document.getElementById('cartCheckout');
        this.cartClose = document.getElementById('cartClose');
        this.cartContinue = document.getElementById('cartContinue');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateCartDisplay();
    }
    
    bindEvents() {
        // Cart icon click
        if (this.cartIcon) {
            this.cartIcon.addEventListener('click', () => this.openCart());
        }
        
        // Close cart
        if (this.cartClose) {
            this.cartClose.addEventListener('click', () => this.closeCart());
        }
        
        // Continue shopping
        if (this.cartContinue) {
            this.cartContinue.addEventListener('click', () => this.closeCart());
        }
        
        // Checkout button
        if (this.cartCheckout) {
            this.cartCheckout.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.proceedToCheckout(e);
            });
        }
        
        // Close on overlay click
        if (this.cartModal) {
            const overlay = this.cartModal.querySelector('.cart-modal__overlay');
            if (overlay) {
                overlay.addEventListener('click', () => this.closeCart());
            }
        }
        
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    this.addItem({
                        id: productCard.dataset.productId,
                        name: productCard.dataset.productName,
                        price: parseFloat(productCard.dataset.productPrice)
                    });
                }
            });
        });
    }
    
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Item added to cart!');
        // Automatically open cart when item is added
        setTimeout(() => this.openCart(), 300);
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }
    
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }
    
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    getTax() {
        // Assuming 8% tax rate - adjust as needed
        return this.getSubtotal() * 0.08;
    }
    
    getTotal() {
        return this.getSubtotal() + this.getTax();
    }
    
    updateCartDisplay() {
        // Update badge
        const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
        if (this.cartBadge) {
            if (itemCount > 0) {
                this.cartBadge.textContent = itemCount;
                this.cartBadge.style.display = 'block';
            } else {
                this.cartBadge.style.display = 'none';
            }
        }
        
        // Update cart items
        if (this.cartItems) {
            if (this.items.length === 0) {
                this.cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
                if (this.cartSummary) this.cartSummary.style.display = 'none';
                if (this.cartCheckout) this.cartCheckout.style.display = 'none';
            } else {
                this.cartItems.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <div class="cart-item__info">
                            <h4 class="cart-item__name">${item.name}</h4>
                            <p class="cart-item__price">$${item.price.toFixed(2)}</p>
                        </div>
                        <div class="cart-item__controls">
                            <button class="cart-item__btn" data-action="decrease" data-id="${item.id}">-</button>
                            <span class="cart-item__quantity">${item.quantity}</span>
                            <button class="cart-item__btn" data-action="increase" data-id="${item.id}">+</button>
                            <button class="cart-item__remove" data-action="remove" data-id="${item.id}">&times;</button>
                        </div>
                        <div class="cart-item__total">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('');
                
                // Bind cart item controls
                this.cartItems.querySelectorAll('[data-action]').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const action = e.target.dataset.action;
                        const id = e.target.dataset.id;
                        const item = this.items.find(i => i.id === id);
                        
                        if (action === 'increase') {
                            this.updateQuantity(id, item.quantity + 1);
                        } else if (action === 'decrease') {
                            this.updateQuantity(id, item.quantity - 1);
                        } else if (action === 'remove') {
                            this.removeItem(id);
                        }
                    });
                });
                
                // Update summary
                if (this.cartSummary) {
                    this.cartSummary.style.display = 'block';
                    if (this.cartSubtotal) this.cartSubtotal.textContent = `$${this.getSubtotal().toFixed(2)}`;
                    if (this.cartTax) this.cartTax.textContent = `$${this.getTax().toFixed(2)}`;
                    if (this.cartTotal) this.cartTotal.textContent = `$${this.getTotal().toFixed(2)}`;
                }
                
                if (this.cartCheckout) this.cartCheckout.style.display = 'block';
            }
        }
    }
    
    openCart() {
        if (this.cartModal) {
            this.cartModal.classList.add('cart-modal--active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeCart() {
        if (this.cartModal) {
            this.cartModal.classList.remove('cart-modal--active');
            document.body.style.overflow = '';
        }
    }
    
    proceedToCheckout(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (this.items.length === 0) return;
        
        this.closeCart();
        
        // Small delay to ensure cart modal closes before opening checkout
        setTimeout(() => {
            if (checkout && typeof checkout.startCheckout === 'function') {
                checkout.startCheckout(this.items, this.getTotal());
            } else {
                // Fallback: try to initialize checkout
                if (typeof Checkout !== 'undefined') {
                    checkout = new Checkout();
                    checkout.startCheckout(this.items, this.getTotal());
                }
            }
        }, 100);
    }
    
    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }
    
    loadCart() {
        const saved = localStorage.getItem('shoppingCart');
        return saved ? JSON.parse(saved) : [];
    }
    
    showNotification(message) {
        // Simple notification - you can enhance this
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('cart-notification--show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('cart-notification--show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

/**
 * =============================================================================
 * CHECKOUT MODULE WITH SQUARE PAYMENT
 * =============================================================================
 */

class Checkout {
    constructor() {
        this.checkoutModal = document.getElementById('checkoutModal');
        this.checkoutForm = document.getElementById('checkoutForm');
        this.checkoutClose = document.getElementById('checkoutClose');
        this.checkoutBack = document.getElementById('checkoutBack');
        this.checkoutSubmit = document.getElementById('checkoutSubmit');
        this.checkoutItems = document.getElementById('checkoutItems');
        this.checkoutTotal = document.getElementById('checkoutTotal');
        this.paymentContainer = document.getElementById('payment-container');
        
        // Success modal elements
        this.successModal = document.getElementById('successModal');
        this.successClose = document.getElementById('successClose');
        this.successMessage = document.getElementById('successMessage');
        
        // Square configuration - will be set in initializeSquare()
        this.squareApplicationId = null;
        this.squareLocationId = null;
        this.payments = null;
        this.card = null;
        this.items = [];
        this.total = 0;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        // Initialize Square SDK when page loads (will only work on HTTPS)
        // For local development, you may need to use HTTPS or Square's sandbox
        if (window.location.protocol === 'https:' || window.location.hostname === 'localhost') {
            this.initializeSquare();
        }
    }
    
    bindEvents() {
        if (this.checkoutClose) {
            this.checkoutClose.addEventListener('click', () => this.close());
        }
        
        if (this.checkoutBack) {
            this.checkoutBack.addEventListener('click', () => {
                this.close();
                // Reopen cart modal
                if (cart) {
                    cart.openCart();
                }
            });
        }
        
        if (this.checkoutForm) {
            this.checkoutForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        if (this.checkoutModal) {
            const overlay = this.checkoutModal.querySelector('.checkout-modal__overlay');
            if (overlay) {
                overlay.addEventListener('click', () => this.close());
            }
        }
        
        // Success modal close button
        if (this.successClose) {
            this.successClose.addEventListener('click', () => this.closeSuccessModal());
        }
        
        // Success modal overlay click to close
        if (this.successModal) {
            const successOverlay = this.successModal.querySelector('.success-modal__overlay');
            if (successOverlay) {
                successOverlay.addEventListener('click', () => this.closeSuccessModal());
            }
        }
    }
    
    async initializeSquare() {
        // Check if Square SDK is loaded
        if (!window.Square) {
            return;
        }
        
        // Square credentials
        this.squareApplicationId = 'sandbox-sq0idb-uIEFnFbS_JUSa0TmvuacxQ';
        this.squareLocationId = 'L8NH6640YSK0Y';
        
        try {
            // Initialize Square Payments
            this.payments = window.Square.payments(this.squareApplicationId, this.squareLocationId);
            
            // Create card payment method
            this.card = await this.payments.card();
            
            // Attach card form to payment container
            if (this.paymentContainer) {
                await this.card.attach(this.paymentContainer);
            }
        } catch (error) {
            // Show user-friendly error message
            if (this.paymentContainer) {
                this.paymentContainer.innerHTML = `
                    <div style="color: #ff4444; padding: 20px; text-align: center;">
                        <p><strong>Payment system unavailable</strong></p>
                        <p>${error.message || 'Unable to initialize payment system. Please ensure you are using HTTPS or contact support.'}</p>
                    </div>
                `;
            }
        }
    }
    
    startCheckout(items, total) {
        this.items = items;
        this.total = total;
        
        // Update checkout display
        if (this.checkoutItems) {
            this.checkoutItems.innerHTML = items.map(item => `
                <div class="checkout-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
        
        if (this.checkoutTotal) {
            this.checkoutTotal.textContent = `$${total.toFixed(2)}`;
        }
        
        // Open checkout modal
        this.open();
        
        // Ensure Square SDK is initialized
        if (!this.card) {
            this.initializeSquare();
        }
    }
    
    open() {
        if (this.checkoutModal) {
            this.checkoutModal.classList.add('checkout-modal--active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    close() {
        if (this.checkoutModal) {
            this.checkoutModal.classList.remove('checkout-modal--active');
            document.body.style.overflow = '';
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.card) {
            this.showError('Payment system not ready. Please refresh the page.');
            return;
        }
        
        // Disable submit button
        if (this.checkoutSubmit) {
            this.checkoutSubmit.disabled = true;
            this.checkoutSubmit.textContent = 'Processing...';
        }
        
        try {
            // Get payment token
            const tokenResult = await this.card.tokenize();
            if (tokenResult.status === 'OK') {
                // Process payment on your backend
                await this.processPayment(tokenResult.token, this.getFormData());
            } else {
                throw new Error('Failed to tokenize card');
            }
        } catch (error) {
            this.showError('Payment failed. Please check your card information and try again.');
            
            if (this.checkoutSubmit) {
                this.checkoutSubmit.disabled = false;
                this.checkoutSubmit.textContent = 'Pay Now';
            }
        }
    }
    
    getFormData() {
        return {
            name: document.getElementById('shippingName').value,
            email: document.getElementById('shippingEmail').value,
            phone: document.getElementById('shippingPhone').value,
            address: document.getElementById('shippingAddress').value,
            city: document.getElementById('shippingCity').value,
            state: document.getElementById('shippingState').value,
            zip: document.getElementById('shippingZip').value
        };
    }
    
    async processPayment(token, shippingData) {
        // IMPORTANT: You need to create a backend endpoint to process payments
        // Square requires server-side processing for security
        // 
        // Example endpoint: POST /api/process-payment
        // 
        // The endpoint should:
        // 1. Create a payment using Square's Payments API
        // 2. Return success/failure status
        // 
        // For now, this is a placeholder that shows the structure
        
        try {
            // Use relative URL for same-origin requests (works with localhost)
            const apiUrl = window.location.origin + '/api/process-payment';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sourceId: token,
                    amount: Math.round(this.total * 100), // Convert to cents
                    items: this.items,
                    shipping: shippingData
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Close checkout modal
                this.close();
                
                // Clear cart
                cart.items = [];
                cart.saveCart();
                cart.updateCartDisplay();
                
                // Show success modal
                this.showSuccessModal('Payment successful! Thank you for your order.');
            } else {
                throw new Error(result.error || 'Payment processing failed');
            }
        } catch (error) {
            // If backend endpoint doesn't exist, show instructions
            this.showError(`
                Payment processing requires a backend endpoint.
                Please set up your Square payment processing server.
                For now, you can test the card tokenization which is working.
                Token: ${token.substring(0, 20)}...
            `);
            
            if (this.checkoutSubmit) {
                this.checkoutSubmit.disabled = false;
                this.checkoutSubmit.textContent = 'Pay Now';
            }
        }
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'checkout-error';
        errorDiv.textContent = message;
        
        const form = this.checkoutForm;
        const existingError = form.querySelector('.checkout-error');
        if (existingError) existingError.remove();
        
        form.insertBefore(errorDiv, form.firstChild);
        
        setTimeout(() => {
            errorDiv.classList.add('checkout-error--show');
        }, 10);
    }
    
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'checkout-success';
        successDiv.textContent = message;
        
        const form = this.checkoutForm;
        const existingSuccess = form.querySelector('.checkout-success');
        if (existingSuccess) existingSuccess.remove();
        
        form.insertBefore(successDiv, form.firstChild);
        
        setTimeout(() => {
            successDiv.classList.add('checkout-success--show');
        }, 10);
    }
    
    showSuccessModal(message) {
        if (this.successModal && this.successMessage) {
            this.successMessage.textContent = message;
            this.successModal.classList.add('success-modal--active');
        }
    }
    
    closeSuccessModal() {
        if (this.successModal) {
            this.successModal.classList.remove('success-modal--active');
        }
    }
}

/**
 * =============================================================================
 * INITIALIZATION
 * =============================================================================
 */

let cart;
let checkout;

const initShop = () => {
    try {
        cart = new ShoppingCart();
        checkout = new Checkout();
    } catch (error) {
        // Error initializing shop
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShop);
} else {
    initShop();
}

