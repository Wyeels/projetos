// Seleciona todos os containers de vitrine
const todasAsVitrines = document.querySelectorAll('.slider-container');

todasAsVitrines.forEach((container) => {
  const track = container.querySelector('.slider-track');
  const itens = track.querySelectorAll('.item');
  
  // Se não houver itens, ignora esta vitrine
  if (itens.length === 0) return;

  function moverVitrine() {
    const larguraItem = itens[0].offsetWidth + 80; // 20 é o gap do seu CSS

    track.style.transition = 'transform 0.8s ease-in-out';
    track.style.transform = `translateX(-${larguraItem}px)`;

    setTimeout(() => {
      track.style.transition = 'none';
      track.appendChild(track.firstElementChild);
      track.style.transform = 'translateX(0)';
    }, 800);
  }

  // Define o intervalo individual para cada vitrine
  let intervalo = setInterval(moverVitrine, 3000);

  // Pausa ao passar o mouse (opcional, mas recomendado)
  container.addEventListener('mouseenter', () => clearInterval(intervalo));
  container.addEventListener('mouseleave', () => intervalo = setInterval(moverVitrine, 3000));
});
