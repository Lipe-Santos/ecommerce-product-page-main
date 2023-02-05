export default function(el) {
    const ariaControls = el.getAttribute('aria-controls');
    if (!el || !ariaControls) return;
    return document.getElementById(ariaControls);
}