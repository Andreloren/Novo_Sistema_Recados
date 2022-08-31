let formularioCadastro = document.getElementById(
  "modalCadastro"
) as HTMLFormElement;

document.addEventListener("DOMContentLoaded", () => {});

formularioCadastro.addEventListener("submit", (event) => {
  event.preventDefault();
  cadastrarUsuario();
});

function cadastrarUsuario() {}
