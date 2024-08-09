document.addEventListener('DOMContentLoaded', function() {
    const draggables = document.querySelectorAll('.draggable');
    let previewMode = false;

    draggables.forEach(draggable => {
        
        const initialRotation = Math.floor(Math.random() * 90) - 45;
        draggable.dataset.rotation = initialRotation; // Guardar la rotación inicial
        draggable.style.transform = `rotate(${initialRotation}deg)`;

   
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        draggable.style.left = `${(containerWidth - draggable.clientWidth) / 2}px`;
        draggable.style.top = `${(containerHeight - draggable.clientHeight) / 2}px`;


        draggable.dataset.initialLeft = draggable.style.left;
        draggable.dataset.initialTop = draggable.style.top;


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

        // Función para manejar el doble clic o doble toque
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

        // Compatibilidad con doble toque en móviles
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
                    // Guardar la posición actual antes de centrar
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
    });

    // Centra la imagen en el medio de la pantalla y la rota a 0 grados
    function centerImage(element) {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        const elementWidth = element.clientWidth;
        const elementHeight = element.clientHeight;

        element.style.left = `${(containerWidth - elementWidth) / 2}px`;
        element.style.top = `${(containerHeight - elementHeight) / 2}px`;
        element.style.transform = `rotate(0deg) scale(2)`; // Centrar, rotar y agrandar
    }

    // Salir del modo previsualización al hacer clic fuera de la imagen
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
});
