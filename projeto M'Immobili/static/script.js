const botoes = Array.from(document.getElementsByClassName('botoes'));
const chat = document.getElementsByClassName('suporteChat')[0];

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
  },
  verCarrinho: () => {
    const abaCarrinho = document.getElementById('verCarrinho');
    abaCarrinho.classList.add('ativo');
    renderizarItensCarrinho();
    document.body.style.overflow = "hidden";

function renderizarItensCarrinho() {
    const abaCarrinho = document.getElementById('verCarrinho');
    const itensIds = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

    const listaHTML = itensIds.map((prod, index) => `
        <li>
            <span>${prod.nome}</span>
            <span>R$ ${prod.preco}</span>
            <img src="../static/imagens/removerCarrinho.png" 
                 alt="Apagar" 
                 style='margin-left: 10px'
                 onclick="removerDoCarrinho(${index})">
        </li>
    `).join('');

    abaCarrinho.innerHTML = `
        <img src='../static/imagens/fechar.png' alt='fechar' class='fechar-carrinho'>
        <div class='trocaConteudo'>
          <h3>Meu Carrinho</h3>
          <ul>
            ${itensIds.length > 0 ? listaHTML : '<li>Carrinho vazio</li>'}
          </ul>
        </div>
        <div>
          <button onclick="confirmarCompra()">Confirmar Compra</button>
          <button onclick="limparCarrinho()">Limpar</button>
        </div>
    `;
    document.getElementsByClassName('fechar-carrinho')[0].addEventListener('click', () => {
        abaCarrinho.classList.remove('ativo');
        document.body.style.overflow = "visible";
    });
}

window.limparCarrinho = function() {
    localStorage.removeItem('meuCarrinho');
    renderizarItensCarrinho();
    atualizarContadorVisual();
};
window.removerDoCarrinho = function(index) {
    let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];
    
    carrinho.splice(index, 1);
    
    localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));
    renderizarItensCarrinho();
    atualizarContadorVisual();
};
  },
  fazerLogin: () => console.log("Indo para tela de login..."),
  abrirSuporte: () => {
    chat.classList.add('aberto')
    document.body.style.overflow = "hidden";
  },
  fechar: () => {
    chat.classList.remove('aberto')
    document.body.style.overflow = "visible";
  },
  autoatendimento: () => {
    const caixaAuto = document.querySelector('aside > div > div:first-of-type');
    const caixaTicket = document.querySelector('aside > div > div:last-of-type');
    if (document.startViewTransition) {
    document.startViewTransition(() => {
      caixaAuto.style.gridRow = "2 / 5";
      caixaAuto.style.gridColumn = '1 / 4';
    });
    } else {
      caixaAuto.style.gridRow = "2 / 5";
      caixaAuto.style.gridColumn = '1 / 4';
    }
    caixaTicket.style.display = 'none';
    caixaAuto.classList.add('semHover')
    caixaAuto.innerHTML = `
                    <img src="../static/imagens/iaIcone" alt="IconeIA">
                    
                `
  },
  ticket: () => {
    const caixaTicket = document.querySelector('aside > div > div:last-of-type');
    const caixaAuto = document.querySelector('aside > div > div:first-of-type');
    if (document.startViewTransition) {
    document.startViewTransition(() => {
      caixaTicket.style.gridRow = "2 / 5";
      caixaTicket.style.gridColumn = '1 / 4';
    });
    } else {
      caixaTicket.style.gridRow = "2 / 5";
      caixaTicket.style.gridColumn = '1 / 4';
    }
    caixaAuto.style.display = 'none';
    caixaTicket.classList.add('semHover')
    caixaTicket.innerHTML = `
                
                `
  }
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


// CONFIGURAÇÕES DE SERVER

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
const supabase = createClient('https://wrfldeioljmzblooyvpd.supabase.co', 'sb_publishable_W7pVaS9hk_Ss4ZyCydsVJg_D-3BAlze');

async function carregarSecao(nomeCategoria) {
    console.log("Buscando categoria:", nomeCategoria);
    
    const { data: produtos, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('categoria', nomeCategoria);

    if (error) {
        console.error("Erro no banco:", error.message);
        return;
    }

    console.log("Produtos encontrados para " + nomeCategoria + ":", produtos); // LOG 2

    const listaHTML = document.querySelector(`ul[data-categoria="${nomeCategoria}"]`);
    if (!listaHTML) {
        console.error("ERRO: Não encontrei no HTML uma <ul> com data-categoria='" + nomeCategoria + "'");
        return;
    }

    const itensNoHTML = listaHTML.querySelectorAll('.item');
    console.log("Espaços (li) disponíveis no HTML:", itensNoHTML.length); // LOG 3

    produtos.forEach((produto, index) => {
        if (itensNoHTML[index]) {
            const li = itensNoHTML[index];
            li.querySelector('.caixa').innerHTML = `<img src="${produto.imagem_url}" style="width:100%;">`;
            li.querySelector('.texto').innerHTML = `<strong>${produto.nome}</strong><br>R$ ${produto.preco}`;
          
        li.querySelector('.caixa').innerHTML = `<img src="${produto.imagem_url}" style="width:100%; height:100%; object-fit:cover;">`;
        li.querySelector('.texto').innerHTML = `<strong>${produto.nome}</strong><br>R$ ${produto.preco}`;
        
        const imgCarrinho = li.querySelector('li img.botoes'); 
        
        if (imgCarrinho) {
            imgCarrinho.style.cursor = "pointer";
            imgCarrinho.setAttribute('onclick', `adicionarAoCarrinho(${produto.id}, '${produto.nome}', '${produto.preco}')`);        
          }   
      }
    });
}

carregarSecao('armazenamento');
carregarSecao('assento');
carregarSecao('superficie');
carregarSecao('estrutura');
atualizarContadorVisual();

function atualizarContadorVisual() {
  const contador = document.getElementById('cont-carrinho');
  if (contador) {
    const itensSalvos = JSON.parse(localStorage.getItem('meuCarrinho')) || [];
    contador.innerText = itensSalvos.length;
  }
}

window.adicionarAoCarrinho = function(id, nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];
    const novoItem = { id, nome, preco };
    
    carrinho.push(novoItem);
    localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));
    
    atualizarContadorVisual();
};
