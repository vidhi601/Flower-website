let cart = JSON.parse(localStorage.getItem('finalCart')) || [];
let total = parseInt(localStorage.getItem('finalTotal')) || 0;

function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('active'); }

function addToCart(name, price) {
    cart.push({name, price});
    total += price;
    save();
    updateUI();
    toggleCart();
}

function save() {
    localStorage.setItem('finalCart', JSON.stringify(cart));
    localStorage.setItem('finalTotal', total);
}

function updateUI() {
    if(document.getElementById('cart-count')) document.getElementById('cart-count').innerText = cart.length;
    if(document.getElementById('total-amount')) document.getElementById('total-amount').innerText = total;
    const list = document.getElementById('cart-items');
    if(list) list.innerHTML = cart.map(item => `<div>${item.name} - ₹${item.price}</div>`).join('');
}

function goToCheckout() {
    if(cart.length === 0) return alert("Bag is empty!");
    window.location.href = 'checkout.html';
}

if (window.location.pathname.includes('checkout.html')) {
    document.getElementById('checkout-items').innerHTML = cart.map(item => `<div>${item.name} - ₹${item.price}</div>`).join('');
    document.getElementById('final-total').innerText = total;
}

function handleOrder(e) {
    e.preventDefault();
    document.getElementById('successModal').style.display = 'grid';
    cart = []; total = 0; save();
}