function abrirSubMenu(nome_menu_principal){
    const tag_menu_principal =  document.getElementsByClassName(nome_menu_principal)[0]
    //let tag_submenu = document.getElementsByClassName('submenu')[0]
    let tag_submenu = tag_menu_principal.nextElementSibling;
    console.log(tag_submenu);
    tag_submenu.classList.toggle("ativo");
    let tag_seta = tag_menu_principal.getElementsByClassName("seta")[0]
    //tag_seta.style.transform =  "rotate(225deg)";
    tag_seta.classList.toggle("aberto");

    //tag_submenu.classList.add("ativo");
}
const cards = document.querySelectorAll('.populares');

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('mouseenter', () => {
        for (let j = 0; j < cards.length; j++) {
            cards[j].style.opacity = '0.3'; // Define a opacidade de todos os cards para 0.3
            // cards[j].style.filter = "blur(4px)";
        }
        cards[i].style.opacity = '1'; // Define a opacidade do card atual (hover) para 1
        //cards[i].style.filter = "blur(0)";

    });

    cards[i].addEventListener('mouseleave', () => {
        for (let j = 0; j < cards.length; j++) {
            cards[j].style.opacity = '1'; // Quando o mouse sai de um card, redefine a opacidade de todos os cards para 1
            //cards[j].style.filter = "blur(0)";
        }
    });
}
