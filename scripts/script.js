document.addEventListener('DOMContentLoaded', function() {
  // Selecciona el botón con la clase btnExplorar
  const btnExplorar = document.querySelector('.btnExplorar');

  // Agrega un evento de clic al botón
  btnExplorar.addEventListener('click', function() {
      // Redirige al usuario a recuerdos.html
      window.location.href = 'recuerdos.html';
  });

  // (Aquí sigue el resto de tu código JavaScript)
});

const stack = document.querySelector(".stack");
const cards = Array.from(stack.children)
  .reverse()
  .filter((child) => child.classList.contains("card"));

cards.forEach((card) => stack.appendChild(card));

function moveCard() {
  const lastCard = stack.lastElementChild;
  if (lastCard.classList.contains("card")) {
    lastCard.classList.add("swap");

    setTimeout(() => {
      lastCard.classList.remove("swap");
      stack.insertBefore(lastCard, stack.firstElementChild);
    }, 1200);
  }
}

stack.addEventListener("click", function (e) {
  const card = e.target.closest(".card");
  if (card && card === stack.lastElementChild) {
    card.classList.add("swap");

    setTimeout(() => {
      card.classList.remove("swap");
      stack.insertBefore(card, stack.firstElementChild);
      resetAutoplay();
    }, 1200);
  }
});

let autoplayInterval = setInterval(moveCard, 4000);

function resetAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(moveCard, 4000);
}