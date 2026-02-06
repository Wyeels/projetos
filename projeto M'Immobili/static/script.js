
const botoes = Array.from(document.getElementsByClassName('botoes'));

const acoes = {
  abrirMenu: () => 
    document.body.style.ad
  ,
  verCarrinho: () => console.log("Mostrando itens do carrinho..."),
  fazerLogin: () => console.log("Indo para tela de login..."),
  abrirSuporte: () => console.log("Iniciando suporte...")
};

botoes.forEach(botao => {
  botao.addEventListener('click', (e) => {
    const nomeDaAcao = e.currentTarget.dataset.acao;

    if (acoes[nomeDaAcao]) {
      acoes[nomeDaAcao]();
    }
  });
});



const todasAsVitrines = document.querySelectorAll('.slider-container');

todasAsVitrines.forEach((container) => {
  const track = container.querySelector('.slider-track');
  const itens = track.querySelectorAll('.item');

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

  let intervalo = setInterval(moverVitrine, 3000);

  container.addEventListener('mouseenter', () => clearInterval(intervalo));
  container.addEventListener('mouseleave', () => intervalo = setInterval(moverVitrine, 3000));
});



