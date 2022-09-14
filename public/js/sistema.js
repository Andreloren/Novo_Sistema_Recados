"use strict";
let descricaoHTML = document.getElementById("descricao");
let detalhamentoHTML = document.getElementById("detalhamento");
let tabelaHTML = document.getElementById("tabelaRegistros");
let formularioRecados = document.getElementById("tabelaDinamica");
let dadosUsuarioLogado;
document.addEventListener("DOMContentLoaded", () => {
    let usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
        alert("Necessário estar logado para acessar a página");
        window.location.href = "login.html";
    }
    let listaUsuarios = buscarUsuariosStorage();
    console.log(listaUsuarios);
    dadosUsuarioLogado = listaUsuarios.find((usuario) => usuario.cpf === usuarioLogado);
    dadosUsuarioLogado.mensagens.forEach((mensagem) => montarHTML());
});
function montarHTML() { }
