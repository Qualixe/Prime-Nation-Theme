document.addEventListener('DOMContentLoaded', function () {

    // Add to Cart Form Handler
    document.querySelectorAll('form[action="/cart/add"]').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            // Check if this form is already being handled by product-form-component
            if (form.closest('product-form-component')) {
                return; // Let product-form.js handle it
            }

            e.preventDefault();

            const submitButton = form.querySelector('[type="submit"]');
            if (submitButton) submitButton.disabled = true;

            const formData = new FormData(form);
            // Replicate Theme's standard practice of adding empty sections to trigger modern response
            formData.append('sections', '');

            fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Accept': 'text/html', // Theme's standard
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData
            })
                .then(async response => {
                    const textContent = await response.text();
                    let data;
                    try {
                        data = JSON.parse(textContent);
                    } catch (err) {
                        // Failed to parse response as JSON
                        throw new Error('Server returned HTML instead of JSON.');
                    }

                    if (!response.ok) {
                        throw new Error(data.description || data.message || 'Failed to add item to cart');
                    }
                    return data;
                })
                .then(() => {
                    // Dispatch events for Alpine component
                    window.dispatchEvent(new CustomEvent('cart-updated'));
                    window.dispatchEvent(new CustomEvent('open-cart-drawer'));
                    updateCartCount();
                })
                .catch((err) => {
                    // Add to cart error
                    alert(err.message || 'Failed to add item to cart.');
                })
                .finally(() => {
                    if (submitButton) submitButton.disabled = false;
                });
        });
    });

    function updateCartCount() {
        fetch('/cart.js', {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(res => res.json())
            .then(cart => {
                document.querySelectorAll('.cart-item-count, .cart-total-items').forEach(el => {
                    el.textContent = cart.item_count;
                });
            })
            .catch(err => {
                // Error updating cart count
            });
    }

    function attachCartListeners() {
        // Simple trigger for Alpine drawer
        document.querySelectorAll('.cart-sidebar-open-btn, .side-cart-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-cart-drawer'));
            };
        });

        updateCartCount();
    }

    attachCartListeners();
    window.attachCartListeners = attachCartListeners;
});
