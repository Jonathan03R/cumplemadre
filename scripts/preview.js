export function handlePreview(draggable, centerImage, previewMode) {
    draggable.addEventListener('dblclick', function() {
        if (!previewMode) {
            // Guardar la posición actual antes de centrar
            draggable.dataset.currentLeft = draggable.style.left;
            draggable.dataset.currentTop = draggable.style.top;

            previewMode = true;
            document.body.classList.add('preview-mode');
            centerImage(draggable);
            draggable.classList.add('preview-active');
            draggable.style.pointerEvents = 'none'; // Desactiva el movimiento
        }
    });

    let touchTimeout;
    draggable.addEventListener('touchend', function(e) {
        if (!touchTimeout) {
            touchTimeout = setTimeout(() => {
                touchTimeout = null;
            }, 300);
        } else {
            clearTimeout(touchTimeout);
            touchTimeout = null;
            if (!previewMode) {
                draggable.dataset.currentLeft = draggable.style.left;
                draggable.dataset.currentTop = draggable.style.top;

                previewMode = true;
                document.body.classList.add('preview-mode');
                centerImage(draggable);
                draggable.classList.add('preview-active');
                draggable.style.pointerEvents = 'none'; // Desactiva el movimiento
            }
        }
    });
}

export function exitPreview(previewMode) {
    document.addEventListener('click', function(e) {
        if (previewMode) {
            const activeElement = document.querySelector('.draggable.preview-active');
            if (activeElement && !activeElement.contains(e.target)) {
                previewMode = false;
                document.body.classList.remove('preview-mode');
                activeElement.classList.remove('preview-active');
                activeElement.style.pointerEvents = ''; // Reactiva el movimiento

                // Restaurar la rotación y la posición antes de la previsualización
                activeElement.style.transform = `rotate(${activeElement.dataset.rotation}deg) scale(1)`;
                activeElement.style.left = activeElement.dataset.currentLeft;
                activeElement.style.top = activeElement.dataset.currentTop;
            }
        }
    });
}
