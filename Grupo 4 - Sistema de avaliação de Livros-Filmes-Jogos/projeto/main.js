function verificarChaveLocalStorage(chave) {
  if (localStorage.getItem(chave) === null) {
    return false; // A chave não existe
  } else {
    return true; // A chave existe
  }
}