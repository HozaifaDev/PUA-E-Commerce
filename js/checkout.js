document.addEventListener('DOMContentLoaded', () => {
    // Initialize form validation
    const form = document.getElementById('checkout-form');
    const creditCardFields = document.getElementById('creditCardFields');
    const paypalRadio = document.getElementById('paypal');
    const creditCardRadio = document.getElementById('creditCard');

    // Show/hide credit card fields based on payment method
    paypalRadio.addEventListener('change', () => {
        creditCardFields.style.display = 'none';
        document.querySelectorAll('#creditCardFields input').forEach(input => {
            input.required = false;
        });
    });

    creditCardRadio.addEventListener('change', () => {
        creditCardFields.style.display = 'block';
        document.querySelectorAll('#creditCardFields input').forEach(input => {
            input.required = true;
        });
    });

    // Format card number input
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
    });

    // Format expiry date input
    const expiryDate = document.getElementById('expiryDate');
    expiryDate.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    // Format CVV input
    const cvv = document.getElementById('cvv');
    cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
    });

    // Update order summary
    function updateOrderSummary() {
        const orderItems = document.getElementById('order-items');
        const subtotalElement = document.getElementById('subtotal');
        const shippingElement = document.getElementById('shipping');
        const taxElement = document.getElementById('tax');
        const totalElement = document.getElementById('total');

        if (!window.cart || !window.cart.items.length) {
            window.location.href = 'cart.html';
            return;
        }

        // Calculate totals
        const subtotal = window.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + shipping + tax;

        // Update order items
        orderItems.innerHTML = window.cart.items.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <h6 class="mb-0">${item.name}</h6>
                    <small class="text-muted">Qty: ${item.quantity}</small>
                </div>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        // Update totals
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Collect form data
        const formData = {
            personalInfo: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            },
            shippingAddress: {
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value
            },
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').id,
            orderItems: window.cart.items,
            orderTotal: document.getElementById('total').textContent
        };

        // Here you would typically send this data to your backend
        console.log('Order submitted:', formData);

        // Show success message
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success position-fixed top-0 end-0 m-3';
        successAlert.style.zIndex = '1000';
        successAlert.textContent = 'Order placed successfully!';
        document.body.appendChild(successAlert);

        // Clear cart and redirect
        setTimeout(() => {
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        }, 2000);
    });

    // Initialize order summary
    updateOrderSummary();
}); 