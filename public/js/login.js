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
// const botaoCPF = document.querySelector("#botaoCadastrar") as HTMLButtonElement;
let aparecerModal = document.getElementById(".esteModal");
let mostrarCPFHTML = document.querySelector(".cpfCadastro2");
// botaoCPF.addEventListener("click", (ev) => {
//   ev.preventDefault();
//   validarCPF();
// });
function validarCPF() {
    // let cpfExiste = buscarUsuariosStorage();
    // let existeCPF = cpfExiste.some(
    //   (cpfExistente) => cpfExistente.cpf === cpfHTML.value
    // );
    // if (existeCPF) {
    //   alert("CPF já cadastrado no sistema");
    //   resetCPF();
    //   return;
    // }
    // // aprender a como retirar caracter especial
    // if (!cpfHTML.value) {
    //   alert("Necessário digitar um CPF");
    //   return;
    // }
    // if (cpfHTML.value.length !== 11) {
    //   alert("Favor digitar cpf com 11 digitos");
    //   return;
    // }
    // botaoCPF.setAttribute("data-bs-toggle", "modal");
}
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
    resetCPF();
    // mostrarModal.()
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
// function mostrarModal(): void {
//   aparecerModal.style.display = "block";
// }
// function esconderModal(): void {
//   aparecerModal.style.display = "none";
// }
function validarCampos() {
    // if (
    //   nomeCadastroHTML.value === "" ||
    //   emailCadastroHTML.value === "" ||
    //   cpfHTML.value === "" ||
    //   senhaCadastroHTML.value === "" ||
    //   senhaCadastroConfirmHTML.value === ""
    // ) {
    //   alert("Campos em Branco");
    //   return false;
    // }
    // if (senhaCadastroHTML.value.length < 5) {
    //   alert("Digite no minimo 5 caracteres");
    //   return false;
    // }
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
    // esconderModal();
    // resetNovoUsuario();
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
}
