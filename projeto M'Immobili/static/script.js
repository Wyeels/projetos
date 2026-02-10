const botoes = Array.from(document.getElementsByClassName('botoes'));

const acoes = {
  abrirMenu: () => {
    const abaMenu = document.querySelector('.menuAberto');
    abaMenu.style.left = (abaMenu.style.left == '0%') ? '-50%' : '0%';

    window.addEventListener('scroll', () => {
      if (abaMenu.style.left == '0%') {
        abaMenu.style.left = '-50%';
      }
    });

    document.querySelectorAll('.menuAberto').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelector('.menuAberto').style.left = '-50%';
      });
    });

    document.addEventListener('click', (e) => {
      const abaMenu = document.querySelector('.menuAberto');
      const btnAbrir = document.querySelector('.botoes');

      if (!abaMenu.contains(e.target) && !btnAbrir.contains(e.target)) {
        abaMenu.style.left = '-50%';
      }
    });
  }
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

window.addEventListener('scroll', function() {
  const elemento = document.querySelector('.barraNavegacao');
  const distanciaX = 200; 

  if (window.scrollY > distanciaX) {
    elemento.style.transition = 'all 1s ease';
    elemento.classList.add('scroll');
  } else {
    elemento.style.transition = 'all 1s ease';
    elemento.classList.remove('scroll');
  }
});

const todasAsVitrines = document.querySelectorAll('.slider-container');

todasAsVitrines.forEach((container) => {
  const track = container.querySelector('.slider-track');
  const itens = track.querySelectorAll('.item');

  if (itens.length === 0) return;

  function moverVitrine() {
    const larguraTela = window.innerWidth;
    let larguraItem; 
    if (larguraTela < 600) {
      larguraItem = itens[0].offsetWidth + 80; 
    } else if (larguraTela < 900) {
      larguraItem = itens[0].offsetWidth + 90; 
    } else {
      larguraItem = itens[0].offsetWidth + 95; 
    }

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

            

