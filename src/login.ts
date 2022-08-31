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
  }
}

function cadastrarUsuario() {}

function buscarUsuarios(): Usuario[] {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}
