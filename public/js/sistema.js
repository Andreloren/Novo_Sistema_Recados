"use strict";
let descricaoHTML = document.querySelector(".descricao");
let detalhamentoHTML = document.querySelector(".detalhamento");
let tabelaHTML = document.getElementById("tabelaRegistros");
let formularioRecados = document.getElementById("tabelaDinamica");
let botaoSair = document.getElementById("logout");
botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    sair();
});
function sair() {
    return (window.location.href = "login.html");
}
let dadosUsuarioLogado;
document.addEventListener("DOMContentLoaded", () => {
    let IDUsuarioLogado = localStorage.getItem("usuarioLogado");
    if (!IDUsuarioLogado) {
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
    colunaId.classList.add("pt-3");
    colunaId.innerHTML = novasMensagens.identificador;
    let colunaDesc = document.createElement("td");
    let inputDesc = document.createElement("input");
    inputDesc.setAttribute("type", "text");
    inputDesc.setAttribute("aria-describedby", "inputGroup-sizing-sm");
    inputDesc.setAttribute("id", "descricaoEdit");
    inputDesc.value = novasMensagens.descricao;
    inputDesc.classList.add("form-control-plaintext");
    inputDesc.classList.add("text-center");
    inputDesc.setAttribute("readonly", "true");
    let colunaDet = document.createElement("td");
    let inputDet = document.createElement("input");
    inputDet.setAttribute("type", "text");
    inputDet.setAttribute("aria-describedby", "inputGroup-sizing-sm");
    inputDet.setAttribute("id", "detalhamentoEdit");
    inputDet.value = novasMensagens.detalhamento;
    inputDet.classList.add("form-control-plaintext");
    inputDet.classList.add("text-center");
    inputDet.setAttribute("readonly", "true");
    let colunaAction = document.createElement("td");
    let botaoEditar = document.createElement("button");
    botaoEditar.innerHTML = "Editar";
    botaoEditar.classList.add("mx-1");
    botaoEditar.classList.add("btn");
    botaoEditar.classList.add("btn-info");
    botaoEditar.classList.add("btn-sm");
    botaoEditar.addEventListener("click", () => {
        liberarEdicao();
    });
    let botaoApagar = document.createElement("button");
    botaoApagar.innerHTML = "Apagar";
    botaoApagar.setAttribute("type", "button");
    botaoApagar.setAttribute("data-bs-toggle", "modal");
    botaoApagar.setAttribute("data-bs-target", "#exampleModal");
    botaoApagar.classList.add("mx-1");
    botaoApagar.classList.add("btn");
    botaoApagar.classList.add("btn-danger");
    botaoApagar.classList.add("btn-sm");
    botaoApagar.addEventListener("click", () => {
        apagarMensagens(novasMensagens.identificador);
    });
    let botaoSalvarEditar = document.createElement("button");
    botaoSalvarEditar.innerHTML = "Salvar";
    botaoSalvarEditar.setAttribute("type", "button");
    botaoSalvarEditar.setAttribute("data-bs-toggle", "modal");
    botaoSalvarEditar.setAttribute("data-bs-target", "#staticBackdrop");
    botaoSalvarEditar.classList.add("mx-1");
    botaoSalvarEditar.classList.add("btn");
    botaoSalvarEditar.classList.add("btn-outline-success");
    botaoSalvarEditar.classList.add("btn-sm");
    botaoSalvarEditar.classList.add("d-none");
    botaoSalvarEditar.addEventListener("click", () => {
        editarMensagens(novasMensagens.identificador);
        cancelarCamposEdicao();
        modalConfirmacao();
    });
    let botaoCancelarEditar = document.createElement("button");
    botaoCancelarEditar.innerHTML = "Cancelar";
    botaoCancelarEditar.classList.add("mx-1");
    botaoCancelarEditar.classList.add("btn");
    botaoCancelarEditar.classList.add("btn-outline-dark");
    botaoCancelarEditar.classList.add("btn-sm");
    botaoCancelarEditar.classList.add("d-none");
    botaoCancelarEditar.addEventListener("click", () => {
        cancelarCamposEdicao();
        inputDet.value = novasMensagens.detalhamento;
        inputDesc.value = novasMensagens.descricao;
    });
    corpo.appendChild(linha);
    linha.appendChild(colunaId);
    linha.appendChild(colunaDesc);
    linha.appendChild(colunaDet);
    colunaDet.appendChild(inputDet);
    linha.appendChild(colunaAction);
    colunaDesc.appendChild(inputDesc);
    colunaAction.appendChild(botaoEditar);
    colunaAction.appendChild(botaoApagar);
    colunaAction.appendChild(botaoSalvarEditar);
    colunaAction.appendChild(botaoCancelarEditar);
    tabelaHTML.appendChild(corpo);
    function liberarEdicao() {
        inputDet.classList.remove("form-control-plaintext");
        inputDet.classList.remove("text-center");
        inputDet.removeAttribute("readonly");
        inputDet.classList.add("form-control");
        inputDet.classList.add("form-label");
        inputDesc.classList.remove("form-control-plaintext");
        inputDesc.classList.remove("text-center");
        inputDesc.removeAttribute("readonly");
        inputDesc.classList.add("form-control");
        inputDesc.classList.add("form-label");
        botaoSalvarEditar.classList.remove("d-none");
        botaoCancelarEditar.classList.remove("d-none");
        botaoEditar.classList.add("d-none");
        botaoApagar.classList.add("d-none");
    }
    function cancelarCamposEdicao() {
        inputDet.classList.add("form-control-plaintext");
        inputDet.classList.add("text-center");
        inputDet.setAttribute("readonly", "true");
        inputDet.classList.remove("form-control");
        inputDet.classList.remove("form-label");
        inputDesc.classList.add("form-control-plaintext");
        inputDesc.classList.add("text-center");
        inputDesc.setAttribute("readonly", "true");
        inputDesc.classList.remove("form-control");
        inputDesc.classList.remove("form-label");
        botaoSalvarEditar.classList.add("d-none");
        botaoCancelarEditar.classList.add("d-none");
        botaoEditar.classList.remove("d-none");
        botaoApagar.classList.remove("d-none");
    }
    function editarMensagens(id) {
        let mensagemAlterada = dadosUsuarioLogado.mensagens.findIndex((mensagem) => mensagem.identificador === id);
        dadosUsuarioLogado.mensagens[mensagemAlterada].descricao = inputDesc.value;
        dadosUsuarioLogado.mensagens[mensagemAlterada].detalhamento =
            inputDet.value;
    }
}
function apagarMensagens(Id) {
    let IdMensagemEncontrada = dadosUsuarioLogado.mensagens.findIndex((mensagem) => mensagem.identificador === Id);
    let linhaExcluir = document.getElementById(Id);
    let confirma = document.getElementById("confirmaExclusao");
    confirma.addEventListener("click", () => {
        linhaExcluir.remove();
        dadosUsuarioLogado.mensagens.splice(IdMensagemEncontrada, 1);
        atualizarDadosUsuarioLogado(dadosUsuarioLogado);
    });
}
function modalConfirmacao() {
    const div1 = document.createElement("div");
    div1.classList.add("w-50");
    div1.classList.add("p-1");
    div1.setAttribute("id", "liveAlertPlaceholder");
    const divNova = document.getElementById("tabelaDinamica");
    divNova.appendChild(div1);
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
    const alert = (message, type) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
            `   <div>${message}</div>`,
            "</div>",
        ].join("");
        alertPlaceholder.append(wrapper);
        setTimeout(() => {
            div1.remove();
        }, 1000);
    };
    const alertTrigger = document.getElementById("liveAlertBtn");
    if (alertTrigger) {
        alertTrigger.addEventListener("click", () => {
            alert("Alteração de dados efetuada.", "success");
            atualizarDadosUsuarioLogado(dadosUsuarioLogado);
        });
    }
    const alertTriggerC = document.getElementById("liveAlertBtnC");
    if (alertTriggerC) {
        alertTriggerC.addEventListener("click", () => {
            alert("Alteração de dados cancelada.", "danger");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    }
}
