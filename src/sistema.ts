let descricaoHTML = document.getElementById("descricao") as HTMLInputElement;
let detalhamentoHTML = document.getElementById(
  "detalhamento"
) as HTMLInputElement;
let tabelaHTML = document.getElementById("tabelaRegistros") as HTMLTableElement;

let formularioRecados = document.getElementById(
  "tabelaDinamica"
) as HTMLFormElement;

let dadosUsuarioLogado: Usuario;

document.addEventListener("DOMContentLoaded", () => {
  let usuarioLogado = localStorage.getItem("usuarioLogado");

  if (!usuarioLogado) {
    alert("Necessário estar logado para acessar a página");
    window.location.href = "login.html";
  }

  let listaUsuarios = buscarUsuariosStorage();
  console.log(listaUsuarios);

  dadosUsuarioLogado = listaUsuarios.find(
    (usuario) => usuario.cpf === usuarioLogado
  ) as Usuario;

  dadosUsuarioLogado.mensagens.forEach((mensagem) => montarHTML());
});

function montarHTML(): void {}
