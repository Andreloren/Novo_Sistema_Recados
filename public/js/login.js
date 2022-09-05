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
    let usuarios = buscarUsuarios(); //usuarios -> refere-se a um [] de usuario
    let usuarioAchado = usuarios.find((valor) => {
        valor.cpf === cpfLogin.value && valor.senha === senhaLogin.value;
    });
    if (!usuarioAchado) {
        alert("Não achei ninguém");
        resetLogin();
        return;
    }
    localStorage.setItem("usuarioLogado", usuarioAchado.cpf);
}
function resetLogin() {
    cpfLogin.value = "";
    senhaLogin.value = "";
}
function buscarUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
}
// Parte do CPF Usuario
let cpfHTML = document.getElementById("cpfCadastro");
const botaoCPF = document.getElementById("botaoCadastrar");
let aparecerModal = document.getElementById("modal");
let mostrarCPFHTML = document.getElementById("cpfCadastro2");
botaoCPF.addEventListener("click", (ev) => {
    ev.preventDefault();
    mostrarModal();
    mostrarCPFHTML.innerText = `CPF: ${cpfHTML.value}`;
});
function mostrarModal() {
    aparecerModal.style.display = "block";
}
function esconderModal() {
    aparecerModal.style.display = "none";
}
//Inicio Modal
let nomeCadastroHTML = document.getElementById("nomeCadastro");
let emailCadastroHTML = document.getElementById("emailCadastro");
let senhaCadastroHTML = document.getElementById("senhaCadastro");
let senhaCadastroConfirmHTML = document.getElementById("senhaConfirm");
const botaoCadastroNovo = document.getElementById("cadastrarNovo");
let formularioCadastro = document.getElementById("modalCadastro");
botaoCadastroNovo.addEventListener("click", (ev) => {
    ev.preventDefault();
    esconderModal();
});
// document.addEventListener("DOMContentLoaded", () => {});
formularioCadastro.addEventListener("submit", (event) => {
    event.preventDefault();
    cadastrarUsuario();
});
function cadastrarUsuario() { }
