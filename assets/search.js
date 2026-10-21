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

// Melhorias profissionais adicionadas sem alterar os trabalhos acadêmicos.
(() => {
 const $ = (s, root = document) => root.querySelector(s);
 const $$ = (s, root = document) => [...root.querySelectorAll(s)];
 document.body.classList.add("pro-upgraded");
 if (!$('link[href*="portfolio-pro.css"]')) {
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "assets/portfolio-pro.css?v=2";
  document.head.appendChild(css);
 }
 const progress = document.createElement("div");
 progress.className = "pro-progress";
 progress.innerHTML = "<span></span>";
 document.body.prepend(progress);
 const progressBar = $("span", progress);
 const heroCopy = $(".hero-copy");
 if (heroCopy) {
  heroCopy.insertAdjacentHTML("afterbegin", '<div class="pro-availability"><i></i> Disponível para projetos freelance</div>');
  const eyebrow = $(".eyebrow", heroCopy);
  if (eyebrow) eyebrow.innerHTML = '<span class="status-dot"></span> Portfólio & desenvolvimento web';
  const desc = $(".hero-description", heroCopy);
  if (desc) desc.textContent = "Estudante de Engenharia de Telecomunicações e desenvolvedor web em formação. Crio portfólios, páginas pessoais e sites simples, responsivos e organizados, enquanto documento projetos de programação e engenharia.";
  const actions = $(".actions", heroCopy);
  if (actions && !actions.querySelector('a[href="#servicos"]')) actions.insertAdjacentHTML("beforeend", '<a class="button secondary" href="#servicos">Ver serviços</a>');
 }
 const projetos = $("#projetos");
 if (projetos && !$("#servicos")) {
  const services = document.createElement("section");
  services.id = "servicos";
  services.className = "section wrap pro-services pro-reveal";
  services.innerHTML = `<div class="section-marker"><span>00 — SERVIÇOS</span><span>WEB & APRESENTAÇÃO</span></div><div class="section-heading"><div><p class="eyebrow">O que eu posso criar</p><h2>Sites claros, responsivos e organizados.</h2></div><p>Serviços voltados a profissionais, estudantes e pequenos negócios que precisam apresentar melhor seu trabalho na internet.</p></div><div class="pro-grid"><article class="pro-card"><span class="pro-index">01</span><div class="pro-icon">▣</div><h3>Portfólios profissionais</h3><p>Páginas para apresentar perfil, serviços, projetos, habilidades e contatos.</p><ul><li>Responsivo</li><li>Seções personalizadas</li><li>Publicação no GitHub Pages</li></ul></article><article class="pro-card"><span class="pro-index">02</span><div class="pro-icon">↗</div><h3>Landing pages</h3><p>Páginas objetivas para divulgar serviços, projetos, campanhas ou negócios.</p><ul><li>Layout moderno</li><li>Chamadas para ação</li><li>SEO básico</li></ul></article><article class="pro-card"><span class="pro-index">03</span><div class="pro-icon">⌂</div><h3>Sites institucionais simples</h3><p>Sites para pequenos negócios com apresentação, serviços, diferenciais e contato.</p><ul><li>Desktop e celular</li><li>Navegação simples</li><li>Estrutura escalável</li></ul></article><article class="pro-card"><span class="pro-index">04</span><div class="pro-icon">✦</div><h3>Melhoria de páginas</h3><p>Organização visual, responsividade, conteúdo e pequenas interações em JavaScript.</p><ul><li>UX básico</li><li>Correções visuais</li><li>Melhor navegação</li></ul></article></div><p class="pro-demo-note">Os serviços refletem as áreas em que estou desenvolvendo experiência prática. Projetos são definidos conforme o escopo e a complexidade.</p>`;
  projetos.parentNode.insertBefore(services, projetos);
 }
 const nav = $(".site-nav nav");
 if (nav && !nav.querySelector('a[href="#servicos"]')) nav.insertAdjacentHTML("afterbegin", '<a href="#servicos">Serviços</a>');
 const navInner = $(".nav-inner");
 if (navInner && !$(".pro-controls")) {
  const controls = document.createElement("div");
  controls.className = "pro-controls";
  controls.innerHTML = '<button class="pro-theme" type="button" aria-label="Alternar tema" title="Alternar tema">◐</button>';
  navInner.appendChild(controls);
  const themeButton = $(".pro-theme", controls);
  const saved = localStorage.getItem("licarmilo-theme");
  if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
  themeButton.addEventListener("click", () => {
   const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
   document.documentElement.dataset.theme = next;
   localStorage.setItem("licarmilo-theme", next);
  });
 }
 const featuredGrid = $(".featured-grid");
 if (featuredGrid && !$(".clinic-feature", featuredGrid)) {
  featuredGrid.classList.add("pro-four");
  const clinic = document.createElement("a");
  clinic.className = "featured clinic-feature pro-reveal";
  clinic.href = "https://licarmilodjaualuno-crypto.github.io/simula-o-de-site-de-clinica/";
  clinic.target = "_blank";
  clinic.rel = "noopener";
  clinic.innerHTML = `<div class="clinic-preview" aria-hidden="true"><div class="clinic-window"><i></i><i></i><i></i></div><div><small>CLÍNICA SORRISO · DEMO</small><strong>Site institucional responsivo.</strong></div></div><span class="tag">Web Design · HTML · CSS</span><h3>Clínica Sorriso.</h3><p>Site demonstrativo para clínica odontológica, com navegação clara, serviços e apresentação profissional.</p><span class="text-link">Abrir demonstração <span aria-hidden="true">↗</span></span>`;
  featuredGrid.prepend(clinic);
 }
 const sobre = $("#sobre");
 if (sobre && !$("#processo")) {
  const process = document.createElement("section");
  process.id = "processo";
  process.className = "wrap pro-process pro-reveal";
  process.innerHTML = `<div class="section-marker"><span>04 — PROCESSO</span><span>DA IDEIA À ENTREGA</span></div><div class="section-heading"><div><p class="eyebrow">Como eu trabalho</p><h2>Um caminho simples para construir a página.</h2></div><p>Entender o objetivo, organizar as informações, desenvolver, revisar e entregar.</p></div><div class="pro-process-grid"><div class="pro-process-step"><span>01</span><h3>Entender</h3><p>Objetivo, público, conteúdo e referências.</p></div><div class="pro-process-step"><span>02</span><h3>Estruturar</h3><p>Seções, hierarquia e navegação.</p></div><div class="pro-process-step"><span>03</span><h3>Construir</h3><p>HTML, CSS e JavaScript quando necessário.</p></div><div class="pro-process-step"><span>04</span><h3>Revisar</h3><p>Celular, computador, links e usabilidade.</p></div></div>`;
  sobre.parentNode.insertBefore(process, sobre);
 }
 const contact = $("#contato");
 if (contact && !$("#pro-copy-link")) {
  const heading = $("h2", contact);
  const paragraph = $("p:not(.eyebrow)", contact);
  if (heading) heading.innerHTML = "Tem uma ideia de site<br>ou portfólio?";
  if (paragraph) paragraph.textContent = "Explore meus projetos e use este portfólio como referência do tipo de experiência que posso construir.";
  const copy = document.createElement("button");
  copy.id = "pro-copy-link";
  copy.className = "button secondary pro-copy";
  copy.type = "button";
  copy.textContent = "Copiar link do portfólio";
  contact.appendChild(copy);
 }
 if (!$(".pro-backtop")) document.body.insertAdjacentHTML("beforeend", '<button class="pro-backtop" type="button" aria-label="Voltar ao topo">↑</button><div class="pro-toast" role="status" aria-live="polite"></div>');
 const backTop = $(".pro-backtop");
 const toast = $(".pro-toast");
 let toastTimer;
 const showToast = message => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
 };
 backTop?.addEventListener("click", () => scrollTo({top:0,behavior:"smooth"}));
 $("#pro-copy-link")?.addEventListener("click", async () => {
  try {
   await navigator.clipboard.writeText(location.href.split("#")[0]);
   showToast("Link do portfólio copiado.");
  } catch {
   showToast("Não foi possível copiar automaticamente.");
  }
 });
 const updateUI = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = `${max > 0 ? Math.min(100, scrollY / max * 100) : 0}%`;
  backTop?.classList.toggle("show", scrollY > 650);
 };
 addEventListener("scroll", updateUI, {passive:true});
 addEventListener("resize", updateUI);
 updateUI();
 const revealTargets = $$(".pro-reveal");
 if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => {
    if (entry.isIntersecting) {
     entry.target.classList.add("visible");
     observer.unobserve(entry.target);
    }
   });
  }, {threshold:.1});
  revealTargets.forEach(el => observer.observe(el));
 } else revealTargets.forEach(el => el.classList.add("visible"));
})();
