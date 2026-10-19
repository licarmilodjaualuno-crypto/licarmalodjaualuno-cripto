"use strict";
const input = document.querySelector("#busca");
const cards = [...document.querySelectorAll(".task")];
const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function filterTasks() {
 const terms = normalize(input.value).trim().split(/\s+/).filter(Boolean);
 let count = 0;
 for (const card of cards) {
  const text = normalize(card.textContent);
  card.hidden = !terms.every(term => text.includes(term));
  if (!card.hidden) count++;
 }
 document.querySelector("#contagem").textContent = `${count} de ${cards.length} tarefas`;
 document.querySelector("#vazio").hidden = count !== 0;
}
input.addEventListener("input", filterTasks);
filterTasks();
