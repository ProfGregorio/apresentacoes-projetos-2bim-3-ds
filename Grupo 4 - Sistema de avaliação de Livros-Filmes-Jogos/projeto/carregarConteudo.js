if (localStorage.getItem("jsonCarregado") != 'true') {
    carregarConteudo();
}

function carregarConteudo() {
    fetch("./dados/jogos.json")
        .then((res) => {
            return res.json();
        })
        .then((conteudo_json) => {
            // Aqui você armazena o objeto JSON como uma string no localStorage
            localStorage.removeItem("jogos");
            localStorage.setItem("jogos", JSON.stringify(conteudo_json));
            localStorage.setItem("jsonCarregado", 'true');
            popularHTML();
        })
        .catch((erro) => {
            console.error("Erro ao carregar as informações:", erro);
        });
}

let minha_biblioteca = JSON.parse(localStorage.getItem("minha_biblioteca")) || [];

function carregarJogosTT() {
    let jogosTT = JSON.parse(localStorage.getItem("minha_biblioteca")) || [];
    let container = document.getElementById("listaJogosTT");
    let aviso = document.querySelector('.aviso');
    container.innerHTML = '';

    if (jogosTT.length === 0) {
        aviso.style.display = '';
    } else {
        aviso.style.display = 'none';
        jogosTT.forEach(jogo => {
            let section = document.createElement("section");
            section.classList.add("col", "jogo", "item2");
            section.innerHTML = `
                <div class="card shadow-sm">
                    <img src="${jogo.capa}" alt="foto-${jogo.nome}">
                    <h2 class="fw-normal text-center">${jogo.nome}</h2>
                    <div class="card-body">
                        <p class="card-text">${jogo.sobre}.</p>
                        <label class="form-label">Avaliação</label>
                        <div class="classificacao" style="display: flex;flex-direction: row;justify-content: flex-start;">
                            ${[1,2,3,4,5].map(i => `<span class="estrela ${i <= parseInt(jogo.avaliacao) ? "selecionada" : "naoselecionada"}">&#9733;</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(section);
        });
    }
}
window.onload = carregarJogosTT;
