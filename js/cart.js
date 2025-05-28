// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => this.addToCart(e));
        });

        // Cart page specific listeners
        if (document.getElementById('cart-items')) {
            this.renderCart();
            document.getElementById('cart-items').addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-item')) {
                    this.removeItem(e.target.dataset.id);
                } else if (e.target.classList.contains('update-quantity')) {
                    this.updateQuantity(e.target.dataset.id, parseInt(e.target.value));
                }
            });
        }
    }

    addToCart(event) {
        const button = event.target;
        const quantity = parseInt(document.getElementById('quantity')?.value || 1);
        
        const item = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image,
            quantity: quantity
        };

        const existingItemIndex = this.items.findIndex(i => i.id === item.id);
        
        if (existingItemIndex > -1) {
            this.items[existingItemIndex].quantity += quantity;
        } else {
            this.items.push(item);
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification('Item added to cart!');
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartCount();
            this.renderCart();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const count = this.items.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(element => {
            element.textContent = count;
        });
    }

    renderCart() {
        const cartItems = document.getElementById('cart-items');
        const emptyMessage = document.getElementById('empty-cart-message');
        const cartContent = document.getElementById('cart-content');
        const cartTotal = document.getElementById('cart-total');

        if (!cartItems) return;

        if (this.items.length === 0) {
            emptyMessage.style.display = 'block';
            cartContent.style.display = 'none';
            return;
        }

        emptyMessage.style.display = 'none';
        cartContent.style.display = 'block';

        cartItems.innerHTML = this.items.map(item => `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; margin-right: 10px;">
                        ${item.name}
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" 
                           class="form-control form-control-sm update-quantity" 
                           style="width: 70px" 
                           value="${item.quantity}" 
                           min="1" 
                           data-id="${item.id}">
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">
                        Remove
                    </button>
                </td>
            </tr>
        `).join('');

        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
        notification.style.zIndex = '1000';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
}); 