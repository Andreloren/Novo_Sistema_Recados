let descricaoHTML = document.getElementById("descricao") as HTMLInputElement;
let detalhamentoHTML = document.getElementById(
  "detalhamento"
) as HTMLInputElement;
let tabelaHTML = document.getElementById("tabelaRegistros") as HTMLTableElement;

let formularioRecados = document.getElementById(
  "tabelaDinamica"
) as HTMLFormElement;

interface Usuario {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  mensagens: Mensagens[];
}

type Mensagens = {
  identificador: string;
  descricao: string;
  detalhamento: string;
};

let dadosUsuarioLogado: Usuario;

document.addEventListener("DOMContentLoaded", () => {
  let IDUsuarioLogado = localStorage.getItem("usuarioLogado");

  if (!IDUsuarioLogado) {
    alert("Necessário estar logado para acessar a página");
    window.location.href = "login.html";
  }

  let listaUsuarios = buscarTodosUsuariosStorage();
  console.log(listaUsuarios);
  console.log(IDUsuarioLogado);

  dadosUsuarioLogado = listaUsuarios.find(
    (usuario) => usuario.cpf === IDUsuarioLogado
  ) as Usuario;
  console.log(dadosUsuarioLogado);

  dadosUsuarioLogado.mensagens.forEach((mensagens) => montarHTML(mensagens));
});

formularioRecados.addEventListener("submit", (event) => {
  event.preventDefault();
  cadastrarMensagens();
});

function buscarTodosUsuariosStorage(): Usuario[] {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

function cadastrarMensagens(): void {
  const novaMensagem: Mensagens = {
    identificador: `${Math.floor(Math.random() * (10000 - 10) + 10)}`,
    descricao: descricaoHTML.value,
    detalhamento: detalhamentoHTML.value,
  };
  dadosUsuarioLogado.mensagens.push(novaMensagem);
  atualizarDadosUsuarioLogado(dadosUsuarioLogado);
  montarHTML(novaMensagem);
  // formularioRecados.reset();
}

function atualizarDadosUsuarioLogado(usuarioAtualizado: Usuario): void {
  let listaUsuarios = buscarTodosUsuariosStorage();
  let IdUsuarioEncontrado = listaUsuarios.findIndex(
    (usuario) => usuario.cpf === usuarioAtualizado.cpf
  );

  listaUsuarios[IdUsuarioEncontrado] = usuarioAtualizado;
  atualizarStorage(listaUsuarios);
}

function atualizarStorage(listaDadosUsuario: Usuario[]): void {
  localStorage.setItem("usuarios", JSON.stringify(listaDadosUsuario));
}

function montarHTML(novasMensagens: Mensagens): void {
  let corpo = document.createElement("tbody");

  let linha = document.createElement("tr");
  linha.setAttribute("id", novasMensagens.identificador);

  let colunaID = document.createElement("th");
  colunaID.setAttribute("scope", "row");
  colunaID.innerHTML = novasMensagens.identificador;

  let colunaDesc = document.createElement("td");
  colunaDesc.innerHTML = novasMensagens.descricao;

  let colunaDet = document.createElement("td");
  colunaDet.innerHTML = novasMensagens.detalhamento;

  let colunaAction = document.createElement("td");
  let botaoEditar = document.createElement("button");
  botaoEditar.innerHTML = "Editar";
  botaoEditar.addEventListener("click", () => editarMensagens(novasMensagens));

  let botaoApagar = document.createElement("button");
  botaoApagar.innerHTML = "Apagar";
  botaoApagar.addEventListener("click", () =>
    apagarMensagens(novasMensagens.identificador)
  );

  corpo.appendChild(linha);
  linha.appendChild(colunaID);
  linha.appendChild(colunaDesc);
  linha.appendChild(colunaDet);
  linha.appendChild(colunaAction);
  colunaAction.appendChild(botaoEditar);
  colunaAction.appendChild(botaoApagar);
  tabelaHTML.appendChild(corpo);
}

function editarMensagens(mensagem: Mensagens): void {}

function apagarMensagens(Id: string): void {
  let IdMensagemEncontrada = dadosUsuarioLogado.mensagens.findIndex(
    (mensagem) => mensagem.identificador === Id
  );

  let linhaExcluir = document.getElementById(Id) as HTMLTableRowElement;

  let confirma = confirm(`Deseja excluir a mensagem ID ${Id}`);

  if (confirma) {
    linhaExcluir.remove();
    dadosUsuarioLogado.mensagens.splice(IdMensagemEncontrada, 1);
    atualizarDadosUsuarioLogado(dadosUsuarioLogado);
  } else {
    alert("Operação Cancelada!");
  }
}
