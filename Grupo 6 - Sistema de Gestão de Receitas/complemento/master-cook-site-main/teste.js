function abrirSubMenu() {
    let menuItem = document.querySelector('.menu-item'); // Seleciona o item de menu "RECEITAS +"
    let submenu = menuItem.querySelector('.submenu'); // Seleciona o submenu dentro do item
    
    // Alterna a classe 'ativo' no item de menu
    menuItem.classList.toggle('ativo');
    
    // Alterna a visibilidade do submenu diretamente (ao invés de usar display: none)
    submenu.classList.toggle('ativo');
}