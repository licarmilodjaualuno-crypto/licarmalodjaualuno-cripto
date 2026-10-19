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

// Demonstração didática da classificação de potência recebida.
const powerControl = document.querySelector("#potencia");
if (powerControl) {
 const updateSignal = () => {
  const power = Number(powerControl.value);
  const level = power < -100 ? "critico" : power < -85 ? "alerta" : "normal";
  const labels = {critico: "Crítico", alerta: "Alerta", normal: "Normal"};
  const colors = {critico: "#ffb9c6", alerta: "#ffe0a0", normal: "#64dfcc"};
  document.querySelector("#dbm-value").textContent = `${power} dBm`;
  document.querySelector("#reading").textContent = String(power);
  document.querySelector("#signal-status").textContent = labels[level];
  document.querySelector(".lab-display").dataset.level = level;
  document.querySelector("#signal-explanation").textContent = {
   critico: "Abaixo de -100 dBm: faixa crítica definida no exercício.",
   alerta: "De -100 até menos de -85 dBm: faixa de alerta do exercício.",
   normal: "A partir de -85 dBm: faixa normal definida no exercício."
  }[level];
  const amplitude = 8 + (power + 120) / 120 * 48;
  const points = [];
  for (let x = 0; x <= 500; x += 2) {
   const y = 80 + Math.sin(x * 0.065) * amplitude * (0.65 + 0.35 * Math.sin(x * 0.013));
   points.push(`${x === 0 ? "M" : "L"}${x},${y.toFixed(2)}`);
  }
  const wave = document.querySelector("#signal-wave");
  wave.setAttribute("d", points.join(" "));
  wave.setAttribute("stroke", colors[level]);
 };
 powerControl.addEventListener("input", updateSignal);
 updateSignal();
}
