export function centerImage(element) {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const elementWidth = element.clientWidth;
    const elementHeight = element.clientHeight;

    element.style.left = `${(containerWidth - elementWidth) / 2}px`;
    element.style.top = `${(containerHeight - elementHeight) / 2}px`;
    element.style.transform = `rotate(0deg) scale(2)`; // Centrar, rotar y agrandar
}
