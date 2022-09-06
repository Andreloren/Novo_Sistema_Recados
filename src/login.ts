// Parte de Logar Usuario

let cpfLogin = document.getElementById("cpfLogin") as HTMLInputElement;
let senhaLogin = document.getElementById("senhaLogin") as HTMLInputElement;

let botaoLogin = document.getElementById("botaoAcessar") as HTMLButtonElement;
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

type Mensagens = {
  identificador: number;
  descricao: string;
  detalhamento: string;
};

function logarUsuario(): void {
  let usuarios = buscarUsuariosStorage(); //usuarios -> refere-se a um [] de usuario
  let cpfLoginHTML = cpfLogin.value.toLowerCase();
  let senhaLoginHTML = senhaLogin.value;

  if (!cpfLoginHTML || !senhaLoginHTML) {
    alert("Dados em branco");
    resetLogin();
    return;
  }

  let usuarioAchado = usuarios.find((valor) => {
    valor.cpf === cpfLoginHTML && valor.senha === senhaLoginHTML;
  });

  if (!usuarioAchado) {
    alert("Não achei ninguém");
    //melhorar
    resetLogin();
    return;
  }

  login();
  localStorage.setItem("usuarioLogado", usuarioAchado.cpf);
  resetLogin();
  window.location.href = "sistema.html";
}

function resetLogin(): void {
  cpfLogin.value = "";
  senhaLogin.value = "";
}

function login(): void {
  alert("Logado");
  //melhorar
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
  validarCPF();
  mostrarCPFHTML.innerText = `CPF: ${cpfHTML.value}`;
});

function validarCPF(): void {
  let cpfExiste = buscarUsuariosStorage();

  let existeCPF = cpfExiste.some(
    (cpfExistente) => cpfExistente.cpf === cpfHTML.value
  );
  if (existeCPF) {
    alert("CPF já cadastrado no sistema");
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
  // validar cpf aqui se já existe
  mostrarModal();
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

let formularioCadastro = document.getElementById(
  "modalCadastro"
) as HTMLFormElement;

formularioCadastro.addEventListener("submit", (event) => {
  event.preventDefault();

  let retornoValidacao = validarCampos();

  if (!retornoValidacao) {
    return;
  }

  cadastrarUsuario();
  //esconderModal();
});

function mostrarModal(): void {
  aparecerModal.style.display = "block";
}

function esconderModal(): void {
  aparecerModal.style.display = "none";
}

function validarCampos(): Boolean {
  if (
    nomeCadastroHTML.value === "" ||
    emailCadastroHTML.value === "" ||
    senhaCadastroHTML.value === "" ||
    senhaCadastroConfirmHTML.value === ""
  ) {
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
    email: emailCadastroHTML.value,
    senha: senhaCadastroHTML.value,
    mensagens: [],
  };

  listaDeUsuarios.push(novoUsuario);
  salvarUsuarioStorage(listaDeUsuarios);
  resetNovoUsuario();
}

function buscarUsuariosStorage(): Usuario[] {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

function salvarUsuarioStorage(novoUsuario: Usuario[]): void {
  localStorage.setItem("usuarios", JSON.stringify(novoUsuario));
}

function resetNovoUsuario(): void {
  nomeCadastroHTML.value === "";
  emailCadastroHTML.value === "";
  senhaCadastroHTML.value === "";
  senhaCadastroConfirmHTML.value === "";
  esconderModal();
}
