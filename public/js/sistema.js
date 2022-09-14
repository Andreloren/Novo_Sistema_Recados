"use strict";
let descricaoHTML = document.getElementById("descricao");
let detalhamentoHTML = document.getElementById("detalhamento");
let tabelaHTML = document.getElementById("tabelaRegistros");
let formularioRecados = document.getElementById("tabelaDinamica");
let dadosUsuarioLogado;
document.addEventListener("DOMContentLoaded", () => {
    let IDUsuarioLogado = localStorage.getItem("usuarioLogado");
    if (!IDUsuarioLogado) {
        alert("Necessário estar logado para acessar a página");
        window.location.href = "login.html";
    }
    let listaUsuarios = buscarTodosUsuariosStorage();
    console.log(listaUsuarios);
    console.log(IDUsuarioLogado);
    dadosUsuarioLogado = listaUsuarios.find((usuario) => usuario.cpf === IDUsuarioLogado);
    console.log(dadosUsuarioLogado);
    dadosUsuarioLogado.mensagens.forEach((mensagens) => montarHTML(mensagens));
});
formularioRecados.addEventListener("submit", (event) => {
    event.preventDefault();
    cadastrarMensagens();
});
function buscarTodosUsuariosStorage() {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
}
function cadastrarMensagens() {
    const novaMensagem = {
        identificador: `${Math.floor(Math.random() * (10000 - 10) + 10)}`,
        descricao: descricaoHTML.value,
        detalhamento: detalhamentoHTML.value,
    };
    dadosUsuarioLogado.mensagens.push(novaMensagem);
    atualizarDadosUsuarioLogado(dadosUsuarioLogado);
    montarHTML(novaMensagem);
    // formularioRecados.reset();
}
function atualizarDadosUsuarioLogado(usuarioAtualizado) {
    let listaUsuarios = buscarTodosUsuariosStorage();
    let IDUsuarioEncontrado = listaUsuarios.findIndex((usuario) => usuario.cpf === usuarioAtualizado.cpf);
    listaUsuarios[IDUsuarioEncontrado] = usuarioAtualizado;
    atualizarStorage(listaUsuarios);
}
function atualizarStorage(listaDadosUsuario) {
    localStorage.setItem("usuarios", JSON.stringify(listaDadosUsuario));
}
function montarHTML(novasMensagens) {
    let corpo = document.createElement("tbody");
    let linha = document.createElement("tr");
    let colunaID = document.createElement("th");
    colunaID.setAttribute("scope", "row");
    colunaID.innerHTML = novasMensagens.identificador;
    let colunaDesc = document.createElement("td");
    colunaDesc.innerHTML = novasMensagens.descricao;
    let colunaDet = document.createElement("td");
    colunaDet.innerHTML = novasMensagens.detalhamento;
    let colunaAction = document.createElement("td");
    let botaoEditar = document.createElement("button");
    botaoEditar.innerHTML = "Editar";
    botaoEditar.addEventListener("click", () => editarMensagens(novasMensagens));
    let botaoApagar = document.createElement("button");
    botaoApagar.innerHTML = "Apagar";
    botaoApagar.addEventListener("click", () => apagarMensagens(novasMensagens.identificador));
    corpo.appendChild(linha);
    linha.appendChild(colunaID);
    linha.appendChild(colunaDesc);
    linha.appendChild(colunaDet);
    linha.appendChild(colunaAction);
    colunaAction.appendChild(botaoEditar);
    colunaAction.appendChild(botaoApagar);
    tabelaHTML.appendChild(corpo);
}
function editarMensagens(mensagem) { }
function apagarMensagens(ID) { }
