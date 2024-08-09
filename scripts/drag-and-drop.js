export function initializeDragAndDrop(draggable, previewMode) {
    function startDrag(e) {
        if (previewMode) return;

        e.preventDefault();
        const isTouch = e.type.includes('touch');
        const startX = isTouch ? e.touches[0].clientX : e.clientX;
        const startY = isTouch ? e.touches[0].clientY : e.clientY;

        let shiftX = startX - draggable.offsetLeft;
        let shiftY = startY - draggable.offsetTop;

        function moveAt(pageX, pageY) {
            draggable.style.left = pageX - shiftX + 'px';
            draggable.style.top = pageY - shiftY + 'px';
        }

        function onMove(e) {
            const pageX = isTouch ? e.touches[0].clientX : e.clientX;
            const pageY = isTouch ? e.touches[0].clientY : e.clientY;
            moveAt(pageX, pageY);
        }

        function endDrag() {
            document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', onMove);
            document.removeEventListener(isTouch ? 'touchend' : 'mouseup', endDrag);
            draggable.classList.remove('active');

            // Actualizar la posición original al finalizar el arrastre
            draggable.dataset.initialLeft = draggable.style.left;
            draggable.dataset.initialTop = draggable.style.top;
        }

        document.addEventListener(isTouch ? 'touchmove' : 'mousemove', onMove);
        document.addEventListener(isTouch ? 'touchend' : 'mouseup', endDrag);
        draggable.classList.add('active');
    }

    draggable.addEventListener('mousedown', startDrag);
    draggable.addEventListener('touchstart', startDrag);

    draggable.ondragstart = function() {
        return false;
    };
}
