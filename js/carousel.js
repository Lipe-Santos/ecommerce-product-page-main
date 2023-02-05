import getAriaControls from "./getAriaControls.js";

let currentIndex = 0;
const container = document.querySelector('.carousel-mobile__controls');
const ariaControls = getAriaControls(container);

export default function() {
    container.addEventListener('click', function(e) {
        let currentTarget = e.target;

        if (currentTarget.nodeName !== 'BUTTON' && currentTarget.parentNode.nodeName !== 'BUTTON') return;

        const button = currentTarget.nodeName === 'BUTTON' ? currentTarget : currentTarget.parentNode;

        showImage(button);
    });
}

function showImage(button) {
    const show = button.getAttribute('data-show');
    show === 'next' ? currentIndex++ : currentIndex--;

    const images = ariaControls.querySelectorAll('.carousel-item');
    cleanImages(images);

    const newIndex = Math.abs(currentIndex % images.length);

    images[newIndex].classList.add('show');
}

function cleanImages(images) {
    const image = [...images].find(img => img.classList.contains('show'));
    image.classList.remove('show');
}