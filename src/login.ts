// Parte de Logar Usuario

let cpfLogin = document.getElementById("cpfLogin") as HTMLInputElement;
let senhaLogin = document.getElementById("senhaLogin") as HTMLInputElement;

let botaoLogin = document.getElementById("botaoAcessar") as HTMLButtonElement;
botaoLogin.addEventListener("click", (e) => {
  e.preventDefault();
  logarUsuario();
});

interface Usuario {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  mensagens: Mensagens[];
}

type Mensagens = {
  identificador: number;
  descricao: string;
  detalhamento: string;
};

function logarUsuario(): void {
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

function resetLogin(): void {
  cpfLogin.value = "";
  senhaLogin.value = "";
}

function buscarUsuarios(): Usuario[] {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

// Parte do CPF Usuario

let cpfHTML = document.getElementById("cpfCadastro") as HTMLInputElement;
const botaoCPF = document.getElementById("botaoCadastrar") as HTMLButtonElement;
let aparecerModal = document.getElementById("modal") as HTMLDivElement;
let mostrarCPFHTML = document.getElementById(
  "cpfCadastro2"
) as HTMLParagraphElement;

botaoCPF.addEventListener("click", (ev) => {
  ev.preventDefault();
  mostrarModal();
  mostrarCPFHTML.innerText = `CPF: ${cpfHTML.value}`;
});

function mostrarModal(): void {
  aparecerModal.style.display = "block";
}

function esconderModal(): void {
  aparecerModal.style.display = "none";
}

//Inicio Modal
let nomeCadastroHTML = document.getElementById(
  "nomeCadastro"
) as HTMLInputElement;
let emailCadastroHTML = document.getElementById(
  "emailCadastro"
) as HTMLInputElement;
let senhaCadastroHTML = document.getElementById(
  "senhaCadastro"
) as HTMLInputElement;
let senhaCadastroConfirmHTML = document.getElementById(
  "senhaConfirm"
) as HTMLInputElement;
const botaoCadastroNovo = document.getElementById(
  "cadastrarNovo"
) as HTMLButtonElement;

let formularioCadastro = document.getElementById(
  "modalCadastro"
) as HTMLFormElement;

botaoCadastroNovo.addEventListener("click", (ev) => {
  ev.preventDefault();

  esconderModal();
});

// document.addEventListener("DOMContentLoaded", () => {});

formularioCadastro.addEventListener("submit", (event) => {
  event.preventDefault();
  cadastrarUsuario();
});

function cadastrarUsuario() {}
