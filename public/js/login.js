"use strict";
// Parte de Logar Usuario
let cpfLogin = document.getElementById("cpfLogin");
let senhaLogin = document.getElementById("senhaLogin");
let botaoLogin = document.getElementById("botaoAcessar");
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
        alert("Dados em branco");
        resetLogin();
        return;
    }
    let usuarioAchado = usuarios.find((valor) => valor.cpf === cpfLogin.value && valor.senha === senhaLogin.value);
    if (!usuarioAchado) {
        alert("CPF ou Senha divergentes");
        //melhorar
        resetLogin();
        return;
    }
    localStorage.setItem("usuarioLogado", usuarioAchado.cpf);
    login();
    resetLogin();
}
// Parte do CPF Usuario
let cpfHTML = document.getElementById("cpfCadastro");
const botaoCPF = document.getElementById("botaoCadastrar");
let aparecerModal = document.getElementById("modal");
let mostrarCPFHTML = document.getElementById("cpfCadastro2");
botaoCPF.addEventListener("click", (ev) => {
    ev.preventDefault();
    validarCPF();
    mostrarCPFHTML.innerText = `CPF: ${cpfHTML.value}`;
});
function validarCPF() {
    let cpfExiste = buscarUsuariosStorage();
    let existeCPF = cpfExiste.some((cpfExistente) => cpfExistente.cpf === cpfHTML.value);
    if (existeCPF) {
        alert("CPF já cadastrado no sistema");
        resetCPF();
        return;
    }
    // aprender a como retirar caracter especial
    if (!cpfHTML.value) {
        alert("Necessário digitar um CPF");
        return esconderModal();
    }
    if (cpfHTML.value.length !== 11) {
        alert("Favor digitar cpf com 11 digitos");
        return esconderModal();
    }
    mostrarModal();
}
//Inicio Modal
let nomeCadastroHTML = document.getElementById("nomeCadastro");
let emailCadastroHTML = document.getElementById("emailCadastro");
let senhaCadastroHTML = document.getElementById("senhaCadastro");
let senhaCadastroConfirmHTML = document.getElementById("senhaConfirm");
let formularioCadastro = document.getElementById("modalCadastro");
formularioCadastro.addEventListener("submit", (event) => {
    event.preventDefault();
    let retornoValidacao = validarCampos();
    if (!retornoValidacao) {
        return;
    }
    cadastrarUsuario();
    //esconderModal();
});
function mostrarModal() {
    aparecerModal.style.display = "block";
}
function esconderModal() {
    aparecerModal.style.display = "none";
}
function validarCampos() {
    if (nomeCadastroHTML.value === "" ||
        emailCadastroHTML.value === "" ||
        senhaCadastroHTML.value === "" ||
        senhaCadastroConfirmHTML.value === "") {
        alert("Campos em Branco");
        return false;
    }
    if (senhaCadastroHTML.value.length < 5) {
        alert("Digite no minimo 5 caracteres");
        return false;
    }
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
    resetNovoUsuario();
    resetCPF();
}
function buscarUsuariosStorage() {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
}
function salvarUsuarioStorage(novoUsuario) {
    localStorage.setItem("usuarios", JSON.stringify(novoUsuario));
}
function login() {
    alert("Logado");
    window.location.href = "sistema.html";
    //melhorar
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
    esconderModal();
}
