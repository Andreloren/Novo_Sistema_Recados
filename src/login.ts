// Parte de Logar Usuario

let cpfLogin = document.querySelector(".cpfLogin") as HTMLInputElement;
let senhaLogin = document.querySelector(".senhaLogin") as HTMLInputElement;

let botaoLogin = document.querySelector("#botaoAcessar") as HTMLButtonElement;
botaoLogin.addEventListener("click", (e) => {
  e.preventDefault();
  logarUsuario();
});

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify([]));
  }
});
interface Usuario {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  mensagens: Mensagens[];
}

function logarUsuario(): void {
  let usuarios = buscarUsuariosStorage(); //usuarios -> refere-se a um [] de usuario

  if (!cpfLogin.value || !senhaLogin.value) {
    alert("Dados em Branco ou Divergentes");
    resetLogin();
    return;
  }

  let usuarioAchado = usuarios.find(
    (valor) => valor.cpf === cpfLogin.value && valor.senha === senhaLogin.value
  );

  if (!usuarioAchado) {
    alert("CPF ou Senha divergentes");

    resetLogin();
    return;
  }

  localStorage.setItem("usuarioLogado", usuarioAchado.cpf);
  login();
  resetLogin();
}

let aparecerModal = document.getElementById(".esteModal") as HTMLDivElement;
let mostrarCPFHTML = document.querySelector(
  ".cpfCadastro2"
) as HTMLInputElement;

//Inicio Modal
let nomeCadastroHTML = document.querySelector(
  ".nomeCadastro"
) as HTMLInputElement;
let emailCadastroHTML = document.querySelector(
  ".emailCadastro"
) as HTMLInputElement;
let cpfHTML = document.querySelector(".cpfCadastro") as HTMLInputElement;
let senhaCadastroHTML = document.querySelector(
  ".senhaCadastro"
) as HTMLInputElement;
let senhaCadastroConfirmHTML = document.querySelector(
  ".senhaConfirm"
) as HTMLInputElement;
let mostrarModal = document.querySelector("esteModal") as HTMLDivElement;

let formularioCadastro = document.querySelector(
  "#modalCadastro"
) as HTMLFormElement;

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

const loginContainer = document.querySelector(
  "#container-login"
) as HTMLDivElement;

const moveOverlay = () => loginContainer.classList.toggle("troca");

const botaoCadastrar = document.querySelector(
  "#botaoCadastrar"
) as HTMLButtonElement;
botaoCadastrar.addEventListener("click", moveOverlay);

const botaoEntrar = document.querySelector("#botaoEntrar") as HTMLButtonElement;
botaoEntrar.addEventListener("click", moveOverlay);

const openLog = document.querySelector("#openLoginMobile") as HTMLElement;
const openCad = document.querySelector("#openCadastroMobile") as HTMLElement;
openLog.addEventListener("click", moveOverlay);
openCad.addEventListener("click", moveOverlay);

function validarCampos(): Boolean {
  if (senhaCadastroHTML.value !== senhaCadastroConfirmHTML.value) {
    alert("Senhas divergentes");
    return false;
  }

  return true;
}

function cadastrarUsuario() {
  let listaDeUsuarios = buscarUsuariosStorage();

  let existeUsuario = listaDeUsuarios.some(
    (existente) => existente.cpf === cpfHTML.value
  );

  if (existeUsuario) {
    alert("CPF já cadastrado");
    return;
  }

  const novoUsuario: Usuario = {
    nome: nomeCadastroHTML.value,
    cpf: cpfHTML.value,
    email: emailCadastroHTML.value.toLowerCase(),
    senha: senhaCadastroHTML.value,
    mensagens: [],
  };

  listaDeUsuarios.push(novoUsuario);
  salvarUsuarioStorage(listaDeUsuarios);
}

function buscarUsuariosStorage(): Usuario[] {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

function salvarUsuarioStorage(novoUsuario: Usuario[]): void {
  localStorage.setItem("usuarios", JSON.stringify(novoUsuario));
}

function login(): void {
  setTimeout(() => {
    window.location.href = "sistema.html";
  }, 500);
}

function resetCPF(): void {
  cpfHTML.value = "";
}

function resetLogin(): void {
  cpfLogin.value = "";
  senhaLogin.value = "";
}

function resetNovoUsuario(): void {
  nomeCadastroHTML.value === "";
  emailCadastroHTML.value === "";
  senhaCadastroHTML.value === "";
  senhaCadastroConfirmHTML.value === "";
}

function modalConfirmcao(): void {
  const div1 = document.createElement("div");
  div1.classList.add("w-50");
  div1.classList.add("p-1");
  div1.setAttribute("id", "liveAlertPlaceholder");
  const divNova = document.getElementById("tabelaDinamica") as HTMLDivElement;
  divNova.appendChild(div1);

  const alertPlaceholder = document.getElementById(
    "liveAlertPlaceholder"
  ) as HTMLDivElement;

  const alert = (message: any, type: any): void => {
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
