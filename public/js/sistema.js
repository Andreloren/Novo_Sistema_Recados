"use strict";
let descricaoHTML = document.querySelector(".descricao");
let detalhamentoHTML = document.querySelector(".detalhamento");
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
    let nomeSistema = document.getElementById("nameUser");
    nomeSistema.innerHTML = `${dadosUsuarioLogado.nome}`;
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
    formularioRecados.reset();
}
function atualizarDadosUsuarioLogado(usuarioAtualizado) {
    let listaUsuarios = buscarTodosUsuariosStorage();
    let IdUsuarioEncontrado = listaUsuarios.findIndex((usuario) => usuario.cpf === usuarioAtualizado.cpf);
    listaUsuarios[IdUsuarioEncontrado] = usuarioAtualizado;
    atualizarStorage(listaUsuarios);
}
function atualizarStorage(listaDadosUsuario) {
    localStorage.setItem("usuarios", JSON.stringify(listaDadosUsuario));
}
function montarHTML(novasMensagens) {
    let corpo = document.createElement("tbody");
    let linha = document.createElement("tr");
    linha.setAttribute("id", novasMensagens.identificador);
    let colunaId = document.createElement("th");
    colunaId.setAttribute("scope", "row");
    colunaId.innerHTML = novasMensagens.identificador;
    let colunaDesc = document.createElement("td");
    colunaDesc.innerHTML = novasMensagens.descricao;
    let colunaDet = document.createElement("td");
    colunaDet.innerHTML = novasMensagens.detalhamento;
    let colunaAction = document.createElement("td");
    let botaoEditar = document.createElement("button");
    botaoEditar.innerHTML = "Editar";
    botaoEditar.classList.add("mx-1");
    botaoEditar.classList.add("btn");
    botaoEditar.classList.add("btn-info");
    botaoEditar.classList.add("btn-sm");
    botaoEditar.addEventListener("click", () => editarMensagens(novasMensagens));
    let botaoApagar = document.createElement("button");
    botaoApagar.innerHTML = "Apagar";
    botaoApagar.classList.add("mx-1");
    botaoApagar.classList.add("btn");
    botaoApagar.classList.add("btn-danger");
    botaoApagar.classList.add("btn-sm");
    botaoApagar.addEventListener("click", () => apagarMensagens(novasMensagens.identificador));
    corpo.appendChild(linha);
    linha.appendChild(colunaId);
    linha.appendChild(colunaDesc);
    linha.appendChild(colunaDet);
    linha.appendChild(colunaAction);
    colunaAction.appendChild(botaoEditar);
    colunaAction.appendChild(botaoApagar);
    tabelaHTML.appendChild(corpo);
}
function editarMensagens(mensagem) { }
function apagarMensagens(Id) {
    let IdMensagemEncontrada = dadosUsuarioLogado.mensagens.findIndex((mensagem) => mensagem.identificador === Id);
    let linhaExcluir = document.getElementById(Id);
    let confirma = confirm(`Deseja excluir a mensagem ID ${Id}`);
    if (confirma) {
        linhaExcluir.remove();
        dadosUsuarioLogado.mensagens.splice(IdMensagemEncontrada, 1);
        atualizarDadosUsuarioLogado(dadosUsuarioLogado);
    }
    else {
        alert("Operação Cancelada!");
    }
}
