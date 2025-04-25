const menu = document.querySelector("header > div > img")
menu.addEventListener('click', abrirMenu)
const itens = document.querySelector("header > div > menu")
const geral = document.querySelector("header > div")


function abrirMenu() {
    geral.style.transition = "all 1s ease"

    if (itens.style.display == 'block') {
        itens.style.display = 'none'
        menu.style.transform = 'translateX(0px)'
        geral.style.background = 'transparent'
        menu.src = 'imagens/menu-fechado.png'
    } else {
        itens.style.display = 'block'
        menu.style.transform = 'translateX(10px)'
        geral.style.background = '#e4d4c5'
        // menu.src = 'imagens/menu-aberto.png'
    }
}
