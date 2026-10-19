"use strict";
const input = document.querySelector("#busca");
const cards = [...document.querySelectorAll(".task")];
const filters = [...document.querySelectorAll("[data-filter]")];
const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
let category = "todos";
function filterTasks() {
 const terms = normalize(input.value).trim().split(/\s+/).filter(Boolean);
 let count = 0;
 for (const card of cards) {
  const text = normalize(`tarefa ${card.dataset.number} ${card.textContent}`);
  const match = terms.every(term => /^\d+$/.test(term) ? Number(term) === Number(card.dataset.number) : text.includes(term));
  card.hidden = !(match && (category === "todos" || card.dataset.category === category));
  if (!card.hidden) count++;
 }
 for (const button of filters) {
  const active = button.dataset.filter === category;
  button.classList.toggle("active", active);
  button.setAttribute("aria-pressed", String(active));
 }
 document.querySelector("#contagem").textContent = `${count} de ${cards.length} trabalhos`;
 document.querySelector("#vazio").hidden = count !== 0;
}
input.addEventListener("input", filterTasks);
for (const button of filters) button.addEventListener("click", () => { category = button.dataset.filter; filterTasks(); });
document.querySelector("#limpar").addEventListener("click", () => { input.value = ""; category = "todos"; filterTasks(); input.focus(); });
filterTasks();
