const gallery = document.querySelector('.gallery-desktop__mini'); 

export default function() {
    gallery.addEventListener('click', (e) => {
        const el = e.target;
        if (!(el.tagName === 'IMG' || el.firstElementChild.tagName === 'IMG')) return;
        let img; 

        if (el.tagName === 'IMG') img = el;
        if (el.firstElementChild) img = el.firstElementChild;

        changeSelected(img, img.getAttribute('src'));
    })
}

function changeSelected(img, src) {
    const images = Array.from(gallery.querySelectorAll('div'));
    const defaultImage = document.querySelector('.gallery-desktop__selected img');

    const currentSelected = images.find(img => img.classList.contains('selected'));
    currentSelected.classList.remove('selected');

    img.parentElement.classList.add('selected');
    defaultImage.setAttribute('src', src.replace('-thumbnail', ''));
}