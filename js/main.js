import getAriaControls from "./getAriaControls.js";
import carousel from "./carousel.js";
import gallery from "./gallery.js";

carousel();
gallery();

let amount = 0;
let quantity = 0;

if (localStorage.getItem('amount')) {
    amount = parseFloat(localStorage.getItem('amount'));
    updateCart();
}

document.addEventListener('click', function(e) {
    let currentTarget = e.target;

    if (currentTarget.nodeName !== 'BUTTON' && currentTarget.parentNode.nodeName !== 'BUTTON') return;

    const button = currentTarget.nodeName === 'BUTTON' ? currentTarget : currentTarget.parentNode;

    if (button.classList.contains('menuMobileBtn')) changeMenuMobile(button);
    if (button.classList.contains('cart-btn')) changeCart(button);
    if (button.classList.contains('quantity-btn')) changeInput(button);
    if (button.classList.contains('trash')) removeItemFromCart();
    if (button.classList.contains('add-cart__btn')) addToCart();
});

function changeMenuMobile(btn) {
    const menuContainer = getAriaControls(btn);
    const actions = {
        open: 'block',
        close: 'none',
    }

    menuContainer.style.display = actions[btn.getAttribute('data-action')];
}

let cartIsOpen = false;

function changeCart(btn) {
    const cartContainer = getAriaControls(btn);
    const cartBody = cartContainer.querySelector('.cart__body');
    cartIsOpen = !cartIsOpen;

    cartIsOpen ? cartContainer.style.display = 'block' :  cartContainer.style.display = 'none';
    btn.setAttribute('aria-expanded', cartIsOpen);

    isEmpty(cartBody);
}

function isEmpty(cartBody) {
    if (cartBody.children.length !== 0) return;

    const p = document.createElement('p');
    p.classList.add('empty');
    p.innerText = 'Your cart is empty.';

    cartBody.appendChild(p);
    localStorage.removeItem('amount');
}

function changeInput(btn) {
    const input = getAriaControls(btn);
    const attr = btn.getAttribute('data-action');

    if (attr === 'add') {
        input.value = ++quantity;
    } else if (quantity > 0 && attr === 'remove') {
        input.value = --quantity;
    }
}


function addToCart() {
    if (quantity === 0) return;

    amount += quantity;
    localStorage.setItem('amount', amount);

    updateCart();

}

function updateCart() {
    const cartBody = document.querySelector('.cart__body');
    const inputValue = document.querySelector('.add-cart input');
    inputValue.value = 0;
    quantity = 0;

    if (cartBody.children.length === 0 || cartBody.firstElementChild.nodeName === 'P') {
        cartBody.innerHTML = '';
        const grid = document.createElement('div');
        grid.classList.add('cart__grid')
        grid.innerHTML = `
        <div><img src="images/image-product-1-thumbnail.jpg" alt=""></div>
        <div>
            <p>
            Fall Limited Edition Sneakers<br>
            <span class="price"></span> x <span class="cart__amount"></span> <span class="value"></span>
            </p>
        </div>
        <div><button class="trash"><img src="images/icon-delete.svg" alt="remove"></button></div>
        <button class="checkout">checkout</button>
        `;
        cartBody.appendChild(grid);
    }

    updateValues();
}

function updateValues() {
    const price = parseFloat(document.querySelector('.price-container__price b').innerText.slice(1));

    const cartAmount = document.querySelector('.cart__amount');
    cartAmount.innerText = amount;

    const cartPrice = document.querySelector('.price');
    cartPrice.innerText = '$' + price;

    const cartValue = document.querySelector('.value');
    cartValue.innerText = '$' +  amount * price;
}

function removeItemFromCart() {
    const cartBody = document.querySelector('.cart__body');
    cartBody.innerHTML = '';
    amount = 0;
    isEmpty(cartBody);
}