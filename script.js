let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "todas";

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
  const input = document.getElementById("inputTarefa");
  if (input.value === "") return;

  tarefas.push({ texto: input.value, concluida: false });
  input.value = "";

  salvar();
  renderizar();
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvar();
  renderizar();
}

function toggleTarefa(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvar();
  renderizar();
}

function filtrar(tipo) {
  filtroAtual = tipo;
  renderizar();
}

function atualizarContador() {
  const pendentes = tarefas.filter(t => !t.concluida).length;
  document.getElementById("contador").textContent =
    `${pendentes} tarefas restantes`;
}

function renderizar() {
  const lista = document.getElementById("listaTarefas");
  lista.innerHTML = "";

  let tarefasFiltradas = tarefas;

  if (filtroAtual === "pendentes") {
    tarefasFiltradas = tarefas.filter(t => !t.concluida);
  } else if (filtroAtual === "concluidas") {
    tarefasFiltradas = tarefas.filter(t => t.concluida);
  }

  tarefasFiltradas.forEach((tarefa, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTarefa(${index})"
        class="${tarefa.concluida ? 'concluida' : ''}">
        ${tarefa.texto}
      </span>
      <button onclick="removerTarefa(${index})">X</button>
    `;

    lista.appendChild(li);
  });

  atualizarContador();
}

renderizar();