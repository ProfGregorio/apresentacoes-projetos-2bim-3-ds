if (localStorage.getItem("jsonCarregado")!='true'){
        carregarDadosIniciais();
}else{
    //renderizarUsuarios();
}

async function carregarDadosIniciais() {
    if (!localStorage.getItem("usuarios")) {
      const response = await fetch("dados/usuarios.json");
      const dadosIniciais = await response.json();
      localStorage.setItem("jsonCarregado", 'true');    
      localStorage.setItem("usuarios", JSON.stringify(dadosIniciais));
    }
    location.reload();
}

function exportarConteudoJSON() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const blob = new Blob([JSON.stringify(usuarios, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "usuarios.json";  // Nome do arquivo de download
    a.click();
    URL.revokeObjectURL(url);
}

function excluirLocalStorage(){
    localStorage.clear();
    window.location.reload();
}

// Inicialização
//window.onload = carregarUsuarios;