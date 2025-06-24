let usuarios = [];
  const form = document.getElementById("form-usuario");
  const listaUsuarios = document.getElementById("lista-usuarios");

if (localStorage.getItem("jsonCarregado")!='true'){
        carregarDadosIniciais();
}else{
    renderizarUsuarios();
}

async function carregarDadosIniciais() {
    if (!localStorage.getItem("usuarios")) {
      const response = await fetch("dados/usuarios.json");
      const dadosIniciais = await response.json();
      localStorage.setItem("jsonCarregado", 'true');    
      localStorage.setItem("usuarios", JSON.stringify(dadosIniciais));
    }
    renderizarUsuarios();    
    location.reload();

}

function salvarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function carregarUsuarios() {
    const data = localStorage.getItem("usuarios");
    usuarios = data ? JSON.parse(data) : [];
    renderizarUsuarios();
}

function renderizarUsuarios() {
    const lista = document.getElementById('listaUsuarios');
    lista.innerHTML = "";

    usuarios.forEach(usuario => {
        const card = document.createElement('div');
        card.className = "col-md-4 mb-3";
        card.innerHTML = `
            <div class="card h-100">
                <img src="${usuario.img || 'https://i.pinimg.com/originals/12/ed/1e/12ed1e7dfd0fe16bbde044fc216ff813.jpg'}" class="card-img-top" alt="${usuario.nome}">
                <div class="card-body">
                    <h5 class="card-title">${usuario.nome}</h5>
                    <p class="card-text">${usuario.sobre}</p>
                    <p class="card-text"><strong>Nascimento:</strong> ${usuario.data_nasc || 'N/A'}</p>
                    <p class="card-text"><strong>WhatsApp:</strong> ${usuario.whatsapp || 'N/A'}</p>
                    <p class="card-text"><strong>Hobbies:</strong> ${usuario.hobbies ? usuario.hobbies.join(", ") : 'Nenhum'}</p>
                    <button class="btn btn-primary" onclick="editarUsuario(${usuario.id})">Editar</button>
                </div>
            </div>
        `;
        lista.appendChild(card);
    });
}

function editarUsuario(id) {
    renderizarCheckboxHobbies();
    const usuario = usuarios.find(a => a.id === id);
    document.getElementById('usuarioId').textContent = usuario ? usuario.id : "";
    document.getElementById('nomeUsuario').value = usuario ? usuario.nome : "";
    document.getElementById('sobreUsuario').value = usuario ? usuario.sobre : "";
    document.getElementById('imgUsuario').value = usuario ? usuario.img || "" : "";
    document.getElementById('dataNascUsuario').value = usuario ? usuario.data_nasc || "" : "";
    document.getElementById('whatsappUsuario').value = usuario ? usuario.whatsapp || "" : "";

    document.querySelectorAll('#formUsuario input[type="checkbox"]').forEach(cb => cb.checked = false);
    if (usuario && Array.isArray(usuario.hobbies)) {
        usuario.hobbies.forEach(hobby => {
            const checkbox = document.querySelector(`#formUsuario input[type="checkbox"][value="${hobby}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }

    new bootstrap.Modal(document.getElementById('modalUsuario')).show();
}

function adicionarUsuario() {
    const id = document.getElementById('usuarioId').textContent;
    const nome = document.getElementById('nomeUsuario').value.trim();
    const sobre = document.getElementById('sobreUsuario').value.trim();
    const img = document.getElementById('imgUsuario').value.trim();
    const data_nasc = document.getElementById('dataNascUsuario').value;
    const whatsapp = document.getElementById('whatsappUsuario').value.trim();
    const hobbies = Array.from(document.querySelectorAll('#formUsuario input[type="checkbox"]:checked')).map(cb => cb.value);

    const novoUsuario = {
        id: id ? parseInt(id) : Date.now(),
        nome, sobre, img, data_nasc, whatsapp, hobbies
    };

    const index = usuarios.findIndex(a => a.id === novoUsuario.id);
    if (index !== -1) usuarios[index] = novoUsuario;
    else usuarios.push(novoUsuario);

    salvarUsuarios();
    renderizarUsuarios();
    bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide();
}

function renderizarCheckboxHobbies() {
    const container = document.getElementById("hobbiesContainer");
    container.innerHTML = ""; // limpa qualquer conteúdo anterior

    // Busca hobbies na localStorage
    const hobbies = JSON.parse(localStorage.getItem("hobbies")) || [];

    hobbies.forEach(hobby => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");

      checkbox.type = "checkbox";
      checkbox.value = hobby;

      label.appendChild(checkbox);
      label.append(` ${hobby}`);
      container.appendChild(label);
      container.appendChild(document.createElement("br"));
    });
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
window.onload = carregarUsuarios;