"use strict";
// Parte de Logar Usuario
let cpfLogin = document.querySelector(".cpfLogin");
let senhaLogin = document.querySelector(".senhaLogin");
let botaoLogin = document.querySelector("#botaoAcessar");
botaoLogin.addEventListener("click", (e) => {
    e.preventDefault();
    logarUsuario();
});
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("usuarios")) {
        localStorage.setItem("usuarios", JSON.stringify([]));
    }
});
function logarUsuario() {
    let usuarios = buscarUsuariosStorage(); //usuarios -> refere-se a um [] de usuario
    if (!cpfLogin.value || !senhaLogin.value) {
        alert("Dados em Branco ou Divergentes");
        resetLogin();
        return;
    }
    let usuarioAchado = usuarios.find((valor) => valor.cpf === cpfLogin.value && valor.senha === senhaLogin.value);
    if (!usuarioAchado) {
        alert("CPF ou Senha divergentes");
        resetLogin();
        return;
    }
    localStorage.setItem("usuarioLogado", usuarioAchado.cpf);
    login();
    resetLogin();
}
let aparecerModal = document.getElementById(".esteModal");
let mostrarCPFHTML = document.querySelector(".cpfCadastro2");
//Inicio Modal
let nomeCadastroHTML = document.querySelector(".nomeCadastro");
let emailCadastroHTML = document.querySelector(".emailCadastro");
let cpfHTML = document.querySelector(".cpfCadastro");
let senhaCadastroHTML = document.querySelector(".senhaCadastro");
let senhaCadastroConfirmHTML = document.querySelector(".senhaConfirm");
let mostrarModal = document.querySelector("esteModal");
let formularioCadastro = document.querySelector("#modalCadastro");
formularioCadastro.addEventListener("submit", (event) => {
    event.preventDefault();
    let retornoValidacao = validarCampos();
    if (!retornoValidacao) {
        return;
    }
    cadastrarUsuario();
    formularioCadastro.reset();
});
// Inicio Troca Telas
const loginContainer = document.querySelector("#container-login");
const moveOverlay = () => loginContainer.classList.toggle("troca");
const botaoCadastrar = document.querySelector("#botaoCadastrar");
botaoCadastrar.addEventListener("click", moveOverlay);
const botaoEntrar = document.querySelector("#botaoEntrar");
botaoEntrar.addEventListener("click", moveOverlay);
const openLog = document.querySelector("#openLoginMobile");
const openCad = document.querySelector("#openCadastroMobile");
openLog.addEventListener("click", moveOverlay);
openCad.addEventListener("click", moveOverlay);
function validarCampos() {
    if (senhaCadastroHTML.value !== senhaCadastroConfirmHTML.value) {
        alert("Senhas divergentes");
        return false;
    }
    return true;
}
function cadastrarUsuario() {
    let listaDeUsuarios = buscarUsuariosStorage();
    let existeUsuario = listaDeUsuarios.some((existente) => existente.cpf === cpfHTML.value);
    if (existeUsuario) {
        alert("CPF já cadastrado");
        return;
    }
    const novoUsuario = {
        nome: nomeCadastroHTML.value,
        cpf: cpfHTML.value,
        email: emailCadastroHTML.value.toLowerCase(),
        senha: senhaCadastroHTML.value,
        mensagens: [],
    };
    listaDeUsuarios.push(novoUsuario);
    salvarUsuarioStorage(listaDeUsuarios);
}
function buscarUsuariosStorage() {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
}
function salvarUsuarioStorage(novoUsuario) {
    localStorage.setItem("usuarios", JSON.stringify(novoUsuario));
}
function login() {
    setTimeout(() => {
        window.location.href = "sistema.html";
    }, 500);
}
function resetCPF() {
    cpfHTML.value = "";
}
function resetLogin() {
    cpfLogin.value = "";
    senhaLogin.value = "";
}
function resetNovoUsuario() {
    nomeCadastroHTML.value === "";
    emailCadastroHTML.value === "";
    senhaCadastroHTML.value === "";
    senhaCadastroConfirmHTML.value === "";
}
function modalConfirmcao() {
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
        }, 2000);
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
        });
    }
}
