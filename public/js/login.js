"use strict";
// Parte de Logar Usuario
let cpfLogin = document.getElementById("cpfLogin");
let senhaLogin = document.getElementById("senhaLogin");
let botaoLogin = document.getElementById("botaoAcessar");
botaoLogin.addEventListener("click", (e) => {
    e.preventDefault();
    logarUsuario();
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
    window.location.href = "cadastro.html";
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
let botaoCPF = document.getElementById("botaoCadastrar");
// botaoCPF.addEventListener("click",());
