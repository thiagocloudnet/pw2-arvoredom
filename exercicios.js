/**
 * thiago.cloud — código de Thiago Ferreira Prates Neves.
 * Laboratório de manipulação DOM · Programação Web II (2026.2).
 * O script defer registra os eventos após a leitura do documento.
 */
"use strict";

const selecionar = (id) => document.getElementById(id);
const TEXTO_TITULO = "Bem-vindo ao Curso de Desenvolvimento de Sistemas!";

/** Publica o resultado do critério local; não representa uma nota acadêmica. */
function apresentarResultado(numero, aprovado, descricao) {
  const resultado = selecionar(`resultado-${numero}`);
  resultado.classList.toggle("correto", aprovado);
  resultado.classList.toggle("pendente", !aprovado);
  resultado.textContent = aprovado
    ? `Exercício ${numero} testado e correto. ${descricao}`
    : descricao;
}

function executarAlteracaoTexto() {
  const titulo = selecionar("titulo-boas-vindas");
  titulo.textContent = TEXTO_TITULO;
  apresentarResultado(1, titulo.textContent === TEXTO_TITULO,
    "Conteúdo textual conferido no DOM.");
}

/**
 * Acrescenta texto ao final da lista sem recriar os itens anteriores.
 * @param {string} texto Conteúdo literal do novo item.
 */
function adicionarItem(texto) {
  const lista = selecionar("lista-tarefas");
  const anteriores = Array.from(lista.children);
  const item = document.createElement("li");
  item.textContent = texto;
  lista.appendChild(item);

  const aprovado = lista.children.length === anteriores.length + 1
    && lista.lastElementChild === item
    && item.textContent === texto
    && anteriores.every((elemento, indice) => lista.children[indice] === elemento);

  apresentarResultado(2, aprovado, aprovado
    ? "Novo item no final e elementos anteriores preservados."
    : "A inserção não produziu o resultado esperado.");
}

function executarAlteracaoClasses() {
  const painel = selecionar("painel");
  painel.classList.remove("oculto");
  painel.classList.add("destaque");

  // O estilo computado confirma o efeito do CSS, além da presença das classes.
  const estilo = getComputedStyle(painel);
  const lados = ["Top", "Right", "Bottom", "Left"];
  const aprovado = !painel.classList.contains("oculto")
    && painel.classList.contains("destaque")
    && estilo.display !== "none"
    && estilo.backgroundColor === "rgb(254, 240, 138)"
    && lados.every((lado) => estilo[`border${lado}Width`] === "2px"
      && estilo[`border${lado}Style`] === "solid"
      && estilo[`border${lado}Color`] === "rgb(234, 179, 8)"
      && estilo[`padding${lado}`] === "12px");

  apresentarResultado(3, aprovado, aprovado
    ? "Visibilidade, classes, fundo, bordas e espaçamentos conferidos."
    : "As classes ou os estilos não correspondem ao requisito.");
}

/** Remove somente o primeiro li direto; a lista vazia não gera uma remoção. */
function removerPrimeiraNotificacao() {
  const lista = selecionar("notificacoes");
  const anteriores = Array.from(lista.children);
  const primeira = lista.querySelector(":scope > li");

  if (!primeira) {
    apresentarResultado(4, false, "Lista vazia: não há notificação para remover.");
    return;
  }

  primeira.remove();
  const restantes = anteriores.filter((elemento) => elemento !== primeira);
  const aprovado = lista.children.length === anteriores.length - 1
    && restantes.every((elemento, indice) => lista.children[indice] === elemento);

  apresentarResultado(4, aprovado, aprovado
    ? "Primeira notificação removida e ordem dos demais itens preservada."
    : "A remoção não produziu o resultado esperado.");
}

function exibirMensagem() {
  const nome = selecionar("campo-nome").value.trim();
  const resposta = selecionar("resposta");

  if (!nome) {
    resposta.textContent = "Digite seu nome para receber uma mensagem.";
    apresentarResultado(5, false, "Informe um nome antes de testar a mensagem.");
    return;
  }

  const mensagem = `Olá, ${nome}! Bem-vindo ao estudo de manipulação do DOM!`;
  resposta.textContent = mensagem;
  apresentarResultado(5, resposta.textContent === mensagem,
    "Evento de clique recebido e mensagem personalizada conferida.");
}

// Nenhuma operação é aprovada na inicialização: o usuário precisa executá-la.
selecionar("btn-testar-1").addEventListener("click", executarAlteracaoTexto);
selecionar("btn-testar-3").addEventListener("click", executarAlteracaoClasses);
selecionar("btn-exibir").addEventListener("click", exibirMensagem);
selecionar("btn-remover").addEventListener("click", function () {
  removerPrimeiraNotificacao();
  selecionar("estado-notificacoes").textContent =
    `Notificações restantes: ${selecionar("notificacoes").children.length}.`;
});

selecionar("form-tarefa").addEventListener("submit", function (evento) {
  evento.preventDefault();
  const campo = selecionar("nova-tarefa");
  const texto = campo.value.trim();

  if (!texto) {
    apresentarResultado(2, false, "Digite uma tarefa antes de adicionar.");
    campo.focus();
    return;
  }

  adicionarItem(texto);
  campo.value = "";
  campo.focus();
});
