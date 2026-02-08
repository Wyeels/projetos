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
    const larguraItem = itens[0].offsetWidth + 90; 

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

/* Inicio das configurações de Teste */

const camada = document.getElementById('camada-foco');
const caixas = document.querySelectorAll('.item');
const articles = document.querySelector('.articles');
let timer;

caixas.forEach(caixa => {
  caixa.addEventListener('mouseenter', () => {
    // Inicia a contagem de 3 segundos (3000ms)
    timer = setTimeout(() => {
      articles.classList.add('ativos');
      camada.classList.add('ativo');
      caixa.classList.add('em-destaque');
    }, 3000); 
  });

  caixa.addEventListener('mouseleave', () => {
    // Cancela o timer se o mouse sair antes dos 3s
    clearTimeout(timer); 
    
    // Remove o efeito
    articles.classList.remove('ativos');
    camada.classList.remove('ativo');
    caixa.classList.remove('em-destaque');
  });
});

/* Fim das configurações de Teste */

